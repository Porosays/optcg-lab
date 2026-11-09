import type { CharacterCard } from "@tcg/op-types";
import { op18MonkeyDLuffy036I18n } from "./op18-036-monkey-d-luffy.i18n.ts";

export const op18MonkeyDLuffy036: CharacterCard = {
  id: "OP18-036",
  canonicalId: "OP18-036",
  slug: "monkey-d-luffy/op18-036",
  name: "Monkey.D.Luffy",
  printings: [
    {
      id: "OP18-036",
      artId: "OP18-036",
      setCode: "OP18",
      collectorNumber: "036",
      rarity: "UC",
      imageUrl: "",
    },
  ],
  cardType: "character",
  color: ["green"],
  rarity: "UC",
  setId: "OP18",
  cost: 2,
  power: 0,
  counter: 2000,
  traits: ["Water Seven Straw Hat Crew"],
  attribute: "strike",
  effect:
    "[End of Your Turn] You may trash this Character: Draw 1 card and set your Leader as active.",
  effects: {
    effects: [
      {
        trigger: "endOfYourTurn",
        costs: [
          {
            cost: "trashThisCard"
          }
        ],
        actions: [
          {
            action: "draw",
            player: "self",
            amount: 1
          },
          {
            action: "setActive",
            target: {
              player: "self",
              zones: [
                "leader"
              ],
              count: {
                amount: 1
              }
            }
          }
        ],
        optional: true
      }
    ]
  },
  i18n: op18MonkeyDLuffy036I18n,
};
