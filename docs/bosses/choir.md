# Boss spec: Choir of Lumen

| | |
| --- | --- |
| Key | `chorister` ×4 |
| Chapter and disc | Ch. 11, Disc 1 |
| Ito source | *Village of the Sirens* |
| Status | Scripted and tuned in the prototype (2026-10-25) |
| CTB plan | — |

## The story

The holy capital sings. Three Ruris interrupt a mass, and the choir does not stop. Sayo defects from it mid-hymn.

| Beat | In this fight |
| --- | --- |
| The ordinary detail | A hymn |
| Repetition | Each Hymn is louder for every singer still singing |
| The page turn | Amen: the listeners step back as one |
| The cost | Sayo hears the voices she sang with, still singing without her |

## The lesson

- **Teaches:** thin a group that grows stronger together, and block its biggest sound attacks.
- **Scan hint:** "Each voice makes the others louder."
- **Intended answer:** Kuro's Darkga thins all four at once, Sayo saves Counter-Melody for Amen and the loudest Hymns, and Natsu Soothes.
- **The obvious answer, and why it fails:** attacking one singer at a time. The others keep singing at full chord and the Stress drives the party to flee. `attack` wins about half the time, but only after the roster has cycled through fled characters, who are gone for the dungeon.
- **Needs at least two characters because:** Darkga thins them, but someone has to block or relieve the Stress while it does.

## Stats

| Foe | HP | ATK | DEF | MDEF | Speed | Crit | Part of |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Chorister | 1300 | 74 | 8 | 6 | 11 | 10% | — |

Encounter level 19, starting Danger 30, default party Sayo, Kuro, Natsu, default bag.

## Script

No HP phases: Disc 1 chapter bosses have none (design doc, *Boss mechanics*).

Each Chorister:

1. If this is its 4th, 8th, 12th… turn: **Amen** (Rank 4, Sound): +6 Stress and pushed back 1 slot (+4 Stress) for each ally who can hear it.
2. Otherwise roll **Hymn** 60% (Sound: +4 Stress to each listener, +2 for each other Chorister still singing) or **Collection** 40% (1.6× ATK, 10% crit).

## Fairness checks

- [x] Every Chorister's plan shows in the turn order.
- [x] Amen comes on a fixed count.
- [x] Every roll shows its odds.
- [x] The log names each Hymn's Stress.
- [x] Without Sayo and Kuro it is a Stress fight but winnable (Kiri, Natsu, Hisui: 100%, 56 commands).

## Disc rules

Disc 1: Scan shows the full script, no HP phases, statuses rare and 1 turn. **Rematch** (design doc, not built): each singer killed makes the others 10% stronger and adds 3 Danger, and if Earplugs stay active for 3 turns the Choir switches to physical attacks.

## Helper

The default Helper: Kuro casts Darkga against several foes, Sayo casts Counter-Melody against a coming Hymn or Amen, Natsu Soothes.

## Simulation

200 battles per policy, default party, 2026-10-25.

| Policy | Win | Party commands | Afflicted | KOs |
| --- | --- | --- | --- | --- |
| advisor | 100% | 30.5 | 1.99 | 0.07 |
| attack | 43% | 62.7 | 6.19 | 2.23 |
| random | 80% | 84.3 | 7.72 | 2.50 |

Advisor in band. `attack` is out of band, but only pyrrhically: about 5 characters flee per fight.

## Open questions

- Should a win that costs the dungeon's roster count as a win in the simulator? A `fled` cap on the `attack` policy would show this fight's real floor.
