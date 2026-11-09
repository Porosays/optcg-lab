/**
 * What the bots have learned from games, kept between runs (nightly/knowledge.json).
 * Per leader: how often each card was played in wins vs losses, and the same for pairs of cards
 * played in the same game. A pair that wins more together than either card alone is a combo.
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";

export interface Knowledge { version: 1; games: number; leaders: Record<string, { g: number; w: number; cards: Record<string, [number, number]>; pairs: Record<string, [number, number]> }> }
export const emptyKnowledge = (): Knowledge => ({ version: 1, games: 0, leaders: {} });

export function loadKnowledge(path?: string): Knowledge {
  if (path && existsSync(path)) try { return JSON.parse(readFileSync(path, "utf8")); } catch {}
  return emptyKnowledge();
}
export function saveKnowledge(path: string, k: Knowledge) {
  // keep the file small: drop pairs seen in fewer than 3 games
  for (const L of Object.values(k.leaders)) for (const [p, v] of Object.entries(L.pairs)) if (v[1] < 3 && Object.keys(L.pairs).length > 4000) delete L.pairs[p];
  writeFileSync(path, JSON.stringify(k));
}

const pk = (a: string, b: string) => (a < b ? `${a}|${b}` : `${b}|${a}`);

/** Record one finished game: the leader, whether it won, and the cards it actually played. */
export function record(k: Knowledge, leader: string, won: boolean, played: string[]) {
  const L = (k.leaders[leader] ??= { g: 0, w: 0, cards: {}, pairs: {} });
  L.g++; if (won) L.w++; k.games++;
  const ids = [...new Set(played)].sort();
  for (const id of ids) { const c = (L.cards[id] ??= [0, 0]); c[1]++; if (won) c[0]++; }
  for (let i = 0; i < ids.length; i++) for (let j = i + 1; j < ids.length; j++) { const p = (L.pairs[pk(ids[i]!, ids[j]!)] ??= [0, 0]); p[1]++; if (won) p[0]++; }
}

export function merge(into: Knowledge, from: Knowledge) {
  into.games += from.games;
  for (const [l, F] of Object.entries(from.leaders)) {
    const L = (into.leaders[l] ??= { g: 0, w: 0, cards: {}, pairs: {} }); L.g += F.g; L.w += F.w;
    for (const [id, v] of Object.entries(F.cards)) { const c = (L.cards[id] ??= [0, 0]); c[0] += v[0]; c[1] += v[1]; }
    for (const [id, v] of Object.entries(F.pairs)) { const c = (L.pairs[id] ??= [0, 0]); c[0] += v[0]; c[1] += v[1]; }
  }
}

/** Win-rate lift of a card for this leader, shrunk toward 0 when there are few games. */
export function cardValue(k: Knowledge, leader: string, id: string): number {
  const L = k.leaders[leader]; const c = L?.cards[id]; if (!L || !c || L.g < 10) return 0;
  const base = L.w / L.g; return ((c[0] + base * 8) / (c[1] + 8)) - base;
}
/** Extra lift when both cards are played together, beyond the better of the two alone. */
export function pairValue(k: Knowledge, leader: string, a: string, b: string): number {
  const L = k.leaders[leader]; const p = L?.pairs[pk(a, b)]; if (!L || !p || p[1] < 4) return 0;
  const base = L.w / L.g; const both = (p[0] + base * 8) / (p[1] + 8) - base;
  return both - Math.max(cardValue(k, leader, a), cardValue(k, leader, b), 0);
}

/** Best learned combos for a leader. */
export function topCombos(k: Knowledge, leader: string, n = 15) {
  const L = k.leaders[leader]; if (!L) return [];
  return Object.entries(L.pairs).filter(([, v]) => v[1] >= 6).map(([p, v]) => { const [a, b] = p.split("|") as [string, string]; return { a, b, games: v[1], wr: v[0] / v[1], extra: pairValue(k, leader, a, b) }; })
    .filter((x) => x.extra > 0.03).sort((x, y) => y.extra - x.extra).slice(0, n);
}
