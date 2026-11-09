import type { CharacterCard } from "@tcg/op-types";
import { op18Mr7MissFatherSDay053I18n } from "./op18-053-mr-7-miss-father-sday.i18n.ts";

export const op18Mr7MissFatherSDay053: CharacterCard = {
  id: "OP18-053",
  canonicalId: "OP18-053",
  slug: "mr-7-miss-father-sday/op18-053",
  name: "Mr.7 & Miss.Father'sDay",
  printings: [
    {
      id: "OP18-053",
      artId: "OP18-053",
      setCode: "OP18",
      collectorNumber: "053",
      rarity: "UC",
      imageUrl: "",
    },
  ],
  cardType: "character",
  color: ["blue"],
  rarity: "UC",
  setId: "OP18",
  cost: 2,
  power: 3000,
  counter: 2000,
  traits: ["Baroque Works"],
  attribute: "ranged",
  effect:
    "[DON!! x1] This Character gains +1000 power.[On Play] Look at 3 cards from the top of your deck, reorganize them in any order and place them at the top or bottom of your deck.",
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
  i18n: op18Mr7MissFatherSDay053I18n,
};
