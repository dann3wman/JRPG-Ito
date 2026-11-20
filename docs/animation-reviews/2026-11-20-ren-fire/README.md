# Ren Fire casting: partial review, no sprite edits

All eight actor poses were inspected and playback was sampled at normal and half speed. No safe, confirmed pixel correction was identified. This is **not a pass or artistic approval**. Continuous motion judgment, handedness/anatomy cleanup, reference-video comparison and engine integration remain incomplete.

Exactly one sheet was reviewed. The separate Fire effect atlas was not selected. Ren is unreviewed in the persistent rotation; existing Hisui, Kugai and Tetsugi review PRs were preserved.

## Source and timing

Pinned [PR37](https://github.com/dann3wman/JRPG-Ito/pull/37) commit `258b2bb256ae3fcbbdc06868c3ce33487e124396`. [Native source PNG](https://github.com/dann3wman/JRPG-Ito/blob/258b2bb256ae3fcbbdc06868c3ce33487e124396/assets/party-fx/ren-fire-v01/ren-casting.v01.png). SHA-256 `fc2c5dd2cc2582bccbc69962d05428b7c7840d4a1d803681189a42745310b9d9`. No matching current source was resolved in Library, so no cross-source hash parity is claimed. This unmerged draft is not approved canonical art.

384x192 atlas; 4x2 row-major 96x96 cells; pivot (48,86); 8-pixel safe margins; 24 opaque colors; binary alpha. RF01..RF08 then RF01, held 250/200/250/200/250/250/250/350/1000 ms. Three-second one-shot, not ping-pong. All timing comes from source metadata, with no assumptions or changes. Review GIFs repeat for inspection only.

## Findings

Preparation, outward extension, recoil and recovery are distinct. The coat fans after extension, then settles. The head/hat silhouette is largely stable. Detailed hand/face clusters and varying boot shading do not justify an isolated automatic pixel deletion. No tiny disconnected components were found. Preserving these poses avoids inventing anatomy or replacing planted boots with a copied strip.

The source was mirrored before export and explicitly flags pistol handedness and hand/hat/coat continuity. Those concerns remain open. Release at 700 ms precedes the full palm pose at 900 ms; the existing held/snappy timing was retained. RF01 returns exactly at 2000 ms and holds for 1000 ms. Actor-only previews cannot verify fire contact, impact or world motion.

All eight cells were visually inspected in the enlarged sheet. GIMP playback of the freshly rebuilt normal GIF was sampled at 1x and 0.5x. Discrete screenshots are not continuous motion observation, so spacing, flicker and professional animation quality are not certified. Supplied reference footage was identified from the source brief but not freshly inspected.

## Evidence and validation

[Normal playback](https://chatgpt.com/library?file_id=libfile_fde3_f-4dc1cc3bea208191af0eface6eae7a7a_5857d73f1cec8191b4bdff001e4a3037&account_id=personal) | [Half-speed playback](https://chatgpt.com/library?file_id=libfile_fde3_f-1b5b99a5f6448191bdf6f2099ab48ee9_5857d73f1cec8191b4bdff001e4a3037&account_id=personal) | [Frames at 4x](https://chatgpt.com/library?file_id=libfile_fde3_f-4fee3517fd108191a29bbd814e5e811d_5857d73f1cec8191b4bdff001e4a3037&account_id=personal) | [Timing](https://chatgpt.com/library?file_id=libfile_fde3_f-15622160d2848191b620e29720c1dd3e_5857d73f1cec8191b4bdff001e4a3037&account_id=personal)

Bounds match source metadata; safe padding, binary alpha and palette checked. Each decoded GIF exposure equals its intended nearest-neighbor enlarged source composite, with exact delays. The three-layer editable ORA recomposes byte-for-byte to the native PNG. No source pixels, geometry, order, frame count, timing or import metadata changed. No before/after pair is manufactured for unchanged art.

tools/check.sh exited 0: data, animation continuity/viewer parity and battle smoke checks passed; 2 existing Quick Song/Delay drift warnings and 16 existing attachment art notices. These do not validate Ren engine integration.

Rebuild with `python3 docs/animation-reviews/2026-11-20-ren-fire/build.py /path/to/pinned/ren-fire-v01`. Dependencies: Pillow and NumPy. The source package must be obtained from the pinned commit, since this review branch starts from the current default head and does not duplicate PR37 assets.

Publication branch and eventual commit/PR are retained in the [persistent rotation record](https://chatgpt.com/library?file_id=libfile_fde3_f-e3bd1f9d5db0819185bc1c703e5bf682_5857d73f1cec8191b4bdff001e4a3037&account_id=personal). Keep the PR draft until the remaining visual and engine checks are completed.
