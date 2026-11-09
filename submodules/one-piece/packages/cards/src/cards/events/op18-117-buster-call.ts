import type { EventCard } from "@tcg/op-types";
import { op18BusterCall117I18n } from "./op18-117-buster-call.i18n.ts";

export const op18BusterCall117: EventCard = {
  id: "OP18-117",
  canonicalId: "OP18-117",
  slug: "buster-call/op18-117",
  name: "Buster Call",
  printings: [
    {
      id: "OP18-117",
      artId: "OP18-117",
      setCode: "OP18",
      collectorNumber: "117",
      rarity: "R",
      imageUrl: "",
    },
  ],
  cardType: "event",
  color: ["yellow"],
  rarity: "R",
  setId: "OP18",
  cost: 10,
  traits: ["Navy CP9"],
  effect:
    "[Main] You may trash all of your Life cards: If your Leader is [Spandam], trash all Characters and play up to a total of 5 {Vice Admiral} type Character cards with different card names from your deck or trash. Then, shuffle your deck.",
  effects: {
    effects: [
      {
        trigger: "main",
        actions: [
          {
            action: "shuffleDeck",
            player: "self"
          }
        ],
        optional: true
      }
    ]
  },
  i18n: op18BusterCall117I18n,
};
