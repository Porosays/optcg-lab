import type { CharacterCard } from "@tcg/op-types";
import { op18Mr2BonKurei049I18n } from "./op18-049-mr-2-bon-kurei.i18n.ts";

export const op18Mr2BonKurei049: CharacterCard = {
  id: "OP18-049",
  canonicalId: "OP18-049",
  slug: "mr-2-bon-kurei/op18-049",
  name: "Mr.2.Bon.Kurei",
  printings: [
    {
      id: "OP18-049",
      artId: "OP18-049",
      setCode: "OP18",
      collectorNumber: "049",
      rarity: "R",
      imageUrl: "",
      label: "Mr.2.Bon.Kurei(Bentham)",
    },
  ],
  cardType: "character",
  color: ["blue"],
  rarity: "R",
  setId: "OP18",
  cost: 5,
  power: 6000,
  counter: 1000,
  traits: ["Baroque Works"],
  attribute: "strike",
  effect:
    "[On Play] Look at 5 cards from the top of your deck; reveal up to 1 card with a type including \"Baroque Works\", add it to your hand and place the rest at the bottom of your deck in any order. Then, give up to 1 rested DON!! card to your Leader or 1 of your Characters.",
  effects: {
    effects: [
      {
        trigger: "onPlay",
        actions: [
          {
            action: "giveDon",
            target: {
              player: "self",
              zones: [
                "leader",
                "character"
              ],
              count: {
                amount: 1
              }
            },
            count: {
              amount: 1,
              upTo: true
            },
            donState: "rested"
          }
        ]
      }
    ]
  },
  i18n: op18Mr2BonKurei049I18n,
};
