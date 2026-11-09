import type { CharacterCard } from "@tcg/op-types";
import { eb05Nami055I18n } from "./eb05-055-nami.i18n.ts";

export const eb05Nami055: CharacterCard = {
  id: "EB05-055",
  canonicalId: "EB05-055",
  slug: "nami/eb05-055",
  name: "Nami",
  printings: [
    {
      id: "EB05-055",
      artId: "EB05-055",
      setCode: "EB05",
      collectorNumber: "055",
      rarity: "SR",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/EB05-055_JIc5kgj.jpg",
      label: "Nami (055)",
    },
    {
      id: "EB05-055_p1",
      artId: "EB05-055",
      setCode: "EB05",
      collectorNumber: "055",
      rarity: "SR",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/EB05-055_xKLfSx4.jpg",
      label: "Nami (055) (Kentaro Yabuki)",
    },
    {
      id: "EB05-055_p2",
      artId: "EB05-055_p1",
      setCode: "EB05",
      collectorNumber: "055",
      rarity: "SR",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/EB05-055_p1_N063a9B.jpg",
      label: "Nami (055) (Super Rare Alternate Art)",
    },
    {
      id: "EB05-055_p3",
      artId: "EB05-055_p3",
      setCode: "EB05",
      collectorNumber: "055",
      rarity: "SR",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/EB05-055_p3_r341fMd.jpg",
      label: "Nami (055) (Kentaro Yabuki) (Gold Stamped)",
    },
  ],
  cardType: "character",
  color: ["yellow"],
  rarity: "SR",
  setId: "EB05",
  cost: 5,
  power: 6000,
  trigger:
    "You may trash 1 card from your hand: If you have 2 or less Life cards, play this card.",
  traits: ["East Blue","Straw Hat Crew"],
  attribute: "wisdom",
  effect:
    "[Your Turn] [On Play] If your Leader has the \"Wisdom\" attribute, add up to 1 card from the top of your deck to the top of your Life cards.",
  effects: {
    effects: [
      {
        trigger: "trigger",
        costs: [
          {
            cost: "trashFromHand",
            amount: 1
          }
        ],
        actions: [
          {
            action: "playThisCard",
            condition: {
              condition: "lifeCount",
              player: "self",
              comparison: "lte",
              value: 2
            }
          }
        ],
        optional: true
      }
    ]
  },
  i18n: eb05Nami055I18n,
};
