import type { EventCard } from "@tcg/op-types";
import { eb05KimonoSleeveCage029I18n } from "./eb05-029-kimono-sleeve-cage.i18n.ts";

export const eb05KimonoSleeveCage029: EventCard = {
  id: "EB05-029",
  canonicalId: "EB05-029",
  slug: "kimono-sleeve-cage/eb05-029",
  name: "Kimono Sleeve Cage",
  printings: [
    {
      id: "EB05-029",
      artId: "EB05-029",
      setCode: "EB05",
      collectorNumber: "029",
      rarity: "C",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/EB05-029_Yv6QQzx.jpg",
    },
  ],
  cardType: "event",
  color: ["blue"],
  rarity: "C",
  setId: "EB05",
  cost: 5,
  traits: ["Navy"],
  effect:
    "[Main] You may trash 1 card from your hand: Negate the effect of up to 1 of your opponent's Characters with a cost of 6 or less during this turn, and return it to the owner's hand.",
  effects: {
    effects: [
      {
        trigger: "main",
        costs: [
          {
            cost: "trashFromHand",
            amount: 1
          }
        ],
        actions: [
          {
            action: "negateEffects",
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
            },
            duration: "thisTurn"
          }
        ],
        optional: true
      }
    ]
  },
  i18n: eb05KimonoSleeveCage029I18n,
};
