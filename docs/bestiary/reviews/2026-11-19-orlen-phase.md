# B012: Orlen's half-HP phase warning

Date: 2026-11-19. Entry: Archbishop Orlen. Category: enemy AI telegraph.

## Source and reconciliation

- Default: `ccr-d8829a5a-ays4x1`, commit `b5d0e9f9ac45c21b2acf28784d75fd977d35eb91`.
- Tracker: PR35 head `75795e55a915aafce48f38ff181b5a1e05bb3cff`, generation 2 revision 11. It supersedes default generation 1 revision 5 and PR29/PR32 revisions 7/9. All task history is retained.
- Open PRs 29 through 37 checked. Party-art work does not overlap Orlen. No existing PR implements B012.
- Branch: `bestiary/2026-11-19-orlen-phase-warning`, created from the current default, not from an unmerged bestiary branch.
- Delivery: prepared for a draft PR; commit and PR identifiers will be recorded after creation.

Read repository instructions, current design/status/style/glossary, boss-authoring instructions, the live Orlen reference and script. There is no standalone `docs/bosses/orlen.md`. Chapter 19's Protect/Shell difference is an existing documented design question and remains unchanged. Inspected the installed Orlen sheet, atlas geometry, rig/clip definitions and lore; no raster or rig changes are part of this refinement.

## Defect and fix

At 1775/3550 HP, Orlen can still hold a p1 Sermon plan targeting Kiri. The old preview says `Next: Sermon → Kiri`. With RNG fixed to `.99`, `execScripted` enters p2, replans because the phase is free, and executes Crozier. The regression failed against the original code with that stale preview; a separate live-script run confirmed `last=crozier` and `phase=p2`.

His turn-order label now reads `Phase change`, and his card/Scan preview reads `Next: Phase change → action will be chosen when it acts` while an established phase differs from the current HP phase. The preview reads current state without consuming RNG or mutating combat. Once the phase is established, the normal skill name and target return. Sleep still takes precedence.

The existing custom preview hooks now accept `null` to use the ordinary stored-plan formatter. This keeps normal and empty-plan behavior intact without copying target formatting into Orlen. Only Orlen opts into the new fallback. Other custom hooks retain their existing behavior.

The design precedent is FFX's readable CTB threat display: an unresolved action should be disclosed before the player's choice. This patch preserves the existing execution-time phase replan and explicitly warns about it. It does not change the documented combat rules or claim the replacement attack is known in advance. Counter-Melody, Overdrive, Organ repair/rebuild, damage, Stress, probabilities and timing are unchanged.

## Verification

- `node tools/bestiary-check/orlen-phase.js`: 14 boundary, counterplay and skill-preview cases pass, plus sleep, empty-plan and preview-purity assertions. Covers just above, exactly at and below half HP; established p2; Crozier, Requiem, Lament and Benediction rule priorities; all five ordinary skill previews.
- `tools/check.sh`: passes data checks, prior Tongue regressions, the Orlen regression, reference freshness, animation continuity/authoring/parity, and five simulated battles for each of 37 encounters. Two pre-existing drift warnings and 16 attachment review notices remain.
- `node tools/data-export/export.js`: regenerated reference, with no diff. No data or balance baseline change was needed.
- `git diff --check`: passes.
- [Seeded simulation evidence](2026-11-19-orlen-simulations.json): all before/after fields match over 100 advisor, 100 attack and 100 random battles. Results below are measurements, not a new balance target.

| Policy | Battles before / after | Win rate before / after | Party commands before / after |
| --- | --- | --- | --- |
| advisor | 100 / 100 | 99% / 99% | 65.48 / 65.48 |
| attack | 100 / 100 | 3% / 3% | 32.65 / 32.65 |
| random | 100 / 100 | 48% / 48% | 90.96 / 90.96 |

## Limits and integration

Chromium aborts before loading a page with `socket() Operation not permitted`. No browser layout, normal/slow playback or art approval is claimed. This PR is draft until the warning is observed in the turn order, card and Scan at the half-HP boundary, with normal previews returning afterward. B008's ancestor-chain visual review remains blocked independently.

PR35 also edits `planName` and `planText` to support Tongue's `previewPlan`. Its implementation is not imported here. If both branches are integrated, retain the nullable custom-hook fallback before PR35's preview-plan selection. Do not replace either path with the other. No PR has been merged or auto-merge enabled by this run.

## Queue refresh

B012's implementation exhausted generation 2's actionable pending work. The [fresh audit](2026-11-19-audit.json) re-enumerated all 45 enemy records, 37 encounters, 22 rigs, 88 clips and six battle integrations and reviewed all five categories. No new visual defect was inferred from attachment warnings. Generation 3 retains the prior blocked and delivery history and adds one pending task, B013: Ruri still promises Jealousy after copy losses trigger the crowd truce or leave her alone, then executes Slap. That defect was reproduced in the actual script; Ruri implementation is deferred to the next run.
