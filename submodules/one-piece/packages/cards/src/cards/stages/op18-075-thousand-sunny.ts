import type { StageCard } from "@tcg/op-types";
import { op18ThousandSunny075I18n } from "./op18-075-thousand-sunny.i18n.ts";

export const op18ThousandSunny075: StageCard = {
  id: "OP18-075",
  canonicalId: "OP18-075",
  slug: "thousand-sunny/op18-075",
  name: "Thousand Sunny",
  printings: [
    {
      id: "OP18-075",
      artId: "OP18-075",
      setCode: "OP18",
      collectorNumber: "075",
      rarity: "R",
      imageUrl: "",
    },
  ],
  cardType: "stage",
  color: ["purple"],
  rarity: "R",
  setId: "OP18",
  cost: 5,
  traits: ["Straw Hat Crew"],
  effect:
    "[On Play] Draw 1 card, then add up to 1 DON!! card as rested from your DON!! deck.[Activate: Main] DON!! −2, you may rest this Stage: Set up to 1 of your {Straw Hat Crew} type Characters with 7000 power or less as active.",
  effects: {
    effects: [
      {
        trigger: "onPlay",
        actions: [
          {
            action: "draw",
            player: "self",
            amount: 1
          }
        ]
      },
      {
        trigger: "activateMain",
        costs: [
          {
            cost: "returnDon",
            amount: 2
          },
          {
            cost: "restThisCard"
          }
        ],
        actions: [
          {
            action: "setActive",
            target: {
              player: "self",
              zones: [
                "character"
              ],
              count: {
                amount: 1,
                upTo: true
              },
              filters: [
                {
                  filter: "trait",
                  value: "Straw Hat Crew",
                  match: "exact"
                },
                {
                  filter: "power",
                  comparison: "lte",
                  value: 7000
                }
              ]
            }
          }
        ],
        optional: true
      }
    ]
  },
  i18n: op18ThousandSunny075I18n,
};
