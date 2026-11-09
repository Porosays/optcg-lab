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

type ApplyFn = (s: MatchState, c: EngineCommand) => { accepted: boolean; state: MatchState };

/**
 * One decision plus apply, with a fallback when a prompt answer is rejected.
 * Some effects limit the total cost of what you pick (e.g. "K.O. Characters with a total cost of 4 or less");
 * the bots can pick an illegal combination there. Instead of stalling the game, try smaller picks,
 * then the engine's default answer, then each single option.
 */
export function stepSafe(
  state: MatchState,
  agents: Record<MatchSeat, OnePieceBotAgent>,
  ctx: OnePieceBotDecisionContext,
  apply: ApplyFn,
): { state: MatchState; command: EngineCommand | null; accepted: boolean; fallback: boolean } {
  const { command } = nextCommand(state, agents, ctx);
  if (!command) return { state, command: null, accepted: false, fallback: false };
  const r = apply(state, command);
  if (r.accepted) return { state: r.state, command, accepted: true, fallback: false };
  const c: any = command;
  if (c.type !== "resolvePrompt") return { state, command, accepted: false, fallback: false };
  const prompt: any = state.promptQueue.find((p: any) => p.id === c.promptId);
  const tries: EngineCommand[] = [];
  const sel: string[] = c.selectedIds ?? [];
  for (let n = sel.length - 1; n >= (prompt?.minSelections ?? 0); n--) tries.push({ ...c, selectedIds: sel.slice(0, n) });
  if (prompt) {
    const d = resolveBotPromptCommand(state, prompt);
    if (d) tries.push(d);
    for (const o of prompt.options ?? []) tries.push({ ...c, optionId: undefined, selectedIds: [o.id] });
    for (const o of prompt.options ?? []) tries.push({ ...c, selectedIds: undefined, optionId: o.id });
  }
  for (const t of tries) {
    const rr = apply(state, t);
    if (rr.accepted) return { state: rr.state, command: t, accepted: true, fallback: true };
  }
  return { state, command, accepted: false, fallback: true };
}
