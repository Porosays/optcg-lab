import type { CharacterCard } from "@tcg/op-types";
import { eb05LittleSadi024I18n } from "./eb05-024-little-sadi.i18n.ts";

export const eb05LittleSadi024: CharacterCard = {
  id: "EB05-024",
  canonicalId: "EB05-024",
  slug: "little-sadi/eb05-024",
  name: "Little Sadi",
  printings: [
    {
      id: "EB05-024",
      artId: "EB05-024",
      setCode: "EB05",
      collectorNumber: "024",
      rarity: "R",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/EB05-024_tVcd5ja.jpg",
    },
  ],
  cardType: "character",
  color: ["blue"],
  rarity: "R",
  setId: "EB05",
  cost: 1,
  power: 0,
  counter: 1000,
  traits: ["Impel Down"],
  attribute: "wisdom",
  effect:
    "If your Leader has the {Impel Down} type, this Character gains [Blocker] and +2 cost.\n(After your opponent declares an attack, you may rest this card to make it the new target of the attack.)",
  effects: {
    permanentEffects: [
      {
        conditions: [
          {
            condition: "leaderTrait",
            trait: "Impel Down",
            match: "exact"
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
            keyword: "blocker",
            duration: "permanent"
          },
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
            value: 2,
            duration: "permanent"
          }
        ]
      }
    ]
  },
  i18n: eb05LittleSadi024I18n,
};
