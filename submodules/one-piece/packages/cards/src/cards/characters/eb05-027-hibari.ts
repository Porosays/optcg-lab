import type { CharacterCard } from "@tcg/op-types";
import { eb05Hibari027I18n } from "./eb05-027-hibari.i18n.ts";

export const eb05Hibari027: CharacterCard = {
  id: "EB05-027",
  canonicalId: "EB05-027",
  slug: "hibari/eb05-027",
  name: "Hibari",
  printings: [
    {
      id: "EB05-027",
      artId: "EB05-027",
      setCode: "EB05",
      collectorNumber: "027",
      rarity: "R",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/EB05-027_lM6VtxM.jpg",
    },
  ],
  cardType: "character",
  color: ["blue"],
  rarity: "R",
  setId: "EB05",
  cost: 5,
  power: 6000,
  counter: 1000,
  traits: ["Navy","SWORD"],
  attribute: "ranged",
  effect:
    "[On Play] Draw 3 cards and trash 2 cards from your hand. Then, place up to 1 Character with a cost of 2 or less at the bottom of the owner's deck.",
  effects: {
    effects: [
      {
        trigger: "onPlay",
        actions: [
          {
            action: "draw",
            player: "self",
            amount: 3
          },
          {
            action: "trashFromHand",
            player: "self",
            amount: 2
          },
          {
            action: "returnToDeck",
            target: {
              player: "any",
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
                  value: 2
                }
              ]
            },
            position: "bottom"
          }
        ]
      }
    ]
  },
  i18n: eb05Hibari027I18n,
};
