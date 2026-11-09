import type { CharacterCard } from "@tcg/op-types";
import { op18Spandam105I18n } from "./op18-105-spandam.i18n.ts";

export const op18Spandam105: CharacterCard = {
  id: "OP18-105",
  canonicalId: "OP18-105",
  slug: "spandam/op18-105",
  name: "Spandam",
  printings: [
    {
      id: "OP18-105",
      artId: "OP18-105",
      setCode: "OP18",
      collectorNumber: "105",
      rarity: "R",
      imageUrl: "",
    },
  ],
  cardType: "character",
  color: ["yellow"],
  rarity: "R",
  setId: "OP18",
  cost: 1,
  power: 1000,
  counter: 2000,
  trigger:
    "If your Leader's type includes \"CP\", reveal up to 1 card with a type including \"CP\" other than [Spandam] from your hand. Activate the [Trigger] effect of the revealed card.",
  traits: ["CP9"],
  attribute: "slash",
  effect:
    "[Trigger] If your Leader's type includes \"CP\", reveal up to 1 card with a type including \"CP\" other than [Spandam] from your hand. Activate the [Trigger] effect of the revealed card.",
  i18n: op18Spandam105I18n,
};
