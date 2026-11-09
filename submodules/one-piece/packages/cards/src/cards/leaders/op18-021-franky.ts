import type { LeaderCard } from "@tcg/op-types";
import { op18Franky021I18n } from "./op18-021-franky.i18n.ts";

export const op18Franky021: LeaderCard = {
  id: "OP18-021",
  canonicalId: "OP18-021",
  slug: "franky/op18-021",
  name: "Franky",
  printings: [
    {
      id: "OP18-021",
      artId: "OP18-021",
      setCode: "OP18",
      collectorNumber: "021",
      rarity: "L",
      imageUrl: "",
    },
  ],
  cardType: "leader",
  color: ["green","purple"],
  rarity: "L",
  setId: "OP18",
  power: 5000,
  life: 4,
  traits: ["Water Seven The Franky Family Straw Hat Crew"],
  attribute: "strike",
  effect:
    "All Stage cards in your hand have a +3000 Counter.[Activate: Main] [Once Per Turn] DON!! −1: Play up to 1 Stage card with a cost of 5 or less from your hand.",
  effects: {
    effects: [
      {
        trigger: "activateMain",
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
                filter: "cardCategory",
                value: "stage"
              }
            ]
          }
        ],
        optional: true,
        oncePerTurn: true
      }
    ]
  },
  i18n: op18Franky021I18n,
};
