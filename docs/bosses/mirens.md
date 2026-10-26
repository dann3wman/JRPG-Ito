# Boss spec: The Mirens

| | |
| --- | --- |
| Key | `mirenslot` (parts: `mirencopy` ×4) |
| Chapter and disc | Ch. 16, Disc 2 |
| Ito source | *Tomie* |
| Status | Scripted and tuned in the prototype (2026-10-25) |
| CTB plan | — |

## The story

Miren's copies have multiplied at every save point. There are now five, arguing over which of them keeps the name.

| Beat | In this fight |
| --- | --- |
| The ordinary detail | Miren, four more times |
| Repetition | Every time he moves, they move |
| The page turn | The last two never touch the ground |
| The cost | Each one that falls, the real Miren feels it |

## The lesson

- **Teaches:** your own action can trigger the enemy: choose when to act.
- **Scan hint:** "Every time he moves, they move."
- **Intended answer:** Miren Jumps, which takes him out of the turn order so his copies get no extra turns, and lands for 3.2×. Kuro's Darkga hits every copy on the ground; strikers finish the ones that just landed.
- **The obvious answer, and why it fails:** Miren attacking every turn. Each of his actions gives the copies a turn (`attack`: 0%).
- **Needs at least two characters because:** Darkga thins them but can't reach the airborne ones; someone has to catch them when they land.

## Stats

| Foe | HP | ATK | DEF | MDEF | Speed | Crit | Part of |
| --- | --- | --- | --- | --- | --- | --- | --- |
| The Mirens' Turn | 1 | 0 | 0 | 0 | 8 | 10% | — |
| Miren | 1300 | 82 | 16 | 12 | 14 | 10% | The Mirens' Turn |

Encounter level 22, starting Danger 25, default party Miren, Kuro, Natsu, default bag.

## Script

One phase change: with 2 copies or fewer left, they Jump every turn.

**The Mirens' Turn** (one turn among the copies; untargetable). Each turn the next copy in line acts: if it is in the air it **Lands** on its chosen target (3.2× ATK); otherwise it **Jumps** (40%, always in phase 2) or thrusts with its **Spear** (1.4× ATK, +10 Stress). Every time the real Miren acts, this turn comes up right after him.

**Miren** ×4 (no turns of their own; can't be targeted in the air). Each one defeated pushes the real Miren back 2 slots.

## Fairness checks

- [x] The shared turn shows which copy acts next and what it will do.
- [x] An airborne copy's card says whom it will land on.
- [x] The Jump chance is stated.
- [x] The log shows the copies answering Miren.
- [x] Without Miren the copies act on their own clock (Kuro, Kiri, Natsu: 100%, 42 commands).

## Disc rules

Disc 2: Scan shows full stats and the hint; one phase change. **Rematch** (design doc, not built): each copy defeated makes the rest act 1 slot sooner.

## Helper

Miren Jumps unless a copy is low enough for a plain hit to finish. Kuro casts Darkga; everyone else hits the weakest copy on the ground.

## Simulation

200 battles per policy, default party, 2026-10-25.

| Policy | Win | Party commands | Afflicted | KOs |
| --- | --- | --- | --- | --- |
| advisor | 100% | 35.8 | 0.12 | 0.03 |
| attack | 0% | — | 0.16 | 3.00 |
| random | 86% | 68.0 | 1.10 | 2.66 |

Easy for the Helper (above band); `attack` fails.

## Open questions

- The doc's "share Miren's turn slot" is built as one turn among the copies that also answers each of Miren's actions. A literal shared slot (the copies act *instead of* Miren) would be harsher and needs engine work.
