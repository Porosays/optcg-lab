import type { EventCard } from "@tcg/op-types";
import { op18IronBodyEmptyTree116I18n } from "./op18-116-iron-body-empty-tree.i18n.ts";

export const op18IronBodyEmptyTree116: EventCard = {
  id: "OP18-116",
  canonicalId: "OP18-116",
  slug: "iron-body-empty-tree/op18-116",
  name: "Iron Body Empty Tree",
  printings: [
    {
      id: "OP18-116",
      artId: "OP18-116",
      setCode: "OP18",
      collectorNumber: "116",
      rarity: "C",
      imageUrl: "",
    },
  ],
  cardType: "event",
  color: ["yellow"],
  rarity: "C",
  setId: "OP18",
  cost: 0,
  traits: ["CP9"],
  effect:
    "[Counter] You may trash 1 card from your hand: Up to 1 of your Leader or Characters gains +3000 power during this battle. [Trigger] If your Leader's type includes \"CP\", rest up to 1 of your opponent's Characters.",
  effects: {
    effects: [
      {
        trigger: "counter",
        costs: [
          {
            cost: "trashFromHand",
            amount: 1
          }
        ],
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
              }
            },
            value: 3000,
            duration: "thisBattle"
          }
        ],
        optional: true
      },
      {
        trigger: "trigger",
        conditions: [
          {
            condition: "leaderTrait",
            trait: "CP",
            match: "includes"
          }
        ],
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
              }
            }
          }
        ]
      }
    ]
  },
  i18n: op18IronBodyEmptyTree116I18n,
};
