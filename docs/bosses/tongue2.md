# Boss spec: The Tongue

| | |
| --- | --- |
| Key | `tongue2` (foe `licker`) |
| Chapter and disc | Ch. 20, Disc 2 |
| Ito source | *Hellstar Remina* |
| Status | Scripted and tuned in the prototype (2026-10-25) |
| CTB plan | — |

## The story

The thing that has listened to the hum for 400 years finds its way. Natsu's star drops until it fills the sky, and its tongue comes down into the Ear, takes Ainsel, and comes back down for the party.

| Beat | In this fight |
| --- | --- |
| The ordinary detail | A tongue |
| Repetition | It takes whoever is most afraid |
| The page turn (50% HP) | It takes two |
| The cost | Ainsel, gone at the moment of his triumph |

## The lesson

- **Teaches:** Stress as targeting: who is most afraid decides who it takes, and Swap brings in new tastes.
- **Scan hint:** "It wants new tastes."
- **Intended answer:** When it grabs someone, the two left hit it; whoever has already been tasted Swaps out for a reserve who hasn't, for the third taste. Natsu's Soothe decides whose Stress is highest when it grabs.
- **The obvious answer, and why it fails:** hitting it with the same two characters. It only lets go for tastes it hasn't had, and the held character is swallowed after 3 of its turns (`attack`: 0%).
- **Needs at least two characters because:** three different characters, by definition.

## Stats

| Foe | HP | ATK | DEF | MDEF | Speed | Crit | Part of |
| --- | --- | --- | --- | --- | --- | --- | --- |
| The Tongue | 3000 | 90 | 16 | 16 | 9 | 10% | — |

Encounter level 23, starting Danger 25, default party Kiri, Natsu, Hisui, default bag.

## Script

One HP phase at 50%: it grabs two at once.

1. If it is holding someone: roll **Lick** 60% (Rank 4, 1.3× ATK) or **Savour** 40% (Rank 4, +8 Stress to each free ally).
2. Otherwise: **Grab** (late target: whoever has the most Stress; ignores Provoke): 0.6× ATK and takes them out of the turn order. In phase 2 it takes the two with the most Stress.

At the start of each of its turns, each held ally gains 5 Stress; after 3 it swallows them (KO). It lets go of everyone once 3 different characters have hit it since the grab.

## Fairness checks

- [x] Grab's plan says "whoever has the most Stress"; Stress is on every card.
- [x] A held ally's card counts down to the swallow; the Tongue's card counts the tastes.
- [x] Every roll shows its odds.
- [x] The log names each taste.
- [x] Any party with reserves wins.

## Disc rules

Disc 2: Scan shows full stats and the hint; one phase at 50%. **Rematch** (design doc, not built): grabbed characters are KO'd after 2 turns and can't be revived by Phoenix Down until the battle ends.

## Helper

While it holds someone, anyone it hasn't tasted hits it, and anyone it has Swaps out for a reserve it hasn't.

## Simulation

200 battles per policy, default party, 2026-10-25.

| Policy | Win | Party commands | Afflicted | KOs |
| --- | --- | --- | --- | --- |
| advisor | 89% | 34.2 | 0.00 | 0.23 |
| attack | 0% | — | 0.00 | 2.00 |
| random | 0% | — | 0.07 | 3.17 |

In band. A party with all three held or down loses.

## Open questions

- The Tongue is Speed 9 with Rank 4 Lick and Savour. At the doc's pace, the three tastes didn't fit inside its 3 turns once it held two.
