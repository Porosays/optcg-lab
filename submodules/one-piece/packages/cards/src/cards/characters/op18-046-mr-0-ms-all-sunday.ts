import type { CharacterCard } from "@tcg/op-types";
import { op18Mr0MsAllSunday046I18n } from "./op18-046-mr-0-ms-all-sunday.i18n.ts";

export const op18Mr0MsAllSunday046: CharacterCard = {
  id: "OP18-046",
  canonicalId: "OP18-046",
  slug: "mr-0-ms-all-sunday/op18-046",
  name: "Mr.0 & Ms. All Sunday",
  printings: [
    {
      id: "OP18-046",
      artId: "OP18-046",
      setCode: "OP18",
      collectorNumber: "046",
      rarity: "SR",
      imageUrl: "",
    },
  ],
  cardType: "character",
  color: ["blue"],
  rarity: "SR",
  setId: "OP18",
  cost: 9,
  power: 10000,
  traits: ["The Seven Warlords of the Sea Baroque Works"],
  attribute: ["special","wisdom"],
  effect:
    "[On Play] Draw 2 cards and give your Leader and all of your Characters up to 2 rested DON!! cards each.[On Your Opponent's Attack] You may trash 1 card from your hand: The base power of your Leader with a type including \"Baroque Works\" becomes 7000 during this turn.",
  effects: {
    effects: [
      {
        trigger: "onPlay",
        actions: [
          {
            action: "draw",
            player: "self",
            amount: 2
          },
          {
            action: "giveDon",
            target: {
              player: "self",
              zones: [
                "leader",
                "character"
              ],
              count: {
                amount: "all"
              }
            },
            count: {
              amount: 2,
              upTo: true
            },
            donState: "rested",
            distribution: "each"
          }
        ]
      }
    ]
  },
  i18n: op18Mr0MsAllSunday046I18n,
};
