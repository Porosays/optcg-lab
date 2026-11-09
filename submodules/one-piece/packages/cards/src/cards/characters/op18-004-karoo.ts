import type { CharacterCard } from "@tcg/op-types";
import { op18Karoo004I18n } from "./op18-004-karoo.i18n.ts";

export const op18Karoo004: CharacterCard = {
  id: "OP18-004",
  canonicalId: "OP18-004",
  slug: "karoo/op18-004",
  name: "Karoo",
  printings: [
    {
      id: "OP18-004",
      artId: "OP18-004",
      setCode: "OP18",
      collectorNumber: "004",
      rarity: "R",
      imageUrl: "",
    },
  ],
  cardType: "character",
  color: ["red"],
  rarity: "R",
  setId: "OP18",
  cost: 3,
  power: 4000,
  counter: 1000,
  traits: ["Animal","Alabasta"],
  attribute: "strike",
  effect:
    "Apply each of the following effects based on this Character's power:• If it has 5000 power or more, this Character gains [Rush].• If it has 6000 power or more, this Character gains [Banish].• If it has 7000 power or more, this Character gains [Unblockable].",
  i18n: op18Karoo004I18n,
};
