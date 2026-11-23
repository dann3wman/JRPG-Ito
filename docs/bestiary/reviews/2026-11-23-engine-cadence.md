# B016: Engine Resonance cadence

Date: 2026-11-23. Entry: Resonance Engine Mk. IV. Branch: `bestiary/2026-11-23-engine-resonance-cadence`.

## Source and reconciliation

Current default `ccr-d8829a5a-ays4x1`, commit `b5d0e9f9ac45c21b2acf28784d75fd977d35eb91`. PR47 head `64ae716096af3892a939bcaa6d6ebc4483ba6495` supplies the latest tracker, generation 6 revision 19. Compared default revision 5 and bestiary PR29/32/35/38/41/44/47 revisions 7/9/11/13/15/17/19. Inspected open PR29-49, including overlapping party-art and battle-animation work. Preserve all delivered and blocked task history.

Related Engine warning hooks and nullable preview support come from PR44 head `cbabb2a28f298a0f1a7a1ac5993186b180adc9fe`. This reuse keeps the new cadence change self-contained and honest at the phase boundary. B014 is already delivered and is not counted again. No unrelated entry implementation was imported. On integration retain PR35's `previewPlan` fallback alongside the nullable hooks. Queue source conflicts are resolved in favor of PR47, not the older default tracker.

## Reproduction and correction

With `count=1`, phase p1, half HP and a stored Stomp, the live script executed Resonance on turn 2. The new regression failed before editing. `execScripted` increments count before the free phase gate; `planNext` then used count+1. The phase gate borrowed the following turn's periodic action.

Engine now opts into `planOnPhase:e=>planNext(e,e.count)`. The planner accepts an explicit action count while ordinary calls keep their next-turn default. Other entries retain existing behavior. This follows the established FFX-style CTB lesson: players should be able to reason about when the threat arrives. No documented design was changed.

The Engine's pending phase transition uses PR44's uncertainty warning, then ordinary previews resume. No stats, 55/45 odds, rank delays, Sound rules or overclock reduction changed. No raster, atlas, rig, animation or lore change was needed; the Engine has no installed dedicated sheet or battle rig mapping.

## Validation

- Live regression: 39 phase, probability-boundary and HP-boundary cases through turns 1-9; sleep skips the action counter; Delay/Break and Counter-Melody still work; overclock subtracts exactly two slots; preview consumes no RNG or state; unrelated Organ planning keeps the next-turn default.
- Simulator: 200 battles per policy before and after, seed 1. [Complete summaries](2026-11-23-engine-simulations.json). No timeouts or stalls.
- Helper: 100% wins both; winning commands 37.63 → 37.315. Attack: 1.5% → 2%. Random: 80.5% → 82.5%.
- Helper end Stress rises 8.70 → 23.42 and Lost Turns 0.355 → 1.055. Correct cadence has a measured effect even without changed stats. These seeded differences are not significance claims; the existing Helper win-rate and Afflicted target issues remain.
- Generated a fresh Engine baseline with `node tools/battle-sim/sim.js engine --write-baseline -n 200`, preserving every unrelated baseline entry. Regenerated `docs/reference/game-data.md` through its generator.
- `tools/check.sh` passes: data checks, bestiary regressions, generated-reference freshness, animation continuity/authoring/parity and five seeded battles for each of 37 encounters. Two previously documented drift warnings and 16 attachment notices remain.
- Chromium startup attempted directly and aborted with `socket() failed: Operation not permitted`. Browser play, narrow-layout warning review and art/playback approval are not claimed.

## Queue refresh and delivery

Fresh inventory covers all five categories, 45 foes, 37 encounters, 22 rigs, 88 clips and six battle mappings. [Audit and next defect reproduction](2026-11-23-audit.json). B017 queues the independently reproduced Whisperer turn-2 Read Aloud defect. No Whisperer code was changed. One actionable pending task remains, with six retained blockers.

Implementation commit and PR URL: pending publication. Delivery must remain a draft until browser verification and review of the measured impact. No merge or deployment is authorized.
