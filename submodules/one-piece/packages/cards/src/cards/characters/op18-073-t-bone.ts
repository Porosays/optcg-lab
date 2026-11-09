import type { CharacterCard } from "@tcg/op-types";
import { op18TBone073I18n } from "./op18-073-t-bone.i18n.ts";

export const op18TBone073: CharacterCard = {
  id: "OP18-073",
  canonicalId: "OP18-073",
  slug: "t-bone/op18-073",
  name: "T-Bone",
  printings: [
    {
      id: "OP18-073",
      artId: "OP18-073",
      setCode: "OP18",
      collectorNumber: "073",
      rarity: "C",
      imageUrl: "",
    },
  ],
  cardType: "character",
  color: ["purple"],
  rarity: "C",
  setId: "OP18",
  cost: 5,
  power: 7000,
  counter: 1000,
  traits: ["Water Seven Navy"],
  attribute: "slash",
  i18n: op18TBone073I18n,
};
