import type { CharacterCard } from "@tcg/op-types";
import { op18KiwiMozu063I18n } from "./op18-063-kiwi-mozu.i18n.ts";

export const op18KiwiMozu063: CharacterCard = {
  id: "OP18-063",
  canonicalId: "OP18-063",
  slug: "kiwi-mozu/op18-063",
  name: "Kiwi & Mozu",
  printings: [
    {
      id: "OP18-063",
      artId: "OP18-063",
      setCode: "OP18",
      collectorNumber: "063",
      rarity: "UC",
      imageUrl: "",
    },
  ],
  cardType: "character",
  color: ["purple"],
  rarity: "UC",
  setId: "OP18",
  cost: 3,
  power: 1000,
  counter: 2000,
  traits: ["Water Seven","The Franky Family"],
  attribute: "slash",
  effect:
    "[On Play] You may K.O. 1 of your Stages with a cost of 5 or less: Add up to 1 DON!! card as rested from your DON!! deck.",
  i18n: op18KiwiMozu063I18n,
};
