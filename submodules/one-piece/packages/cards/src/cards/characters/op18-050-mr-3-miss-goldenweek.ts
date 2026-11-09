import type { CharacterCard } from "@tcg/op-types";
import { op18Mr3MissGoldenweek050I18n } from "./op18-050-mr-3-miss-goldenweek.i18n.ts";

export const op18Mr3MissGoldenweek050: CharacterCard = {
  id: "OP18-050",
  canonicalId: "OP18-050",
  slug: "mr-3-miss-goldenweek/op18-050",
  name: "Mr.3 & Miss.Goldenweek",
  printings: [
    {
      id: "OP18-050",
      artId: "OP18-050",
      setCode: "OP18",
      collectorNumber: "050",
      rarity: "R",
      imageUrl: "",
    },
  ],
  cardType: "character",
  color: ["blue"],
  rarity: "R",
  setId: "OP18",
  cost: 5,
  power: 6000,
  counter: 1000,
  traits: ["Baroque Works"],
  attribute: ["special","wisdom"],
  effect:
    "[Blocker][On Play] If your Leader's type includes \"Baroque Works\", up to 1 of your opponent's Characters with a cost of 7 or less cannot attack until the end of your opponent's next End Phase.",
  effects: {
    keywords: [
      "blocker"
    ],
    effects: [
      {
        trigger: "onPlay",
        conditions: [
          {
            condition: "leaderTrait",
            trait: "Baroque Works",
            match: "includes"
          }
        ],
        actions: [
          {
            action: "cannotAttack",
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
        ]
      }
    ]
  },
  i18n: op18Mr3MissGoldenweek050I18n,
};
