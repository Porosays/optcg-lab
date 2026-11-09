import type { EventCard } from "@tcg/op-types";
import { op18GumGumGiantAxe039I18n } from "./op18-039-gum-gum-giant-axe.i18n.ts";

export const op18GumGumGiantAxe039: EventCard = {
  id: "OP18-039",
  canonicalId: "OP18-039",
  slug: "gum-gum-giant-axe/op18-039",
  name: "Gum-Gum Giant Axe",
  printings: [
    {
      id: "OP18-039",
      artId: "OP18-039",
      setCode: "OP18",
      collectorNumber: "039",
      rarity: "R",
      imageUrl: "",
    },
  ],
  cardType: "event",
  color: ["green"],
  rarity: "R",
  setId: "OP18",
  cost: 1,
  traits: ["Water Seven Straw Hat Crew"],
  effect:
    "[Counter] Up to 1 of your [Monkey.D.Luffy] gains +2000 power during this battle. Then, if your Leader is active, draw 1 card.",
  effects: {
    effects: [
      {
        trigger: "counter",
        actions: [
          {
            action: "draw",
            player: "self",
            amount: 1,
            condition: {
              condition: "hasCard",
              player: "self",
              zone: "leader",
              filters: [
                {
                  filter: "state",
                  value: "active"
                }
              ]
            }
          }
        ]
      }
    ]
  },
  i18n: op18GumGumGiantAxe039I18n,
};
