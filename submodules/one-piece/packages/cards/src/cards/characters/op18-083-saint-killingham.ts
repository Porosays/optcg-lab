import type { CharacterCard } from "@tcg/op-types";
import { op18SaintKillingham083I18n } from "./op18-083-saint-killingham.i18n.ts";

export const op18SaintKillingham083: CharacterCard = {
  id: "OP18-083",
  canonicalId: "OP18-083",
  slug: "saint-killingham/op18-083",
  name: "Saint Killingham",
  printings: [
    {
      id: "OP18-083",
      artId: "OP18-083",
      setCode: "OP18",
      collectorNumber: "083",
      rarity: "R",
      imageUrl: "",
    },
  ],
  cardType: "character",
  color: ["black"],
  rarity: "R",
  setId: "OP18",
  cost: 5,
  power: 6000,
  counter: 1000,
  traits: ["Celestial Dragons Holy Knights of God"],
  attribute: "special",
  effect:
    "[Your Turn] [On Play] Play up to 1 [Sleeptids] from your trash.[On K.O.] You may trash 2 cards from your hand: Play this Character card from your trash.",
  effects: {
    effects: [
      {
        trigger: "onPlay",
        conditions: [
          {
            condition: "turn",
            value: "your"
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
                filter: "name",
                value: "Sleeptids"
              }
            ]
          }
        ]
      },
      {
        trigger: "onKo",
        costs: [
          {
            cost: "trashFromHand",
            amount: 2
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
              amount: 1
            },
            self: true
          }
        ],
        optional: true
      }
    ]
  },
  i18n: op18SaintKillingham083I18n,
};
