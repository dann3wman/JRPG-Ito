# Boss spec: Village Well

| | |
| --- | --- |
| Key | `well` |
| Chapter and disc | Ch. 1, Disc 1 (tutorial) |
| Ito source | *Uzumaki* |
| Status | Scripted and tuned in the prototype (2026-10-25) |
| CTB plan | — |

## The story

Ostrel's well has started to turn. The water goes round in a slow spiral, and the bucket comes up full of it. The neighbours hum one note in their sleep, and now the well hums it back.

| Beat | In this fight |
| --- | --- |
| The ordinary detail | A bucket on a rope (Bucket, a plain hit) |
| Repetition | Spiral Draw: the water pulls one ally back 2 slots, every few turns |
| The page turn | Every 3rd turn the well hums the village's note at everyone (+10 Stress). There is no HP phase on Disc 1; the note is the turn |
| The cost | Tetsugi has already been revived once with a Phoenix Down. He is warm, happy and slightly wrong |

## The lesson

- **Teaches:** read the turn order: the plan and its target show before it acts, and being pushed back costs Stress.
- **Scan hint:** "Watch where the water turns."
- **Intended answer:** Kiri and Tetsugi attack, Natsu Cures whoever is low and Soothes after the note. Spiral Draw names its target when it plans, so the player sees who is about to lose time.
- **The obvious answer, and why it fails:** pressing Attack works, as a tutorial should (FF1's Garland, Dragon Quest's first slime). The fight only asks the player to notice the turn order and the Stress bar.
- **Needs at least two characters because:** it doesn't, by design. It is the one Disc 1 fight that isn't a puzzle.

## Stats

| Foe | HP | ATK | DEF | MDEF | Speed | Crit | Part of |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Village Well | 1100 | 66 | 4 | 4 | 10 | 10% | — |

Encounter level 2, starting Danger 10, default party Kiri, Natsu, Tetsugi, default bag.

## Script

No HP phases: Disc 1 chapter bosses have none (design doc, *Boss mechanics*).

1. If this is its 3rd, 6th, 9th… turn: **The Note** (Rank 4, Sound): +10 Stress to each ally, +4 Danger.
2. Otherwise roll: **Spiral Draw** 40% (0.6× ATK, pushed back 2 slots, +8 Stress), **Bucket** 60% (1.4× ATK, 10% crit).

## Fairness checks

- [x] Spiral Draw shows its target in the turn order before it acts.
- [x] The Note comes on a fixed count the info panel states.
- [x] Every roll shows its odds.
- [x] The log names every push and its Stress cost.
- [x] Any party wins it.

## Disc rules

Disc 1: Scan shows the full script, no HP phases, statuses rare and 1 turn. **Rematch** (design doc, not built): its turns come 1 slot sooner at 50% HP and 2 slots sooner at 20%.

## Helper

The default Helper plays it: attack, Cure under 60% HP, Soothe high Stress. No encounter-specific advice.

## Simulation

200 battles per policy, default party, 2026-10-25.

| Policy | Win | Party commands | Afflicted | KOs |
| --- | --- | --- | --- | --- |
| advisor | 100% | 27.2 | 0.00 | 0.00 |
| attack | 100% | 25.1 | 0.00 | 0.04 |
| random | 100% | 74.5 | 1.30 | 0.33 |

Pressing Attack wins: out of band for a Disc 1 boss on purpose, because this is the tutorial. Afflicted is 0, which is right for the first fight.

## Open questions

- None.
