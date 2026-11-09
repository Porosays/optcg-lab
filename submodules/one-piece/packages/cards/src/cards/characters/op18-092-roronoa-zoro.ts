import type { CharacterCard } from "@tcg/op-types";
import { op18RoronoaZoro092I18n } from "./op18-092-roronoa-zoro.i18n.ts";

export const op18RoronoaZoro092: CharacterCard = {
  id: "OP18-092",
  canonicalId: "OP18-092",
  slug: "roronoa-zoro/op18-092",
  name: "Roronoa Zoro",
  printings: [
    {
      id: "OP18-092",
      artId: "OP18-092",
      setCode: "OP18",
      collectorNumber: "092",
      rarity: "UC",
      imageUrl: "",
    },
  ],
  cardType: "character",
  color: ["black"],
  rarity: "UC",
  setId: "OP18",
  cost: 2,
  power: 2000,
  counter: 1000,
  traits: ["Elbaph","Straw Hat Crew"],
  attribute: "slash",
  effect:
    "If there is a Character with a cost of 12 or more, this Character gains +3000 power.If you have 10 or more cards in your trash, this Character gains [Rush].(This card can attack on the turn in which it is played.)",
  effects: {
    effects: [],
    permanentEffects: [
      {
        conditions: [{ condition: "compound", operator: "or", conditions: [
          { condition: "existsOnField", player: "self", zone: "character", filters: [{ filter: "cost", comparison: "gte", value: 12 }] },
          { condition: "existsOnField", player: "opponent", zone: "character", filters: [{ filter: "cost", comparison: "gte", value: 12 }] },
        ] }],
        actions: [{ action: "modifyPower", target: { player: "self", zones: ["character"], count: { amount: 1 }, self: true }, value: 3000, duration: "permanent" }],
      },
      {
        conditions: [{ condition: "zoneCount", player: "self", zone: "trash", comparison: "gte", value: 10 }],
        actions: [{ action: "grantKeyword", target: { player: "self", zones: ["character"], count: { amount: 1 }, self: true }, keyword: "rush", duration: "permanent" }],
      },
    ],
  },
  i18n: op18RoronoaZoro092I18n,
};
