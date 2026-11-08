/** Launch one grid-worker per core, wait, then aggregate. Same flags as grid-worker plus --workers. */
import { cpus } from "node:os";
import { mkdirSync } from "node:fs";
const arg = (n: string, d?: string) => process.argv.find((a) => a.startsWith(`--${n}=`))?.slice(n.length + 3) ?? d;
const workers = Number(arg("workers", String(cpus().length)));
const dir = arg("dir", "results")!; mkdirSync(dir, { recursive: true });
const shards = Number(arg("shards", String(workers))), base = Number(arg("shardBase", "0"));
const pass = process.argv.slice(2).filter((a) => !/^--(workers|dir|shards|shardBase)=/.test(a));
const t = Date.now();
const procs = Array.from({ length: workers }, (_, w) => Bun.spawn(["bun", new URL("./grid-worker.ts", import.meta.url).pathname,
  ...pass, `--shard=${base + w}`, `--shards=${shards}`, `--out=${dir}/shard-${base + w}.jsonl`], { stdout: "inherit", stderr: "inherit" }));
await Promise.all(procs.map((p) => p.exited));
console.log(`done: ${workers} workers, ${((Date.now() - t) / 1000).toFixed(0)}s`);
