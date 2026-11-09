import type { CharacterCard } from "@tcg/op-types";
import { op18Doberman106I18n } from "./op18-106-doberman.i18n.ts";

export const op18Doberman106: CharacterCard = {
  id: "OP18-106",
  canonicalId: "OP18-106",
  slug: "doberman/op18-106",
  name: "Doberman",
  printings: [
    {
      id: "OP18-106",
      artId: "OP18-106",
      setCode: "OP18",
      collectorNumber: "106",
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
  effect: "[Double Attack] (This card deals 2 damage.)",
  effects: {
    keywords: [
      "doubleAttack"
    ]
  },
  i18n: op18Doberman106I18n,
};
