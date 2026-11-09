import type { CharacterCard } from "@tcg/op-types";
import { op18Momonga111I18n } from "./op18-111-momonga.i18n.ts";

export const op18Momonga111: CharacterCard = {
  id: "OP18-111",
  canonicalId: "OP18-111",
  slug: "momonga/op18-111",
  name: "Momonga",
  printings: [
    {
      id: "OP18-111",
      artId: "OP18-111",
      setCode: "OP18",
      collectorNumber: "111",
      rarity: "C",
      imageUrl: "",
    },
  ],
  cardType: "character",
  color: ["yellow"],
  rarity: "C",
  setId: "OP18",
  cost: 7,
  power: 7000,
  counter: 2000,
  traits: ["Vice Admiral Navy"],
  attribute: "slash",
  effect:
    "[Rush] (This card can attack on the turn in which it is played.)",
  effects: {
    keywords: [
      "rush"
    ]
  },
  i18n: op18Momonga111I18n,
};
