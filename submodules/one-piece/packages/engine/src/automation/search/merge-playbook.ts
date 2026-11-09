/** Merge trained playbook shards into the running playbook (keeps a short history per leader). bun merge-playbook.ts --dir=out --base=path --out=path */
import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
const arg = (n: string, d?: string) => process.argv.find((x) => x.startsWith(`--${n}=`))?.slice(n.length + 3) ?? d;
const dir = arg("dir", "out")!, basePath = arg("base"), outPath = arg("out", `${dir}/playbook.json`)!;
const pb: any = basePath && existsSync(basePath) ? JSON.parse(readFileSync(basePath, "utf8")) : {};
for (const f of readdirSync(dir).filter((f) => /^playbook-\d+\.json$/.test(f))) {
  for (const [leader, e] of Object.entries<any>(JSON.parse(readFileSync(`${dir}/${f}`, "utf8")))) {
    const prev = pb[leader];
    pb[leader] = { ...e, history: [...(prev?.history ?? []), { date: e.updated, gain: e.gain }].slice(-30) };
  }
}
writeFileSync(outPath, JSON.stringify(pb, null, 1));
console.log(`playbook: ${Object.keys(pb).length} decks`);
