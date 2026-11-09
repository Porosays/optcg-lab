import type { CharacterCard } from "@tcg/op-types";
import { op18NicoRobin031I18n } from "./op18-031-nico-robin.i18n.ts";

export const op18NicoRobin031: CharacterCard = {
  id: "OP18-031",
  canonicalId: "OP18-031",
  slug: "nico-robin/op18-031",
  name: "Nico Robin",
  printings: [
    {
      id: "OP18-031",
      artId: "OP18-031",
      setCode: "OP18",
      collectorNumber: "031",
      rarity: "SR",
      imageUrl: "",
    },
  ],
  cardType: "character",
  color: ["green"],
  rarity: "SR",
  setId: "OP18",
  cost: 4,
  power: 5000,
  counter: 1000,
  traits: ["Water Seven Straw Hat Crew"],
  attribute: "wisdom",
  effect:
    "[Opponent's Turn] If your Character would be removed from the field by your opponent's effect, you may rest this Character instead.[End of Your Turn] Set up to 1 of your {Water Seven} type cards and up to 1 of your DON!! cards as active.",
  effects: {
    effects: [
      {
        trigger: "endOfYourTurn",
        actions: [
          {
            action: "setActive",
            target: {
              player: "self",
              zones: [
                "leader",
                "character",
                "stage",
                "costArea"
              ],
              count: {
                amount: 1,
                upTo: true
              },
              filters: [
                {
                  filter: "trait",
                  value: "Water Seven",
                  match: "exact"
                }
              ]
            }
          },
          {
            action: "setActive",
            target: {
              player: "self",
              zones: [
                "costArea"
              ],
              count: {
                amount: 1,
                upTo: true
              }
            }
          }
        ]
      }
    ],
    replacementEffects: [
      {
        replacedEvent: "removeFromField",
        target: {
          player: "self",
          zones: [
            "character"
          ],
          count: {
            amount: 1
          }
        },
        source: "opponentEffect",
        replacementAction: {
          action: "rest",
          target: {
            player: "self",
            zones: [
              "character"
            ],
            count: {
              amount: 1
            },
            self: true
          }
        },
        conditions: [
          {
            condition: "turn",
            value: "opponent"
          }
        ]
      }
    ]
  },
  i18n: op18NicoRobin031I18n,
};
