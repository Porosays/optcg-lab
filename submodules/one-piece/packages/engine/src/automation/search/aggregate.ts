/** Merge shard results into a win-rate grid with 95% intervals. bun aggregate.ts --decks=... --dir=results */
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
const arg = (n: string, d?: string) => process.argv.find((a) => a.startsWith(`--${n}=`))?.slice(n.length + 3) ?? d;
const decks: Array<{ name: string }> = JSON.parse(readFileSync(arg("decks")!, "utf8"));
const dir = arg("dir", "results")!;
const rows = readdirSync(dir).filter((f) => f.endsWith(".jsonl")).flatMap((f) =>
  readFileSync(`${dir}/${f}`, "utf8").split("\n").filter(Boolean).map((l) => JSON.parse(l)));
const n = decks.length;
const W = Array.from({ length: n }, () => Array(n).fill(0)), G = Array.from({ length: n }, () => Array(n).fill(0));
const firstW = Array(n).fill(0), firstG = Array(n).fill(0), secW = Array(n).fill(0), secG = Array(n).fill(0);
let broken = 0, ms = 0;
for (const r of rows) {
  ms += r.ms; if (r.broken || r.winner < 0) { broken++; continue; }
  if (r.a === r.b) continue; // mirrors only tell us first-player edge
  G[r.a][r.b]++; G[r.b][r.a]++;
  W[r.winner][r.winner === r.a ? r.b : r.a]++;
  for (const d of [r.a, r.b]) {
    const wentFirst = r.first === d, won = r.winner === d;
    if (wentFirst) { firstG[d]++; if (won) firstW[d]++; } else { secG[d]++; if (won) secW[d]++; }
  }
}
const wilson = (w: number, g: number) => { if (!g) return [0, 0]; const p = w / g, z = 1.96, d = 1 + z * z / g;
  const c = (p + z * z / (2 * g)) / d, h = (z * Math.sqrt(p * (1 - p) / g + z * z / (4 * g * g))) / d; return [c - h, c + h]; };
const grid = decks.map((d, i) => ({ deck: d.name, vs: Object.fromEntries(decks.map((e, j) => [e.name,
  i === j || !G[i][j] ? null : { wr: +(W[i][j] / G[i][j]).toFixed(3), games: G[i][j], ci: wilson(W[i][j], G[i][j]).map((x) => +x.toFixed(3)) }])) }));
const overall = decks.map((d, i) => { const w = W[i].reduce((a: number, b: number) => a + b, 0), g = G[i].reduce((a: number, b: number) => a + b, 0);
  return { deck: d.name, wr: g ? w / g : 0, games: g, first: firstG[i] ? firstW[i] / firstG[i] : 0, second: secG[i] ? secW[i] / secG[i] : 0 }; })
  .sort((x, y) => y.wr - x.wr);
const pct = (x: number) => `${Math.round(100 * x)}%`;
let md = `# Matchup grid\n\n${rows.length} games (${broken} broken), ${(ms / rows.length / 1000).toFixed(2)}s avg/game\n\n## Ranking\n\n| deck | win% | games | going 1st | going 2nd |\n|---|---|---|---|---|\n`;
for (const o of overall) md += `| ${o.deck} | ${pct(o.wr)} | ${o.games} | ${pct(o.first)} | ${pct(o.second)} |\n`;
md += `\n## Row deck's win% vs column deck\n\n| | ${decks.map((d) => d.name).join(" | ")} |\n|---|${decks.map(() => "---").join("|")}|\n`;
for (const r of grid) md += `| **${r.deck}** | ${decks.map((d) => { const c = r.vs[d.name]; return c ? pct(c.wr) : "—"; }).join(" | ")} |\n`;
writeFileSync(`${dir}/grid.json`, JSON.stringify({ decks: decks.map((d) => d.name), grid, overall, games: rows.length, broken }, null, 1));
writeFileSync(`${dir}/grid.md`, md);
console.log(md);
