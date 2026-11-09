import type { CharacterCard } from "@tcg/op-types";
import { op18Kalifa100I18n } from "./op18-100-kalifa.i18n.ts";

export const op18Kalifa100: CharacterCard = {
  id: "OP18-100",
  canonicalId: "OP18-100",
  slug: "kalifa/op18-100",
  name: "Kalifa",
  printings: [
    {
      id: "OP18-100",
      artId: "OP18-100",
      setCode: "OP18",
      collectorNumber: "100",
      rarity: "SR",
      imageUrl: "",
    },
  ],
  cardType: "character",
  color: ["yellow"],
  rarity: "SR",
  setId: "OP18",
  cost: 6,
  power: 7000,
  counter: 1000,
  traits: ["CP9"],
  attribute: "special",
  effect:
    "[On Play] Draw 1 card, then add up to 1 card with a type including \"CP\" from your hand to the top or bottom of your Life cards face-up. [Trigger] If your Leader's type includes \"CP\", draw 1 card and rest up to 1 of your opponent's Leader or Characters.",
  effects: {
    effects: [
      {
        trigger: "onPlay",
        actions: [
          {
            action: "draw",
            player: "self",
            amount: 1
          }
        ]
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
            action: "draw",
            player: "self",
            amount: 1
          },
          {
            action: "rest",
            target: {
              player: "opponent",
              zones: [
                "leader",
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
  i18n: op18Kalifa100I18n,
};
