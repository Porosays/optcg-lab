import type { CharacterCard } from "@tcg/op-types";
import { eb05CharlottePraline053I18n } from "./eb05-053-charlotte-praline.i18n.ts";

export const eb05CharlottePraline053: CharacterCard = {
  id: "EB05-053",
  canonicalId: "EB05-053",
  slug: "charlotte-praline/eb05-053",
  name: "Charlotte Praline",
  printings: [
    {
      id: "EB05-053",
      artId: "EB05-053",
      setCode: "EB05",
      collectorNumber: "053",
      rarity: "C",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/EB05-053_ggR4Yj6.jpg",
    },
  ],
  cardType: "character",
  color: ["yellow"],
  rarity: "C",
  setId: "EB05",
  cost: 4,
  power: 5000,
  counter: 1000,
  traits: ["Merfolk","Fish-Man Island","The Sun Pirates"],
  attribute: "wisdom",
  effect:
    "[When Attacking] [Once Per Turn] If your opponent has 9 or more cards in their hand, add up to 1 card from your hand to the top of your Life cards.",
  effects: {
    effects: [
      {
        trigger: "whenAttacking",
        conditions: [
          {
            condition: "handCount",
            player: "opponent",
            comparison: "gte",
            value: 9
          }
        ],
        actions: [
          {
            action: "addToLife",
            target: {
              player: "self",
              zones: [
                "hand"
              ],
              count: {
                amount: 1,
                upTo: true
              }
            },
            position: "top"
          }
        ],
        oncePerTurn: true
      }
    ]
  },
  i18n: eb05CharlottePraline053I18n,
};
