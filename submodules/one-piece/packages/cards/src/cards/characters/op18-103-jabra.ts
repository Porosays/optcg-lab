import type { CharacterCard } from "@tcg/op-types";
import { op18Jabra103I18n } from "./op18-103-jabra.i18n.ts";

export const op18Jabra103: CharacterCard = {
  id: "OP18-103",
  canonicalId: "OP18-103",
  slug: "jabra/op18-103",
  name: "Jabra",
  printings: [
    {
      id: "OP18-103",
      artId: "OP18-103",
      setCode: "OP18",
      collectorNumber: "103",
      rarity: "R",
      imageUrl: "",
    },
  ],
  cardType: "character",
  color: ["yellow"],
  rarity: "R",
  setId: "OP18",
  cost: 6,
  power: 8000,
  traits: ["CP9"],
  attribute: "strike",
  effect:
    "[On K.O.] Add up to 1 card from the top of your deck to the top of your Life cards. Then, trash up to 1 card from the top of your opponent's Life cards. [Trigger] If your Leader's type includes \"CP\", draw 1 card and place up to 1 Character with a cost of 8 or less at the bottom of the owner's deck.",
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
          },
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
  i18n: op18Jabra103I18n,
};
