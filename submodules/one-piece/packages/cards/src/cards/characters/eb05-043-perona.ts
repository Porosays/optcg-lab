import type { CharacterCard } from "@tcg/op-types";
import { eb05Perona043I18n } from "./eb05-043-perona.i18n.ts";

export const eb05Perona043: CharacterCard = {
  id: "EB05-043",
  canonicalId: "EB05-043",
  slug: "perona/eb05-043",
  name: "Perona",
  printings: [
    {
      id: "EB05-043",
      artId: "EB05-043",
      setCode: "EB05",
      collectorNumber: "043",
      rarity: "R",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/EB05-043_KzeHlX6.jpg",
    },
    {
      id: "EB05-043_p1",
      artId: "EB05-043",
      setCode: "EB05",
      collectorNumber: "043",
      rarity: "R",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/EB05-043_cAwYMcA.jpg",
      label: "Perona (Alternate Art)",
    },
  ],
  cardType: "character",
  color: ["black"],
  rarity: "R",
  setId: "EB05",
  cost: 4,
  power: 5000,
  counter: 2000,
  traits: ["Thriller Bark Pirates"],
  attribute: "special",
  effect:
    "[On K.O.] K.O. or rest up to 1 of your opponent's Characters with a cost of 6 or less.",
  effects: {
    effects: [
      {
        trigger: "onKo",
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
  i18n: eb05Perona043I18n,
};
