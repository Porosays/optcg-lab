import type { LeaderCard } from "@tcg/op-types";
import { op18MonkeyDLuffy022I18n } from "./op18-022-monkey-d-luffy.i18n.ts";

export const op18MonkeyDLuffy022: LeaderCard = {
  id: "OP18-022",
  canonicalId: "OP18-022",
  slug: "monkey-d-luffy/op18-022",
  name: "Monkey.D.Luffy",
  printings: [
    {
      id: "OP18-022",
      artId: "OP18-022",
      setCode: "OP18",
      collectorNumber: "022",
      rarity: "L",
      imageUrl: "",
    },
  ],
  cardType: "leader",
  color: ["green"],
  rarity: "L",
  setId: "OP18",
  power: 5000,
  life: 5,
  traits: ["Water Seven Straw Hat Crew"],
  attribute: "strike",
  effect:
    "[DON!! x3] [When Attacking] [Once Per Turn] You may set this Leader as active. If you do, this Leader will not become active in your next Refresh Phase.",
  effects: {
    effects: [
      {
        trigger: "whenAttacking",
        conditions: [
          {
            condition: "donAttached",
            amount: 3
          }
        ],
        actions: [
          {
            action: "setActive",
            target: {
              player: "self",
              zones: [
                "leader"
              ],
              count: {
                amount: 1
              },
              self: true
            }
          }
        ],
        optional: true,
        oncePerTurn: true
      }
    ]
  },
  i18n: op18MonkeyDLuffy022I18n,
};
