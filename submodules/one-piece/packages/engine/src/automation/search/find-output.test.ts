import { test, expect, vi, beforeEach, afterEach } from "vite-plus/test";
import { mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

// Install mocks only while a test runs; the repository uses isolate:false.
let child = 0;
let calls = 0;
let failAt = 2;
beforeEach(() => {
  vi.resetModules();
  child = 0;
  calls = 0;
  failAt = 2;
  vi.doMock("@tcg/op-cards", () => ({ getCard: () => ({}) }));
  vi.doMock("./decklist.ts", () => ({
    cardName: (id: string) => id,
    cost: () => 3,
    counter: () => 1000,
    deckToText: () => "test deck",
    isBlock1: () => false,
    isLegal: () => true,
    leaders: () => [],
    poolFor: (leader: string) =>
      leader === "SKIPPED" ? [] : Array.from({ length: 20 }, (_, i) => `C${i}`),
  }));
  vi.doMock("./builder.ts", () => ({
    buildDeck: (leader: string) => ({ name: "", leader, main: ["C0"] }),
    improve: (deck: any) => ({ ...deck, main: [`C${++child}`] }),
  }));
  vi.doMock("./synergy.ts", () => ({
    features: () => null,
    pairSynergy: () => ({ why: [] }),
    isOld: () => false,
  }));
  vi.doMock("./pool.ts", () => ({
    pct: (x: number) => `${Math.round(100 * x)}%`,
    wilson: () => [0, 1],
    runJobs: async (jobs: any[]) => {
      if (++calls === failAt) throw new Error("interrupted generation");
      return jobs.map((j) => ({
        aName: j.a.name,
        bName: j.b.name,
        winner: "a",
        broken: false,
        aPlayed: {},
        bPlayed: {},
      }));
    },
  }));
});

test("initial population survives interruption during first leader's evolution", async () => {
  const dir = mkdtempSync(join(tmpdir(), "find-checkpoint-test-"));
  const field = join(dir, "field.json");
  writeFileSync(field, JSON.stringify([{ name: "opponent", leader: "OTHER", main: ["C1"] }]));
  const args = process.argv;
  process.argv = [
    "bun",
    "find-decks.ts",
    `--field=${field}`,
    `--out=${dir}`,
    "--leaders=LEADER",
    "--pop=1",
    "--gens=1",
    "--games=1",
  ];
  try {
    await expect(import("./find-decks.ts")).rejects.toThrow("interrupted generation");
    const saved = JSON.parse(readFileSync(join(dir, "found-0.json"), "utf8"));
    expect(saved.elites).toHaveLength(1);
    expect(saved.progress.complete).toBe(false);
    expect(saved.progress.completedLeaders).toEqual([]);
    expect(saved.progress.activeLeader).toBe("LEADER");
    expect(saved.progress.completedGenerations).toBe(0);
    const knowledge = JSON.parse(readFileSync(join(dir, "knowledge-0.json"), "utf8"));
    expect(knowledge.games).toBe(2); // two participant observations, one match
  } finally {
    process.argv = args;
  }
});

test.each([true, false])(
  "confirmation interruption preserves generations, or completes cleanly (%s)",
  async (interrupt) => {
    vi.resetModules();
    calls = 0;
    child = 0;
    failAt = interrupt ? 3 : Infinity;
    const dir = mkdtempSync(join(tmpdir(), "find-confirm-test-"));
    const field = join(dir, "field.json");
    writeFileSync(field, JSON.stringify([{ name: "opponent", leader: "OTHER", main: ["C1"] }]));
    const args = process.argv;
    process.argv = [
      "bun",
      "find-decks.ts",
      `--field=${field}`,
      `--out=${dir}`,
      "--leaders=LEADER",
      "--pop=1",
      "--gens=1",
      "--games=1",
      "--confirm=1",
    ];
    try {
      if (interrupt)
        await expect(import("./find-decks.ts")).rejects.toThrow("interrupted generation");
      else await import("./find-decks.ts");
      const saved = JSON.parse(readFileSync(join(dir, "found-0.json"), "utf8"));
      expect(saved.elites).toHaveLength(1);
      expect(saved.progress.completedGenerations).toBe(1);
      expect(saved.progress.complete).toBe(!interrupt);
      expect(saved.progress.completedLeaders).toEqual(interrupt ? [] : ["LEADER"]);
      expect(saved.elites[0].confirmed).toEqual(interrupt ? undefined : { w: 1, g: 1 });
    } finally {
      process.argv = args;
    }
  },
);

test("skipped leaders are terminal without being counted as searched leaders", async () => {
  const dir = mkdtempSync(join(tmpdir(), "find-skip-test-"));
  const field = join(dir, "field.json");
  writeFileSync(field, "[]");
  const args = process.argv;
  process.argv = ["bun", "find-decks.ts", `--field=${field}`, `--out=${dir}`, "--leaders=SKIPPED"];
  try {
    await import("./find-decks.ts");
    const saved = JSON.parse(readFileSync(join(dir, "found-0.json"), "utf8"));
    expect(saved.progress).toMatchObject({
      complete: true,
      activeLeader: null,
      completedLeaders: [],
      skippedLeaders: ["SKIPPED"],
    });
    expect(saved.elites).toEqual([]);
    expect(saved.learnedKnowledge.games).toBe(0);
    expect(calls).toBe(0);
  } finally {
    process.argv = args;
  }
});

test("report distinguishes discovery, confirmation and participant observations", async () => {
  const dir = mkdtempSync(join(tmpdir(), "find-report-test-"));
  const elite = {
    deck: { name: "test", leader: "LEADER", main: ["C0"] },
    style: "mid",
    wr: 1,
    w: 2,
    g: 2,
    ci: [0, 1],
    vs: { opponent: 1 },
    text: "test deck",
  };
  writeFileSync(
    join(dir, "found-0.json"),
    JSON.stringify({
      field: ["opponent"],
      games: 2,
      elites: [
        { ...elite, confirmed: { w: 1, g: 4 } },
        { ...elite, style: "slow" },
        { ...elite, style: "fast", confirmed: { w: 0, g: 0 } },
      ],
      cards: [],
      progress: {
        complete: false,
        completedLeaders: [],
        activeLeader: "LEADER",
        completedGenerations: 0,
      },
    }),
  );
  writeFileSync(
    join(dir, "knowledge-0.json"),
    JSON.stringify({ version: 1, games: 4, leaders: {} }),
  );
  const args = process.argv;
  process.argv = ["bun", "find-report.ts", `--dir=${dir}`];
  try {
    await import("./find-report.ts");
    const md = readFileSync(join(dir, "found.md"), "utf8");
    expect(md).toContain("discovery win%");
    expect(md).toContain("at least 25% old cards");
    expect(md).toContain("not a controlled estimate");
    expect(md).toContain("25% (1/4)");
    expect(md).toContain("Not run");
    expect(md).toContain("No valid games");
    expect(md).toContain("4 participant observations");
    expect(md).toContain("Partial search");
    const summary = JSON.parse(readFileSync(join(dir, "found-summary.json"), "utf8"));
    expect(summary.learnedParticipantObservations).toBe(4);
    expect(summary.learnedGames).toBeUndefined();
  } finally {
    process.argv = args;
  }
});

test.each([false, true])(
  "report exposes missing shards, including an empty artifact set (%s)",
  async (empty) => {
    const dir = mkdtempSync(join(tmpdir(), "find-missing-test-"));
    if (!empty)
      writeFileSync(
        join(dir, "found-0.json"),
        JSON.stringify({
          field: [],
          games: 1,
          shard: 0,
          shards: 2,
          elites: [],
          cards: [],
          progress: { complete: true, skippedLeaders: ["SKIPPED"] },
        }),
      );
    const args = process.argv;
    process.argv = ["bun", "find-report.ts", `--dir=${dir}`, "--shards=2"];
    try {
      await import("./find-report.ts");
      const md = readFileSync(join(dir, "found.md"), "utf8");
      expect(md).toContain("Missing shard outputs:");
      if (empty) expect(md).toContain("No search shard outputs were available");
      else expect(md).toContain("Skipped leaders: SKIPPED");
      const summary = JSON.parse(readFileSync(join(dir, "found-summary.json"), "utf8"));
      expect(summary.missingShards).toEqual(empty ? [0, 1] : [1]);
    } finally {
      process.argv = args;
    }
  },
);

test("report uses atomic embedded knowledge instead of a stale companion file", async () => {
  const dir = mkdtempSync(join(tmpdir(), "find-atomic-test-"));
  writeFileSync(
    join(dir, "found-0.json"),
    JSON.stringify({
      field: [],
      games: 1,
      elites: [],
      cards: [],
      learnedKnowledge: { version: 1, games: 2, leaders: {} },
    }),
  );
  writeFileSync(
    join(dir, "knowledge-0.json"),
    JSON.stringify({ version: 1, games: 400, leaders: {} }),
  );
  const args = process.argv;
  process.argv = ["bun", "find-report.ts", `--dir=${dir}`];
  try {
    await import("./find-report.ts");
    const summary = JSON.parse(readFileSync(join(dir, "found-summary.json"), "utf8"));
    expect(summary.learnedParticipantObservations).toBe(2);
  } finally {
    process.argv = args;
  }
});

afterEach(() => {
  for (const id of ["@tcg/op-cards", "./decklist.ts", "./builder.ts", "./synergy.ts", "./pool.ts"])
    vi.doUnmock(id);
  vi.resetModules();
});
