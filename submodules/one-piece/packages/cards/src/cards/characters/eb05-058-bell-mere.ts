import type { CharacterCard } from "@tcg/op-types";
import { eb05BellMere058I18n } from "./eb05-058-bell-mere.i18n.ts";

export const eb05BellMere058: CharacterCard = {
  id: "EB05-058",
  canonicalId: "EB05-058",
  slug: "bell-mere/eb05-058",
  name: "Bell-mere",
  printings: [
    {
      id: "EB05-058",
      artId: "EB05-058",
      setCode: "EB05",
      collectorNumber: "058",
      rarity: "C",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/EB05-058_kFies8p.jpg",
    },
  ],
  cardType: "character",
  color: ["yellow"],
  rarity: "C",
  setId: "EB05",
  cost: 4,
  power: 6000,
  counter: 1000,
  traits: ["East Blue","Former Navy"],
  attribute: "ranged",
  i18n: eb05BellMere058I18n,
};
