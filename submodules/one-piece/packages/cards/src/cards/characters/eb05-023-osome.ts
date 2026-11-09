import type { CharacterCard } from "@tcg/op-types";
import { eb05Osome023I18n } from "./eb05-023-osome.i18n.ts";

export const eb05Osome023: CharacterCard = {
  id: "EB05-023",
  canonicalId: "EB05-023",
  slug: "osome/eb05-023",
  name: "Osome",
  printings: [
    {
      id: "EB05-023",
      artId: "EB05-023",
      setCode: "EB05",
      collectorNumber: "023",
      rarity: "C",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/EB05-023_rcO6Fss.jpg",
    },
  ],
  cardType: "character",
  color: ["blue"],
  rarity: "C",
  setId: "EB05",
  cost: 1,
  power: 0,
  counter: 2000,
  traits: ["Land of Wano"],
  attribute: "wisdom",
  effect:
    "[On Play] You may trash 2 Events from your hand: Draw 3 cards.",
  effects: {
    effects: [
      {
        trigger: "onPlay",
        costs: [
          {
            cost: "trashFromHand",
            amount: 2,
            filters: [
              {
                filter: "cardCategory",
                value: "event"
              }
            ]
          }
        ],
        actions: [
          {
            action: "draw",
            player: "self",
            amount: 3
          }
        ],
        optional: true
      }
    ]
  },
  i18n: eb05Osome023I18n,
};
