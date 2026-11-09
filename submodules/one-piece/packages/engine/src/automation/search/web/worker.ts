/**
 * Deck Lab web worker. Messages:
 *   {type:"parse", id, text}            -> {type:"parsed", id, deck, errors, warnings}
 *   {type:"names", id, ids}             -> {type:"names", id, names}
 *   {type:"run", id, jobs, bot, budget} -> {type:"result", id, result}... then {type:"done", id}
 */
import "@tcg/op-cards";
import { getCard, hasCard } from "@tcg/op-cards";
import { playJob } from "../play.ts";
import { parseDecklist } from "../decklist.ts";

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
    } else if (m.type === "run") {
      for (const job of m.jobs) post({ type: "result", id: m.id, result: playJob(job, m.bot, m.budget ?? 16) });
      post({ type: "done", id: m.id });
    }
  } catch (err: any) {
    post({ type: "error", id: m.id, message: String(err?.message ?? err) });
  }
};
