# Boss spec: The Well-Rested

| | |
| --- | --- |
| Key | `rested` ×4 (splits up to 6) |
| Chapter and disc | Ch. 7, Disc 1 |
| Ito source | *The Long Dream* |
| Status | Scripted and tuned in the prototype (2026-10-25) |
| CTB plan | — |

## The story

In the flooded ruins, glowing circles invite travellers to rest. A traveller who rested at the same circle for years has become a crowd of himself, all asleep, all breathing together. Miren rested at one last night. There are two Mirens now.

| Beat | In this fight |
| --- | --- |
| The ordinary detail | Sleepers in a row, snoring |
| Repetition | Hit the wrong one and another rolls out of it |
| The page turn | Lullaby: every copy closes its eyes, and one does not |
| The cost | The save point itself is the threat. Miren's copy follows at a distance |

## The lesson

- **Teaches:** identify the real target before committing damage; a support skill can be the reveal.
- **Scan hint:** "One of them never sleeps."
- **Intended answer:** Kiri casts Lullaby: every copy sleeps for 2 of its turns and the original stays awake. Miren and Natsu hit the one still awake while the copies sleep and can't rest it.
- **The obvious answer, and why it fails:** attacking a random sleeper. A copy takes no damage and splits off a new, unknown sleeper (up to 6), and every sleeper's turn rests the original 1.5%.
- **Needs at least two characters because:** Kiri's Lullaby reveals the original but she can't do the damage in the window alone.

## Stats

| Foe | HP | ATK | DEF | MDEF | Speed | Crit | Part of |
| --- | --- | --- | --- | --- | --- | --- | --- |
| The Well-Rested | 1800 | 60 | 8 | 8 | 10 | 10% | — |

Encounter level 12, starting Danger 20, default party Kiri, Miren, Natsu, default bag.

## Script

No HP phases: Disc 1 chapter bosses have none (design doc, *Boss mechanics*).

Every body runs the same script, so the turn order can't tell them apart. **Yawn** 65% (0.9× ATK, 10% chance of Sleep for 1 turn) or **Snore** 35% (Sound, +10 Stress to each ally who can hear it). At the start of each sleeper's turn the original rests +1.5% HP.

Only the original takes damage. A hit on a copy marks it as a copy, wakes it and splits off a new sleeper (up to 6 bodies). Kiri's Lullaby puts every copy to sleep for 2 of its turns and marks the original. Every body shows the original's HP, and the copies fall with it.

## Fairness checks

- [x] Sleeping copies show "Asleep" in the turn order, so the one still awake is readable.
- [x] Marked bodies say "A copy" or "The original" on their cards.
- [x] The Sleep chance on Yawn is stated.
- [x] The log names every split and every rest.
- [x] Without Kiri, guessing is slow but works (Miren, Natsu, Hisui: 63%, 58 commands).

## Disc rules

Disc 1: Scan shows the full script, no HP phases, statuses rare and 1 turn. **Rematch** (design doc, not built): copies wake after 1 turn, and the original swaps places with a copy each time they do.

## Helper

Kiri casts Lullaby when 2 or more copies are awake. Everyone else hits the marked original, or an unmarked sleeper at random.

## Simulation

200 battles per policy, default party, 2026-10-25.

| Policy | Win | Party commands | Afflicted | KOs |
| --- | --- | --- | --- | --- |
| advisor | 100% | 35.8 | 0.01 | 0.00 |
| attack | 0% | — | 4.48 | 3.00 |
| random | 0% | — | 8.13 | 4.55 |

In band for wins and length; Afflicted is low with Kiri in the party.

## Open questions

- Party Sleep is a minimal status (skip the next turn; a hit wakes you). The general inflicted-status system (implementation status, engine work) should replace it.
