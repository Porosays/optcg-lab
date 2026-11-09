import type { StageCard } from "@tcg/op-types";
import { op18WhiteHobbyHorse1077I18n } from "./op18-077-white-hobby-horse-1.i18n.ts";

export const op18WhiteHobbyHorse1077: StageCard = {
  id: "OP18-077",
  canonicalId: "OP18-077",
  slug: "white-hobby-horse-1/op18-077",
  name: "White Hobby Horse 1",
  printings: [
    {
      id: "OP18-077",
      artId: "OP18-077",
      setCode: "OP18",
      collectorNumber: "077",
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
    "[On Play] Draw 1 card, then add up to 1 DON!! card as rested from your DON!! deck.[Activate: Main] You may rest this Stage: Up to 1 of your {Straw Hat Crew} type Characters gains [Rush: Character] during this turn.",
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
      },
      {
        trigger: "activateMain",
        costs: [
          {
            cost: "restThisCard"
          }
        ],
        actions: [
          {
            action: "grantKeyword",
            target: {
              player: "self",
              zones: [
                "character"
              ],
              count: {
                amount: 1,
                upTo: true
              },
              filters: [
                {
                  filter: "trait",
                  value: "Straw Hat Crew",
                  match: "exact"
                }
              ]
            },
            keyword: "rushCharacter",
            duration: "thisTurn"
          }
        ],
        optional: true
      }
    ]
  },
  i18n: op18WhiteHobbyHorse1077I18n,
};
