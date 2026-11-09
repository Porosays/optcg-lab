import type { CharacterCard } from "@tcg/op-types";
import { op18Brook090I18n } from "./op18-090-brook.i18n.ts";

export const op18Brook090: CharacterCard = {
  id: "OP18-090",
  canonicalId: "OP18-090",
  slug: "brook/op18-090",
  name: "Brook",
  printings: [
    {
      id: "OP18-090",
      artId: "OP18-090",
      setCode: "OP18",
      collectorNumber: "090",
      rarity: "C",
      imageUrl: "",
    },
  ],
  cardType: "character",
  color: ["black"],
  rarity: "C",
  setId: "OP18",
  cost: 7,
  power: 9000,
  counter: 1000,
  traits: ["Straw Hat Crew"],
  attribute: "slash",
  i18n: op18Brook090I18n,
};
