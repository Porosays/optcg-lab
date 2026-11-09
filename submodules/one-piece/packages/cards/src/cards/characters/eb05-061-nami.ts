import type { CharacterCard } from "@tcg/op-types";
import { eb05Nami061I18n } from "./eb05-061-nami.i18n.ts";

export const eb05Nami061: CharacterCard = {
  id: "EB05-061",
  canonicalId: "EB05-061",
  slug: "nami/eb05-061",
  name: "Nami",
  printings: [
    {
      id: "EB05-061",
      artId: "EB05-061",
      setCode: "EB05",
      collectorNumber: "061",
      rarity: "SEC",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/EB05-061_ZNZ4pSv.jpg",
      label: "Nami (061)",
    },
    {
      id: "EB05-061_p1",
      artId: "EB05-061",
      setCode: "EB05",
      collectorNumber: "061",
      rarity: "SEC",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/EB05-061_i92XWTH.jpg",
      label: "Nami (061) (Alternate Art)",
    },
  ],
  cardType: "character",
  color: ["red"],
  rarity: "SEC",
  setId: "EB05",
  cost: 3,
  power: 4000,
  counter: 2000,
  traits: ["Straw Hat Crew"],
  attribute: "special",
  effect:
    "[Once Per Turn] If one of your Characters with 6000 base power or less would be removed from the field by your opponent, you may add 1 card from the top of your Life cards to your hand instead.\n[On Play] Play up to 1 red Character card with a cost of 2 or less from your hand.",
  effects: {
    effects: [
      {
        trigger: "onPlay",
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
                value: 2
              },
              {
                filter: "color",
                value: "red"
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
  i18n: eb05Nami061I18n,
};
