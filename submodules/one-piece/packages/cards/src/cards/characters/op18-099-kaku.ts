import type { CharacterCard } from "@tcg/op-types";
import { op18Kaku099I18n } from "./op18-099-kaku.i18n.ts";

export const op18Kaku099: CharacterCard = {
  id: "OP18-099",
  canonicalId: "OP18-099",
  slug: "kaku/op18-099",
  name: "Kaku",
  printings: [
    {
      id: "OP18-099",
      artId: "OP18-099",
      setCode: "OP18",
      collectorNumber: "099",
      rarity: "R",
      imageUrl: "",
    },
  ],
  cardType: "character",
  color: ["yellow"],
  rarity: "R",
  setId: "OP18",
  cost: 7,
  power: 9000,
  traits: ["CP9"],
  attribute: "slash",
  effect:
    "[On Play] Add up to 1 card with a type including \"CP\" from your hand to the top or bottom of your Life cards face-up. [Trigger] If your Leader's type includes \"CP\", draw 1 card and place up to 1 Character with a cost of 8 or less at the bottom of the owner's deck.",
  effects: {
    effects: [
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
  i18n: op18Kaku099I18n,
};
