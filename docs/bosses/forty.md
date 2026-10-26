# Boss spec: Forty Years

| | |
| --- | --- |
| Key | `helmsman` (part: `hull`) |
| Chapter and disc | Ch. 10, Disc 1 |
| Ito source | *The Long Dream* |
| Status | Scripted and tuned in the prototype (2026-10-25) |
| CTB plan | — |

## The story

Captain Ren's log shows forty years of the same route. Before dawn the crew who flew it before him climb out of the hull, and one of them takes the wheel.

| Beat | In this fight |
| --- | --- |
| The ordinary detail | A ship on course; a helmsman you can't reach |
| Repetition | Every 4th turn, Course Correction |
| The page turn | Throw the ship off course and the deck tilts under you |
| The cost | Ren learns how long he has been flying this route |

## The lesson

- **Teaches:** set up a window: brace (Defend) before you break something that will knock you back.
- **Scan hint:** "Break the course, and brace for it."
- **Intended answer:** Kiri Defends. Ren's Delay Shot on the Hull throws the ship off course and tilts the deck, and Kiri keeps her slot because she is braced. She strikes the exposed Helmsman before his next turn. Ren only fires when Kiri will act before the Helmsman.
- **The obvious answer, and why it fails:** attacking the Hull until it breaks. It works, but the Hull has 5000 HP at DEF 22 (`attack`: 0–1%).
- **Needs at least two characters because:** Ren breaks the course and can't both brace and strike; the striker needs Ren's push.

## Stats

| Foe | HP | ATK | DEF | MDEF | Speed | Crit | Part of |
| --- | --- | --- | --- | --- | --- | --- | --- |
| The Helmsman | 800 | 78 | 10 | 10 | 12 | 10% | — |
| The Hull | 5000 | 62 | 22 | 10 | 8 | 10% | The Helmsman |

Encounter level 18, starting Danger 25, default party Ren, Kiri, Natsu, default bag.

## Script

No HP phases: Disc 1 chapter bosses have none (design doc, *Boss mechanics*).

**The Helmsman** (can't be targeted while on course; at the start of his turn he brings the ship back on course):

1. If this is his 4th, 8th, 12th… turn: **Course Correction**: 1.1× ATK to each ally.
2. Otherwise roll **Belaying Pin** 60% (1.3× ATK, 10% crit) or **Same Route** 40% (+12 Stress to the ally closest to a Stress Check).

**The Hull:** roll **Creak** 60% (1.2× ATK) or **The Old Crew** 40% (+10 Stress to the ally closest to a Stress Check). Any push on it (Delay Shot, a Limit Break push, Disrupt) throws the ship off course: everyone not Defending is pushed back 2 slots (+8 Stress), and the Helmsman can be hit until his next turn. If the Hull is destroyed the ship stays off course.

## Fairness checks

- [x] The Helmsman's card says why he can't be targeted; the Hull's says on or off course.
- [x] The turn order shows whether the striker acts before the Helmsman.
- [x] Every roll shows its odds.
- [x] The log names the tilt and who kept their footing.
- [x] Without Ren, breaking the Hull is the long way through (Hisui, Kiri, Natsu: 100%, 70 commands).

## Disc rules

Disc 1: Scan shows the full script, no HP phases, statuses rare and 1 turn. **Rematch** (design doc, not built): the Hull needs two Delay Shots to go off course, and the tilt pushes back 3 slots.

## Helper

Ren Delay Shots the Hull only when the striker will still act before the Helmsman after the tilt; otherwise he Quick Shots the Hull. The striker Defends when Ren acts before their next turn, and attacks the Helmsman when he is exposed.

## Simulation

200 battles per policy, default party, 2026-10-25.

| Policy | Win | Party commands | Afflicted | KOs |
| --- | --- | --- | --- | --- |
| advisor | 100% | 53.4 | 0.58 | 0.00 |
| attack | 0% | — | 0.71 | 3.00 |
| random | 73% | 133.8 | 7.71 | 2.67 |

In band, near the top of the length band.

## Open questions

- None.
