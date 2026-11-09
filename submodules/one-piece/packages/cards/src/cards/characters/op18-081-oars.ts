import type { CharacterCard } from "@tcg/op-types";
import { op18Oars081I18n } from "./op18-081-oars.i18n.ts";

export const op18Oars081: CharacterCard = {
  id: "OP18-081",
  canonicalId: "OP18-081",
  slug: "oars/op18-081",
  name: "Oars",
  printings: [
    {
      id: "OP18-081",
      artId: "OP18-081",
      setCode: "OP18",
      collectorNumber: "081",
      rarity: "C",
      imageUrl: "",
    },
  ],
  cardType: "character",
  color: ["black"],
  rarity: "C",
  setId: "OP18",
  cost: 10,
  power: 11000,
  traits: ["Giant","Thriller Bark Pirates"],
  attribute: "strike",
  effect:
    "If you have a [Gecko Moria] Character, this Character gains [Double Attack] and [Blocker]. [Trigger] Play up to 1 {Thriller Bark Pirates} type Character card with a cost of 4 or less from your trash rested.",
  effects: {
    effects: [
      {
        trigger: "trigger",
        actions: [
          {
            action: "play",
            source: {
              player: "self",
              zone: "trash"
            },
            count: {
              amount: 1,
              upTo: true
            },
            filters: [
              {
                filter: "cost",
                comparison: "lte",
                value: 4
              },
              {
                filter: "trait",
                value: "Thriller Bark Pirates",
                match: "exact"
              },
              {
                filter: "cardCategory",
                value: "character"
              }
            ],
            playState: "rested"
          }
        ]
      }
    ]
  },
  i18n: op18Oars081I18n,
};
