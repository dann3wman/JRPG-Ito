# B009: The Tongue swallow-turn warning

2026-11-18. Implemented pending visual review; not merged.
Base: `ccr-d8829a5a-ays4x1`, `b5d0e9f9ac45c21b2acf28784d75fd977d35eb91`.
Branch: `bestiary/2026-11-18-tongue-swallow-warning`.
Commit and PR: pending publication.

## Source and defect

Default queue generation 1 revision 5 is older than PR29 revision 7 and PR32 revision 9. Reconciled from PR32 head `23b8247bf8d38965ef0a726931707586005ed8b9`, preserving delivery and blocker history without copying unmerged implementation code. Open PR29–34 cover Widow, Well-Rested and party art; no duplicate B009 implementation exists.

The live base script reproduced `Next: Savour → all` then executed `grab`: onTurn swallowed the last captive before execScripted checked the holding rule. This differs from B001's three-taste rescue and B002's target count.

## Fix and counterplay

The Tongue's read-only previewPlan projects Grab with a Swallow prefix when its stored action is Lick/Savour and every held deadline is at most one. Both the short turn-order name and full plan text use the projection. The full warning retains the phase-dependent late-target cap. Staggered deadlines retain the stored holding action. Three distinct tastes before the deadline immediately remove the Swallow warning and reveal the existing rescue Grab.

No countdown, attack, timing, targeting, RNG or stored-plan mutation was changed. This follows FFX-style readable intent: show the rule the next turn will execute, rather than surprising the player after their command. No art or animation changed.

## Verification

The new regression fails on the original preview and passes after the fix: 10 combinations of Lick/Savour, one/two captives, phase transition and staggered deadlines. It verifies actual execution, no preview RNG/state mutation, and rescue/sleep/empty-plan behavior. Prior rescue and Grab-count regressions pass. [Seeded summaries](2026-11-18-tongue-simulations.json): 100 advisor, 100 attack, 100 random before and after, all exactly identical. No numeric balance change, so the baseline is retained. Generated reference remains current.

`tools/check.sh` passed: data/link integrity, all three Tongue regressions, generated-reference freshness, animation continuity/authoring/parity and 5 smoke battles for each of 37 encounters. Two existing design drift warnings and 16 art notices remain. `git diff --check` passed. [Raw check output](2026-11-18-checks.txt).

Chromium again exits 134 with `socket() failed: Operation not permitted`. No live browser rendering, narrow-screen warning layout or playback approval is claimed. Keep the PR draft until the warning is visually checked.

## Queue refresh

B009 exhausted actionable generation-1 tasks. Generation 2 retains all deliveries/blockers and adds B012 only, based on a new Orlen half-HP reproduction: displayed Sermon changes to executed Crozier. The [audit](2026-11-18-audit.json) inventories all current enemy/encounter and viewer records across image assets, animation, rigs, AI and lore. Its visual limits are explicit. Next actionable task: B012.
