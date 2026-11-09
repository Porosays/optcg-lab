import type { CharacterCard } from "@tcg/op-types";
import { op18ZoroSogeking027I18n } from "./op18-027-zoro-sogeking.i18n.ts";

export const op18ZoroSogeking027: CharacterCard = {
  id: "OP18-027",
  canonicalId: "OP18-027",
  slug: "zoro-sogeking/op18-027",
  name: "Zoro & Sogeking",
  printings: [
    {
      id: "OP18-027",
      artId: "OP18-027",
      setCode: "OP18",
      collectorNumber: "027",
      rarity: "R",
      imageUrl: "",
    },
  ],
  cardType: "character",
  color: ["green"],
  rarity: "R",
  setId: "OP18",
  cost: 5,
  power: 6000,
  traits: ["Sniper Island Water Seven Straw Hat Crew"],
  attribute: ["slash","ranged"],
  effect:
    "[Opponent's Turn] The base power of your active [Monkey.D.Luffy] Leader with 3 or more DON!! cards given becomes 7000.[On Play] Set up to 2 of your DON!! cards as active. Then, up to 1 of your opponent's Characters with a cost of 6 or less cannot be rested until the end of your opponent's next End Phase.",
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
                amount: 2,
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
              },
              filters: [
                {
                  filter: "cost",
                  comparison: "lte",
                  value: 6
                }
              ]
            },
            duration: "untilEndOfOpponentNextEndPhase"
          }
        ]
      }
    ]
  },
  i18n: op18ZoroSogeking027I18n,
};
