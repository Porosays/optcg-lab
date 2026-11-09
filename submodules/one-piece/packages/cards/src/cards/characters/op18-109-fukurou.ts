import type { CharacterCard } from "@tcg/op-types";
import { op18Fukurou109I18n } from "./op18-109-fukurou.i18n.ts";

export const op18Fukurou109: CharacterCard = {
  id: "OP18-109",
  canonicalId: "OP18-109",
  slug: "fukurou/op18-109",
  name: "Fukurou",
  printings: [
    {
      id: "OP18-109",
      artId: "OP18-109",
      setCode: "OP18",
      collectorNumber: "109",
      rarity: "UC",
      imageUrl: "",
    },
  ],
  cardType: "character",
  color: ["yellow"],
  rarity: "UC",
  setId: "OP18",
  cost: 5,
  power: 4000,
  counter: 2000,
  traits: ["CP9"],
  attribute: "strike",
  effect:
    "[Blocker] [Trigger] If your Leader's type includes \"CP\", K.O. or rest up to 1 of your opponent's Characters with a cost of 6 or less.",
  effects: {
    keywords: [
      "blocker"
    ],
    effects: [
      {
        trigger: "trigger",
        conditions: [
          {
            condition: "leaderTrait",
            trait: "CP",
            match: "includes"
          }
        ],
        actions: [
          {
            action: "choice",
            options: [
              [
                {
                  action: "ko",
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
                  }
                }
              ],
              [
                {
                  action: "rest",
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
                  }
                }
              ]
            ]
          }
        ]
      }
    ]
  },
  i18n: op18Fukurou109I18n,
};
