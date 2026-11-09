import type { CharacterCard } from "@tcg/op-types";
import { op18TonyTonyChopper029I18n } from "./op18-029-tony-tony-chopper.i18n.ts";

export const op18TonyTonyChopper029: CharacterCard = {
  id: "OP18-029",
  canonicalId: "OP18-029",
  slug: "tony-tony-chopper/op18-029",
  name: "Tony Tony.Chopper",
  printings: [
    {
      id: "OP18-029",
      artId: "OP18-029",
      setCode: "OP18",
      collectorNumber: "029",
      rarity: "R",
      imageUrl: "",
    },
  ],
  cardType: "character",
  color: ["green"],
  rarity: "R",
  setId: "OP18",
  cost: 9,
  power: 6000,
  counter: 1000,
  traits: ["Animal Water Seven Straw Hat Crew"],
  attribute: "strike",
  effect:
    "[Rush][When Attacking] [Once Per Turn] Give up to 3 rested DON!! cards to your Leader and set this Character as active. Then, this Character will not become active in your next Refresh Phase.",
  effects: {
    keywords: [
      "rush"
    ],
    effects: [
      {
        trigger: "whenAttacking",
        actions: [
          {
            action: "giveDon",
            target: {
              player: "self",
              zones: [
                "leader"
              ],
              count: {
                amount: 1
              }
            },
            count: {
              amount: 3,
              upTo: true
            },
            donState: "rested"
          },
          {
            action: "setActive",
            target: {
              player: "self",
              zones: [
                "character"
              ],
              count: {
                amount: 1
              },
              self: true
            }
          },
          {
            action: "freeze",
            target: {
              player: "self",
              zones: [
                "character"
              ],
              count: {
                amount: 1
              },
              self: true
            }
          }
        ],
        oncePerTurn: true
      }
    ]
  },
  i18n: op18TonyTonyChopper029I18n,
};
