# Boss spec: Taste of Ostrel

| | |
| --- | --- |
| Key | `taste` (parts: `sleeper` ×4) |
| Chapter and disc | Ch. 22, Disc 2 (end of disc) |
| Ito source | *Uzumaki* |
| Status | Scripted and tuned in the prototype (2026-10-25) |
| CTB plan | — |

## The story

The Hellstar licks Ostrel off the map. The party fights on the tongue's surface, where the village's sleepers have fused into it, still humming.

| Beat | In this fight |
| --- | --- |
| The ordinary detail | Sleepers humming the note |
| Repetition | Every hum heals it |
| The page turn (50% HP) | Kiri's own sleeping body rises, humming them back to sleep |
| The cost | Kiri watches her body rise into the star's mouth with the village |

## The lesson

- **Teaches:** wake them all at once: area action timed against a regenerating enemy.
- **Scan hint:** "Wake them all at once."
- **Intended answer:** Kuro's Darkga wakes every Sleeper in one action (10 Stress, once). With all four awake the Taste can't heal for 2 of its turns, and Kiri and Kuro hit it. In phase 2 Sayo saves Counter-Melody for Kiri's Lullaby.
- **The obvious answer, and why it fails:** attacking the Taste. Four humming Sleepers heal it 20% a turn (`attack`: 0%).
- **Needs at least two characters because:** Darkga wakes them; the damage and the Counter-Melody come from others.

## Stats

| Foe | HP | ATK | DEF | MDEF | Speed | Crit | Part of |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Taste of Ostrel | 3800 | 100 | 16 | 16 | 10 | 10% | — |
| Sleeper | 1 | 0 | 0 | 0 | 1 | 10% | Taste of Ostrel |

Encounter level 25, starting Danger 20, default party Kuro, Sayo, Kiri, default bag.

## Script

One HP phase at 50%: Kiri's sleeping body hums a Lullaby every other turn.

At the start of each of its turns it heals 5% for each humming Sleeper; then each awake Sleeper counts down.

1. Phase 2, every other turn: **Kiri's Lullaby** (Sound): every Sleeper falls back asleep.
2. Otherwise roll **Lap** 60% (1.4× ATK) or **Village Note** 40% (Sound, +10 Stress).

**Sleeper** ×4 (no turns; can't be KO'd): a hit wakes it for 2 of the Taste's turns, deals no damage, and adds 10 Stress to the ally who woke it (once per action).

## Fairness checks

- [x] Each Sleeper's card says humming or awake, and for how long.
- [x] The Taste's card counts the humming Sleepers.
- [x] Kiri's Lullaby shows in the turn order and is a sound attack.
- [x] The log names each heal.
- [x] Without Kuro, single hits wake them one at a time: slower and costlier (Sayo, Kiri, Hisui: 40%).

## Disc rules

Disc 2: Scan shows full stats and the hint; one phase at 50%. **Rematch** (design doc, not built): Sleepers drift back after 1 turn.

## Helper

Kuro casts Darkga when 2 or more Sleepers hum, and otherwise Darks the Taste. Without Kuro, the others wake humming Sleepers one by one. Sayo blocks Kiri's Lullaby.

## Simulation

200 battles per policy, default party, 2026-10-25.

| Policy | Win | Party commands | Afflicted | KOs |
| --- | --- | --- | --- | --- |
| advisor | 100% | 36.5 | 0.00 | 0.01 |
| attack | 2% | 196.8 | 2.77 | 2.99 |
| random | 63% | 177.1 | 8.01 | 3.64 |

Easy for the Helper (100%, above the 80–95% band): once Darkga keeps every Sleeper awake, the Taste can't heal. `attack` fails. Each Sleeper stays awake for good after its fourth waking, which keeps every fight finite.

## Open questions

- One Darkga waking four villagers costs 10 Stress, not 40: the doc's per-hit rule made the intended answer the most punishing one.
- A Sleeper woken a fourth time stays awake for good. Without that, a party that falls behind could be out-healed forever (the simulator hit its 300-command cap).
