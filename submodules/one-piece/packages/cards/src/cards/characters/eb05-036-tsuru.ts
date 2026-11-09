import type { CharacterCard } from "@tcg/op-types";
import { eb05Tsuru036I18n } from "./eb05-036-tsuru.i18n.ts";

export const eb05Tsuru036: CharacterCard = {
  id: "EB05-036",
  canonicalId: "EB05-036",
  slug: "tsuru/eb05-036",
  name: "Tsuru",
  printings: [
    {
      id: "EB05-036",
      artId: "EB05-036",
      setCode: "EB05",
      collectorNumber: "036",
      rarity: "C",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/EB05-036_JKeQAkg.jpg",
    },
  ],
  cardType: "character",
  color: ["purple"],
  rarity: "C",
  setId: "EB05",
  cost: 4,
  power: 0,
  counter: 1000,
  traits: ["Navy"],
  attribute: "special",
  effect:
    "[On Play] If your Leader has the {Navy} type, draw 1 card, and add up to 1 DON!! card as rested from your DON!! deck.",
  effects: {
    effects: [
      {
        trigger: "onPlay",
        conditions: [
          {
            condition: "leaderTrait",
            trait: "Navy",
            match: "exact"
          }
        ],
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
  i18n: eb05Tsuru036I18n,
};
