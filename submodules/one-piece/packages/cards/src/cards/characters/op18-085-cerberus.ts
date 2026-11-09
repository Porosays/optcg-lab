import type { CharacterCard } from "@tcg/op-types";
import { op18Cerberus085I18n } from "./op18-085-cerberus.i18n.ts";

export const op18Cerberus085: CharacterCard = {
  id: "OP18-085",
  canonicalId: "OP18-085",
  slug: "cerberus/op18-085",
  name: "Cerberus",
  printings: [
    {
      id: "OP18-085",
      artId: "OP18-085",
      setCode: "OP18",
      collectorNumber: "085",
      rarity: "UC",
      imageUrl: "",
    },
  ],
  cardType: "character",
  color: ["black"],
  rarity: "UC",
  setId: "OP18",
  cost: 1,
  power: 0,
  counter: 2000,
  traits: ["Holy Knights of God"],
  attribute: "slash",
  effect:
    "[Activate: Main] You may return this Character to the owner's hand: Up to 1 of your [Saint Shamrock] Characters gains [Rush], [Banish] or [Unblockable] during this turn.",
  effects: {
    effects: [
      {
        trigger: "activateMain",
        costs: [
          {
            cost: "returnThisToHand"
          }
        ],
        actions: [
          {
            action: "choice",
            options: [
              [
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
                        filter: "name",
                        value: "Saint Shamrock"
                      }
                    ]
                  },
                  keyword: "rush",
                  duration: "thisTurn"
                }
              ],
              [
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
                        filter: "name",
                        value: "Saint Shamrock"
                      }
                    ]
                  },
                  keyword: "banish",
                  duration: "thisTurn"
                }
              ],
              [
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
                        filter: "name",
                        value: "Saint Shamrock"
                      }
                    ]
                  },
                  keyword: "unblockable",
                  duration: "thisTurn"
                }
              ]
            ]
          }
        ],
        optional: true
      }
    ]
  },
  i18n: op18Cerberus085I18n,
};
