# Kugai Provoke v02: detached boot fringe cleanup

Review date: 2026-11-18. **Partial correction, not an artistic pass.** Exactly one character atlas was reviewed: the eight-pose Provoke actor. No portrait, other character, or pressure-effect atlas was edited.

Three detached pixels appeared beside the planted left boot during KP05 impact and KP06 rebound. The original build copies a registered boot rectangle [34,81,64,89), leaving these original pixels just outside its left edge. Removed KP05 local (33,84), (33,85), and KP06 (33,85). All other pixels are identical. This removes the isolated speck that appears for 100 ms, shrinks for 180 ms, then disappears.

## Source and authority

- Default branch `ccr-d8829a5a-ays4x1` at `b5d0e9f9ac45c21b2acf28784d75fd977d35eb91`.
- Source is unmerged creation [PR31](https://github.com/dann3wman/JRPG-Ito/pull/31), commit `f5908e1639759fb94df71d8dafda710afc2f0c4f`, `assets/party-fx/kugai-provoke-v01/kugai-provoke-actor.v01.png`.
- Source PNG SHA-256: `cab0ec260f1e00124aeae6c2704c313ecf47bf5fe7f5709dbe16e94dc0194f0e`.
- Corrected PNG SHA-256: `a5814be1d60f6ce18296b9596cfb0ebb8a8ab38ecdcfb4cb648d438f586aa527`.
- Read source README, build, timeline, request brief, current cast, applicable instructions and correction log. Kugai is a faceless Void Knight with right-hand broad sword, left-arm tower shield, dark plate and red trim. The action specification calls for raise, shield strike and forward brace.
- Repository rotation has 14 entries; Library rotation v15 has 15, including the pending Tetsugi review in PR30. Both histories were read and preserved. Kugai has no prior review in either. PR30 was not re-reviewed. PR31 is a creation source, not a prior review; this branch does not overwrite it. Other open PRs32/29 are unrelated.
- Exact title and content searches did not resolve a matching current Kugai Provoke sheet in Library. The broad content search returned older concept/other material. No byte-equivalence or authority claim is made for those results. This correction is pinned to the actual Git source, whose original remains recoverable at that commit. Do not silently replace a different Library or future PR31 revision.

## Geometry and sequence

Native atlas384x192 RGBA; four columns by two rows, eight96x96 cells; row-major KP01..KP08. No gutter or outer margin. Pivot(48,86), boots end at row85, left-facing, safe local bounds8..87. Binary alpha and the original24 opaque colors are retained. No scaling, interpolation or new in-betweens were applied to the sheet.

| Exposure | Start ms | Duration ms | Pose |
| --- | ---: | ---: | --- |
| KP01 | 0 | 240 | Ready |
| KP02 | 240 | 180 | Load |
| KP03 | 420 | 140 | Raise sword |
| KP04 | 560 | 100 | Inward swing |
| KP05 | 660 | 100 | Shield contact and brace |
| KP06 | 760 | 180 | Rebound, cape lag |
| KP07 | 940 | 240 | Lower sword |
| KP08 | 1180 | 220 | Settled guard |
| KP01 | 1400 | 1600 | Terminal ready hold |

One-shot3000ms, not a runtime loop. Contact660ms, provoke1040ms, effect clear1720ms, complete3000ms. Timing comes directly from source metadata; no timing assumptions or changes. Review GIFs repeat the one-shot and use6x nearest-neighbor pixels on a gray background. Slow GIFs double every exposure to6000ms. The duplicate terminal ready is an intentional hold, not a missing in-between.

## Inspection and findings

All eight source and corrected keys were visually inspected in the enlarged sheets, including the contact and boot-detail crops. Original and final-PNG-derived GIFs were loaded in GIMP and live playback sampled at1x and0.5x. Those sampled observations are not a complete continuous perceptual review.

- Clear raised blade precedes the inward swing and shield brace. The short100ms strike/contact exposures contrast with longer recovery, appropriate to a heavy, snappy action. They were preserved.
- Head lowers through KP04/KP05 and rebounds in KP06. This supports the forward brace; no whole-body smoothing or translation was introduced.
- The common boot patch preserves foot planting. The detached exterior remnants are the confirmed defect repaired here. The post-correction crop and decoded previews confirm their removal.
- Blade crosses the shield region at contact and the cape opens behind the brace/rebound. Contact spacing, blade length/projection, helmet contour and armor shading vary between keys and still need continuous artistic assessment; this review does not certify anatomy, weight, arcs or volume continuity as production-ready.
- No cell clipping or padding violation. Silhouette stays inside the96px cell. The black void, costume, sword, shield, outline and all connected body pixels are unchanged.
- The final exposure is the exact opening cell, so the diagnostic repeat has no positional seam. KP08-to-KP01 internal shading/silhouette variation remains unchanged and is not certified as polished recovery.
- Reference `20150522_vNXuejzstyQ.mp4`, Library `libfile_bde1fc1da2408191baeb0cf4de9e3547`, was materialized and sampled at2fps over8..14s. It shows distinct preparatory/strike poses and effect emphasis, but is not the same shield action. No reference timing was copied. Reference footage was inspected as sampled stills, not continuous playback.

## Reproduce and import

Retrieve the source package at the pinned PR31 commit, then run:

```sh
python3 assets/player-sheets/kugai-provoke-v02/build.py /path/to/kugai-provoke-v01
```

The script refuses a mismatched source PNG hash. It applies the same three erasures to existing ORA layers and merged image, exports the native PNG, reopens it, and rebuilds all after previews from those delivered bytes. Six unaffected cells and every other pixel are checked byte-for-byte.

`actor.v02.json` contains exact frame rectangles, bounds, pivot, ordering, timings and cues. This is a standalone replacement for PR31's actor atlas, not the54-pose standard party atlas. Use nearest filtering, no mipmaps, and retain PR31's choreography and effect assets. No default-branch engine integration is claimed. If PR31 is integrated later, explicitly select this actor revision and preserve its source hash in the import record.

## Validation and remaining work

`validation.json` records exact pixel delta, unchanged palette, binary alpha, safe padding, boot registration, ORA layer recomposition, exact4x enlargement, and decoded GIF pixel/timing checks. All pass. `bash tools/check.sh` passed with exit0:22 rigs/88 clips,5368 sampled poses, viewer/battle parity and simulator smoke checks. Existing Quick Song/Delay documentation warnings and16 creature attachment notices remain outside this change; they are not validation of this new actor in the engine.

Draft required: full continuous motion review, contact/volume artistic cleanup and engine compatibility remain incomplete. No professional-animation approval is claimed. Deliverables and output links are indexed in `review.json`; the persistent rotation log receives the actual publication commit and PR URL after publication.
