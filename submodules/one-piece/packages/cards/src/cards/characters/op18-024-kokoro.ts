import type { CharacterCard } from "@tcg/op-types";
import { op18Kokoro024I18n } from "./op18-024-kokoro.i18n.ts";

export const op18Kokoro024: CharacterCard = {
  id: "OP18-024",
  canonicalId: "OP18-024",
  slug: "kokoro/op18-024",
  name: "Kokoro",
  printings: [
    {
      id: "OP18-024",
      artId: "OP18-024",
      setCode: "OP18",
      collectorNumber: "024",
      rarity: "C",
      imageUrl: "",
    },
  ],
  cardType: "character",
  color: ["green"],
  rarity: "C",
  setId: "OP18",
  cost: 2,
  power: 0,
  counter: 1000,
  traits: ["Merfolk Water Seven"],
  attribute: "wisdom",
  effect:
    "[Blocker] (After your opponent declares an attack, you may rest this card to make it the new target of the attack.)[End of Your Turn] You may trash this Character: Set your Leader as active.",
  effects: {
    keywords: [
      "blocker"
    ],
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
  i18n: op18Kokoro024I18n,
};
