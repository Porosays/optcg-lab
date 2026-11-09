import type { CharacterCard } from "@tcg/op-types";
import { eb05Nojiko057I18n } from "./eb05-057-nojiko.i18n.ts";

export const eb05Nojiko057: CharacterCard = {
  id: "EB05-057",
  canonicalId: "EB05-057",
  slug: "nojiko/eb05-057",
  name: "Nojiko",
  printings: [
    {
      id: "EB05-057",
      artId: "EB05-057",
      setCode: "EB05",
      collectorNumber: "057",
      rarity: "R",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/EB05-057_GFQwUEf.jpg",
    },
    {
      id: "EB05-057_p1",
      artId: "EB05-057",
      setCode: "EB05",
      collectorNumber: "057",
      rarity: "R",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/EB05-057_MoF5fCs.jpg",
      label: "Nojiko (Alternate Art)",
    },
  ],
  cardType: "character",
  color: ["yellow"],
  rarity: "R",
  setId: "EB05",
  cost: 2,
  power: 0,
  counter: 2000,
  trigger:
    "If your have 2 or less Life cards, play up to 1 Character card with 6000 power or less and a [Trigger] from your hand.",
  traits: ["East Blue"],
  attribute: "wisdom",
  effect:
    "[Activate: Main] [Once Per Turn] Give up to 1 rested DON!! card to 1 of your Leader or Character cards with the \"Special\" or \"Wisdom\" Attribute.",
  i18n: eb05Nojiko057I18n,
};
