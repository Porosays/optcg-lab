import type { CharacterCard } from "@tcg/op-types";
import { eb05Shinobu042I18n } from "./eb05-042-shinobu.i18n.ts";

export const eb05Shinobu042: CharacterCard = {
  id: "EB05-042",
  canonicalId: "EB05-042",
  slug: "shinobu/eb05-042",
  name: "Shinobu",
  printings: [
    {
      id: "EB05-042",
      artId: "EB05-042",
      setCode: "EB05",
      collectorNumber: "042",
      rarity: "C",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/EB05-042_qSRCJXE.jpg",
    },
  ],
  cardType: "character",
  color: ["black"],
  rarity: "C",
  setId: "EB05",
  cost: 4,
  power: 5000,
  counter: 2000,
  traits: ["Land of Wano"],
  attribute: "special",
  effect: "[On Play] Draw 2 cards and trash 2 cards from your hand.",
  effects: {
    effects: [
      {
        trigger: "onPlay",
        actions: [
          {
            action: "draw",
            player: "self",
            amount: 2
          },
          {
            action: "trashFromHand",
            player: "self",
            amount: 2
          }
        ]
      }
    ]
  },
  i18n: eb05Shinobu042I18n,
};
