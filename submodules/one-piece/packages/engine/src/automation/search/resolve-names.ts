/** Turn name+cost decklists (e.g. LogDuel images) into card ids. Only accepts unambiguous matches. */
import { readFileSync, writeFileSync } from "node:fs";
import { getAllCards, getCard } from "@tcg/op-cards";
const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
const decks = JSON.parse(readFileSync(process.argv[2]!, "utf8"));
const out: any[] = [];
for (const d of decks) {
  const L = getCard(d.leader); const used = new Set<string>(); const lines = [`1x${d.leader}`]; const problems: string[] = [];
  const pool = getAllCards().filter((c) => c.id === c.canonicalId && c.cardType !== "leader" && c.color.some((x) => L.color.includes(x)));
  for (const [name, cost, n, fixed] of d.cards as Array<[string, number, number, string?]>) {
    if (fixed) { used.add(fixed); lines.push(`${n}x${fixed}`); continue; }
    let m = pool.filter((c) => norm(c.name).startsWith(norm(name)) && ((c as any).cost ?? 0) === cost && !used.has(c.id));
    if (m.length > 1) { const pref = m.filter((c) => (d.prefer ?? []).some((p: string) => c.id.startsWith(p))); if (pref.length) m = pref; }
    if (m.length === 1 || (m.length > 1 && d.takeFirst?.includes(name))) { used.add(m[0]!.id); lines.push(`${n}x${m[0]!.id}`); }
    else problems.push(`${name} (cost ${cost}): ${m.length ? m.map((c) => c.id).join("/") : "no match"}`);
  }
  console.log(`${problems.length ? "AMBIGUOUS" : "OK"} ${d.name}${problems.length ? " -> " + problems.join("; ") : ""}`);
  if (!problems.length) out.push({ name: d.name, src: d.src, note: d.note, text: lines.join(" ") });
}
writeFileSync(process.argv[3]!, JSON.stringify(out, null, 1));
