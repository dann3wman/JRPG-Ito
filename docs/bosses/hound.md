# Boss spec: The Grey Hound

| | |
| --- | --- |
| Key | `greyhound` (guest: Goku) |
| Chapter and disc | Ch. 12, Disc 1 (end of disc) |
| Ito source | *Uzumaki* |
| Status | Scripted and tuned in the prototype (2026-10-25) |
| CTB plan | — |

## The story

At the Earth Crystal, Goku changes, and her great grey hound turns on the party. She asks them to hold it back. She calls it home one step at a time, while it is still hers to call.

| Beat | In this fight |
| --- | --- |
| The ordinary detail | Goku's hound, the one that saved them on the bridge |
| Repetition | Every bite adds Stress to Goku as well as its target |
| The page turn | Every hit on it makes it stronger: you can't win by fighting |
| The cost | Three steps, and the hound lies down at her feet. She becomes the Grey Mother |

## The lesson

- **Teaches:** the win condition isn't damage: protect and time an ally you don't control.
- **Scan hint:** "She has to be calm to call it."
- **Intended answer:** Natsu Soothes Goku under 50 Stress. Sayo's Quick Song (or Ren's Delay Shot on the hound) puts her turn ahead of its next bite. Everyone else Defends, which holds it back and halves the Stress its bites give her.
- **The obvious answer, and why it fails:** attacking. It can't be KO'd, and every hit raises its ATK 10%.
- **Needs at least two characters because:** Natsu gets Goku calm and Sayo or Ren gets her turn first. Neither alone lands a step.

## Stats

| Foe | HP | ATK | DEF | MDEF | Speed | Crit | Part of |
| --- | --- | --- | --- | --- | --- | --- | --- |
| The Grey Hound | 1 | 62 | 10 | 10 | 13 | 10% | — |

Encounter level 20, starting Danger 20, default party Natsu, Ren, Sayo, default bag. Guest: Goku, starting at 60 Stress.

## Script

No HP phases: Disc 1 chapter bosses have none (design doc, *Boss mechanics*).

**The Grey Hound** (can't be KO'd; any hit raises its ATK 10%):

1. If this is its 3rd, 6th, 9th… turn: **Pounce**: 2.0× ATK on the lowest HP%.
2. Otherwise: **Bite**: 1.4× ATK on a random ally.

Each attack adds 20 Stress to Goku, or 10 if its target is Defending.

**Goku** (guest, starts at 60 Stress, never targeted, no Stress Checks): on her turn, if her Stress is under 50, she calls the hound back one step. Three steps end the fight.

## Fairness checks

- [x] Goku's card shows her Stress against the 50 line; her turn shows in the turn order as Guest.
- [x] The hound's card counts the steps left.
- [x] Its attacks are on a fixed count.
- [x] The log says why Goku couldn't call.
- [x] Without Natsu, Kiri's Lullaby and Defend make a slower route (Kiri, Ren, Sayo: 47%).

## Disc rules

Disc 1: Scan shows the full script, no HP phases, statuses rare and 1 turn. **Rematch** (design doc, not built): it takes 4 steps, and the hound acts 1 slot sooner after each one.

## Helper

Natsu Soothes Goku at 35 Stress or more. Sayo Quick Songs her, and Ren Delay Shots the hound, when she will be calm and the hound acts first. Kiri uses Lullaby when there is no Natsu. Everyone else Defends.

## Simulation

200 battles per policy, default party, 2026-10-25.

| Policy | Win | Party commands | Afflicted | KOs |
| --- | --- | --- | --- | --- |
| advisor | 100% | 11.9 | 0.02 | 0.03 |
| attack | 0% | — | 0.00 | 3.00 |
| random | 0% | — | 0.11 | 4.93 |

Wins in band; length below the 25-command floor. It is a short puzzle by design: three steps is the doc's number.

## Open questions

- Short: about 15 commands. Raising the step count would lengthen it but is the doc's Rematch rule. A 4th beat (the hound breaks free once at 2 steps) is a possible middle ground.
