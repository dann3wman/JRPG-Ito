# Boss spec: <Name>

<!-- Copy to docs/bosses/<key>.md and fill in before writing code. See docs/guides/boss-authoring.md.
     Delete these comments as you go. Keep every section, even if the answer is "none". -->

| | |
| --- | --- |
| Key | `<key>` (used in FOES, SCRIPTS, ENCOUNTERS) |
| Chapter and disc | Ch. <n>, Disc <n> (or role test / optional / rematch) |
| Ito source | *<work>* |
| Status | Spec · Scripted · Tuned · Final |
| CTB plan | <ctb-planner link> |

## The story

<!-- Two or three sentences in the design doc's voice. What the party walks into, and what is wrong with it. -->

| Beat | In this fight |
| --- | --- |
| The ordinary detail | <the first telegraph, harmless-looking> |
| Repetition | <the rule the player learns to read> |
| The page turn (50% HP) | <the same rule, turned on the player> |
| The cost | <what winning takes, or the last image> |

## The lesson

- **Teaches:** <one mechanic, one sentence>
- **Scan hint:** "<the hint Disc 2+ Scan shows>"
- **Intended answer:** <which characters, in what order, and why it works>
- **The obvious answer, and why it fails:** <e.g. "Provoke doesn't help: it targets by Stress">
- **Needs at least two characters because:** <…>

## Stats

| Foe | HP | ATK | DEF | MDEF | Speed | Crit | Part of |
| --- | --- | --- | --- | --- | --- | --- | --- |
| <name> | | | | | | 10% | — |

Encounter level <lv>, starting Danger <hum>, default party <a, b, c>, bag <default or override>.

## Script

Phases:

| Phase | When | Entry | What changes |
| --- | --- | --- | --- |
| p1 | Above 50% HP | — | |
| p2 | 50% HP or below | <skill, free?> | |

Rules, in priority order (the last of each phase is unconditional):

1. If <condition> (reacts?): <skill> → <target>
2. Otherwise: <skill> → <target>

Skills:

| Skill | Rank | Tags | Target | Power | Effect |
| --- | --- | --- | --- | --- | --- |
| | 3 | Physical | random | 1.0× ATK | |

Parts (re-form after N of its turns):

## Fairness checks

- [ ] The plan and target of every action show in the turn order before the player commits.
- [ ] Phase 1 teaches the trick before phase 2 punishes it.
- [ ] Every random effect shows its odds in the info panel.
- [ ] The trick can be learned from the battle log alone, without the info panel.
- [ ] A party missing the intended answer has a slower, costlier way through. Story bosses never hard-lock.

## Disc rules

<!-- From the design doc's Boss mechanics table: Scan detail, HP phases, status rate, punishing the obvious strategy. -->

**Rematch:** <the extra mechanic, on top of +50% stats>

## Helper

<!-- What advise() should recommend, and when. The simulator's advisor policy is the Helper. -->

## Simulation

| Policy | Win | Party commands | Afflicted | KOs |
| --- | --- | --- | --- | --- |
| advisor | | | | |
| attack | | | | |
| random | | | | |

Against targets: <in band / out of band, and the plan>.

## Open questions
