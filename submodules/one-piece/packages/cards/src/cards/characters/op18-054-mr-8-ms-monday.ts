import type { CharacterCard } from "@tcg/op-types";
import { op18Mr8MsMonday054I18n } from "./op18-054-mr-8-ms-monday.i18n.ts";

export const op18Mr8MsMonday054: CharacterCard = {
  id: "OP18-054",
  canonicalId: "OP18-054",
  slug: "mr-8-ms-monday/op18-054",
  name: "Mr.8 & Ms. Monday",
  printings: [
    {
      id: "OP18-054",
      artId: "OP18-054",
      setCode: "OP18",
      collectorNumber: "054",
      rarity: "UC",
      imageUrl: "",
    },
  ],
  cardType: "character",
  color: ["blue"],
  rarity: "UC",
  setId: "OP18",
  cost: 2,
  power: 3000,
  counter: 2000,
  traits: ["Baroque Works"],
  attribute: ["strike","ranged"],
  effect:
    "[DON!! x1] This Character gains +1000 power.[Opponent's Turn] [Once Per Turn] If your Character with a type including \"Baroque Works\" would be removed from the field by your opponent's effect, you may trash 1 card from your hand instead.",
  effects: {
    permanentEffects: [
      {
        conditions: [
          {
            condition: "donAttached",
            amount: 1
          }
        ],
        actions: [
          {
            action: "modifyPower",
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
            value: 1000,
            duration: "permanent"
          }
        ]
      }
    ],
    replacementEffects: [
      {
        replacedEvent: "removeFromField",
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
              value: "Baroque Works",
              match: "includes"
            }
          ]
        },
        source: "opponentEffect",
        replacementAction: {
          action: "trashFromHand",
          player: "self",
          amount: 1
        },
        conditions: [
          {
            condition: "turn",
            value: "opponent"
          }
        ],
        oncePerTurn: true
      }
    ]
  },
  i18n: op18Mr8MsMonday054I18n,
};
