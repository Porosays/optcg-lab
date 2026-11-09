import type { EventCard } from "@tcg/op-types";
import { op18DiableJambeFlambShot040I18n } from "./op18-040-diable-jambe-flamb-shot.i18n.ts";

export const op18DiableJambeFlambShot040: EventCard = {
  id: "OP18-040",
  canonicalId: "OP18-040",
  slug: "diable-jambe-flamb-shot/op18-040",
  name: "Diable Jambe Flambé Shot",
  printings: [
    {
      id: "OP18-040",
      artId: "OP18-040",
      setCode: "OP18",
      collectorNumber: "040",
      rarity: "C",
      imageUrl: "",
    },
  ],
  cardType: "event",
  color: ["green"],
  rarity: "C",
  setId: "OP18",
  cost: 4,
  traits: ["Water Seven Straw Hat Crew"],
  effect:
    "[Main] K.O. up to 1 of your opponent's rested Characters with a cost of 7 or less. [Trigger] Rest up to 1 of your opponent's Characters with a cost of 7 or less.",
  effects: {
    effects: [
      {
        trigger: "main",
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
                  filter: "state",
                  value: "rested"
                },
                {
                  filter: "cost",
                  comparison: "lte",
                  value: 7
                }
              ]
            }
          }
        ]
      },
      {
        trigger: "trigger",
        actions: [
          {
            action: "rest",
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
                  value: 7
                }
              ]
            }
          }
        ]
      }
    ]
  },
  i18n: op18DiableJambeFlambShot040I18n,
};
