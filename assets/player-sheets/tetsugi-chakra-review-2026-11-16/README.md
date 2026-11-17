# Tetsugi Chakra: independent actor review

**Technical checks pass; artistic review incomplete. No sprite or timing changes.** This is playback evidence and a scoped review, not a corrected asset or a professional-quality approval.

Selected exactly one existing actor sheet from merged PR28, current default head `b5d0e9f9ac45c21b2acf28784d75fd977d35eb91`. Tetsugi has no earlier entry in the 14-entry review rotation. The current open PR29 changes the bestiary, not this actor. Library searches did not resolve a matching Tetsugi source; no Library/repository hash parity is claimed. See review.json for source hash and links.

The unchanged source is `../../party-fx/tetsugi-chakra-v01/tetsugi-breath.v01.png`, with existing `.4x.png` and `.ora`. It has eight 96x96 cells, four columns/two rows, 384x192 RGBA, pivot (48,87), binary alpha and 24 opaque colors. No gutters or recentering. Its original timing is preserved in timing.json: TC01..TC08 for 240/200/200/600/480/240/200/200 ms, then TC01 for1240 ms. Total3600 ms, one shot and terminal guard. The review GIFs repeat only for inspection. No timing assumptions introduced.

## Findings

All eight unique keys were inspected in the nearest-neighbor source sheet. Actor-only GIF playback was rebuilt from that exact PNG, opened in GIMP and sampled at1x/0.5x. Samples are not complete continuous perceptual observation.

- Anticipation and keys: knee bend/inhalation leads into rising hands, open hold and pressed palms. These distinct keys read clearly as a self-directed ritual.
- Timing and spacing: the600ms open hold and480ms palm press are authored holds, not duplicate-frame mistakes. The long terminal guard lets the original effect finish. No interpolation added.
- Arcs and recovery: hands rise/outward, meet at chest, separate and descend. Rope/gi changes support recovery, though their shading/volume consistency remains unresolved.
- Weight/contact/alignment: common y81..88 shoe strip is identical in all frames; fixed pivot and no runtime translation. No slide, clipping or registration error established.
- Silhouette/anatomy: TC04-TC06 head angle, face silhouette and gi shading vary. A confident redraw preserving the intended chin lift and anatomy was not established, so no speculative patch is applied. Hand continuity still needs full motion judgment.
- Equipment/secondary motion: unarmed monk; no missing weapon. Rope settlement is present. No isolated small disconnected components found.
- Impact: self-heal has no weapon contact. Full feather/light context and event integration are outside this actor-sheet review.
- Loop seam: original one-shot returns to the exact TC01 pixels. Repeated inspection playback has no pose mismatch at its wrap.

## Validation and limits

Run `python3 assets/player-sheets/tetsugi-chakra-review-2026-11-16/build.py` with Pillow/NumPy. It validates each decoded GIF exposure against the source composite and timing, all eight metadata bounds/safety margins, binary alpha, fixed shoe pixels and ORA layer recomposition. Native assets are reused in place without redundant copies. Original source/editable layers remain unchanged and recoverable.

`tools/check.sh` passed exit0; existing Quick Song/Delay drift and creature attachment notices remain recorded in the repository. This does not test the standalone actor in the engine. No fresh reference-video playback, continuous full-action approval or final head/hand/gi cleanup was completed. Keep the PR draft. No before/after comparison is manufactured because pixels are unchanged.
