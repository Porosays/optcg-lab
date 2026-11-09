/**
 * Test my deck: paste a list, get a report.
 *   bun test-deck.ts --list=my.txt [--field=decks/test-decks.json] [--games=40] [--swaps=12] [--bot=fast] [--out=out]
 * The list can also come from the DECKLIST environment variable.
 */
import "@tcg/op-cards";
import { mkdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { cardName, cost, counter, deckToText, isLegal, parseDecklist, poolFor, type Deck } from "./decklist.ts";
import { runJobs, wilson, pct } from "./pool.ts";
import type { GameResult, Job } from "./match-worker.ts";

const arg = (n: string, d?: string) => process.argv.find((x) => x.startsWith(`--${n}=`))?.slice(n.length + 3) ?? d;
const listArg = arg("list");
const text = listArg && existsSync(listArg) ? readFileSync(listArg, "utf8") : (process.env.DECKLIST ?? listArg ?? "");
const field: Deck[] = JSON.parse(readFileSync(arg("field", "decks/test-decks.json")!, "utf8"));
const games = Number(arg("games", "40")), swaps = Number(arg("swaps", "12")), bot = arg("bot", "fast")!;
const outDir = arg("out", "out")!; mkdirSync(outDir, { recursive: true });

const parsed = parseDecklist(text, "your-deck");
if (!parsed.deck) {
  const md = `# Deck test: list not valid\n\n${parsed.errors.map((e) => `- ${e}`).join("\n")}\n${parsed.warnings.map((w) => `- (note) ${w}`).join("\n")}\n`;
  writeFileSync(`${outDir}/report.md`, md); console.log(md); process.exit(1);
}
const deck = parsed.deck;

const jobsVs = (d: Deck, g: number): Job[] => field.flatMap((opp) => Array.from({ length: g }, (_, k) => ({ id: `t-${opp.name}`, a: d, b: opp, k })));
const score = (rs: GameResult[]) => { const ok = rs.filter((r) => !r.broken && r.winner); return { w: ok.filter((r) => r.winner === "a").length, g: ok.length }; };

const t0 = Date.now();
const base = await runJobs(jobsVs(deck, games), { bot });
const all = score(base);

// per opponent
const rows = field.map((opp) => {
  const rs = base.filter((r) => r.bName === opp.name); const s = score(rs);
  const f = score(rs.filter((r) => r.aFirst)), sec = score(rs.filter((r) => !r.aFirst));
  return { opp: opp.name, ...s, wr: s.g ? s.w / s.g : 0, ci: wilson(s.w, s.g), first: f.g ? f.w / f.g : 0, second: sec.g ? sec.w / sec.g : 0 };
}).sort((x, y) => x.wr - y.wr);

// card stats
const copies = new Map<string, number>(); for (const id of deck.main) copies.set(id, (copies.get(id) ?? 0) + 1);
const ok = base.filter((r) => !r.broken && r.winner);
const cards = [...copies].map(([id, n]) => {
  const withIt = ok.filter((r) => (r.aPlayed[id] ?? 0) > 0), without = ok.filter((r) => !(r.aPlayed[id] ?? 0));
  const losses = ok.filter((r) => r.winner === "b");
  const wrWith = withIt.length ? withIt.filter((r) => r.winner === "a").length / withIt.length : NaN;
  const wrWithout = without.length ? without.filter((r) => r.winner === "a").length / without.length : NaN;
  const deadInLosses = losses.length ? losses.filter((r) => (r.aDead[id] ?? 0) > 0).length / losses.length : 0;
  const playRate = ok.length ? withIt.length / ok.length : 0;
  return { id, name: cardName(id), n, cost: cost(id), counter: counter(id), playRate, wrWith, wrWithout, lift: wrWith - wrWithout, deadInLosses };
});

// swap suggestions: replace the weakest cards with untried pool cards, same seeds for a fair comparison
const weakest = [...cards].sort((a, b) => ((isNaN(a.lift) ? 0 : a.lift) - a.deadInLosses * 0.5) - ((isNaN(b.lift) ? 0 : b.lift) - b.deadInLosses * 0.5)).slice(0, 3);
const pool = poolFor(deck.leader).filter((id) => !copies.has(id));
let rngS = 12345; const rnd = () => ((rngS = (rngS * 1103515245 + 12345) >>> 0) / 4294967296);
const variants: Array<{ out: string; inn: string; deck: Deck }> = [];
for (const w of weakest) {
  const near = pool.filter((id) => Math.abs(cost(id) - w.cost) <= 1 && (w.counter ? counter(id) >= 1000 : true));
  const picks = [...near].sort(() => rnd() - 0.5).slice(0, Math.ceil(swaps / weakest.length));
  for (const inn of picks) {
    const main = deck.main.map((id) => (id === w.id ? inn : id));
    const d = { name: `swap ${w.id}->${inn}`, leader: deck.leader, main };
    if (isLegal(d)) variants.push({ out: w.id, inn, deck: d });
  }
}
const vGames = Math.max(10, Math.floor(games / 2));
const baseHalf = score(base.filter((r) => r.k < vGames));
const vResults = await runJobs(variants.flatMap((v) => jobsVs(v.deck, vGames)), { bot });
const swapRows = variants.map((v) => { const s = score(vResults.filter((r) => r.aName === v.deck.name));
  return { ...v, wr: s.g ? s.w / s.g : 0, g: s.g, delta: (s.g ? s.w / s.g : 0) - (baseHalf.g ? baseHalf.w / baseHalf.g : 0) }; })
  .sort((a, b) => b.delta - a.delta);

const secs = Math.round((Date.now() - t0) / 1000);
let md = `# Deck test: ${cardName(deck.leader)} (${deck.leader})\n\n`;
md += `**Overall: ${pct(all.w / Math.max(1, all.g))}** over ${all.g} games (95% range ${pct(wilson(all.w, all.g)[0])}–${pct(wilson(all.w, all.g)[1])}), ${bot} bot, ${secs}s.\n\n`;
md += `Field: ${field.map((f) => f.name).join(", ")}.\n\n`;
md += `## Matchups (worst first)\n\n| vs | win% | 95% range | going 1st | going 2nd | games |\n|---|---|---|---|---|---|\n`;
for (const r of rows) md += `| ${r.opp} | ${pct(r.wr)} | ${pct(r.ci[0])}–${pct(r.ci[1])} | ${pct(r.first)} | ${pct(r.second)} | ${r.g} |\n`;
md += `\n## Cards\n\nPlayed = share of games it hit the board. Lift = win% when played minus win% when not. Dead = share of losses where it was stuck in hand.\n\n| card | name | copies | cost | counter | played | lift | dead in losses |\n|---|---|---|---|---|---|---|---|\n`;
for (const c of [...cards].sort((a, b) => (isNaN(b.lift) ? -9 : b.lift) - (isNaN(a.lift) ? -9 : a.lift)))
  md += `| ${c.id} | ${c.name} | ${c.n} | ${c.cost} | ${c.counter || "—"} | ${pct(c.playRate)} | ${isNaN(c.lift) ? "—" : (c.lift >= 0 ? "+" : "") + Math.round(100 * c.lift)} | ${pct(c.deadInLosses)} |\n`;
md += `\n## Swap ideas\n\nEach swap replaces every copy of a weak card, tested on the same shuffles as your list (${vGames} games per matchup). Small differences are noise; re-test anything promising with more games or the deep bot.\n\n| out | in | win% | change |\n|---|---|---|---|\n`;
for (const s of swapRows.slice(0, 10)) md += `| ${s.out} ${cardName(s.out)} | ${s.inn} ${cardName(s.inn)} | ${pct(s.wr)} | ${s.delta >= 0 ? "+" : ""}${Math.round(100 * s.delta)} |\n`;
md += `\n**Known bot limit:** the current bots rarely cast [Counter] Events on defense (they spend their DON!! on their own turn), so event-heavy lists are underrated for now.\n`;
md += `\n## Your list\n\n\`\`\`\n${deckToText(deck)}\n\`\`\`\n`;
if (parsed.warnings.length) md += `\nNotes: ${parsed.warnings.join("; ")}\n`;
writeFileSync(`${outDir}/report.md`, md);
writeFileSync(`${outDir}/report.json`, JSON.stringify({ deck, overall: all, rows, cards, swaps: swapRows.map(({ deck: _d, ...r }) => r) }, null, 1));
console.log(md);
