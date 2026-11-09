import type { CharacterCard } from "@tcg/op-types";
import { eb05Speed035I18n } from "./eb05-035-speed.i18n.ts";

export const eb05Speed035: CharacterCard = {
  id: "EB05-035",
  canonicalId: "EB05-035",
  slug: "speed/eb05-035",
  name: "Speed",
  printings: [
    {
      id: "EB05-035",
      artId: "EB05-035",
      setCode: "EB05",
      collectorNumber: "035",
      rarity: "C",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/EB05-035_kew2Jmp.jpg",
    },
  ],
  cardType: "character",
  color: ["purple"],
  rarity: "C",
  setId: "EB05",
  cost: 6,
  power: 6000,
  counter: 1000,
  traits: ["Animal Kingdom Pirates","SMILE"],
  attribute: "strike",
  effect:
    "[On Play] DON!! -1: Look at 5 cards from the top of your deck; reveal up to 2 {SMILE} type cards and add them to your hand, then place the rest at the bottom of your deck in any order. Then, play up to 2 {SMILE} type Character cards with 5000 power or less from your hand.",
  effects: {
    effects: [
      {
        trigger: "onPlay",
        costs: [
          {
            cost: "returnDon",
            amount: 1
          }
        ],
        actions: [
          {
            action: "search",
            lookCount: 5,
            source: {
              player: "self",
              zone: "deck"
            },
            revealCount: {
              amount: 2,
              upTo: true
            },
            revealFilters: [
              {
                filter: "trait",
                value: "SMILE",
                match: "exact"
              }
            ],
            revealDestination: "hand",
            remainderPosition: "bottom"
          },
          {
            action: "play",
            source: {
              player: "self",
              zone: "hand"
            },
            count: {
              amount: 2,
              upTo: true
            },
            filters: [
              {
                filter: "power",
                comparison: "lte",
                value: 5000
              },
              {
                filter: "trait",
                value: "SMILE",
                match: "exact"
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
    ]
  },
  i18n: eb05Speed035I18n,
};
