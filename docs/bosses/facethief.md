# Boss spec: The Face Thief

| | |
| --- | --- |
| Key | `facethief` |
| Chapter and disc | Ch. 18, Disc 2 |
| Ito source | *The Face Burglar* |
| Status | Scripted and tuned in the prototype (2026-10-25) |
| CTB plan | — |

## The story

In Ostrel's empty houses someone has been taking the sleepers' faces. Kiri has just learned she is a copy from the first save point she ever touched. The thief wants her face next.

| Beat | In this fight |
| --- | --- |
| The ordinary detail | A woman who looks at you a moment too long |
| Repetition | Each look takes a feature |
| The page turn (50% HP) | She looks only at Kiri, and only her brother can give her face back |
| The cost | Tetsugi, feathered and smiling, putting his sister's face back on |

## The lesson

- **Teaches:** a heal and a hit in the same round, from two characters.
- **Scan hint:** "Give them back their faces."
- **Intended answer:** Natsu heals whoever lost a feature, and anyone hits the Thief before her next turn: the feature comes back. From 50% only Tetsugi's Chakra, aimed at Kiri in this fight, can bring Kiri's back.
- **The obvious answer, and why it fails:** all-out attack. Features don't come back, everyone's stats fall 20% per feature, and every face she completes heals her 25% (`attack`: 0%).
- **Needs at least two characters because:** a healer and a hitter, in the same round.

## Stats

| Foe | HP | ATK | DEF | MDEF | Speed | Crit | Part of |
| --- | --- | --- | --- | --- | --- | --- | --- |
| The Face Thief | 2800 | 80 | 14 | 14 | 7 | 10% | — |

Encounter level 22, starting Danger 25, default party Kiri, Tetsugi, Natsu, default bag.

## Script

One HP phase at 50%: she stares only at Kiri; only Tetsugi's Chakra returns Kiri's features.

1. Phase 2, if Kiri is fighting: **Stare** → Kiri.
2. Otherwise: **Stare** → a random ally.

**Stare**: takes the next feature (eyes, nose, mouth): −20% ATK, DEF and MAG each, +10 Stress, 30% chance of Confuse for 2 turns. The third KOs them (their face comes back with them) and heals her 25%.

A round is the time between two of her turns. A heal on a faceless ally plus any hit on her in the same round returns one feature.

## Fairness checks

- [x] Stare's target shows in the turn order.
- [x] Missing features show on the ally's card (via their stats) and in the log.
- [x] The Confuse chance is stated.
- [x] The log says when a feature comes back, and when only Chakra will do.
- [x] Without Tetsugi, Kiri's face can't come back after 50%, but Phoenix Down returns it (Kiri, Natsu, Hisui: 45%).

## Disc rules

Disc 2: Scan shows full stats and the hint; one phase at 50%; Confuse for 2 turns. **Rematch** (design doc, not built): a character missing two features can only be healed by Tetsugi.

## Helper

Natsu Cures a faceless ally not yet healed this round. Tetsugi Chakras Kiri in phase 2, or anyone Natsu can't reach. A striker spends a Potion on someone one feature from KO when Natsu can't help.

## Simulation

200 battles per policy, default party, 2026-10-25.

| Policy | Win | Party commands | Afflicted | KOs |
| --- | --- | --- | --- | --- |
| advisor | 88% | 64.3 | 0.81 | 1.36 |
| attack | 0% | — | 0.00 | 3.00 |
| random | 0% | — | 0.67 | 4.64 |

In band.

## Open questions

- None.
