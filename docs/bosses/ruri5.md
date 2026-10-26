# Boss spec: Ruri ×5 and Ruri ×8

| | |
| --- | --- |
| Key | `ruri5`, `ruri8` (foe `ruri`, with encounter stats) |
| Chapter and disc | Ch. 14 and Ch. 17, Disc 2 |
| Ito source | *Tomie* |
| Status | Scripted and tuned in the prototype (2026-10-25) |
| CTB plan | — |

## The story

Empress Ilda's court keeps five Ruris, each convinced she is the favourite. Three chapters later, eight storm the square where Natsu is on trial, furious that the world is talking about another girl.

| Beat | In this fight |
| --- | --- |
| The ordinary detail | A crowd of the same beautiful face |
| Repetition | They claw at each other as much as at you |
| The page turn | Half of them fall, and the rest stop fighting each other and look at you |
| The cost | There are always more of her |

## The lesson

- **Teaches:** use the enemy's infighting: spread damage so no half falls early, then clean up.
- **Scan hint:** "Let them fight each other."
- **Intended answer:** Kuro's Darkga keeps the crowd thin and even, so the copies keep turning on each other. Natsu Soothes whoever Charm is working on.
- **The obvious answer, and why it fails:** focusing one Ruri at a time. Their Jealousy falls on the weakest copy, and once half are down the rest stop fighting each other and turn on the party together.
- **Needs at least two characters because:** Darkga thins the crowd; Charm needs a Soother.

## Stats

| Foe | HP | ATK | DEF | MDEF | Speed | Crit | Part of |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Ruri | 2000 | 95 | 10 | 10 | 15 | 15% | — |

Encounter level 21, starting Danger 25, default party Kuro, Natsu, Hisui, default bag.

## Script

The Ruri script's phase is "last Ruri standing" (Spite, ATK +30%). The Disc 2 change is the truce rule below.

The shared Ruri script (`docs/reference/game-data.md`), plus the Ch. 14 rule: in a crowd of 5 or more, once half are down, Jealousy stops. Encounter stats: ×5 at HP 2000, ATK 95; ×8 at HP 1500, ATK 90 (DEF and MDEF 10).

## Fairness checks

- [x] Each Ruri's plan shows in the turn order.
- [x] The truce rule is the first rule's own label.
- [x] Jealousy's odds are in the info panel.
- [x] The log shows them attacking each other.
- [x] Any party wins.

## Disc rules

Disc 2: Scan shows full stats and the hint; the truce is the turn. **Rematch** (design doc, not built): the Ruri Garden: the survivors all target the character who has killed the most of them.

## Helper

The default Helper: Kuro casts Darkga against several foes, Natsu Soothes and Cures.

## Simulation

200 battles per policy, default party, 2026-10-25.

| Policy | Win | Party commands | Afflicted | KOs |
| --- | --- | --- | --- | --- |
| advisor | 99% | 34.6 | 1.03 | 0.44 |
| attack | 0% | — | 1.18 | 3.01 |
| random | 52% | 61.6 | 3.33 | 3.37 |

In band. The tables show Ruri ×5; Ruri ×8 is in `docs/implementation-status.md`.

## Open questions

- Not a Scan hint per se: Ruri's script is shared across chapters, so it has no `hint` field. One per encounter would need the hint to move to `ENCOUNTERS`.
