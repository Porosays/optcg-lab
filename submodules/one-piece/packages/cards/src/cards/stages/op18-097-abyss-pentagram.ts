import type { StageCard } from "@tcg/op-types";
import { op18AbyssPentagram097I18n } from "./op18-097-abyss-pentagram.i18n.ts";

export const op18AbyssPentagram097: StageCard = {
  id: "OP18-097",
  canonicalId: "OP18-097",
  slug: "abyss-pentagram/op18-097",
  name: "Abyss Pentagram",
  printings: [
    {
      id: "OP18-097",
      artId: "OP18-097",
      setCode: "OP18",
      collectorNumber: "097",
      rarity: "UC",
      imageUrl: "",
    },
  ],
  cardType: "stage",
  color: ["black"],
  rarity: "UC",
  setId: "OP18",
  cost: 1,
  traits: ["Celestial Dragons Holy Knights of God Five Elders"],
  effect:
    "If your Leader has the {Celestial Dragons} type, the cost of playing {Holy Knights of God} or {Five Elders} type Character cards with a cost of 2 or more from your hand will be reduced by 1.[On Play] Draw 1 card and trash 2 cards from the top of your deck.",
  effects: {
    effects: [
      {
        trigger: "onPlay",
        actions: [
          {
            action: "draw",
            player: "self",
            amount: 1
          },
          {
            action: "trashFromDeck",
            player: "self",
            amount: 2
          }
        ]
      }
    ]
  },
  i18n: op18AbyssPentagram097I18n,
};
