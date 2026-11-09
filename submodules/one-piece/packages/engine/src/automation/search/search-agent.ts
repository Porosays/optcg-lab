/**
 * Look-ahead bot: determinized Monte Carlo search with successive halving.
 *
 * For every main-phase decision it lists the legal moves, then for each move
 * imagines many futures. Each future reshuffles what the bot can't see
 * (opponent hand/deck/life, its own deck/life), plays the move, and lets both
 * sides continue with the heuristic policy until a horizon. Moves are scored
 * by win/loss or a board evaluation; weak moves are dropped each round.
 * Prompts (counters, blockers, triggers) use the heuristic resolver for now.
 */
import type { EngineCommand, LegalCommandDescriptor, MatchSeat, MatchState } from "../../types.ts";
import { commandFromDescriptor, type OnePieceBotAgent, type OnePieceBotDecisionContext } from "../bot-strategies.ts";
import { heuristicAgent } from "../heuristic-strategy.ts";
import { getCardForInstance, getCardPower } from "../../shared.ts";
import { cloneApply, trimmed } from "./fast-apply.ts";
import { stepSafe } from "./fast-play.ts";

export interface SearchOptions {
  /** Total imagined futures per decision. */
  budget: number;
  /** Extra turns to look past the current one (1 = through the opponent's reply). */
  horizonTurns: number;
  maxRolloutCommands: number;
  rollout: OnePieceBotAgent;
  /** Stop early when a move wins in every sampled future, or clearly leads. */
  earlyStop: boolean;
  /** Mean-score gap (on a -1..1 scale) that counts as "clearly best". */
  clearGap: number;
}

export const DEFAULT_SEARCH: SearchOptions = {
  budget: 24,
  horizonTurns: 1,
  maxRolloutCommands: 400,
  rollout: heuristicAgent,
  earlyStop: true,
  clearGap: 0.5,
};

const other = (s: MatchSeat): MatchSeat => (s === "south" ? "north" : "south");

function rng(seed: number) {
  let x = (seed >>> 0) || 1;
  return () => ((x = (x * 1103515245 + 12345) >>> 0) / 4294967296);
}

/** Copy the state and reshuffle every card identity the viewer cannot see. */
export function determinize(state: MatchState, viewer: MatchSeat, random: () => number): MatchState {
  const s = structuredClone(trimmed(state)) as MatchState;
  const groups: Record<string, string[]> = { mine: [], theirs: [] };
  for (const inst of Object.values(s.cards)) {
    if (inst.faceUp || inst.publicKnowledge) continue;
    const z = inst.zone as string;
    if (inst.owner === viewer) {
      if (z === "deck" || z === "life") groups.mine!.push(inst.instanceId);
    } else if (z === "deck" || z === "life" || z === "hand") {
      groups.theirs!.push(inst.instanceId);
    }
  }
  for (const ids of Object.values(groups)) {
    const cardIds = ids.map((id) => s.cards[id]!.cardId);
    for (let i = cardIds.length - 1; i > 0; i--) {
      const j = Math.floor(random() * (i + 1));
      [cardIds[i], cardIds[j]] = [cardIds[j]!, cardIds[i]!];
    }
    ids.forEach((id, i) => (s.cards[id]!.cardId = cardIds[i]!));
  }
  return s;
}

function safePower(state: MatchState, id: string): number {
  try { return getCardPower(state, id); } catch { return getCardForInstance(state, id).power ?? 0; }
}

/** Board evaluation in [-1, 1] from `seat`'s point of view. */
export function evaluate(state: MatchState, seat: MatchSeat): number {
  if (state.winner) return state.winner === seat ? 1 : -1;
  const side = (k: MatchSeat) => {
    const p = state.players[k];
    const chars = p.characterArea.filter((x): x is string => x !== null);
    const power = chars.reduce((t, id) => t + safePower(state, id), 0);
    return { life: p.life.length, hand: p.hand.length, chars: chars.length, power, deck: p.deck.length };
  };
  const me = side(seat), op = side(other(seat));
  let v = 0;
  v += 0.28 * (me.life - op.life);
  v += op.life === 0 ? 0.6 : 0;
  v -= me.life === 0 ? 0.6 : 0;
  v += 0.08 * (me.hand - op.hand);
  v += 0.10 * (me.chars - op.chars);
  v += 0.00004 * (me.power - op.power);
  if (me.deck < 5) v -= 0.3;
  return Math.tanh(v);
}

