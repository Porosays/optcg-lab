/**
 * Find decks: bots build and evolve decks on their own.
 * For each leader: generate legal decks from the full card pool (old sets included),
 * play them against the field, then mutate the best (one-card swaps, ratio tweaks,
 * old-card injections) for several generations. Keeps the best deck in each style
 * bucket (speed × old-card share), MAP-Elites style, so results don't collapse to one answer.
 *   bun find-decks.ts [--leaders=all|ID,ID] [--shard=0 --shards=1] [--field=decks/test-decks.json]
 *     [--pop=8] [--gens=5] [--games=6] [--workers=N] [--out=out]
 */
import "@tcg/op-cards";
import { mkdirSync, readFileSync, writeFileSync, renameSync } from "node:fs";
import { getCard } from "@tcg/op-cards";
import { cardName, cost, counter, deckToText, isBlock1, isLegal, leaders, poolFor, type Deck } from "./decklist.ts";
import { runJobs, wilson } from "./pool.ts";
import type { Job } from "./match-worker.ts";
import { buildDeck, improve } from "./builder.ts";
import { emptyKnowledge, loadKnowledge, record, saveKnowledge, topCombos } from "./knowledge.ts";
import { features, pairSynergy, isOld } from "./synergy.ts";

const arg = (n: string, d?: string) => process.argv.find((x) => x.startsWith(`--${n}=`))?.slice(n.length + 3) ?? d;
const field: Deck[] = JSON.parse(readFileSync(arg("field", "decks/meta.json")!, "utf8"));
const POP = Number(arg("pop", "8")), GENS = Number(arg("gens", "5")), GAMES = Number(arg("games", "6"));
const shard = Number(arg("shard", "0")), shards = Number(arg("shards", "1"));
const workers = arg("workers") ? Number(arg("workers")) : undefined;
const outDir = arg("out", "out")!; mkdirSync(outDir, { recursive: true });
const leaderArg = arg("leaders", "all")!;
// "current" = leaders that show up in the meta / OP18 lists (what people actually play now)
const currentLeaders = () => [...new Set(["decks/meta.json", "decks/op18-preview.json", "decks/op18-community.json"].flatMap((f) => {
  try { return (JSON.parse(readFileSync(f, "utf8")) as Deck[]).map((d) => d.leader); } catch { return []; }
}))].sort();
const allLeaders = leaderArg === "all" ? leaders().map((l) => l.id) : leaderArg === "current" ? currentLeaders()
  : leaderArg.split(",").map((s) => s.trim()).filter(Boolean);
const myLeaders = allLeaders.filter((_, i) => i % shards === shard);
// smart = read cards, build like a player, learn from games (default). random = the old blind generator.
const MODE = arg("mode", "smart")!;
const knowledge = loadKnowledge(arg("knowledge")); // everything learned so far (used for building)
const learned = emptyKnowledge(); // only this run's games (saved, then merged by find-report)
const CONFIRM = Number(arg("confirm", "0")); // fresh games per field deck to re-test each leader's best deck

let seed = 0x9e3779b9 ^ (shard * 7919);
const rnd = () => ((seed = (seed * 1103515245 + 12345) >>> 0) / 4294967296);
const pick = <T>(xs: T[]) => xs[Math.floor(rnd() * xs.length)]!;

const isCounterCard = (id: string) => counter(id) >= 1000 || ((getCard(id) as any).effects?.effects ?? []).some((b: any) => b.trigger === "counter");
const bucketOf = (c: number) => (c <= 2 ? "low" : c <= 4 ? "mid" : "high");

/** Random legal deck with a sane shape: ~16 low / 20 mid / 14 high cost, 4-ofs mostly, enough counters. */
function generate(leader: string, pool: string[]): Deck | null {
  const byBucket: Record<string, string[]> = { low: [], mid: [], high: [] };
  for (const id of pool) byBucket[bucketOf(cost(id))]!.push(id);
  for (let attempt = 0; attempt < 30; attempt++) {
    const main: string[] = [];
    const targets: Array<[string, number]> = [["low", 16], ["mid", 20], ["high", 14]];
    for (const [b, n] of targets) {
      const cands = [...byBucket[b]!].sort(() => rnd() - 0.5);
      // bias toward counter cards in low/mid so defense is realistic
      cands.sort((x, y) => (isCounterCard(y) ? 1 : 0) - (isCounterCard(x) ? 1 : 0) + (rnd() - 0.5) * 1.6);
      let filled = 0;
      for (const id of cands) {
        if (filled >= n) break;
        const copies = Math.min(n - filled, rnd() < 0.75 ? 4 : 2 + Math.floor(rnd() * 2));
        for (let k = 0; k < copies; k++) main.push(id);
        filled += copies;
      }
    }
    while (main.length < 50 && pool.length) { const id = pick(pool); if (main.filter((x) => x === id).length < 4) main.push(id); }
    const d = { name: "", leader, main: main.slice(0, 50) };
    if (d.main.filter(isCounterCard).length >= 14 && isLegal(d)) return d;
  }
  return null;
}

