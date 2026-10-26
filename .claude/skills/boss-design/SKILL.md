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

### 2026-10-25 · Shared final-boss body

- **Seen:** three separately staged sprites made the final encounter read as a normal enemy group. One connected body with numbered regions gives it scale while preserving the tactical targets.
- **Changed:** presentation only: `ENCOUNTERS.final.body` selects a shared canvas and three target regions. Combatant IDs, HP, stats, skill scripts, turn order, statuses and parent/regrowth rules are unchanged. Browser checks exercised separate damage, status state, Tongue defeat, three parent turns of regrowth and parent collapse.
- **Rule:** a rendered body is not a combatant. Map regions to existing combatant IDs; keep intentions and status panels per target. The current Hellstar death rule collapses the Tongue but leaves a living Ainsel active, so keep his region selectable. Do not silently change this rule while changing the artwork.

### 2026-10-25 · Baseline survey of all 16 encounters

- **Seen:** under the `no-role` policy, seven of twelve role tests (Kiri, Natsu, Goku, Hisui, Kuro, Kugai, Shio) are still won at least 93% of the time. Only Sayo's test truly needs its role (1%); Tetsugi's, Ren's and Miren's are partway (56–67%). Kuro's test teaches only by speed: it takes 33 commands without Darkga instead of 12.
- **Cause:** the tests punish *slowness* rather than the absence of the role, and the rest of the default party (usually Natsu) covers the gap. The Helper also plays very well: it wins 89–100% of every fight, so the `advisor` column alone hides difficulty problems.
- **Rule:** when building a role test, check `no-role` against the target band (≤ 50%), and pick a default party that doesn't already contain an answer to the test's threat.
- **Not yet changed.** The tuning is listed as open work in `docs/implementation-status.md`.
