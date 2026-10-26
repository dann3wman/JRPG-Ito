---
name: boss-design
description: Design, implement, tune and review bosses, enemies and encounters for the Humming Crystal battle prototype (FOES, SCRIPTS, ENCOUNTERS and the Helper in index.html). Use when adding a boss or role test from the design doc, changing an enemy's script or stats, rebalancing a fight, or answering whether a fight is fair, too easy or too long. This skill is self-maintaining. Every lesson from a tuning round gets logged in it.
---

# Boss design

A boss in this project is a JRPG fight that teaches one mechanic *and* an Ito story that escalates and ends on a reveal. The full method is in [`docs/guides/boss-authoring.md`](../../../docs/guides/boss-authoring.md). This skill is the working checklist and the memory of what went wrong before.

Two duties always apply:

1. **Before designing or changing a fight, read [Lessons](#lessons) below** and the [horror rules and fair-horror checks](../../../docs/style-guide.md).
2. **After a tuning round or a playtest note, log what you learned** in Lessons. A tuning change isn't finished until its lesson is written down.

## Tools

| Tool | Use it to |
| --- | --- |
| `node tools/data-check/check.js` | Catch broken references (rule → skill, foe → script, duplicate rule labels) and design-doc drift. Run after every edit |
| `node tools/battle-sim/sim.js <key> -n 300 [--policy advisor\|no-role\|attack\|random]` | Measure how the fight plays: win rate, length, KOs, Stress Checks, flees, Lost Turns |
| `node tools/battle-sim/sim.js --baseline` | See what a change did to every fight, as deltas from `tools/battle-sim/baseline.json` |
| `tools/ctb-planner/index.html` | Lay out a tempo puzzle before scripting it; its link goes in the spec |
| `node tools/data-export/export.js` | Regenerate `docs/reference/game-data.md` after any data change |
| `docs/reference/game-data.md` | Read every existing script in plain form; copy the nearest one |

## Workflow

### New boss or role test

1. **Spec first.** Copy `docs/templates/boss-spec.md` to `docs/bosses/<key>.md`. Fill in the story beats, the lesson, the obvious answer that must fail, and the fairness checks. If the design doc's entry for the boss is vague or contradicts a system, raise it with the user before building. Don't invent a rule the doc doesn't support.
2. **Plan the tempo** in the CTB planner if the fight is about turn order. Check that the intended answer fits at the real Speeds.
3. **Build** `FOES`, `SCRIPTS`, `ENCOUNTERS` and `STORY`, following the field reference in the guide. Write `power` and `desc` to match `run` exactly, since the info panel is the Scan.
4. **Teach the Helper** (`advise`, `adviseFocus`) the intended answer. The simulator's `advisor` policy is the Helper; a Helper that can't solve the fight makes the numbers meaningless.
5. **Verify.** Run data-check, then sim with `advisor`, `attack` and `random` (and `no-role` for a role test). Compare against the target bands in the guide. Play it in the browser once with the Helper on.
6. **Record** the sim table in the spec and the boss's row in `docs/implementation-status.md`. Write a new baseline (`--write-baseline -n 200`), regenerate the reference, and update the design doc if a documented rule changed. Commit them together.

### Tuning an existing fight

1. Measure first: `sim.js <key> -n 300` for each policy. Save the numbers.
2. Name the problem in terms of the targets ("attack wins 40%: no puzzle", "85 commands: a slog", "0 Afflicted: Stress is decoration").
3. Change one lever at a time and re-run with `--baseline`. Prefer levers that keep the lesson intact: HP and length first, then the rule that should punish the obvious answer, then raw damage last.
4. Log the round in Lessons.

### Reviewing a fight (design question)

Answer as a designer: the verdict, the precedent behind it, and the trade-off. Back it with sim numbers where they apply, and run the six horror rules and the fair-horror checks.

## Standing rules

- Every rule label in a script is unique, and every phase ends in an unconditional rule (data-check enforces both).
- Enemy plans are rolled at plan time and shown in the turn order. Never re-roll at execution; use `react: true` so the change is visible.
- Counterplay changes the plan, not the outcome behind the player's back. Orlen holding his voice under Counter-Melody is shown as a new plan.
- A `Sound` tag always comes with `sound: true`, or Counter-Melody and Sayo's and Kugai's immunity silently stop working.
- Every number in a skill's `desc` and `power` matches its `run`.
- Story bosses never hard-lock a party that lacks the intended character. Role tests may require their role.

## Lessons

Newest first. Each entry: the fight, what the numbers or a playtest showed, the cause, what changed (exact values), and the rule it suggests.

### 2026-10-25 · Building the ten Disc 2 chapter bosses

- **"Same round" needs a wide round.** *Seen:* the Hundred Listeners at 25%: coffins reopened before a second ally could seal them. *Cause:* the Abbot's turn came about one party action after the knock. *Changed:* Abbot Speed 9 → 7 and Rank 4 actions, Listeners Speed 11 → 9. → 97%. The Tongue's three tastes had the same problem inside its 3-turn countdown: Speed 11 → 9, Rank 4 Lick and Savour, 65% → 89%. *Rule:* for any "in the same round" or "within N of its turns" mechanic, check that two to three party actions fit in the window at the real Speeds.
- **The Helper's generic rules misfire on new shapes.** Kuro's Darkga fired every turn because four 1-HP Sleepers counted as foes, and she paid HP for the MP (Taste 13%). The default focus picked 1-HP Sleepers and coffined Listeners as "the weakest". Ren's Delay Shot advice picked an untargetable foe and crashed. A Silenced ally was told to use a skill. *Changed:* `notFocus` for foes that aren't real targets, encounter advice for Kuro in the Taste, reachable-only targets for Ren, and `advise` falls back to Attack when Silenced. *Rule:* after adding a foe that isn't a normal body (turnless, untargetable, unkillable), read one Helper trace before trusting the numbers.
- **The intended answer must be the fastest route.** The Face Thief without Tetsugi (Hisui instead) won faster than with him (42 commands against 52), because a boss with no damage of her own is a pure race. *Changed:* HP 2300 → 2800. → Tetsugi route 88%; without him 45%. *Rule:* a boss whose threat is attrition (stat loss, theft) needs enough HP that the attrition happens.
- **Danger is a Stress dial.** *Seen:* the Taste of Ostrel at 13%, with 2364 Stress from Lost Turns across six traces. *Cause:* starting Danger 40 plus Lullabies and songs. *Changed:* Disc 2 fights start at Danger 20–25. *Rule:* start a fight under 30 Danger unless Lost Turns are its mechanic; the fight raises it on its own.
- **A per-hit cost can punish the intended answer.** The doc's "+10 Stress per villager woken" made Darkga, the answer, cost Kuro 40 Stress a cast. *Changed:* once per action. *Rule:* when a fight's answer is an area action, check what per-hit rules charge for it.

### 2026-10-25 · Building the eleven Disc 1 chapter bosses

- **Lake Hen.** *Seen:* 55% `advisor`, 212 commands. *Cause:* Miren's Jump (80 ticks) usually landed right before her next turn, so the window after the splash was empty. *Changed:* Speed 9 → 7, Peck and Come Up for Air Rank 3 → 4, which leaves about two party actions after a splash. → 100%, about 50 commands. *Rule:* a "window until its next turn" needs the boss slower than the action that opens it, or the window is luck. Lay it out in the CTB planner first.
- **Forty Years.** *Seen:* the fallback (break the Hull, 2600 HP) took 46 commands; the intended Ren route took 89. *Cause:* the Helper fired Delay Shot when the striker couldn't act before the Helmsman's next turn, wasting the window and paying the tilt's Stress. *Changed:* the Helper fires only when the striker still acts first after the tilt. Hull 2600 → 5000 HP and DEF 14 → 22, Helmsman 1500 → 800. *Rule:* measure the fallback route as well as the intended one; it must be slower.
- **Rewound Wolf.** *Seen:* `attack` won 63%. *Cause:* once the wolf falls, the dead slot is the only target, so mashing Attack pins it automatically. *Changed:* the dead slot's turn comes forward to within 1 slot when the wolf falls, so the pin has to be placed *before* the kill. Revive 50% → 75% HP, +15% → +20% ATK, wolf HP 800 → 950. → `attack` 20%. *Rule:* if the answer is "hit the only thing you can hit", it isn't a puzzle. Put the decision before the moment it's needed.
- **Lamp Hollow without Kuro: 7%.** *Cause:* Relight brought back every Wick at once, and the Helper killed the lowest Wick each time, feeding the relight loop. *Changed:* Relight brings back one Wick and halves the relighting Wick (a flame shared). The Helper without Kuro brings every Wick within one hit, then kills them in a burst. → 45%, 136 commands. *Rule:* a fallback that needs perfect sequencing is a hard-lock in practice; give the rule a cost that erodes over repeats.
- **The Well-Rested.** *Seen:* when resting stopped once the original was found, the no-Kiri route got faster than the Kiri route. *Changed:* every awake sleeper rests the original +1.5% per turn, always, so Lullaby's sleep is worth the turn. *Rule:* check that the intended answer stays the faster one after every fallback tweak.
- **The Grey Hound.** *Seen:* win rate swings from 100% to 69% as its Speed goes from 12 to 14, and Goku's starting Stress decides whether the fight even starts. *Changed:* Speed 13, starting Stress 60, Danger 20 (no early Lost Turns, which add Stress to the guest). A Defending target halves the Stress its bites give Goku: the doc's "hold it back" made literal, and the fallback without Natsu. *Rule:* a guest's Stress is a resource the party can't directly spend; tune its start and gain before anything else.
- **Afflicted.** *Seen:* the Helper Soothes so well that most of these fights average under 0.5 Afflicted. *Changed:* each fight's own horror beat now costs Stress: seeing the Hen surface +10, the Pelt's sleeve +8 and Put On +15, your own copied move +10, Snore +10. *Rule:* attach Stress to the image the fight is about, not to a generic hit.

### 2026-10-25 · Baseline survey of all 16 encounters

- **Seen:** under the `no-role` policy, seven of twelve role tests (Kiri, Natsu, Goku, Hisui, Kuro, Kugai, Shio) are still won at least 93% of the time. Only Sayo's test truly needs its role (1%); Tetsugi's, Ren's and Miren's are partway (56–67%). Kuro's test teaches only by speed: it takes 33 commands without Darkga instead of 12.
- **Cause:** the tests punish *slowness* rather than the absence of the role, and the rest of the default party (usually Natsu) covers the gap. The Helper also plays very well: it wins 89–100% of every fight, so the `advisor` column alone hides difficulty problems.
- **Rule:** when building a role test, check `no-role` against the target band (≤ 50%), and pick a default party that doesn't already contain an answer to the test's threat.
- **Not yet changed.** The tuning is listed as open work in `docs/implementation-status.md`.
