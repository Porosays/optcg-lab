import type { StageCard } from "@tcg/op-types";
import { op18MiniMerry078I18n } from "./op18-078-mini-merry.i18n.ts";

export const op18MiniMerry078: StageCard = {
  id: "OP18-078",
  canonicalId: "OP18-078",
  slug: "mini-merry/op18-078",
  name: "Mini-Merry",
  printings: [
    {
      id: "OP18-078",
      artId: "OP18-078",
      setCode: "OP18",
      collectorNumber: "078",
      rarity: "UC",
      imageUrl: "",
    },
  ],
  cardType: "stage",
  color: ["purple"],
  rarity: "UC",
  setId: "OP18",
  cost: 5,
  traits: ["Straw Hat Crew"],
  effect:
    "[On Play] Draw 1 card, then add up to 1 DON!! card as rested from your DON!! deck.[Activate: Main] You may rest this Stage: Give up to a total of 4 of your Leader or Characters 1 rested DON!! Card each.",
  effects: {
    effects: [
      {
        trigger: "onPlay",
        actions: [
          {
            action: "draw",
            player: "self",
            amount: 1
          }
        ]
      }
    ]
  },
  i18n: op18MiniMerry078I18n,
};
