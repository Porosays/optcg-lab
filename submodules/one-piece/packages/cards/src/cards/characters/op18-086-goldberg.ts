import type { CharacterCard } from "@tcg/op-types";
import { op18Goldberg086I18n } from "./op18-086-goldberg.i18n.ts";

export const op18Goldberg086: CharacterCard = {
  id: "OP18-086",
  canonicalId: "OP18-086",
  slug: "goldberg/op18-086",
  name: "Goldberg",
  printings: [
    {
      id: "OP18-086",
      artId: "OP18-086",
      setCode: "OP18",
      collectorNumber: "086",
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
    "This Character gains +12 cost.[On K.O.] K.O. up to 1 of your opponent's Characters with a cost of 4 or less.",
  effects: {
    effects: [
      {
        trigger: "onKo",
        actions: [
          {
            action: "ko",
            target: {
              player: "opponent",
              zones: [
                "character"
              ],
              count: {
                amount: 1,
                upTo: true
              },
              filters: [
                {
                  filter: "cost",
                  comparison: "lte",
                  value: 4
                }
              ]
            }
          }
        ]
      }
    ],
    permanentEffects: [
      {
        actions: [
          {
            action: "modifyCost",
            target: {
              player: "self",
              zones: [
                "character"
              ],
              count: {
                amount: 1
              },
              self: true
            },
            value: 12
          }
        ]
      }
    ]
  },
  i18n: op18Goldberg086I18n,
};
