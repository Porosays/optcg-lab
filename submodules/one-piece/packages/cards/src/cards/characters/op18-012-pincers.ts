import type { CharacterCard } from "@tcg/op-types";
import { op18Pincers012I18n } from "./op18-012-pincers.i18n.ts";

export const op18Pincers012: CharacterCard = {
  id: "OP18-012",
  canonicalId: "OP18-012",
  slug: "pincers/op18-012",
  name: "Pincers",
  printings: [
    {
      id: "OP18-012",
      artId: "OP18-012",
      setCode: "OP18",
      collectorNumber: "012",
      rarity: "UC",
      imageUrl: "",
    },
  ],
  cardType: "character",
  color: ["red"],
  rarity: "UC",
  setId: "OP18",
  cost: 1,
  power: 0,
  counter: 2000,
  traits: ["Animal","Alabasta"],
  attribute: "strike",
  effect:
    "[When Attacking] Up to 1 of your Characters with both the {Animal} and {Alabasta} types gains +1000 power during this turn.",
  effects: {
    effects: [
      {
        trigger: "whenAttacking",
        actions: [
          {
            action: "modifyPower",
            target: {
              player: "self", zones: ["character"], count: { amount: 1, upTo: true },
              filters: [{ filter: "trait", value: "Animal", match: "exact" }, { filter: "trait", value: "Alabasta", match: "exact" }],
            },
            value: 1000,
            duration: "thisTurn",
          },
        ],
      },
    ],
  },
  i18n: op18Pincers012I18n,
};
