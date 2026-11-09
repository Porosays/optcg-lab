/**
 * Card reading for deck building: what each card IS (types, name, roles) and what it WANTS
 * (types it searches or buffs, names it calls out, leader types it needs, events in trash...).
 * Two cards have synergy when one wants something the other is. Every link carries a short reason
 * so the app can explain a combo in plain words.
 */
import "@tcg/op-cards";
import { getCard, hasCard } from "@tcg/op-cards";

export type Role = "searcher" | "draw" | "removal" | "cheat" | "ramp" | "blocker" | "rush" | "finisher" | "counter2k" | "counter1k" | "counterEvent" | "lifeGain" | "trigger" | "protect";
export interface Want { kind: "trait" | "name" | "category" | "leaderTrait" | "leaderName" | "attribute" | "eventsInTrash" | "highCost"; value: string; how: string }
export interface Features {
  id: string; name: string; type: string; cost: number; power: number; counter: number;
  traits: string[]; attribute: string | null; colors: string[];
  roles: Set<Role>; wants: Want[]; text: string;
}

const cache = new Map<string, Features>();
const HOW: Record<string, string> = {
  search: "searches for", play: "plays", draw: "draws", ko: "K.O.s", modifyPower: "powers up", grantKeyword: "gives keywords to",
  addToHand: "returns to hand", returnToHand: "bounces", modifyCost: "changes the cost of", rest: "rests", setActive: "sets active",
};

/** Walk any effect object; call fn on every object with its nearest enclosing action name. */
function walk(x: any, fn: (o: any, action: string | null, side: "self" | "opponent" | null) => void, action: string | null = null, side: "self" | "opponent" | null = null) {
  if (!x || typeof x !== "object") return;
  if (Array.isArray(x)) { for (const y of x) walk(y, fn, action, side); return; }
  const act = typeof x.action === "string" ? x.action : action;
  const sd = x.player === "self" || x.player === "opponent" ? x.player : x.target?.player ?? x.source?.player ?? side;
  fn(x, act, sd);
  for (const v of Object.values(x)) walk(v, fn, act, sd);
}

export function features(id: string): Features | null {
  if (cache.has(id)) return cache.get(id)!;
  if (!hasCard(id)) return null;
  const c: any = getCard(id);
  const text = String(c.effect ?? "");
  const f: Features = {
    id, name: c.name, type: c.cardType, cost: c.cost ?? 0, power: c.power ?? 0, counter: c.counter ?? 0,
    traits: c.traits ?? [], attribute: c.attribute ?? null, colors: c.color ?? [], roles: new Set(), wants: [], text,
  };
  const want = (w: Want) => { if (!f.wants.some((x) => x.kind === w.kind && x.value === w.value)) f.wants.push(w); };
  walk(c.effects ?? {}, (o, action, side) => {
    const how = HOW[action ?? ""] ?? "works with";
    if (o.action === "search") f.roles.add("searcher");
    if (o.action === "draw" && o.player !== "opponent") f.roles.add("draw");
    if (o.action === "play" && o.source?.zone && o.source.zone !== "hand") f.roles.add("cheat");
    if (o.action === "play" && o.source?.zone === "hand") f.roles.add("cheat");
    if (["ko", "returnToHand", "returnToDeck", "trashCharacter"].includes(o.action) && (o.target?.player === "opponent")) f.roles.add("removal");
    if (o.action === "modifyPower" && o.target?.player === "opponent" && Number(o.value) < 0) f.roles.add("removal");
    if (o.action === "rest" && o.target?.player === "opponent") f.roles.add("removal");
    if (o.action === "addDon" || (o.action === "setActive" && JSON.stringify(o.target ?? {}).includes("costArea"))) f.roles.add("ramp");
    if (o.action === "addToLife") f.roles.add("lifeGain");
    if (o.trigger === "counter") f.roles.add("counterEvent");
    if (o.trigger === "trigger") f.roles.add("trigger");
    if (o.keyword === "blocker" && (o.target?.self || o.target?.player === "self")) f.roles.add("blocker");
    if (o.keyword === "rush" || o.keyword === "rushCharacter") f.roles.add("rush");
    // wants: filters on our own side (what we search, play, buff)
    if (side !== "opponent") {
      if (o.filter === "trait") for (const v of [].concat(o.value)) want({ kind: "trait", value: v, how: `${how} {${v}}` });
      if (o.filter === "name" && o.value && o.value !== c.name) for (const v of [].concat(o.value)) want({ kind: "name", value: v, how: `${how} [${v}]` });
      if (o.filter === "cardCategory" && o.value === "event" && (action === "search" || action === "play" || action === "addToHand")) want({ kind: "category", value: "event", how: `${how} Events` });
      if (o.filter === "cardCategory" && o.value === "stage") want({ kind: "category", value: "stage", how: `${how} Stages` });
      if (o.filter === "attribute") want({ kind: "attribute", value: String(o.value), how: `${how} <${o.value}> cards` });
      if (o.filter === "cost" && o.comparison === "gte" && Number(o.value) >= 5 && (action === "search" || action === "play")) want({ kind: "highCost", value: String(o.value), how: `${how} big cards (cost ${o.value}+)` });
    }
    if (o.condition === "leaderTrait") want({ kind: "leaderTrait", value: o.trait, how: `needs a {${o.trait}} leader` });
    if (o.condition === "leaderName") want({ kind: "leaderName", value: o.name, how: `needs [${o.name}] as leader` });
    if (o.condition === "zoneCount" && o.zone === "trash" && JSON.stringify(o.filters ?? []).includes("event")) want({ kind: "eventsInTrash", value: String(o.value), how: `wants Events in the trash` });
  });
  if (/\[Blocker\]/.test(text)) f.roles.add("blocker");
  if (/\[Rush\]/.test(text) && !/gain(s)? \[Rush\]/.test(text)) f.roles.add("rush");
  if (/\[Trigger\]/.test(text)) f.roles.add("trigger");
  if (f.counter >= 2000) f.roles.add("counter2k"); else if (f.counter >= 1000) f.roles.add("counter1k");
  if (f.type === "character" && (f.power >= 7000 || (f.cost >= 7 && f.power >= 6000))) f.roles.add("finisher");
  cache.set(id, f);
  return f;
}

