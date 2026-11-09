import type { CharacterCard } from "@tcg/op-types";
import { op18Onigumo098I18n } from "./op18-098-onigumo.i18n.ts";

export const op18Onigumo098: CharacterCard = {
  id: "OP18-098",
  canonicalId: "OP18-098",
  slug: "onigumo/op18-098",
  name: "Onigumo",
  printings: [
    {
      id: "OP18-098",
      artId: "OP18-098",
      setCode: "OP18",
      collectorNumber: "098",
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
  effect: "[Unblockable] (This card cannot be blocked.)",
  effects: {
    keywords: [
      "unblockable"
    ]
  },
  i18n: op18Onigumo098I18n,
};