function mutate(d: Deck, pool: string[]): Deck {
  for (let attempt = 0; attempt < 20; attempt++) {
    const main = [...d.main];
    const distinct = [...new Set(main)];
    const r = rnd();
    if (r < 0.55) { // one-tech swap: all copies of one card for a new card (same cost band 70%)
      const out = pick(distinct);
      const band = pool.filter((id) => !distinct.includes(id) && Math.abs(cost(id) - cost(out)) <= 1);
      const inn = band.length && rnd() < 0.7 ? pick(band) : pick(pool.filter((id) => !distinct.includes(id)));
      for (let i = 0; i < main.length; i++) if (main[i] === out) main[i] = inn;
    } else if (r < 0.85) { // ratio tweak: move one copy
      const from = pick(distinct), to = pick(distinct);
      if (from === to || main.filter((x) => x === to).length >= 4) continue;
      main[main.indexOf(from)] = to;
    } else { // old-card injection (Block 1: OP01-OP04)
      const old = pool.filter((id) => isBlock1(id) && !distinct.includes(id));
      if (!old.length) continue;
      const out = pick(distinct), inn = pick(old);
      for (let i = 0; i < main.length; i++) if (main[i] === out) main[i] = inn;
    }
    const nd = { name: "", leader: d.leader, main };
    if (nd.main.filter(isCounterCard).length >= 12 && isLegal(nd)) return nd;
  }
  return d;
}

const style = (d: Deck) => {
  const avg = d.main.reduce((t, id) => t + cost(id), 0) / d.main.length;
  const old = d.main.filter(isBlock1).length / d.main.length;
  return `${avg < 3 ? "fast" : avg < 4 ? "mid" : "slow"}${old >= 0.25 ? "+old" : ""}`;
};
const key = (d: Deck) => [...d.main].sort().join(",");

interface Scored { deck: Deck; w: number; g: number; wr: number; style: string; vs: Record<string, number>; confirmed?: { w: number; g: number } }
const allScored: Scored[] = [];

async function evaluate(decks: Deck[]): Promise<Scored[]> {
  const jobs: Job[] = decks.flatMap((d, i) => { d.name = `${d.leader}#${allScored.length + i}`;
    return field.flatMap((opp) => Array.from({ length: GAMES }, (_, k) => ({ id: `f-${opp.name}`, a: d, b: opp, k }))); });
  const rs = await runJobs(jobs, { workers });
  for (const r of rs) if (r.winner && !r.broken) {
    const d = decks.find((x) => x.name === r.aName)!; const opp = field.find((f) => f.name === r.bName);
    for (const k of [knowledge, learned]) {
      record(k, d.leader, r.winner === "a", Object.keys(r.aPlayed));
      if (opp) record(k, opp.leader, r.winner === "b", Object.keys(r.bPlayed));
    }
  }
  return decks.map((d) => {
    const mine = rs.filter((r) => r.aName === d.name && !r.broken && r.winner);
    const w = mine.filter((r) => r.winner === "a").length, g = mine.length;
    const vs: Record<string, number> = {};
    for (const opp of field) { const m = mine.filter((r) => r.bName === opp.name); vs[opp.name] = m.length ? m.filter((r) => r.winner === "a").length / m.length : 0; }
    const s = { deck: d, w, g, wr: g ? w / g : 0, style: style(d), vs };
    allScored.push(s); return s;
  });
}

const t0 = Date.now();
const elitesAll: Scored[] = [];
let activeElites: Scored[] = [];
const progress = { complete: false, completedLeaders: [] as string[], skippedLeaders: [] as string[],
  activeLeader: null as string | null, completedGenerations: 0 };
