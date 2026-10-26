# Boss spec: Last Beastcaller's Pelt

| | |
| --- | --- |
| Key | `pelt` |
| Chapter and disc | Ch. 4, Disc 1 |
| Ito source | *Frankenstein* |
| Status | Scripted and tuned in the prototype (2026-10-25) |
| CTB plan | — |

## The story

In the temple's lowest room hangs the hide of the last Beastcaller, still warm. It is empty, and it wants to be worn. Goku's hound is the only thing that can hold it open.

| Beat | In this fight |
| --- | --- |
| The ordinary detail | A hide on a hook, swinging an empty sleeve |
| Repetition | Hits pass through; it is empty |
| The page turn | It puts someone on, and while it is full it can be hurt |
| The cost | Goku spends the fight on her hound's leash, and the fur on her forearms grows |

## The lesson

- **Teaches:** damage gating: a boss that takes no damage until the right action opens it.
- **Scan hint:** "It needs something inside it."
- **Intended answer:** Goku's Summon Hound bites in and holds it open for 2 of its turns. During the hold Goku can't act and it thrashes at her, so Natsu keeps her up while Kiri deals the damage.
- **The obvious answer, and why it fails:** attacking. Every hit passes through an empty Pelt.
- **Needs at least two characters because:** Goku opens it but can't act while it is held; someone else must use the window and someone must keep her alive.

## Stats

| Foe | HP | ATK | DEF | MDEF | Speed | Crit | Part of |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Last Beastcaller's Pelt | 1300 | 64 | 6 | 6 | 10 | 10% | — |

Encounter level 6, starting Danger 15, default party Goku, Natsu, Kiri, default bag.

## Script

No HP phases: Disc 1 chapter bosses have none (design doc, *Boss mechanics*).

1. If the hound holds it open (reacts): **Thrash**: 1.3× ATK on Goku, ignores Provoke.
2. If this is its 4th, 8th, 12th… turn: **Put On**: 0.8× ATK and +15 Stress to the lowest HP%; it wears them and takes damage until its next turn.
3. Otherwise: **Empty Sleeve**: 1.3× ATK and +8 Stress.

It takes no damage unless the hound holds it or it is wearing someone. The hold lasts 2 of its turns, and ends early if Goku falls.

## Fairness checks

- [x] The card says whether it is empty, held (and for how many turns) or full.
- [x] Thrash shows Goku as its target while the hold lasts.
- [x] Put On comes on a fixed count.
- [x] The log says when a hit passes through.
- [x] Without Goku, Put On opens it every 4th turn (Kiri, Natsu, Miren: 100%, 107 commands).

## Disc rules

Disc 1: Scan shows the full script, no HP phases, statuses rare and 1 turn. **Rematch** (design doc, not built): the hold lasts 1 turn, and the Pelt's hits on Goku add 10 Stress.

## Helper

Goku Summons whenever the hold isn't up. While the Pelt is empty, Kiri uses Lullaby, Natsu Soothes, and everyone else Defends. When it is open, everyone hits it.

## Simulation

200 battles per policy, default party, 2026-10-25.

| Policy | Win | Party commands | Afflicted | KOs |
| --- | --- | --- | --- | --- |
| advisor | 100% | 33.5 | 0.00 | 0.00 |
| attack | 0% | — | 0.04 | 3.00 |
| random | 83% | 105.8 | 5.83 | 3.23 |

In band for wins and length. Afflicted is low because the empty turns go on Stress relief.

## Open questions

- The design doc names Kiri *and* Miren as the strikers alongside Goku and Natsu: four characters, with three active. The prototype uses Kiri, with Miren as the reserve.
