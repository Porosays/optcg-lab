import type { EventCard } from "@tcg/op-types";
import { eb05SpecialHollow049I18n } from "./eb05-049-special-hollow.i18n.ts";

export const eb05SpecialHollow049: EventCard = {
  id: "EB05-049",
  canonicalId: "EB05-049",
  slug: "special-hollow/eb05-049",
  name: "Special Hollow",
  printings: [
    {
      id: "EB05-049",
      artId: "EB05-049",
      setCode: "EB05",
      collectorNumber: "049",
      rarity: "C",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/EB05-049_MDkQqmE.jpg",
    },
  ],
  cardType: "event",
  color: ["black"],
  rarity: "C",
  setId: "EB05",
  cost: 1,
  traits: ["Thriller Bark Pirates"],
  effect:
    "[Main] You may K.O. 1 of your {Thriller Bark Pirates} type Characters: Give up to 1 of your opponent's Characters -3 cost during this turn.\n[Counter] You may K.O. 1 of your {Thriller Bark Pirates} type Characters: Up to 1 of your Leader or Characters gains +4000 power during this battle.",
  effects: {
    effects: [
      {
        trigger: "main",
        costs: [{ cost: "koCharacter", amount: 1, filters: [{ filter: "trait", value: "Thriller Bark Pirates", match: "exact" }] }],
        actions: [
          { action: "modifyCost", target: { player: "opponent", zones: ["character"], count: { amount: 1, upTo: true } }, value: -3, duration: "thisTurn" },
        ],
        optional: true,
      },
      {
        trigger: "counter",
        costs: [{ cost: "koCharacter", amount: 1, filters: [{ filter: "trait", value: "Thriller Bark Pirates", match: "exact" }] }],
        actions: [
          { action: "modifyPower", target: { player: "self", zones: ["leader", "character"], count: { amount: 1, upTo: true } }, value: 4000, duration: "thisBattle" },
        ],
        optional: true,
      },
    ],
  },
  i18n: eb05SpecialHollow049I18n,
};
