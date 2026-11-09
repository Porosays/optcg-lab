import type { CharacterCard } from "@tcg/op-types";
import { op18Eyelashes015I18n } from "./op18-015-eyelashes.i18n.ts";

export const op18Eyelashes015: CharacterCard = {
  id: "OP18-015",
  canonicalId: "OP18-015",
  slug: "eyelashes/op18-015",
  name: "Eyelashes",
  printings: [
    {
      id: "OP18-015",
      artId: "OP18-015",
      setCode: "OP18",
      collectorNumber: "015",
      rarity: "UC",
      imageUrl: "",
    },
  ],
  cardType: "character",
  color: ["red"],
  rarity: "UC",
  setId: "OP18",
  cost: 1,
  power: 0,
  counter: 2000,
  traits: ["Animal","Alabasta"],
  attribute: "strike",
  effect:
    "[On Your Opponent's Attack] You may trash this Character: If your Leader has the {Alabasta} type, give up to 1 of your opponent's Leader or Characters −3000 power during this turn.",
  effects: {
    effects: [
      {
        trigger: "onOpponentAttack",
        costs: [
          {
            cost: "trashThisCard"
          }
        ],
        actions: [
          {
            action: "modifyPower",
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
            },
            value: -3000,
            duration: "thisTurn",
            condition: {
              condition: "leaderTrait",
              trait: "Alabasta",
              match: "exact"
            }
          }
        ],
        optional: true
      }
    ]
  },
  i18n: op18Eyelashes015I18n,
};
