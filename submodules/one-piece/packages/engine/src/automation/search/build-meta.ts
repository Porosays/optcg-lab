/** Validate scraped tournament lists and write decks/meta.json. bun build-meta.ts lists.json */
import { readFileSync, writeFileSync } from "node:fs";
import { getCard } from "@tcg/op-cards";
import { BANNED, BANNED_PAIRS, parseDecklist } from "./decklist.ts";
const lists = JSON.parse(readFileSync(process.argv[2]!, "utf8"));
const out: any[] = [];
for (const l of lists) {
  const p = parseDecklist(l.text, l.name);
  const ids = p.deck ? [p.deck.leader, ...p.deck.main] : [];
  const banned = ids.filter((id) => BANNED.has(getCard(id).canonicalId));
  const pairs = BANNED_PAIRS.filter(([a, b]) => ids.includes(a) && ids.includes(b));
  const main = p.deck?.main.length ?? 0;
  console.log(`${p.deck && !banned.length && !pairs.length ? "OK " : "BAD"} ${l.name} (${main} main) ${p.errors.join("; ")} ${banned.length ? "banned:" + banned : ""} ${pairs.length ? "pair:" + pairs : ""}`);
  if (p.deck && !banned.length && !pairs.length) out.push({ name: l.name, leader: p.deck.leader, main: p.deck.main, source: l.src, note: l.note });
}
writeFileSync(new URL(process.argv[3] ?? "./decks/meta.json", import.meta.url), JSON.stringify(out, null, 1));
console.log(`wrote ${out.length} decks`);
