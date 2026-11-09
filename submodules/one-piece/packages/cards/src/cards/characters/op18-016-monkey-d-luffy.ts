import type { CharacterCard } from "@tcg/op-types";
import { op18MonkeyDLuffy016I18n } from "./op18-016-monkey-d-luffy.i18n.ts";

export const op18MonkeyDLuffy016: CharacterCard = {
  id: "OP18-016",
  canonicalId: "OP18-016",
  slug: "monkey-d-luffy/op18-016",
  name: "Monkey.D.Luffy",
  printings: [
    {
      id: "OP18-016",
      artId: "OP18-016",
      setCode: "OP18",
      collectorNumber: "016",
      rarity: "C",
      imageUrl: "",
    },
  ],
  cardType: "character",
  color: ["red"],
  rarity: "C",
  setId: "OP18",
  cost: 6,
  power: 7000,
  counter: 1000,
  traits: ["Alabasta","Straw Hat Crew"],
  attribute: "strike",
  effect:
    "[Banish][On K.O.] Play up to 1 {Alabasta} type Character card with 6000 power or less from your hand.",
  effects: {
    keywords: [
      "banish"
    ],
    effects: [
      {
        trigger: "onKo",
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
                filter: "power",
                comparison: "lte",
                value: 6000
              },
              {
                filter: "trait",
                value: "Alabasta",
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
  i18n: op18MonkeyDLuffy016I18n,
};
