import type { CharacterCard } from "@tcg/op-types";
import { eb05Shirley013I18n } from "./eb05-013-shirley.i18n.ts";

export const eb05Shirley013: CharacterCard = {
  id: "EB05-013",
  canonicalId: "EB05-013",
  slug: "shirley/eb05-013",
  name: "Shirley",
  printings: [
    {
      id: "EB05-013",
      artId: "EB05-013",
      setCode: "EB05",
      collectorNumber: "013",
      rarity: "C",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/EB05-013_ZkCRpTc.jpg",
    },
  ],
  cardType: "character",
  color: ["green"],
  rarity: "C",
  setId: "EB05",
  cost: 3,
  power: 4000,
  counter: 1000,
  traits: ["Merfolk","Fish-Man Island"],
  attribute: "wisdom",
  effect:
    "[On Your Opponent's Attack] [Once Per Turn] You may rest 1 of your DON!! cards: Your {Fish-Man} or {Merfolk} type Leader gains +2000 power during this battle.",
  effects: {
    effects: [
      {
        trigger: "onOpponentAttack",
        costs: [{ cost: "restDon", amount: 1 }],
        conditions: [{ condition: "compound", operator: "or", conditions: [{ condition: "leaderTrait", trait: "Fish-Man", match: "exact" }, { condition: "leaderTrait", trait: "Merfolk", match: "exact" }] }],
        actions: [{ action: "modifyPower", target: { player: "self", zones: ["leader"], count: { amount: 1 } }, value: 2000, duration: "thisBattle" }],
        optional: true,
        oncePerTurn: true,
      },
    ],
  },
  i18n: eb05Shirley013I18n,
};
