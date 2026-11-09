import type { EventCard } from "@tcg/op-types";
import { op18HeeHeeHeeISmellAdventure094I18n } from "./op18-094-hee-hee-hee-i-smell-adventure.i18n.ts";

export const op18HeeHeeHeeISmellAdventure094: EventCard = {
  id: "OP18-094",
  canonicalId: "OP18-094",
  slug: "hee-hee-hee-i-smell-adventure/op18-094",
  name: "Hee Hee Hee!! I Smell Adventure!!",
  printings: [
    {
      id: "OP18-094",
      artId: "OP18-094",
      setCode: "OP18",
      collectorNumber: "094",
      rarity: "C",
      imageUrl: "",
    },
  ],
  cardType: "event",
  color: ["black"],
  rarity: "C",
  setId: "OP18",
  cost: 1,
  traits: ["Elbaph","The Four Emperors","Straw Hat Crew"],
  effect:
    "[Main] Look at 5 cards from the top of your deck; reveal up to 1 {Elbaph} type card and add it to your hand. Then, place the rest at the bottom of your deck in any order. [Trigger] Draw 1 card.",
  effects: {
    effects: [
      {
        trigger: "main",
        actions: [
          {
            action: "search",
            lookCount: 5,
            source: {
              player: "self",
              zone: "deck"
            },
            revealCount: {
              amount: 1,
              upTo: true
            },
            revealFilters: [
              {
                filter: "trait",
                value: "Elbaph",
                match: "exact"
              }
            ],
            revealDestination: "hand",
            remainderPosition: "bottom"
          }
        ]
      },
      {
        trigger: "trigger",
        actions: [
          {
            action: "draw",
            player: "self",
            amount: 1
          }
        ]
      }
    ]
  },
  i18n: op18HeeHeeHeeISmellAdventure094I18n,
};
