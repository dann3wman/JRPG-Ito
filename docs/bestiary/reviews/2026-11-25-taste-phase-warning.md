# B018: Taste of Ostrel phase warning

Date 2026-11-25. Branch `bestiary/2026-11-25-taste-phase-warning`. Default `ccr-d8829a5a-ays4x1` at `b5d0e9f9ac45c21b2acf28784d75fd977d35eb91`. Latest queue: PR53 head `9089f0d34e794ef933a8bbc86c9e238df07911f4`, generation8 revision23. All bestiary queue heads compared; PR29-55 inspected. No overlapping Taste implementation. Tracker history retained without importing unrelated unmerged code.

## Defect and fix

With phase p1, count0, half HP and four awake Sleepers, the stored Village Note preview is replaced by Kiri's Lullaby at execution. Initial regression failed. Free phase entry replans after Sleeper healing; simply comparing current HP to half would also show false warnings when healing cancels the transition.

Taste now projects its existing start-of-turn heal without mutating state or drawing RNG, and shows `Phase change → action will be chosen when it acts` when that projected phase differs. Normal stored previews and Asleep retain precedence. Both phase directions are covered. Combat execution, probabilities, healing, wake countdown and existing cadence are untouched. This follows the established FFX-style readable CTB principle without inventing a new boss rule.

Nullable custom-preview fallback matches existing warning PRs. Preserve PR35 previewPlan support during integration; no Engine or Whisperer execution fixes imported. Ostrel sheet, atlas metadata, rig/clip source and lore inspected; no art or animation edits.

## Validation

36 healing/phase cases cover both phases, zero/one/four humming Sleepers, exact threshold and adjacent HP. Additional checks cover actual action replacement, Counter-Melody preventing re-sleep, permanent wake, sleep precedence, missing plan and preview purity. All pass.

100 battles each under advisor/attack/random before and after, seed1: every summary field identical. [Full results](2026-11-25-taste-simulations.json). No intended numeric change, so baseline retained. Reference generator ran with no diff. `tools/check.sh` passed including all37 encounter smoke runs and animation authoring/continuity/parity. Two existing drift warnings and16 attachment notices remain. Final whitespace diff checked.

Fresh browser attempt failed because `/usr/lib/chromium/chromium` is missing. Warning rendering and narrow-screen layout remain unverified; draft required. No playback or visual approval claimed.

## Queue refresh

All five categories reevaluated in the [audit](2026-11-25-audit.json). New B019 records the Whisperer's separate hiding-count transition defect, not its already-delivered cadence correction. No Whisperer code edited. One actionable task and six retained blockers.

Implementation commit: `04cf44b8df45a2732371b2901628c296253833b6`. [Draft PR56](https://github.com/dann3wman/JRPG-Ito/pull/56). Queue generation9 revision25. Earlier task history preservation assertion passed. No merge or deployment.
