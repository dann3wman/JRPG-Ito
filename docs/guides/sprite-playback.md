# Sprite playback

The game remains a single HTML file. Its six embedded battle rigs and the viewer's 22 rigs use matching animation sampling code; `tools/animation-check/check.js` checks that block and sampled poses/FX for drift.

## Motion

1. **Clip transitions:** switching or interrupting an action blends from its outgoing pose for 160 ms by default, retaining and fading its outgoing effects. Actions fade into the continuous idle pose over their first 120 ms and last 220 ms. Each clip can override these timings and hold its final action pose.
2. **Continuous idle:** each unit has an idle clock independent of action time. Action offsets are measured against the authored idle and added to the current idle. Ghost trails sample earlier times, never the future end of a newly started clip.
3. **Loop seams:** idle sampling closes position and velocity with a cached Hermite correction. Warp frequencies complete a whole number of cycles per idle loop. Ostrel's smoke now drifts sinusoidally instead of jumping every two seconds; its spiral rocks slowly rather than resetting its rotation.
4. **Attack weight:** Undertow has a 12% overshoot and a longer return, Orlen's crozier settles after impact, and Ainsel's Offbeat moves through each snap in 60 ms. This keeps the classic Final Fantasy anticipation/strike/recovery pattern while retaining the horror's held poses.
5. **Joints and framing:** pivots are checked against sprite dimensions, attachment points outside parent art are reported for review, and framing samples the body across every action. The Puppeteers' second hip pivot moved inside its sprite while preserving the rest placement. The Whisperer's sleeve and elbow are fitted to the assembled reference. Existing artwork is retained; geometry checks do not prove painted overlap.
6. **Follow-through:** the Widow's tail and fins trail the lunge by 90 ms. Her hair settles progressively, and Orlen's ancestor chain responds after the crozier impact. These are bounded authored motions, not a physics simulation that changes with frame rate.

## Playback and rendering

7. **One clock:** visible frames up to 250 ms advance by their actual elapsed time, including ordinary slow frames. Hidden tabs and larger suspension gaps pause animation; resuming resets the timestamp. Hit reactions use the same unit clock. This visual clock does not change combat maths. Reduced motion freezes idle movement and suppresses trails, flinches and flashes.
8. **Sampling:** illustrated sprites use high-quality smoothing at every battle scale. The viewer defaults to the same policy, with Crisp available for inspection. Each atlas part is cached in a separate canvas with a two-pixel transparent border, preventing neighbouring atlas cells from entering the filter footprint. Source WebP sheets and atlas coordinates are unchanged.
9. **Load and cost:** encounter sheets, including scripted parts, are decoded and their used parts cached before battle starts. Static art remains until a canvas has actually drawn, including on load failure. Sustained high draw cost or slow frames switches battle effects to low detail: coarser warp strips, fewer tank lights/bubbles, no ghost trails and a device-pixel-ratio cap of one. Five seconds of inexpensive, fast frames restores full detail. Bone poses and action durations remain the same. The viewer's Effects selector allows comparison.

## Regression workflow

10. Run `node tools/animation-check/check.js` (also part of `tools/check.sh`). It samples 5,368 poses across 88 clips, checking finite transforms, positive scales, pivot bounds, idle seam position/velocity, action boundaries, interruption continuity and battle/viewer parity. Attachment-box warnings require visual judgement because some rigs intentionally separate bodies, floating pieces and effects.

For Chromium playback checks, use `node tools/animation-check/browser.js` with Playwright available to Node. `PLAYWRIGHT_CHROMIUM_EXECUTABLE` may point to an existing compatible Chromium installation. The script renders every clip, verifies real sheet transparency, exercises viewer controls, tests timing and reduced motion, checks missing-sheet fallback, and profiles six rigs with fourfold CPU throttling. Results and screenshots go to ignored `output/playwright/`. A throttled profile is evidence for that machine, not a universal frame-rate guarantee.

Capture a motion review with:

```sh
node .claude/skills/sprite-animation/scripts/snap.js widow undertow output/playwright/widow.png --frames 8 --seams --extrema --sequence
```

`--seams` adds samples just inside clip boundaries; `--extrema` adds the largest bone-motion extrema; `--sequence` adds idle/action/hit/recovery samples with an independent idle phase. Contact sheets show poses, not frame pacing, so pair them with browser playback. Review extreme poses with Bones and Reference enabled. Sheet-art revisions still follow the sprite-animation skill's image handoff workflow.

## Rig authoring

Open **Rig authoring** below the viewer's timeline. **Setup** pauses animation and displays the rest pose; **Animation** previews the selected clip. Select a bone in the skeleton or on the stage. Numeric fields and stage handles edit pivots, parent-relative attachments, rest rotation and scale. Moving a pivot preserves the artwork and the world placement of its children. Moving an attachment moves that bone and its descendants.

Edits remain in the current browser tab, including when switching creatures. Undo/redo is per creature and keeps up to 100 edits. **Export changed definitions** downloads a version 1 JSON patch containing changed resolved bone definitions, the constraint list, and changed clip metadata. **Import patch** validates and applies a patch for the selected creature; invalid input restores the previous rig. Export before closing or reloading the tab.

The patch is a review artifact. To apply it to source, replace the named bone definitions, replace the rig's constraint list, and replace the listed clip metadata while retaining each clip's `fn`. Exported bone definitions have already resolved any `fit` placement. Keep the six embedded battle rigs in `index.html` in sync with the viewer, then run the checks. No build step or runtime JSON fetch is introduced.

