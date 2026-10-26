# Ren sprite generation and viewer installation · 2026-10-25

Generated with the built-in OpenAI image tool and the existing ren sprite and portrait references. Retained source: [54-frame sprite sheet](ren-sheet-2026-10-25.source.png). Packed WebP and labelled inspection sheet: [assets/player-sheets/ren/](../../assets/player-sheets/ren/). Installed in [Party Sprite Viewer](../../tools/party-sprite-viewer/index.html?who=ren). This request created a sprite sheet only.

## Verification

- Retained source: 1024 × 1536; packed sprite atlas: 576 × 864 RGBA, six columns and nine rows of 96 px cells.
- All 54 cells contain art and their opaque bounds end at baseline row 88. Retained source slices without warnings at default body scale. Installed and saved WebPs match byte for byte.
- Inspected the labelled sheet and Chromium viewer screenshot. Exercised all 26 animation controls, four derived effects, facing toggle and whole-sheet view. The missing-portrait placeholder appears as expected.
- Previously installed seven character sheets load and retain their 12 portrait cells. At 390 px width the viewer has no horizontal overflow. No page errors occurred.
- Work is limited to these new sheets, viewer registration and art-pipeline correction notes/prompt wording. No battle embedding, gameplay validation, commit or publication was performed. Playback checks do not establish final art approval.

The first source produced cell-edge warnings for cast1, special2 and special3 and drew Sleep kneeling. A targeted image edit corrected reach and standing Sleep. The retained source has real alpha and was sliced with `--key=`. The packed idle eyes do not clearly resolve the requested circular pupil motion; retain this as an art-review limitation. The revised aim frame also includes a small flash, so Delay Shot fires across its last two frames.

## Generation prompt

