---
name: party-art
description: Generate and maintain the standard art set for the twelve playable characters in index.html — an FFRK-style sprite sheet (54 battle and field frames in a fixed grid) and a 12-state portrait sheet (normal, hurt, low HP, high Stress, KO, each affliction, sleep, inspired). Use when making or replacing a party member's sprites or portraits, writing the ChatGPT request for them, slicing what ChatGPT returns, previewing it in tools/party-sprite-viewer, or embedding it in the game. Not for bestiary creatures (use sprite-animation).
---

# Party art

Party members are drawn as **frame sprites** (like FFRK and FF6), not bone rigs. Every character gets the same two pieces of art, laid out in the same fixed grids, so any character's sheet drops into the same code:

| Piece | Grid | ChatGPT canvas | House format |
| --- | --- | --- | --- |
| Sprite sheet | 6 × 9 = 54 frames | 1024 × 1536, flat `#00FF00` | `<id>.sheet.webp`, 96 × 96 px frames, feet on row 88, idle body height 56 px |
| Portrait sheet | 4 × 3 = 12 states | 1536 × 1024, black manga gutters | `<id>.portraits.webp`, 256 × 256 px panels (embedded at 154) |

Everything is driven by `scripts/party_art.py` and the character data in `references/cast.json`. The frame list and portrait states are defined once, as `FRAMES` and `STATES` in the script. The animations over those frames live in `references/anims.json` and the skill effects in `references/fx.json`, so the viewer's editor can change them. The viewer reads all of it from the generated `tools/party-sprite-viewer/manifest.js`.

## The standard

### Sprite sheet (54 frames, battle frames face left)

The complexity target is an FFRK character sheet: battle poses, status poses, and field walk cycles.

| Row | Frames |
| --- | --- |
| 1 | idle1–3 (breathing loop), ready1–2, defend |
| 2 | attack1–3 (main strike), attackB1–3 (second strike, for multi-hit skills) |
| 3 | advance1–2 (step in), chant1–2, cast1–2 |
| 4 | item1–2, hurt1–2, lowhp1–2 (FF kneel at 25% HP or less) |
| 5 | special1–3 (the class action, from `cast.json`), limit1–3 (Limit Break) |
| 6 | victory1–3, zombie1–2 (slack sway), ko |
| 7 | sleep1–2, paralyze, confuse1–2, berserk |
| 8 | walkD1–3 (field, facing down), walkU1–3 (facing up) |
| 9 | walkS1–3 (field, facing left; mirror for right), shock, downcast, listen (cutscene poses) |

**Derived, never drawn:** the white hit flash, Stone (greyscale), Vanish (translucent) and Mini (half scale). FFRK sheets bake these in as extra frames. Here the engine makes them from any frame, so they look identical across the cast and the ChatGPT request stays small. The viewer shows them under "Derived". Transformations such as Toad or Imp are left out because no party status transforms the body.

### Portraits (12 states, same framing in every panel)

| State | Shown when (`pState` in `index.html`, most telling first) |
| --- | --- |
| `ko` | KO |
| `berserk` `zombie` `paralyze` `confuse` `slow` | Afflicted with that affliction (the `AFFS` keys, lowercased) |
| `inspired` | Inspired (any of the five; one shared look) |
| `lowhp` | HP ≤ 25% |
| `strained` | Stress ≥ 75, or the character has fled |
| `normal` | otherwise |
| `hurt` | flashes over the card for the length of a hit shake |
| `sleep` | drawn as standard; the game has no Sleep status yet |

A state with no art falls back to the `normal` portrait, which the existing KO and Afflicted CSS filters then tint. So partial sets are safe to embed.

### Art direction: where the Ito horror goes

The portraits are drawn in Junji Ito's ink style. The sprites are not, and their prompt never names him. Ito's hatching and fine linework can't survive at 56 px, and asking for them pulls ChatGPT off pixel art and off the grid. The horror reaches the sprites through three concrete fields in `cast.json` instead:

- `accent`: the one saturated colour on a muted sepia, bone and grey palette that matches the ink portraits.
- `tell`: one small wrong detail that persists in every frame, battle and field alike, such as Miren's lifted heels or Kugai's blank face. This is Ito's ordinary-turned-wrong at sprite scale, and players learn to notice it on the field.
- `twists`: shared with the portraits. Sprite frames that show a portrait state (`FRAME_STATE` in the script: hurt, low HP, Zombie, KO, Sleep, Paralyze, Confuse, Berserk) get that state's twist.

A clean, nearly cute sprite next to an Ito portrait is intentional. It is the manga's cut from the ordinary to the wrong, the same move EarthBound and Mother 3 make with cheerful sprites.

