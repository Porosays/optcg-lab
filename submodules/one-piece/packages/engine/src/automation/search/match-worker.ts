/** CLI shard runner around play.ts. bun match-worker.ts --jobs=jobs.json --shard=0 --shards=4 --out=r.jsonl --bot=fast|deep --budget=24 */
import { existsSync as _ex, readFileSync as _rd } from "node:fs";
import { setPlaybook } from "./playbook.ts";
if (process.env.OPTCG_PLAYBOOK && _ex(process.env.OPTCG_PLAYBOOK)) setPlaybook(JSON.parse(_rd(process.env.OPTCG_PLAYBOOK, "utf8")));
import { appendFileSync, readFileSync } from "node:fs";
import { playJob, type Job } from "./play.ts";
export type { Job, GameResult } from "./play.ts";
const arg = (n: string, d?: string) => process.argv.find((x) => x.startsWith(`--${n}=`))?.slice(n.length + 3) ?? d;
if (import.meta.main) {
  const jobs: Job[] = JSON.parse(readFileSync(arg("jobs")!, "utf8"));
  const shard = Number(arg("shard", "0")), shards = Number(arg("shards", "1"));
  const bot = arg("bot", "fast")!, budget = Number(arg("budget", "24")), out = arg("out")!;
  jobs.forEach((job, n) => { if (n % shards === shard) appendFileSync(out, JSON.stringify(playJob(job, bot, budget)) + "\n"); });
}
