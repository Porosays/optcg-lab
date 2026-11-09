import type { CharacterCard } from "@tcg/op-types";
import { eb05MsMonday045I18n } from "./eb05-045-ms-monday.i18n.ts";

export const eb05MsMonday045: CharacterCard = {
  id: "EB05-045",
  canonicalId: "EB05-045",
  slug: "ms-monday/eb05-045",
  name: "Ms. Monday",
  printings: [
    {
      id: "EB05-045",
      artId: "EB05-045",
      setCode: "EB05",
      collectorNumber: "045",
      rarity: "C",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/EB05-045_32YHbyA.jpg",
    },
  ],
  cardType: "character",
  color: ["black"],
  rarity: "C",
  setId: "EB05",
  cost: 2,
  power: 3000,
  counter: 1000,
  traits: ["Baroque Works"],
  attribute: "strike",
  effect:
    "[On Play] K.O. up to 1 of your Characters with a type including \"Baroque Works\".\n[On K.O.] Look at 3 cards from the top of your deck; reveal up to 1 card with a type including \"Baroque Works\" and add it to your hand. Then, trash the rest.",
  effects: {
    effects: [
      {
        trigger: "onPlay",
        actions: [
          {
            action: "ko",
            target: {
              player: "self",
              zones: [
                "character"
              ],
              count: {
                amount: 1,
                upTo: true
              },
              filters: [
                {
                  filter: "trait",
                  value: "Baroque Works",
                  match: "includes"
                }
              ]
            }
          }
        ]
      },
      {
        trigger: "onKo",
        actions: [
          {
            action: "search",
            lookCount: 3,
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
                value: "Baroque Works",
                match: "includes"
              }
            ],
            revealDestination: "hand",
            remainderPosition: "trash"
          }
        ]
      }
    ]
  },
  i18n: eb05MsMonday045I18n,
};