/** Does card B satisfy one of A's wants? Returns the reason, or null. */
export function satisfies(a: Features, b: Features, leader?: Features): string | null {
  for (const w of a.wants) {
    if (w.kind === "trait" && b.traits.some((t) => t === w.value || t.includes(w.value))) return `${a.name} ${w.how}; ${b.name} is {${w.value}}`;
    if (w.kind === "name" && b.name === w.value) return `${a.name} ${w.how}`;
    if (w.kind === "category" && b.type === w.value) return `${a.name} ${w.how}; ${b.name} is one`;
    if (w.kind === "attribute" && b.attribute === w.value) return `${a.name} ${w.how}; ${b.name} is <${w.value}>`;
    if (w.kind === "highCost" && b.type === "character" && b.cost >= Number(w.value)) return `${a.name} ${w.how}, like ${b.name}`;
    if (w.kind === "eventsInTrash" && b.type === "event") return `${a.name} ${w.how}; ${b.name} fills it`;
  }
  return null;
}

/** How well a card fits a leader: the leader's wants, and the card's leader requirements. */
export function leaderFit(card: Features, leader: Features): { score: number; why: string[] } {
  const why: string[] = [];
  let score = 0;
  const r1 = satisfies(leader, card); if (r1) { score += 3; why.push(r1); }
  for (const w of card.wants) {
    if (w.kind === "leaderTrait") { if (leader.traits.some((t) => t === w.value || t.includes(w.value))) { score += 3; why.push(`${card.name} ${w.how}, and this leader is`); } else score -= 4; }
    if (w.kind === "leaderName") { if (leader.name === w.value || leader.name.includes(w.value)) { score += 3; why.push(`${card.name} ${w.how}`); } else score -= 4; }
  }
  // shares the leader's types (type-matters decks)
  const shared = card.traits.filter((t) => leader.traits.includes(t));
  if (shared.length) { score += 1; if (!why.length) why.push(`${card.name} shares {${shared[0]}} with the leader`); }
  return { score, why };
}

/** Pairwise synergy with reasons (both directions). */
export function pairSynergy(a: Features, b: Features): { score: number; why: string[] } {
  const why: string[] = [];
  const x = satisfies(a, b); if (x) why.push(x);
  const y = satisfies(b, a); if (y) why.push(y);
  return { score: why.length * 2, why };
}

export const isOld = (id: string) => /^(OP0[1-4]|ST0[1-9]|ST1[0-2])-/.test(id);
