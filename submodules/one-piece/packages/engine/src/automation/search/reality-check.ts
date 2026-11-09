/** Compare a sim grid (grid.json) with published Beats/Struggles. bun reality-check.ts --grid=out/grid.json --decks=decks/meta.json */
import { readFileSync } from "node:fs";
const arg = (n: string, d?: string) => process.argv.find((x) => x.startsWith(`--${n}=`))?.slice(n.length + 3) ?? d;
const grid = JSON.parse(readFileSync(arg("grid")!, "utf8"));
const decks: Array<{ name: string; leader: string }> = JSON.parse(readFileSync(arg("decks", "decks/meta.json")!, "utf8"));
const real = JSON.parse(readFileSync(new URL("./decks/real-matchups.json", import.meta.url), "utf8"));
const byLeader = new Map(decks.map((d) => [d.leader, d.name]));
let agree = 0, total = 0; const rows: string[] = [];
for (const L of real.leaders) {
  const me = byLeader.get(L.id); if (!me) continue;
  const row = grid.grid.find((g: any) => g.deck === me); if (!row) continue;
  for (const [kind, ids] of [["beats", L.beats], ["struggles", L.struggles]] as const) for (const opp of ids as string[]) {
    const oppName = byLeader.get(opp); const cell = oppName && row.vs[oppName]; if (!cell) continue;
    const simSays = cell.wr >= 0.5 ? "beats" : "struggles"; total++; if (simSays === kind) agree++;
    rows.push(`${simSays === kind ? "agree " : "DIFFER"} ${me} vs ${oppName}: real=${kind}, sim=${Math.round(100 * cell.wr)}%`);
  }
}
console.log(rows.join("\n")); console.log(`\nSim agrees with real results on ${agree}/${total} published matchups.`);
