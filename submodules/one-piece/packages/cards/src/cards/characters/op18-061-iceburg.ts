import type { CharacterCard } from "@tcg/op-types";
import { op18Iceburg061I18n } from "./op18-061-iceburg.i18n.ts";

export const op18Iceburg061: CharacterCard = {
  id: "OP18-061",
  canonicalId: "OP18-061",
  slug: "iceburg/op18-061",
  name: "Iceburg",
  printings: [
    {
      id: "OP18-061",
      artId: "OP18-061",
      setCode: "OP18",
      collectorNumber: "061",
      rarity: "SR",
      imageUrl: "",
    },
  ],
  cardType: "character",
  color: ["purple"],
  rarity: "SR",
  setId: "OP18",
  cost: 2,
  power: 0,
  counter: 1000,
  traits: ["Water Seven Galley-La Company"],
  attribute: "wisdom",
  effect:
    "[On Play] Look at 5 cards from the top of your deck; reveal up to a total of 2 Stage cards or {Water Seven} type cards and add them to your hand. Then, place the rest at the bottom of your deck in any order.",
  i18n: op18Iceburg061I18n,
};