```text
I'm attaching the current battle sprite and portrait of "Ren" (Gunslinger), a party member in a dark gothic-horror JRPG in the style of Final Fantasy Record Keeper / Final Fantasy VI battle sprites. Please draw a full SPRITE SHEET for this character, as complete as an FFRK character sheet: battle poses, status poses, and field walking frames.

About the character: a weathered man in his late forties with stubble and old scars; a wide-brimmed dark hat; a long dark airship captain's coat with brass buttons; a long-barrelled pistol. Captain of the airship; has flown the same circular route for forty years. Weapon: a long-barrelled pistol held in the right hand. Wherever a frame below mentions a weapon, draw it as this.
Class action (row 5, frames 1-3): Delay Shot: draw, aim with the arm straight out, fire with a bright muzzle flash (3 frames).
Limit Break (row 5, frames 4-6): Last Round: fanning the hammer, several muzzle flashes, spent shells in the air.

Style: 16-bit SNES-era pixel art, chibi proportions (head about a third of the body height), crisp 1-pixel outlines in near-black ink, light from the top left. Match the attached sprite's costume, drawn at a higher frame quality. Keep it clean pixel art: no hatching, no sketch lines, no realistic proportions.

Palette: tie it to the attached ink-drawn portrait. Near-black outlines, muted sepia, bone and grey tones, about 20 colours in all, with brass buttons and muzzle flash as the only saturated colour.

The horror is quiet. The character looks almost ordinary, even cute, except for one small wrong detail that stays in every frame, battle and field alike: his pupils sit in a different place in each idle frame, slowly tracing a circle. Draw it plainly and consistently; never exaggerate it. Where a frame below gives a detail "For Ren", that detail is part of the frame and wins over the generic description if they differ.

Layout: a grid of 6 columns x 9 rows = 54 square frames. Every frame shows the same character at the same size. Battle frames (rows 1-7) face LEFT (the enemy is to the left); rows 8-9 are field frames facing the direction given. Each figure stands on the same invisible ground line about 15% above the bottom of its cell, horizontally centred in the cell. Keep the whole figure, weapon and effects inside its own cell with clear space around it. Small effects (sparks, glow, notes, petals) are fine if they stay inside the cell.

Frames, left to right, top to bottom:
Row 1:
  1. idle1: Idle: standing at rest, weapon lowered, facing left
  2. idle2: Idle: breathing in, shoulders slightly raised
  3. idle3: Idle: breathing out, shoulders slightly lowered
  4. ready1: Ready: weapon raised, weight forward, about to act
  5. ready2: Ready: same stance, small bob down
  6. defend: Defend: guarding, arms/weapon crossed in front, braced
Row 2:
  1. attack1: Attack: wind-up, weapon drawn back
  2. attack2: Attack: mid-swing, body lunging left
  3. attack3: Attack: follow-through, weapon fully extended to the left
  4. attackB1: Second attack: wind-up for a different strike (other hand or reverse swing)
  5. attackB2: Second attack: mid-strike
  6. attackB3: Second attack: follow-through
Row 3:
  1. advance1: Step forward: walking left, one foot forward
  2. advance2: Step forward: walking left, other foot forward
  3. chant1: Chant: casting stance, hands raised, eyes on the target
  4. chant2: Chant: same, hands slightly higher, a faint glow at the hands
  5. cast1: Cast: releasing the spell, arm thrust forward to the left
  6. cast2: Cast: recovery, arm lowering
Row 4:
  1. item1: Item: holding a small vial up
  2. item2: Item: tossing the vial forward to the left
  3. hurt1: Hit: recoiling backward to the right, head snapped back
  4. hurt2: Hit: stumbling, recovering balance
  5. lowhp1: Low HP: down on one knee, head bowed, weapon planted, breathing hard
  6. lowhp2: Low HP: same kneel, shoulders heaving up
Row 5:
  1. special1: Class action, frame 1 of 3 (described above)
  2. special2: Class action, frame 2 of 3 (described above)
  3. special3: Class action, frame 3 of 3 (described above)
  4. limit1: Limit Break, frame 1 of 3 (described above)
  5. limit2: Limit Break, frame 2 of 3 (described above)
  6. limit3: Limit Break, frame 3 of 3 (described above)
Row 6:
  1. victory1: Victory: turning toward the viewer, weapon lowering
  2. victory2: Victory: the character's victory pose
  3. victory3: Victory: same pose, small change (hair or cloth moves, a breath)
  4. zombie1: Zombie: standing slack, head lolling to one side, arms hanging, skin grey-green
  5. zombie2: Zombie: same slack stance, swaying the other way
  6. ko: KO: lying flat on the ground on their back, eyes closed, weapon dropped beside them
Row 7:
  1. sleep1: Asleep: sitting or kneeling slumped, head down, eyes closed. For Ren: he sleeps upright, hat tipped down, one hand still on the gun
  2. sleep2: Asleep: same, head dipped slightly lower (a breath). For Ren: he sleeps upright, hat tipped down, one hand still on the gun
  3. paralyze: Paralyzed: frozen rigid mid-step, limbs stiff, back arched, straining
  4. confuse1: Confused: wobbling, head tilted, looking the wrong way (right, away from the enemy)
  5. confuse2: Confused: wobbling the other way, a hand at the temple
  6. berserk: Berserk: hunched forward, weapon gripped too hard, teeth bared, ready to charge
Row 8:
  1. walkD1: Field, facing the viewer (down): standing, weapon sheathed or at rest
  2. walkD2: Field, facing down: walking, left foot forward
  3. walkD3: Field, facing down: walking, right foot forward
  4. walkU1: Field, back to the viewer (up): standing
  5. walkU2: Field, facing up: walking, left foot forward
  6. walkU3: Field, facing up: walking, right foot forward
Row 9:
  1. walkS1: Field, side view facing left: standing
  2. walkS2: Field, facing left: walking, front foot forward
  3. walkS3: Field, facing left: walking, back foot forward
  4. shock: Cutscene, facing the viewer: startled, leaning back, arms raised a little
  5. downcast: Cutscene, facing the viewer: head bowed, arms hanging
  6. listen: Cutscene, facing the viewer: head tilted, one hand cupped to the ear, listening to something

Hard requirements. A script cuts this image up by a fixed grid, so these matter:
- Exactly 6 columns and 9 rows of equal cells filling the whole image, in the order listed. Nothing outside the grid, no title, no extra cells.
- A single flat pure green background (#00FF00) with no gradient, shadow, texture or ground. Make sure that green appears nowhere on the character.
- No text, labels, numbers, frame borders or guide lines anywhere.
- Return it as a downloadable PNG, 1024 x 1536 (portrait orientation).

Production spacing requirements: exactly SIX columns and NINE rows,54 poses. Keep each entire silhouette, weapon and every effect inside the central 110 x 115 pixels of its ~170px square cell, with at least28px completely blank internal margins on all sides. Same compact character scale throughout. Battle AND both chant poses face LEFT; side walk is STRICT LEFT PROFILE. Clean distinct pixel clusters. No cast shadows or ground lines. Adults fully clothed; non-graphic game art. Eye detail may be tiny. Compact effects and short gestures are essential for clean automatic slicing. Override generic attack swing wording with appropriate weapon choreography.
Ren attacks by drawing/aiming/firing his pistol. Pistol barrel and muzzle flashes must be compact, never extend beyond the central110px area. Limit shows small brass flashes/casings, never long beams. Keep hat and coat consistent with references.
```

## Revision prompt

```text
Edit this existing Ren sprite sheet. Preserve exact1024x1536 canvas,6columns9rows54frames and existing pixel style, costume, character scale and all other art. Fix only these details: row3 column5 cast1 move pistol muzzle flash inward to the RIGHT and shorten arm/barrel so entire pose and sparks have at least30px blank margins inside its cell. Row5 column2 special2 and column3 special3 likewise shorten pistol barrel/arm and make muzzle flash smaller so no pixels are within30px of either side boundary; no stray sparks outside those cells. For ALL row5 Limit poses, keep flashes/casings compact inside their cells. Row7 columns1and2 Sleep MUST be STANDING upright on both feet, hat tipped down over eyes, right hand loosely on lowered gun, subtle breathing difference, NOT kneeling or sitting. Keep same character height as idle. Remove floating Z letters from sleep. Preserve flat pure #00FF00 background, NO text, labels, borders. No art on or across any cell boundary. Return full corrected54frame PNG.
```

