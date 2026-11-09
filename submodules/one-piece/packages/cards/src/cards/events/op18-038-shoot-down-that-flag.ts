import type { EventCard } from "@tcg/op-types";
import { op18ShootDownThatFlag038I18n } from "./op18-038-shoot-down-that-flag.i18n.ts";

export const op18ShootDownThatFlag038: EventCard = {
  id: "OP18-038",
  canonicalId: "OP18-038",
  slug: "shoot-down-that-flag/op18-038",
  name: "Shoot Down That Flag.",
  printings: [
    {
      id: "OP18-038",
      artId: "OP18-038",
      setCode: "OP18",
      collectorNumber: "038",
      rarity: "UC",
      imageUrl: "",
    },
  ],
  cardType: "event",
  color: ["green"],
  rarity: "UC",
  setId: "OP18",
  cost: 1,
  traits: ["Water Seven Straw Hat Crew"],
  effect:
    "[Main] Look at 5 cards from the top of your deck; reveal up to 1 [Sogeking] or {Straw Hat Crew} type card and add it to your hand. Then, place the rest at the bottom of your deck in any order. [Trigger] Draw 1 card.",
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
                filter: "anyOf",
                filters: [
                  {
                    filter: "name",
                    value: "Sogeking"
                  },
                  {
                    filter: "trait",
                    value: "Straw Hat Crew",
                    match: "exact"
                  }
                ]
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
  i18n: op18ShootDownThatFlag038I18n,
};
