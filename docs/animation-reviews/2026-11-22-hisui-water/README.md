# Hisui Water casting review, 2026-11-22

**Partial correction, draft. Not artistically approved or engine-tested.** Removed one detached dark pixel beside Hisui's torso in HW08. This is a localized cleanup, not a claim that the complete animation now meets professional quality.

Exactly one existing actor sheet was reviewed. All eight before/after poses were inspected, and both exported animations were sampled in GIMP at normal and half speed. Complete continuous motion assessment is unfinished. Boot, head, coat and shoulder-flower continuity still need work.

## Source and rotation

Source: [PR46](https://github.com/dann3wman/JRPG-Ito/pull/46), commit `b6ebeee6f0bf0d2cf8eb08490c5c53b444587649`, `assets/party-fx/hisui-water-v01/hisui-casting.v01.png`.

Source SHA256: `e53876b00d577fe9186f1c96c25cf7a7f724a888321ccbccc4c436812af32613`.
Corrected SHA256: `a274894be866e912c1ed4d1eec736f0239cb060b6fb0ba09c823dd2914e0f4e0`.

Fresh default branch head: `b5d0e9f9ac45c21b2acf28784d75fd977d35eb91` on `ccr-d8829a5a-ays4x1`. Source is a pending draft; it is absent from that default tree. No matching Library native actor sheet was resolved, so cross-source parity is unknown. Original source remains recoverable at the pinned commit. No pending source or correction was overwritten.

Water has no prior review. Latest review was Shio PR45. Other open reviews42,39,36,33,30 were considered. PR36 concerns Hisui Blood Strike, a different sheet. Goku/Sayo searches did not resolve a usable native sheet. Library rotation v20 and repository history differ because of unmerged reviews; both histories are preserved independently. See review.json for hashes and selection details.

## Geometry, timing and fix

384x192 native RGBA; four columns by two rows;96x96 cells;row-major;zero gutters;fixed pivot48,86;eight-pixel safe padding;24 opaque colors;alpha0/255.

| Order | Pose | Duration ms |
| --- | --- | ---: |
| HW01 | Ready | 250 |
| HW02 | Gather blades | 200 |
| HW03 | Cross blades | 250 |
| HW04 | Raise blades | 200 |
| HW05 | Release | 250 |
| HW06 | Lower blades | 250 |
| HW07 | Relax elbows | 250 |
| HW08 | Settle | 350 |
| HW01 | Ready terminal hold | 1000 |

Existing3000ms one-shot preserved. No timing assumption, extra drawing or layout change. Inspection GIFs repeat for viewing;half-speed files use6000ms. The intentionally held gathering keys remain. Source Water/target impact is at1280ms and cannot be validated from an actor-only preview.

At HW08 local(37,49), atlas(325,145), RGBA(36,27,30,255) becomes(0,0,0,0). This isolated pixel has no matching coat/hair connection or particle path. All other pixels are exact. Existing ORA disjoint value layers and order are preserved; they are not semantic limb layers. Other detached hair detail is retained.

## Validation and limits

All eight frame pairs inspected. Original and rebuilt corrected GIF playback sampled at1x/0.5x. Exact decoded GIF pixels and delays pass, as do one-pixel delta, unchanged remaining cells, palette, binary alpha, safe bounds, ORA recomposition and nearest-neighbor4x checks. `bash tools/check.sh` exited0; existing Quick Song/Delay warnings and16 creature attachment notices are unrelated and retained. See repository-checks.txt and the asset validation.json.

Normal/slow samples do not establish complete continuous rhythm approval. Remaining contour/shading variation, intended weight shifts, blade/flower consistency, full effect contact and engine compatibility are not signed off. Reference clips listed in the source brief were not freshly inspected in this localized run.

## Files and reproduction

Assets: [native PNG](../../../assets/player-sheets/hisui-water-v02/hisui-casting.v02.png), [metadata](../../../assets/player-sheets/hisui-water-v02/hisui-casting.v02.json), [editable ORA](../../../assets/player-sheets/hisui-water-v02/hisui-casting.v02.ora), [4x sheet](../../../assets/player-sheets/hisui-water-v02/hisui-casting.v02.4x.png), [all frame pairs](../../../assets/player-sheets/hisui-water-v02/frames.before-after.2x.png).

Previews: [before normal](../../../assets/player-sheets/hisui-water-v02/casting.before.normal.gif), [after normal](../../../assets/player-sheets/hisui-water-v02/casting.after.normal.gif), [before slow](../../../assets/player-sheets/hisui-water-v02/casting.before.slow.gif), [after slow](../../../assets/player-sheets/hisui-water-v02/casting.after.slow.gif).

To reproduce with Pillow and NumPy, extract the pinned PR46 source directory without overwriting this branch and run:

```sh
python3 assets/player-sheets/hisui-water-v02/build.py /absolute/path/to/hisui-water-v01
```

The builder rejects an unexpected source PNG hash, reopens the final PNG, rebuilds every preview, and validates the decoded output. It edits no source files. The metadata retains the actor atlas mapping and exposure track. Integration into PR46 requires using the v02 actor atlas in its existing renderer/timeline while preserving its Water effects, target choreography and cues. This standalone8-pose asset is not compatible with the54-frame party-sheet importer without dedicated integration.

## Persistent output links

- [hisui-casting.v02.png](https://chatgpt.com/library?file_id=libfile_fde3_f-82c61723c90081918ba85acaff5081a8_5857d73f1cec8191b4bdff001e4a3037&account_id=personal)
- [hisui-casting.v02.json](https://chatgpt.com/library?file_id=libfile_fde3_f-df42e619116481918bc81bebae8b1057_5857d73f1cec8191b4bdff001e4a3037&account_id=personal)
- [hisui-casting.v02.ora](https://chatgpt.com/library?file_id=libfile_fde3_f-9888ceca7bf8819183de50e8df44e69c_5857d73f1cec8191b4bdff001e4a3037&account_id=personal)
- [hisui-casting.v02.4x.png](https://chatgpt.com/library?file_id=libfile_fde3_f-a97290a1a7588191a0050448858a03c2_5857d73f1cec8191b4bdff001e4a3037&account_id=personal)
- [frames.before-after.2x.png](https://chatgpt.com/library?file_id=libfile_fde3_f-f17014a080e481919830843b5f93bb7b_5857d73f1cec8191b4bdff001e4a3037&account_id=personal)
- [casting.before.normal.gif](https://chatgpt.com/library?file_id=libfile_fde3_f-ae63e102001c81919a4a83ddaa14696b_5857d73f1cec8191b4bdff001e4a3037&account_id=personal)
- [casting.before.slow.gif](https://chatgpt.com/library?file_id=libfile_fde3_f-c8f7bdd0e0ac81919e14b5a21fd10cd8_5857d73f1cec8191b4bdff001e4a3037&account_id=personal)
- [casting.after.normal.gif](https://chatgpt.com/library?file_id=libfile_fde3_f-5a5c1f312fa8819187d14728c4119345_5857d73f1cec8191b4bdff001e4a3037&account_id=personal)
- [casting.after.slow.gif](https://chatgpt.com/library?file_id=libfile_fde3_f-eabbd9ea9e588191866a169361664b66_5857d73f1cec8191b4bdff001e4a3037&account_id=personal)
- [build.py](https://chatgpt.com/library?file_id=libfile_fde3_f-e9256b2332c08191826db4808b26b5c5_5857d73f1cec8191b4bdff001e4a3037&account_id=personal)
- [validation.json](https://chatgpt.com/library?file_id=libfile_fde3_f-29faa50e610c8191948b2ca5a5387b21_5857d73f1cec8191b4bdff001e4a3037&account_id=personal)