save(); // publish an explicit partial checkpoint before the first batch
for (const leader of myLeaders) {
  progress.activeLeader = leader; progress.completedGenerations = 0;
  activeElites = [];
  save();
  const pool = poolFor(leader);
  if (pool.length < 15) { console.log(`skip ${leader}: pool ${pool.length}`); progress.skippedLeaders.push(leader); progress.activeLeader = null; save(); continue; }
  const seen = new Set<string>();
  const init = Array.from({ length: POP }, (_, i) => MODE === "random" ? generate(leader, pool)
    : buildDeck(leader, pool, { random: rnd, temperature: 0.6 + (i % 4) * 0.5, oldBias: i % 3 === 2 ? 2.5 : 0, knowledge })).filter((d): d is Deck => !!d);
  if (!init.length) { console.log(`skip ${leader}: could not build a legal deck`); progress.skippedLeaders.push(leader); progress.activeLeader = null; save(); continue; }
  init.forEach((d) => seen.add(key(d)));
  let scored = await evaluate(init);
  const elites = new Map<string, Scored>(); // best per style bucket
  const keep = (xs: Scored[]) => { for (const s of xs) { const e = elites.get(s.style); if (!e || s.wr > e.wr) elites.set(s.style, s); } };
  keep(scored);
  activeElites = [...elites.values()]; save();
  for (let gen = 0; gen < GENS; gen++) {
    const parents = [...elites.values(), ...scored.sort((a, b) => b.wr - a.wr).slice(0, 3)];
    const kids: Deck[] = [];
    for (let i = 0; i < POP * 3 && kids.length < POP; i++) { const par = pick(parents).deck; const k = MODE === "random" ? mutate(par, pool) : improve(par, pool, { random: rnd, knowledge, explore: 0.2, oldBias: par.main.filter(isBlock1).length >= 12 ? 2 : 0 }); if (!seen.has(key(k))) { seen.add(key(k)); kids.push(k); } }
    scored = await evaluate(kids);
    keep(scored);
    progress.completedGenerations = gen + 1;
    activeElites = [...elites.values()]; save();
  }
  const best = [...elites.values()].sort((a, b) => b.wr - a.wr);
  if (CONFIRM && best[0]) {
    const d = best[0].deck; const jobs: Job[] = field.flatMap((opp) => Array.from({ length: CONFIRM }, (_, k) => ({ id: `c-${opp.name}`, a: d, b: opp, k: 100000 + k })));
    const rs = (await runJobs(jobs, { workers })).filter((r) => r.winner && !r.broken);
    best[0].confirmed = { w: rs.filter((r) => r.winner === "a").length, g: rs.length };
  }
  elitesAll.push(...best);
  activeElites = [];
  progress.completedLeaders.push(leader);
  progress.activeLeader = null;
  const cf = best[0]?.confirmed;
  console.log(`${leader} ${cardName(leader)}: best ${Math.round(100 * (best[0]?.wr ?? 0))}% (${best[0]?.style})${cf ? `, confirmed ${Math.round(100 * cf.w / Math.max(1, cf.g))}% over ${cf.g} fresh games` : ""}, ${best.length} styles, ${Math.round((Date.now() - t0) / 1000)}s`);
  save(); // include confirmation and mark the leader complete
}

progress.complete = true;
progress.activeLeader = null;
save();
function save() {
  const snapshot = [...elitesAll, ...activeElites];
  const done = [...new Set(snapshot.map((e) => e.deck.leader))];
  // Embed knowledge in the authoritative snapshot so interruption between renames
  // cannot pair deck results with observations from another generation.
  saveKnowledge(`${outDir}/knowledge-${shard}.json.tmp`, learned);
  writeFileSync(`${outDir}/found-${shard}.json.tmp`, JSON.stringify({ shard, shards, progress, learnedKnowledge: learned, field: field.map((f) => f.name), games: GAMES,
    elites: snapshot.map((e) => ({ ...e, ci: wilson(e.w, e.g), text: deckToText(e.deck) })),
    cards: cardStats(), combos: combosFor(done) }, null, 0));
  renameSync(`${outDir}/found-${shard}.json.tmp`, `${outDir}/found-${shard}.json`);
  renameSync(`${outDir}/knowledge-${shard}.json.tmp`, `${outDir}/knowledge-${shard}.json`);
}

/** Pairs that won more together than apart, with the card-text reason when there is one. */
function combosFor(ls: string[]) {
  return ls.flatMap((l) => topCombos(knowledge, l, 12).map((c) => {
    const fa = features(c.a), fb = features(c.b); const why = fa && fb ? pairSynergy(fa, fb).why[0] ?? null : null;
    return { leader: l, ...c, why, old: [isOld(c.a), isOld(c.b)] };
  }));
}

/** How decks containing each card scored, relative to that leader's average (combo/old-card hints). */
function cardStats() {
  const byLeader = new Map<string, number[]>();
  for (const s of allScored) { const xs = byLeader.get(s.deck.leader) ?? []; xs.push(s.wr); byLeader.set(s.deck.leader, xs); }
  const mean = (xs: number[]) => xs.reduce((a, b) => a + b, 0) / Math.max(1, xs.length);
  const stats = new Map<string, { n: number; lift: number }>();
  for (const s of allScored) {
    const base = mean(byLeader.get(s.deck.leader)!);
    for (const id of new Set(s.deck.main)) { const st = stats.get(id) ?? { n: 0, lift: 0 }; st.n++; st.lift += s.wr - base; stats.set(id, st); }
  }
  return [...stats].map(([id, st]) => ({ id, n: st.n, lift: st.lift / st.n, old: isBlock1(id) })).filter((x) => x.n >= 3);
}
