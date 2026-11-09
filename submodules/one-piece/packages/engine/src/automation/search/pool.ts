/** Run a batch of jobs across N local worker processes and collect results. */
import { cpus, tmpdir } from "node:os";
import { mkdtempSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import type { GameResult, Job } from "./match-worker.ts";

export async function runJobs(jobs: Job[], opts: { bot?: string; budget?: number; workers?: number } = {}): Promise<GameResult[]> {
  if (!jobs.length) return [];
  const workers = Math.min(opts.workers ?? cpus().length, jobs.length);
  const dir = mkdtempSync(join(tmpdir(), "optcg-"));
  const jobsFile = join(dir, "jobs.json");
  writeFileSync(jobsFile, JSON.stringify(jobs));
  const worker = new URL("./match-worker.ts", import.meta.url).pathname;
  const procs = Array.from({ length: workers }, (_, w) => Bun.spawn(["bun", worker, `--jobs=${jobsFile}`, `--shard=${w}`,
    `--shards=${workers}`, `--out=${join(dir, `r${w}.jsonl`)}`, `--bot=${opts.bot ?? "fast"}`, `--budget=${opts.budget ?? 24}`],
    { stdout: "inherit", stderr: "inherit" }));
  await Promise.all(procs.map((p) => p.exited));
  const out: GameResult[] = [];
  for (let w = 0; w < workers; w++) {
    const f = join(dir, `r${w}.jsonl`);
    if (existsSync(f)) for (const l of readFileSync(f, "utf8").split("\n")) if (l) out.push(JSON.parse(l));
  }
  return out;
}

export const wilson = (w: number, g: number): [number, number] => {
  if (!g) return [0, 1]; const p = w / g, z = 1.96, d = 1 + (z * z) / g;
  const c = (p + (z * z) / (2 * g)) / d, h = (z * Math.sqrt((p * (1 - p)) / g + (z * z) / (4 * g * g))) / d;
  return [Math.max(0, c - h), Math.min(1, c + h)];
};
export const pct = (x: number) => `${Math.round(100 * x)}%`;
