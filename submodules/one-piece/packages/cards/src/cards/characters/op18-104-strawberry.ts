import type { CharacterCard } from "@tcg/op-types";
import { op18Strawberry104I18n } from "./op18-104-strawberry.i18n.ts";

export const op18Strawberry104: CharacterCard = {
  id: "OP18-104",
  canonicalId: "OP18-104",
  slug: "strawberry/op18-104",
  name: "Strawberry",
  printings: [
    {
      id: "OP18-104",
      artId: "OP18-104",
      setCode: "OP18",
      collectorNumber: "104",
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
    "[Banish] (When this card deals damage, the target card is trashed without activating its Trigger.)",
  effects: {
    keywords: [
      "banish"
    ]
  },
  i18n: op18Strawberry104I18n,
};
