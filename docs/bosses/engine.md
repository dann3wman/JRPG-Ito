# Boss spec: Resonance Engine Mk. IV

| | |
| --- | --- |
| Key | `engine` |
| Chapter and disc | Ch. 14, Disc 2 |
| Ito source | *Gyo* |
| Status | Scripted and tuned in the prototype (2026-10-25) |
| CTB plan | — |

## The story

Varn's Resonance engines walk on the bodies of the people humming inside them. The Mk. IV is the newest. It starts slowly, like something waking.

| Beat | In this fight |
| --- | --- |
| The ordinary detail | A slow machine |
| Repetition | Every 3rd turn the people inside hum (+16 Stress) |
| The page turn (50% HP) | Overclock: every turn comes 2 slots sooner |
| The cost | Kugai stands among Ilda's guards and watches the party do it |

## The lesson

- **Teaches:** Delay and Break: a fast enemy is a damage problem you solve with time.
- **Scan hint:** "It runs faster when it is hurt."
- **Intended answer:** Ren's Delay Shot keeps it slow, and two in a row Break it for +50% damage. Hisui hits hardest in the Break window, Natsu cures Paralyze victims' HP and Soothes after Resonance.
- **The obvious answer, and why it fails:** all-out attack. Below 50% it acts much more often, and Stomp's Paralyze takes your turns away (`attack`: 2%).
- **Needs at least two characters because:** Ren can buy the time but can't deal the damage; the strikers need the time.

## Stats

| Foe | HP | ATK | DEF | MDEF | Speed | Crit | Part of |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Resonance Engine Mk. IV | 5000 | 150 | 22 | 14 | 6 | 10% | — |

Encounter level 21, starting Danger 25, default party Ren, Hisui, Natsu, default bag.

## Script

One HP phase at 50%: overclocked, each turn comes 2 slots sooner.

1. If this is its 3rd, 6th, 9th… turn: **Resonance** (Rank 4, Sound): +16 Stress to each ally, +5 Danger.
2. Phase 1: **Stomp** (Rank 4): 1.7× ATK, 20% chance of Paralyze for 2 turns.
3. Phase 2: roll Stomp 55%, **Trample** 45% (1.0× ATK to each ally).

In phase 2, after each turn, its next turn comes 2 slots sooner.

## Fairness checks

- [x] Its card says when it is overclocked.
- [x] Paralyze shows on the card and in the turn order.
- [x] Every roll shows its odds.
- [x] The log names every Paralyze.
- [x] Without Ren it is a slower slugging match (Hisui, Kiri, Natsu: 100%, 52 commands).

## Disc rules

Disc 2: Scan shows full stats and the hint; one phase at 50%; Paralyze for 2 turns. **Rematch** (design doc, not built): below 20% HP it can act twice in a row and ignores Delay attacks.

## Helper

The default Helper: Ren always Delay Shots the foe that acts soonest; Sayo, if present, blocks Resonance.

## Simulation

200 battles per policy, default party, 2026-10-25.

| Policy | Win | Party commands | Afflicted | KOs |
| --- | --- | --- | --- | --- |
| advisor | 100% | 37.6 | 0.00 | 0.00 |
| attack | 2% | 55.3 | 0.34 | 2.98 |
| random | 81% | 85.9 | 1.48 | 2.40 |

Easy for the Helper (above the 80–95% band) but `attack` fails, so the lesson holds. Stress rarely reaches a check.

## Open questions

- Should it be harder? Its threat is speed, and Ren answers speed completely. A Disc 2 twist (Delay pushes it back only 1 slot while it is overclocked) would make the Break timing matter more.
