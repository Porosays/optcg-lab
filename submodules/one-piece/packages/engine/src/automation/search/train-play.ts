/**
 * Teaches the bots how to pilot each deck. For every deck: try a changed playbook (more or less aggression,
 * different counter/block thresholds, DON!! kept for counters, mulligan rules), play it and the current
 * playbook on the SAME shuffles against the field, keep the change only if it clearly wins more, repeat.
 * The final playbook is re-tested on fresh games against the plain default before it's saved.
 *   bun train-play.ts --decks=decks/op18-preview.json --field=decks/op18-preview.json --iters=6 --games=6
 *     [--base=../../../../../../../nightly/playbook.json] [--shard=0 --shards=1] [--workers=N] [--out=out]
 */
import "@tcg/op-cards";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { runJobs } from "./pool.ts";
import type { Job } from "./match-worker.ts";
import { describePolicy, mutatePolicy, setPlaybook, type Playbook, type PlayPolicy } from "./playbook.ts";
import type { Deck } from "./decklist.ts";

const arg = (n: string, d?: string) => process.argv.find((x) => x.startsWith(`--${n}=`))?.slice(n.length + 3) ?? d;
const decks: Deck[] = JSON.parse(readFileSync(arg("decks", "decks/meta.json")!, "utf8"));
const field: Deck[] = JSON.parse(readFileSync(arg("field", arg("decks", "decks/meta.json"))!, "utf8"));
const ITERS = Number(arg("iters", "6")), GAMES = Number(arg("games", "6")), CONFIRM = Number(arg("confirm", String(GAMES * 2)));
const shard = Number(arg("shard", "0")), shards = Number(arg("shards", "1"));
const workers = arg("workers") ? Number(arg("workers")) : undefined;
const outDir = arg("out", "out")!; mkdirSync(outDir, { recursive: true });
const basePath = arg("base");
const base: Playbook = basePath && existsSync(basePath) ? JSON.parse(readFileSync(basePath, "utf8")) : {};
setPlaybook(base);
if (basePath && existsSync(basePath)) process.env.OPTCG_PLAYBOOK = basePath; // opponents use their learned playbooks too

let seed = 0x51ed ^ (shard * 104729);
const rnd = () => ((seed = (seed * 1103515245 + 12345) >>> 0) / 4294967296);

/** Win rates of two playbooks for deck d on identical shuffles. */
async function duel(d: Deck, A: PlayPolicy | null, B: PlayPolicy | null, games: number, kBase: number) {
  const jobs: Job[] = [];
  for (const opp of field) {
    if (opp.name === d.name) continue;
    for (let k = 0; k < games; k++) {
      jobs.push({ id: `t-${opp.name}`, a: { ...d, name: "A" }, b: opp, k: kBase + k, aPolicy: A ?? {} });
      jobs.push({ id: `t-${opp.name}`, a: { ...d, name: "B" }, b: opp, k: kBase + k, aPolicy: B ?? {} });
    }
  }
  const rs = (await runJobs(jobs, { workers })).filter((r) => r.winner && !r.broken);
  const wr = (n: string) => { const m = rs.filter((r) => r.aName === n); return { w: m.filter((r) => r.winner === "a").length, g: m.length }; };
  return { a: wr("A"), b: wr("B") };
}

const out: Playbook = {};
const mine = decks.filter((_, i) => i % shards === shard);
const t0 = Date.now();
for (const d of mine) {
  let current: PlayPolicy = base[d.leader]?.policy ?? {};
  let tried = 0, kept = 0;
  for (let it = 0; it < ITERS; it++) {
    const cand = mutatePolicy(current, rnd);
    const r = await duel(d, cand, current, GAMES, 1000 * (it + 1));
    tried++;
    const pa = r.a.w / Math.max(1, r.a.g), pb = r.b.w / Math.max(1, r.b.g);
    if (pa - pb >= 0.04 && r.a.g >= 20) { current = cand; kept++; }
  }
  // confirm against the plain default on fresh games
  const c = await duel(d, current, {}, CONFIRM, 500000);
  const gain = c.a.w / Math.max(1, c.a.g) - c.b.w / Math.max(1, c.b.g);
  const keep = gain > 0.02 && Object.keys(current).length > 0;
  if (keep) out[d.leader] = { policy: current, gain, games: c.a.g + c.b.g, updated: new Date().toISOString().slice(0, 10) };
  console.log(`${d.name}: tried ${tried}, kept ${kept}, vs default ${keep ? "+" : ""}${Math.round(100 * gain)} pts over ${c.a.g} games${keep ? " → saved: " + describePolicy(current).join("; ") : " (not saved)"} · ${Math.round((Date.now() - t0) / 1000)}s`);
}
writeFileSync(`${outDir}/playbook-${shard}.json`, JSON.stringify(out));
