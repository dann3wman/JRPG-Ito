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
| The ordinary detail | A lullaby, the harbour's own song (+14 Stress to all, +6 Danger; +28 Stress in phase 2) |
| Repetition | Undertow, the tide coming in: whoever is about to act is dragged 3 slots back |
| The page turn (50% HP) | Release: her body opens and two Drowned Sailors crawl out |
| The cost | The Sailors re-form 3 of her turns after they fall: the drowned keep coming home. Her daughter Hisui joins after the fight |

## The lesson

- **Teaches:** the turn order decides who Undertow takes, and Stress is a resource to manage across a long fight.
- **Scan hint:** "The tide takes whoever moves next."
- **Intended answer:** read the turn order before her turn and let Tetsugi (most HP, no Stress from KOs) be the one about to act. Natsu Soothes after each Lullaby, and Kiri's Spiral Cut grows as the Lullabies push Danger up.
- **The obvious answer, and why it fails:** all-out attack. Lullaby and Undertow's push Stress pile up into Stress Checks, and at 75% Afflicted odds the party breaks before she does (`attack` wins 27% in the current 300-run sample; the ≤25% target is not yet met).
- **Needs at least two characters because:** intended: a striker can't also manage Stress. Measured: it doesn't yet (see open questions).

## Stats

| Foe | HP | ATK | DEF | MDEF | Speed | Crit | Part of |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Tide-Widow | 2225 | 105 | 7 | 6 | 11 | 15% (Attack) | — |
| Drowned Sailor | 390 | 45 | 4 | 4 | 9 | 8% (Attack) | Tide-Widow |

Encounter level 8, starting Danger 20, default party Kiri, Natsu, Tetsugi, default bag.

## Script

| Phase | When | Entry | What changes |
| --- | --- | --- | --- |
| p1 | Above 50% HP | — | Roll: Lullaby 25, Undertow 25, Attack 50 |
| p2 | 50% HP or below | Release (uses her turn) | Roll: Lullaby 20, Undertow 45, Attack 35; Lullaby rises to +28 Stress |

Sailors: Attack 50, or Stench 50 (150 if an ally is within 25 Stress of a Stress Check or fleeing). Stench targets that ally: light damage, +8 Stress.

| Skill | Rank | Tags | Target | Power | Effect |
| --- | --- | --- | --- | --- | --- |
| Attack | 3 | Physical | random | 1.4× ATK | 15% crit |
| Undertow | 4 | Physical, Delay | next (late) | 0.6× ATK | Pushed back 3 slots (+12 Stress) |
| Lullaby | 5 | Sound, Stress | all | — | +14 Stress each (+28 in phase 2), +6 Danger |
| Release | 4 | Summon, Phase | none | — | 2 Drowned Sailors; each re-forms 3 of her turns after defeat |

## Fairness checks

- [x] The plan and target of every action show in the turn order (Undertow shows "→ whoever acts next").
- [x] Phase 1 teaches Undertow and Lullaby before phase 2 doubles Undertow's weight.
- [x] Every random effect shows its odds in the info panel.
- [x] The trick can be learned from the log alone ("pushed back 3").
- [x] A party without Natsu can still win. Kiri, Tetsugi and Kugai: 100%, in 44.29 commands (300 runs).

## Disc rules

Disc 1: Scan shows everything, one phase, no status effects. **Rematch** (design doc): Undertow has a 30% chance of Sleep, 2 more Sailors at 20%, and each Sailor killed heals her 5%.

## Helper

`adviseFocus` targets a Sailor that is almost dead, else the Widow herself (Sailors re-form, so damage on her counts most).

## Simulation

Refinement B003, 2026-11-16. The default-party before/after samples use 300 battles per policy, seed 1. Commands count only won fights; Afflicted and KOs average every battle. The fallback uses Kiri, Tetsugi and Kugai with the Helper. Full machine-readable results and rejected candidates are in the [review](../bestiary/reviews/2026-11-16-widow-pacing.md).

| Policy | Win before → after | Winning commands | Afflicted / battle | KOs / battle |
| --- | --- | --- | --- | --- |
| advisor | 100.0% → 100.0% | 83.63 → 59.76 | 1.64 → 0.62 | 0.08 → 0.03 |
| attack | 6.0% → 27.0% | 70.33 → 53.96 | 1.70 → 1.79 | 2.89 → 2.46 |
| random | 45.0% → 84.0% | 143.98 → 114.73 | 8.44 → 8.29 | 3.33 → 1.92 |
| fallback | 100.0% → 100.0% | 62.37 → 44.29 | 1.04 → 0.64 | 0.10 → 0.04 |

HP is now 2225 instead of 3200. The HP-only 2300 trial hit 59.17 commands but reduced Afflicted to 0.16, below the Disc 1 band. A separate phase-two Lullaby trial at +24 Stress produced 62.96 commands and 0.59 Afflicted (100 runs). The final +28 phase-two song with 2225 HP produces 59.76 commands and 0.62 Afflicted, inside the general Disc 1 length and Stress bands. Phase 1 still teaches the +14 song; the phase label and Scan state the escalation. This follows Final Fantasy's teaching phase followed by a stronger repeat: less repetition, a sharper second half.

The original HP-first acceptance needed a second lever because HP alone erased the Stress lesson. This explicitly takes the prior open question's phase-two Stress suggestion. Attack-only wins remain 27%, slightly above the ≤25% goal. Do not treat this draft as fully balance-approved. The prior suggestion to retain more than one Afflicted event also remains unmet; the tradeoff is accepted only for review, with 0.62 inside the general 0.5–2 band.

## Open questions and remaining validation

- **The healer is optional.** Swapping Natsu for Kugai still wins 100% and faster (44.29 commands, 0.64 Afflicted). This preserves a viable fallback but does not prove two-character cooperation is required. This refinement does not solve that separate design issue.
- **Attack-only success.** The independent seed-1001 sample gives 23.67% (152/600 wins across both samples, 25.33%). Recheck the 27% first-sample result against the 25% goal during playtesting; do not add damage changes solely to fit one seeded sample.
- **Browser playtest.** Chromium cannot launch in this environment (`socket() failed: Operation not permitted`). Play once with the Helper, check the phase-two warning and Scan text, and judge whether the song feels fair before accepting.
- **Canon.** Lullaby's existing +14 Stress/+6 Danger and the new phase-two +28 escalation are now stated in the design doc. The Sailors' three-turn respawn remains a prototype addition.
