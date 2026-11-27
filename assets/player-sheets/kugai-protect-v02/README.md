# Kugai Protect v02: cape fringe correction

Partial review, not artistic approval. Exactly one actor sprite sheet was selected.

KP06 retained four disconnected pixels from KP01's copied boot strip. When the cape rises, these pixels remain below it without a connecting contour. Cleared local `(76,80), (77,80), (76,81), (76,82)` in KP06 and the same positions in the editable ORA. The other seven cells and all other pixels are unchanged.

Source: [PR58](https://github.com/dann3wman/JRPG-Ito/pull/58), commit `b91a11056c8456316e39fe9d554c5650810db9e5`, `assets/party-fx/kugai-protect-v01/kugai-warding.v01.png`. Source SHA256 `841d3a27ad3388d58515ca137792fb48155ed2d59a6466d5ee8c0384cdb76bdf`; corrected SHA256 `9cb360ca63afad181662df07a53bd3213c2cb63d6532cac8d3f7437564f5e7ed`.

## Geometry and action

384 × 192 PNG; eight 96 × 96 cells, four columns by two rows, row-major; zero gutters/margins; pivot (48,86); 8 px safe padding; 24 opaque colours and binary alpha. Preserve the faceless void, heavy armour, red cape, left shield and lowered right-hand sword. The shield raises into a held ward pose, the cape trails, then the actor lowers the shield and settles. FFVI/FFRK-style held keys are retained without indiscriminate in-betweens.

| Frame | Start ms | Duration ms | Intended pose |
| --- | ---: | ---: | --- |
| KP01 | 0 | 300 | Ready |
| KP02 | 300 | 250 | Draw shield |
| KP03 | 550 | 300 | Raise |
| KP04 | 850 | 350 | Present |
| KP05 | 1200 | 400 | Brace |
| KP06 | 1600 | 400 | Hold, cape follow-through |
| KP07 | 2000 | 300 | Lower |
| KP08 | 2300 | 300 | Settle |
| KP01 | 2600 | 1000 | Terminal ready |

Timing comes from PR58 metadata, with no timing assumptions or changes. Runtime action is non-looping, 3600 ms. GIFs repeat only for inspection; slow GIFs double all holds to 7200 ms. Ready-to-ready preview seam is exact. The held brace is intentional, not an added stutter.

The source scene fixes feet at (224,180), ward anchor at (224,150); cast cue850, Protect activation1500, effect clear2900, completion3600 ms. This is a support action, not a strike; no attack contact or recoil was invented. Ward artwork was not selected or edited.

## Inspection and checks

All eight unique source poses and rebuilt before/after contact sheet inspected. KP05/KP06/KP07 lower cape crops distinguish the remnant from connected cloth. Before and after GIFs opened in GIMP; live screenshot samples examined at 1x and 0.5x. These samples do not constitute full continuous motion verification.

The frames retain readable raise/brace/recovery silhouettes and stable boot placement. The corrected cape exposure loses the detached fragment. Shield geometry, helmet rims, arm/cape contours and pose-to-pose shading still vary and need further artistic review. Weight, arcs, volume, secondary motion, flicker and full-scene effect contact are not approved by this four-pixel repair.

`validation.json` records exact pixel delta, unchanged regions, 24-colour palette equality, binary alpha, frame bounds, safe padding, exact nearest-neighbour 4x scaling, editable ORA layer recomposition and decoded GIF pixel/duration equality. All previews are rebuilt from the reopened PNG. No blur or antialiasing was introduced.

`bash tools/check.sh` passed. Existing Quick Song/Delay drift is already tracked in implementation-status questions 2/3. Sixteen unrelated creature attachment notices remain. These repository checks do not establish this standalone sheet's engine compatibility.

## Reproduction and integration

With Pillow and NumPy installed:

```sh
python3 build.py /path/to/pinned/kugai-protect-v01
```

The builder requires the exact source SHA and never modifies the source directory. PNG, ORA, metadata, review sheet, GIFs and validation are rebuilt. The original remains recoverable from the pinned source commit.

This is a standalone actor replacement for PR58, not a 54-frame party sheet. When integrating PR58, point its `kugai-warding` atlas at `kugai-warding.v02.png`, preserving the original cell rectangles, actor track, effects and cues. No gameplay/importer files are changed here. Engine integration and full ward-composited playback are untested.

## Source reconciliation and remaining work

Default branch `ccr-d8829a5a-ays4x1` at `b5d0e9f9ac45c21b2acf28784d75fd977d35eb91` and open review PRs were consulted. Protect had no review in the 24-entry persistent rotation; latest was Ren Delay Shot, while Kugai Provoke is separate. PR58 is unmerged and provisional. Matching native Protect Library bytes were not found, so source parity is unresolved. Source reference specifications were read; animation reference videos were not re-viewed in this targeted cleanup.

Keep this PR draft until shield/helmet/contour continuity, uninterrupted motion at both speeds, complete ward context and engine compatibility are checked. Resume this review branch rather than duplicate it; rotate the next independent review to another character.

## Delivered files

- [kugai-warding.v02.png](https://chatgpt.com/library?file_id=libfile_fde3_f-ae52611a789c8191ba4227dacc803b06_5857d73f1cec8191b4bdff001e4a3037&account_id=personal)
- [kugai-warding.v02.json](https://chatgpt.com/library?file_id=libfile_fde3_f-9435e5f5680c81918177415743399bc4_5857d73f1cec8191b4bdff001e4a3037&account_id=personal)
- [kugai-warding.v02.4x.png](https://chatgpt.com/library?file_id=libfile_fde3_f-e9e84be6108c819190c40962a0f1b7b8_5857d73f1cec8191b4bdff001e4a3037&account_id=personal)
- [kugai-warding.v02.ora](https://chatgpt.com/library?file_id=libfile_fde3_f-56d98961cd188191aa8ff6fc16622188_5857d73f1cec8191b4bdff001e4a3037&account_id=personal)
- [warding.before.normal.gif](https://chatgpt.com/library?file_id=libfile_fde3_f-73c3be2d2b288191b03505e2e4284cba_5857d73f1cec8191b4bdff001e4a3037&account_id=personal)
- [warding.before.slow.gif](https://chatgpt.com/library?file_id=libfile_fde3_f-8add92f86a68819194ce45ea2b4a3ba9_5857d73f1cec8191b4bdff001e4a3037&account_id=personal)
- [warding.after.normal.gif](https://chatgpt.com/library?file_id=libfile_fde3_f-5907041bbe6081918416276f5cfb5a73_5857d73f1cec8191b4bdff001e4a3037&account_id=personal)
- [warding.after.slow.gif](https://chatgpt.com/library?file_id=libfile_fde3_f-31d6ea2c5c708191895dd6770a610da8_5857d73f1cec8191b4bdff001e4a3037&account_id=personal)
- [frames.before-after.2x(2).png](https://chatgpt.com/library?file_id=libfile_fde3_f-8ca69df7fe448191a3f2d26bda4f9de3_5857d73f1cec8191b4bdff001e4a3037&account_id=personal)
- [build(7).py](https://chatgpt.com/library?file_id=libfile_fde3_f-8b7f03eb9ac88191a212eba811564619_5857d73f1cec8191b4bdff001e4a3037&account_id=personal)
- [validation(8).json](https://chatgpt.com/library?file_id=libfile_fde3_f-3d8736817a5c8191bdcb46eda0d6de4e_5857d73f1cec8191b4bdff001e4a3037&account_id=personal)

Full review record: [2026-11-27-kugai-protect.json](../../../docs/animation-reviews/2026-11-27-kugai-protect.json). Actual publication identifiers are added to the persistent review log after publication.
