import type { LeaderCard } from "@tcg/op-types";
import { op18Karoo001I18n } from "./op18-001-karoo.i18n.ts";

export const op18Karoo001: LeaderCard = {
  id: "OP18-001",
  canonicalId: "OP18-001",
  slug: "karoo/op18-001",
  name: "Karoo",
  printings: [
    {
      id: "OP18-001",
      artId: "OP18-001",
      setCode: "OP18",
      collectorNumber: "001",
      rarity: "L",
      imageUrl: "",
    },
  ],
  cardType: "leader",
  color: ["red","blue"],
  rarity: "L",
  setId: "OP18",
  power: 5000,
  life: 4,
  traits: ["Animal","Alabasta"],
  attribute: "strike",
  effect:
    "All of your Characters with both the {Animal} and {Alabasta} types gain [Rush] and +1000 power.[Once Per Turn] When your {Alabasta} type Character is K.O.'d, draw 1 card.",
  i18n: op18Karoo001I18n,
};
