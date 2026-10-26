# Boss spec: Lake Hen

| | |
| --- | --- |
| Key | `hen` (part: `chick`) |
| Chapter and disc | Ch. 3, Disc 1 |
| Ito source | *Gyo* |
| Status | Scripted and tuned in the prototype (2026-10-25) |
| CTB plan | — |

## The story

Every chocobo on the ranch walks into the lake in a slow spiral, humming. The herd comes back out of the water, and the lead hen walks out last, enormous and dripping. Like *Gyo*'s fish, it is what comes out of the water that is wrong.

| Beat | In this fight |
| --- | --- |
| The ordinary detail | Wet chicks climbing out of the lake |
| Repetition | Each of her turns another chick; she pecks from under the water |
| The page turn | The splash brings her up: the whole of her, seen at once (+10 Stress) |
| The cost | The player can keep one chick, Bell, who never hums |

## The lesson

- **Teaches:** a target can be out of reach, and one character's action (Miren's landing) opens a window that someone else uses.
- **Scan hint:** "What goes up comes down."
- **Intended answer:** Miren Jumps. While he is in the air, Kiri and Natsu clear the chicks, so none is left to heal her when she surfaces. He lands, the splash brings her up until her next turn, and Kiri hits her. His own landing never reaches her.
- **The obvious answer, and why it fails:** attacking. She can't be targeted underwater, so only the chicks take hits, and they keep coming.
- **Needs at least two characters because:** Miren opens the window but his landing can't hit her; the others must hit her and clear the chicks.

## Stats

| Foe | HP | ATK | DEF | MDEF | Speed | Crit | Part of |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Lake Hen | 600 | 62 | 6 | 6 | 7 | 10% | — |
| Wet Chick | 60 | 26 | 2 | 2 | 12 | 10% | Lake Hen |

Encounter level 5, starting Danger 15, default party Miren, Kiri, Natsu, default bag.

## Script

No HP phases: Disc 1 chapter bosses have none (design doc, *Boss mechanics*).

**Lake Hen** (can't be targeted underwater; landing hits never reach her). At the start of each of her turns she sinks back under if she was up, then calls a Wet Chick (up to 3).

1. If this is her 4th, 8th, 12th… turn: **Come Up for Air** (Rank 4): she surfaces until her next turn.
2. Otherwise: **Peck** (Rank 4): 1.5× ATK on the lowest HP%.

Whenever she surfaces (Come Up for Air, or a landing splash): +10 Stress to each ally, and each chick alive heals her 10%.

**Wet Chick:** roll **Peep** 60% (1.0× ATK) or **Hum** 40% (Sound, +8 Stress to the ally closest to a Stress Check who can hear it).

## Fairness checks

- [x] Her card says why she can't be targeted, and that she is up until her next turn.
- [x] Her Speed (7) and Rank 4 Peck leave a window of about two party actions after a splash.
- [x] The heal from chicks is logged with its size.
- [x] The log names the splash.
- [x] Without Miren she still comes up for air every 4th turn (Kiri, Natsu, Goku: 100%, 85 commands).

## Disc rules

Disc 1: Scan shows the full script, no HP phases, statuses rare and 1 turn. **Rematch** (design doc, not built): she dives again after one party action, so Miren has to land right before the striker's turn.

## Helper

Miren Jumps whenever she is under (onto a chick if there is one). Everyone else hits the Hen while she is up, or the weakest chick. With nothing to target, Defend.

## Simulation

200 battles per policy, default party, 2026-10-25.

| Policy | Win | Party commands | Afflicted | KOs |
| --- | --- | --- | --- | --- |
| advisor | 100% | 46.0 | 0.07 | 0.00 |
| attack | 21% | 74.8 | 0.41 | 2.55 |
| random | 14% | 124.8 | 7.95 | 5.42 |

In band for win rate and length. Afflicted is low: the Helper Soothes every surfacing.

## Open questions

- None.
