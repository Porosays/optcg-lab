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
