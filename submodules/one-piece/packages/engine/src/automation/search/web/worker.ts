/**
 * Deck Lab web worker. Messages:
 *   {type:"parse", id, text}            -> {type:"parsed", id, deck, errors, warnings}
 *   {type:"names", id, ids}             -> {type:"names", id, names}
 *   {type:"run", id, jobs, bot, budget} -> {type:"result", id, result}... then {type:"done", id}
 *   {type:"replay", id, job, bot, budget} -> {type:"replay", id, replay}
 *   {type:"cards", id, ids}             -> {type:"cards", id, cards} (name, type, cost, power, counter, colors, trigger, text)
 */
import "@tcg/op-cards";
import { getCard, hasCard } from "@tcg/op-cards";
import { playJob } from "../play.ts";
import { parseDecklist } from "../decklist.ts";
import { playReplay } from "../replay.ts";
import { leaders, poolFor, deckToText } from "../decklist.ts";
import { features, pairSynergy, isOld } from "../synergy.ts";
import { poolScores, buildDeck } from "../builder.ts";

self.onmessage = (e: MessageEvent<any>) => {
  const m = e.data;
  const post = (x: any) => (self as any).postMessage(x);
  try {
    if (m.type === "parse") {
      const p = parseDecklist(m.text, "Your deck");
      post({ type: "parsed", id: m.id, deck: p.deck, errors: p.errors, warnings: p.warnings });
    } else if (m.type === "names") {
      const names: Record<string, any> = {};
      for (const id of m.ids as string[]) if (hasCard(id)) { const c = getCard(id) as any; names[id] = { name: c.name, cost: c.cost ?? null, counter: c.counter ?? null, type: c.cardType, color: c.color }; }
      post({ type: "names", id: m.id, names });
    } else if (m.type === "cards") {
      const cards: Record<string, any> = {};
      for (const id of m.ids as string[]) if (hasCard(id)) {
        const c = getCard(id) as any; const text = String(c.effect ?? "");
        cards[id] = { name: c.name, type: c.cardType, cost: c.cost ?? null, power: c.power ?? null, counter: c.counter ?? null, life: c.life ?? null,
          color: c.color ?? [], traits: c.traits ?? [], trigger: /\[Trigger\]/i.test(text), blocker: /\[Blocker\]/i.test(text), text };
      }
      post({ type: "cards", id: m.id, cards });
    } else if (m.type === "leaders") {
      post({ type: "leaders", id: m.id, leaders: leaders().map((l: any) => ({ id: l.id, name: l.name, color: l.color, traits: l.traits ?? [] })) });
    } else if (m.type === "combos") {
      const L = features(m.leader)!;
      const pool = poolFor(m.leader);
      const sc = poolScores(m.leader, pool).sort((a, b) => b.base - a.base);
      const fit = sc.filter((x) => x.fit > 0);
      const top = sc.slice(0, 70);
      const pairs: any[] = [];
      for (let i = 0; i < top.length; i++) for (let j = i + 1; j < top.length; j++) {
        const p = pairSynergy(top[i]!.f, top[j]!.f);
        if (p.score) pairs.push({ a: top[i]!.id, b: top[j]!.id, why: p.why[0], score: top[i]!.base + top[j]!.base + p.score * 2, old: [isOld(top[i]!.id), isOld(top[j]!.id)] });
      }
      pairs.sort((x, y) => y.score - x.score);
      // variety: each card shows up in at most 2 pairs, and one pair per card couple
      const uses = new Map<string, number>(), seenPair = new Set<string>(), picked: any[] = [];
      for (const p of pairs) { const k = [p.a, p.b].sort().join("|"); if (seenPair.has(k) || (uses.get(p.a) ?? 0) >= 2 || (uses.get(p.b) ?? 0) >= 2) continue; seenPair.add(k); uses.set(p.a, (uses.get(p.a) ?? 0) + 1); uses.set(p.b, (uses.get(p.b) ?? 0) + 1); picked.push(p); }
      pairs.length = 0; pairs.push(...picked);
      const card = (x: any) => ({ id: x.id, fit: x.fit, why: x.why[0] ?? null, roles: [...x.f.roles], old: isOld(x.id), cost: x.f.cost, type: x.f.type });
      post({ type: "combos", id: m.id, leader: { id: L.id, name: L.name, traits: L.traits, colors: L.colors, wants: L.wants.map((w) => w.how) },
        poolSize: pool.length, engine: fit.slice(0, 30).map(card), oldFits: fit.filter((x) => isOld(x.id)).slice(0, 16).map(card),
        stars: sc.filter((x) => x.fit <= 0).slice(0, 12).map(card), pairs: pairs.slice(0, 40) });
    } else if (m.type === "build") {
      let r = (m.seed ?? Date.now()) >>> 0 || 1; const random = () => ((r = (r * 1103515245 + 12345) >>> 0) / 4294967296);
      const d = buildDeck(m.leader, poolFor(m.leader), { random, temperature: 0.8, oldBias: m.old ? 2.5 : 0 });
      post({ type: "built", id: m.id, deck: d, text: d ? deckToText(d) : null });
    } else if (m.type === "replay") {
      post({ type: "replay", id: m.id, replay: playReplay(m.job, m.bot, m.budget ?? 16) });
    } else if (m.type === "run") {
      for (const job of m.jobs) post({ type: "result", id: m.id, result: playJob(job, m.bot, m.budget ?? 16) });
      post({ type: "done", id: m.id });
    }
  } catch (err: any) {
    post({ type: "error", id: m.id, message: String(err?.message ?? err) });
  }
};
