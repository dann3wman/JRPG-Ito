# Tetsugi: Chakra v01

One new 3.6-second standalone battle action. Tetsugi inhales, raises his hands, gathers feather vanes around his body, presses his palms as the stitches close, exhales and returns to guard. This implements an established self-heal, with no changes to HP, Stress or combat balance. Final Fantasy's brief, readable Monk recovery gesture is the structural precedent; the feather cage makes that comfort uneasy.

**Built and exported; technically checked; incomplete visual-review draft.** Not artistically approved or engine-tested. Open `tetsugi-chakra.v01.html` locally for Replay, Pause, Normal/Half speed, seek and dark/pale backgrounds. It is fully self-contained and needs no server. MP4 and APNG are 1536x864 at 60 fps, 216 render slots and 3600 ms. Identical APNG holds combine without altering timing. HTML and gameplay policy are one-shot; APNG plays once. GIF is a 768x432 viewing derivative with one repeat, quantised colours and 20/10/20 ms frame delays. It is not the pixel or palette authority.

## New and reused work

New generated raster artwork: eight full-body breathing/gesture keys, eight feather gathering/closure/release keys. Source sheets and the exact generation prompts are in `source/`. No actor or effect drawing is borrowed from another action. The two moving down fragments reuse a crop of this run's CF07. Runtime work adds deterministic inward light motes, lifted residue, separate soft light and depth compositing. No camera shake, random offsets, actor sliding, resampled rotation or interpolation between unrelated poses.

Reused engineering: the previous Kuro package's palette cleanup, OpenRaster writer, export/player skeleton and Playback event-state class, adapted to this action. Kuro's art, gameplay, and review corrections are untouched. The simple two-tone stage is secondary context, not a new background asset. No placeholder actor is used. This is not the standard 54-frame party sheet and is not installed in the battle engine.

## Geometry and registration

Top-left origin; x right, y down. Both atlases read left to right, then next row, 4 columns x 2 rows, zero gutters and zero outer margins. Actor cells are 96x96, atlas384x192, pivot(48,87), lowest shoe pixel row86. Actor pixels stay within x8..87,y8..87. Exact common shoe strip y81..88 prevents planted-foot shimmer. Feet anchor(236,180), so shoes touch row179 immediately above the baseline. Actor faces left. No runtime scale or translation. Heads/body are generated keys with restrained one-pixel breathing changes, not rig interpolation; final silhouette cleanup remains an artistic review item.

Feather cells128x128, atlas512x256, pivot(64,64), safe x8..119,y8..119. Effect begins centred at(236,140), rises only during release via the keyframes in timeline JSON. At peak the feather envelope surrounds the 66-pixel actor. Pixel scene384x216, output1536x864, safe x8..375,y8..207. Output is 4x nearest for pixel layers; no unwanted clipping. Source generation sheets are1536x1024, each source cell384x512. Cleanup uses a common sheet scale, alpha threshold200, shared palette and no independent crop/recentring. Thresholding removes generated backdrop haze; originals are retained.

## Cells and timing

Each row below names a distinct drawing. Actor TC01 is reused as the terminal exposure; it is not a ninth drawing. Millisecond intervals are half-open. JSON records exact rectangles, palettes, bounds, pivots, exposures, light rules and cues.

| Cell | ID | Action | First exposure ms | Duration ms | Pivot |
| --- | --- | --- | --- | --- | --- |
| R1C1 | TC01 | Low guard | 0 | 240 | 48,87 |
| R1C2 | TC02 | Knee bend / inhale | 240 | 200 | 48,87 |
| R1C3 | TC03 | Hands rising | 440 | 200 | 48,87 |
| R1C4 | TC04 | Open breath hold | 640 | 600 | 48,87 |
| R2C1 | TC05 | Palms pressed / seam closure | 1240 | 480 | 48,87 |
| R2C2 | TC06 | Exhale / palms separate | 1720 | 240 | 48,87 |
| R2C3 | TC07 | Hands descend | 1960 | 200 | 48,87 |
| R2C4 | TC08 | Rope settles | 2160 | 200 | 48,87 |

TC01 returns at2360 ms and holds1240 ms through3600. The effect clears at2480, leaving1120 ms of readable calm recovery.

| Cell | ID | Action | Start ms | Duration ms | Pivot |
| --- | --- | --- | --- | --- | --- |
| R1C1 | CF01 | Two feather tips | 640 | 160 | 64,64 |
| R1C2 | CF02 | Four rising vanes | 800 | 160 | 64,64 |
| R1C3 | CF03 | Six vanes gather | 960 | 200 | 64,64 |
| R1C4 | CF04 | Open feather cage | 1160 | 440 | 64,64 |
| R2C1 | CF05 | Stitches draw closed | 1600 | 200 | 64,64 |
| R2C2 | CF06 | Feather release | 1800 | 200 | 64,64 |
| R2C3 | CF07 | Separated down | 2000 | 240 | 64,64 |
| R2C4 | CF08 | Last ash fragments | 2240 | 240 | 64,64 |

Cues: gather640; heal1600 exactly once, while TC05 and CF05 overlap; effect_clear2480; action_complete3600. Tetsugi is both actor and recipient: pressed palms, restrained local light, relaxed shoulders and the exhale show the response. No target damage or invented enemy is needed. Replay resets time, cue history, actor and effects. Seeking samples visual state without dispatching cues, and backward seeking cannot re-arm prior cues. Pause stops time; hidden tabs pause. This preview dispatches no game mutations.

