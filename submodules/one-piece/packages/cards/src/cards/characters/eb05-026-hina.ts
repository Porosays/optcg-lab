import type { CharacterCard } from "@tcg/op-types";
import { eb05Hina026I18n } from "./eb05-026-hina.i18n.ts";

export const eb05Hina026: CharacterCard = {
  id: "EB05-026",
  canonicalId: "EB05-026",
  slug: "hina/eb05-026",
  name: "Hina",
  printings: [
    {
      id: "EB05-026",
      artId: "EB05-026",
      setCode: "EB05",
      collectorNumber: "026",
      rarity: "C",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/EB05-026_wJMnp0V.jpg",
    },
  ],
  cardType: "character",
  color: ["blue"],
  rarity: "C",
  setId: "EB05",
  cost: 7,
  power: 8000,
  counter: 2000,
  traits: ["Navy"],
  attribute: "special",
  i18n: eb05Hina026I18n,
};