function expand(state: MatchState, seat: MatchSeat, legal: LegalCommandDescriptor[], ctx?: OnePieceBotDecisionContext): EngineCommand[] {
  const out: EngineCommand[] = [];
  const seen = new Set<string>();
  const push = (c: EngineCommand | null) => {
    if (!c) return;
    const k = JSON.stringify(c);
    if (!seen.has(k)) { seen.add(k); out.push(c); }
  };
  for (const d of legal) {
    if (d.seat !== seat || d.type === "concede") continue;
    if (d.type === "declareAttack" && d.sourceId && d.targetIds) {
      for (const t of d.targetIds) push({ type: "declareAttack", seat, attackerId: d.sourceId, targetId: t } as EngineCommand);
    } else if (d.type === "playCard" && d.sourceId && d.slotChoices && d.slotChoices.length > 1) {
      push(commandFromDescriptor(state, seat, d, ctx)); // first slot is enough: slots are symmetric
    } else {
      push(commandFromDescriptor(state, seat, d, ctx));
    }
  }
  if (legal.some((d) => d.seat === seat && d.type === "endTurn")) push({ type: "endTurn", seat } as EngineCommand);
  return out;
}

function rollout(state: MatchState, seat: MatchSeat, first: EngineCommand, opts: SearchOptions, random: () => number): number {
  const det = determinize(state, seat, random);
  const r0 = cloneApply(det, first);
  if (!r0.accepted) return -2; // illegal in this world: never pick it
  let s = r0.state;
  const stopAt = state.turnNumber + opts.horizonTurns + 1;
  const agents = { south: opts.rollout, north: opts.rollout } as Record<MatchSeat, OnePieceBotAgent>;
  const ctx = { random };
  for (let i = 0; i < opts.maxRolloutCommands; i++) {
    if (s.status === "finished" || s.turnNumber >= stopAt) break;
    const r = stepSafe(s, agents, ctx, cloneApply);
    if (!r.accepted) break;
    s = r.state;
  }
  return evaluate(s, seat);
}

export interface SearchStats { decisions: number; rollouts: number; ms: number; overrides: number; lethal?: number }

export function createSearchAgent(id: string, opts: SearchOptions = DEFAULT_SEARCH, stats?: SearchStats): OnePieceBotAgent {
  return {
    id,
    resolvePrompt: opts.rollout.resolvePrompt ?? heuristicAgent.resolvePrompt,
    choose(state, seat, legal, ctx) {
      const base = opts.rollout.choose(state, seat, legal, ctx);
      if (state.status !== "active") return base;
      const cands = expand(state, seat, legal, ctx);
      if (cands.length <= 1) return base ?? cands[0] ?? null;
      const t0 = Date.now();
      const random = rng(Math.floor((ctx?.random() ?? Math.random()) * 2 ** 31));
      let pool = cands.map((c) => ({ c, sum: 0, n: 0 }));
      // successive halving
      const rounds = Math.max(1, Math.ceil(Math.log2(pool.length)));
      const perRound = Math.max(pool.length, Math.floor(opts.budget / rounds));
      let used = 0;
      while (pool.length > 1 && used < opts.budget * 1.5) {
        const each = Math.max(1, Math.floor(perRound / pool.length));
        for (const p of pool) for (let k = 0; k < each; k++) { p.sum += rollout(state, seat, p.c, opts, random); p.n++; used++; }
        pool.sort((a, b) => b.sum / b.n - a.sum / a.n);
        if (opts.earlyStop) {
          const top = pool[0]!, second = pool[1];
          const topMean = top.sum / top.n;
          // lethal: this move won in every imagined future
          if (topMean >= 0.999 && top.n >= 2) { if (stats) stats.lethal = (stats.lethal ?? 0) + 1; pool = [top]; break; }
          if (second && top.n >= 2 && topMean - second.sum / second.n >= opts.clearGap) { pool = [top]; break; }
        }
        pool = pool.slice(0, Math.max(1, Math.ceil(pool.length / 2)));
      }
      const best = pool[0]!.c;
      if (stats) {
        stats.decisions++; stats.rollouts += used; stats.ms += Date.now() - t0;
        if (base && JSON.stringify(base) !== JSON.stringify(best)) stats.overrides++;
      }
      return best;
    },
  };
}
