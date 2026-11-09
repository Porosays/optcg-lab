/** Merge find-decks shards into one report. bun find-report.ts --dir=out */
import "@tcg/op-cards";
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { cardName } from "./decklist.ts";
import { pct } from "./pool.ts";
const dir = process.argv.find((a) => a.startsWith("--dir="))?.slice(6) ?? "out";
const parts = readdirSync(dir).filter((f) => /^found-\d+\.json$/.test(f)).map((f) => JSON.parse(readFileSync(`${dir}/${f}`, "utf8")));
const elites = parts.flatMap((p) => p.elites).sort((a: any, b: any) => b.wr - a.wr);
const cards = parts.flatMap((p) => p.cards);
const field: string[] = parts[0]?.field ?? [];
let md = `# Decks the bots found\n\n${elites.length} best-in-style decks across ${new Set(elites.map((e: any) => e.deck.leader)).size} leaders, tested against: ${field.join(", ")} (${parts[0]?.games ?? "?"} games per matchup, fast bot).\n\n`;
md += `Win rates on this few games are rough. Re-test the top ones with **Test my deck** (more games) before trusting them.\n\n## Top 25\n\n| # | leader | style | win% | 95% range | ${field.join(" | ")} |\n|---|---|---|---|---|${field.map(() => "---").join("|")}|\n`;
elites.slice(0, 25).forEach((e: any, i: number) => {
  md += `| ${i + 1} | ${e.deck.leader} ${cardName(e.deck.leader)} | ${e.style} | ${pct(e.wr)} | ${pct(e.ci[0])}–${pct(e.ci[1])} | ${field.map((f) => pct(e.vs[f] ?? 0)).join(" | ")} |\n`;
});
const oldWinners = elites.filter((e: any) => e.style.includes("+old")).slice(0, 10);
md += `\n## Best decks built mostly from old cards (OP01–OP04)\n\n`;
md += oldWinners.length ? oldWinners.map((e: any) => `- ${e.deck.leader} ${cardName(e.deck.leader)}: ${pct(e.wr)} (${e.style})`).join("\n") : "None made the cut this run.";
const merged = new Map<string, { n: number; lift: number; old: boolean }>();
for (const c of cards) { const m = merged.get(c.id) ?? { n: 0, lift: 0, old: c.old }; m.lift = (m.lift * m.n + c.lift * c.n) / (m.n + c.n); m.n += c.n; merged.set(c.id, m); }
const top = [...merged].filter(([, m]) => m.n >= 5).sort((a, b) => b[1].lift - a[1].lift).slice(0, 20);
md += `\n\n## Cards that lift decks the most\n\nAverage win-rate change for decks that include the card, compared with other decks for the same leader.\n\n| card | name | old? | decks | lift |\n|---|---|---|---|---|\n`;
for (const [id, m] of top) md += `| ${id} | ${cardName(id)} | ${m.old ? "yes" : ""} | ${m.n} | +${Math.round(100 * m.lift)} |\n`;
md += `\n## Decklists (top 10, paste into OPTCGSim or Test my deck)\n\n`;
elites.slice(0, 10).forEach((e: any, i: number) => { md += `**${i + 1}. ${cardName(e.deck.leader)} — ${pct(e.wr)} (${e.style})**\n\n\`\`\`\n${e.text}\n\`\`\`\n\n`; });
writeFileSync(`${dir}/found.md`, md);
writeFileSync(`${dir}/found-decks.json`, JSON.stringify(elites.map((e: any) => ({ ...e.deck, name: `${e.deck.leader}-${e.style}` })), null, 1));
writeFileSync(`${dir}/found-summary.json`, JSON.stringify({
  date: new Date().toISOString().slice(0, 10), field, games: parts[0]?.games ?? null,
  decks: elites.slice(0, 40).map((e: any) => ({ leader: e.deck.leader, style: e.style, wr: e.wr, ci: e.ci, vs: e.vs, main: e.deck.main })),
  cards: top.map(([id, m]) => ({ id, lift: m.lift, n: m.n, old: m.old })),
}));
console.log(md);
