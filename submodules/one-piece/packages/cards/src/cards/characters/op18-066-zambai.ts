import type { CharacterCard } from "@tcg/op-types";
import { op18Zambai066I18n } from "./op18-066-zambai.i18n.ts";

export const op18Zambai066: CharacterCard = {
  id: "OP18-066",
  canonicalId: "OP18-066",
  slug: "zambai/op18-066",
  name: "Zambai",
  printings: [
    {
      id: "OP18-066",
      artId: "OP18-066",
      setCode: "OP18",
      collectorNumber: "066",
      rarity: "C",
      imageUrl: "",
    },
  ],
  cardType: "character",
  color: ["purple"],
  rarity: "C",
  setId: "OP18",
  cost: 5,
  power: 6000,
  counter: 1000,
  traits: ["Water Seven","The Franky Family"],
  attribute: "slash",
  effect:
    "[Activate: Main] You may K.O. 1 of your Stages with a cost of 5 or less: This Character gains [Rush] during this turn.(This card can attack on the turn in which it is played.)",
  i18n: op18Zambai066I18n,
};
