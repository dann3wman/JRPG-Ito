# Sprite playback

The game remains a single HTML file. Its six embedded battle rigs and the viewer's 22 rigs use matching animation sampling code; `tools/animation-check/check.js` checks that block and sampled poses/FX for drift.

## Motion

1. **Clip transitions:** switching or interrupting an action blends from its outgoing pose for 160 ms. Actions fade into the continuous idle pose over their first 120 ms and last 220 ms.
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
