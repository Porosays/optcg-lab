import type { CharacterCard } from "@tcg/op-types";
import { eb05BlackMaria037I18n } from "./eb05-037-black-maria.i18n.ts";

export const eb05BlackMaria037: CharacterCard = {
  id: "EB05-037",
  canonicalId: "EB05-037",
  slug: "black-maria/eb05-037",
  name: "Black Maria",
  printings: [
    {
      id: "EB05-037",
      artId: "EB05-037",
      setCode: "EB05",
      collectorNumber: "037",
      rarity: "R",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/EB05-037_VbMSZno.jpg",
    },
    {
      id: "EB05-037_p1",
      artId: "EB05-037",
      setCode: "EB05",
      collectorNumber: "037",
      rarity: "R",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/EB05-037_2IpwgqG.jpg",
      label: "Black Maria (Alternate Art)",
    },
  ],
  cardType: "character",
  color: ["purple"],
  rarity: "R",
  setId: "EB05",
  cost: 1,
  power: 2000,
  counter: 2000,
  traits: ["Animal Kingdom Pirates"],
  attribute: "special",
  effect:
    "[On Play] Look at 3 cards from the top of your deck; reveal up to 1 {Animal Kingdom Pirates} type card and add it to your hand. Then, place the rest at the bottom of your deck in any order.",
  effects: {
    effects: [
      {
        trigger: "onPlay",
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
                value: "Animal Kingdom Pirates",
                match: "exact"
              }
            ],
            revealDestination: "hand",
            remainderPosition: "bottom"
          }
        ]
      }
    ]
  },
  i18n: eb05BlackMaria037I18n,
};
