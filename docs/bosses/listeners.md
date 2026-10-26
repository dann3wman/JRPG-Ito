# Boss spec: The Hundred Listeners

| | |
| --- | --- |
| Key | `abbot` (parts: `listener` ×3) |
| Chapter and disc | Ch. 15, Disc 2 |
| Ito source | *Tombs* |
| Status | Scripted and tuned in the prototype (2026-10-25) |
| CTB plan | — |

## The story

Beneath the drill site Varn's crews break into a sunken monastery. A hundred monks starved themselves still so they would hear the Ear first. They are already dead. They are still listening.

| Beat | In this fight |
| --- | --- |
| The ordinary detail | Monks at prayer |
| Repetition | Knock one down and it climbs back out of its coffin |
| The page turn (50% HP) | The Abbot opens the sealed coffins again |
| The cost | The party spends its potions burying the dead |

## The lesson

- **Teaches:** two different characters doing two different things in the same round.
- **Scan hint:** "Put them back to rest."
- **Intended answer:** Kiri or Hisui knocks a Listener into its coffin; before the Abbot's next turn someone else seals it with an item (Earplugs first, then Potions). With all three sealed, the Abbot can be hit.
- **The obvious answer, and why it fails:** attacking. Listeners only go into their coffins, and every coffin left unsealed opens at the Abbot's turn (`attack`: 0%).
- **Needs at least two characters because:** the character who knocked a Listener in can't seal its coffin.

## Stats

| Foe | HP | ATK | DEF | MDEF | Speed | Crit | Part of |
| --- | --- | --- | --- | --- | --- | --- | --- |
| The Abbot | 2000 | 90 | 14 | 14 | 7 | 10% | — |
| Lead Listener | 450 | 66 | 8 | 8 | 9 | 10% | The Abbot |

Encounter level 21, starting Danger 25, default party Kiri, Hisui, Natsu, default bag.

## Script

One HP phase at 50%: every 2nd turn he reopens a sealed coffin.

**The Abbot** (can't be targeted while a Listener stands outside its coffin). At the start of each of his turns every unsealed coffin opens and its Listener climbs out at full HP. Roll **Chant** 50% (Sound, Rank 4, +12 Stress) or **Prayer Staff** 50% (Rank 4, 1.5× ATK).

**Lead Listener:** at 0 HP it is knocked into its coffin instead of dying. Any item from an ally who didn't knock it in seals it. Otherwise roll **Dry Touch** 70% (1.2× ATK, 20% Paralyze for 2 turns) or **Listen** 30% (+10 Stress to the ally closest to a check). In its coffin it **Lies Still**.

## Fairness checks

- [x] A coffined Listener's card says who can seal it.
- [x] The item menu offers the coffin as a target, and only to allies who may seal it.
- [x] Every roll shows its odds.
- [x] The log names every knock, seal and reopening.
- [x] Any party with items wins; Fuyori's Mix makes it easier.

## Disc rules

Disc 2: Scan shows full stats and the hint; one phase at 50%; Paralyze for 2 turns. The round is the time between two of the Abbot's turns (open question 5, decided). **Rematch** (design doc, not built): sealing also needs a spell from a third character.

## Helper

Anyone who may seal an open coffin does it, with the least useful item. Otherwise attack the weakest standing Listener, then the Abbot.

## Simulation

200 battles per policy, default party, 2026-10-25.

| Policy | Win | Party commands | Afflicted | KOs |
| --- | --- | --- | --- | --- |
| advisor | 97% | 46.5 | 0.56 | 0.15 |
| attack | 0% | — | 1.37 | 3.00 |
| random | 0% | — | 6.63 | 4.65 |

In band for wins and length; Stress just under the band.

## Open questions

- The Abbot is Speed 7 with Rank 4 actions, so a round lasts about two party actions. At the doc's pace the coffins reopened before anyone could seal them.
