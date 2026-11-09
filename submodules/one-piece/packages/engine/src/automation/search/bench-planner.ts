/** A/B: heuristic bot with the DON!! planner vs without, same decks and shuffles, seats swapped. */
import "@tcg/op-cards";
import { createMatch } from "../../core.ts";
import { BALANCED_POLICY, createHeuristicAgent } from "../heuristic-strategy.ts";
import { cloneApply, trimmed } from "./fast-apply.ts";
import { stepSafe } from "./fast-play.ts";
import { donCount } from "./decklist.ts";
const [file = "decks/meta.json", gamesArg = "6", shard = "0", shards = "1", variant = "planner", only = ""] = process.argv.slice(2);
const decks = JSON.parse(await Bun.file(file).text());
const NEW = createHeuristicAgent("new", { ...BALANCED_POLICY, donPlanner: variant === "planner" });
const OLD = createHeuristicAgent("old", { ...BALANCED_POLICY, donPlanner: false });
const pc = (d: any, seat: string) => ({ playerName: seat, leaderCardId: d.leader, mainDeck: [...d.main], donDeckCount: donCount(d.leader) });
let job = 0; const out: any[] = [];
for (let i = 0; i < decks.length; i++) for (let j = 0; j < decks.length; j++) for (let k = 0; k < +gamesArg; k++) for (const newSouth of [true, false]) {
  if (only && !decks[i].name.includes(only) && !decks[j].name.includes(only)) continue;
  if (i === j) continue;
  if (job++ % +shards !== +shard) continue;
  let s: any = trimmed(createMatch({ firstPlayer: k % 2 ? "north" : "south", seed: `ab-${i}-${j}-${k}`, shuffleDecks: true, skipFirstTurnDraw: true,
    players: { south: pc(decks[i], "south"), north: pc(decks[j], "north") } } as any));
  let r = (k + 1) * 7919 + i * 31 + j; const ctx = { random: () => ((r = (r * 1103515245 + 12345) >>> 0) / 4294967296) };
  const agents: any = newSouth ? { south: NEW, north: OLD } : { south: OLD, north: NEW };
  for (let t = 0; t < 2000 && s.status !== "finished"; t++) { const st = stepSafe(s, agents, ctx, cloneApply); if (!st.accepted) break; s = st.state; }
  const w = s.winner; const newWon = w ? (w === "south") === newSouth : null;
  out.push({ deck: decks[newSouth ? i : j].name, oldDeck: decks[newSouth ? j : i].name, newWon });
}
console.log(JSON.stringify(out));
