import type { CharacterCard } from "@tcg/op-types";
import { eb05Otohime011I18n } from "./eb05-011-otohime.i18n.ts";

export const eb05Otohime011: CharacterCard = {
  id: "EB05-011",
  canonicalId: "EB05-011",
  slug: "otohime/eb05-011",
  name: "Otohime",
  printings: [
    {
      id: "EB05-011",
      artId: "EB05-011",
      setCode: "EB05",
      collectorNumber: "011",
      rarity: "C",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/EB05-011_1FI53ge.jpg",
    },
  ],
  cardType: "character",
  color: ["green"],
  rarity: "C",
  setId: "EB05",
  cost: 1,
  power: 0,
  counter: 2000,
  traits: ["Merfolk","Fish-Man Island"],
  attribute: "wisdom",
  effect:
    "[On Play] If your Leader is [Shirahoshi], you may turn 1 card from the top of your Life cards face-down: Rest up to 1 of your opponent's Characters with a cost of 5 or less.",
  effects: {
    effects: [
      {
        trigger: "onPlay",
        costs: [
          {
            cost: "turnLifeFaceUp",
            count: 1,
            faceUp: false
          }
        ],
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
                  value: 5
                }
              ]
            },
            condition: {
              condition: "leaderName",
              name: "Shirahoshi"
            }
          }
        ],
        optional: true,
        conditions: [
          {
            condition: "leaderName",
            name: "Shirahoshi"
          }
        ]
      }
    ]
  },
  i18n: eb05Otohime011I18n,
};
