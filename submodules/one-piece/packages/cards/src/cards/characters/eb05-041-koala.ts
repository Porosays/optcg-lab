import type { CharacterCard } from "@tcg/op-types";
import { eb05Koala041I18n } from "./eb05-041-koala.i18n.ts";

export const eb05Koala041: CharacterCard = {
  id: "EB05-041",
  canonicalId: "EB05-041",
  slug: "koala/eb05-041",
  name: "Koala",
  printings: [
    {
      id: "EB05-041",
      artId: "EB05-041",
      setCode: "EB05",
      collectorNumber: "041",
      rarity: "C",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/EB05-041_rqAPddy.jpg",
    },
  ],
  cardType: "character",
  color: ["black"],
  rarity: "C",
  setId: "EB05",
  cost: 2,
  power: 4000,
  counter: 1000,
  traits: ["Dressrosa","Revolutionary Army"],
  attribute: "strike",
  i18n: eb05Koala041I18n,
};
