import type { CharacterCard } from "@tcg/op-types";
import { op18Koza006I18n } from "./op18-006-koza.i18n.ts";

export const op18Koza006: CharacterCard = {
  id: "OP18-006",
  canonicalId: "OP18-006",
  slug: "koza/op18-006",
  name: "Koza",
  printings: [
    {
      id: "OP18-006",
      artId: "OP18-006",
      setCode: "OP18",
      collectorNumber: "006",
      rarity: "C",
      imageUrl: "",
    },
  ],
  cardType: "character",
  color: ["red"],
  rarity: "C",
  setId: "OP18",
  cost: 3,
  power: 4000,
  counter: 2000,
  traits: ["Alabasta"],
  attribute: "slash",
  effect:
    "If you have [Nefeltari Vivi], this Character gains [Rush] and +1000 power.(This card can attack on the turn in which it is played.)",
  effects: {
    permanentEffects: [
      {
        conditions: [
          {
            condition: "hasCard",
            player: "self",
            zone: "field",
            filters: [
              {
                filter: "name",
                value: "Nefeltari Vivi"
              }
            ]
          }
        ],
        actions: [
          {
            action: "grantKeyword",
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
            keyword: "rush",
            duration: "permanent"
          },
          {
            action: "modifyPower",
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
            value: 1000,
            duration: "permanent"
          }
        ]
      }
    ]
  },
  i18n: op18Koza006I18n,
};
