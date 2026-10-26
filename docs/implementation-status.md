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

The prototype has 25 story fights (every Disc 1 and Disc 2 chapter boss and the final battle) and 12 role tests. The 12 role tests are prototype-only: each teaches one character's role through an Ito short story the design doc doesn't use. Simulator numbers are in the balance section below.

| Encounter | Doc chapter | Status | Notes |
| --- | --- | --- | --- |
| Village Well | Ch. 1 | Partial | Spiral Draw matches. Adds The Note every 3rd turn (+10 Stress). [Spec](bosses/well.md) |
| Rewound Wolf | Ch. 2 | Partial | Two slots, pinning the dead slot: matches. Adds the dead slot's turn coming forward when the wolf falls, and revival at 75% HP with +20% ATK. [Spec](bosses/wolf.md) |
| Lake Hen | Ch. 3 | Partial | Underwater, the splash, chicks healing 10%, Peck: match. Adds Come Up for Air every 4th turn (the way through without Miren) and +10 Stress per surfacing. [Spec](bosses/hen.md) |
| Last Beastcaller's Pelt | Ch. 4 | Partial | Empty, the 2-turn hold, Goku unable to act: match. Adds Put On every 4th turn (the way through without Goku). The doc's four named roles fit three active slots only with a Swap (open question in the spec). [Spec](bosses/pelt.md) |
| Ruri ×1 | Ch. 5 | Built | The shared Ruri script with encounter stats for level 7. [Spec](bosses/ruri1.md) |
| Tide-Widow | Ch. 5 | Partial | Undertow (3 slots) and 2 Drowned Sailors at 50% match. Adds Lullaby (sound, +14 Stress, +6 Danger) and Sailors that re-form after 3 of her turns |
| Lamp Hollow | Ch. 6 | Partial | Three Wicks, Darkga can't put out a full Wick, the dark window: match. Relight brings back one Wick and halves the relighter. [Spec](bosses/lamp.md) |
| The Well-Rested | Ch. 7 | Partial | Original-only damage, splitting to 6, Lullaby sleeping the copies, Yawn: match. Adds the original resting 1.5% per sleeper turn. Party Sleep is a minimal status. [Spec](bosses/rested.md) |
| Ruri ×2 | Ch. 8 | Partial | Copies attack each other, as in the doc. Adds Charm and a Spite phase for the last Ruri standing |
| Your Own Tracks | Ch. 9 | Partial | Copies repeating the last command: built, with a mirror table for every command, and +10 Stress per copied hit. [Spec](bosses/tracks.md) |
| Forty Years | Ch. 10 | Partial | Helmsman, Hull, the tilt, Course Correction: match. Adds the destroyed Hull leaving the ship off course (the way through without Ren). [Spec](bosses/forty.md) |
| Choir of Lumen | Ch. 11 | Partial | Four sound singers. Adds Hymn growing with the choir and Amen every 4th turn. [Spec](bosses/choir.md) |
| The Grey Hound | Ch. 12 | Partial | Goku as an AI guest, the unkillable hound, damage raising its ATK, three steps: match. Adds the Defending target halving Goku's Stress. [Spec](bosses/hound.md) |
| The Whisperer | Ch. 13 | Partial | Standing behind, whispered commands, Swap to expose her, Silence 20%, two at 50%: match. Adds Read Aloud every 3rd turn; whispers are attack-an-ally or stand still. [Spec](bosses/whisperer.md) |
| Ruri ×5, Ruri ×8 | Ch. 14, 17 | Built | The shared script plus the Ch. 14 rule: in a crowd of 5 or more, once half are down the rest stop fighting each other. Encounter stats per level. [Spec](bosses/ruri5.md) |
| Resonance Engine Mk. IV | Ch. 14 | Partial | Slow start, 2 slots sooner below 50%, Stomp Paralyze 20%: match. Adds Resonance every 3rd turn and Trample in phase 2. [Spec](bosses/engine.md) |
| The Hundred Listeners | Ch. 15 | Built | Abbot gated by 3 Listeners, coffins sealed with an item by a different character in the same round, Paralyze 20%, reopening at 50%. [Spec](bosses/listeners.md) |
| The Mirens | Ch. 16 | Partial | Copies in the air untargetable, each defeat delaying the real Miren, Jumping every turn at the end: match. The shared slot is one turn among the copies that also answers each of Miren's actions. [Spec](bosses/mirens.md) |
| The Face Thief | Ch. 18 | Built | Features, −20% each, KO at three with a 25% heal, heal-plus-hit in the same round, Confuse 30%, Kiri-only with Tetsugi's aimed Chakra at 50%. [Spec](bosses/facethief.md) |
| Orlen and the Great Organ | Ch. 19 | Drift | Chord every 5th Organ turn, Earplugs halving it, Sayo and Kugai immune: all match. The doc's 50% rule (stripping Protect and Shell) is replaced by Sermon +30, since there's no Protect or Shell. Adds Overdrive and Requiem |
| The Tongue | Ch. 20 | Built | Grab on the highest Stress, +5 Stress a turn, KO after 3, freed by 3 different characters, Swap for the third, two at 50%. [Spec](bosses/tongue2.md) |
| The Congregation | Ch. 21 | Built | Stare starting on Natsu, no damage from the stared, moved by crits and Limit Breaks, +10 Stress, Confuse 30%, 3 Faces at 50%. [Spec](bosses/congregation.md) |
| Taste of Ostrel | Ch. 22 | Partial | Sleepers healing 5% each, waking for 2 boss turns, Kiri's Lullaby at 50% and Counter-Melody: match. Waking several in one action costs the 10 Stress once, and a Sleeper woken a fourth time stays awake (so the fight always ends). [Spec](bosses/taste.md) |
| The Hellstar (final) | Ch. 27 | Drift | The doc has three forms in sequence: Ainsel the Unwound, the Eaten, the Listener's Eye. The prototype fights Ainsel, the Hellstar and its Tongue at once, with Gaze, Devour and Overdrive. Open question 7 |
| The Groaning Pipes, The Puppeteers, The Neighbour, The Four Heard, The Eaten, The Listener's Eye, The Last Note | Ch. 23–28 | Not built | |
| Optional bosses, the Ruri Garden, the four superbosses | — | Not built | |
| Rematches | — | Not built | |

