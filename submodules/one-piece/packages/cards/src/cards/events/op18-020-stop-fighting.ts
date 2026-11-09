import type { EventCard } from "@tcg/op-types";
import { op18StopFighting020I18n } from "./op18-020-stop-fighting.i18n.ts";

export const op18StopFighting020: EventCard = {
  id: "OP18-020",
  canonicalId: "OP18-020",
  slug: "stop-fighting/op18-020",
  name: "Stop Fighting!!!",
  printings: [
    {
      id: "OP18-020",
      artId: "OP18-020",
      setCode: "OP18",
      collectorNumber: "020",
      rarity: "UC",
      imageUrl: "",
    },
  ],
  cardType: "event",
  color: ["red"],
  rarity: "UC",
  setId: "OP18",
  cost: 1,
  traits: ["Alabasta"],
  effect:
    "[Counter] You may add all of your Life cards to your hand: If your Leader is [Nefeltari Vivi], give your opponent's Leader and all of their Characters −5000 power during this turn.",
  i18n: op18StopFighting020I18n,
};
