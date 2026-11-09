import type { EventCard } from "@tcg/op-types";
import { op18ILlMakeTheCall096I18n } from "./op18-096-i-ll-make-the-call.i18n.ts";

export const op18ILlMakeTheCall096: EventCard = {
  id: "OP18-096",
  canonicalId: "OP18-096",
  slug: "i-ll-make-the-call/op18-096",
  name: "I'll Make the Call",
  printings: [
    {
      id: "OP18-096",
      artId: "OP18-096",
      setCode: "OP18",
      collectorNumber: "096",
      rarity: "R",
      imageUrl: "",
    },
  ],
  cardType: "event",
  color: ["black"],
  rarity: "R",
  setId: "OP18",
  cost: 1,
  traits: ["Celestial Dragons Holy Knights of God"],
  effect:
    "[Main] You may rest 3 of your DON!! cards: Play up to 1 {Holy Knights of God} type Character card with a cost of 6 or less from your trash.[Counter] If you have 10 or more cards in your trash, up to 1 of your Leader or Characters gains +4000 power during this battle.",
  effects: {
    effects: [
      {
        trigger: "main",
        costs: [
          {
            cost: "restDon",
            amount: 3
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
      },
      {
        trigger: "counter",
        conditions: [
          {
            condition: "zoneCount",
            player: "self",
            zone: "trash",
            comparison: "gte",
            value: 10
          }
        ],
        actions: [
          {
            action: "modifyPower",
            target: {
              player: "self",
              zones: [
                "leader",
                "character"
              ],
              count: {
                amount: 1,
                upTo: true
              }
            },
            value: 4000,
            duration: "thisBattle"
          }
        ]
      }
    ]
  },
  i18n: op18ILlMakeTheCall096I18n,
};
