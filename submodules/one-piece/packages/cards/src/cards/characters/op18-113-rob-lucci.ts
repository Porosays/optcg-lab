import type { CharacterCard } from "@tcg/op-types";
import { op18RobLucci113I18n } from "./op18-113-rob-lucci.i18n.ts";

export const op18RobLucci113: CharacterCard = {
  id: "OP18-113",
  canonicalId: "OP18-113",
  slug: "rob-lucci/op18-113",
  name: "Rob Lucci",
  printings: [
    {
      id: "OP18-113",
      artId: "OP18-113",
      setCode: "OP18",
      collectorNumber: "113",
      rarity: "SR",
      imageUrl: "",
    },
  ],
  cardType: "character",
  color: ["yellow"],
  rarity: "SR",
  setId: "OP18",
  cost: 8,
  power: 10000,
  traits: ["CP9"],
  attribute: "strike",
  effect:
    "[On Play]/[On K.O.] Trash up to 1 card from the top of your opponent's Life cards. [Trigger] If your Leader's type includes \"CP\", draw 1 card and place up to 1 Character with a cost of 8 or less at the bottom of the owner's deck.",
  effects: {
    effects: [
      {
        trigger: "onPlay",
        actions: [
          {
            action: "removeFromLife",
            player: "opponent",
            count: {
              amount: 1,
              upTo: true
            },
            destination: "trash"
          }
        ]
      },
      {
        trigger: "onKo",
        actions: [
          {
            action: "removeFromLife",
            player: "opponent",
            count: {
              amount: 1,
              upTo: true
            },
            destination: "trash"
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
            action: "returnToDeck",
            target: {
              player: "any",
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
                  value: 8
                }
              ]
            },
            position: "bottom"
          }
        ]
      }
    ]
  },
  i18n: op18RobLucci113I18n,
};
