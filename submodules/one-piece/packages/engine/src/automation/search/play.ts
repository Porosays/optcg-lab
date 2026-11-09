/**
 * Plays a shard of a job file. Each job = two decks + a game index.
 * Writes one JSON line per game, with per-side card usage for card stats.
 *   bun match-worker.ts --jobs=jobs.json --shard=0 --shards=4 --out=r.jsonl --bot=fast|deep --budget=24
 */
import "@tcg/op-cards";
import { createMatch } from "../../core.ts";
import { heuristicAgent } from "../heuristic-strategy.ts";
import type { MatchConfig, MatchSeat, MatchState } from "../../types.ts";
import type { OnePieceBotAgent } from "../bot-strategies.ts";
import { cloneApply, trimmed } from "./fast-apply.ts";
import { nextCommand } from "./fast-play.ts";
import { createSearchAgent, DEFAULT_SEARCH } from "./search-agent.ts";
import { donCount, type Deck } from "./decklist.ts";

export interface Job { id: string; a: Deck; b: Deck; k: number }
export interface GameResult {
  id: string; k: number; aName: string; bName: string;
  winner: "a" | "b" | null; aFirst: boolean; turns: number; broken: boolean; ms: number;
  /** card id → copies that got played (field/trash) / stuck in hand at the end */
  aPlayed: Record<string, number>; aDead: Record<string, number>;
  bPlayed: Record<string, number>; bDead: Record<string, number>;
}


/** Cards that left hand for the board or trash (played, countered, events) and cards stuck in hand at the end. */
function usage(s: MatchState, seat: MatchSeat, used: Set<string>) {
  const played: Record<string, number> = {}, dead: Record<string, number> = {};
  for (const id of used) { const inst = s.cards[id]; if (inst && inst.owner === seat) played[inst.cardId] = (played[inst.cardId] ?? 0) + 1; }
  for (const id of s.players[seat].hand) { const c = s.cards[id]!.cardId; dead[c] = (dead[c] ?? 0) + 1; }
  return { played, dead };
}

function trackHands(prev: MatchState, next: MatchState, used: Set<string>) {
  for (const seat of ["south", "north"] as const) {
    const now = new Set(next.players[seat].hand);
    for (const id of prev.players[seat].hand) {
      if (now.has(id)) continue;
      const z = next.cards[id]?.zone as string | undefined;
      if (z === "character" || z === "stage" || z === "trash" || z === "resolution") used.add(id);
    }
  }
}

export function playJob(job: Job, bot: string, budget: number): GameResult {
  const t = Date.now();
  const mk = (): OnePieceBotAgent => (bot === "deep" ? createSearchAgent("deep", { ...DEFAULT_SEARCH, budget }) : heuristicAgent);
  const aFirst = job.k % 2 === 0;
  const pc = (d: Deck, seat: string) => ({ playerName: seat, leaderCardId: d.leader, mainDeck: [...d.main], donDeckCount: donCount(d.leader) });
  let s = trimmed(createMatch({ firstPlayer: aFirst ? "south" : "north", seed: `${job.id}-${job.k}`, shuffleDecks: true, skipFirstTurnDraw: true,
    players: { south: pc(job.a, "south"), north: pc(job.b, "north") } } as unknown as MatchConfig));
  let r = (job.k * 2654435761 + job.id.length * 97) >>> 0 || 1;
  const ctx = { random: () => ((r = (r * 1103515245 + 12345) >>> 0) / 4294967296) };
  const agents = { south: mk(), north: mk() };
  let broken = false;
  const used = new Set<string>();
  for (let i = 0; i < 2000 && s.status !== "finished"; i++) {
    let command;
    try { command = nextCommand(s, agents, ctx).command; } catch { broken = true; break; }
    if (!command) { broken = true; break; }
    let res;
    try { res = cloneApply(s, command); } catch { broken = true; break; }
    if (!res.accepted) { broken = true; break; }
    if (s.status === "active") trackHands(s, res.state, used);
    s = res.state;
  }
  const ua = usage(s, "south", used), ub = usage(s, "north", used);
  return { id: job.id, k: job.k, aName: job.a.name, bName: job.b.name,
    winner: s.winner === "south" ? "a" : s.winner === "north" ? "b" : null, aFirst, turns: s.turnNumber,
    broken: broken || s.status !== "finished", ms: Date.now() - t,
    aPlayed: ua.played, aDead: ua.dead, bPlayed: ub.played, bDead: ub.dead };
}

