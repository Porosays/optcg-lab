import type { LeaderCard } from "@tcg/op-types";
import { eb05NicoRobin010I18n } from "./eb05-010-nico-robin.i18n.ts";

export const eb05NicoRobin010: LeaderCard = {
  id: "EB05-010",
  canonicalId: "EB05-010",
  slug: "nico-robin/eb05-010",
  name: "Nico Robin",
  printings: [
    {
      id: "EB05-010",
      artId: "EB05-010",
      setCode: "EB05",
      collectorNumber: "010",
      rarity: "L",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/EB05-010.jpg",
      label: "Nico Robin (010)",
    },
    {
      id: "EB05-010_p1",
      artId: "EB05-010_p1",
      setCode: "EB05",
      collectorNumber: "010",
      rarity: "L",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/EB05-010_p1.jpg",
      label: "Nico Robin (010) (Heroine Leader)",
    },
    {
      id: "EB05-010_p2",
      artId: "EB05-010_p2",
      setCode: "EB05",
      collectorNumber: "010",
      rarity: "L",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/EB05-010_p2.jpg",
      label: "Nico Robin (010) (Super Leader Alternate Art)",
    },
  ],
  cardType: "leader",
  color: ["green","yellow"],
  rarity: "L",
  setId: "EB05",
  power: 5000,
  life: 4,
  traits: ["Straw Hat Crew"],
  attribute: "wisdom",
  effect:
    "[Once Per Turn] When one of your Characters with the \"Wisdom\" attribute and without [Blocker] is K.O.'d, add up to 1 card from the top of your deck to the top of your Life cards. [Activate: Main] [Once Per Turn] Set up to 1 of your Characters with the \"Wisdom\" attribute and 6000 power or less as active.",
  effects: {
    effects: [
      {
        trigger: "onKo",
        actions: [
          {
            action: "addToLife",
            target: {
              player: "self",
              zones: [
                "deck"
              ],
              count: {
                amount: 1,
                upTo: true
              }
            },
            position: "top"
          }
        ],
        oncePerTurn: true
      }
    ]
  },
  i18n: eb05NicoRobin010I18n,
};
