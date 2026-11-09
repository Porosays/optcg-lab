import type { CharacterCard } from "@tcg/op-types";
import { eb05Atlas050I18n } from "./eb05-050-atlas.i18n.ts";

export const eb05Atlas050: CharacterCard = {
  id: "EB05-050",
  canonicalId: "EB05-050",
  slug: "atlas/eb05-050",
  name: "Atlas",
  printings: [
    {
      id: "EB05-050",
      artId: "EB05-050",
      setCode: "EB05",
      collectorNumber: "050",
      rarity: "R",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/EB05-050_yLIItTS.jpg",
    },
  ],
  cardType: "character",
  color: ["yellow"],
  rarity: "R",
  setId: "EB05",
  cost: 1,
  power: 2000,
  counter: 1000,
  trigger: "Activate this card's [On Play] effect.",
  traits: ["Scientist","Egghead"],
  attribute: "wisdom",
  effect:
    "[On Play] Look at 4 cards from the top of your deck; reveal up to 1 card with the \"Wisdom\" attribute and add it to your hand. Then, place the rest at the bottom of your deck in any order.",
  effects: {
    effects: [
      {
        trigger: "onPlay",
        actions: [
          {
            action: "search",
            lookCount: 4,
            source: {
              player: "self",
              zone: "deck"
            },
            revealCount: {
              amount: 1,
              upTo: true
            },
            revealDestination: "hand",
            remainderPosition: "bottom"
          }
        ]
      },
      {
        trigger: "trigger",
        actions: [
          {
            action: "activateEffect",
            effectTrigger: "onPlay"
          }
        ]
      }
    ]
  },
  i18n: eb05Atlas050I18n,
};
