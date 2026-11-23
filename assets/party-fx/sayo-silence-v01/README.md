# Sayo: Silence v01

New standalone 3.6-second battle-action animation. **Built and exported, technically checked, incomplete visual-review draft. Not artistically approved or engine-tested.**

[Play offline](sayo-silence.v01.html) · [MP4](sayo-silence.v01.mp4) · [Lossless APNG](sayo-silence.v01.apng) · [GIF](sayo-silence.v01.gif) · [Labeled review](review.v01.4x.png) · [Validation](validation.v01.json)

Sayo inhales, raises the tuning fork, sings a voice into an empty mouth, and makes a hush gesture. Three spectral threads close the mouth. The target dips as its voice is caught; the seam hangs, fractures and disappears while Sayo lowers her hand. This implements one established Silence action as a visual study, without changing its MP cost, three-turn duration, combat balance or status logic.

## New and reused contributions

New: eight generated full-body Sayo keys and eight generated mouth/wisp keys, native cleanup/registration, shared palettes, layered OpenRaster assets, and the new closing-mouth choreography. The actor retains silver hair, pale choir dress, tuning-fork chain and two shoulder faces. These generated interpretations, especially fine facial/chain details, still require identity approval.

Reused: renderer/export/player scaffolding and a visibly labeled secondary training-target image from Hisui Water PR46, commit `b6ebeee6f0bf0d2cf8eb08490c5c53b444587649`. No Water actor/effect artwork is reused. Native pixel art drives the action; procedural breath light only connects the gesture to the target. The target is placeholder context, not new enemy art. No finished full party sheet is claimed.

Confirmed sources: `index.html` Sayo static sprite and ink portrait, cast.json identity, design-doc Silence entry. Proposed: the spectral mouth, authored timing and battle rendition. [Current evidence and creation prompt](../../../docs/sprite-requests/sayo-silence-action-2026-11-23.md).

## Geometry and rendering contract

All origins are top-left, +x right/+y down. Read atlases left to right then next row. Both have four columns, two rows, zero gutters and zero outer margins. All opaque native pixels stay at least eight pixels inside their cell.

| Layer | Native/authored dimensions | Cell and anchor | Alpha/blend/filter/scaling |
| --- | --- | --- | --- |
| Sayo | 384x192 atlas | 96x96; pivot(48,86), safe x8..87/y8..87 | 24 opaque colors, binary alpha, source-over, nearest, exact4x |
| Mouth | 512x256 atlas | 128x128; pivot(64,64), safe x8..119/y8..119 | 16 opaque colors, binary alpha, source-over, nearest, exact4x |
| Stage and target | 384x216 scene | baseline180; target feet(104,180), Sayo feet(280,180), mouth(104,145); facing left | Pixel stage, source-over, nearest4x |
| Breath/activation light | 768x432 authored canvas | Same scene anchors times2 | Continuous alpha, rear source-over then restrained foreground screen, linear2x |

Scene output1536x864. Safe scene x8..375/y8..207 includes light. Source generated sheets1536x1024,4x2 cells384x512. build.py thresholds alpha at200, reduces each actor source cell uniformly to72x76 and each effect cell to84x112 with nearest-neighbor, and packs without independent frame scaling. Feet end at local row85, immediately before pivot86. The shared SS01 ankle/boot strip y80..85 replaces unintended stationary shoe variation. The generated source remains intact. Dark contours and stepped clusters are visually retained; there is no claim that every generated contour has passed an artist's one-pixel audit. No blur on pixel layers, no rotation, no opacity dissolve of native pixels. Color hex values and measured bounds are saved per atlas in JSON.

Review canvas552x552 native,2208x2208 exact4x. Header(8,4); columns8,144,280,416. Actor rows24,136; effect rows256,400. One-pixel borders outside cells; bitmap labels at top+cellsize+2. Review marks never enter imports.

## Cells, holds and event order

Sixteen unique drawings, nine actor exposures including ready reuse, eight effect exposures. One-shot duration3600ms. All rows below include the fixed pivot specified above.

| Cell | Actor ID/state | Start | Hold | Effect ID/state | Start | Hold |
| --- | --- | ---: | ---: | --- | ---: | ---: |
| R1C1 | SS01 ready | 0 | 300 | SM01 breath wisps | 850 | 200 |
| R1C2 | SS02 inhale | 300 | 250 | SM02 lip arcs | 1050 | 200 |
| R1C3 | SS03 fork to throat | 550 | 300 | SM03 open mouth | 1250 | 250 |
| R1C4 | SS04 sing | 850 | 350 | SM04 threads gather | 1500 | 300 |
| R2C1 | SS05 hush gesture | 1200 | 400 | SM05 mouth closes | 1800 | 150 |
| R2C2 | SS06 sustain hush | 1600 | 400 | SM06 sealed seam | 1950 | 450 |
| R2C3 | SS07 lower hand | 2000 | 300 | SM07 seam fractures | 2400 | 250 |
| R2C4 | SS08 settle | 2300 | 300 | SM08 residue | 2650 | 250 |

