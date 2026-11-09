import type { CharacterCard } from "@tcg/op-types";
import { op18NefeltariVivi011I18n } from "./op18-011-nefeltari-vivi.i18n.ts";

export const op18NefeltariVivi011: CharacterCard = {
  id: "OP18-011",
  canonicalId: "OP18-011",
  slug: "nefeltari-vivi/op18-011",
  name: "Nefeltari Vivi",
  printings: [
    {
      id: "OP18-011",
      artId: "OP18-011",
      setCode: "OP18",
      collectorNumber: "011",
      rarity: "SR",
      imageUrl: "",
    },
  ],
  cardType: "character",
  color: ["red"],
  rarity: "SR",
  setId: "OP18",
  cost: 2,
  power: 0,
  counter: 1000,
  traits: ["Alabasta"],
  attribute: "wisdom",
  effect:
    "All of your Characters with both the {Animal} and {Alabasta} types gain +1000 power.[Opponent's Turn] This Character gains [Blocker] and +6000 power.",
  effects: {
    permanentEffects: [
      {
        conditions: [
          {
            condition: "turn",
            value: "opponent"
          }
        ],
        actions: [
          {
            action: "grantKeyword",
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
            keyword: "blocker",
            duration: "permanent"
          },
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
            value: 6000,
            duration: "permanent"
          }
        ]
      }
    ]
  },
  i18n: op18NefeltariVivi011I18n,
};
