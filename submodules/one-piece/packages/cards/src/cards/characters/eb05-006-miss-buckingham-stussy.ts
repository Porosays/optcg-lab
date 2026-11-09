import type { CharacterCard } from "@tcg/op-types";
import { eb05MissBuckinghamStussy006I18n } from "./eb05-006-miss-buckingham-stussy.i18n.ts";

export const eb05MissBuckinghamStussy006: CharacterCard = {
  id: "EB05-006",
  canonicalId: "EB05-006",
  slug: "miss-buckingham-stussy/eb05-006",
  name: "Miss Buckingham Stussy",
  printings: [
    {
      id: "EB05-006",
      artId: "EB05-006",
      setCode: "EB05",
      collectorNumber: "006",
      rarity: "SR",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/EB05-006_IvVYeAB.jpg",
    },
    {
      id: "EB05-006_p1",
      artId: "EB05-006_p1",
      setCode: "EB05",
      collectorNumber: "006",
      rarity: "SR",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/EB05-006_p1_I5MKjQa.jpg",
      label: "Miss Buckingham Stussy (Super Rare Alternate Art)",
    },
    {
      id: "EB05-006_p2",
      artId: "EB05-006_p2",
      setCode: "EB05",
      collectorNumber: "006",
      rarity: "SR",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/EB05-006_p2_aHoWscK.jpg",
      label: "Miss Buckingham Stussy (SP)",
    },
  ],
  cardType: "character",
  color: ["red"],
  rarity: "SR",
  setId: "EB05",
  cost: 2,
  power: 2000,
  counter: 2000,
  traits: ["Rocks Pirates"],
  attribute: "wisdom",
  effect:
    "[Activate: Main] [Once Per Turn] You may add 1 card from the top of your Life cards to your hand: Choose one:\n• Give up to 1 Character +3000 power during this turn.\n• Give up to 1 Character -4000 power during this turn.",
  i18n: eb05MissBuckinghamStussy006I18n,
};
