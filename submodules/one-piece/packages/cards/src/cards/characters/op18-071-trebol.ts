import type { CharacterCard } from "@tcg/op-types";
import { op18Trebol071I18n } from "./op18-071-trebol.i18n.ts";

export const op18Trebol071: CharacterCard = {
  id: "OP18-071",
  canonicalId: "OP18-071",
  slug: "trebol/op18-071",
  name: "Trebol",
  printings: [
    {
      id: "OP18-071",
      artId: "OP18-071",
      setCode: "OP18",
      collectorNumber: "071",
      rarity: "C",
      imageUrl: "",
    },
  ],
  cardType: "character",
  color: ["purple"],
  rarity: "C",
  setId: "OP18",
  cost: 5,
  power: 6000,
  counter: 1000,
  traits: ["Donquixote Pirates"],
  attribute: "special",
  effect:
    "[Once Per Turn] If your {Donquixote Pirates} type Character would be removed from the field by your opponent's effect, you may DON!! −1 instead.[Opponent's Turn] If your Leader is {Sugar}, this Characters gains [Blocker] and +2000 power.",
  i18n: op18Trebol071I18n,
};
