import type { CharacterCard } from "@tcg/op-types";
import { eb05Pasia003I18n } from "./eb05-003-pasia.i18n.ts";

export const eb05Pasia003: CharacterCard = {
  id: "EB05-003",
  canonicalId: "EB05-003",
  slug: "pasia/eb05-003",
  name: "Pasia",
  printings: [
    {
      id: "EB05-003",
      artId: "EB05-003",
      setCode: "EB05",
      collectorNumber: "003",
      rarity: "C",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/EB05-003_6D8PTZV.jpg",
    },
  ],
  cardType: "character",
  color: ["red"],
  rarity: "C",
  setId: "EB05",
  cost: 1,
  power: 3000,
  counter: 1000,
  traits: ["Sabaody Archipelago"],
  attribute: "wisdom",
  i18n: eb05Pasia003I18n,
};
