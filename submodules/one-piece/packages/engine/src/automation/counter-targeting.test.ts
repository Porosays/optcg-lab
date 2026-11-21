import { expect, test } from "vite-plus/test";
import { OnePieceTestEngine } from "../index.ts";
import { applyCommand } from "../core.ts";
import type { OnePieceBotAgent } from "./bot-strategies.ts";
import { aggressiveAgent, heuristicAgent } from "./heuristic-strategy.ts";
import { nextCommand } from "./search/fast-play.ts";

function finishDefense(engine: OnePieceTestEngine, agent: OnePieceBotAgent) {
  let state = engine.getState();
  for (let i = 0; i < 12 && state.battle && state.status !== "finished"; i++) {
    const { command } = nextCommand(state, { south: agent, north: agent }, { random: () => 0.5 });
    expect(command).not.toBeNull();
    const result = applyCommand(state, command!);
    expect(result.accepted).toBe(true);
    state = result.state;
  }
  expect(state.battle).toBeNull();
  return state;
}

test.each([heuristicAgent, aggressiveAgent])(
  "$id uses Guard Point on the attacked Leader, not a stronger uninvolved Character (7-1-3-1-2)",
  (agent) => {
    const e = OnePieceTestEngine.create(
      {
        leaderCardId: "ST01-001",
        hand: ["ST01-014"],
        activeDon: 1,
        life: 0,
        character: [{ cardId: "ST01-012", playedOnTurn: 0 }],
      },
      {
        leaderCardId: "ST01-001",
        character: [{ cardId: "ST02-002", playedOnTurn: 0, attachedDon: 1 }],
      },
      { activeSeat: "north" },
    );
    e.asNorth().attack(e.findCardInZone("north", "character", "ST02-002"), e.leader("south"));
    e.pendingDecision("battleCounter", "south");
    const state = finishDefense(e, agent);
    expect(state.winner).toBeNull();
    expect(state.players.south.hand).toHaveLength(0);
    expect(state.players.south.activeDon).toBe(0);
    expect(state.players.south.trash.map((id) => state.cards[id]!.cardId)).toContain("ST01-014");
  },
);

test.each([heuristicAgent, aggressiveAgent])(
  "$id protects the attacked Character rather than a stronger ally",
  (agent) => {
    const e = OnePieceTestEngine.create(
      {
        leaderCardId: "ST01-001",
        hand: ["ST01-014"],
        activeDon: 1,
        character: [
          { cardId: "ST01-010", rested: true, playedOnTurn: 0 },
          { cardId: "OP01-120", playedOnTurn: 0 },
        ],
      },
      {
        leaderCardId: "ST01-001",
        character: [{ cardId: "ST02-002", playedOnTurn: 0, attachedDon: 1 }],
      },
      { activeSeat: "north" },
    );
    const target = e.findCardInZone("south", "character", "ST01-010");
    e.asNorth().attack(e.findCardInZone("north", "character", "ST02-002"), target);
    const state = finishDefense(e, agent);
    expect(state.cards[target]!.zone).toBe("character");
    expect(state.players.south.hand).toHaveLength(0);
  },
);

test.each([heuristicAgent, aggressiveAgent])(
  "$id uses power-reduction Counters on the attacker, not an unrelated threat",
  (agent) => {
    const e = OnePieceTestEngine.create(
      { leaderCardId: "ST01-001", hand: ["OP01-028"], activeDon: 1, life: 0 },
      {
        leaderCardId: "ST01-001",
        character: [
          { cardId: "ST02-002", playedOnTurn: 0, attachedDon: 1 },
          { cardId: "OP01-120", playedOnTurn: 0 },
        ],
      },
      { activeSeat: "north" },
    );
    e.asNorth().attack(e.findCardInZone("north", "character", "ST02-002"), e.leader("south"));
    const state = finishDefense(e, agent);
    expect(state.winner).toBeNull();
    expect(state.players.south.hand).toHaveLength(0);
  },
);
