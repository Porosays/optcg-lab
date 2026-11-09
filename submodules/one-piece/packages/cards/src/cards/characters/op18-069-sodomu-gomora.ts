import type { CharacterCard } from "@tcg/op-types";
import { op18SodomuGomora069I18n } from "./op18-069-sodomu-gomora.i18n.ts";

export const op18SodomuGomora069: CharacterCard = {
  id: "OP18-069",
  canonicalId: "OP18-069",
  slug: "sodomu-gomora/op18-069",
  name: "Sodomu & Gomora",
  printings: [
    {
      id: "OP18-069",
      artId: "OP18-069",
      setCode: "OP18",
      collectorNumber: "069",
      rarity: "C",
      imageUrl: "",
    },
  ],
  cardType: "character",
  color: ["purple"],
  rarity: "C",
  setId: "OP18",
  cost: 1,
  power: 2000,
  counter: 2000,
  traits: ["Animal Water Seven The Franky Family"],
  attribute: "strike",
  effect:
    "If your {The Franky Family} type Character would be K.O.'d, you may DON!! −1 and rest this Character instead.",
  effects: {
    replacementEffects: [
      {
        replacedEvent: "ko",
        target: {
          player: "self",
          zones: [
            "character"
          ],
          count: {
            amount: 1
          },
          filters: [
            {
              filter: "trait",
              value: "The Franky Family",
              match: "exact"
            }
          ]
        },
        replacementAction: {
          action: "rest",
          target: {
            player: "self",
            zones: [
              "character"
            ],
            count: {
              amount: 1
            },
            self: true
          }
        }
      }
    ]
  },
  i18n: op18SodomuGomora069I18n,
};