Every portrait states the generic look for its state, plus the character's own horror (`twists` in `cast.json`). That twist is what makes a state an Ito panel instead of a filter. Natsu's halo faces open their eyes at low HP. Hisui's wounds bloom into flowers. Kugai has no face in any panel. A `twists.all` entry applies to every panel. When you add a character or a state, write a twist for it wherever the character's horror has a natural hook.

## Animations and skill effects

`tools/party-sprite-viewer/` is both the viewer and the animation editor. Animations are shared by the whole cast (`anims.json`: `{name: {frames, ms, loop}}`, one `ms` for every step; list a frame twice to hold it). Effects belong to one character's skill (`fx.json`).

**Editing.** Open the viewer, pick an animation and pause. Click a step on the strip, then reorder it, hold it (+1 step) or remove it. Click or drag frames in from the library, and set `ms` and Loop. Use the time scrubber and `,` `.` to step through every change in either layer, with onion skin and the ground and cell guides to check registration. Edits are kept in the browser, with undo and redo. **Download party-anims.json**, then:

```sh
python3 .claude/skills/party-art/scripts/party_art.py anims party-anims.json
```

It validates the set with the same rules the editor uses (`check_anims`, `check_fx`), writes both JSON files and rebuilds `manifest.js`. The standard animations (`REQUIRED_ANIMS`) can be changed but not deleted, because the game plays them by name. New animations are allowed.

**Effects.** An effect is a strip of square frames drawn above the target, the way FF6 and FFRK draw a weapon's slash over the enemy, not on the attacker's sheet:

| Field | Meaning |
| --- | --- |
| `who`, `skill`, `label` | the character, the `SKILLS` key in `index.html`, the display name |
| `image`, `cell`, `cols` | the atlas under `tools/party-sprite-viewer/`, the frame size, frames per row (row-major) |
| `ms` | each frame's own duration; the effect hides after the last one and never loops |
| `pivot` | the frame pixel placed on the target point |
| `anim`, `start` | it starts when that step of the character's animation begins |
| `at` | the target point, `[dx, dy]` sprite px from the character's feet (negative dx is toward the enemy) |
| `impact` | the frame on which the hit lands: damage number, hit flash and the target's `hurt` |
| `source` | the delivered package (editable source, prompt, validation) under `assets/party-fx/` |

The editor changes timing, sync, impact frame and placement. To add an effect, put the package in `assets/party-fx/<id>-<skill>-v<n>/`, copy its atlas to `tools/party-sprite-viewer/fx/<id>-<skill>.png`, add the entry to `fx.json` and run `manifest`. Keep the art in native pixels with binary alpha, and draw it with whole-pixel placement and no smoothing.

## Workflow

`P=.claude/skills/party-art/scripts/party_art.py`, `W=<scratch dir, not in the repo>`

1. **Request.** Run `python3 $P prompt <id> both`. It writes `docs/sprite-requests/<id>-sheet-<date>.md` and `<id>-portraits-<date>.md` and prints them. Run `python3 $P refs <id> --out $W` to export the current portrait and sprite (6×). Give the user the prompt in one copy-paste block. Tell them to attach `<id>-sprite.png` and `<id>-portrait.png` (portrait only for the portrait sheet) and to download the result as a PNG. Send each sheet as its own ChatGPT message.
2. **Slice.** When the art comes back:
   ```sh
   python3 $P sheet new-sheet.png <id> --out $W        # add --key '' if it has real alpha; --colors 32 to clamp the palette
   python3 $P portraits new-portraits.png <id> --out $W  # raise --inset if gutter shows at panel edges
   ```
   Then `Read` `$W/<id>.sheet.check.png` and `$W/<id>.portraits.check.png`. On the sheet check, every frame should stand on the grey ground line. Lunges should move horizontally and nothing should be cut off. Only the jump frames should float. On the portrait check, the head should sit in the same place in all twelve panels. Act on every `warning:` line. An empty cell, art touching a cell edge or a frame spilling out of the 96 px box usually means ChatGPT drifted off the grid. In that case, re-request the sheet rather than hand-patching it.
3. **Install and preview.** Run `python3 $P install <id> $W`. Then open `tools/party-sprite-viewer/index.html?who=<id>` and play every animation, including the derived looks.
4. **Embed.** Run `python3 $P embed <id>`. It writes `ps` (all 12 states), replaces `p` with the new `normal` portrait, and replaces `s` (the turn-order sprite) with idle1. Afterwards, check `FACE.<id>` in `index.html`, because the face focal point moves if the framing changed. Open the game and test a few states.
5. **Record.** Save ChatGPT's original image as `docs/sprite-requests/<id>-<kind>-<date>.source.png`, so the sheet can be re-cut when the slicer improves. Commit it with the request file, the installed `.webp` files, `manifest.js` and the `index.html` change.

