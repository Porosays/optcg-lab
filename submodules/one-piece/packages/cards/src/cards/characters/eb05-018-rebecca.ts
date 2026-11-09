import type { CharacterCard } from "@tcg/op-types";
import { eb05Rebecca018I18n } from "./eb05-018-rebecca.i18n.ts";

export const eb05Rebecca018: CharacterCard = {
  id: "EB05-018",
  canonicalId: "EB05-018",
  slug: "rebecca/eb05-018",
  name: "Rebecca",
  printings: [
    {
      id: "EB05-018",
      artId: "EB05-018",
      setCode: "EB05",
      collectorNumber: "018",
      rarity: "R",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/EB05-018_TdPAt3U.jpg",
    },
    {
      id: "EB05-018_p1",
      artId: "EB05-018",
      setCode: "EB05",
      collectorNumber: "018",
      rarity: "R",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/EB05-018_KeVWmeC.jpg",
      label: "Rebecca (Alternate Art)",
    },
  ],
  cardType: "character",
  color: ["green"],
  rarity: "R",
  setId: "EB05",
  cost: 1,
  power: 1000,
  counter: 2000,
  traits: ["Dressrosa"],
  attribute: "slash",
  effect:
    "[On Play] Up to 1 of your opponent's rested Characters with a cost of 6 or less will not become active in your opponent's next Refresh Phase.",
  effects: {
    effects: [
      {
        trigger: "onPlay",
        actions: [
          {
            action: "freeze",
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
                  filter: "state",
                  value: "rested"
                },
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
  i18n: eb05Rebecca018I18n,
};
