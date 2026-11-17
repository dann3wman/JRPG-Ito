# Natsu Cure eight-pose v03 review
Date: 2026-11-14. Status: partial correction, draft, not production approved.

## Source and selection
Exactly one character sheet was reviewed: the Library eight-pose Natsu Cure v02 study. Natsu was last reviewed Nov 11, Miren Nov 12 and Kiri Nov 13; this particular study was last reviewed Nov 9. Its known halo/volume defects made it the next eligible sheet. No finished new character sheet was assumed from a specification.

The current default branch is `ccr-d8829a5a-ays4x1`, base `c1840737fef12061165ef6bb553e7bfa166b717b`. AGENTS.md, animation and party-art guidance, asset/import conventions, corrections records and open PRs 14, 16, 18 were inspected. PRs 15, 17 and 19 are other art specifications. PR14's installed Natsu correction and PR18's Kiri review remain separate. No unmerged sheet was overwritten.

Freshly downloaded Library package `libfile_96d2a65d4eec81918a73ab44be444e72` supplies the v02 source and metadata. Native source identity: `libfile_e251df64fa708191b85e07cb91a764b5`; SHA-256 `4f38fee584c533cdab1e4bf72546394ec6a4938c1bfccd1b1c7f1ca333d5df6e`. This matches the earlier study record. There is no equivalent eight-pose atlas on the default branch; it is not the installed 54-frame sheet or the separate 4.1-second Cure choreography. Those sources are not interchangeable. The preserved source file is byte-exact.

## Action and timing
cast.json specifies hands pressed together, then opened outward, with the halo faces turning toward the target. The study expands that cue into eight poses. Its source timing is retained as study timing, not asserted as engine timing. No new timing assumption or import-layout change was introduced.

| Index | Pose | Hold ms |
| --- | --- | --- |
| 0 | idle | 400 |
| 1 | anticipation | 120 |
| 2 | prayer | 240 |
| 3 | charge | 100 |
| 4 | release | 140 |
| 5 | follow-through | 160 |
| 6 | recovery | 160 |
| 7 | settle | 300 |

384x192 RGBA; four columns, two rows; 96x96 cells, row-major. Pivot (48,87), foot baseline y=86. One shot, hold last; previews loop. Total 1620 ms, slow preview 3240 ms. First and last cells are identical. The 700 ms combined idle/settle seam hold is intentional preview pacing, not a duplicated-frame defect.

## Frame and playback findings
All eight poses of the sole Cure sequence were extracted and inspected as enlarged stills. Before and rebuilt final-after GIFs were run in the native GIMP animation player at 1x and 0.5x speed, with screenshot sampling through their cycles. This is live playback inspection, but not an in-engine test or a guarantee of professional motion quality. The final source-derived GIF was freshly reimported after the last edit. No matched external reference video was replayed during this review.

- Anticipation and the longer closed-eye prayer pose read clearly. The short charge to open-hand release is intentionally snappy; no indiscriminate in-betweens were added.
- Arms open toward the spell sparkle, followed by hair/robe extension and recovery. Silhouette remains readable, although body/head and hair volumes vary across cells.
- Feet retain the v02 registration repair in follow-through and recovery. Baseline and frame bounds are preserved. Boot shapes still vary; a fixed baseline alone does not prove ideal weight transfer.
- Halo face outlines changed shape and shading between poses beyond their head-relative translation. A rigid rim with independently changing facial features better preserves the cast specification.
- Spell sparkles are intentional secondary effects, not stray pixels. This sheet has no target, so healing contact/impact synchronization cannot be assessed here.
- No cell clipping or newly introduced palette colors/alpha fringe was found. Existing quantized clusters and anatomical variation remain. Recovery reaches the identical idle endpoint without a new seam displacement.

## Actual correction
636 pixels changed across frames 1 through 6: [110,110,108,98,104,106]. Existing idle artwork provides two canonical face-rim patches at head-relative integer positions. Original inner facial features are protected, retaining directional changes. The deterministic editable processing source is build.py; patch boxes and protected interiors are explicit in the JSON.

Every pixel outside the two patch boxes, every protected feature-interior pixel, and all pixels in frames 0 and 7 remain identical. Costume, hands, hair, legs, body motion, effects, order and holds are unchanged. Earlier foot-registration repairs belong to v02 and are not credited to this run. No generative redraw was used for this exact pixel repair.

An initial whole-face patch was rejected because it suppressed the specification's face-turn cue. The delivered revision repairs only the rims. Final output SHA-256: `969be514f6825a6e36a927843f6fc9dc93f7ee9715acc4dd871afe4b0e26ca6b`.

## Validation and reproduction
Run `python3 assets/player-sheets/natsu-cure-v03/build.py`. It rebuilds all exports from the preserved source. validation.json records source/output hashes, padded bounds for every frame, exact 24-color palette preservation, binary alpha, unchanged-region assertions, exact GIF decoding and durations, and nearest-neighbor enlargement. No native resampling, blur or antialiasing was introduced.

The before/after normal and slow GIFs cover the entire sequence. Single-after normal and slow GIFs are also included. JSON is the frame-order/timing/import handoff; this study is deliberately not installed into the engine's different atlas contract.

Repository checks and publication links are recorded in docs/animation-reviews/2026-11-14-natsu-cure.json. Output links are in library-links.json. Persistent rotation retains earlier entries, including pending reviews.

## Remaining issues
This is a focused repair, not a pass. Head/hair/boot volume drift and quantized shading require further artistic cleanup; facial-feature shading still varies intentionally or ambiguously within protected interiors. No matched FFRK reference-video comparison or engine integration was completed. Target-contact cues, compatibility with the installed 54-frame atlas and the separate 4.1-second choreography are unverified. Publish as draft and do not merge automatically.
