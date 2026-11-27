# The Face Thief: phase-entry target warning

2026-11-27 · B020. Default `ccr-d8829a5a-ays4x1`, source `b5d0e9f9ac45c21b2acf28784d75fd977d35eb91`.
Branch: `bestiary/2026-11-27-facethief-target-warning`. Commit and PR: pending publication.

At1400/2800HP the old preview said Stare → Natsu while the real phase gate replanned Stare → Kiri. Above1400HP the stored Natsu target remained correct. The initial regression failed on this mismatch.

The enemy card now discloses Stare → Kiri on pending phase two when Kiri is eligible. Otherwise it says a random available ally is chosen when it acts. The turn-order title identifies the phase change. Healing back across the threshold clears or changes the warning; sleep takes precedence. No RNG or combat state is consumed by inspection. Normal previews retain their stored targets. This follows FFX's readable CTB decisions: the player can see who will need recovery.

Validation:30 HP/phase/availability cases, live target replacement, above-half control, healing, sleep, empty plan, preview purity, and actual Face Thief healing/damage-state recovery hooks. Natsu cannot restore Kiri's feature in phase two; Tetsugi's Chakra with a hit can. [Simulation evidence](2026-11-27-facethief-target-warning-simulations.json):100 advisor,100 attack,100 random before and after, seed1. Every summary field identical. Advisor87% wins,62.78 commands in wins; attack/random0%; zero timeouts/stalls. No intended number change; baseline preserved. Reference regenerated and unchanged.

Repository checks: tools/check.sh passed, including data/reference, focused live-script regressions, animation continuity/parity and authoring, and five simulations for every encounter. Two existing documented drift warnings and16 attachment notices remain. git diff --check passed.

Draft required: fresh Chromium launch reports `/usr/lib/chromium/chromium` missing. No browser layout, playback or art approval claimed. Source sheet, atlas, sixteen-bone rig, four clips and lore inspected; no asset or canon edits.

Queue:PR59 generation10/revision27 is newest; all earlier deliveries and blockers retained. Open PR29-61 inspected, including Kugai Protect and Fuyori Mix art. Import tracker metadata only. Shared nullable preview fallback matches prior warning PRs. During integration preserve PR35's previewPlan fallback alongside custom hooks. No unrelated unmerged implementation copied.

Generation11 audit across all five categories found B021:the Mirens previews Spear with two copies but Jumps at phase entry. Three-copy control is correct. [Audit](2026-11-27-audit.json). B021 is queued, not implemented. One actionable item and six blocked items remain.
