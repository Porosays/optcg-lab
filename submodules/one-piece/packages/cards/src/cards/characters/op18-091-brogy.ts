import type { CharacterCard } from "@tcg/op-types";
import { op18Brogy091I18n } from "./op18-091-brogy.i18n.ts";

export const op18Brogy091: CharacterCard = {
  id: "OP18-091",
  canonicalId: "OP18-091",
  slug: "brogy/op18-091",
  name: "Brogy",
  printings: [
    {
      id: "OP18-091",
      artId: "OP18-091",
      setCode: "OP18",
      collectorNumber: "091",
      rarity: "C",
      imageUrl: "",
    },
  ],
  cardType: "character",
  color: ["black"],
  rarity: "C",
  setId: "OP18",
  cost: 4,
  power: 5000,
  counter: 2000,
  traits: ["Giant","Elbaph","Giant Pirates"],
  attribute: "slash",
  effect:
    "This Character gains +12 cost.[When Attacking] You may trash 1 card from your hand: Add up to 1 of your Character cards with a cost of 2 or less from your trash to your hand.",
  effects: {
    effects: [
      {
        trigger: "whenAttacking",
        costs: [
          {
            cost: "trashFromHand",
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
                amount: 1,
                upTo: true
              },
              filters: [
                {
                  filter: "cardCategory",
                  value: "character"
                },
                {
                  filter: "cost",
                  comparison: "lte",
                  value: 2
                }
              ]
            }
          }
        ],
        optional: true
      }
    ],
    permanentEffects: [
      {
        actions: [
          {
            action: "modifyCost",
            target: {
              player: "self",
              zones: [
                "character"
              ],
              count: {
                amount: 1
              },
              self: true
            },
            value: 12
          }
        ]
      }
    ]
  },
  i18n: op18Brogy091I18n,
};
