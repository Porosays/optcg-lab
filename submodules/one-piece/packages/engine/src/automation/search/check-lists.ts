/** Check a lists file (name/text) for legality + banlist; write the legal ones to an output deck file. */
import { readFileSync, writeFileSync } from "node:fs";
import { getCard } from "@tcg/op-cards";
import { parseDecklist, banIssues, isBlock1 } from "./decklist.ts";
const [inFile, outFile] = process.argv.slice(2);
const lists = JSON.parse(readFileSync(inFile!, "utf8")); const ok: any[] = [];
for (const l of lists) {
  // check construction without the banlist first, so we can say *why* it's illegal
  const p = parseDecklist(l.text, l.name);
  const ids = [...l.text.matchAll(/(\d+)\s*x\s*([A-Z]+\d*-\d+)/gi)].map((m: any) => m[2].toUpperCase());
  const bans = banIssues(ids.filter((id: string) => { try { getCard(id); return true; } catch { return false; } }));
  const old = ids.filter(isBlock1).length;
  console.log(`${p.deck ? "LEGAL " : "ILLEGAL"} ${l.name} — ${p.deck ? `${p.deck.main.length} main, ${old} Block-1 card types` : p.errors.join("; ")}`);
  if (p.deck) ok.push({ name: l.name, leader: p.deck.leader, main: p.deck.main, source: l.src, note: l.note });
  else if (bans.length && !p.errors.some((e) => !/^Banned/.test(e))) ok.push({ name: l.name + " (has banned cards)", leader: null, bannedOnly: true });
}
writeFileSync(outFile!, JSON.stringify(ok.filter((d) => d.leader), null, 1));
console.log(`wrote ${ok.filter((d) => d.leader).length} legal decks to ${outFile}`);
