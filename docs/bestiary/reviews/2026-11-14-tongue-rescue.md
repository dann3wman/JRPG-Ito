# The Tongue: reveal its rescue response

Task B001, 2026-11-14. Source: `c1840737fef12061165ef6bb553e7bfa166b717b`, default branch `ccr-d8829a5a-ays4x1`. Branch: `bestiary/2026-11-14-tongue-rescue-telegraph`.

## Problem and change

After three different attackers freed a captive, `releaseAll` cleared the grab and taste counter but left the Tongue's Lick or Savour plan in place. The turn order still advertised that action. At execution, the holding rule failed and the engine silently chose Grab instead. This was reproduced against the original source.

The release now recomputes its plan immediately and logs the reaction. The plan becomes Grab while the party still has time to choose, and its highest-Stress target remains late-bound. This uses the prototype's existing visible-reaction pattern, following FFX's readable CTB threat preview: the player can anticipate the consequence of a successful rescue without removing the threat.

No stats, deadlines, damage, attack odds, recovery or encounter rules changed. The boss specification records the corrected preview behaviour. This does not fix the separate singular phase-two target text or swallow-turn replanning; those remain B002 and B009.

## Validation

- A regression first failed against the original source (`lick !== grab`) and passes after the fix.
- Four live-script cases cover both phases and both Lick/Savour plans. They check repeated and distinct attackers, damage without an attacker, released captives, recovery timing, reset taste count, the visible action name/text, reaction log, no random roll during rescue, late Stress targeting and actual Grab execution.
- 300 battles per policy before and after, seed 1, using the real simulator. Every summary value is identical. Raw results are in [the simulation record](2026-11-14-tongue-simulations.json).

| Policy | Battles per version | Win rate before / after | Winning commands before / after |
| --- | --- | --- | --- |
| Helper | 300 | 89.67% / 89.67% | 34.27 / 34.27 |
| Attack | 300 | 0% / 0% | No wins |
| Random | 300 | 0% / 0% | No wins |

No balance baseline regeneration is needed because the intended combat behaviour and all seeded metrics remain unchanged. The generated game-data reference remains current because exported skill data did not change.

## Remaining validation

The browser check could not run. The installed Chromium exits before opening a page with `socket() failed: Operation not permitted`. No visual or browser-playback pass is claimed. Keep the PR a draft until the preview is checked in a working browser. Implementation and automated regression are complete; visual acceptance and merge are pending.

## Lesson

When a successful player action invalidates an enemy's current decision rule, refresh the displayed plan at that state transition. Waiting for the enemy's execution-time fallback creates an unannounced attack even when the underlying combat logic is correct. Check both the plan after counterplay and the command actually executed.

## Delivery

[Draft PR 22](https://github.com/dann3wman/JRPG-Ito/pull/22). Implementation commit: `d2c597072aca7aba2a49548f6357e699ee0b70da`. Published tree matches the tested local tree. The complete `tools/check.sh` suite passes, including the new bestiary regression, with the two existing design drift warnings and attachment review notices. No merge or auto-merge.