### Clip controls

The classic Final Fantasy anticipation/strike/recovery rhythm remains the default. Markers make those beats inspectable without changing combat timing. The Tide-Widow's Undertow markers correspond to its existing wind-up, maximum lunge and return. Deliberate holds and instantaneous swaps provide the contrasting horror rhythm.

```js
timing: { in: 0.12, out: 0.22, mix: 0.16, fxOut: 0.16, holdEnd: false },
markers: { anticipation: 0.1, impact: 0.9, recovery: 1.45 },
tracks: [{ bone: 'tip', field: 'r', mode: 'hold', keys: [[0, 0], [0.8, 12]] }],
swaps: [{ bones: ['mo1', 'm1'], keys: [[0, 'm1'], [1, 'mo1']] }]
```

These are optional clip fields; the track and swap example uses the Tongue's bone IDs. Track modes are `smooth`, `linear` and `hold`; tracks override the named authored pose channel before the action is layered on continuous idle. Swap groups set exactly one listed bone's alpha to 1 and the others to 0, after blending. Use real bone IDs, ordered key times within the clip duration, and positive scales.

`in` and `out` control action edge envelopes; `mix` controls the incoming clip's interruption blend and `fxOut` its outgoing-effect fade. Zero explicitly disables that blend. `holdEnd` keeps the final action offset: the viewer pauses there for inspection; battle playback retains the action offset over continuous idle until another clip starts. It does not extend combat Delay or block the turn loop. Marker buttons select exact frames. Markers never trigger damage or change battle maths.

### Optional limb targets

Select the lower bone of a two-bone limb and choose **Add target**. The target starts at its rest-pose tip with the existing bend direction. Edit its rig-space coordinates, bend direction and influence (0–1), or use **Move limb target** to drag the cross on stage. Zero influence preserves the authored pose.

```js
constraints: [{
  id: 'handTarget', upper: 'upperArmR', lower: 'forearmR',
  tip: [110, 126], target: [150, 80], mix: 1, bend: 1
}]
```

Each constraint names a direct parent/child pair. The tip is in the lower bone's sprite pixels; the target is in rig space. Constraints run in array order after forward transforms, using an analytic two-bone seed and a fixed refinement budget for non-uniform scales. Unreachable targets do not stretch limbs. A clip function can override `P.ik = { handTarget: { target: [x, y], mix: 0.5, bend: -1 } }`. Constraints remain optional; existing creatures receive no new targets by default. This follows the limb-target precedent used by Spine while retaining explicit control over unusual anatomy.

### Sheet coordinate migration

`sheet.py pack` now writes `.metadata.json` beside the atlas: source crop size/origin, actual scale per axis, trim offset and packed size. Retained parts carry an `unchanged` flag. Exact lossless WebP encoding preserves their hidden RGB as well as alpha.

```sh
python .claude/skills/sprite-animation/scripts/sheet.py migrate widow revised.metadata.json --out widow.rig-patch.json
```

This reads the current rig through `tools/rig-data/export.js` and proposes pivot/tip, child-attachment and constraint-tip updates. The mapping is `new = old × scale − trimOffset`. It assumes the old part coordinates correspond to the new source crop before trimming. Changed anatomy, different crop dimensions, rescaled artwork and pivots outside the new art require visual review. Neither the rig nor the sheet is installed by this command.

### Validation and visual references

Malformed rigs fail before sorting: duplicate/reserved IDs, missing parents, cycles, invalid sprites/masks, invalid numeric values and invalid clip/constraint metadata are errors. Unknown pose names identify the rig and clip. The animation checker samples authored marker/key boundaries as well as evenly spaced frames and respects explicit held endings and discrete swaps.

```sh
node tools/animation-check/authoring.js
python tools/animation-check/sheet_test.py
node tools/animation-check/editor-browser.js
node tools/animation-check/visual.js
```

The Python tests require Pillow and NumPy; browser checks require Playwright and Chromium. `authoring.js` also runs in `tools/check.sh`. `editor-browser.js` exercises the authoring controls and compares rendered frames across interruption. `visual.js` compares six deterministic extreme-pose PNG references and scans all clips for stage overflow, including effects and conservative warp displacement. It allows up to 0.5% changed pixels beyond an 8-level channel tolerance. Use the same Chromium version for stable comparisons; the initial references were captured with Chromium 156.0.8078.4.

References live in `tools/animation-check/references/`; captures and reports go to ignored `output/playwright/`. After reviewing an intended visual change, run `node tools/animation-check/visual.js --accept` to update the references. A comparison against newly accepted images is not independent proof of visual quality.

**Bounds** draws body and effect rectangles. **Fit effects** previews the complete sampled extent; the default body framing remains unchanged in intent. Overflow warnings are geometric review prompts and may include transparent margins. Current scanning identifies 10 effect-framing warnings; the 16 attachment warnings also remain for art review.

Intentional exceptions can be documented on a rig as `review: { attachments: { boneId: 'reason' }, overflow: { clipName: 'reason' } }`. Entries require a real bone/clip and a nonempty reason; reports retain the explanation rather than silently suppressing the finding. No existing warning has been automatically labelled intentional. References and numerical checks do not establish painted joint overlap or frame pacing on every device.
