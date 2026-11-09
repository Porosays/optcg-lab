import type { CharacterCard } from "@tcg/op-types";
import { eb05Russian038I18n } from "./eb05-038-russian.i18n.ts";

export const eb05Russian038: CharacterCard = {
  id: "EB05-038",
  canonicalId: "EB05-038",
  slug: "russian/eb05-038",
  name: "Russian",
  printings: [
    {
      id: "EB05-038",
      artId: "EB05-038",
      setCode: "EB05",
      collectorNumber: "038",
      rarity: "C",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/EB05-038_0AMqLC9.jpg",
    },
  ],
  cardType: "character",
  color: ["purple"],
  rarity: "C",
  setId: "EB05",
  cost: 1,
  power: 0,
  counter: 2000,
  traits: ["Senor Pink's Wife"],
  attribute: "wisdom",
  effect:
    "[On Play] Up to 1 of your [Senor Pink] cards gains +3000 power during this turn.",
  effects: {
    effects: [
      {
        trigger: "onPlay",
        actions: [
          {
            action: "modifyPower",
            target: {
              player: "self",
              zones: [
                "leader",
                "character"
              ],
              count: {
                amount: 1,
                upTo: true
              },
              filters: [
                {
                  filter: "name",
                  value: "Senor Pink"
                }
              ]
            },
            value: 3000,
            duration: "thisTurn"
          }
        ]
      }
    ]
  },
  i18n: eb05Russian038I18n,
};
