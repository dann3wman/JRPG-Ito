# Kugai: Protect v01

Built November 26, 2026. **Playable standalone draft, not artistically approved or engine-tested.** One new 3600 ms self-cast defensive action. Eight new generated actor keys and eight new generated ward keys are assembled with authored holds and a separate smooth light envelope. No reused character/effect pixels, placeholder actors, or combat-rule changes.

Open [the self-contained player](kugai-protect.v01.html) locally, then press Replay. It includes pause, normal/half speed, seeking, and light/dark backgrounds. Download [MP4](kugai-protect.v01.mp4), [APNG](kugai-protect.v01.apng), or [GIF](kugai-protect.v01.gif). GitHub's file view does not execute HTML. The player needs no server or external files.

[Implementation brief](../../../docs/sprite-requests/kugai-protect-action-2026-11-26.md) contains geometry, cells, timeline, references and a full creation prompt. [Timeline/import JSON](timeline.v01.json) is the rectangle, palette, anchor and event authority. [Actual validation](validation.v01.json) includes SHA-256 hashes.

## Actual outputs

- `source/kugai-warding.generated.png` and `source/protect-ward.generated.png`: original generated raster sheets, 1536x1024 each, four columns by two rows. Preserve as provenance, not import atlases.
- `kugai-warding.v01.png`: clean 384x192 actor atlas, eight 96x96 cells. `protect-ward.v01.png`: clean 512x256 ward atlas, eight 128x128 cells. Both unlabeled RGBA, binary alpha, nearest filtering.
- Matching `.ora` files: editable OpenRaster with three disjoint value layers (highlights, midtones, ink/cavities), merged preview, and actual raster data. These are value partitions, not an articulated body rig. Original generated sheets are flattened.
- Matching `.4x.png` previews: exact nearest-neighbor enlargement. `review.v01.png` is a labeled 552x552 review sheet; `review.v01.4x.png` is 2208x2208. Bitmap labels and borders are outside usable cells.
- `scene.pixel-native.v01.png` and `scene.pixel-4x.v01.png`: pixel-only comparison. `scene.dark.v01.png` and `scene.light.v01.png`: 1536x864 composited stills, including separately rendered smooth light.
- HTML, MP4 and APNG: 1536x864 scene. MP4 has 216 frames at 60 fps. APNG merges identical holds into 61 encoded frames while retaining 216 render slots and 3600 ms. GIF is a 768x432, quantized viewing derivative with 10 ms timing granularity, not palette authority. All scene renders include an opaque backdrop.
- Reproducible source: `build.py`, `render.js`, `player.template.html`, `export.cjs`, `encode.py`, `test.cjs`, `check-render.cjs`, `validate.py`, and exact prompts under `source/`.

## Rebuild

Dependencies: Python with Pillow and NumPy; Node with `@napi-rs/canvas`; ffmpeg/ffprobe. Run from this directory with those dependencies installed. Use an output directory outside the repository for intermediate frames.

```sh
python build.py
node test.cjs
node check-render.cjs
node export.cjs /tmp/kugai-protect-frames
python encode.py /tmp/kugai-protect-frames
python validate.py /tmp/kugai-protect-frames
```

The final validation updates the metadata's technical status and embedded HTML status only after checks pass. `repository-checks.txt` captures `bash tools/check.sh` from the repository root. Renderer/export/player plumbing was adapted from the existing Hisui Quake package on PR52; the art and Protect timeline are new.

## Status and limitations

| Reference available | Specified | Generated/built | Exported | Technically checked | Artistically approved | Engine-tested |
| --- | --- | --- | --- | --- | --- | --- |
| Yes | Yes | Yes | Yes | Pass, recorded checks | No | No |

GIF opened in GIMP and ran at normal and half speed. Live snapshots show ready and formed ward states. Full continuous motion review remains incomplete; snapshots and decoded equality do not certify smoothness. HTML controls were exercised through the shared runtime tests, not live browser interaction. Light and dark composited stills and the labeled art sheet were inspected. ORA layers were reopened and recomposited programmatically, not approved in Aseprite. No Aseprite source was requested or claimed; ORA is the editable alternative.

Observed generation defects corrected before playback: white matte despite a transparency request, alpha haze, and varying planted boots. Cleanup removes near-white matte, thresholds alpha, quantizes common palettes, aligns the boot edge and copies the six-row planted boot strip across actor keys. The original sources remain available. No changes were justified solely by the limited live samples. Remaining artistic concerns: arm/cape contour changes between generated keys, the amount of ward closure progression, and the ready/settle transition need continuous human review. This is not a finished or polished approval claim.

Playback is one shot with manual replay and no autoplay. Replay resets time, actors, effects and cue history. Seeking dispatches no cues and disarms already crossed cues. The APNG plays once. GIF metadata permits one repeat for convenience; desktop viewers may loop independently. Final effects disappear at 2900 ms; Kugai holds ready until 3600 ms. The persistent Protect status belongs to the game, not this transient visual.
