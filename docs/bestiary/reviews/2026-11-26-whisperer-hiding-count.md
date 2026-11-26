# The Whisperer: immediate two-ally hiding

Date: 2026-11-26. Task B019. Source: `b5d0e9f9ac45c21b2acf28784d75fd977d35eb91` on `ccr-d8829a5a-ays4x1`.
Branch: `bestiary/2026-11-26-whisperer-hiding-count`. Implementation commit and PR: pending publication.

## Defect and change

At 950/1900 HP, `execScripted` ran `onTurn` before committing phase two, so `standBehind` still picked one ally. At 951 HP the same count is correct. The regression failed against original code with 1 instead of 2.

`standBehind` now reads `phaseOf(e)` from current HP. The first half-health action selects two available allies immediately. No combat stats, random draws, whisper probabilities, assets or lore change. FFX's readable state/counterplay principle applies: the escalation must obey its stated threshold and still require swapping both allies to expose her.

## Verification

- Live-script regression: 12 boundary/availability cases, actual threshold crossing, unique targets, whisper count, one/zero targets, actual Swap exposure, skipped sleeping turn, attack/stand-still and Silence odds, preview state/RNG purity.
- PR53 compatibility: both new hiding regression and existing 27-case cadence regression pass in a detached worktree at `9089f0d34e794ef933a8bbc86c9e238df07911f4` plus this fix. PR53 code is not copied into this branch. Its cadence correction remains separately delivered.
- Simulations: 200 per policy before and after, seed1, unchanged default party. [Full summaries](2026-11-26-whisperer-hiding-count-simulations.json).

| Policy | Win before → after | Commands in wins before → after | Afflicted before → after | Timeouts before → after |
| --- | --- | --- | --- | --- |
| advisor | 95.5% → 99.5% | 63.0 → 65.5 | 0.565 → 0.270 | 4.5% → 0.5% |
| attack | 9.5% → 4.0% | 137.6 → 103.6 | 8.585 → 8.660 | 88.0% → 93.0% |
| random | 5.5% → 4.5% | 172.5 → 175.4 | 8.910 → 8.770 | 86.5% → 87.0% |

Zero stalls. Low attack/random wins mostly represent the 300-command timeout, not defeat. This isolated behavior correction changes simulation outcomes; only the Whisperer baseline is refreshed with the generator's 200-run advisor output. Other baseline entries are preserved; reference regenerated through `tools/data-export/export.js`. Combined balance with PR53 has not been simulated and needs a fresh baseline upon integration.

Final repository checks: `tools/check.sh` passed, including data validation, reference freshness, focused regressions, animation continuity/parity and authoring, and five battles for every encounter. Two existing documented design drift warnings and 16 attachment notices remain. `git diff --check` passed. Initial check before this review file existed reported broken documentation links; the complete final check passed after the file was written.

## Limits and delivery

Draft required. Fresh Chromium launch fails because `/usr/lib/chromium/chromium` is missing. Browser cards, turn order and playback are not visually verified. No art approval claimed. Balance acceptance remains outstanding, especially the high attack/random timeout rates.

Whisperer's existing sheet, atlas, nine-bone rig, four clips and lore were inspected. No asset contract or canon change. The source/metadata refresh is not a full visual certification of all enemies.

## Queue reconciliation and refresh

PR56 generation9/revision25 is newest, ahead of PR53/50/47/44/41/38/35/32/29 and default revision5. Only tracker metadata is carried forward. Preserve B017 cadence and its delivery status. Review PR29-58 for overlapping work, including the recent Ren Delay Shot and Kugai Protect art. No duplicate hiding fix exists.

Generation10 follows fresh source and metadata review of all five categories. [Audit](2026-11-26-audit.json). B020 records the reproduced Face Thief target mismatch: at1400HP, preview Natsu but feature theft from Kiri; at1401HP both are Natsu. It is queued, not implemented here. One actionable item and six blockers remain.
