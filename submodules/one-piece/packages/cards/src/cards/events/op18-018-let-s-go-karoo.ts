import type { EventCard } from "@tcg/op-types";
import { op18LetSGoKaroo018I18n } from "./op18-018-let-s-go-karoo.i18n.ts";

export const op18LetSGoKaroo018: EventCard = {
  id: "OP18-018",
  canonicalId: "OP18-018",
  slug: "let-s-go-karoo/op18-018",
  name: "Let's Go, Karoo!!",
  printings: [
    {
      id: "OP18-018",
      artId: "OP18-018",
      setCode: "OP18",
      collectorNumber: "018",
      rarity: "C",
      imageUrl: "",
    },
  ],
  cardType: "event",
  color: ["red"],
  rarity: "C",
  setId: "OP18",
  cost: 1,
  traits: ["Alabasta"],
  effect:
    "[Main] All of your {Alabasta} type Characters gain +1000 power during this turn. [Trigger] Up to 1 of your Leader or Characters gains +2000 power during this turn.",
  effects: {
    effects: [
      {
        trigger: "main",
        actions: [
          {
            action: "modifyPower",
            target: {
              player: "self",
              zones: [
                "character"
              ],
              count: {
                amount: "all"
              },
              filters: [
                {
                  filter: "trait",
                  value: "Alabasta",
                  match: "exact"
                }
              ]
            },
            value: 1000,
            duration: "thisTurn"
          }
        ]
      },
      {
        trigger: "trigger",
        actions: [
          {
            action: "modifyPower",
            target: {
              player: "self",
              zones: [
                "leader",
                "character"
              ],
              count: {
                amount: 1,
                upTo: true
              }
            },
            value: 2000,
            duration: "thisTurn"
          }
        ]
      }
    ]
  },
  i18n: op18LetSGoKaroo018I18n,
};
