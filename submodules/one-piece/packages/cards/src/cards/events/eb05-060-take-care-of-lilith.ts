import type { EventCard } from "@tcg/op-types";
import { eb05TakeCareOfLilith060I18n } from "./eb05-060-take-care-of-lilith.i18n.ts";

export const eb05TakeCareOfLilith060: EventCard = {
  id: "EB05-060",
  canonicalId: "EB05-060",
  slug: "take-care-of-lilith/eb05-060",
  name: "Take Care of Lilith!!!",
  printings: [
    {
      id: "EB05-060",
      artId: "EB05-060",
      setCode: "EB05",
      collectorNumber: "060",
      rarity: "C",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/EB05-060_u6Abo1K.jpg",
    },
  ],
  cardType: "event",
  color: ["yellow"],
  rarity: "C",
  setId: "EB05",
  cost: 1,
  traits: ["Scientist","Egghead"],
  effect:
    "[Main] You may trash 1 of your {Egghead} type Characters with a cost of 5 or more: Add up to 1 card from the top of your deck to the top of your Life cards.\n[Counter] You may turn 1 card from the top of your Life cards face-up: Up to 1 of your Leader or Characters gains +4000 power during this battle.",
  effects: {
    effects: [
      {
        trigger: "main",
        costs: [
          {
            cost: "trashCharacter",
            amount: 1,
            filters: [
              {
                filter: "trait",
                value: "Egghead",
                match: "exact"
              }
            ]
          }
        ],
        actions: [
          {
            action: "addToLife",
            target: {
              player: "self",
              zones: [
                "deck"
              ],
              count: {
                amount: 1,
                upTo: true
              }
            },
            position: "top"
          }
        ],
        optional: true
      },
      {
        trigger: "counter",
        costs: [
          {
            cost: "turnLifeFaceUp",
            count: 1,
            faceUp: true
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
              }
            },
            value: 4000,
            duration: "thisBattle"
          }
        ],
        optional: true
      }
    ]
  },
  i18n: eb05TakeCareOfLilith060I18n,
};
