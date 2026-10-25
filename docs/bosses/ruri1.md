# Boss spec: Ruri (×1)

| | |
| --- | --- |
| Key | `ruri1` (foe `ruri`, with encounter stats) |
| Chapter and disc | Ch. 5, Disc 1 |
| Ito source | *Tomie* |
| Status | Scripted and tuned in the prototype (2026-10-25) |
| CTB plan | — |

## The story

On the docks of Vesk every sailor is fighting over a stranger. Miren laughs at her. She attacks, the party kills her, and her body slips into the harbour. She is the first of many.

| Beat | In this fight |
| --- | --- |
| The ordinary detail | A pretty stranger who slaps |
| Repetition | Charm works on whoever is closest to breaking |
| The page turn | None on Disc 1. The page turn is three chapters later, when two of her arrive |
| The cost | Her body slips into the harbour |

## The lesson

- **Teaches:** Stress targeting: Charm goes for whoever is closest to a Stress Check.
- **Scan hint:** "She knows who is weakest."
- **Intended answer:** Natsu Soothes whoever Charm is working on before they reach 100. Kiri and Miren attack.
- **The obvious answer, and why it fails:** all-out attack. It often works, because Disc 1 doesn't punish the obvious strategy; it costs HP and Stress Checks.
- **Needs at least two characters because:** a striker can't also keep the Charm target under a Stress Check.

## Stats

| Foe | HP | ATK | DEF | MDEF | Speed | Crit | Part of |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Ruri | 2600 | 100 | 8 | 8 | 15 | 15% | — |

Encounter level 7, starting Danger 15, default party Kiri, Natsu, Miren, default bag.

## Script

No HP phases: Disc 1 chapter bosses have none (design doc, *Boss mechanics*).

The shared Ruri script (see `docs/reference/game-data.md`). Alone, she rolls **Charm** 45% (54% if an ally is within 20 Stress of a check; +12 Stress to that ally) or **Slap** 55% (1.3× ATK, 15% crit). Her Spite phase needs a second Ruri, so it never triggers here. The encounter restates her stats for level 7: HP 2600, ATK 100, DEF 8, MDEF 8.

## Fairness checks

- [x] Charm shows its target in the turn order.
- [x] Every roll shows its odds.
- [x] No hidden phase.
- [x] The log names every Charm.
- [x] Any party wins it.

## Disc rules

Disc 1: Scan shows the full script, no HP phases, statuses rare and 1 turn. **Rematch** (design doc, not built): the Ruri Garden: the survivors all target the character who has killed the most of them.

## Helper

The default Helper.

## Simulation

200 battles per policy, default party, 2026-10-25.

| Policy | Win | Party commands | Afflicted | KOs |
| --- | --- | --- | --- | --- |
| advisor | 100% | 48.6 | 0.00 | 0.01 |
| attack | 49% | 43.4 | 0.46 | 2.00 |
| random | 87% | 78.6 | 2.90 | 2.27 |

`attack` is out of band. Ruri ×1 is the opening act of the Widow's chapter and introduces a recurring boss, so it stays simple. Disc 1 doesn't punish the obvious strategy.

## Open questions

- Should Ruri ×1 punish all-out attack? A Jealousy-free Ruri has only Charm and Slap; a third rule (Miren laughed: she hunts him) would give it a lesson of its own.
