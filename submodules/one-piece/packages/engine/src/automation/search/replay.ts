/**
 * Plays one game and records it for the Deck Lab replay viewer: one frame per meaningful move,
 * with a plain-English line and a compact board snapshot after the move.
 */
import "@tcg/op-cards";
import { getCard, hasCard } from "@tcg/op-cards";
import { createMatch } from "../../core.ts";
import { heuristicAgent } from "../heuristic-strategy.ts";
import type { MatchConfig, MatchSeat, MatchState } from "../../types.ts";
import type { OnePieceBotAgent } from "../bot-strategies.ts";
import { cloneApply, trimmed } from "./fast-apply.ts";
import { stepSafe } from "./fast-play.ts";
import { createSearchAgent, DEFAULT_SEARCH } from "./search-agent.ts";
import { donCount } from "./decklist.ts";
import type { Job } from "./play.ts";

export interface SideSnap {
  leader: { id: string; don: number; rested: boolean; power: number | null };
  chars: Array<{ id: string; don: number; rested: boolean; power: number | null }>;
  stage: string[]; hand: number; handIds: string[]; deck: number; life: number; trash: number;
  donActive: number; donRested: number; donDeck: number;
}
export interface Frame { turn: number; seat: "a" | "b"; text: string; kind: string; a: SideSnap; b: SideSnap }
export interface Replay { aName: string; bName: string; aFirst: boolean; winner: "a" | "b" | null; turns: number; frames: Frame[] }

const nameOf = (s: MatchState, inst?: string) => {
  const c = inst ? s.cards[inst] : undefined;
  if (!c) return "something";
  return hasCard(c.cardId) ? (getCard(c.cardId) as any).name : c.cardId;
};
const basePower = (cardId: string) => (hasCard(cardId) ? ((getCard(cardId) as any).power ?? null) : null);

function snap(s: MatchState, seat: MatchSeat): SideSnap {
  const p: any = s.players[seat];
  const card = (id: string) => s.cards[id]!;
  const lead = card(p.leaderInstanceId);
  return {
    leader: { id: lead.cardId, don: lead.attachedDon ?? 0, rested: !!lead.rested, power: basePower(lead.cardId) },
    chars: ((p.characterArea ?? []) as string[]).filter(Boolean).map((id) => { const c = card(id); return { id: c.cardId, don: c.attachedDon ?? 0, rested: !!c.rested, power: basePower(c.cardId) }; }),
    stage: ([] as string[]).concat(p.stageArea ?? []).filter(Boolean).map((id) => card(id).cardId),
    hand: p.hand.length, handIds: p.hand.map((id: string) => card(id).cardId),
    deck: p.deck.length, life: p.life.length, trash: p.trash.length,
    donActive: Array.isArray(p.activeDon) ? p.activeDon.length : p.activeDon ?? 0,
    donRested: Array.isArray(p.restedDon) ? p.restedDon.length : p.restedDon ?? 0,
    donDeck: p.donDeckCount ?? 0,
  };
}

function describe(s: MatchState, next: MatchState, cmd: any, countered: Set<string>): { text: string; kind: string } | null {
  const who = (seat: string) => (seat === "south" ? "A" : "B");
  switch (cmd.type) {
    case "keepHand": return { text: `${who(cmd.seat)} keeps their opening hand`, kind: "setup" };
    case "mulligan": case "redrawHand": return { text: `${who(cmd.seat)} mulligans`, kind: "setup" };
    case "playCard": {
      const c = s.cards[cmd.instanceId]; const t = c && hasCard(c.cardId) ? (getCard(c.cardId) as any) : null;
      const verb = t?.cardType === "event" ? "casts" : t?.cardType === "stage" ? "plays the stage" : "plays";
      return { text: `${who(cmd.seat)} ${verb} ${nameOf(s, cmd.instanceId)}${t?.cost != null ? ` (cost ${t.cost})` : ""}`, kind: "play" };
    }
    case "attachDon": return { text: `${who(cmd.seat)} gives ${cmd.amount} DON!! to ${nameOf(s, cmd.targetId)}`, kind: "don" };
    case "declareAttack": return { text: `${who(cmd.seat)}: ${nameOf(s, cmd.attackerId)} attacks ${nameOf(s, cmd.targetId)}`, kind: "attack" };
    case "activateEffect": case "activateAbility": case "useEffect":
      return { text: `${who(cmd.seat)} uses ${nameOf(s, cmd.instanceId ?? cmd.sourceId)}'s effect`, kind: "effect" };
    case "endTurn": return { text: `${who(cmd.seat)} ends the turn`, kind: "end" };
    case "resolvePrompt": {
      const prompt: any = s.promptQueue.find((p: any) => p.id === cmd.promptId);
      const picked = (cmd.selectedIds ?? []).map((id: string) => nameOf(s, id));
      const intent = String(prompt?.resolutionContext?.intent ?? prompt?.kind ?? "");
      const src = nameOf(s, prompt?.sourceInstanceId ?? prompt?.resolutionContext?.sourceInstanceId);
      const W = who(cmd.seat), list = picked.join(", ");
      switch (intent) {
        case "battleCounter": {
          const b = String(prompt?.resolutionContext?.battleId ?? "");
          if (picked.length) { countered.add(b); return { text: `${W} counters with ${list}`, kind: "counter" }; }
          return countered.has(b) ? null : { text: `${W} doesn't counter`, kind: "counter" };
        }
        case "battleBlocker": return picked.length ? { text: `${W} blocks with ${list}`, kind: "block" } : null;
        case "lifeTrigger": return { text: picked.length || cmd.accept || cmd.choice === "yes" ? `${W} activates ${src}'s [Trigger]` : `${W} skips ${src}'s [Trigger]`, kind: "trigger" };
        case "effectSearchSelection": return { text: picked.length ? `${src} searches: ${W} takes ${list}` : `${src} searches: ${W} takes nothing`, kind: "effect" };
        case "effectSearchRemainderOrder": case "effectOptional": return null;
        case "effectPlaySelection": return picked.length ? { text: `${src}: ${W} plays ${list} from the effect`, kind: "effect" } : null;
        case "effectTargetSelection": return picked.length ? { text: `${src} targets ${list}`, kind: "effect" } : null;
        case "effectCostTrashFromHand": case "effectTrashFromHandSelection": return picked.length ? { text: `${W} trashes ${list} from hand for ${src}`, kind: "effect" } : null;
        case "effectCostReturnCharacter": return picked.length ? { text: `${W} returns ${list} to hand for ${src}`, kind: "effect" } : null;
        case "effectAddToLifeFromDeck": return { text: `${src}: ${W} adds a card to Life`, kind: "effect" };
        case "effectPlayCharacterReplacement": return picked.length ? { text: `${W} trashes ${list} to make room`, kind: "effect" } : null;
        case "effectCostRestCards": return { text: `${W} rests cards to pay for ${src}`, kind: "effect" };
        case "effectRestDonForPowerCount": return { text: `${src}: ${W} rests DON!! for power`, kind: "don" };
        default: return picked.length ? { text: `${src}: ${W} picks ${list}`, kind: "choice" } : null;
      }
    }
    default: return null;
  }
}

