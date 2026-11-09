import type { CharacterCard } from "@tcg/op-types";
import { op18MrPrince045I18n } from "./op18-045-mr-prince.i18n.ts";

export const op18MrPrince045: CharacterCard = {
  id: "OP18-045",
  canonicalId: "OP18-045",
  slug: "mr-prince/op18-045",
  name: "Mr.Prince",
  printings: [
    {
      id: "OP18-045",
      artId: "OP18-045",
      setCode: "OP18",
      collectorNumber: "045",
      rarity: "C",
      imageUrl: "",
    },
  ],
  cardType: "character",
  color: ["blue"],
  rarity: "C",
  setId: "OP18",
  cost: 3,
  power: 4000,
  counter: 2000,
  alternateNames: ["Sanji"],
  traits: ["Alabasta","Straw Hat Crew"],
  attribute: "strike",
  effect:
    "Also treat this card's name as [Sanji] according to the rules.This Character gains +1000 power for every 5 Events in your trash.",
  i18n: op18MrPrince045I18n,
};
