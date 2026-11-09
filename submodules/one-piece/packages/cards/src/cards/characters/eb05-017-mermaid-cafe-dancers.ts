import type { CharacterCard } from "@tcg/op-types";
import { eb05MermaidCafeDancers017I18n } from "./eb05-017-mermaid-cafe-dancers.i18n.ts";

export const eb05MermaidCafeDancers017: CharacterCard = {
  id: "EB05-017",
  canonicalId: "EB05-017",
  slug: "mermaid-cafe-dancers/eb05-017",
  name: "Mermaid Cafe Dancers",
  printings: [
    {
      id: "EB05-017",
      artId: "EB05-017",
      setCode: "EB05",
      collectorNumber: "017",
      rarity: "C",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/EB05-017_B60330q.jpg",
    },
  ],
  cardType: "character",
  color: ["green"],
  rarity: "C",
  setId: "EB05",
  cost: 1,
  power: 0,
  counter: 2000,
  traits: ["Merfolk","Fish-Man Island"],
  attribute: "wisdom",
  effect:
    "[On Your Opponent's Attack] You may rest 1 of your DON!! cards and trash this Character: Your {Fish-Man} or {Merfolk} type Leader gains +4000 power during this battle.",
  effects: {
    effects: [
      {
        trigger: "onOpponentAttack",
        costs: [{ cost: "restDon", amount: 1 }, { cost: "trashThisCard" }],
        conditions: [{ condition: "compound", operator: "or", conditions: [{ condition: "leaderTrait", trait: "Fish-Man", match: "exact" }, { condition: "leaderTrait", trait: "Merfolk", match: "exact" }] }],
        actions: [{ action: "modifyPower", target: { player: "self", zones: ["leader"], count: { amount: 1 } }, value: 4000, duration: "thisBattle" }],
        optional: true,
      },
    ],
  },
  i18n: eb05MermaidCafeDancers017I18n,
};
