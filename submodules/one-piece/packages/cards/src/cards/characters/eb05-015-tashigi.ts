import type { CharacterCard } from "@tcg/op-types";
import { eb05Tashigi015I18n } from "./eb05-015-tashigi.i18n.ts";

export const eb05Tashigi015: CharacterCard = {
  id: "EB05-015",
  canonicalId: "EB05-015",
  slug: "tashigi/eb05-015",
  name: "Tashigi",
  printings: [
    {
      id: "EB05-015",
      artId: "EB05-015",
      setCode: "EB05",
      collectorNumber: "015",
      rarity: "C",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/EB05-015_X6jtRp5.jpg",
    },
  ],
  cardType: "character",
  color: ["green"],
  rarity: "C",
  setId: "EB05",
  cost: 5,
  power: 7000,
  counter: 1000,
  traits: ["East Blue","Navy"],
  attribute: "slash",
  i18n: eb05Tashigi015I18n,
};