## Engine work the remaining bosses need

The bosses in the design doc lean on a handful of mechanics the engine doesn't have. Building these as general features, in this order, unlocks the most fights per feature. It is how the SNES Final Fantasies scaled: enemy AI was a small script language over a fixed set of engine commands, so a new boss was data, not new engine code. `SCRIPTS` is already that language; these are its missing commands.

| Feature | Needed by | Notes |
| --- | --- | --- |
| **Damage gating**: enemies that can't be targeted or take no damage until a condition holds | Whisperer, Hundred Listeners, Congregation, Puppeteers, Groaning Pipes, Neighbour (6 left) | **Built** for Disc 1: `targetable` + `hidden` (the card says why) and `onDamage`, which can refuse or change damage. See the [authoring guide](guides/boss-authoring.md#scriptskey) |
| **Inflicted statuses with durations**: Sleep, Silence, Stop, Slow, Paralyze, Confuse, Protect, Shell | Disc 3 bosses (Stop, Slow) and Protect and Shell | **Built** for Disc 2: Silence, Paralyze and Confuse (`inflict`, `u.st`), counted in their owner's turns, shown as chips and in the turn order. Sleep is separate (`u.sleep`). Stop, Slow, Protect and Shell remain | Separate from Stress Check Afflictions. Shown on the character card and in the turn order. Only Sleep exists (`u.sleep`, `e.sleep`), built for the Well-Rested |
| **Second HP threshold** (20%), then four (superbosses) | Every Disc 3 boss and rematch | `phases` already supports several; `phaseOf` and the log assume two |
| **"Same round" windows**: two different characters acting between two of the boss's turns | Puppeteers, Last Note | **Built per script** for the Hundred Listeners and the Face Thief: the boss's own turn ends the round (open question 5, decided). Showing the window in the turn order is still to do |
| **Encounter commands**: a command only one fight offers | Groaning Pipes (Plug), Neighbour (Hold back), the One That Walks (Dream, Rouse) | A per-encounter command list next to Attack and Defend |
| **Guest allies under AI control** | Neighbour (Ruri), Our Lady (Grey Mother) | **Built** for the Grey Hound: `ENCOUNTERS[k].guest`, driven by a foe script's `guestTurn`. A guest that attacks needs its own targeting |
| **Command memory**: what each character used, and on whom | Four Heard, the Head Beneath the Mountain | `u.last` and `u.lastT` (its target) exist and drive Your Own Tracks; the rest need a history |
| **Items on enemies** | — | **Built**: `takesItem` and `onItem` let a foe accept an item (the Listeners' coffins) |
| **More than one turn-order slot per unit, or a shared slot** | — | **Built by composition**: the Rewound Wolf's dead slot is a second foe; the Mirens' shared slot is a turn-only foe driving turnless copies (`noTurn`). Truly shared slot |
| **Forced and whispered commands written into the turn order** | the One That Walks | **Built** for the Whisperer: `u.whisper`, a "Whispered" turn-order slot and a menu of Obey or Swap |

## Known issues

- **Sprite playback:** continuous idle layering, action blends, loop pose/velocity closure, a shared visible-time clock, decoded/prewarmed sheets, padded part caches and adaptive effect detail are implemented. The animation checker samples all 22 rigs / 88 clips and compares the six battle rigs with the viewer. Browser checks cover playback, interruption, suspension, reduced motion, missing sheets and a throttled six-rig scene. See [sprite playback](guides/sprite-playback.md). Attachment-box warnings are review prompts, not proof of broken joints; fitted and intentionally separated parts can extend outside their parent's atlas rectangle. Frame rate still depends on the device and scene.

- **The turn-order preview is approximate** past each unit's next turn (it assumes Delay 3). Enemies already have a planned skill, so the forecast can use its rank.
- **The info panel says crits deal 1.6×.** That is true for enemy crits; party crits deal 1.8×.
- **Rigs are copied** from the rig viewer into `index.html` by hand. data-check compares the two and warns on drift.

## Balance findings

From `tools/battle-sim/sim.js`, 200 battles per encounter with each encounter's default party. `advisor` is the in-game Helper; `no-role` is the Helper with the tested character barred from signature skills; `attack` presses Attack every turn; `random` picks any legal command. Party commands are the Helper's average in won fights; Afflicted is the Helper's average per battle. Targets are in the [boss authoring guide](guides/boss-authoring.md#targets).

| Encounter | advisor | no-role | attack | random | Party commands | Afflicted |
| --- | --- | --- | --- | --- | --- | --- |
| Village Well | 100% | — | 100% | 100% | 27 | 0.0 |
| Rewound Wolf | 99% | — | 20% | 51% | 32 | 0.4 |
| Lake Hen | 100% | — | 21% | 14% | 46 | 0.1 |
| Last Beastcaller's Pelt | 100% | — | 0% | 83% | 34 | 0.0 |
| Ruri ×1 | 100% | — | 49% | 87% | 49 | 0.0 |
| Lamp Hollow | 99% | — | 0% | 5% | 51 | 0.7 |
| The Well-Rested | 100% | — | 0% | 0% | 36 | 0.0 |
| Your Own Tracks | 100% | — | 6% | 74% | 30 | 0.0 |
| Forty Years | 100% | — | 0% | 73% | 53 | 0.6 |
| Choir of Lumen | 100% | — | 43% | 80% | 30 | 2.0 |
| The Grey Hound | 100% | — | 0% | 0% | 12 | 0.0 |
| Tide-Widow | 100% | — | 8% | 48% | 84 | 1.6 |
| Ruri ×2 | 100% | — | 49% | 80% | 45 | 0.6 |
| The Whisperer | 96% | — | 10% | 6% | 63 | 0.6 |
| Ruri ×5 | 99% | — | 0% | 52% | 35 | 1.0 |
| Resonance Engine Mk. IV | 100% | — | 2% | 81% | 38 | 0.0 |
| The Hundred Listeners | 97% | — | 0% | 0% | 46 | 0.6 |
| The Mirens | 100% | — | 0% | 86% | 36 | 0.1 |
| Ruri ×8 | 96% | — | 0% | 6% | 35 | 1.9 |
| The Face Thief | 88% | — | 0% | 0% | 64 | 0.8 |
| The Tongue | 89% | — | 0% | 0% | 34 | 0.0 |
| The Congregation | 99% | — | 4% | 30% | 61 | 3.1 |
| Taste of Ostrel | 100% | — | 2% | 63% | 37 | 0.0 |
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
8. **The Disc 1 chapter bosses each need their answer, but most leave Stress as decoration.** All eleven are won 99–100% by the Helper. Pressing Attack wins 0–21% of nine of them; the exceptions are the Village Well (100%, the tutorial, by design), Ruri ×1 (49%, an opening act) and the Choir (43%, but only after about 5 characters flee). Every story boss stays winnable without its key character: the Lake Hen without Miren 100% (85 commands), the Pelt without Goku 100% (107), the Lamp Hollow without Kuro 45% (136), the Well-Rested without Kiri 63% (58), Forty Years without Ren 100% (70), the Grey Hound without Natsu 47%. But the Helper keeps Afflicted under 0.5 in eight of eleven, because Natsu or Kiri is in almost every default party. The Grey Hound is short (12 commands): three steps is the doc's number.
9. **The Disc 2 chapter bosses all defeat pressing Attack** (0–10%) and are won 88–100% by the Helper, inside the 35–70 command band except Ruri ×5 and ×8 (35) and the Tongue (34). The Resonance Engine, the Mirens and Taste of Ostrel are won 100% with almost no Stress: Ren's Delay Shot answers the Engine completely, Miren's Jump starves his copies of turns, and Darkga keeps the Taste's Sleepers awake. Each fight stays winnable without its key character (Engine without Ren 100%, Mirens without Miren 100%, Face Thief without Tetsugi 45%, Taste without Kuro 40%). Afflicted sits under the 1–3 band in six of ten, again because the Helper Soothes early.

## Open design questions

Each needs a decision before it can be resolved in both the doc and the code. Recommendations are a designer's starting position, not settled.

1. **What is a slot?** The code measures pushes in fixed 12-tick slots; the doc reads as turn-order positions. *Recommendation:* keep ticks, which keeps the math stable across Speeds as in FFX's CTB, and define "slot" in the doc as a fixed amount of time. Make the turn-order preview exact (known issue above) so the player sees where a push lands.
2. **Delay of support skills.** The doc says most skills are Delay 4; the code gives support and utility skills 3. *Recommendation:* update the doc. The 3/4 split carries meaning: support keeps the basic attack's tempo, and damage spells are the slower, heavier choice.
3. **Quick Song: 2 or 3 slots?** *Recommendation:* decide after a fight exists that needs Quick Song (Forty Years is the natural one), then measure both. Until then, align the doc to the code (3).
4. **Adopt Break into the design doc?** *Recommendation:* yes. It is what makes Ren's Delay Shot and Sayo's and Shio's Limit Breaks matter against bosses, and the Long Dreamer already builds a lesson on it. It needs a rule for Disc 3, where Delay attacks push back 1 slot at most.
5. **What is a "round"?** *Decided (2026-10-25):* the time between two consecutive turns of the boss, as recommended. The Hundred Listeners and the Face Thief use it, and each script resets its round on the boss's turn. Still to do: draw the window in the turn order as a bracket.
6. **Make the role tests canon?** *Recommendation:* yes, as optional fights that unlock each character's Sphere Grid arm (Bravely Default's asterisk fights, FFX's Cloister Trials as rooms to solve). Their Ito short-story sources are new material the doc doesn't use yet.
7. **The final battle's shape.** The doc's three sequential forms are stronger as an Ito reveal: each form peels back a layer, ending in an enemy with no HP bar. The prototype's simultaneous fight is a stronger CTB puzzle. *Recommendation:* keep the doc's structure and reuse the prototype's Gaze and Devour as form 1's mechanics.
8. **Lost Turns at or above 30 Danger?** *Recommendation:* the code's "30 and up" is easier to read on the meter (the dashed line sits at 30). Change the doc's wording.
