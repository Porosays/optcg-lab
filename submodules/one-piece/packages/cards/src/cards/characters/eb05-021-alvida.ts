import type { CharacterCard } from "@tcg/op-types";
import { eb05Alvida021I18n } from "./eb05-021-alvida.i18n.ts";

export const eb05Alvida021: CharacterCard = {
  id: "EB05-021",
  canonicalId: "EB05-021",
  slug: "alvida/eb05-021",
  name: "Alvida",
  printings: [
    {
      id: "EB05-021",
      artId: "EB05-021",
      setCode: "EB05",
      collectorNumber: "021",
      rarity: "SR",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/EB05-021_UC0jwJC.jpg",
    },
    {
      id: "EB05-021_p1",
      artId: "EB05-021_p1",
      setCode: "EB05",
      collectorNumber: "021",
      rarity: "SR",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/EB05-021_p1_7YPtxu1.jpg",
      label: "Alvida (Super Rare Alternate Art)",
    },
  ],
  cardType: "character",
  color: ["blue"],
  rarity: "SR",
  setId: "EB05",
  cost: 9,
  power: 7000,
  counter: 1000,
  traits: ["Cross Guild"],
  attribute: "strike",
  effect:
    "[On Play] Draw 2 cards and play up to 1 {Cross Guild} type Character card with a cost of 8 or less from your hand. Then, you cannot play Character cards during this turn.\n[When Attacking] Negate the effect of up to 1 of your opponent's Characters during this turn.",
  effects: {
    effects: [
      {
        trigger: "onPlay",
        actions: [
          {
            action: "draw",
            player: "self",
            amount: 2
          },
          {
            action: "play",
            source: {
              player: "self",
              zone: "hand"
            },
            count: {
              amount: 1,
              upTo: true
            },
            filters: [
              {
                filter: "cost",
                comparison: "lte",
                value: 8
              },
              {
                filter: "trait",
                value: "Cross Guild",
                match: "exact"
              },
              {
                filter: "cardCategory",
                value: "character"
              }
            ]
          },
          {
            action: "playRestriction",
            restriction: "cannotPlay",
            filters: [
              {
                filter: "cardCategory",
                value: "character"
              }
            ],
            duration: "thisTurn"
          }
        ]
      },
      {
        trigger: "whenAttacking",
        actions: [
          {
            action: "negateEffects",
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
            duration: "thisTurn"
          }
        ]
      }
    ]
  },
  i18n: eb05Alvida021I18n,
};
