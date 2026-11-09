import type { CharacterCard } from "@tcg/op-types";
import { op18Stansen087I18n } from "./op18-087-stansen.i18n.ts";

export const op18Stansen087: CharacterCard = {
  id: "OP18-087",
  canonicalId: "OP18-087",
  slug: "stansen/op18-087",
  name: "Stansen",
  printings: [
    {
      id: "OP18-087",
      artId: "OP18-087",
      setCode: "OP18",
      collectorNumber: "087",
      rarity: "C",
      imageUrl: "",
    },
  ],
  cardType: "character",
  color: ["black"],
  rarity: "C",
  setId: "OP18",
  cost: 3,
  power: 4000,
  counter: 1000,
  traits: ["Giant","Elbaph","New Giant Pirates"],
  attribute: "strike",
  effect:
    "This Character gains +12 cost.If you only have Characters with a cost of 12 or more, this Character gains +2000 power.",
  i18n: op18Stansen087I18n,
};
