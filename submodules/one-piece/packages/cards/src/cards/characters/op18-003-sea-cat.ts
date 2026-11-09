import type { CharacterCard } from "@tcg/op-types";
import { op18SeaCat003I18n } from "./op18-003-sea-cat.i18n.ts";

export const op18SeaCat003: CharacterCard = {
  id: "OP18-003",
  canonicalId: "OP18-003",
  slug: "sea-cat/op18-003",
  name: "Sea Cat",
  printings: [
    {
      id: "OP18-003",
      artId: "OP18-003",
      setCode: "OP18",
      collectorNumber: "003",
      rarity: "C",
      imageUrl: "",
    },
  ],
  cardType: "character",
  color: ["red"],
  rarity: "C",
  setId: "OP18",
  cost: 5,
  power: 6000,
  counter: 2000,
  traits: ["Animal","Alabasta"],
  attribute: "wisdom",
  i18n: op18SeaCat003I18n,
};
