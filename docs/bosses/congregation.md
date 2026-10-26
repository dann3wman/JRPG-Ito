# Boss spec: The Congregation

| | |
| --- | --- |
| Key | `congregation` |
| Chapter and disc | Ch. 21, Disc 2 |
| Ito source | *Hellstar Remina* |
| Status | Scripted and tuned in the prototype (2026-10-25) |
| CTB plan | — |

## The story

The crowd that wanted Natsu burned has grown together in the square where she speaks. It stares at her.

| Beat | In this fight |
| --- | --- |
| The ordinary detail | A crowd watching a speaker |
| Repetition | Its stare: +10 Stress a turn, and no damage from whoever it watches |
| The page turn (50% HP) | It splits into three Faces, one for each of you |
| The cost | The crowds that wanted Natsu dead now ask her to speak for them |

## The lesson

- **Teaches:** bait: choose who the enemy watches, and attack from where it isn't looking.
- **Scan hint:** "Look where it isn't looking."
- **Intended answer:** Leave the stare on Natsu, who doesn't need to hit it. A striker's critical hit pulls the stare onto them; Swap them out and it finds someone else. After the split, each member hits a Face that isn't staring at them.
- **The obvious answer, and why it fails:** attacking with everyone. Whoever it stares at does nothing, and lucky crits keep moving the stare onto the strikers (`attack`: 4%).
- **Needs at least two characters because:** one character takes the stare while the others hit; after the split, each Face needs the other two.

## Stats

| Foe | HP | ATK | DEF | MDEF | Speed | Crit | Part of |
| --- | --- | --- | --- | --- | --- | --- | --- |
| The Congregation | 3400 | 84 | 14 | 14 | 10 | 10% | — |

Encounter level 24, starting Danger 25, default party Hisui, Natsu, Kiri, default bag.

## Script

One HP phase at 50%: it splits into 3 Faces.

It stares at one ally (Natsu first) and takes no damage from them; at the start of each of its turns the stare adds 10 Stress. Above 50%, a critical hit or a Limit Break pulls the stare onto whoever landed it. At 50% it splits into 3 Faces (two new, each 30% of its max HP), each staring at a different active ally.

Roll **Verdict** 60% (1.4× ATK, 30% Confuse for 2 turns) or **Murmur** 40% (Sound, +8 Stress).

## Fairness checks

- [x] Its card says whom it is staring at.
- [x] The log says when the stare moves and why.
- [x] Every roll shows its odds.
- [x] The log says when a hit does nothing.
- [x] Any party wins.

## Disc rules

Disc 2: Scan shows full stats and the hint; one phase at 50%; Confuse for 2 turns. **Rematch** (design doc, not built): the stare moves to whoever hit it last.

## Helper

Each member attacks the weakest Face not staring at them. A striker who is stared at Swaps out; Natsu, stared at, Soothes or heals.

## Simulation

200 battles per policy, default party, 2026-10-25.

| Policy | Win | Party commands | Afflicted | KOs |
| --- | --- | --- | --- | --- |
| advisor | 99% | 61.1 | 3.08 | 0.49 |
| attack | 4% | 65.8 | 4.67 | 3.11 |
| random | 30% | 100.1 | 8.47 | 3.12 |

In band, near the top of the length band. Afflicted is in band; flees run high.

## Open questions

- None.
