import type { CharacterCard } from "@tcg/op-types";
import { op18CharlotteSmoothie067I18n } from "./op18-067-charlotte-smoothie.i18n.ts";

export const op18CharlotteSmoothie067: CharacterCard = {
  id: "OP18-067",
  canonicalId: "OP18-067",
  slug: "charlotte-smoothie/op18-067",
  name: "Charlotte Smoothie",
  printings: [
    {
      id: "OP18-067",
      artId: "OP18-067",
      setCode: "OP18",
      collectorNumber: "067",
      rarity: "C",
      imageUrl: "",
    },
  ],
  cardType: "character",
  color: ["purple"],
  rarity: "C",
  setId: "OP18",
  cost: 1,
  power: 2000,
  counter: 1000,
  traits: ["Big Mom Pirates"],
  attribute: "slash",
  effect:
    "[On Play] You may trash 1 {Big Mom Pirates} type card from your hand: Draw 2 cards.",
  effects: {
    effects: [
      {
        trigger: "onPlay",
        costs: [
          {
            cost: "trashFromHand",
            amount: 1,
            filters: [
              {
                filter: "trait",
                value: "Big Mom Pirates",
                match: "exact"
              }
            ]
          }
        ],
        actions: [
          {
            action: "draw",
            player: "self",
            amount: 2
          }
        ],
        optional: true
      }
    ]
  },
  i18n: op18CharlotteSmoothie067I18n,
};
