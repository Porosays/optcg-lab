import { Immer } from "immer";
import type { EngineCommand, MatchState } from "../../types.ts";
import { emitEvent } from "../../shared.ts";
import {
  applyQueuedCommandMutation,
  privateChoicesForJoKenPo,
  rememberPrivateJoKenPoChoices,
} from "../../engine/commands.ts";
import { drainResolutionQueue } from "../../engine/queue.ts";

// Separate Immer instance: no patches, no auto-freeze. Search-only.
const immer = new Immer({ autoFreeze: false });

/** Same rules path as core.applyCommand, minus patches, validation and animations. */
export function fastApply(state: MatchState, command: EngineCommand): { state: MatchState; accepted: boolean } {
  let accepted = false;
  const privateContext = privateChoicesForJoKenPo(state);
  const next = immer.produce(state, (draft: MatchState) => {
    const result = applyQueuedCommandMutation(draft, command, privateContext);
    accepted = result.accepted;
    if (accepted) {
      drainResolutionQueue(draft);
      rememberPrivateJoKenPoChoices(draft, privateContext);
      emitEvent(draft, "commandAccepted", command.seat, { visibility: command.seat === "judge" ? "judge" : "public", data: { commandType: command.type } });
    }
  });
  return { state: accepted ? next : state, accepted };
}

/** Trim append-only histories; the rules never read old entries for legality. */
export function trimmed(state: MatchState): MatchState {
  const s = state as any;
  return { ...s, logHistory: [], commandHistory: [], eventHistory: s.eventHistory.slice(-50), capabilityHistory: [] };
}

/** Clone-and-mutate: no Immer proxies at all. Fastest path for search rollouts. */
export function cloneApply(state: MatchState, command: EngineCommand): { state: MatchState; accepted: boolean } {
  const draft = structuredClone(trimmed(state)) as MatchState;
  const privateContext = privateChoicesForJoKenPo(draft);
  const result = applyQueuedCommandMutation(draft, command, privateContext);
  if (!result.accepted) return { state, accepted: false };
  drainResolutionQueue(draft);
  rememberPrivateJoKenPoChoices(draft, privateContext);
  emitEvent(draft, "commandAccepted", command.seat, {
    visibility: command.seat === "judge" ? "judge" : "public",
    data: { commandType: command.type },
  });
  return { state: draft, accepted: true };
}
