import type { EventCard } from "@tcg/op-types";
import { eb05IChooseToOpenThisCountryToTheWorldIWantToFightOnYourSide019I18n } from "./eb05-019-i-choose-to-open-this-country-to-the-world-i-want-to-fight-on-your-side.i18n.ts";

export const eb05IChooseToOpenThisCountryToTheWorldIWantToFightOnYourSide019: EventCard = {
  id: "EB05-019",
  canonicalId: "EB05-019",
  slug: "i-choose-to-open-this-country-to-the-world-i-want-to-fight-on-your-side/eb05-019",
  name: "I Choose to Open This Country to the World!! I Want to Fight on Your Side!!!",
  printings: [
    {
      id: "EB05-019",
      artId: "EB05-019",
      setCode: "EB05",
      collectorNumber: "019",
      rarity: "C",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/EB05-019_SMyPF0A.jpg",
    },
  ],
  cardType: "event",
  color: ["green"],
  rarity: "C",
  setId: "EB05",
  cost: 1,
  trigger:
    "If your opponent has 3 or less Life cards, play up to 1 {Land of Wano} type Character card with 6000 power or less from your hand.",
  traits: ["Land of Wano"],
  effect:
    "[Counter] You may rest 1 of your cards: Up to 1 of your {Land of Wano} type Leader or Characters gains +4000 power during this battle.",
  effects: {
    effects: [
      {
        trigger: "counter",
        costs: [
          {
            cost: "restCards",
            amount: 1
          }
        ],
        actions: [
          {
            action: "modifyPower",
            target: {
              player: "self",
              zones: [
                "leader",
                "character"
              ],
              count: {
                amount: 1,
                upTo: true
              },
              filters: [
                {
                  filter: "trait",
                  value: "Land of Wano",
                  match: "exact"
                }
              ]
            },
            value: 4000,
            duration: "thisBattle"
          }
        ],
        optional: true
      },
      {
        trigger: "trigger",
        conditions: [
          {
            condition: "lifeCount",
            player: "opponent",
            comparison: "lte",
            value: 3
          }
        ],
        actions: [
          {
            action: "play",
            source: {
              player: "self",
              zone: "hand"
            },
            count: {
              amount: 1,
              upTo: true
            },
            filters: [
              {
                filter: "power",
                comparison: "lte",
                value: 6000
              },
              {
                filter: "trait",
                value: "Land of Wano",
                match: "exact"
              },
              {
                filter: "cardCategory",
                value: "character"
              }
            ]
          }
        ]
      }
    ]
  },
  i18n: eb05IChooseToOpenThisCountryToTheWorldIWantToFightOnYourSide019I18n,
};
