# Browser UI release: 2026-11-10

This release publishes the tested navigation, card inspector, replay UI and multi-deck serial queue. It deliberately excludes in-progress training and experimental bot source changes.

Pages uses OPTCG_BROWSER_RELEASE=1 to copy the checked-in, checksum-verified worker.release.js artifact. It is the browser runtime already verified locally with the UI, including portable trace hashing and correct starting order. The runtime artifact is pinned separately from ongoing backend development. Default local build.py behavior still builds source. Do not refresh this artifact without an explicit runtime release and engine/browser verification.

Nightly field/results data still embeds from the production repository. Detailed custom batch results and queue are session-only. Close/reload loses them, and sleeping/background mobile browsers can suspend simulation.

Verification: 13 focused UI/scheduler tests; local browser same-leader and group-vs-group completion, enqueue while running, duplicate suppression, stop/cancel isolation, next-batch continuation, and mobile390px layout. Small QA games are not deck-strength evidence.

Runtime SHA256: 855674a900d53de35458c968a19ab78143e7aa4d7560dd607d49f882e0532885
