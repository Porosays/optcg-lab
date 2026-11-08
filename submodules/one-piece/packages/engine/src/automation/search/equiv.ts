import "@tcg/op-cards";
import { createMatch, applyCommand } from "../../core.ts";
import { heuristicAgent, aggressiveAgent } from "../heuristic-strategy.ts";
import { TEST_DECKS, type TestDeckId } from "../test-decks.ts";
import type { MatchConfig, MatchState } from "../../types.ts";
import { nextCommand } from "./fast-play.ts";
import { cloneApply } from "./fast-apply.ts";
const pc = (id: TestDeckId, seat: string) => ({ playerName: seat, leaderCardId: TEST_DECKS[id].leaderId, mainDeck: [...TEST_DECKS[id].mainDeck], donDeckCount: 10 });
const ids = Object.keys(TEST_DECKS) as TestDeckId[];
const snap = (s: MatchState) => JSON.stringify([s.status, s.winner, s.turnNumber, s.phase, s.activeSeat,
  ...(["south","north"] as const).map(k => { const p = s.players[k]; return [p.deck, p.hand, p.life, p.trash, p.characterArea, p.stageArea, p.activeDon, p.restedDon, p.donDeckCount]; }),
  s.promptQueue.filter(p=>p.status==="pending").map(p=>[p.kind,p.seat,p.options.map(o=>o.id)])]);
let games = 0, mismatches = 0, steps = 0;
for (let g = 0; g < 30; g++) {
  const a = ids[g % 6], b = ids[(g * 5 + 1) % 6];
  const cfg = { firstPlayer: g%2?"north":"south", seed: "eq"+g, shuffleDecks: true, skipFirstTurnDraw: true,
    players: { south: pc(a,"south"), north: pc(b,"north") } } as unknown as MatchConfig;
  let s1 = createMatch(cfg), s2 = createMatch(cfg);
  const mk = () => { let r = 7 + g; return { random: () => ((r = (r * 16807) % 2147483647) / 2147483647) }; };
  const c1 = mk(), c2 = mk(); const ag = { south: heuristicAgent, north: aggressiveAgent };
  let bad = false;
  for (let i = 0; i < 1500 && s1.status !== "finished"; i++) {
    const x1 = nextCommand(s1, ag, c1).command, x2 = nextCommand(s2, ag, c2).command;
    if (JSON.stringify(x1) !== JSON.stringify(x2)) { bad = true; console.log("cmd diverge g", g, "step", i, JSON.stringify(x1), JSON.stringify(x2)); break; }
    if (!x1) break;
    const r1 = applyCommand(s1, x1), r2 = cloneApply(s2, x2!);
    if (r1.accepted !== r2.accepted) { bad = true; console.log("accept diverge g", g, i); break; }
    s1 = r1.state; s2 = r2.state; steps++;
    if (snap(s1) !== snap(s2)) { bad = true; console.log("state diverge g", g, "step", i, x1.type); break; }
  }
  games++; if (bad) mismatches++;
}
console.log(`games ${games}, mismatched ${mismatches}, steps compared ${steps}`);
