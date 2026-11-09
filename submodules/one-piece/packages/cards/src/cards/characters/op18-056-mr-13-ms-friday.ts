import type { CharacterCard } from "@tcg/op-types";
import { op18Mr13MsFriday056I18n } from "./op18-056-mr-13-ms-friday.i18n.ts";

export const op18Mr13MsFriday056: CharacterCard = {
  id: "OP18-056",
  canonicalId: "OP18-056",
  slug: "mr-13-ms-friday/op18-056",
  name: "Mr.13 & Ms.Friday",
  printings: [
    {
      id: "OP18-056",
      artId: "OP18-056",
      setCode: "OP18",
      collectorNumber: "056",
      rarity: "C",
      imageUrl: "",
    },
  ],
  cardType: "character",
  color: ["blue"],
  rarity: "C",
  setId: "OP18",
  cost: 2,
  power: 3000,
  counter: 1000,
  traits: ["Animal Baroque Works"],
  attribute: "wisdom",
  effect:
    "[DON!! x1] This Character gains +1000 power.[On Play] You may place 1 of your Characters with a type including \"Baroque Works\" other than this Character at the bottom of your deck: Your opponent trashes 1 card from their hand.",
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
  i18n: op18Mr13MsFriday056I18n,
};
