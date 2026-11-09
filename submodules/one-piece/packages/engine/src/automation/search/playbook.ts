/**
 * Per-deck playbooks: the play settings the bots learned for each leader (how hard to push the leader,
 * when to counter or block, DON!! kept for counters, mulligan rules). Trained by train-play.ts and
 * stored in nightly/playbook.json. No file I/O here so the browser can use it too.
 */
import { BALANCED_POLICY, AGGRESSIVE_POLICY, createHeuristicAgent, type HeuristicPolicy } from "../heuristic-strategy.ts";
import type { OnePieceBotAgent } from "../bot-strategies.ts";

export type PlayPolicy = Partial<Omit<HeuristicPolicy, "style">> & { style?: "balanced" | "aggressive" };
export interface PlaybookEntry { policy: PlayPolicy; gain: number; games: number; updated: string; history?: Array<{ date: string; gain: number }> }
export type Playbook = Record<string, PlaybookEntry>;

let PB: Playbook = {};
const cache = new Map<string, OnePieceBotAgent>();
export function setPlaybook(pb: Playbook | null | undefined) { PB = pb ?? {}; cache.clear(); }
export function getPlaybook(): Playbook { return PB; }

export function policyFor(leader: string | undefined, override?: PlayPolicy | null): HeuristicPolicy {
  const learned = (leader && PB[leader]?.policy) || {};
  const p = { ...learned, ...(override ?? {}) };
  const base = p.style === "aggressive" ? AGGRESSIVE_POLICY : BALANCED_POLICY;
  return { ...base, ...p } as HeuristicPolicy;
}

/** Heuristic bot using this leader's playbook (or an explicit override while training). */
export function agentFor(leader: string | undefined, override?: PlayPolicy | null): OnePieceBotAgent {
  const key = `${leader ?? "-"}|${override ? JSON.stringify(override) : ""}|${leader && PB[leader] ? JSON.stringify(PB[leader].policy) : ""}`;
  let a = cache.get(key);
  if (!a) { a = createHeuristicAgent(`pb-${leader ?? "base"}`, policyFor(leader, override)); cache.set(key, a); }
  return a;
}

/** Settings the trainer is allowed to change, with sensible ranges. */
export const KNOBS: Array<{ k: keyof HeuristicPolicy | "style"; kind: "num" | "int" | "bool" | "style"; min?: number; max?: number; step?: number; label: string }> = [
  { k: "style", kind: "style", label: "overall style" },
  { k: "leaderAttackBias", kind: "num", min: 0.5, max: 1.8, step: 0.15, label: "pressure on the leader" },
  { k: "characterAttackBias", kind: "num", min: 0.4, max: 1.6, step: 0.15, label: "attacking characters" },
  { k: "rushPlayBonus", kind: "int", min: 0, max: 220, step: 30, label: "playing Rush characters" },
  { k: "blockerPlayBonus", kind: "int", min: 0, max: 140, step: 20, label: "playing Blockers" },
  { k: "counterDonReserveCap", kind: "int", min: 0, max: 3, step: 1, label: "DON!! kept for Counter Events" },
  { k: "counterWorthLife", kind: "int", min: 1, max: 5, step: 1, label: "life when it starts countering" },
  { k: "blockLowLife", kind: "int", min: 0, max: 4, step: 1, label: "life when it starts blocking" },
  { k: "aggressiveBlocking", kind: "bool", label: "blocks freely" },
  { k: "preferLeaderPressure", kind: "bool", label: "goes face over trading" },
  { k: "mulliganMaxCost", kind: "int", min: 2, max: 5, step: 1, label: "cheapest card it wants in the opening hand" },
  { k: "mulliganHeavyCards", kind: "int", min: 2, max: 5, step: 1, label: "big cards that force a mulligan" },
  { k: "firstPlayerCheapThreshold", kind: "int", min: 1, max: 4, step: 1, label: "choosing to go first" },
];

export function mutatePolicy(p: PlayPolicy, random: () => number): PlayPolicy {
  const out: any = { ...p };
  const n = 1 + Math.floor(random() * 3);
  for (let i = 0; i < n; i++) {
    const knob = KNOBS[Math.floor(random() * KNOBS.length)]!;
    const cur: any = policyFor(undefined, out)[knob.k as keyof HeuristicPolicy] ?? (knob.k === "style" ? out.style : undefined);
    if (knob.kind === "style") out.style = (out.style ?? "balanced") === "balanced" ? "aggressive" : "balanced";
    else if (knob.kind === "bool") out[knob.k] = !cur;
    else {
      const v = Number(cur) + (random() < 0.5 ? -1 : 1) * (knob.step ?? 1) * (1 + Math.floor(random() * 2));
      const c = Math.max(knob.min!, Math.min(knob.max!, v));
      out[knob.k] = knob.kind === "int" ? Math.round(c) : Math.round(c * 100) / 100;
    }
  }
  return out;
}

/** Plain-English description of what a playbook changed from the default. */
export function describePolicy(p: PlayPolicy): string[] {
  const base: any = BALANCED_POLICY, pol: any = policyFor(undefined, p), out: string[] = [];
  if (p.style === "aggressive") out.push("plays aggressively");
  for (const knob of KNOBS) {
    if (knob.k === "style" || !(knob.k in p)) continue;
    const a = base[knob.k], b = pol[knob.k];
    if (a === b) continue;
    if (knob.kind === "bool") out.push(`${b ? "" : "doesn't "}${knob.label}`.trim());
    else out.push(`${knob.label}: ${b > a ? "more" : "less"} (${a} → ${b})`);
  }
  return out;
}