## Rules

- Never change the grid order, cell count or frame names for one character. The point is that every sheet is interchangeable. To change the standard, edit `FRAMES`/`STATES` (and the animations through the editor or `anims.json`), run `manifest`, update this file and the Party art section of `docs/design-doc.md`, and re-request any sheets that no longer fit.
- Sheets come back on flat green, like the bestiary sheets. Key colours and the checkerboard warning are shared with `sprite-animation/scripts/sheet.py`, and so are its Standing rules on alpha.
- Don't name Junji Ito (or ask for hatching) in the sprite prompt. Put any new sprite horror into `accent`, `tell` or `twists`.
- Write each twist so it reads both as a portrait expression and as a pose. It also lands on sprite frames, and it overrides the generic frame description when the two differ.
- Keep each character's look in `cast.json` in step with the design doc and the current portrait. Prompts are only as consistent as that data.
- When a returned sheet needed a fix, or a prompt wording failed, note it in this file under a "Lessons" heading. Fix the wording in `sheet_prompt` / `portrait_prompt` so the next request is better.

## Lessons

- **2026-10-25 · Kiri · first sprite sheet.** The art followed the prompt well. The 6 × 9 grid held, the scarf spiral showed in every frame, and the Sleep and Confuse twists and the grey-green Zombie came through. Three problems were in the slicer, and all are fixed in `party_art.py`:
  - ChatGPT's rows drifted up to 10 px from an even split, so heads crossed into the cell above. The slicer now moves each grid line to the nearest empty gap (`bands` / `detect_cells`) instead of cutting evenly.
  - The thrown vial in item2 sat on an even column line and was being thrown away as a neighbour's art. Snapping the cut to the gap keeps it in its frame. `keep_own` then clears only blobs that touch the cell edge and aren't the main figure.
  - Background green blended into dark hair at about 50%, which is too far from pure green to key and too deep for an edge-only fix. The slicer now removes green spill everywhere (`despill`), except for characters marked `keepGreen` in `cast.json` (Goku, Fuyori), who get the edge-only pass.
  - Field side-walk frames (walkS1–3) came back three-quarter view rather than a true profile. They're usable, but if they look wrong in the field, strengthen the wording to "strict side profile, like FF6 field sprites walking left".
- **2026-10-25 · Kiri · first portrait sheet.** The framing stayed consistent across all 12 panels, and the twists landed: a spiral iris when strained, spiral irises when confused, a spiral traced beside her head while asleep. ChatGPT drew the panels 343 × 320, not square, so cutting a centred square from an even grid would have caught gutter. `portraits` now finds panels by their black gutters (`gutter_panels`) and takes the largest centred square inside each one, with the inset default lowered to 0.02. The new framing moved her face from 68% to about 58% across, so `FACE.kiri` changed from `[83,68,45]` to `[58,58,48]`. Always re-fit `FACE` after `embed`, and check the narrow party card, where the eyes clip first.
- **2026-10-25 · Natsu · sprite sheet.** It sliced cleanly with no warnings, and the halo faces showed in every frame as asked. Scaling idle1 to 56 px counted the halo, so her body came out about 18% shorter than Kiri's. `cast.json` now takes `bodyFrac`, the share of idle1's height that is the body (Natsu 0.82). Set it for any character with a halo, tall headgear or something floating above the head, and compare idle1 against an installed character before embedding.
- **2026-10-25 · Natsu · portrait sheet.** The panels sliced cleanly by their gutters (351 × 328), the framing held across all 12, and the centred face matched `FACE.natsu` with no change. Design note: the narrow party card crops to the face, so twists drawn at the panel edges (the halo faces, the Zombie whisperer at her ear) only show in full-portrait views. Put a twist on the face itself when it must read on the card.
- **2026-11-03 · Kiri · Spiral Cut effect (v01).** Delivered as a complete package: a 3 × 2 atlas of 64 px frames with binary alpha and six colours, per-frame durations (60/60/80/120/100/80, 500 ms), pivot (32, 32), an impact cue at the start of SC03 (120 ms), hide-on-complete, plus an Aseprite source and a validation report. It needed no cleanup. Stored with `impact` as a frame index, not a time, so the cue moves with the frame when durations change. Synced to start on `special2` (the forward sweep), the impact lands at 260 ms and the effect hides at 640 ms. That outlasts the 560 ms `special` animation, so the last pose holds 80 ms (the editor reports this). Design note: Kiri's own `special3` already leaves a spiral hanging behind her blade, so a second spiral now opens on the target. Two spirals at once is Uzumaki's repetition, and it reads as intended. If it reads as noise in battle, draw `special3` without the spiral rather than cutting the effect.
