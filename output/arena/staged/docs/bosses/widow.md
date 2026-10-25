# Boss spec: Tide-Widow

| | |
| --- | --- |
| Key | `widow` (part: `sailor`) |
| Chapter and disc | Ch. 5, Disc 1 |
| Ito source | *The Thing That Drifted Ashore*; the Drowned Sailors from *Gyo* |
| Status | Scripted (written up after the fact as the template's worked example) |
| CTB plan | — |

## The story

The tide in Vesk comes in and never goes out. Something huge has drifted into the harbour: a beached creature, pale enough to see through, with the town's drowned visible inside her body. She sings the way the harbour used to sound at night.

| Beat | In this fight |
| --- | --- |
| The ordinary detail | A lullaby, the harbour's own song (+14 Stress to all, +6 Danger) |
| Repetition | Undertow, the tide coming in: whoever is about to act is dragged 3 slots back |
| The page turn (50% HP) | Release: her body opens and two Drowned Sailors crawl out |
| The cost | The Sailors re-form 3 of her turns after they fall: the drowned keep coming home. Her daughter Hisui joins after the fight |

## The lesson

- **Teaches:** the turn order decides who Undertow takes, and Stress is a resource to manage across a long fight.
- **Scan hint:** "The tide takes whoever moves next."
- **Intended answer:** read the turn order before her turn and let Tetsugi (most HP, no Stress from KOs) be the one about to act. Natsu Soothes after each Lullaby, and Kiri's Spiral Cut grows as the Lullabies push Danger up.
- **The obvious answer, and why it fails:** all-out attack. Lullaby and Undertow's push Stress pile up into Stress Checks, and at 75% Afflicted odds the party breaks before she does (`attack` wins 8%).
- **Needs at least two characters because:** intended: a striker can't also manage Stress. Measured: it doesn't yet (see open questions).

## Stats

| Foe | HP | ATK | DEF | MDEF | Speed | Crit | Part of |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Tide-Widow | 3200 | 105 | 7 | 6 | 11 | 15% (Attack) | — |
| Drowned Sailor | 390 | 45 | 4 | 4 | 9 | 8% (Attack) | Tide-Widow |

Encounter level 8, starting Danger 20, default party Kiri, Natsu, Tetsugi, default bag.

## Script

| Phase | When | Entry | What changes |
| --- | --- | --- | --- |
| p1 | Above 50% HP | — | Roll: Lullaby 25, Undertow 25, Attack 50 |
| p2 | 50% HP or below | Release (uses her turn) | Roll: Lullaby 20, Undertow 45, Attack 35 |

Sailors: Attack 50, or Stench 50 (150 if an ally is within 25 Stress of a Stress Check or fleeing). Stench targets that ally: light damage, +8 Stress.

| Skill | Rank | Tags | Target | Power | Effect |
| --- | --- | --- | --- | --- | --- |
| Attack | 3 | Physical | random | 1.4× ATK | 15% crit |
| Undertow | 4 | Physical, Delay | next (late) | 0.6× ATK | Pushed back 3 slots (+12 Stress) |
| Lullaby | 5 | Sound, Stress | all | — | +14 Stress each, +6 Danger |
| Release | 4 | Summon, Phase | none | — | 2 Drowned Sailors; each re-forms 3 of her turns after defeat |

## Fairness checks

- [x] The plan and target of every action show in the turn order (Undertow shows "→ whoever acts next").
- [x] Phase 1 teaches Undertow and Lullaby before phase 2 doubles Undertow's weight.
- [x] Every random effect shows its odds in the info panel.
- [x] The trick can be learned from the log alone ("pushed back 3").
- [x] A party without Natsu can still win. Kiri, Tetsugi and Kugai: 100%, in 62 commands.

## Disc rules

Disc 1: Scan shows everything, one phase, no status effects. **Rematch** (design doc): Undertow has a 30% chance of Sleep, 2 more Sailors at 20%, and each Sailor killed heals her 5%.

## Helper

`adviseFocus` targets a Sailor that is almost dead, else the Widow herself (Sailors re-form, so damage on her counts most).

## Simulation

200 battles, default party, 2026-10-25.

| Policy | Win | Party commands | Afflicted | KOs |
| --- | --- | --- | --- | --- |
| advisor | 100% | 84 | 1.6 | 0.07 |
| attack | 8% | — | — | — |
| random | 48% | 145 | 8.5 | 3.2 |

Against targets: win rates are in band (advisor ≥ 90%, attack ≤ 25%). Length is out of band: 84 commands against a Disc 1 ceiling of 60.

## Open questions

- **The healer is optional.** Swapping Natsu for Kugai still wins 100%, and faster (62 commands, 1.1 Afflicted). The design doc asks every chapter boss to need two characters working together; this one only needs damage. Making Lullaby or Undertow's Stress heavier in phase 2 would make Soothe the answer it is meant to be.

- **Length.** 3200 HP against about 65 damage per Attack at level 8. Cutting HP to about 2300 would land near 60 commands; check that Afflicted stays above 1 (the endurance is what makes Lullaby matter).
- **Lullaby isn't in the design doc.** It is the fight's Stress engine, so it should be added to the doc's Ch. 5 entry or replaced with something the doc names.
