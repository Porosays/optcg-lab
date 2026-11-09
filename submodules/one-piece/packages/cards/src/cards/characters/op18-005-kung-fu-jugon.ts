import type { CharacterCard } from "@tcg/op-types";
import { op18KungFuJugon005I18n } from "./op18-005-kung-fu-jugon.i18n.ts";

export const op18KungFuJugon005: CharacterCard = {
  id: "OP18-005",
  canonicalId: "OP18-005",
  slug: "kung-fu-jugon/op18-005",
  name: "Kung Fu Jugon",
  printings: [
    {
      id: "OP18-005",
      artId: "OP18-005",
      setCode: "OP18",
      collectorNumber: "005",
      rarity: "C",
      imageUrl: "",
    },
  ],
  cardType: "character",
  color: ["red"],
  rarity: "C",
  setId: "OP18",
  cost: 1,
  power: 0,
  counter: 1000,
  traits: ["Animal","Alabasta"],
  attribute: "strike",
  effect:
    "[Your Turn] This Character gains +1000 power for every [Kung Fu Jugon].",
  i18n: op18KungFuJugon005I18n,
};
