import type { EventCard } from "@tcg/op-types";
import { eb05PinkHornet039I18n } from "./eb05-039-pink-hornet.i18n.ts";

export const eb05PinkHornet039: EventCard = {
  id: "EB05-039",
  canonicalId: "EB05-039",
  slug: "pink-hornet/eb05-039",
  name: "Pink Hornet",
  printings: [
    {
      id: "EB05-039",
      artId: "EB05-039",
      setCode: "EB05",
      collectorNumber: "039",
      rarity: "C",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/EB05-039_03FihP5.jpg",
    },
  ],
  cardType: "event",
  color: ["purple"],
  rarity: "C",
  setId: "EB05",
  cost: 1,
  traits: ["The Vinsmoke Family","GERMA 66"],
  effect:
    "[Main] DON!! 1: If your Leader has the {The Vinsmoke Family} type, give up to 1 of your opponent's Characters 4000 power during this turn.\n[Counter] DON!! 1: Your Leader gains +4000 power during this battle.",
  effects: {
    effects: [
      {
        trigger: "main",
        costs: [
          {
            cost: "returnDon",
            amount: 1
          }
        ],
        actions: [
          {
            action: "modifyPower",
            target: {
              player: "opponent",
              zones: [
                "character"
              ],
              count: {
                amount: 1,
                upTo: true
              }
            },
            value: 4000,
            duration: "thisTurn",
            condition: {
              condition: "leaderTrait",
              trait: "The Vinsmoke Family",
              match: "exact"
            }
          }
        ],
        optional: true
      },
      {
        trigger: "counter",
        costs: [
          {
            cost: "returnDon",
            amount: 1
          }
        ],
        actions: [
          {
            action: "modifyPower",
            target: {
              player: "self",
              zones: [
                "leader"
              ],
              count: {
                amount: 1
              }
            },
            value: 4000,
            duration: "thisBattle"
          }
        ],
        optional: true
      }
    ]
  },
  i18n: eb05PinkHornet039I18n,
};
