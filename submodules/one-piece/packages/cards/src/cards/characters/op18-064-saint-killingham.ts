import type { CharacterCard } from "@tcg/op-types";
import { op18SaintKillingham064I18n } from "./op18-064-saint-killingham.i18n.ts";

export const op18SaintKillingham064: CharacterCard = {
  id: "OP18-064",
  canonicalId: "OP18-064",
  slug: "saint-killingham/op18-064",
  name: "Saint Killingham",
  printings: [
    {
      id: "OP18-064",
      artId: "OP18-064",
      setCode: "OP18",
      collectorNumber: "064",
      rarity: "UC",
      imageUrl: "",
    },
  ],
  cardType: "character",
  color: ["purple"],
  rarity: "UC",
  setId: "OP18",
  cost: 5,
  power: 6000,
  counter: 1000,
  traits: ["Celestial Dragons Holy Knights of God"],
  attribute: "special",
  effect:
    "[Your Turn] [On Play] DON!! −1: Up to 1 of your opponent's Characters with 7000 base power or less and up to 1 of your opponent's Characters with 5000 base power or less cannot attack until the end of your opponent's next End Phase.[On K.O.] DON!! −1: Play this Character card from your trash.",
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
        costs: [
          {
            cost: "returnDon",
            amount: 1
          }
        ],
        actions: [
          {
            action: "cannotAttack",
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
                  filter: "basePower",
                  comparison: "lte",
                  value: 5000
                }
              ]
            },
            duration: "untilEndOfOpponentNextEndPhase"
          }
        ],
        optional: true
      },
      {
        trigger: "onKo",
        costs: [
          {
            cost: "returnDon",
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
              amount: 1
            },
            self: true
          }
        ],
        optional: true
      }
    ]
  },
  i18n: op18SaintKillingham064I18n,
};
