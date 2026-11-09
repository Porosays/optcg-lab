import type { CharacterCard } from "@tcg/op-types";
import { eb05Ripley047I18n } from "./eb05-047-ripley.i18n.ts";

export const eb05Ripley047: CharacterCard = {
  id: "EB05-047",
  canonicalId: "EB05-047",
  slug: "ripley/eb05-047",
  name: "Ripley",
  printings: [
    {
      id: "EB05-047",
      artId: "EB05-047",
      setCode: "EB05",
      collectorNumber: "047",
      rarity: "R",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/EB05-047_rqaM0Tp.jpg",
    },
  ],
  cardType: "character",
  color: ["black"],
  rarity: "R",
  setId: "EB05",
  cost: 4,
  power: 4000,
  counter: 2000,
  traits: ["Giant","Elbaph"],
  attribute: "wisdom",
  effect:
    "This Character gains +12 cost.\n[On Play] You may trash 1 card from your hand: Play up to 1 Character card with a cost of 2 or less from your trash.",
  effects: {
    effects: [
      {
        trigger: "onPlay",
        costs: [
          {
            cost: "trashFromHand",
            amount: 1
          }
        ],
        actions: [
          {
            action: "play",
            source: {
              player: "self",
              zone: "trash"
            },
            count: {
              amount: 1,
              upTo: true
            },
            filters: [
              {
                filter: "cost",
                comparison: "lte",
                value: 2
              },
              {
                filter: "cardCategory",
                value: "character"
              }
            ]
          }
        ],
        optional: true
      }
    ],
    permanentEffects: [
      {
        actions: [
          {
            action: "modifyCost",
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
            value: 12
          }
        ]
      }
    ]
  },
  i18n: eb05Ripley047I18n,
};
