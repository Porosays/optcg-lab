import type { CharacterCard } from "@tcg/op-types";
import { op18Jerry102I18n } from "./op18-102-jerry.i18n.ts";

export const op18Jerry102: CharacterCard = {
  id: "OP18-102",
  canonicalId: "OP18-102",
  slug: "jerry/op18-102",
  name: "Jerry",
  printings: [
    {
      id: "OP18-102",
      artId: "OP18-102",
      setCode: "OP18",
      collectorNumber: "102",
      rarity: "C",
      imageUrl: "",
    },
  ],
  cardType: "character",
  color: ["yellow"],
  rarity: "C",
  setId: "OP18",
  cost: 4,
  power: 6000,
  counter: 1000,
  traits: ["CP6"],
  attribute: "strike",
  i18n: op18Jerry102I18n,
};
