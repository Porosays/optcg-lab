import type { CharacterCard } from "@tcg/op-types";
import { op18Mr1DazBonez047I18n } from "./op18-047-mr-1-daz-bonez.i18n.ts";

export const op18Mr1DazBonez047: CharacterCard = {
  id: "OP18-047",
  canonicalId: "OP18-047",
  slug: "mr-1-daz-bonez/op18-047",
  name: "Mr.1(Daz.Bonez)",
  printings: [
    {
      id: "OP18-047",
      artId: "OP18-047",
      setCode: "OP18",
      collectorNumber: "047",
      rarity: "UC",
      imageUrl: "",
    },
  ],
  cardType: "character",
  color: ["blue"],
  rarity: "UC",
  setId: "OP18",
  cost: 2,
  power: 3000,
  counter: 2000,
  traits: ["Cross Guild Former Baroque Works"],
  attribute: "slash",
  effect:
    "[On Play] Your Leader with the {Cross Guild} type or a type including \"Baroque Works\" gains [Unblockable] during this turn.(This card cannot be blocked.)",
  effects: {
    effects: [
      {
        trigger: "onPlay",
        conditions: [{ condition: "compound", operator: "or", conditions: [{ condition: "leaderTrait", trait: "Cross Guild", match: "exact" }, { condition: "leaderTrait", trait: "Baroque Works", match: "includes" }] }],
        actions: [{ action: "grantKeyword", target: { player: "self", zones: ["leader"], count: { amount: 1 } }, keyword: "unblockable", duration: "thisTurn" }],
      },
    ],
  },
  i18n: op18Mr1DazBonez047I18n,
};
