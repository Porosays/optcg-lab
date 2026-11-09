import type { CharacterCard } from "@tcg/op-types";
import { eb05NicoRobin016I18n } from "./eb05-016-nico-robin.i18n.ts";

export const eb05NicoRobin016: CharacterCard = {
  id: "EB05-016",
  canonicalId: "EB05-016",
  slug: "nico-robin/eb05-016",
  name: "Nico Robin",
  printings: [
    {
      id: "EB05-016",
      artId: "EB05-016",
      setCode: "EB05",
      collectorNumber: "016",
      rarity: "SR",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/EB05-016_A8EFAsg.jpg",
      label: "Nico Robin (016)",
    },
    {
      id: "EB05-016_p1",
      artId: "EB05-016_p1",
      setCode: "EB05",
      collectorNumber: "016",
      rarity: "SR",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/EB05-016_p1_g4QPhOj.jpg",
      label: "Nico Robin (016) (Super Rare Alternate Art)",
    },
    {
      id: "EB05-016_p2",
      artId: "EB05-016_p2",
      setCode: "EB05",
      collectorNumber: "016",
      rarity: "SR",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/EB05-016_p2_oksEemQ.jpg",
      label: "Nico Robin (016) (SP)",
    },
  ],
  cardType: "character",
  color: ["green"],
  rarity: "SR",
  setId: "EB05",
  cost: 6,
  power: 6000,
  counter: 1000,
  trigger:
    "Rest up to 1 of your opponent's Characters with a cost of 6 or less.",
  traits: ["Straw Hat Crew"],
  attribute: "wisdom",
  effect:
    "[Your Turn] [On Play] Play up to 1 Character card with a cost of 5 or less and the \"Wisdom\" attribute from your hand.",
  effects: {
    effects: [
      {
        trigger: "onPlay",
        conditions: [
          {
            condition: "turn",
            value: "your"
          }
        ],
        actions: [
          {
            action: "play",
            source: {
              player: "self",
              zone: "hand"
            },
            count: {
              amount: 1,
              upTo: true
            }
          }
        ]
      },
      {
        trigger: "trigger",
        actions: [
          {
            action: "rest",
            target: {
              player: "opponent",
              zones: [
                "character"
              ],
              count: {
                amount: 1,
                upTo: true
              },
              filters: [
                {
                  filter: "cost",
                  comparison: "lte",
                  value: 6
                }
              ]
            }
          }
        ]
      }
    ]
  },
  i18n: eb05NicoRobin016I18n,
};
