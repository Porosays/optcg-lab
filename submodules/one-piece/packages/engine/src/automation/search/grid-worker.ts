/**
 * One shard of a matchup grid. Every unordered deck pair (mirrors included)
 * plays `games` games, alternating who goes first. Writes one JSON line per game.
 *   bun grid-worker.ts --decks=decks/x.json --games=50 --bot=fast|deep --shard=0 --shards=4 --out=r.jsonl
 */
import "@tcg/op-cards";
import { existsSync as _ex, readFileSync as _rd } from "node:fs";
import { setPlaybook } from "./playbook.ts";
if (process.env.OPTCG_PLAYBOOK && _ex(process.env.OPTCG_PLAYBOOK)) setPlaybook(JSON.parse(_rd(process.env.OPTCG_PLAYBOOK, "utf8")));
import { appendFileSync, readFileSync } from "node:fs";
import { createMatch } from "../../core.ts";
import { agentFor } from "./playbook.ts";
import type { MatchConfig, MatchSeat } from "../../types.ts";
import { cloneApply, trimmed } from "./fast-apply.ts";
import { stepSafe } from "./fast-play.ts";
import { createSearchAgent, DEFAULT_SEARCH } from "./search-agent.ts";
import type { OnePieceBotAgent } from "../bot-strategies.ts";

const arg = (n: string, d?: string) => process.argv.find((a) => a.startsWith(`--${n}=`))?.slice(n.length + 3) ?? d;
const decks: Array<{ name: string; leader: string; main: string[] }> = JSON.parse(readFileSync(arg("decks")!, "utf8"));
const games = Number(arg("games", "20")), shard = Number(arg("shard", "0")), shards = Number(arg("shards", "1"));
const bot = arg("bot", "fast")!, budget = Number(arg("budget", String(DEFAULT_SEARCH.budget)));
const out = arg("out", `grid-${shard}.jsonl`)!;
const only = arg("pairs"); // optional "i-j,i-j" filter (funnel stage 2)
const allowed = only ? new Set(only.split(",")) : null;

const jobs: Array<[number, number, number]> = [];
for (let i = 0; i < decks.length; i++) for (let j = i; j < decks.length; j++) {
  if (allowed && !allowed.has(`${i}-${j}`)) continue;
  for (let k = 0; k < games; k++) jobs.push([i, j, k]);
}
const mine = jobs.filter((_, n) => n % shards === shard);

const mkAgent = (d: { leader: string }): OnePieceBotAgent => { const h = agentFor(d.leader); return bot === "deep" ? createSearchAgent("deep", { ...DEFAULT_SEARCH, budget, rollout: h }) : h; };
const pc = (d: (typeof decks)[number], seat: string) => ({ playerName: seat, leaderCardId: d.leader, mainDeck: [...d.main], donDeckCount: 10 });

for (const [i, j, k] of mine) {
  const t = Date.now();
  const first: MatchSeat = k % 2 ? "north" : "south";
  const seed = `grid-${i}-${j}-${k}`;
  let s = createMatch({ firstPlayer: first, seed, shuffleDecks: true, skipFirstTurnDraw: true,
    players: { south: pc(decks[i]!, "south"), north: pc(decks[j]!, "north") } } as unknown as MatchConfig);
  s = trimmed(s);
  let r = (k * 2654435761 + i * 97 + j) >>> 0 || 1;
  const ctx = { random: () => ((r = (r * 1103515245 + 12345) >>> 0) / 4294967296) };
  const agents = { south: mkAgent(decks[i]!), north: mkAgent(decks[j]!) };
  let cmds = 0, broken = false;
  for (; cmds < 2000 && s.status !== "finished"; cmds++) {
    let res;
    try { res = stepSafe(s, agents, ctx, cloneApply); } catch { broken = true; break; }
    if (!res.accepted) { broken = true; break; }
    s = res.state;
  }
  const winnerDeck = s.winner === "south" ? i : s.winner === "north" ? j : -1;
  appendFileSync(out, JSON.stringify({ a: i, b: j, k, first: first === "south" ? i : j, winner: winnerDeck,
    turns: s.turnNumber, cmds, broken, ms: Date.now() - t }) + "\n");
}
