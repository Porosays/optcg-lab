import type { CharacterCard } from "@tcg/op-types";
import { op18SaintSommers088I18n } from "./op18-088-saint-sommers.i18n.ts";

export const op18SaintSommers088: CharacterCard = {
  id: "OP18-088",
  canonicalId: "OP18-088",
  slug: "saint-sommers/op18-088",
  name: "Saint Sommers",
  printings: [
    {
      id: "OP18-088",
      artId: "OP18-088",
      setCode: "OP18",
      collectorNumber: "088",
      rarity: "R",
      imageUrl: "",
    },
  ],
  cardType: "character",
  color: ["black"],
  rarity: "R",
  setId: "OP18",
  cost: 6,
  power: 6000,
  counter: 2000,
  traits: ["Celestial Dragons Holy Knights of God"],
  attribute: "special",
  effect:
    "[Your Turn] [On Play] If you have 6 or more DON!! cards on your field, K.O. up to 1 of your opponent's Characters with a base cost of 4 or less.[On K.O.] You may trash 2 cards from your hand: Play this Character card from your trash.",
  effects: {
    effects: [
      {
        trigger: "onPlay",
        conditions: [
          {
            condition: "turn",
            value: "your"
          },
          {
            condition: "donFieldCount",
            player: "self",
            comparison: "gte",
            value: 6
          }
        ],
        actions: [
          {
            action: "ko",
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
                  filter: "baseCost",
                  comparison: "lte",
                  value: 4
                }
              ]
            }
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
  i18n: op18SaintSommers088I18n,
};
