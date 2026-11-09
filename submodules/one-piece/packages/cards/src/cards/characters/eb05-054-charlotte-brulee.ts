import type { CharacterCard } from "@tcg/op-types";
import { eb05CharlotteBrulee054I18n } from "./eb05-054-charlotte-brulee.i18n.ts";

export const eb05CharlotteBrulee054: CharacterCard = {
  id: "EB05-054",
  canonicalId: "EB05-054",
  slug: "charlotte-brulee/eb05-054",
  name: "Charlotte Brulee",
  printings: [
    {
      id: "EB05-054",
      artId: "EB05-054",
      setCode: "EB05",
      collectorNumber: "054",
      rarity: "C",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/EB05-054_IBUFcp1.jpg",
    },
  ],
  cardType: "character",
  color: ["yellow"],
  rarity: "C",
  setId: "EB05",
  cost: 3,
  power: 4000,
  counter: 1000,
  trigger:
    "Play up to 2 {Big Mom Pirates} type Character cards with 4000 power from your hand.",
  traits: ["Big Mom Pirates"],
  attribute: "special",
  effect:
    "[Trigger] Play up to 2 {Big Mom Pirates} type Character cards with 4000 power from your hand.",
  effects: {
    effects: [
      {
        trigger: "trigger",
        actions: [
          {
            action: "play",
            source: {
              player: "self",
              zone: "hand"
            },
            count: {
              amount: 2,
              upTo: true
            },
            filters: [
              {
                filter: "power",
                comparison: "eq",
                value: 4000
              },
              {
                filter: "trait",
                value: "Big Mom Pirates",
                match: "exact"
              },
              {
                filter: "cardCategory",
                value: "character"
              }
            ]
          }
        ]
      }
    ]
  },
  i18n: eb05CharlotteBrulee054I18n,
};
