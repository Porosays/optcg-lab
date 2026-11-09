import type { EventCard } from "@tcg/op-types";
import { eb05HedgehogStinger048I18n } from "./eb05-048-hedgehog-stinger.i18n.ts";

export const eb05HedgehogStinger048: EventCard = {
  id: "EB05-048",
  canonicalId: "EB05-048",
  slug: "hedgehog-stinger/eb05-048",
  name: "Hedgehog Stinger",
  printings: [
    {
      id: "EB05-048",
      artId: "EB05-048",
      setCode: "EB05",
      collectorNumber: "048",
      rarity: "R",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/EB05-048_Xzs4LAB.jpg",
    },
  ],
  cardType: "event",
  color: ["black"],
  rarity: "R",
  setId: "EB05",
  cost: 1,
  traits: ["Baroque Works"],
  effect:
    "[Main] You may rest 1 of your DON!! cards and K.O. 1 of your Characters with a type including \"Baroque Works\": All of your opponent's Characters with a cost of 0 cannot activate [Blocker] during this turn.\n[Counter] Your Leader gains +3000 power during this battle.",
  effects: {
    effects: [
      {
        trigger: "main",
        costs: [
          {
            cost: "restDon",
            amount: 1
          },
          {
            cost: "koCharacter",
            amount: 1
          }
        ],
        actions: [
          {
            action: "cannotActivate",
            target: {
              player: "opponent",
              zones: [
                "character"
              ],
              count: {
                amount: "all"
              },
              filters: [
                {
                  filter: "cost",
                  comparison: "eq",
                  value: 0
                }
              ]
            },
            keyword: "blocker",
            duration: "thisTurn"
          }
        ],
        optional: true
      },
      {
        trigger: "counter",
        actions: [
          {
            action: "modifyPower",
            target: {
              player: "self",
              zones: [
                "leader"
              ],
              count: {
                amount: 1
              }
            },
            value: 3000,
            duration: "thisBattle"
          }
        ]
      }
    ]
  },
  i18n: eb05HedgehogStinger048I18n,
};
