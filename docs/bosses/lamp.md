# Boss spec: Lamp Hollow

| | |
| --- | --- |
| Key | `lamp` (parts: `wick` ×3) |
| Chapter and disc | Ch. 6, Disc 1 |
| Ito source | *Long Hair in the Attic* |
| Status | Scripted and tuned in the prototype (2026-10-25) |
| CTB plan | — |

## The story

The lamps on Kuro's street have started burning something other than oil. The wicks are hair. The Hollow is the lamp they all hang from, and nothing touches it while one of them still burns.

| Beat | In this fight |
| --- | --- |
| The ordinary detail | Street lamps that gutter and spit |
| Repetition | Put out a Wick and the next Wick relights it |
| The page turn | Every Wick out at once: the Hollow goes dark, and for 2 of its turns it can be hurt |
| The cost | Kuro spends rooms in her house for every Darkga |

## The lesson

- **Teaches:** area damage has a setup: weaken every target first, then finish them in one action.
- **Scan hint:** "Put them all out together."
- **Intended answer:** Kiri and Hisui bring each Wick below what Darkga can put out, without putting any out. Kuro casts Darkga and all three go out at once. The Hollow is dark for 2 of its turns, and everyone hits it.
- **The obvious answer, and why it fails:** killing Wicks one at a time. The next Wick's turn relights it at full HP. And Darkga on fresh Wicks leaves each at 1 HP, because Darkga can't put out a Wick at full HP.
- **Needs at least two characters because:** Darkga needs the Wicks weakened first, and the dark window needs damage from more than Kuro.

## Stats

| Foe | HP | ATK | DEF | MDEF | Speed | Crit | Part of |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Lamp Hollow | 1000 | 62 | 8 | 8 | 9 | 10% | — |
| Wick | 220 | 32 | 4 | 4 | 12 | 10% | Lamp Hollow |

Encounter level 10, starting Danger 20, default party Kuro, Hisui, Kiri, default bag.

## Script

No HP phases: Disc 1 chapter bosses have none (design doc, *Boss mechanics*).

**Lamp Hollow** (takes no damage while any Wick is lit):

1. If it is dark (reacts): **Grope**: 1.0× ATK.
2. If this is its 3rd, 6th, 9th… turn: **Lamp Smoke**: +14 Stress to each ally, +4 Danger.
3. Otherwise: **Flare**: 1.5× ATK, 10% crit.

When the last Wick goes out it is dark for 2 of its turns; after the second it relights every Wick.

**Wick:**

1. If another Wick is out (reacts): **Relight**: one Wick back at full HP, from this Wick's flame (it drops to half its HP).
2. Otherwise roll **Gutter** 55% (0.7× ATK, +6 Stress) or **Spit Oil** 45% (1.2× ATK).

An all-enemy attack can't put out a Wick at full HP: it stays lit at 1 HP.

## Fairness checks

- [x] The Hollow's card counts the lit Wicks and says when it is dark.
- [x] Relight shows in the turn order the moment a Wick goes out (reacts).
- [x] The full-flame rule is in the Wick's notes and the log.
- [x] The log says when the Hollow takes no damage, and why.
- [x] Without Kuro it is slower and costlier but not locked: Relight halves the relighting Wick, so a burst of single hits catches up (Hisui, Kiri, Natsu: 45%, 136 commands).

## Disc rules

Disc 1: Scan shows the full script, no HP phases, statuses rare and 1 turn. **Rematch** (design doc, not built): the dark window lasts 1 turn, and each relit Wick adds 5 Danger.

## Helper

`darkgaReach()` estimates what Darkga can put out. Others hit the highest Wick above that line and Defend once all are under it. Kuro casts Darkga when every Wick is under it and none is at full flame. Without Kuro the line is one hit (100 HP), then the Helper puts them out in a burst.

## Simulation

200 battles per policy, default party, 2026-10-25.

| Policy | Win | Party commands | Afflicted | KOs |
| --- | --- | --- | --- | --- |
| advisor | 99% | 50.9 | 0.70 | 0.20 |
| attack | 0% | — | 1.02 | 3.00 |
| random | 5% | 76.3 | 5.83 | 5.30 |

In band. The intended party's Afflicted sits near the band's floor; without Kuro, Stress decides the fight.

## Open questions

- Without Kuro the fight is near the edge of a hard-lock (45%). Kuro joins in this chapter, so the default party always has her.
