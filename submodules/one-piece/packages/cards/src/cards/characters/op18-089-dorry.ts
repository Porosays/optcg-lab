import type { CharacterCard } from "@tcg/op-types";
import { op18Dorry089I18n } from "./op18-089-dorry.i18n.ts";

export const op18Dorry089: CharacterCard = {
  id: "OP18-089",
  canonicalId: "OP18-089",
  slug: "dorry/op18-089",
  name: "Dorry",
  printings: [
    {
      id: "OP18-089",
      artId: "OP18-089",
      setCode: "OP18",
      collectorNumber: "089",
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
    "This Character gains +12 cost.[On Play] You may trash 1 card from your hand: Your opponent trashes 1 card from their hand.",
  effects: {
    effects: [
      {
        trigger: "onPlay",
        costs: [
          {
            cost: "trashFromHand",
            amount: 1
          }
        ],
        actions: [
          {
            action: "trashFromHand",
            player: "opponent",
            amount: 1
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
  i18n: op18Dorry089I18n,
};
