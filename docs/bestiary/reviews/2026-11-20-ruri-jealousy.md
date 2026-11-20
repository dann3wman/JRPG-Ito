# B013: Ruri's invalid Jealousy preview

Date: 2026-11-20. Entry: Ruri. Category: enemy AI telegraph.

Source default: `ccr-d8829a5a-ays4x1`, `b5d0e9f9ac45c21b2acf28784d75fd977d35eb91`. Branch: `bestiary/2026-11-20-ruri-jealousy-warning`.

Delivery: [draft PR41](https://github.com/dann3wman/JRPG-Ito/pull/41), implementation commit `cfcd316c9dfd2d5c02eb326bcf86a1472a1e9404`. Delivered for review, not merged. Queue generation 4 revision 15.

## Reconciliation and scope

PR38 head `89d7e70b2130cbddfb74ad231eebc61c7d3de22e` carries generation 3 revision 13, newer than PR35 revision 11, PR32 revision 9, PR29 revision 7 and default revision 5. Preserve its entire tracker history. Open PR29-40 checked, including new Ren review and Fuyori art. No Ruri overlap exists. Only tracker metadata is imported; no other unmerged entry implementation is included.

Read the current repository instructions, design/status/style/glossary and Ruri solo/crowd specs. Ruri uses static art and has no battle rig mapping; no asset, atlas, animation or lore is changed. Her documented crowd truce and Spite remain intact.

## Defect and implementation

At the five-copy truce with two survivors, the old live preview remains `Next: Jealousy`, although the rule has become invalid and execution selects a party attack. The pre-fix regression fails on that exact text. Eight-copy crowds have the same defect at four survivors. The last surviving copy also replans on entering Spite, even if the stored plan was already Charm or Slap.

A pure `replanPending` predicate now exposes `Charm or Slap` in the turn order and `Next: Charm or Slap → chosen when she acts` in the card/Scan. It neither rolls nor modifies battle state. Valid Jealousy, established-phase party attacks, solo Ruri, sleep and empty plans retain their normal displays. Stats, attack probabilities, targeting, timing and Spite's 30% ATK increase are unchanged.

Precedent: FFX's CTB threat readability. The alternatives are shown before a player commits a command, without pretending the execution-time choice is already known.

The generic custom-preview hooks accept `null` to preserve the existing formatter. This necessary support matches PR38's implementation, but its Orlen hook is not imported. When integrating with PR35, retain its `previewPlan` fallback after the custom-hook check. Both paths are needed.

## Validation and limitations

- `node tools/bestiary-check/ruri-jealousy.js`: 12 threshold/selection cases, plus last-copy replanning of Charm/Slap, established p2, solo Ruri, sleep, empty plan and no preview RNG/state mutation.
- `tools/check.sh`: passed data checks, existing Tongue regressions, Ruri regression, reference freshness, animation continuity/authoring/parity and 185 battle smoke runs. Two existing design-drift warnings and 16 attachment notices remain.
- `node tools/data-export/export.js`: reference regenerated with no diff.
- [Simulation evidence](2026-11-20-ruri-simulations.json): 100 runs each for ruri1/ruri2/ruri5/ruri8 under advisor/attack/random, 1,200 before and 1,200 after. Every summary field matches. No intended balance change, so no baseline update.
- `git diff --check`: passed.
- Chromium aborts before a page loads: `socket() Operation not permitted`. No browser layout, playback or visual approval is claimed. Keep the PR draft until the warning is observed at both crowd thresholds and the final-copy transition, then normal previews are observed afterward.

## Queue refresh

B013 exhausted generation 3's actionable work. The [fresh whole-bestiary audit](2026-11-20-audit.json) records all scripts and current image geometry, rigs, clips and lore across five categories. Counts remain 45 enemy records, 37 encounters, 22 rigs, 88 clips and six battle rigs. It is a source/metadata audit, not visual certification.

Generation 4 retains all history and blockers and adds one actionable task: B014, Resonance Engine Mk. IV. Reproduction: p1, count 0, half HP, stored Stomp targeting Kiri, RNG .99; preview says Stomp but execution selects Trample. No Engine code is changed in this run.
