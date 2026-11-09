import type { EventCard } from "@tcg/op-types";
import { op18TenFingerPistol115I18n } from "./op18-115-ten-finger-pistol.i18n.ts";

export const op18TenFingerPistol115: EventCard = {
  id: "OP18-115",
  canonicalId: "OP18-115",
  slug: "ten-finger-pistol/op18-115",
  name: "Ten Finger Pistol",
  printings: [
    {
      id: "OP18-115",
      artId: "OP18-115",
      setCode: "OP18",
      collectorNumber: "115",
      rarity: "UC",
      imageUrl: "",
    },
  ],
  cardType: "event",
  color: ["yellow"],
  rarity: "UC",
  setId: "OP18",
  cost: 4,
  traits: ["CP9"],
  effect:
    "[Main] K.O. up to 1 of your opponent's Characters with a cost of 5 or less. [Trigger] If your Leader's type includes \"CP\", draw 1 card and place up to 1 Character with a cost of 7 or less at the bottom of the owner's deck.",
  effects: {
    effects: [
      {
        trigger: "main",
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
                  filter: "cost",
                  comparison: "lte",
                  value: 5
                }
              ]
            }
          }
        ]
      },
      {
        trigger: "trigger",
        conditions: [
          {
            condition: "leaderTrait",
            trait: "CP",
            match: "includes"
          }
        ],
        actions: [
          {
            action: "draw",
            player: "self",
            amount: 1
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
                  value: 7
                }
              ]
            },
            position: "bottom"
          }
        ]
      }
    ]
  },
  i18n: op18TenFingerPistol115I18n,
};
