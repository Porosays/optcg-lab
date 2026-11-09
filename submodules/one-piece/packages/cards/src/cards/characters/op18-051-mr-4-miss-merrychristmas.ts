import type { CharacterCard } from "@tcg/op-types";
import { op18Mr4MissMerryChristmas051I18n } from "./op18-051-mr-4-miss-merrychristmas.i18n.ts";

export const op18Mr4MissMerryChristmas051: CharacterCard = {
  id: "OP18-051",
  canonicalId: "OP18-051",
  slug: "mr-4-miss-merrychristmas/op18-051",
  name: "Mr.4 & Miss.MerryChristmas",
  printings: [
    {
      id: "OP18-051",
      artId: "OP18-051",
      setCode: "OP18",
      collectorNumber: "051",
      rarity: "R",
      imageUrl: "",
    },
  ],
  cardType: "character",
  color: ["blue"],
  rarity: "R",
  setId: "OP18",
  cost: 2,
  power: 3000,
  counter: 1000,
  traits: ["Baroque Works"],
  attribute: ["slash","strike"],
  effect:
    "[DON!! x1] This Character gains +1000 power.[On Play] You may rest 5 of your DON!! cards: Place up to 1 Character with a cost of 6 or less and up to 1 Character with a cost of 5 or less at the bottom of the owner's deck in any order of the owner's choosing.",
  effects: {
    permanentEffects: [
      {
        conditions: [
          {
            condition: "donAttached",
            amount: 1
          }
        ],
        actions: [
          {
            action: "modifyPower",
            target: {
              player: "self",
              zones: [
                "character"
              ],
              count: {
                amount: 1
              },
              self: true
            },
            value: 1000,
            duration: "permanent"
          }
        ]
      }
    ]
  },
  i18n: op18Mr4MissMerryChristmas051I18n,
};
