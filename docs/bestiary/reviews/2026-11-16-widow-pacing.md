# B003: Tide-Widow pacing refinement

Date: 2026-11-16. Status: implemented, pending balance and browser review. Not merged or fully accepted.

## Source and queue reconciliation

- Default branch: `ccr-d8829a5a-ays4x1`, commit `5fbc8b8c6e3366196eda437e0296ef1ff3ec71bf`.
- Default queue: generation 1, revision 3. Latest queue: generation 1, revision 5 from PR26 head `5b092018156124abd7737168726ee1fa381a2ba9` (`bestiary/2026-11-15-tongue-grab-count`). Only its tracker state is carried forward, not its unmerged Tongue implementation.
- PR22 is merged on the default branch. B001 still lacks visual acceptance. PR26 remains draft; B002 is delivered pending visual review, not pending implementation.
- Open PRs 14–21 and 23–28 were inspected for overlap. They cover party art/specifications, action previews, and B002. PR27's Kuro fringe and PR28's Tetsugi Chakra assets do not modify this encounter. No later bestiary tracker supersedes revision 5.
- This update is generation 1, revision 6, with delivery metadata added in revision 7. Six independent pending tasks remain (B004–B009); B010 and B011 retain their blockers.

## Defect and concrete change

The chapter-five encounter lasted 83.63 winning party commands in a fresh 300-run Helper sample, beyond the Disc 1 ceiling of 60. Reducing HP alone to the spec's proposed 2300 reached 59.17 commands but dropped Afflicted to 0.16, below the 0.5–2 general target.

The final draft changes Tide-Widow HP 3200 → 2225 and its phase-two Lullaby +14 → +28 Stress. Phase 1 stays at +14. This takes the spec's existing suggestion to strengthen phase-two Stress after measuring the HP-first tradeoff. The phase label announces the stronger song, and Scan, the boss spec, design doc and generated reference state its exact effect. ATK, DEF, Speed, action weights, recovery ranks, Undertow and Sailor rules are unchanged. No art, rig, animation or lore asset is modified.

The precedent is Final Fantasy's teaching phase followed by a stronger repeat. The player reaches the body-opening reveal sooner, but the song becomes more costly once the drowned emerge. This is a pacing improvement, not a claim that every fight-design issue is solved.

## Results

300 battles per row and side, deterministic seed 1, real game loop through `tools/lib/load-game.js`. Commands count winning fights; Afflicted and KOs average all fights. Fallback uses Kiri, Tetsugi, Kugai with advisor. Every sample completed without timeouts or stalls.

| Policy | Win before → after | Winning commands | Afflicted / battle | KOs / battle |
| --- | --- | --- | --- | --- |
| advisor | 100.0% → 100.0% | 83.63 → 59.76 | 1.64 → 0.62 | 0.08 → 0.03 |
| attack | 6.0% → 27.0% | 70.33 → 53.96 | 1.70 → 1.79 | 2.89 → 2.46 |
| random | 45.0% → 84.0% | 143.98 → 114.73 | 8.44 → 8.29 | 3.33 → 1.92 |
| fallback | 100.0% → 100.0% | 62.37 → 44.29 | 1.04 → 0.64 | 0.10 → 0.04 |

All candidate summaries are preserved in [the evidence JSON](2026-11-16-widow-pacing.json). Rejected trials: HP-only 2300 erased too much Stress; 2300/+24 phase-two Stress still took 62.96 commands in 100 runs; 2100/+28 raised Attack-only wins to 32.67%. The final 2225/+28 draft restores 0.62 Afflicted while meeting the command band.

Acceptance conflict is explicit: the queue's HP-first, one-lever approach did not satisfy both pacing and Stress. A second lever was taken from the boss spec's existing phase-two proposal. The final candidate still has 27% Attack-only wins against the ≤25% goal. It is not fully accepted. The old spec's suggested >1 Afflicted also remains unmet; the draft uses the general 0.5–2 band as its provisional pacing tradeoff. Random play becomes more forgiving (45% → 84% wins), and the no-Natsu fallback stays faster, so Natsu is still not required. Further retuning should follow browser play, rather than optimizing only this seed corpus.

## Verification

- Added `tools/bestiary-check/widow-pacing.js` to `tools/check.sh`. It executes the live script, testing both Lullaby strengths, visible plan text, sound immunity, Counter-Melody cancellation, Earplugs, Undertow's late target and Blink, half-HP Release using the turn, and three-turn Sailor respawn.
- `tools/check.sh` passed: data validation, both live-script regressions, generated-reference freshness, animation continuity/authoring/parity and five simulations for each of 37 encounters. Existing two documented drift warnings and 16 art-review notices remain. `git diff --check` passed. [Raw check output](2026-11-16-widow-checks.txt).
- Refreshed Widow with `sim.js widow -n 200 --write-baseline --json`: 100% wins, 59.86 commands, 0.645 Afflicted. Merged only the Widow result back into the baseline; all 36 unrelated encounter records are byte-for-byte equivalent as parsed JSON. Regenerated `docs/reference/game-data.md` with its generator.
- Browser attempt: `chromium --headless --no-sandbox --disable-dev-shm-usage --dump-dom about:blank` exits 134 with `socket() failed: Operation not permitted`. No browser play, warning layout approval or visual acceptance is claimed.
- Independent holdout: `sim.js widow -n 300 --policy attack --seed 1001 --json` gives 23.67% wins, no timeouts/stalls. Across both attack samples, 152/600 wins (25.33%). The first sample still misses the stated target; no claim of proven ≤25% probability or full balance approval.

## Delivery

Branch: `bestiary/2026-11-16-widow-pacing`, created from the current default.

Implementation commit: to be recorded after publishing.

PR: to be recorded after publishing. Keep draft until the balance tradeoff and browser checks are reviewed. Do not merge automatically.

Next independent task: B004, inspect and integrate Lamp Hollow's existing battle rig if its art and playback validate.
