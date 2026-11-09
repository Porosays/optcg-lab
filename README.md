# OPTCG Lab

Automated One Piece Card Game research: bots play each other thousands of
times to measure how every deck does against every other deck.

**Status:** early. Test decks only; real meta decks next.

## How it works

- **Rules engine:** the open-source One Piece engine from
  [TheCardGoat/tcg-engines](https://github.com/TheCardGoat/tcg-engines) (MIT),
  vendored under `submodules/`. About 2,800 cards with coded effects.
- **Look-ahead bot** (`.../automation/search/search-agent.ts`): before each
  move it reshuffles everything it can't see (opponent hand/deck/life), plays
  each option forward through the opponent's reply, and keeps the move that
  wins most often. It never peeks at hidden cards.
- **Fast engine path** (`fast-apply.ts`): same rules code without patch
  tracking or validation, about 5x faster; checked move-for-move against the
  official engine (`equiv.ts`).
- **Grid runner:** splits games across cores (`run-grid.ts`) and GitHub
  Actions jobs, then merges results into a win-rate grid (`aggregate.ts`).

## Run it

Locally (needs Node 22+, pnpm 10, Bun):

```bash
cd submodules/one-piece && CI=1 pnpm install --frozen-lockfile
cd packages/engine/src/automation/search
bun run-grid.ts --decks=decks/test-decks.json --games=20 --bot=fast --dir=out
bun aggregate.ts --decks=decks/test-decks.json --dir=out
```

On GitHub, open **Actions** and pick one:

- **Test my deck:** paste a list in OPTCGSim format (`1xOP01-001 4xOP01-016 ...`).
  You get win rates against each deck in the field, going first vs second,
  per-card stats (how often each card gets played, win-rate lift, how often
  it is stuck in hand in losses) and tested one-card swap ideas.
- **Find decks:** bots build decks for every leader from the full card pool
  (old sets included), evolve them with one-card swaps, ratio tweaks and
  old-card injections, and keep the best deck in each style bucket. The
  report ranks the decks, lists the cards that lift decks most, and prints
  lists ready to paste into OPTCGSim.
- **Matchup grid:** every deck in a deck file against every other.

Results show on the run's summary page and as downloadable artifacts.

Known bot limit: the bots rarely cast [Counter] Events on defense, so
event-heavy lists are underrated for now.

## Caveats

Results are only as good as the bots and the card implementations. The
engine's own audit notes that not every card clause is proven yet.

## License

Engine code © TheCardGoat, MIT (see `LICENSE-tcg-engines`). Not affiliated
with Bandai. One Piece Card Game is a trademark of its owners.
