import type { LeaderCard } from "@tcg/op-types";
import { op18SaintGunko060I18n } from "./op18-060-saint-gunko.i18n.ts";

export const op18SaintGunko060: LeaderCard = {
  id: "OP18-060",
  canonicalId: "OP18-060",
  slug: "saint-gunko/op18-060",
  name: "Saint Gunko",
  printings: [
    {
      id: "OP18-060",
      artId: "OP18-060",
      setCode: "OP18",
      collectorNumber: "060",
      rarity: "L",
      imageUrl: "",
    },
  ],
  cardType: "leader",
  color: ["purple","black"],
  rarity: "L",
  setId: "OP18",
  power: 5000,
  life: 4,
  traits: ["Celestial Dragons Holy Knights of God"],
  attribute: "special",
  effect:
    "[Once Per Turn] When a Character is played from your trash, draw 2 cards and trash 1 card from your hand.[Activate: Main] [Once Per Turn] You may trash 1 card from your hand: If you have a Character with 8000 base power or more, add up to 1 DON!! card as active from your DON!! deck.",
  effects: {
    permanentEffects: [
      {
        actions: [
          {
            action: "trashFromHand",
            player: "self",
            amount: 1
          }
        ]
      }
    ]
  },
  i18n: op18SaintGunko060I18n,
};
