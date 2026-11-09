import type { EventCard } from "@tcg/op-types";
import { op18IMLateIMVeryLate095I18n } from "./op18-095-i-m-late-i-m-very-late.i18n.ts";

export const op18IMLateIMVeryLate095: EventCard = {
  id: "OP18-095",
  canonicalId: "OP18-095",
  slug: "i-m-late-i-m-very-late/op18-095",
  name: "I'm Late, I'm Very Late!!",
  printings: [
    {
      id: "OP18-095",
      artId: "OP18-095",
      setCode: "OP18",
      collectorNumber: "095",
      rarity: "UC",
      imageUrl: "",
    },
  ],
  cardType: "event",
  color: ["black"],
  rarity: "UC",
  setId: "OP18",
  cost: 1,
  traits: ["Celestial Dragons Holy Knights of God"],
  effect:
    "[Main] If your Leader has the {Celestial Dragons} type, look at 5 cards from the top of your deck; reveal up to 1 [Sleeptids] or {Holy Knights of God} type card and add it to your hand. Then, place the rest at the bottom of your deck in any order. [Trigger] Activate this card's [Main] effect.",
  effects: {
    effects: [
      {
        trigger: "main",
        conditions: [
          {
            condition: "leaderTrait",
            trait: "Celestial Dragons",
            match: "exact"
          }
        ],
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
                    value: "Sleeptids"
                  },
                  {
                    filter: "trait",
                    value: "Holy Knights of God",
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
            action: "activateEffect",
            effectTrigger: "main"
          }
        ]
      }
    ]
  },
  i18n: op18IMLateIMVeryLate095I18n,
};
