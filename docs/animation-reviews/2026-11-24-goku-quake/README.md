# Goku Quake: incomplete animation review

**No sprite or timing changes. Not a quality pass.** All eight keys were inspected as frames; source-derived playback was opened and sampled at normal and half speed. Hood, face, cords and claw continuity remain unresolved. A speculative patch would risk removing intended follow-through, so this draft records the actual evidence without claiming a correction.

Source: [PR52](https://github.com/dann3wman/JRPG-Ito/pull/52), commit `465f560628aa3a0d32a339bb3d18bddcf144826c`. [Native PNG](https://github.com/dann3wman/JRPG-Ito/blob/465f560628aa3a0d32a339bb3d18bddcf144826c/assets/party-fx/goku-quake-v01/goku-casting.v01.png). SHA256 `e7f2087312d7c409fd775312967be40a69efbea1187c32d019d3c2476437949c`.

Goku was unreviewed in the22-entry Library rotation. Default head `b5d0e9f9ac45c21b2acf28784d75fd977d35eb91` has14 entries. Both histories are retained and independently appended. No matching Library native source resolved; source parity is unknown. Existing unmerged reviews are untouched. Source originals and editable ORA remain inPR52; no redundant art copy or corrected filename is manufactured.

## Frame and playback findings

384x192 atlas,4x2 row-major96x96cells,zero gutters,pivot48,86,8px safe padding. One action, eight drawings, nine exposures. Timings300/250/300/350/400/400/300/300/1000ms,total3600ms. One-shot, thenGQ01 holds. No timing assumptions or retiming. Diagnostic GIFs repeat; slow duration7200ms.

The brace, raised claw, extension, pressure, withdrawal and settling poses are readable. Planted boot pixels match across every frame. The largest spacing change isGQ03 toGQ04. The claw lowers further inGQ06 with trailing cloth, consistent with possible follow-through, so it was not frozen. Hood contours, face pixels and rear cords vary across drawings; claw foreshortening and recovery need further artistic assessment. These concerns are not certified defects with a tested repair. The one-second ready hold and held casting keys are intentional metadata, not dropped frames.

Physical hand-to-target contact is not part of this actor track. Stone impact at1500ms and target response belong toPR52's separate choreography. This actor-only review cannot approve that contact, impact weight or engine integration.

## Completed checks and limits

All unique frames and enlarged head/foot details viewed. GIMP playback sampled at1x/0.5x; GQ03 throughGQ08 and terminalGQ01 paused individually. The delivered normal GIF is byte-identical to the viewed GIF. Screenshots during playback are not full continuous perceptual verification. No professional smoothness approval. Reference videos were not inspected this run.

Dimensions, rectangles, frame order, measured bounds, safe padding, binary alpha,24-colour palette, fixed boots, exact nearest4x, source ORA recomposition, all decoded GIF pixels and exposure delays pass. Source files remain unchanged. `bash tools/check.sh` exits0; existing Quick Song/Delay drift and16 creature attachment notices remain. Drift decisions already live in implementation-status open questions2/3. Final whitespace diff checked before commit.

## Evidence

[Normal](goku.normal.gif) · [Half speed](goku.slow.gif) · [All frames](goku.labelled.4x.png) · [Timing/import metadata](goku.timing.json) · [Validation](validation.json) · [Full review](review.json)

Rebuild with `python3 build.py /path/to/goku-quake-v01` after extracting the pinned source package. Requires Pillow and NumPy. This script writes evidence only. No54-pose importer changes, game edits, new palette, layout change or artistic redraw.

## Persistent outputs

- [goku.normal.gif](https://chatgpt.com/library?file_id=libfile_fde3_f-21577b743ac48191a34c80680a3801f9_5857d73f1cec8191b4bdff001e4a3037&account_id=personal)
- [goku.slow.gif](https://chatgpt.com/library?file_id=libfile_fde3_f-390342fa9ec08191a90b4d4e4c9fbf7d_5857d73f1cec8191b4bdff001e4a3037&account_id=personal)
- [goku.frames.4x.png](https://chatgpt.com/library?file_id=libfile_fde3_f-da1f0defac64819195c17be0cb0f218a_5857d73f1cec8191b4bdff001e4a3037&account_id=personal)
- [goku.labelled.4x.png](https://chatgpt.com/library?file_id=libfile_fde3_f-fff9a60ce328819194a074f1924c16ca_5857d73f1cec8191b4bdff001e4a3037&account_id=personal)
- [goku.timing.json](https://chatgpt.com/library?file_id=libfile_fde3_f-47d799ecd0d08191956b45f148d7f942_5857d73f1cec8191b4bdff001e4a3037&account_id=personal)
- [build.py](https://chatgpt.com/library?file_id=libfile_fde3_f-c3194ecb2d848191a930bb8ccee9f384_5857d73f1cec8191b4bdff001e4a3037&account_id=personal)
- [validation.json](https://chatgpt.com/library?file_id=libfile_fde3_f-ec3526aac4d48191951a6a6bb13a5550_5857d73f1cec8191b4bdff001e4a3037&account_id=personal)

Publication branch: `animation-review/2026-11-24-goku-quake`. Actual publication SHA and PR URL are added to the persistent rotation record after creation. Keep draft; do not merge.
