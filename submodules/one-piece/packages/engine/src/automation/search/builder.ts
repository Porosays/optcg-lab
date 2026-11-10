/**
 * Builds decks the way a player does: start from what the leader wants, add the engine
 * (cards that find, play or power up each other), then fill counters, removal and top end
 * to a sane curve. Learned results (knowledge.ts) push cards and pairs that actually won.
 */
import { features, leaderFit, pairSynergy, isOld, type Features } from "./synergy.ts";
import { isLegal, type Deck } from "./decklist.ts";
import type { Knowledge } from "./knowledge.ts";
import { cardValue, pairValue } from "./knowledge.ts";

export interface BuildOpts { random: () => number; temperature?: number; oldBias?: number; knowledge?: Knowledge | null }

const quality = (f: Features) => {
  // plain card quality: counters, stats for cost, useful roles
  let q = 0;
  if (f.counter >= 2000) q += 1.4; else if (f.counter >= 1000) q += 0.7;
  if (f.type === "character" && f.cost > 0) q += Math.max(-1, Math.min(1.2, (f.power / 1000 - f.cost - 1) * 0.35));
  for (const r of f.roles) q += ({ searcher: 1.2, draw: 0.7, removal: 1.0, cheat: 0.8, ramp: 0.6, blocker: 0.5, rush: 0.4, finisher: 0.8, counterEvent: 0.9, trigger: 0.2, lifeGain: 0.3 } as any)[r] ?? 0;
  return q;
};

export function poolScores(leader: string, pool: string[], k?: Knowledge | null) {
  const L = features(leader)!;
  return pool.map((id) => {
    const f = features(id)!;
    const fit = leaderFit(f, L);
    return { id, f, fit: fit.score, why: fit.why, base: fit.score * 1.6 + quality(f) + (k ? cardValue(k, leader, id) * 12 : 0) };
  }).filter((x) => x.fit > -3); // drop cards that need a different leader
}

export function buildDeck(leader: string, pool: string[], o: BuildOpts): Deck | null {
  const k = o.knowledge ?? null, T = o.temperature ?? 1.0;
  const cands = poolScores(leader, pool, k);
  for (let attempt = 0; attempt < 12; attempt++) {
    const chosen: Array<{ id: string; f: Features; n: number }> = [];
    const count = () => chosen.reduce((a, c) => a + c.n, 0);
    const has = (pred: (f: Features) => boolean) => chosen.reduce((a, c) => a + (pred(c.f) ? c.n : 0), 0);
    while (count() < 50) {
      const left = 50 - count();
      const ctr = has((f) => f.counter > 0 || f.roles.has("counterEvent"));
      const ev = has((f) => f.type === "event"), top = has((f) => f.cost >= 6), low = has((f) => f.cost <= 2);
      const scored = cands.filter((c) => !chosen.some((x) => x.id === c.id)).map((c) => {
        let s = c.base;
        for (const x of chosen) { s += pairSynergy(c.f, x.f).score * 0.6 * Math.min(1, x.n / 4); if (k) s += pairValue(k, leader, c.id, x.id) * 6; }
        // role and curve needs, like a deck checklist
        if (ctr < 30 && (c.f.counter > 0 || c.f.roles.has("counterEvent"))) s += 1.2;
        if (c.f.type === "event" && ev >= 10) s -= 4;
        if (c.f.cost >= 6 && top >= 10) s -= 3;
        if (c.f.cost <= 2 && low >= 20) s -= 2;
        if (c.f.cost >= 6 && top < 4) s += 1;
        if (c.f.roles.has("removal") && !chosen.some((x) => x.f.roles.has("removal"))) s += 1;
        if (o.oldBias && isOld(c.id)) s += o.oldBias;
        return { c, s: s + (o.random() - 0.5) * 3 * T };
      }).sort((a, b) => b.s - a.s);
      const best = scored[0]; if (!best) break;
      const n = Math.min(left, best.c.f.cost >= 7 ? 2 + Math.floor(o.random() * 3) : best.s > 6 || o.random() < 0.7 ? 4 : 3);
      chosen.push({ id: best.c.id, f: best.c.f, n });
    }
    const main = chosen.flatMap((c) => Array(c.n).fill(c.id));
    const d: Deck = { name: "", leader, main };
    const counters = main.filter((id) => { const f = features(id)!; return f.counter > 0 || f.roles.has("counterEvent"); }).length;
    // most decks want 14+ counter cards, but some leaders (e.g. Xebec) run almost none: relax on later tries
    const floor = attempt < 8 ? 14 : attempt < 10 ? 6 : 0;
    if (main.length === 50 && counters >= floor && isLegal(d)) return d;
  }
  return null;
}

/** Smart mutation: drop the card contributing least, add the best fit not in the deck (with some exploration). */
export function improve(d: Deck, pool: string[], o: BuildOpts & { explore?: number }): Deck {
  const k = o.knowledge ?? null;
  const ids = [...new Set(d.main)];
  const L = features(d.leader)!;
  const contrib = (id: string) => {
    const f = features(id)!; let s = leaderFit(f, L).score * 1.6 + quality(f) + (k ? cardValue(k, d.leader, id) * 12 : 0);
    for (const x of ids) if (x !== id) { s += pairSynergy(f, features(x)!).score * 0.6; if (k) s += pairValue(k, d.leader, id, x) * 6; }
    return s + (o.random() - 0.5) * 2;
  };
  for (let attempt = 0; attempt < 15; attempt++) {
    const out = [...ids].sort((a, b) => contrib(a) - contrib(b))[Math.floor(o.random() * Math.min(3, ids.length))]!;
    const outN = d.main.filter((x) => x === out).length;
    let inn: string;
    if (o.random() < (o.explore ?? 0.25)) {
      const olds = pool.filter((id) => !ids.includes(id) && (o.oldBias ? isOld(id) : true));
      inn = olds[Math.floor(o.random() * olds.length)]!;
    } else {
      const cands = poolScores(d.leader, pool.filter((id) => !ids.includes(id)), k).map((c) => {
        let s = c.base; for (const x of ids) if (x !== out) { s += pairSynergy(c.f, features(x)!).score * 0.6; if (k) s += pairValue(k, d.leader, c.id, x) * 6; }
        return { id: c.id, s: s + (o.random() - 0.5) * 2 };
      }).sort((a, b) => b.s - a.s);
      inn = cands[Math.floor(o.random() * Math.min(4, cands.length))]?.id!;
    }
    if (!inn) continue;
    const main = d.main.map((x) => (x === out ? inn : x));
    // sometimes shift ratios instead: -1 of `out`, +1 of a strong card already in the deck
    if (o.random() < 0.3 && outN > 1) { const strong = [...ids].sort((a, b) => contrib(b) - contrib(a)).find((x) => d.main.filter((y) => y === x).length < 4); if (strong) { const m2 = [...d.main]; m2[m2.indexOf(out)] = strong; const n2 = { name: "", leader: d.leader, main: m2 }; if (isLegal(n2)) return n2; } }
    const nd = { name: "", leader: d.leader, main };
    if (isLegal(nd)) return nd;
  }
  return d;
}
