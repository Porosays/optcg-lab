# Simulation integrity fixes (2026-11-10)

Base: `4ad5a82a55b3fc33c4727ce9ad0347b6a1f88bcb`.

## Changes

- Defensive power-increasing Counter effects prioritize the attacked Leader or Character among legal targets, rather than the strongest unrelated unit. Power-reducing effects are recognized as harmful to the opponent and prioritize the attacker. Six real-command regression cases cover both heuristic policies, Leader defense, Character defense, and Green Star Rafflesia. The cases failed before the bot change and passed afterward.
- Finder output is checkpointed before work, after the initial population, after each completed generation, and after confirmation. Atomic snapshots include their learned knowledge so interrupted companion-file updates cannot mix generations. A currently running batch is not resumable and its unfinished games are not retained.
- Reports distinguish discovery selection from fresh-seed confirmation, show confirmation sample sizes and intervals, disclose partial/missing/skipped shards, and label learned counts as participant observations. Old-card and association labels no longer imply a majority or causality. The manual workflow uploads `found-summary.json`.
- Restored omitted upstream `typescript-config/base.json` and `node.json`, required by the vendored engine-core, bot-core, card-model and protocol tsconfigs. Before this restoration, standard engine tests failed during transformation, before running tests.

Upstream configuration sources:
- https://github.com/TheCardGoat/tcg-engines/blob/main/submodules/agnostic-simulator/packages/typescript-config/base.json
- https://github.com/TheCardGoat/tcg-engines/blob/main/submodules/agnostic-simulator/packages/typescript-config/node.json

## Verification

Environment: Windows, Node 26.13.0, Bun 1.4.4, pinned pnpm 10.33.0 dependencies installed with `CI=1` and `--frozen-lockfile`.

From `submodules/one-piece/packages/engine`:

- Final focused Counter, sequencing, scoring, output, and loop-regression tests: 28 passed across five files after formatting the added tests.
- Full `vp test run --maxWorkers=2`: 12,316 passed, 6 failed, 3 skipped, across 2,775 test files. All added tests passed. This is not a clean full-suite result.
- Changed-file `vp lint`: passed.
- `tsc --noEmit --pretty false`: 10 errors, all reported in unchanged source files. These include missing protocol/Bun/browser types, a card action type mismatch, search-agent power typing, and an incomplete effect-trigger map.
- `vp check`: stops on formatting differences in 2,898 files. No repository-wide reformat was performed.
- `git diff --check`: passed.
- Six bounded real-engine fast-bot matches (RG Luffy, Rocks/Xebec, Enel versus Luffy & Ace, each in both starting positions): completed with a winner and `broken=false` in all six. These are smoke tests, not matchup evidence.
- The already-landed Rocks/Xebec builder fix produced legal lists for all eight deterministic seeds checked. This branch does not claim that earlier fix as a new change.

Full-suite failures:

1. `tests/card-coverage.test.ts`: printed activation headings without executable effect blocks (22 catalog entries).
2. `tests/cards/behavior-coverage-gate.test.ts`: 167 ability cards lack a command-driven behavior proof.
3. `tests/cards/grade-a-coverage.test.ts`: missing or insufficient primary behavior proofs.
4. `tests/cards/vanilla-character-catalog.test.ts`: inventory omits 13 current vanilla cards.
5. `tests/rules/02-card-information.test.ts`: OP18-065 has no attribute.
6. `tests/rules/11-cost-cache-loop.test.ts`: `own-finite` child process exceeded its 8-second timeout in the full run.

The five catalog/coverage failures concern unchanged card data, inventories and proofs. The timeout case and all six neighboring loop tests passed on the final focused rerun. It was not reproduced outside the broad run.

## Limits

No broad search, GitHub Actions dispatch, deployment, or ranking validation was performed. Card completeness, all Event-specific conditions/costs, pilot quality and fair OP18 opposition still require work. Checkpoints preserve completed generations rather than streaming individual matches. Existing knowledge metrics remain observational and do not establish causal card strength.
