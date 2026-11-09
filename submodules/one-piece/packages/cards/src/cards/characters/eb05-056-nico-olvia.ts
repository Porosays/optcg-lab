import type { CharacterCard } from "@tcg/op-types";
import { eb05NicoOlvia056I18n } from "./eb05-056-nico-olvia.i18n.ts";

export const eb05NicoOlvia056: CharacterCard = {
  id: "EB05-056",
  canonicalId: "EB05-056",
  slug: "nico-olvia/eb05-056",
  name: "Nico Olvia",
  printings: [
    {
      id: "EB05-056",
      artId: "EB05-056",
      setCode: "EB05",
      collectorNumber: "056",
      rarity: "C",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/EB05-056_oJjCklB.jpg",
    },
  ],
  cardType: "character",
  color: ["yellow"],
  rarity: "C",
  setId: "EB05",
  cost: 1,
  power: 0,
  counter: 2000,
  trigger: "Play this card.",
  traits: ["Ohara"],
  attribute: "wisdom",
  effect:
    "[On Play] You may trash 1 card with a Trigger from your hand: If your Leader is [Nico Robin], draw 2 cards.",
  effects: {
    effects: [
      {
        trigger: "trigger",
        actions: [
          {
            action: "playThisCard"
          }
        ]
      }
    ]
  },
  i18n: eb05NicoOlvia056I18n,
};