SS01 repeats2600..3600ms and holds on completion. FX start850ms and hide2900ms. Cues exactly once: cast850, silence_activation1800, effect_clear2900, action_complete3600. These are preview notifications, not gameplay mutations.

Sayo's feet stay(280,180). Actor motion is drawn, not rigid sliding or crossfading. Mouth remains at(104,145); during SM04,1500..1800ms, its vertical scale eases1 to0.55, rasterized to integer height/position with nearest sampling. SM05 then supplies the hand-drawn closed shape. Target x keyframes:(0,104),(1800,104),(1950,102),(2300,102),(2700,104),(3600,104); y offsets:(0,0),(1800,0),(1980,3),(2300,3),(2700,0),(3600,0). Smoothstep segments round to native pixels. The gentle dip replaces a damage knockback and no camera shake is used.

Three small light motes depart at850+j*65ms for480ms each, moving from(254,124) to(104,145),12px sinusoidal upward arc, smoothstep progression. Activation light rises1650..1800, holds to1950, fades by2200. Layer order: stage, rear light, target, Sayo, mouth, restrained screen light, review-only labels. Effect hollow centre keeps target visible, but its overlap and reaction readability still need motion review.

Replay resets time, actors, transient layers and cue history. Pause freezes time. Speed1 or0.5 changes elapsed playback, not authored durations. Seeking changes the sampled pose without firing cues and does not re-arm consumed cues. HTML has no automatic loop. MP4 is one3.6s pass; APNG num_plays1; GIF has one repeat for viewing. Final rendered pixels match initial ready scene.

## Actual exports and reproducibility

- `source/*.generated.png` and `source/creation-prompts.txt`: original art and generation record.
- `sayo-singing.v01.png`, `silence-mouth.v01.png`: clean native imports; matching `.4x.png` files are exact pixel replication.
- Matching `.ora` files: three editable value partitions (Highlights, Midtones, Ink and cavities), not original generative semantic layers. Recomposition matches native PNG exactly. No Aseprite file is claimed; OpenRaster is the delivered layered format.
- `timeline.v01.json`: every rectangle, pivot, bound, palette, state, exposure, cue and layer rule.
- `review.v01.png`, `review.v01.4x.png`, two background scene stills, native/4x pixel-only scene.
- `sayo-silence.v01.html`: self-contained embedded-art player. Browser page is responsive; exported4x PNGs remain enlargement authorities.
- `.mp4` and `.apng`:1536x864,216 render slots at60fps. Lossless APNG may merge identical holds. `.gif`:768x432 quantized viewing derivative with20/10/20ms timing pattern, not import art or palette authority.
- Build/renderer/export/encode/validation code, README and actual JSON check reports.

Requirements: Python3 with Pillow and NumPy, Node.js with `@napi-rs/canvas`, ffmpeg/ffprobe. Use a scratch frame directory outside git.

```sh
python build.py
node test.cjs
node check-render.cjs
node export.cjs /absolute/scratch/silence-frames
python encode.py /absolute/scratch/silence-frames
python validate.py /absolute/scratch/silence-frames
```

Run `bash tools/check.sh` from repository root. This package does not install Sayo into the54-frame party pipeline or change index.html.

## Verification and remaining work

Actual native dimensions, row-major rectangles, alpha, palettes, safe bounds, anchors, exact4x pixels and ORA recomposition pass. Runtime samples all3601 integer milliseconds; rendered layers sample361 states. Four cues fire once each, one Silence activation; reset, seek-back, pause, half-speed logic and terminal hide pass. APNG decoded RGBA matches all216 renderer slots and sums3600ms; GIF sums3600ms; MP4 decodes216frames/60fps/3.6s. See validation.v01.json for measured results and hashes.

Inspected actual source sheets, labeled native keys and light/dark assembled stills. Corrected generated alpha haze and boot variation. Compared freshly extracted samples from all five supplied reference clips, not a fresh continuous timing measurement. GIMP opened but file dialog focus routing prevented loading/playback. Normal/half-speed continuous visual review and live HTML controls are unverified. No post-playback artistic correction is claimed. Potential remaining issues include head/hair contour variation, exact tuning-fork readability and pose-transition pops. The complete sequence is exported, but publication remains a draft pending continuous motion review, identity approval and engine integration. Technical checks do not settle those judgments.

Repository check: `bash tools/check.sh` passed exit0. Existing Quick Song/Delay drift warnings and16 creature attachment art notices remain unchanged and already tracked; see repository-checks.txt.
