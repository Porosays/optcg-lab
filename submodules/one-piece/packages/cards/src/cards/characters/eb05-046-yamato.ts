import type { CharacterCard } from "@tcg/op-types";
import { eb05Yamato046I18n } from "./eb05-046-yamato.i18n.ts";

export const eb05Yamato046: CharacterCard = {
  id: "EB05-046",
  canonicalId: "EB05-046",
  slug: "yamato/eb05-046",
  name: "Yamato",
  printings: [
    {
      id: "EB05-046",
      artId: "EB05-046",
      setCode: "EB05",
      collectorNumber: "046",
      rarity: "SR",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/EB05-046_EctTl5w.jpg",
    },
    {
      id: "EB05-046_p1",
      artId: "EB05-046_p1",
      setCode: "EB05",
      collectorNumber: "046",
      rarity: "SR",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/EB05-046_p1_REztKEz.jpg",
      label: "Yamato (Super Rare Alternate Art)",
    },
  ],
  cardType: "character",
  color: ["black"],
  rarity: "SR",
  setId: "EB05",
  cost: 4,
  power: 5000,
  counter: 1000,
  traits: ["Land of Wano"],
  attribute: "strike",
  effect:
    "If your opponent has a Character with 8000 base power or more, this Character gains [Blocker] and +3000 power.\n[On Your Opponent's Attack] You may trash 1 card from your hand: If you have 10 or more cards in your trash, your Leader's base power becomes 7000 during this turn.",
  effects: {
    effects: [
      {
        trigger: "onOpponentAttack",
        costs: [
          {
            cost: "trashFromHand",
            amount: 1
          }
        ],
        actions: [
          {
            action: "setBasePower",
            target: {
              player: "self",
              zones: [
                "leader"
              ],
              count: {
                amount: 1
              }
            },
            value: 7000,
            duration: "thisTurn",
            condition: {
              condition: "zoneCount",
              player: "self",
              zone: "trash",
              comparison: "gte",
              value: 10
            }
          }
        ],
        optional: true
      }
    ],
    permanentEffects: [
      {
        conditions: [
          {
            condition: "hasCard",
            player: "opponent",
            zone: "character",
            filters: [
              {
                filter: "basePower",
                comparison: "gte",
                value: 8000
              }
            ]
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
                amount: 1
              },
              self: true
            },
            keyword: "blocker",
            duration: "permanent"
          },
          {
            action: "modifyPower",
            target: {
              player: "self",
              zones: [
                "character"
              ],
              count: {
                amount: 1
              },
              self: true
            },
            value: 3000,
            duration: "permanent"
          }
        ]
      }
    ]
  },
  i18n: eb05Yamato046I18n,
};
