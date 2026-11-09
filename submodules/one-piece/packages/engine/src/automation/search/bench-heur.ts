/** Fixed heuristic (keeps counter-event DON!!) vs original, every test-deck pairing, both seats. */
import "@tcg/op-cards";
import { readFileSync } from "node:fs";
import { createMatch } from "../../core.ts";
import { createHeuristicAgent, BALANCED_POLICY } from "../heuristic-strategy.ts";
import { cloneApply, trimmed } from "./fast-apply.ts";
import { nextCommand } from "./fast-play.ts";
const decks = JSON.parse(readFileSync("decks/test-decks.json", "utf8"));
const fixed = createHeuristicAgent("fixed", { ...BALANCED_POLICY, reserveForCharacters: true });
const old = createHeuristicAgent("old", { ...BALANCED_POLICY, reserveForCharacters: false });
let w = 0, n = 0; const per: Record<string, [number, number]> = {};
for (let i = 0; i < decks.length; i++) for (let j = 0; j < decks.length; j++) for (let k = 0; k < 8; k++) {
  const fixedSouth = k % 2 === 0;
  let s: any = trimmed(createMatch({ firstPlayer: k % 4 < 2 ? "south" : "north", seed: `hb-${i}-${j}-${k}`, shuffleDecks: true, skipFirstTurnDraw: true,
    players: { south: { playerName: "s", leaderCardId: decks[i].leader, mainDeck: decks[i].main, donDeckCount: 10 },
               north: { playerName: "n", leaderCardId: decks[j].leader, mainDeck: decks[j].main, donDeckCount: 10 } } } as any));
  let r = (i * 7 + j * 13 + k * 31 + 1) >>> 0; const ctx = { random: () => ((r = (r * 1103515245 + 12345) >>> 0) / 4294967296) };
  const agents = fixedSouth ? { south: fixed, north: old } : { south: old, north: fixed };
  for (let t = 0; t < 2000 && s.status !== "finished"; t++) { const { command } = nextCommand(s, agents as any, ctx); if (!command) break; const res = cloneApply(s, command); if (!res.accepted) break; s = res.state; }
  if (!s.winner) continue;
  const won = (s.winner === "south") === fixedSouth; w += won ? 1 : 0; n++;
  const key = fixedSouth ? decks[i].name : decks[j].name; per[key] ??= [0, 0]; per[key][0] += won ? 1 : 0; per[key][1]++;
}
console.log(`fixed beat old ${w}/${n} = ${Math.round(100 * w / n)}%`); for (const [k, [a, b]] of Object.entries(per)) console.log(k, `${a}/${b}`);
