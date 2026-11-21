# B014: Resonance Engine Mk. IV phase warning

Date: 2026-11-21. Category: enemy AI telegraph.

Default: `ccr-d8829a5a-ays4x1`, commit `b5d0e9f9ac45c21b2acf28784d75fd977d35eb91`. Branch: `bestiary/2026-11-21-engine-phase-warning`.

Delivery: [draft PR44](https://github.com/dann3wman/JRPG-Ito/pull/44), implementation commit `9de73eba8f9e3a1e4fd150bd59597c92ca7bc41b`. Delivered for review, not merged. Queue generation 5 revision 17.

## Sources and scope

PR41 head `53ff7bb7fbef678e11e27f5183603bc9f830d745`, generation 4 revision 15, supersedes PR38 revision 13, PR35 revision 11, PR32 revision 9, PR29 revision 7 and default revision 5. All tracker history retained. Open PR29-43 inspected, including Fuyori recovery art and Shio Blink. No Engine overlap. No unrelated unmerged entry code imported.

Read repository instructions, design/status/style/glossary and Engine spec. The live Engine has no battle rig mapping or installed creature sheet under its art key. This is a text/AI-readability change only; no art, animation or lore approval is claimed.

## Defect and result

Reproduced at half HP, p1, count 0, stored Stomp targeting Ren, RNG .99: `Next: Stomp → Ren`, then `last=trample`. The original regression fails on that stale preview. The free phase entry calls planNext before execution.

The turn order now shows `Phase change`; card/Scan shows `Next: Phase change → action will be chosen when it acts` while an established phase disagrees with the HP threshold. Normal previews return afterward. Sleep retains precedence. Preview reads do not consume RNG or mutate state.

Precedent: FFX CTB threat readability. Warn before a player commits a command when the displayed action can be replaced. Preserve existing damage, odds, targets, speed and counterplay. Nullable custom-hook fallback retains ordinary formatting and matches necessary support also present in PR38/41; their entry-specific code is not imported. Preserve PR35's previewPlan path when integrating those branches.

## Validation

- Nine live-script boundary, cadence and Delay/Break cases pass, plus sleep, empty-plan and normal-skill fallback checks. Original regression failed before the fix.
- `tools/check.sh` passes, including data integrity, previous Tongue tests, reference freshness, animation continuity/authoring/parity and five smoke battles per encounter. Two existing drift warnings and 16 attachment notices remain.
- Reference regenerated through `node tools/data-export/export.js`, with no diff.
- [Simulations](2026-11-21-engine-simulations.json): 100 advisor, 100 attack and 100 random battles before and after. All summary fields identical. Win rates 100%, 3%, 79%; party commands 37.52, 44.75, 84.72 respectively. No intended balance change, so baseline unchanged.
- `git diff --check` passes.

Cadence tests preserve current behavior, not certify it against every design claim: phase-entry planning currently looks up count+1 after the execution counter increments. This patch does not retime Resonance or silently change that shared engine behavior.

Chromium aborts before loading a page with `socket() Operation not permitted`. Browser warning layout, playback and art approval remain unverified. Keep draft until observing the threshold warning in turn order/card/Scan and normal previews afterward.

## Queue refresh

[Fresh audit](2026-11-21-audit.json) inventories all 45 foes, 37 encounters, 22 rigs, 88 clips and six battle mappings, with image geometry, script sources and lore. Source/metadata review across five categories is not full visual certification. Generation 5 retains blocked and delivered history and adds B015: the Congregation split can replace a displayed Verdict against Kiri with Murmur. Reproduced at half HP with RNG .99, producing three Faces. No Congregation code changed.
