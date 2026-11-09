/** Swap cards the engine doesn't have (e.g. EB05) for the closest legal stand-in; prints every swap. */
import { readFileSync, writeFileSync } from "node:fs";
import { hasCard, getCard } from "@tcg/op-cards";
import { parseDecklist, poolFor, cost, counter } from "./decklist.ts";
const NAMES: Record<string, { name: string; cost: number }> = JSON.parse(process.argv[4] ?? "{}");
const lists = JSON.parse(readFileSync(process.argv[2]!, "utf8")); const out: any[] = [];
for (const l of lists) {
  const entries = [...l.text.matchAll(/(\d+)\s*x\s*([A-Z]+\d*-\d+)/gi)].map((m: any) => [Number(m[1]), m[2].toUpperCase()] as [number, string]);
  const leader = entries.find(([, id]) => hasCard(id) && getCard(id).cardType === "leader")![1];
  const pool = poolFor(leader); const used = new Set(entries.map(([, id]) => id)); const swaps: string[] = [];
  const fixed = entries.map(([n, id]) => {
    if (hasCard(id)) return [n, id] as [number, string];
    const want = NAMES[id];
    const byName = want ? pool.filter((c) => getCard(c).name === want.name && !used.has(c)) : [];
    const cands = (byName.length ? byName : pool.filter((c) => !used.has(c) && (!want || Math.abs(cost(c) - want.cost) <= 0)))
      .sort((a, b) => counter(b) - counter(a));
    const sub = cands[0]!; used.add(sub); swaps.push(`${n}x ${id}${want ? " " + want.name : ""} -> ${sub} ${getCard(sub).name}`);
    return [n, sub] as [number, string];
  });
  const text = fixed.map(([n, id]) => `${n}x${id}`).join(" ");
  const p = parseDecklist(text, l.name);
  console.log(`${p.deck ? "OK " : "BAD"} ${l.name}: ${swaps.join("; ") || "no swaps"} ${p.errors.join("; ")}`);
  if (p.deck) out.push({ name: swaps.length ? `${l.name} (EB05 stand-in)` : l.name, leader: p.deck.leader, main: p.deck.main, source: l.src, note: l.note + (swaps.length ? `; stand-ins: ${swaps.join("; ")}` : "") });
}
writeFileSync(process.argv[3]!, JSON.stringify(out, null, 1));
