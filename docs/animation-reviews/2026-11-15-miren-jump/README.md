# Miren Jump review · 15 November 2026

**Incomplete. No sprite or choreography changes, and no production pass.** This review examines exactly one existing character sheet: the six-cell Miren Jump v03 study from PR #16. That PR's contact repair remains the source of truth for this study. This review does not duplicate or replace its asset changes.

The Library package and PR #16 match byte for byte for `poses.png`, `render.js`, and `timeline.json`. The current default branch has no corresponding Miren atlas. Base: `5fbc8b8c6e3366196eda437e0296ef1ff3ec71bf`. Source: `bbff8aa5bc72ea9a8bccb7f49009d47c6f97f945`, `assets/player-sheets/miren-jump-v03/`.

## Selection and scope

Miren was last reviewed on 12 November, before Kiri on 13 November and Natsu on 14 November. Relevant open PRs #14, #16, #18, #20, #21 and #23 were inspected; specification-only work was not treated as a finished character sheet. The six-pose study is provisional, not the project's standard 54-frame installed party atlas.

## Findings

All six native cells were inspected in an enlarged nearest-neighbour contact sheet. Hover, coil, ascent, suspension, dive and recoil are readable as distinct keys. The anticipation hold and suspended wait are intentional. Miren stays airborne; foot planting is not applicable to this action. The descent accelerates into an 80 ms contact hold, followed by recoil and a curved return. The inherited v03 contact correction keeps the spear tip attached to the moving target: the fresh 4,401-state check confirms zero registration error and continuous release.

The recovery remains unfinished. At 3,300 ms the torso, head, arm/spear and leg silhouettes switch abruptly from MJ06 to MJ01 even though the positional anchor is continuous. See `recovery-boundary.png`. Pose volume and secondary-motion development remain provisional. Moving the entire pose or adding repeated frames would not repair that drawing transition. No isolated pixel defect was established that could be corrected without changing the intended silhouette.

The study's silver/grey hair and muted costume also differ from the current cast specification's gold hair, red/dark iron armour and fused right-forearm spear. Source authority for that redesign is unresolved. This review preserves the existing study instead of presenting a new costume as an animation repair.

## Timing, playback and validation

The existing metadata defines 64 × 64 cells in a 3 × 2, 192 × 128 RGBA atlas, pivot (32,56), row-major MJ01 to MJ06. `timing.json` records the exact source timing with canonical source URLs; it is a reference, not an installed importer. The action lasts 4.4 seconds and holds hover on completion. Its 700 ms suspension is a preview compression of five scheduler slots, not a gameplay duration. No new timing assumptions or changes were introduced.

The source renderer was rerun against the actual atlas. `jump.normal.mp4` contains 264 frames at 60 fps; `jump.slow.mp4` contains the same frames at 30 fps. These are current-source previews, not before/after claims. Enlarged frames preserve nearest-neighbour pixels; MP4 is a viewing derivative, not a palette reference.

Native GIMP playback was started and sampled at 1× and 0.5× using a 25 fps derivative of the existing v03 preview. Screenshots showed time advancing and poses changing. This overcomes the earlier inability to open playback, but does **not** establish complete continuous inspection of every beat. The newly rebuilt MP4 files were structurally checked, not independently played through. No matched reference animation video or engine compatibility test was completed. Motion quality remains unapproved.

Native checks passed: binary alpha, 21 opaque colours, all six cells within bounds, at least eight pixels of padding, exact source hash, unchanged dimensions/order/count and intact prior contact correction. The review introduces no resampling, blur or antialiasing into the atlas. Existing pose/anatomy inconsistencies remain.

## Reproduction and next run

Use the source directory at the pinned PR #16 commit. Run `node rebuild.cjs <scratch-output>` there, then `python3 rebuild-evidence.py <source-directory> <scratch-output> <review-output>`. This needs Pillow, FFmpeg and the source renderer's `@napi-rs/canvas` dependency. Do not copy this six-pose atlas into the 54-frame party importer.

Resolve the authoritative Miren design and author a recovery bridge before approval. Continue from PR #16's correction, preserve this review's incomplete status, and rotate to another eligible character next time. Publication details and output links are recorded in `review.json` and the persistent rotation record.
