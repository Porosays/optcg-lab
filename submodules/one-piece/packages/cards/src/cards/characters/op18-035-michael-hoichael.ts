import type { CharacterCard } from "@tcg/op-types";
import { op18MichaelHoichael035I18n } from "./op18-035-michael-hoichael.i18n.ts";

export const op18MichaelHoichael035: CharacterCard = {
  id: "OP18-035",
  canonicalId: "OP18-035",
  slug: "michael-hoichael/op18-035",
  name: "Michael & Hoichael",
  printings: [
    {
      id: "OP18-035",
      artId: "OP18-035",
      setCode: "OP18",
      collectorNumber: "035",
      rarity: "C",
      imageUrl: "",
    },
  ],
  cardType: "character",
  color: ["green"],
  rarity: "C",
  setId: "OP18",
  cost: 3,
  power: 5000,
  counter: 1000,
  traits: ["Water Seven"],
  attribute: "wisdom",
  i18n: op18MichaelHoichael035I18n,
};
