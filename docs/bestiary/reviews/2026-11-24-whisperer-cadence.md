# B017: The Whisperer cadence

Date: 2026-11-24. Branch: `bestiary/2026-11-24-whisperer-cadence`. Default `ccr-d8829a5a-ays4x1` at `b5d0e9f9ac45c21b2acf28784d75fd977d35eb91`. Latest queue PR50 head `17ff9a5ed29734bc2ffab5006ef0a25cf58fe23d`, generation7 revision21. All default and bestiary queue heads compared; open PR29-52 inspected. No overlapping Whisperer implementation found. Prior delivery and blocker history preserved.

## Defect and fix

At count1, p1, 950 HP, stored Whisper, the real script used Read Aloud on turn2. Regression failed before editing. Free phase entry called next-turn planning after incrementing count. Whisperer now supplies `planOnPhase:e=>planNext(e,e.count)`. Shared support matches PR50 but no Engine implementation or other unmerged entry code is copied. On integration preserve both entry hooks.

This restores documented turns3/6/9 and the existing deterministic preview, following FFX-style readable CTB timing. No new uncertainty label is necessary. Stats, whisper odds, target selection and standing-behind behavior are preserved. Viewer sheet, geometry, nine-bone rig, four clips and lore inspected; no art changed or animation approval claimed.

## Validation

27 cadence/HP cases through turns1-9 pass, plus preview state/RNG purity, sleep, Counter-Melody, actual Swap exposure, both whisper outcomes, Silence and unrelated Organ planning. 200 battles per policy before/after, seed1:

| Policy | Wins before → after | Winning commands before → after | Afflicted before → after |
| --- | --- | --- | --- |
| advisor | 95.5% → 99.5% | 62.98 → 61.79 | 0.565 → 0.140 |
| attack | 9.5% → 2% | 137.58 → 133.25 | 8.585 → 8.830 |
| random | 5.5% → 6% | 172.45 → 152.83 | 8.910 → 8.775 |

Complete results: [simulations](2026-11-24-whisperer-simulations.json). No claim of statistical significance. Helper win rate remains too high and Afflicted too low relative to targets; correctness does not equal full balance acceptance. Whisperer-only baseline generated with `--write-baseline -n 200`, unrelated entries preserved. Reference regenerated through its generator.

`tools/check.sh` passed, including all 37 encounter smoke runs, data/reference and animation authoring/continuity/parity checks. Two documented drift warnings and 16 attachment notices remain. Chromium fresh startup aborted with `socket() Operation not permitted`; browser play remains unverified. Draft required.

## Queue and delivery

Fresh five-category audit retains all blockers and queues B018: Taste of Ostrel phase-entry warning. Its stored Village Note is replaced by Kiri Lullaby at half HP; above-half control executes Village Note. No Taste code changed. One actionable task remains.

Implementation commit and PR: pending publication. No merge or deployment.

Timeouts at the simulator turn cap, before → after: Helper 4.5% → 0.5%, Attack 88% → 94.5%, random 86.5% → 88.5%; zero stalls. Low win rates here mostly mean timeouts, not party defeat. This remains a balance limitation.
