# Boss spec: Rewound Wolf

| | |
| --- | --- |
| Key | `wolf` (second slot: `wolfdead`) |
| Chapter and disc | Ch. 2, Disc 1 |
| Ito source | *A Gentle Goodbye* |
| Status | Scripted and tuned in the prototype (2026-10-25) |
| CTB plan | — |

## The story

On the road out of Ostrel a wolf keeps dying and getting up again. Its body lies on the road even while it runs at you. Like the family's afterimages in *A Gentle Goodbye*, the dead one is still there, taking its turn.

| Beat | In this fight |
| --- | --- |
| The ordinary detail | A wolf: Bite and Hamstring |
| Repetition | Its dead body takes a turn of its own and counts back (+6 Stress) |
| The page turn | Kill the wolf and the dead slot jumps forward and gets it up again, stronger |
| The cost | Winning means holding a dead thing down until it stays dead |

## The lesson

- **Teaches:** one unit can have two slots in the turn order, and the second one matters most after the first falls.
- **Scan hint:** "The dead one still takes its turn."
- **Intended answer:** When the wolf is below about 40% HP, Natsu hits the dead slot to pin it, then Kiri and Miren finish the wolf before the dead slot's next turn. The pin wears off if that turn comes while the wolf still stands, so the timing matters.
- **The obvious answer, and why it fails:** all-out attack on the wolf. When it falls, the dead slot acts within 1 slot and gets it up at 75% HP with +20% ATK, so the wolf snowballs.
- **Needs at least two characters because:** one member pins and another makes the kill inside the same window. One character alone can't do both before the dead slot acts.

## Stats

| Foe | HP | ATK | DEF | MDEF | Speed | Crit | Part of |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Rewound Wolf | 950 | 56 | 5 | 5 | 14 | 12% | — |
| The Dead Wolf | 1 | 0 | 0 | 0 | 11 | 10% | — |

Encounter level 3, starting Danger 10, default party Kiri, Natsu, Miren, default bag.

## Script

No HP phases: Disc 1 chapter bosses have none (design doc, *Boss mechanics*).

**Rewound Wolf:** roll **Bite** 65% (1.5× ATK, 12% crit) or **Hamstring** 35% (0.9× ATK on the lowest HP%, pushed back 1). When it falls, the dead slot's turn comes forward to within 1 slot.

**The Dead Wolf** (takes no damage; any hit pins it until its next turn):

1. If the wolf is down and it is pinned (reacts): **Stays Dead**. The fight ends.
2. If the wolf is down (reacts): **Rewind**: the wolf gets up at 75% HP with +20% ATK per time, +8 Stress to each ally.
3. Otherwise: **Count Back**: +6 Stress to each ally, and the pin wears off.

## Fairness checks

- [x] The dead slot's plan shows in the turn order and changes the moment the wolf falls or it is pinned (reacts).
- [x] The card says whether it is pinned.
- [x] Every roll shows its odds.
- [x] The log says when its turn comes forward and when a pin wears off.
- [x] Any party wins it; it only needs two members to coordinate.

## Disc rules

Disc 1: Scan shows the full script, no HP phases, statuses rare and 1 turn. **Rematch** (design doc, not built): if the dead slot is ignored for 3 turns, the wolf revives at full HP with Cheer.

## Helper

`adviseEncounter`: with the wolf down, hit the dead slot. With the wolf at 40% HP or less and no pin, Natsu (or the weakest hitter) pins it. `adviseFocus` never wastes damage on the dead slot otherwise.

## Simulation

200 battles per policy, default party, 2026-10-25.

| Policy | Win | Party commands | Afflicted | KOs |
| --- | --- | --- | --- | --- |
| advisor | 99% | 31.6 | 0.39 | 0.24 |
| attack | 20% | 32.5 | 0.86 | 2.59 |
| random | 51% | 76.7 | 5.71 | 3.73 |

In band. An `attack` win happens when random targeting happens to pin the dead slot first: the right answer, found by luck.

## Open questions

- None.
