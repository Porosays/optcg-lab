import type { CharacterCard } from "@tcg/op-types";
import { op18CatarinaDevon082I18n } from "./op18-082-catarina-devon.i18n.ts";

export const op18CatarinaDevon082: CharacterCard = {
  id: "OP18-082",
  canonicalId: "OP18-082",
  slug: "catarina-devon/op18-082",
  name: "Catarina Devon",
  printings: [
    {
      id: "OP18-082",
      artId: "OP18-082",
      setCode: "OP18",
      collectorNumber: "082",
      rarity: "C",
      imageUrl: "",
    },
  ],
  cardType: "character",
  color: ["black"],
  rarity: "C",
  setId: "OP18",
  cost: 5,
  power: 3000,
  counter: 2000,
  traits: ["Egghead Blackbeard Pirates"],
  attribute: "special",
  effect:
    "[When Attacking] This Character's base power becomes the same as your opponent's Leader's power during this turn.[On K.O.] You may trash 1 card from your hand: If your Leader has the {Blackbeard Pirates} type, play this Character card from your trash rested.",
  effects: {
    effects: [
      {
        trigger: "onKo",
        costs: [
          {
            cost: "trashFromHand",
            amount: 1
          }
        ],
        actions: [
          {
            action: "play",
            source: {
              player: "self",
              zone: "trash"
            },
            count: {
              amount: 1
            },
            self: true,
            playState: "rested",
            condition: {
              condition: "leaderTrait",
              trait: "Blackbeard Pirates",
              match: "exact"
            }
          }
        ],
        optional: true
      }
    ]
  },
  i18n: op18CatarinaDevon082I18n,
};
