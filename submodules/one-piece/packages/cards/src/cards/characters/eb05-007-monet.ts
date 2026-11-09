import type { CharacterCard } from "@tcg/op-types";
import { eb05Monet007I18n } from "./eb05-007-monet.i18n.ts";

export const eb05Monet007: CharacterCard = {
  id: "EB05-007",
  canonicalId: "EB05-007",
  slug: "monet/eb05-007",
  name: "Monet",
  printings: [
    {
      id: "EB05-007",
      artId: "EB05-007",
      setCode: "EB05",
      collectorNumber: "007",
      rarity: "C",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/EB05-007_4FwTUNL.jpg",
    },
  ],
  cardType: "character",
  color: ["red"],
  rarity: "C",
  setId: "EB05",
  cost: 2,
  power: 1000,
  counter: 2000,
  traits: ["Punk Hazard","Donquixote Pirates"],
  attribute: "special",
  effect:
    "[On Play] You may reveal a total of 3 Event or {Punk Hazard} type cards from your hand: Draw 1 card.\n[End of Your Turn] This Character gains +5000 power until the end of your opponent's next End Phase.",
  effects: {
    effects: [
      {
        trigger: "endOfYourTurn",
        actions: [
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
            value: 5000,
            duration: "untilEndOfOpponentNextEndPhase"
          }
        ]
      }
    ]
  },
  i18n: eb05Monet007I18n,
};
