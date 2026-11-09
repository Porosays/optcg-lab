import type { CharacterCard } from "@tcg/op-types";
import { op18SaintGunko084I18n } from "./op18-084-saint-gunko.i18n.ts";

export const op18SaintGunko084: CharacterCard = {
  id: "OP18-084",
  canonicalId: "OP18-084",
  slug: "saint-gunko/op18-084",
  name: "Saint Gunko",
  printings: [
    {
      id: "OP18-084",
      artId: "OP18-084",
      setCode: "OP18",
      collectorNumber: "084",
      rarity: "SR",
      imageUrl: "",
    },
  ],
  cardType: "character",
  color: ["black"],
  rarity: "SR",
  setId: "OP18",
  cost: 1,
  power: 2000,
  traits: ["Celestial Dragons Holy Knights of God"],
  attribute: "special",
  effect:
    "[On Play] Look at 4 cards from the top of your deck; reveal up to 1 {Holy Knights of God} type card and add it to your hand. Then, trash the rest.[Activate: Main] You may rest 4 of your DON!! cards: Play up to 1 {Holy Knights of God} type Character card with a cost of 6 or less from your trash.",
  effects: {
    effects: [
      {
        trigger: "onPlay",
        actions: [
          {
            action: "search",
            lookCount: 4,
            source: {
              player: "self",
              zone: "deck"
            },
            revealCount: {
              amount: 1,
              upTo: true
            },
            revealFilters: [
              {
                filter: "trait",
                value: "Holy Knights of God",
                match: "exact"
              }
            ],
            revealDestination: "hand",
            remainderPosition: "trash"
          }
        ]
      },
      {
        trigger: "activateMain",
        costs: [
          {
            cost: "restDon",
            amount: 4
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
                value: 6
              },
              {
                filter: "trait",
                value: "Holy Knights of God",
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
  i18n: op18SaintGunko084I18n,
};