Effect y keys: (0,140),(1600,140),(1840,138),(2240,126),(2480,120),(3600,120). Use smoothstep between keys and round native coordinates. Two CF07 down crops move from x218/254,y146 toward x202/270,y114 over1900..2440, then hide. Six authored-resolution light motes begin640+j*55 ms and converge at1600; no randomisation. Pixel feather states change by drawn exposure, without opacity fades. Soft light uses smooth opacity envelopes. All effects hidden by2480. At3600 actors and background exactly equal the initial rendered frame.

## Layer and palette rules

Back to front: opaque native stage; rear soft light; rear upper feather half; actor; front lower feather half; restrained foreground healing light; review-only caption. Feather halves share the same source cell and split at scene effect y, so no independently moving seam. All art is visible without smooth light.

Actor24 opaque colours, feather16, exact palettes in JSON. Native alpha is0 or255. Dark contours are normally one native pixel, with occasional thicker generated cluster joins; uniform contour thickness is not claimed as automatically verified. No blur, gradients or antialiasing in native assets. No added dithering after quantisation. Controlled existing clusters are preserved. Pixel layers are source-over, nearest-filtered, scale4 for preview. Smooth light is separately rendered at768x432, continuous alpha, linear-filtered scale2, rear source-over and foreground screen. Generated art contains no baked smooth light. These rules belong to Chakra and are not project-wide effect restrictions.

`*.ora` files are real OpenRaster sources with three editable value-band layers (Highlights, Midtones, Ink and cavities), not semantic limb rigs or Aseprite animation documents. They reconstruct the native PNG exactly. The original generated PNGs and deterministic build script preserve reproducibility. JSON owns animation timing. No `.aseprite` file was produced or promised.

Review is552x552 native,2208x2208 nearest4x. Header at(8,4). Four columns x8,144,280,416. Actor rows y24,136; effect rows y256,400. One-pixel grey border outside cells; bitmap labels at cell y+size+2, outside usable art. Review text, background and guides never enter import atlases. Scene captions are preview-only.

## Actual files and reproduction

- `source/*.generated.png`, `source/generation-prompts.txt`: retained generated source and prompts.
- `tetsugi-breath.v01.png`, `chakra-feathers.v01.png`: clean native import atlases.
- Matching `.4x.png` and `.ora`: exact previews and editable source.
- `timeline.v01.json`: cell rectangles, palettes, timing, anchors, events and rendering rules.
- `review.v01.png`, `review.v01.4x.png`: labelled review.
- `scene.dark.v01.png`, `scene.light.v01.png`: assembled contrast checks.
- `scene.pixel-native.v01.png`, `scene.pixel-4x.v01.png`: pixel-only enlargement proof.
- `render.js`, `build.py`, `export.cjs`, `encode.py`, `player.template.html`: reproducible implementation.
- `tetsugi-chakra.v01.html`, `.mp4`, `.apng`, `.gif`: actual playable/rendered previews.
- `test.cjs`, `check-render.cjs`, `validate.py`, `runtime-validation.json`, `render-validation.json`, `validation.v01.json`: actual checks and results.

Requirements: Python3 with Pillow and NumPy; Node with @napi-rs/canvas; ffmpeg/ffprobe. From this directory, using a scratch frames path:

```sh
python3 build.py
node export.cjs /tmp/tetsugi-chakra-frames
python3 encode.py /tmp/tetsugi-chakra-frames
node test.cjs
node check-render.cjs
python3 validate.py /tmp/tetsugi-chakra-frames
```

`export.cjs` renders both player and video from the same code. Run `tools/check.sh` at repository root. Generated references and rendered frame intermediates are not additional committed packages.

## Validation and remaining work

Checks include both actual atlas dimensions, all16 row-major rectangles, palette membership/binary alpha, source bounds and pivots, exact4x replication, fixed shoe pixels, OpenRaster layer recomposition,3600ms total, heal synchronisation/event count, replay/seek/pause/half-speed logic,3601 state samples,361 rendered layer-bound samples, full APNG-to-render RGBA equality, decoded GIF duration, MP4 frame count and decode, and terminal/initial equality. Repository checks are recorded in the brief.

Native GIMP opened the actual108-layer GIF and playback was sampled at1x and0.5x. These are live samples, not complete continuous perceptual review. Light/dark assembled stills and every source key were inspected. The final anchor correction from(48,88) to(48,87), eliminating a one-pixel shoe gap, was checked in rebuilt output but not replayed live. Before playback, generated alpha haze was removed, shared palettes applied and shoes registered. No later artistic revision is falsely attributed to continuous playback.

Remaining: full normal/half-speed continuous review, live HTML control interaction, finer hand/head/gi volume continuity and contour cleanup, clarity of feather closure as healing, user artistic approval and battle-engine integration. ORA was reopened and recomposed programmatically, not in a desktop editor. Reference footage was inspected through available sampled action-window frames, not freshly played continuously. Treat this as an actual playable/exported draft, not a polished or production-approved animation.

Repository validation: `tools/check.sh` passed exit0, including all encounter smoke runs. Existing Quick Song/Delay drift warnings and creature attachment notices remain unchanged and already tracked. No engine integration is implied.
