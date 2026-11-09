import type { CharacterCard } from "@tcg/op-types";
import { op18Buggy032I18n } from "./op18-032-buggy.i18n.ts";

export const op18Buggy032: CharacterCard = {
  id: "OP18-032",
  canonicalId: "OP18-032",
  slug: "buggy/op18-032",
  name: "Buggy",
  printings: [
    {
      id: "OP18-032",
      artId: "OP18-032",
      setCode: "OP18",
      collectorNumber: "032",
      rarity: "UC",
      imageUrl: "",
    },
  ],
  cardType: "character",
  color: ["green"],
  rarity: "UC",
  setId: "OP18",
  cost: 5,
  power: 6000,
  counter: 1000,
  traits: ["East Blue Buggy Pirates"],
  attribute: "slash",
  effect:
    "[On Play]/[On K.O.] Up to 1 of your opponent's rested Characters with 8000 power or less will not become active in your opponent's next Refresh Phase.",
  effects: {
    effects: [
      {
        trigger: "onPlay",
        actions: [
          {
            action: "freeze",
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
                  filter: "state",
                  value: "rested"
                }
              ]
            }
          }
        ]
      },
      {
        trigger: "onKo",
        actions: [
          {
            action: "freeze",
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
                  filter: "state",
                  value: "rested"
                }
              ]
            }
          }
        ]
      }
    ]
  },
  i18n: op18Buggy032I18n,
};
