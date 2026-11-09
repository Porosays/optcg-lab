import type { CharacterCard } from "@tcg/op-types";
import { op18OimoKashii062I18n } from "./op18-062-oimo-kashii.i18n.ts";

export const op18OimoKashii062: CharacterCard = {
  id: "OP18-062",
  canonicalId: "OP18-062",
  slug: "oimo-kashii/op18-062",
  name: "Oimo & Kashii",
  printings: [
    {
      id: "OP18-062",
      artId: "OP18-062",
      setCode: "OP18",
      collectorNumber: "062",
      rarity: "C",
      imageUrl: "",
    },
  ],
  cardType: "character",
  color: ["purple"],
  rarity: "C",
  setId: "OP18",
  cost: 8,
  power: 10000,
  counter: 1000,
  traits: ["Giant World Government"],
  attribute: "strike",
  i18n: op18OimoKashii062I18n,
};
