import type { CharacterCard } from "@tcg/op-types";
import { eb05MsFatherSDay044I18n } from "./eb05-044-ms-father-s-day.i18n.ts";

export const eb05MsFatherSDay044: CharacterCard = {
  id: "EB05-044",
  canonicalId: "EB05-044",
  slug: "ms-father-s-day/eb05-044",
  name: "Ms. Father's Day",
  printings: [
    {
      id: "EB05-044",
      artId: "EB05-044",
      setCode: "EB05",
      collectorNumber: "044",
      rarity: "R",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/EB05-044_Ri8eal7.jpg",
    },
  ],
  cardType: "character",
  color: ["black"],
  rarity: "R",
  setId: "EB05",
  cost: 2,
  power: 2000,
  counter: 2000,
  traits: ["Baroque Works"],
  attribute: "ranged",
  effect:
    "[On Play] If your Leader's type includes \"Baroque Works\" and your opponent has a Character with a cost of 0, give your opponent's Leader -1000 power during this turn.",
  i18n: eb05MsFatherSDay044I18n,
};
