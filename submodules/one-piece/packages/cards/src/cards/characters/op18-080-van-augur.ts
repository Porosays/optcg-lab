import type { CharacterCard } from "@tcg/op-types";
import { op18VanAugur080I18n } from "./op18-080-van-augur.i18n.ts";

export const op18VanAugur080: CharacterCard = {
  id: "OP18-080",
  canonicalId: "OP18-080",
  slug: "van-augur/op18-080",
  name: "Van Augur",
  printings: [
    {
      id: "OP18-080",
      artId: "OP18-080",
      setCode: "OP18",
      collectorNumber: "080",
      rarity: "UC",
      imageUrl: "",
    },
  ],
  cardType: "character",
  color: ["black"],
  rarity: "UC",
  setId: "OP18",
  cost: 4,
  power: 5000,
  counter: 1000,
  traits: ["Egghead Blackbeard Pirates"],
  attribute: "ranged",
  effect:
    "[Your Turn] [Once Per Turn] When a card is trashed from your hand by your [Marshall.D.Teach] Leader's effect, if you have no other [Van Augur], draw 1 card.[On K.O.] Draw 1 Card.",
  effects: {
    effects: [
      {
        trigger: "onKo",
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
  i18n: op18VanAugur080I18n,
};
