---
name: sprite-animation
description: Create and revise player-character and bestiary sprite sheets, creature bone rigs, animation clips, FX and ATLAS entries. Generate images directly in ChatGPT or OpenAI Codex; provide copy-paste image prompts in Claude. Log corrections for later work.
---

# Sprite animation

The bestiary creatures are animated as **cut-out bone rigs**: each creature has one sprite sheet of separate body parts. A rig of bones places and rotates those parts, and each animation clip is a function of time that poses the bones and spawns FX sprites. All of it lives in `tools/bestiary-rig-viewer/index.html`. The sheets sit beside it as `<creature>.webp`.

This skill is maintained, not static. Two duties always apply:

1. **Before generating or changing any animation, read [`references/corrections-log.md`](references/corrections-log.md)** and follow the Standing rules at the top of this file. They hold every mistake already made once.
2. **After any correction to a generated animation, update this skill** (see [Maintaining this skill](#maintaining-this-skill)). A correction is not finished until it is logged.

## Platform and image delivery

Determine the platform from the actual session identity and exposed tools. A `.claude` skill path or `CLAUDE.md` in the repository does not mean the running assistant is Claude.

- **ChatGPT / OpenAI Codex:** use the available built-in image-generation tool to render the requested image and display it in the conversation. Inspect local reference images before supplying them to the tool. A saved prompt is a generation record, not the deliverable. Copy project images into the workspace without replacing existing assets unless replacement was requested.
- **Claude / Claude Code:** provide the finished prompt in one copy-paste block for ChatGPT and name the reference images to attach. Save the prompt under `docs/sprite-requests/`. Do not claim the image was rendered.
- **Unknown platform:** use explicit runtime identity first; if that is absent but a direct image-generation tool is available, use it. Ask which platform only when neither source settles the workflow.
- **ChatGPT tool unavailable or failed:** report the specific limitation. Do not silently substitute a prompt-only answer or claim generation succeeded. Offer the prompt or an API/CLI fallback; use a paid or credential-dependent fallback only when the user chooses it.

Use [`references/chatgpt-prompt.md`](references/chatgpt-prompt.md) as the art specification in either platform. Inspect the result for missing parts, identity drift and background/alpha errors. Distinguish generated artwork from a packed atlas, fitted rig and tested runtime animation.

### Player-character sheets

Read the playable cast in `docs/design-doc.md`, the house style and glossary, and the character's existing art before drawing. The battle's `ASSETS[id].p` and `ASSETS[id].s` hold portrait and sprite references; preserve their identity, clothing and weapon. If the next character is unspecified, continue any recorded queue; otherwise state a reasonable choice from the roster and proceed.

Match the requested sheet type: complete frames for frame animation, or an assembled rest pose plus separate body, weapon, hair, clothing and effect parts for a cut-out rig. Do not invent an existing player ATLAS or use the creature installer on a player character. Store new source sheets under `assets/player-sheets/`; packing, fitting and battle integration are separate work unless requested. Keep character scale and facing consistent across parts, and preserve complete overlap at every joint.

## How the system fits together

**Sprite sheet** (`<creature>.webp`): lossless WebP with real transparency, 1024 px wide. Parts are shelf-packed tallest first, left to right, with a 2 px gap. The sheet holds:
- `assembled`: the whole creature drawn in its rest pose. It is the reference that bones are fitted against, and the viewer's Reference toggle shows it. Multi-form creatures use `<form>_assembled` and set `ref` on the rig.
- Bone parts (`torso`, `head`, `upperArmL`, …): one per bone. They are drawn in rest pose orientation, and overlapping joints are drawn *complete* (a shoulder cap under the arm, the full neck under the head) so rotation never opens a gap.
- FX parts (`unwind`, `grab`, `call`, …): sprites a clip spawns, often named after the clip.
- Swap parts (`mouthOpen1`/`mouthShut1`, `eyeOpenL`/`eyeShutL`, `faceOpen`/`faceClosed`, `wickLit`/`wickOut`): alternate states of one part, toggled by alpha.

**`ATLAS`** (one long line near the top of the script): `ATLAS[creature][part] = [x, y, w, h]` on the sheet. Don't edit it by hand. Use `scripts/sheet.py`.

**`RIGS[creature]`**: `name`, `short`, `accent`, `arena`, `lore`, optional `ref`, `extend` (padding [l, t, r, b] for view bounds) and `tank`, plus `bones` and `anims`.
- Bone fields: `id`, `p` (parent), `img` (ATLAS part), `at` [x, y] (attach point in the *parent's* sprite pixels; world for roots), `pv` [x, y] (pivot in its *own* sprite pixels), `r` (rest rotation, deg), `s` (scale), `z` (draw order), `flip`, `a` (alpha), `warp {ax, amp, len, spd}` (sine ripple along an axis, for ribbons, hair and tendrils), `tip` (skeleton display only), `clip` (mask to another bone's silhouette), `box`/`fill` (a plain rectangle instead of a sprite).
- The second batch of creatures takes its bones from `GEN.<creature>`, fitted against the `assembled` sprite (world = assembled pixels). A bone can also carry `fit: [cx, cy, rot, scale, flip]` (the sprite centre in the reference frame), and `applyFits` derives `at`/`r`/`s`/`flip` from it.
- Bones are topologically sorted at load, so parents can be listed after children. Keep them readable anyway.

**Clips** (`anims.<name>`): `{ label, dur, fx: [...FX part names], fn(t, P, F) }`.
- `P[boneId]` holds offsets on top of the rest pose: `x, y, r, sx, sy, a, warp`. Setting `P.ghosts = [{dt, a}, …]` draws motion-trail ghosts.
- `F.push({ img, b?, at, pv?, r, s, sx, sy, a, z, blend, warp, reveal, revealDir, clip })` spawns an FX sprite. `b` attaches it to a bone (and `at` is then in that bone's pixels), and `blend: 'lighter'` makes it glow.
- Action clips usually start by calling the idle clip (`RIGS.x.anims.idle.fn(t, P, F)`) and then layer on top.
- Timing helpers: `osc(t, per, amp, ph)`, `keys(t, [[t, v], …])` (smoothstep keyframes), `ramp`, `env(t, a, b, c, d)` (fade in, hold, fade out), `pulse(t, at, len)` (0..1 inside the window, else -1), `hold`, `settle(t, t0, amp)` (decaying wobble after an impact), `chain(P, ids, t, per, amp, lag)` (overlapping action down a chain), `snaps` (hold-then-snap motion), `breathe`, `loopFx`, `hash(str)` (stable per-bone randomness).

## Workflows

### New or changed clip
1. Read the corrections log. Read the creature's rig, its existing clips and its sheet (`Read` the `.webp`) so you know which parts exist and how they are drawn.
2. Write the clip in the house style: build on idle, shape motion with `keys`/`env`/`settle`, use anticipation then overshoot then settle for attacks, and use `chain` for anything that trails.
3. Verify. Run `node .claude/skills/sprite-animation/scripts/snap.js <creature> <clip> <out.png> [--bones] [--frames 10]` and look at the contact sheet. For a looping clip the first and last cells must match. Check that joints stay closed, FX stay on stage, and nothing pops. Also open `tools/bestiary-rig-viewer/index.html?boss=<creature>` and play the clip if a browser is available.

### Fixing a generated animation
1. Capture the problem first. Snap the clip before you change anything.
2. Find the root cause in the generation (wrong pivot, rest rotation, missing part, bad timing curve, sheet art that can't support the pose), not just the visible symptom.
3. Fix it, then snap again and compare.
4. **Log it** (below). If the root cause is the sheet art itself, use the sheet-generation workflow below.

### New or revised sheet art
When a sheet is requested or a part is missing, too small, drawn in the wrong pose, cut off, or doesn't match the style:
1. Fill in [`references/chatgpt-prompt.md`](references/chatgpt-prompt.md). Name every revision concretely (which part, what is wrong, what it must look like and why the rig needs it). Apply **Platform and image delivery**: render directly on ChatGPT; deliver the prompt and attachment instructions on Claude.
2. Save the generation specification as `docs/sprite-requests/<character-or-creature>-<yyyy-mm-dd>.md`. Record the output path and actual verification when an image is produced.
3. For a creature revision whose integration is requested, use the following after the image is available. Player sheets follow the separate guidance above:
   ```sh
   S=.claude/skills/sprite-animation/scripts/sheet.py; W=<scratch dir, not in the repo>
   python3 $S detect new.png --out $W/<creature>      # add --key '#00ff00' if it came on a flat backdrop
   #   -> $W/<creature>.preview.png (numbered boxes; Read it) and $W/<creature>.parts.json
   #   rename partN keys to the ATLAS names (python3 $S show <creature> lists them); delete junk;
   #   a part scattered over several blobs (sparks, confetti) can map to a list of boxes;
   #   raise --block if parts come out split, lower it if neighbours merge
   python3 $S pack new.png $W/<creature>.parts.json $W/<creature>.webp --base <creature> [--key ...] [--scale 0.75]
   python3 $S diff <creature> $W/<creature>.atlas.json   # MISSING / NEW / RESIZED parts
   python3 $S install <creature> $W/<creature>.webp $W/<creature>.atlas.json
   ```
   `--base <creature>` (revised-parts mode) keeps every current part the new art doesn't replace, pixel for pixel. Leave it off for a full-sheet regeneration. Use `--scale` so the parts come out at the old sheet's pixel size (compare `torso` or `assembled`). Then the rig numbers mostly carry over. For every part `diff` reports as RESIZED, and every part `pack` reports as trimmed (its origin moved), re-fit that bone's `pv`/`tip` and its children's `at`. Then snap every clip of the creature, not just the one that prompted the request, and log the round in the corrections log.

## Maintaining this skill

After **every** correction to a generated sprite animation or sheet, whether the user pointed it out or you caught it:

1. Add an entry to the **top** of the Log section in [`references/corrections-log.md`](references/corrections-log.md) using its template. Record the specific problem with the original generation, its root cause, the implemented solution (with the exact before/after values or code), and the rule that prevents it next time.
2. If the lesson applies beyond one creature, add or sharpen a line in **Standing rules** below, citing the log entry. Keep the rules short and checkable.
3. If the fix exposed a gap in the tooling (a check `snap.js` could make, a step `sheet.py` could do), improve the script or note the gap in the log entry.
4. If it came from bad sheet art, record which ChatGPT prompt wording failed and what replaced it. Update `references/chatgpt-prompt.md` when the template itself was the problem.
5. Keep the skill update together with the fix. Commit only when the user authorizes a commit.

## Standing rules

Distilled from the corrections log. Check every new generation against these.

- Route by runtime platform, not repository folder names: ChatGPT renders images; Claude supplies copy-paste prompts (2026-10-25 platform correction).
- Sheets must have real alpha. ChatGPT sometimes paints a grey-and-white "transparency" checkerboard. `sheet.py detect` warns when a sheet is almost fully opaque. If you get a flat backdrop instead, key it with `--key`. Pick a key colour that isn't in the creature's palette (most of the bestiary is red/pink, so use green, not magenta).
- Keep part pixel scale consistent with the existing sheet, or pass `--scale`. Rig coordinates are in sprite pixels, so a rescaled part silently shifts every `pv` and `at` that refers to it.
- Pivots go where the joint is drawn (shoulder ball, hip, neck base), and the overlap must be painted on both sides so rotation hides the seam.
- A looping clip must match pose and velocity across its seam. Prefer periods that divide `dur`; use the shared sampler's continuous idle clock for action playback. Run `node tools/animation-check/check.js` and inspect `snap.js --seams --extrema --sequence` captures plus live playback (2026-10-25 correction).
- Keep the viewer and embedded battle sampling block identical; the animation checker enforces code and sampled pose/FX parity. Preserve the single-file battle prototype (2026-10-25 correction).
- Inspect off-parent attachment warnings against the assembled reference and extreme poses. A bounding-box warning is not proof of a visible joint gap; never move fitted parts solely to silence it (2026-10-25 correction).
