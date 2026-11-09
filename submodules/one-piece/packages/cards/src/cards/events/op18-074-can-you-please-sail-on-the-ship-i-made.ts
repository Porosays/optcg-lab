import type { EventCard } from "@tcg/op-types";
import { op18CanYouPleaseSailOnTheShipIMade074I18n } from "./op18-074-can-you-please-sail-on-the-ship-i-made.i18n.ts";

export const op18CanYouPleaseSailOnTheShipIMade074: EventCard = {
  id: "OP18-074",
  canonicalId: "OP18-074",
  slug: "can-you-please-sail-on-the-ship-i-made/op18-074",
  name: "Can You Please Sail on the Ship I Made?!",
  printings: [
    {
      id: "OP18-074",
      artId: "OP18-074",
      setCode: "OP18",
      collectorNumber: "074",
      rarity: "R",
      imageUrl: "",
    },
  ],
  cardType: "event",
  color: ["purple"],
  rarity: "R",
  setId: "OP18",
  cost: 1,
  traits: ["Water Seven","The Franky Family"],
  effect:
    "[Counter] If you have a Stage with a cost of 5 or more, up to 1 of your Leader or Characters gains +4000 power during this battle. [Trigger] DON!! −1: Add up to 2 Stage cards from your trash to your hand.",
  effects: {
    effects: [
      {
        trigger: "trigger",
        costs: [
          {
            cost: "returnDon",
            amount: 1
          }
        ],
        actions: [
          {
            action: "returnToHand",
            target: {
              player: "self",
              zones: [
                "trash"
              ],
              count: {
                amount: 2,
                upTo: true
              },
              filters: [
                {
                  filter: "cardCategory",
                  value: "stage"
                }
              ]
            }
          }
        ]
      }
    ]
  },
  i18n: op18CanYouPleaseSailOnTheShipIMade074I18n,
};
