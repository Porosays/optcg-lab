import type { CharacterCard } from "@tcg/op-types";
import { op18TheFrankyFamily072I18n } from "./op18-072-the-franky-family.i18n.ts";

export const op18TheFrankyFamily072: CharacterCard = {
  id: "OP18-072",
  canonicalId: "OP18-072",
  slug: "the-franky-family/op18-072",
  name: "The Franky Family",
  printings: [
    {
      id: "OP18-072",
      artId: "OP18-072",
      setCode: "OP18",
      collectorNumber: "072",
      rarity: "R",
      imageUrl: "",
    },
  ],
  cardType: "character",
  color: ["purple"],
  rarity: "R",
  setId: "OP18",
  cost: 5,
  power: 6000,
  counter: 1000,
  traits: ["Water Seven","The Franky Family"],
  attribute: "slash",
  effect:
    "[Blocker][Activate: Main] [Once Per Turn] You may K.O. 1 of your Stages with a cost of 5 or less: If this Character was played on this turn, give up to 1 of your opponent's Characters −3000 power during this turn.",
  effects: {
    keywords: [
      "blocker"
    ]
  },
  i18n: op18TheFrankyFamily072I18n,
};
