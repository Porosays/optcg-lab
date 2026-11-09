import type { CharacterCard } from "@tcg/op-types";
import { op18MonkeyDLuffy118I18n } from "./op18-118-monkey-d-luffy.i18n.ts";

export const op18MonkeyDLuffy118: CharacterCard = {
  id: "OP18-118",
  canonicalId: "OP18-118",
  slug: "monkey-d-luffy/op18-118",
  name: "Monkey.D.Luffy",
  printings: [
    {
      id: "OP18-118",
      artId: "OP18-118",
      setCode: "OP18",
      collectorNumber: "118",
      rarity: "SEC",
      imageUrl: "",
    },
  ],
  cardType: "character",
  color: ["green"],
  rarity: "SEC",
  setId: "OP18",
  cost: 9,
  power: 10000,
  traits: ["Water Seven Straw Hat Crew"],
  attribute: "strike",
  effect:
    "[On Play] Set up to 3 of your DON!! cards as active. Then, up to 1 of your opponent's Characters cannot be rested until the end of your opponent's next End Phase.[End of Your Turn] Set up to 1 of your {Water Seven} type cards as active.",
  effects: {
    effects: [
      {
        trigger: "onPlay",
        actions: [
          {
            action: "setActive",
            target: {
              player: "self",
              zones: [
                "costArea"
              ],
              count: {
                amount: 3,
                upTo: true
              }
            }
          },
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
              }
            },
            duration: "untilEndOfOpponentNextEndPhase"
          }
        ]
      },
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
          }
        ]
      }
    ]
  },
  i18n: op18MonkeyDLuffy118I18n,
};
