import type { CharacterCard } from "@tcg/op-types";
import { op18Sleeptids093I18n } from "./op18-093-sleeptids.i18n.ts";

export const op18Sleeptids093: CharacterCard = {
  id: "OP18-093",
  canonicalId: "OP18-093",
  slug: "sleeptids/op18-093",
  name: "Sleeptids",
  printings: [
    {
      id: "OP18-093",
      artId: "OP18-093",
      setCode: "OP18",
      collectorNumber: "093",
      rarity: "R",
      imageUrl: "",
    },
  ],
  cardType: "character",
  color: ["black"],
  rarity: "R",
  setId: "OP18",
  cost: 9,
  power: 3000,
  counter: 2000,
  traits: ["Elbaph"],
  attribute: "special",
  effect:
    "Under the rules of this game, you may have any number of this card in your deck. [Blocker] (After your opponent declares an attack, you may rest this card to make it the new target of the attack.)",
  effects: {
    deckBuildingRules: [
      {
        rule: "unlimitedCopies"
      }
    ],
    keywords: [
      "blocker"
    ]
  },
  i18n: op18Sleeptids093I18n,
};
