import { writeFileSync } from "node:fs";
import { TEST_DECKS } from "../test-decks.ts";
const out = Object.entries(TEST_DECKS).map(([name, d]) => ({ name, leader: d.leaderId, main: d.mainDeck }));
writeFileSync(new URL("./decks/test-decks.json", import.meta.url), JSON.stringify(out, null, 1));
console.log(out.length, "decks");
