import { applyCommand, getLegalCommands } from "../../core.ts";
import type { EngineCommand, MatchSeat, MatchState } from "../../types.ts";
import type { OnePieceBotAgent, OnePieceBotDecisionContext } from "../bot-strategies.ts";
import { resolveBotPromptCommand } from "../bot-harness.ts";

/** Strip append-only history so state copies stay cheap during search. */
export function slim(state: MatchState): MatchState {
  const s = state as any;
  return { ...s, logHistory: [], commandHistory: [], eventHistory: [] } as MatchState;
}

/** One decision for whoever must act now (prompt owner, setup actor, or active seat). */
export function nextCommand(
  state: MatchState,
  agents: Record<MatchSeat, OnePieceBotAgent>,
  ctx: OnePieceBotDecisionContext,
): { seat: MatchSeat | "judge"; command: EngineCommand | null } {
  const prompt = state.promptQueue.find((p) => p.status === "pending");
  if (prompt) {
    if (prompt.kind !== "judge" && (prompt.seat === "north" || prompt.seat === "south") &&
        prompt.resolutionContext?.intent !== "loopIterations") {
      const r = agents[prompt.seat].resolvePrompt?.(state, prompt, ctx);
      if (r) return { seat: prompt.seat, command: r };
    }
    return { seat: (prompt.seat as MatchSeat) ?? "judge", command: resolveBotPromptCommand(state, prompt) };
  }
  const legal = (state.status === "setup"
    ? [...getLegalCommands(state, "south"), ...getLegalCommands(state, "north")]
    : getLegalCommands(state)).filter((d) => d.type !== "concede");
  const setupActor = legal.map((d) => d.seat).find((s): s is MatchSeat => s === "south" || s === "north");
  const seat = state.status === "setup" && setupActor ? setupActor : state.activeSeat;
  const mine = legal.filter((c) => c.seat === seat);
  if (mine.length === 0) return { seat, command: null };
  const chosen = agents[seat].choose(state, seat, mine, ctx);
  if (chosen) return { seat, command: chosen };
  if (mine.some((c) => c.type === "endTurn")) return { seat, command: { type: "endTurn", seat } as EngineCommand };
  return { seat, command: null };
}

/** Play forward until game end, a turn limit, or a command budget. */
export function playOut(
  state: MatchState,
  agents: Record<MatchSeat, OnePieceBotAgent>,
  ctx: OnePieceBotDecisionContext,
  opts: { maxCommands: number; stopAtTurn?: number },
): { state: MatchState; commands: number; broken: boolean } {
  let s = state;
  for (let i = 0; i < opts.maxCommands; i++) {
    if (s.status === "finished") return { state: s, commands: i, broken: false };
    if (opts.stopAtTurn !== undefined && s.turnNumber >= opts.stopAtTurn) return { state: s, commands: i, broken: false };
    const { command } = nextCommand(s, agents, ctx);
    if (!command) return { state: s, commands: i, broken: true };
    const r = applyCommand(s, command);
    if (!r.accepted) return { state: s, commands: i, broken: true };
    s = r.state;
  }
  return { state: s, commands: opts.maxCommands, broken: false };
}
