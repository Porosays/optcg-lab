import type { CharacterCard } from "@tcg/op-types";
import { op18MrBeansMissKatherina044I18n } from "./op18-044-mr-beans-miss-katherina.i18n.ts";

export const op18MrBeansMissKatherina044: CharacterCard = {
  id: "OP18-044",
  canonicalId: "OP18-044",
  slug: "mr-beans-miss-katherina/op18-044",
  name: "Mr.Beans & Miss.Katherina",
  printings: [
    {
      id: "OP18-044",
      artId: "OP18-044",
      setCode: "OP18",
      collectorNumber: "044",
      rarity: "C",
      imageUrl: "",
    },
  ],
  cardType: "character",
  color: ["blue"],
  rarity: "C",
  setId: "OP18",
  cost: 3,
  power: 4000,
  counter: 1000,
  traits: ["Baroque Works"],
  attribute: "wisdom",
  effect:
    "[DON!! x1] This Character gains +1000 power.[On Play] Draw 1 card and trash 1 card from your hand.",
  effects: {
    effects: [
      {
        trigger: "onPlay",
        actions: [
          {
            action: "draw",
            player: "self",
            amount: 1
          },
          {
            action: "trashFromHand",
            player: "self",
            amount: 1
          }
        ]
      }
    ],
    permanentEffects: [
      {
        conditions: [
          {
            condition: "donAttached",
            amount: 1
          }
        ],
        actions: [
          {
            action: "modifyPower",
            target: {
              player: "self",
              zones: [
                "character"
              ],
              count: {
                amount: 1
              },
              self: true
            },
            value: 1000,
            duration: "permanent"
          }
        ]
      }
    ]
  },
  i18n: op18MrBeansMissKatherina044I18n,
};
