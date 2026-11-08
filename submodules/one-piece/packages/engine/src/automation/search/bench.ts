/** Search bot vs heuristic bot, official engine for the real games. */
import "@tcg/op-cards";
import { runBotMatch } from "../bot-harness.ts";
import { heuristicAgent } from "../heuristic-strategy.ts";
import { TEST_DECKS, type TestDeckId } from "../test-decks.ts";
import type { MatchConfig, MatchSeat } from "../../types.ts";
import { createSearchAgent, DEFAULT_SEARCH, type SearchStats } from "./search-agent.ts";
const arg = (n: string, d: string) => process.argv.find((a) => a.startsWith(`--${n}=`))?.split("=")[1] ?? d;
const games = Number(arg("games", "8")), budget = Number(arg("budget", "24")), offset = Number(arg("offset", "0"));
const pc = (id: TestDeckId, seat: string) => ({ playerName: seat, leaderCardId: TEST_DECKS[id].leaderId, mainDeck: [...TEST_DECKS[id].mainDeck], donDeckCount: 10 });
const ids = Object.keys(TEST_DECKS) as TestDeckId[];
const stats: SearchStats = { decisions: 0, rollouts: 0, ms: 0, overrides: 0 };
const search = createSearchAgent("search", { ...DEFAULT_SEARCH, budget }, stats);
let wins = 0, done = 0;
for (let g = offset; g < offset + games; g++) {
  // every deck pairing, both seats, both play orders
  const a = ids[g % 6]!, b = ids[Math.floor(g / 6) % 6]!;
  const searchSeat: MatchSeat = g % 2 ? "north" : "south";
  const first: MatchSeat = Math.floor(g / 2) % 2 ? "north" : "south";
  const cfg = { firstPlayer: first, seed: "bench" + g, shuffleDecks: true, skipFirstTurnDraw: true,
    players: { south: pc(a, "south"), north: pc(b, "north") } } as unknown as MatchConfig;
  const t = Date.now();
  const strategies = searchSeat === "south" ? { south: search, north: heuristicAgent } : { south: heuristicAgent, north: search };
  const r = runBotMatch(cfg, strategies, { seed: "bench" + g, maxCommands: 1500 });
  const won = r.winner === searchSeat; wins += won ? 1 : 0; done++;
  console.log(JSON.stringify({ g, south: a, north: b, searchSeat, first, winner: r.winner, won, term: r.termination, sec: Math.round((Date.now() - t) / 1000) }));
}
console.log(JSON.stringify({ summary: true, offset, games: done, searchWins: wins, decisions: stats.decisions, avgRollouts: +(stats.rollouts / Math.max(1, stats.decisions)).toFixed(1), msPerDecision: Math.round(stats.ms / Math.max(1, stats.decisions)), overrideRate: +(stats.overrides / Math.max(1, stats.decisions)).toFixed(2) }));
