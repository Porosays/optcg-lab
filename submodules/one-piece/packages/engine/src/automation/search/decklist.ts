/**
 * Decklists: parse the OPTCGSim text format ("4xOP01-016" per line, leader
 * included as "1xOP01-001"), validate construction, and print lists back.
 */
import { getAllCards, getCard, hasCard, validateDeckForFormat } from "@tcg/op-cards";
import type { OPCard } from "@tcg/op-types";

export interface Deck { name: string; leader: string; main: string[] }

export interface ParseResult { deck: Deck | null; errors: string[]; warnings: string[] }

// "4xOP01-016" anywhere in the text: lines, commas or one long pasted line all work.
const ENTRY = /(\d+)\s*[xX×]\s*([A-Za-z]{1,5}\d{0,3}-\d{2,3}(?:_[pPrR]\d+)?)/g;

export function parseDecklist(text: string, name = "my-deck"): ParseResult {
  const errors: string[] = [], warnings: string[] = [];
  const entries: Array<{ cardId: string; quantity: number }> = [];
  for (const m of text.matchAll(ENTRY)) {
    const id = m[2]!.toUpperCase().replace(/_P(\d+)$/, "_p$1").replace(/_R(\d+)$/, "_r$1");
    if (!hasCard(id)) { errors.push(`Unknown card: ${id}`); continue; }
    entries.push({ cardId: getCard(id).id, quantity: Number(m[1]) });
  }
  if (!entries.length) errors.push('No cards found. Use the OPTCGSim format, e.g. "1xOP01-001 4xOP01-016 ..."');
  const leaders = entries.filter((e) => getCard(e.cardId).cardType === "leader");
  if (leaders.length !== 1) errors.push(`Need exactly 1 leader, found ${leaders.length}`);
  if (errors.length) return { deck: null, errors, warnings };
  const v = validateDeckForFormat("standard", entries);
  for (const r of v.rules) if (!r.passed) errors.push(r.message);
  const main = entries.filter((e) => getCard(e.cardId).cardType !== "leader" && getCard(e.cardId).cardType !== "don")
    .flatMap((e) => Array(e.quantity).fill(e.cardId) as string[]);
  return { deck: errors.length ? null : { name, leader: leaders[0]!.cardId, main }, errors, warnings };
}

export function deckToText(deck: Deck): string {
  const counts = new Map<string, number>();
  for (const id of deck.main) counts.set(id, (counts.get(id) ?? 0) + 1);
  const lines = [`1x${deck.leader}`];
  const sorted = [...counts].sort((a, b) => cost(a[0]) - cost(b[0]) || a[0].localeCompare(b[0]));
  for (const [id, n] of sorted) lines.push(`${n}x${id}`);
  return lines.join("\n");
}

export function isLegal(deck: Deck): boolean {
  const counts = new Map<string, number>([[deck.leader, 1]]);
  for (const id of deck.main) counts.set(id, (counts.get(id) ?? 0) + 1);
  return validateDeckForFormat("standard", [...counts].map(([cardId, quantity]) => ({ cardId, quantity }))).valid;
}

export const cost = (id: string) => { const c = getCard(id) as any; return typeof c.cost === "number" ? c.cost : 0; };
export const counter = (id: string) => (getCard(id) as any).counter ?? 0;
export const cardName = (id: string) => getCard(id).name;

/** Leader's DON!! deck size (some leaders change it). */
export function donCount(leaderId: string): number {
  const rule = getCard(leaderId).effects?.deckBuildingRules?.find((r) => r.rule === "donDeckCount") as any;
  return rule?.count ?? 10;
}

export function leaders(): OPCard[] {
  return getAllCards().filter((c) => c.cardType === "leader" && !(c as any).designatedEventsOnly);
}

/** Every main-deck card a leader may legally include (colors + leader restrictions). */
export function poolFor(leaderId: string): string[] {
  const leader = getCard(leaderId);
  const out: string[] = [];
  for (const c of getAllCards()) {
    if (c.cardType !== "character" && c.cardType !== "event" && c.cardType !== "stage") continue;
    if (c.id !== c.canonicalId) continue;
    if (!c.color.some((col) => leader.color.includes(col))) continue;
    out.push(c.id);
  }
  // drop cards the leader's own deck-building rules forbid
  return out.filter((id) => !forbidden(leaderId, id));
}

function forbidden(leaderId: string, id: string): boolean {
  const rules = getCard(leaderId).effects?.deckBuildingRules ?? [];
  if (!rules.some((r) => r.rule === "cannotInclude")) return false;
  const v = validateDeckForFormat("standard", [{ cardId: leaderId, quantity: 1 }, { cardId: id, quantity: 1 }]);
  return v.rules.some((r) => !r.passed && r.kind === "leader-restrictions");
}

/** Set code (OP01, ST10, EB02, P...) for format and "old card" tagging. */
export const setOf = (id: string) => id.split("-")[0]!;
export const isBlock1 = (id: string) => /^OP0[1-4]$/.test(setOf(id));
