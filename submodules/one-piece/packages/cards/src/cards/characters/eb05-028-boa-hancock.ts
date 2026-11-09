import type { CharacterCard } from "@tcg/op-types";
import { eb05BoaHancock028I18n } from "./eb05-028-boa-hancock.i18n.ts";

export const eb05BoaHancock028: CharacterCard = {
  id: "EB05-028",
  canonicalId: "EB05-028",
  slug: "boa-hancock/eb05-028",
  name: "Boa Hancock",
  printings: [
    {
      id: "EB05-028",
      artId: "EB05-028",
      setCode: "EB05",
      collectorNumber: "028",
      rarity: "R",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/EB05-028_TLD6aZQ.jpg",
      label: "Boa Hancock (028)",
    },
    {
      id: "EB05-028_p1",
      artId: "EB05-028",
      setCode: "EB05",
      collectorNumber: "028",
      rarity: "R",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/EB05-028_l7boGa1.jpg",
      label: "Boa Hancock (028) (Alternate Art)",
    },
  ],
  cardType: "character",
  color: ["blue"],
  rarity: "R",
  setId: "EB05",
  cost: 4,
  power: 5000,
  counter: 1000,
  traits: ["Impel Down","The Seven Warlords of the Sea","Kuja Pirates"],
  attribute: "special",
  effect:
    "[On Play] If your opponent has 9 or more cards in their hand, they trash 4 cards from their hand.",
  effects: {
    effects: [
      {
        trigger: "onPlay",
        conditions: [{ condition: "handCount", player: "opponent", comparison: "gte", value: 9 }],
        actions: [{ action: "trashFromHand", player: "opponent", amount: 4 }],
      },
    ],
  },
  i18n: eb05BoaHancock028I18n,
};
