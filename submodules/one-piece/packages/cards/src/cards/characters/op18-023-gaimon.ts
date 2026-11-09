import type { CharacterCard } from "@tcg/op-types";
import { op18Gaimon023I18n } from "./op18-023-gaimon.i18n.ts";

export const op18Gaimon023: CharacterCard = {
  id: "OP18-023",
  canonicalId: "OP18-023",
  slug: "gaimon/op18-023",
  name: "Gaimon",
  printings: [
    {
      id: "OP18-023",
      artId: "OP18-023",
      setCode: "OP18",
      collectorNumber: "023",
      rarity: "C",
      imageUrl: "",
    },
  ],
  cardType: "character",
  color: ["green"],
  rarity: "C",
  setId: "OP18",
  cost: 1,
  power: 0,
  counter: 2000,
  traits: ["East Blue"],
  attribute: "wisdom",
  effect:
    "[On Play] Up to 1 of your {East Blue} type Leader or Characters gains [Banish] during this turn.(When this card deals damage, the target card is trashed without activating its Trigger.)",
  effects: {
    effects: [
      {
        trigger: "onPlay",
        actions: [
          {
            action: "grantKeyword",
            target: {
              player: "self",
              zones: [
                "leader",
                "character"
              ],
              count: {
                amount: 1,
                upTo: true
              },
              filters: [
                {
                  filter: "trait",
                  value: "East Blue",
                  match: "exact"
                }
              ]
            },
            keyword: "banish",
            duration: "thisTurn"
          }
        ]
      }
    ]
  },
  i18n: op18Gaimon023I18n,
};
