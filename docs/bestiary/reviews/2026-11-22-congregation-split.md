# B015: Congregation split warning

Date: 2026-11-22. Entry: The Congregation. Category: enemy AI telegraph.

Default branch `ccr-d8829a5a-ays4x1`, source commit `b5d0e9f9ac45c21b2acf28784d75fd977d35eb91`. Branch: `bestiary/2026-11-22-congregation-split-warning`.

Delivery: prepared; implementation commit and PR will be recorded after publication.

## Reconciliation and scope

PR44 head `cbabb2a28f298a0f1a7a1ac5993186b180adc9fe` carries generation 5 revision 17, newer than PR41 15, PR38 13, PR35 11, PR32 9, PR29 7 and default 5. Full tracker history retained. Open PR29-46 checked, including Shio art correction and Hisui Water; no Congregation implementation overlap. No unrelated unmerged entry code imported.

Read repository instructions, design/status/style/glossary, boss guidance and Congregation spec. Inspected the installed Congregation sheet, atlas geometry, four clip names and viewer lore. This run changes only its AI preview. It does not validate or integrate its rig or change canon.

## Defect and fix

Reproduced at half HP, p1, stored Verdict targeting Kiri, RNG .99: preview `Next: Verdict → Kiri`, execution `murmur`, three Faces. The regression fails on the original stale preview.

The turn order now shows `Phase change`; card/Scan shows `Next: Phase change → action will be chosen when it acts` whenever an established phase differs from the current HP phase. Normal previews return afterward; sleep takes precedence. The preview consumes no RNG and mutates no fight state.

The spawned Faces also start p2 at full HP, causing an existing p1 transition on their first turn. They receive the same truthful warning, without implying they will split again. Their phase behavior is preserved, not redesigned.

Precedent: FFX CTB threat readability. Disclose action uncertainty before a party choice. Split count, stare assignment, watched-ally protection, critical-hit baiting, 60/40 odds, damage and timing are unchanged.

Nullable custom-hook fallback matches necessary support in PR38/41/44, but none of their entry-specific implementations is imported. Retain PR35's previewPlan fallback after the custom-hook check when integrating those branches.

## Validation and limits

- Six live-script boundary/split cases pass, plus spawned-Face first turns, distinct stare assignments, stare protection, critical-hit baiting, sleep, empty-plan and normal-preview checks. Preview purity assertions pass.
- `tools/check.sh` passes data checks, prior Tongue regressions, current regression, reference freshness, animation continuity/authoring/parity and 185 battle smoke runs. Two existing drift warnings and 16 attachment notices remain.
- `node tools/data-export/export.js` regenerated the reference with no diff.
- [Simulation evidence](2026-11-22-congregation-simulations.json): all fields match across 100 advisor, 100 attack and 100 random before/after battles. Win rates: 98%, 4%, 24%; party commands: 60.98, 47.27, 96.4. No intended balance change, so baseline unchanged.
- `git diff --check` passes.

Chromium aborts before page load with `socket() Operation not permitted`. Browser layout, normal/slow playback and art approval are not claimed. Keep draft until the warning is observed in turn order/card/Scan at the split and on spawned Faces, with normal previews returning afterward.

## Queue refresh

The [fresh audit](2026-11-22-audit.json) inventories all scripts, image geometry/alpha, rigs, clips and lore across five categories. Counts: 45 enemies, 37 encounters, 22 rigs, 88 clips and six battle rigs. This is source/metadata review, not full visual certification.

Generation 6 retains all blockers and history and adds B016, an Engine execution-cadence correction distinct from delivered B014. With count=1 before execution, Stomp is executed on turn 2 at 2501 HP, but Resonance is executed on turn 2 at 2500 HP. The spec requires every third turn. The shared execution counter increments before planNext adds one again. No Engine code changed here; the next task must measure any intended balance change.
