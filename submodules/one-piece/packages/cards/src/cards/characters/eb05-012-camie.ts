import type { CharacterCard } from "@tcg/op-types";
import { eb05Camie012I18n } from "./eb05-012-camie.i18n.ts";

export const eb05Camie012: CharacterCard = {
  id: "EB05-012",
  canonicalId: "EB05-012",
  slug: "camie/eb05-012",
  name: "Camie",
  printings: [
    {
      id: "EB05-012",
      artId: "EB05-012",
      setCode: "EB05",
      collectorNumber: "012",
      rarity: "R",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/EB05-012_YIi0cGx.jpg",
    },
  ],
  cardType: "character",
  color: ["green"],
  rarity: "R",
  setId: "EB05",
  cost: 3,
  power: 0,
  counter: 2000,
  traits: ["Merfolk","Fish-Man Island"],
  attribute: "wisdom",
  effect:
    "[On Play] Rest up to 1 of your opponent's Characters with a cost of 6 or less.",
  effects: {
    effects: [
      {
        trigger: "onPlay",
        actions: [
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
      }
    ]
  },
  i18n: eb05Camie012I18n,
};
