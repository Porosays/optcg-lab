import type { CharacterCard } from "@tcg/op-types";
import { op18Yokozuna037I18n } from "./op18-037-yokozuna.i18n.ts";

export const op18Yokozuna037: CharacterCard = {
  id: "OP18-037",
  canonicalId: "OP18-037",
  slug: "yokozuna/op18-037",
  name: "Yokozuna",
  printings: [
    {
      id: "OP18-037",
      artId: "OP18-037",
      setCode: "OP18",
      collectorNumber: "037",
      rarity: "UC",
      imageUrl: "",
    },
  ],
  cardType: "character",
  color: ["green"],
  rarity: "UC",
  setId: "OP18",
  cost: 4,
  power: 2000,
  counter: 1000,
  traits: ["Animal","Water Seven"],
  attribute: "strike",
  effect:
    "[Blocker] (After your opponent declares an attack, you may rest this card to make it the new target of the attack.)[On K.O.] Rest up to 1 of your opponent's cards.",
  effects: {
    keywords: [
      "blocker"
    ],
    effects: [
      {
        trigger: "onKo",
        actions: [
          {
            action: "rest",
            target: {
              player: "opponent",
              zones: [
                "leader",
                "character",
                "stage",
                "costArea"
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
  i18n: op18Yokozuna037I18n,
};
