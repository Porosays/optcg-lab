import type { CharacterCard } from "@tcg/op-types";
import { op18SenorPink068I18n } from "./op18-068-senor-pink.i18n.ts";

export const op18SenorPink068: CharacterCard = {
  id: "OP18-068",
  canonicalId: "OP18-068",
  slug: "senor-pink/op18-068",
  name: "Senor Pink",
  printings: [
    {
      id: "OP18-068",
      artId: "OP18-068",
      setCode: "OP18",
      collectorNumber: "068",
      rarity: "C",
      imageUrl: "",
    },
  ],
  cardType: "character",
  color: ["purple"],
  rarity: "C",
  setId: "OP18",
  cost: 8,
  power: 9000,
  traits: ["Donquixote Pirates"],
  attribute: "special",
  effect:
    "[Once Per Turn] If this Character would be K.O.'d, you may DON!! −1 instead.[On Play] DON!! −1: Up to 1 of your opponent's Characters with a cost of 7 or less cannot be rested until the end of your opponent's next End Phase.",
  effects: {
    effects: [
      {
        trigger: "onPlay",
        costs: [
          {
            cost: "returnDon",
            amount: 1
          }
        ],
        actions: [
          {
            action: "cannotBeRested",
            target: {
              player: "opponent",
              zones: [
                "character"
              ],
              count: {
                amount: 1,
                upTo: true
              },
              filters: [
                {
                  filter: "cost",
                  comparison: "lte",
                  value: 7
                }
              ]
            },
            duration: "untilEndOfOpponentNextEndPhase"
          }
        ],
        optional: true
      }
    ]
  },
  i18n: op18SenorPink068I18n,
};
