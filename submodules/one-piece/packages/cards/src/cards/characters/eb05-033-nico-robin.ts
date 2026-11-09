import type { CharacterCard } from "@tcg/op-types";
import { eb05NicoRobin033I18n } from "./eb05-033-nico-robin.i18n.ts";

export const eb05NicoRobin033: CharacterCard = {
  id: "EB05-033",
  canonicalId: "EB05-033",
  slug: "nico-robin/eb05-033",
  name: "Nico Robin",
  printings: [
    {
      id: "EB05-033",
      artId: "EB05-033",
      setCode: "EB05",
      collectorNumber: "033",
      rarity: "R",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/EB05-033_iJ2kOF6.jpg",
      label: "Nico Robin (033)",
    },
  ],
  cardType: "character",
  color: ["purple"],
  rarity: "R",
  setId: "EB05",
  cost: 1,
  power: 2000,
  counter: 2000,
  traits: ["Straw Hat Crew"],
  attribute: "strike",
  effect:
    "[On Play] If your Leader has the {Straw Hat Crew} type and the number of DON!! cards on your field is at least 6 less than the number on your opponent's field, draw 3 cards and trash 2 cards from your hand. Then, add up to 4 DON!! cards as rested from your DON!! deck.",
  effects: {
    effects: [
      {
        trigger: "onPlay",
        conditions: [
          {
            condition: "compound",
            operator: "and",
            conditions: [
              {
                condition: "leaderTrait",
                trait: "Straw Hat Crew",
                match: "exact"
              },
              {
                condition: "donFieldComparison",
                selfComparison: "lte",
                difference: 6
              }
            ]
          }
        ],
        actions: [
          {
            action: "draw",
            player: "self",
            amount: 3
          },
          {
            action: "trashFromHand",
            player: "self",
            amount: 2
          }
        ]
      }
    ]
  },
  i18n: eb05NicoRobin033I18n,
};
