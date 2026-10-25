# Implementation status

What the battle prototype (`index.html`) builds of the [design doc](design-doc.md), where the two disagree, what the engine still needs before the remaining bosses can be built, and the design decisions waiting on an answer. Update this page in the same commit as any change that moves a row.

Status key: **Built** matches the doc · **Partial** built with gaps or extras · **Drift** built, but disagrees with the doc · **Not built**.

## Systems

| System | Status | Notes |
| --- | --- | --- |
| Shared battle arena and formations | Built | Standard: party right, enemies left. Pincer: party on both sides. Ambush: party left, facing away until each acts. Formation selector restarts the fight; staging only, no combat modifiers |
| CTB turn order (16 turns, command preview) | Partial | Built. The preview assumes Delay 3 for everyone but the acting character, so enemies with Rank 4–6 skills show early. See [battle math](systems/battle-math.md#time-conditional-turn-based) |
| Delay values | Drift | Quick skills 2, -ga and Jump 5, summons 6 match. "Most skills 4" doesn't: 11 of 18 other skills are 3 (support and utility) or 2 (Counter). Open question 2 |
| Delay attacks (push back, +4 Stress per slot) | Drift | A slot is a fixed 12 ticks, not a turn-order position. Open question 1 |
| Break | Partial | Built, not in the design doc: pushes fill a Break gauge; Broken enemies take +50%. Open question 4 |
| Swap | Built | Free, and the reserve takes the current turn. Reserves gain 2 Stress on an active ally's crit or KO |
| Status effects (Haste, Slow, Stop, Protect, Shell, Reraise) | Not built | Only as Stress Check outcomes (Slow, Reraise). Enemy-inflicted statuses with durations don't exist yet |
| Lost Turns | Drift | Built. They start *at* Danger 30, where the doc says *above* 30. Foresee delays the next one by an interval rather than deleting it |
| Danger | Partial | 0–100, +1 per enemy turn, Lullaby, songs and some enemies add more. No dungeon or room Danger yet |
| Stress (0–200, carries over) | Partial | Built within a battle. The start-of-battle Stress slider stands in for carry-over |
| Stress gain table | Partial | Crit, KO, revive, push, sound, Lost Turn: built and pinned by data-check. Rooms above 30 Danger and saving: not built (no exploration) |
| Stress relief table | Partial | Crit and finishing blow, Lullaby, Soothe, Earplugs: built. Camping, Pip's Comfort, inns: not built |
| Stress Check, Afflicted and Inspired | Built | All five of each. Odds and override chance are setup sliders (75% and 34%) |
| Flee at 200 | Partial | Built within a battle. Being found later, Stress 80 and the permanent trait: not built |
| Combat roles and signature skills | Drift | All 12 built. Quick Song moves an ally 3 slots sooner; the doc says 2 (open question 3) |
| Stress traits | Partial | All built except Tetsugi's revive after battle and Miren's copies (both need more than one battle) |
| Limit Breaks | Built | All 12. Kiri's also adds 15 Danger, which the doc doesn't list |
| Enemy Overdrive | Partial | Built for Orlen and the Hellstar; not in the doc |
| Scan | Partial | The info panel shows the full script: the Disc 1 rule. Disc 2 hints and Disc 3 hint-only Scan: not built |
| Boss HP phases | Partial | One phase change at 50%. The 20% phase (Disc 3) and superboss 75/50/25/10 phases need a second threshold |
| Sphere Grid, AP, S.Lv, Spheres, Resolve | Not built | The encounter level scales stats as a stand-in |
| Speed above 150 lowers Delay | Not built | |
| Materia, summons as systems, save points, inns, Phoenix Down count | Not built | |
| Overworld, towns, dungeons, story scenes | Not built | |

## Encounters

The prototype has 4 story fights and 12 role tests. The 12 role tests are prototype-only: each teaches one character's role through an Ito short story the design doc doesn't use. Simulator numbers are in the balance section below.

| Encounter | Doc chapter | Status | Notes |
| --- | --- | --- | --- |
| Tide-Widow | Ch. 5 | Partial | Undertow (3 slots) and 2 Drowned Sailors at 50% match. Adds Lullaby (sound, +14 Stress, +6 Danger) and Sailors that re-form after 3 of her turns |
| Ruri ×2 | Ch. 8 | Partial | Copies attack each other, as in the doc. Adds Charm and a Spite phase for the last Ruri standing |
| Orlen and the Great Organ | Ch. 19 | Drift | Chord every 5th Organ turn, Earplugs halving it, Sayo and Kugai immune: all match. The doc's 50% rule (stripping Protect and Shell) is replaced by Sermon +30, since there's no Protect or Shell. Adds Overdrive and Requiem |
| The Hellstar (final) | Ch. 27 | Drift | The doc has three forms in sequence: Ainsel the Unwound, the Eaten, the Listener's Eye. The prototype fights Ainsel, the Hellstar and its Tongue at once, with Gaze, Devour and Overdrive. Open question 7 |
| Village Well, Rewound Wolf, Lake Hen, Last Beastcaller's Pelt | Ch. 1–4 | Not built | |
| Ruri (×1, ×5, ×8), Lamp Hollow, The Well-Rested, Your Own Tracks, Forty Years | Ch. 5–10 | Not built | |
| Choir of Lumen, The Grey Hound, The Whisperer, Resonance Engine Mk. IV, The Hundred Listeners | Ch. 11–15 | Not built | |
| The Mirens, The Face Thief, The Tongue (alone), The Congregation, Taste of Ostrel | Ch. 16–22 | Not built | The Tongue exists as a part of the final battle |
| The Groaning Pipes, The Puppeteers, The Neighbour, The Four Heard, The Eaten, The Listener's Eye, The Last Note | Ch. 23–28 | Not built | |
| Optional bosses, the Ruri Garden, the four superbosses | — | Not built | |
| Rematches | — | Not built | |

## Engine work the remaining bosses need

The bosses in the design doc lean on a handful of mechanics the engine doesn't have. Building these as general features, in this order, unlocks the most fights per feature. It is how the SNES Final Fantasies scaled: enemy AI was a small script language over a fixed set of engine commands, so a new boss was data, not new engine code. `SCRIPTS` is already that language; these are its missing commands.

| Feature | Needed by | Notes |
| --- | --- | --- |
| **Damage gating**: enemies that can't be targeted or take no damage until a condition holds | Lake Hen, Pelt, Lamp Hollow, Well-Rested, Forty Years, Whisperer, Hundred Listeners, Congregation, Puppeteers, Groaning Pipes, Neighbour (11) | A `targetable(e)` and `vulnerable(e, attacker)` hook per script, plus a clear UI state ("underwater", "behind Kiri") so the player can read it |
| **Inflicted statuses with durations**: Sleep, Silence, Stop, Slow, Paralyze, Confuse, Protect, Shell | About 15 bosses ("30% chance of Stop for 2 turns") | Separate from Stress Check Afflictions. Shown on the character card and in the turn order |
| **Second HP threshold** (20%), then four (superbosses) | Every Disc 3 boss and rematch | `phases` already supports several; `phaseOf` and the log assume two |
| **"Same round" windows**: two different characters acting between two of the boss's turns | Hundred Listeners, Face Thief, Puppeteers, Taste of Ostrel, Last Note | Needs a definition first (open question 5) |
| **Encounter commands**: a command only one fight offers | Groaning Pipes (Plug), Neighbour (Hold back), the One That Walks (Dream, Rouse) | A per-encounter command list next to Attack and Defend |
| **Guest allies under AI control** | Grey Hound (Goku), Neighbour (Ruri), Our Lady (Grey Mother) | Reuse `SCRIPTS` targeting with the sides swapped |
| **Command memory**: what each character used, and on whom | Your Own Tracks, Four Heard, the Head Beneath the Mountain | `u.last` exists; extend it to a history |
| **Items on enemies** | Hundred Listeners (sealing a coffin) | Items target allies only |
| **More than one turn-order slot per unit, or a shared slot** | Rewound Wolf, The Mirens | |
| **Forced and whispered commands written into the turn order** | The Whisperer, the One That Walks | The forecast strip needs per-slot text |

## Known issues

- **The turn-order preview is approximate** past each unit's next turn (it assumes Delay 3). Enemies already have a planned skill, so the forecast can use its rank.
- **The info panel says crits deal 1.6×.** That is true for enemy crits; party crits deal 1.8×.
- **Rigs are copied** from the rig viewer into `index.html` by hand. data-check compares the two and warns on drift.

## Balance findings

From `tools/battle-sim/sim.js`, 200 battles per encounter with each encounter's default party. `advisor` is the in-game Helper; `no-role` is the Helper with the tested character barred from signature skills; `attack` presses Attack every turn; `random` picks any legal command. Party commands are the Helper's average in won fights; Afflicted is the Helper's average per battle. Targets are in the [boss authoring guide](guides/boss-authoring.md#targets).

| Encounter | advisor | no-role | attack | random | Party commands | Afflicted |
| --- | --- | --- | --- | --- | --- | --- |
| Tide-Widow | 100% | — | 8% | 48% | 84 | 1.6 |
| Ruri ×2 | 100% | — | 49% | 80% | 45 | 0.6 |
| Orlen and the Great Organ | 100% | — | 3% | 49% | 65 | 4.5 |
| The Hellstar | 100% | — | 0% | 2% | 103 | 7.1 |
| Kiri · Spiral Ringer | 100% | 100% | 11% | 90% | 53 | 2.3 |
| Natsu · Blood Drinker | 100% | 99% | 0% | 31% | 29 | 0.0 |
| Tetsugi · Funeral Dolls | 99% | 56% | 0% | 0% | 23 | 0.1 |
| Miren · Hanging Balloon | 89% | 67% | 0% | 0% | 44 | 0.7 |
| Goku · Earthbound Woman | 100% | 93% | 0% | 1% | 36 | 0.0 |
| Hisui · Red Turtleneck | 100% | 100% | 73% | 84% | 21 | 0.0 |
| Kuro · Record Singers | 100% | 100% | 0% | 88% | 12 | 0.0 |
| Ren · Long Dreamer | 100% | 62% | 0% | 0% | 42 | 0.0 |
| Sayo · Amigara Wall | 100% | 1% | 2% | 0% | 27 | 0.0 |
| Kugai · Headless Sculpture | 100% | 100% | 0% | 0% | 37 | 0.0 |
| Fuyori · Grease Father | 100% | 85% | 23% | 74% | 58 | 0.7 |
| Shio · Star Fragment | 100% | 94% | 0% | 4% | 46 | 0.0 |

What the numbers say:

1. **Half the role tests don't need their role.** Kiri's, Natsu's, Hisui's, Kuro's and Kugai's tests are won 99–100% of the time with the tested character barred from signature skills, and Goku's and Shio's 93–94%. Only Sayo's (1%) truly requires its role, with Tetsugi's, Ren's and Miren's (56–67%) partway there. The gap is the default party: Natsu sits in eight of the other eleven tests and heals through most of them. Recommendation: rebuild the default parties so the tested role is the only answer to the threat (no Natsu in the Kugai and Goku tests), then tune toward `no-role` ≤ 50%. This is the Bravely Default asterisk-boss pattern: each job's fight makes that job's tool the key.
2. **Kuro's test teaches by speed, not survival.** Without Darkga the fight is still won but takes 33 commands instead of 12. That is a legitimate lesson, but the fight should make slowness cost something: Stress per turn from the Singers already exists, and raising it would turn the time into a threat.
3. **Hisui's test is won by pressing Attack 73% of the time.** The Red Turtleneck's lesson (crits feed Hisui) doesn't need to be understood to win. It needs a punishment for the obvious answer.
4. **Most role tests never trigger the horror systems.** Eleven of twelve average under one Stress Check per fight; only Kiri's, built around Danger, reaches three. Stress is decoration there. Fine for a tutorial; not for anything after it.
5. **The story fights run long.** The Widow (84 commands, the first story boss) and the final battle (103) are past the Disc 1 band of 25–60. The Widow's 3200 HP against level-8 damage of about 65 per Attack is the main lever (see [battle math](systems/battle-math.md#worked-example-why-the-widow-takes-so-long)).
6. **The Hellstar is the only fight that leans on Stress**: 7.1 Afflicted per fight. Good for a finale, but random play wins 2% of the time, so it relies on the Helper's knowledge more than any other fight.
7. **Quick Song is never exercised.** In Sayo's test the Helper spends every turn on Counter-Melody against the Amigara Wall's Calling. Setting Quick Song to the doc's 2 slots or the code's 3 gives identical results, so open question 3 can't be settled by any existing fight.

## Open design questions

Each needs a decision before it can be resolved in both the doc and the code. Recommendations are a designer's starting position, not settled.

1. **What is a slot?** The code measures pushes in fixed 12-tick slots; the doc reads as turn-order positions. *Recommendation:* keep ticks, which keeps the math stable across Speeds as in FFX's CTB, and define "slot" in the doc as a fixed amount of time. Make the turn-order preview exact (known issue above) so the player sees where a push lands.
2. **Delay of support skills.** The doc says most skills are Delay 4; the code gives support and utility skills 3. *Recommendation:* update the doc. The 3/4 split carries meaning: support keeps the basic attack's tempo, and damage spells are the slower, heavier choice.
3. **Quick Song: 2 or 3 slots?** *Recommendation:* decide after a fight exists that needs Quick Song (Forty Years is the natural one), then measure both. Until then, align the doc to the code (3).
4. **Adopt Break into the design doc?** *Recommendation:* yes. It is what makes Ren's Delay Shot and Sayo's and Shio's Limit Breaks matter against bosses, and the Long Dreamer already builds a lesson on it. It needs a rule for Disc 3, where Delay attacks push back 1 slot at most.
5. **What is a "round"?** Five design-doc bosses need two characters to act "in the same round", which CTB doesn't have. *Recommendation:* define it as "between two consecutive turns of the boss", show the window in the turn order as a bracket, and let the CTB planner draw it.
6. **Make the role tests canon?** *Recommendation:* yes, as optional fights that unlock each character's Sphere Grid arm (Bravely Default's asterisk fights, FFX's Cloister Trials as rooms to solve). Their Ito short-story sources are new material the doc doesn't use yet.
7. **The final battle's shape.** The doc's three sequential forms are stronger as an Ito reveal: each form peels back a layer, ending in an enemy with no HP bar. The prototype's simultaneous fight is a stronger CTB puzzle. *Recommendation:* keep the doc's structure and reuse the prototype's Gaze and Devour as form 1's mechanics.
8. **Lost Turns at or above 30 Danger?** *Recommendation:* the code's "30 and up" is easier to read on the meter (the dashed line sits at 30). Change the doc's wording.
