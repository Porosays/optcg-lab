import type { EventCard } from "@tcg/op-types";
import { op18IPrayForYourSuccess059I18n } from "./op18-059-i-pray-for-your-success.i18n.ts";

export const op18IPrayForYourSuccess059: EventCard = {
  id: "OP18-059",
  canonicalId: "OP18-059",
  slug: "i-pray-for-your-success/op18-059",
  name: "I Pray For Your Success.",
  printings: [
    {
      id: "OP18-059",
      artId: "OP18-059",
      setCode: "OP18",
      collectorNumber: "059",
      rarity: "R",
      imageUrl: "",
    },
  ],
  cardType: "event",
  color: ["blue"],
  rarity: "R",
  setId: "OP18",
  cost: 0,
  traits: ["The Seven Warlords of the Sea Baroque Works"],
  effect:
    "[Main] You may rest 1 of your DON!! cards and trash 1 card with a type including \"Baroque Works\" from your hand: Draw 2 cards.[Counter] You may trash 1 card from your hand: Up to 1 of your Leader or Characters gains +3000 power during this battle.",
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
            cost: "trashFromHand",
            amount: 1,
            filters: [
              {
                filter: "trait",
                value: "Baroque Works",
                match: "includes"
              }
            ]
          }
        ],
        actions: [
          {
            action: "draw",
            player: "self",
            amount: 2
          }
        ],
        optional: true
      },
      {
        trigger: "counter",
        costs: [
          {
            cost: "trashFromHand",
            amount: 1
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
            value: 3000,
            duration: "thisBattle"
          }
        ],
        optional: true
      }
    ]
  },
  i18n: op18IPrayForYourSuccess059I18n,
};
