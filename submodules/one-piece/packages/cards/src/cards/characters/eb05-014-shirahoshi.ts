import type { CharacterCard } from "@tcg/op-types";
import { eb05Shirahoshi014I18n } from "./eb05-014-shirahoshi.i18n.ts";

export const eb05Shirahoshi014: CharacterCard = {
  id: "EB05-014",
  canonicalId: "EB05-014",
  slug: "shirahoshi/eb05-014",
  name: "Shirahoshi",
  printings: [
    {
      id: "EB05-014",
      artId: "EB05-014",
      setCode: "EB05",
      collectorNumber: "014",
      rarity: "SR",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/EB05-014_ototXdA.jpg",
    },
    {
      id: "EB05-014_p1",
      artId: "EB05-014",
      setCode: "EB05",
      collectorNumber: "014",
      rarity: "SR",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/EB05-014_4pIX3VX.jpg",
      label: "Shirahoshi (Super Rare Alternate Art)",
    },
    {
      id: "EB05-014_p2",
      artId: "EB05-014_p2",
      setCode: "EB05",
      collectorNumber: "014",
      rarity: "SR",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/EB05-014_p2.jpg",
      label: "Shirahoshi (Manga)",
    },
  ],
  cardType: "character",
  color: ["green"],
  rarity: "SR",
  setId: "EB05",
  cost: 1,
  power: 0,
  traits: ["Merfolk","Fish-Man Island"],
  attribute: "wisdom",
  effect:
    "[On Play] Look at 5 cards from the top of your deck; reveal up to a total of 2 [Megalo] or {Neptunian} type cards and add them to your hand. Then, trash the rest.\n[Activate: Main] You may rest this Character: Up to 1 of your {Neptunian} type Characters with 6000 power or less gains [Rush] during this turn.",
  effects: {
    effects: [
      {
        trigger: "activateMain",
        costs: [
          {
            cost: "restThisCard"
          }
        ],
        actions: [
          {
            action: "grantKeyword",
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
                  value: "Neptunian",
                  match: "exact"
                },
                {
                  filter: "power",
                  comparison: "lte",
                  value: 6000
                }
              ]
            },
            keyword: "rush",
            duration: "thisTurn"
          }
        ],
        optional: true
      }
    ]
  },
  i18n: eb05Shirahoshi014I18n,
};
