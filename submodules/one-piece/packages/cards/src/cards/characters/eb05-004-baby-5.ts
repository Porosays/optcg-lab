import type { CharacterCard } from "@tcg/op-types";
import { eb05Baby5004I18n } from "./eb05-004-baby-5.i18n.ts";

export const eb05Baby5004: CharacterCard = {
  id: "EB05-004",
  canonicalId: "EB05-004",
  slug: "baby-5/eb05-004",
  name: "Baby 5",
  printings: [
    {
      id: "EB05-004",
      artId: "EB05-004",
      setCode: "EB05",
      collectorNumber: "004",
      rarity: "R",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/EB05-004_A5NFkrc.jpg",
    },
    {
      id: "EB05-004_p1",
      artId: "EB05-004_p1",
      setCode: "EB05",
      collectorNumber: "004",
      rarity: "R",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/EB05-004_p1_yhS6mpz.jpg",
      label: "Baby 5 (Alternate Art)",
    },
  ],
  cardType: "character",
  color: ["red"],
  rarity: "R",
  setId: "EB05",
  cost: 4,
  power: 6000,
  traits: ["Punk Hazard","Donquixote Pirates"],
  attribute: "special",
  effect:
    "[On Play] You may reveal 2 Event cards from your hand: Draw 2 cards.\n[On K.O.] Play up to 1 Character card with 6000 power or less from your hand rested.",
  effects: {
    effects: [
      {
        trigger: "onPlay",
        actions: [
          {
            action: "draw",
            player: "self",
            amount: 2
          }
        ],
        optional: true
      },
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
  i18n: eb05Baby5004I18n,
};
