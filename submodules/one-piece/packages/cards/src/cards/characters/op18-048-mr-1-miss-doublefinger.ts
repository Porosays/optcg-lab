import type { CharacterCard } from "@tcg/op-types";
import { op18Mr1MissDoublefinger048I18n } from "./op18-048-mr-1-miss-doublefinger.i18n.ts";

export const op18Mr1MissDoublefinger048: CharacterCard = {
  id: "OP18-048",
  canonicalId: "OP18-048",
  slug: "mr-1-miss-doublefinger/op18-048",
  name: "Mr.1 & Miss Doublefinger",
  printings: [
    {
      id: "OP18-048",
      artId: "OP18-048",
      setCode: "OP18",
      collectorNumber: "048",
      rarity: "SR",
      imageUrl: "",
    },
  ],
  cardType: "character",
  color: ["blue"],
  rarity: "SR",
  setId: "OP18",
  cost: 6,
  power: 6000,
  traits: ["Baroque Works"],
  attribute: "slash",
  effect:
    "[Rush] (This card can attack on the turn in which it is played.)[On Play] Play up to 1 Character card with a type including \"Baroque Works\" and a cost of 5 or less from your hand.",
  effects: {
    keywords: [
      "rush"
    ],
    effects: [
      {
        trigger: "onPlay",
        actions: [
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
                value: 5
              },
              {
                filter: "trait",
                value: "Baroque Works",
                match: "includes"
              },
              {
                filter: "cardCategory",
                value: "character"
              }
            ]
          }
        ]
      }
    ]
  },
  i18n: op18Mr1MissDoublefinger048I18n,
};
