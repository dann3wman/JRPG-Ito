---
name: sprite-animation
description: Create, fix and maintain sprite animations for the bestiary creatures in tools/bestiary-rig-viewer (bone rigs, rig clips, FX sprites, sprite sheets and their ATLAS entries). Use when adding or changing a creature rig or animation clip, when correcting a sprite animation that looks wrong, or when a creature's sprite sheet is missing parts or needs better art and a new sheet must be requested from ChatGPT. This skill is self-maintaining. Every correction gets logged in it as a reference for later work.
---

# Sprite animation

The bestiary creatures are animated as **cut-out bone rigs**: each creature has one sprite sheet of separate body parts. A rig of bones places and rotates those parts, and each animation clip is a function of time that poses the bones and spawns FX sprites. All of it lives in `tools/bestiary-rig-viewer/index.html`. The sheets sit beside it as `<creature>.webp`.

This skill is maintained, not static. Two duties always apply:

1. **Before generating or changing any animation, read [`references/corrections-log.md`](references/corrections-log.md)** and follow the Standing rules at the top of this file. They hold every mistake already made once.
2. **After any correction to a generated animation, update this skill** (see [Maintaining this skill](#maintaining-this-skill)). A correction is not finished until it is logged.

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
4. **Log it** (below). If the root cause is the sheet art itself, go to the ChatGPT handoff.

### Sheet art is lacking: ChatGPT handoff
Sprite sheet art is generated in ChatGPT, not here. When a part is missing, too small, drawn in the wrong pose, cut off, or doesn't match the style:
1. Fill in [`references/chatgpt-prompt.md`](references/chatgpt-prompt.md) for this creature. Name every revision concretely (which part, what is wrong, what it must look like and why the rig needs it). Then output the finished prompt to the user in one copy-paste block, telling them to attach the current `tools/bestiary-rig-viewer/<creature>.webp` to the ChatGPT message.
2. Also save the filled prompt as `docs/sprite-requests/<creature>-<yyyy-mm-dd>.md` so the request is on record.
3. When the user brings the new sheet back, put it in the repo and integrate it:
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
5. Commit the skill update together with the fix.

## Standing rules

Distilled from the corrections log. Check every new generation against these.

- Sheets must have real alpha. ChatGPT sometimes paints a grey-and-white "transparency" checkerboard. `sheet.py detect` warns when a sheet is almost fully opaque. If you get a flat backdrop instead, key it with `--key`. Pick a key colour that isn't in the creature's palette (most of the bestiary is red/pink, so use green, not magenta).
- Keep part pixel scale consistent with the existing sheet, or pass `--scale`. Rig coordinates are in sprite pixels, so a rescaled part silently shifts every `pv` and `at` that refers to it.
- Pivots go where the joint is drawn (shoulder ball, hip, neck base), and the overlap must be painted on both sides so rotation hides the seam.
- A looping clip must have `fn(0)` equal to `fn(dur)`. Use periods that divide `dur`, or wrap with `t % idleDur` when an action reuses idle.