/** Short notes on what changed: life lost, characters K.O.'d. */
function consequences(prev: MatchState, next: MatchState): string[] {
  const out: string[] = [];
  for (const seat of ["south", "north"] as const) {
    const who = seat === "south" ? "A" : "B";
    const lp = prev.players[seat].life.length, ln = next.players[seat].life.length;
    if (ln < lp) out.push(`${who} takes ${lp - ln} damage (${ln} life left)`);
    const before = new Set(((prev.players[seat] as any).characterArea ?? []).filter(Boolean));
    const after = new Set(((next.players[seat] as any).characterArea ?? []).filter(Boolean));
    for (const id of before) if (!after.has(id) && next.cards[id as string]?.zone === "trash") out.push(`${who}'s ${nameOf(prev, id as string)} is K.O.'d`);
  }
  return out;
}

export function playReplay(job: Job, bot: string, budget: number): Replay {
  const mk = (): OnePieceBotAgent => (bot === "deep" ? createSearchAgent("deep", { ...DEFAULT_SEARCH, budget }) : heuristicAgent);
  const aFirst = job.k % 2 === 0;
  const pc = (d: any, seat: string) => ({ playerName: seat, leaderCardId: d.leader, mainDeck: [...d.main], donDeckCount: donCount(d.leader) });
  let s = trimmed(createMatch({ firstPlayer: aFirst ? "south" : "north", seed: `${job.id}-${job.k}`, shuffleDecks: true, skipFirstTurnDraw: true,
    players: { south: pc(job.a, "south"), north: pc(job.b, "north") } } as unknown as MatchConfig));
  let r = (job.k * 2654435761 + job.id.length * 97) >>> 0 || 1;
  const ctx = { random: () => ((r = (r * 1103515245 + 12345) >>> 0) / 4294967296) };
  const agents = { south: mk(), north: mk() };
  const frames: Frame[] = [];
  let lastTurn = -1;
  const countered = new Set<string>();
  for (let i = 0; i < 2000 && s.status !== "finished"; i++) {
    let res, command: any;
    try { res = stepSafe(s, agents, ctx, cloneApply); command = res.command; } catch { break; }
    if (!res.accepted) break;
    const next = res.state;
    const d = describe(s, next, command, countered);
    const extra = consequences(s, next);
    if (d || extra.length) {
      frames.push({ turn: next.turnNumber, seat: command.seat === "north" ? "b" : "a", kind: d?.kind ?? "result",
        text: [d?.text, ...extra].filter(Boolean).join(". "), a: snap(next, "south"), b: snap(next, "north") });
    }
    if (next.turnNumber !== lastTurn && next.status === "active") {
      lastTurn = next.turnNumber;
      frames.push({ turn: next.turnNumber, seat: next.activeSeat === "south" ? "a" : "b", kind: "turn",
        text: `Turn ${next.turnNumber}: ${next.activeSeat === "south" ? "A" : "B"}'s turn`, a: snap(next, "south"), b: snap(next, "north") });
    }
    s = next;
  }
  const winner = s.winner === "south" ? "a" : s.winner === "north" ? "b" : null;
  if (s.status === "finished") frames.push({ turn: s.turnNumber, seat: winner ?? "a", kind: "end", text: winner ? `${winner === "a" ? "A" : "B"} wins` : "Game over", a: snap(s, "south"), b: snap(s, "north") });
  return { aName: job.a.name, bName: job.b.name, aFirst, winner, turns: s.turnNumber, frames };
}
