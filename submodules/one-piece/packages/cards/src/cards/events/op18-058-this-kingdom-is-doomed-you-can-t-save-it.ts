import type { EventCard } from "@tcg/op-types";
import { op18ThisKingdomIsDoomedYouCanTSaveIt058I18n } from "./op18-058-this-kingdom-is-doomed-you-can-t-save-it.i18n.ts";

export const op18ThisKingdomIsDoomedYouCanTSaveIt058: EventCard = {
  id: "OP18-058",
  canonicalId: "OP18-058",
  slug: "this-kingdom-is-doomed-you-can-t-save-it/op18-058",
  name: "This Kingdom is Doomed. You Can't Save It!",
  printings: [
    {
      id: "OP18-058",
      artId: "OP18-058",
      setCode: "OP18",
      collectorNumber: "058",
      rarity: "C",
      imageUrl: "",
    },
  ],
  cardType: "event",
  color: ["blue"],
  rarity: "C",
  setId: "OP18",
  cost: 3,
  traits: ["The Seven Warlords of the Sea Baroque Works"],
  effect:
    "[Main] You may return 1 of your Characters to the owner's hand: Place up to 1 Character with a cost of 4 or less at the bottom of the owner's deck. [Trigger] Activate this card's [Main] effect.",
  effects: {
    effects: [
      {
        trigger: "main",
        costs: [
          {
            cost: "returnCharacter",
            amount: 1
          }
        ],
        actions: [
          {
            action: "returnToDeck",
            target: {
              player: "any",
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
            },
            position: "bottom"
          }
        ],
        optional: true
      },
      {
        trigger: "trigger",
        actions: [
          {
            action: "activateEffect",
            effectTrigger: "main"
          }
        ]
      }
    ]
  },
  i18n: op18ThisKingdomIsDoomedYouCanTSaveIt058I18n,
};
