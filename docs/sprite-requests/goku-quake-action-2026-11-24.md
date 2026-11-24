# Goku: Quake v01

New 3.6-second standalone battle action. **Built, exported and technically checked; incomplete visual-review draft. Not artistically approved or engine-tested.**

[Offline player](../../assets/party-fx/goku-quake-v01/goku-quake.v01.html) | [MP4](../../assets/party-fx/goku-quake-v01/goku-quake.v01.mp4) | [APNG](../../assets/party-fx/goku-quake-v01/goku-quake.v01.apng) | [GIF](../../assets/party-fx/goku-quake-v01/goku-quake.v01.gif) | [Review](../../assets/party-fx/goku-quake-v01/review.v01.4x.png) | [Actual validation](../../assets/party-fx/goku-quake-v01/validation.v01.json)

Goku braces, raises her enlarged claw, presses toward the ground, and withdraws. A crack grows into riblike stone slabs beneath a grounded target, lifting it once; slabs break, settle and disappear. This creates one established Quake action, not another spell's renamed export. New artwork: eight Goku keys and eight stone-fracture keys. Reused: utility pipeline and labeled secondary target from Sayo Silence PR49, commit 7b53d172e72c896fd2d1a85132664a4c30500a06. No Sayo actor/effect pixels reused. No combat balance, damage calculation or airborne immunity rules changed. Goku's Quake is black magic MP3 and misses airborne enemies; this standalone scene depicts a grounded target only.

## Evidence and scope

Default branch freshly verified as ccr-d8829a5a-ays4x1 at b5d0e9f9ac45c21b2acf28784d75fd977d35eb91. Root instructions and applicable skill files unchanged. Current design, cast description, actual embedded Goku sprite and ink portrait inspected. Recent commits and open PRs checked; no equivalent Quake action found. Read actual PR51 build.py: SS04 shortened to 250 ms, SS03 reused 100 ms before hush; raster unchanged. That separate Sayo correction is not incorporated or modified here. Latest review rotation version 22 checked. Miren recovery bridge and Natsu Halo Glance source records remain specifications; repository Halo Glance v02 supersedes masks. These are not Quake dependencies.

Sources: index.html ASSETS.goku, .claude/skills/party-art/references/cast.json, docs/design-doc.md. Goku is a calm young woman with dark hair, moss/earth hooded cloak, bone cords, whistle and one oversized furred claw. New rendition and stone imagery remain proposed pending identity approval. Portrait art is reference only and unchanged. No full 54-frame sheet is commissioned or installed.

Continuity IDs: libfile_6bfe860bb62c8191afed0871b6e0e0c2, libfile_ba10f229c3608191af2cf0b314dc8e73, libfile_e3bd1f9d5db0819185bc1c703e5bf682. Five user MP4s remain locally available. Revisited existing extracted samples: 20150430_3VYVy_-wuQ and 20150522_vNXuejzstyQ at8/10/11s, 20150323_9h9tSnldEE8 at12/14/16s, 20150123_OIw2mFut1No at8/10/11s, 20150123_0qY82e8qugk at13/14/15s. These are sampled imagery, not fresh continuous playback or measured durations. Target-centered pillars and buildup/convergence inform scale and layering without copying colors. No reference footage committed.

## Geometry, palette and compositing

Source sheets1536x1024,4x2 cells384x512, actual transparency. Native actor96x96,4x2 atlas384x192, pivot(48,86); native stone128x128,4x2 atlas512x256, pivot(64,106) at ground anchor. Both zero gutters/outer margins, row-major,8px transparent safe padding. Origin top-left,+x right,+y down. Actor feet(280,180), facing left; target feet(104,180); stones(104,180). Scene384x216, output1536x864, safe x8..375/y8..207, baseline180.

build.py thresholds source alpha at200, retains original files, scales actor cells uniformly to72x76 and stones to84x112 nearest-neighbor. Actor shoe bottom is local85, and GQ01 donor logic stabilizes stationary boot strip y80..85. Actor palette24, stone palette16; exact hex values and measured bounds in timeline JSON. This is per-asset treatment, not a universal effect restriction. Pixel layers have binary alpha, source-over, nearest filtering and exact4x previews. Dark stepped contours are retained; full artist audit of one-pixel outline consistency is unverified. No pixel opacity dissolve, interpolated drawing crossfade or resampled rotation.

Separate light canvas768x432 has continuous alpha and linear2x upscale. A small earth-colored activation light at(104,169),radius28, rises1450..1500, holds to1580 and fades by1900. Rear blend source-over, foreground screen at0.18 envelope. Order: stage, rear light, stones, target, Goku, foreground light, review-only labels. Target stays visible in front of the stone. There are no procedural particles or camera shakes standing in for authored artwork.

## Drawings and timeline

16 unique drawings; nine actor exposures including repeated ready, eight stone exposures. One-shot3600ms. All coordinates and frame rectangles are in timeline.v01.json.

| Cell | Actor state | Start/hold ms | Stone state | Start/hold ms |
| --- | --- | --- | --- | --- |
| R1C1 | GQ01 ready | 0/300 | QS01 crack | 850/200 |
| R1C2 | GQ02 brace | 300/250 | QS02 stone teeth | 1050/200 |
| R1C3 | GQ03 raise claw | 550/300 | QS03 rising slabs | 1250/250 |
| R1C4 | GQ04 extend claw | 850/350 | QS04 riblike peak | 1500/300 |
| R2C1 | GQ05 press ground | 1200/400 | QS05 fracture | 1800/150 |
| R2C2 | GQ06 hold pressure | 1600/400 | QS06 collapse | 1950/450 |
| R2C3 | GQ07 withdraw claw | 2000/300 | QS07 rubble | 2400/250 |
| R2C4 | GQ08 settle | 2300/300 | QS08 gravel | 2650/250 |

GQ01 repeats2600..3600 and holds afterward. Cues: cast850, impact1500 exactly once, effect_clear2900, action_complete3600. Preview cues do not mutate HP/status. Drawn hand/cloth/stone changes are distinct from runtime target movement. Target x keys:(0,104),(1500,104),(1660,100),(2000,104),(3600,104); y offsets:(0,0),(1500,0),(1640,-12),(1840,-4),(2000,0),(3600,0). Smoothstep segments rounded to native integers. Goku and the ground effect do not translate or scale. Target rises once and settles, no random shake. All transient layers hide before terminal ready.

## Deliverables and reproduction

Original generated sheets and complete generation prompts in source/. Clean native `goku-casting.v01.png` and `quake-stones.v01.png`, exact `.4x.png`, real `.ora` layered sources. OpenRaster contains three editable value partitions, not semantic costume layers; exact recomposition verified. No Aseprite format is claimed. Review552x552 and2208x2208 exact4x: header(8,4), columns8,144,280,416; actor rows24,136; effects256,400; outside borders and bitmap labels at cell bottom+2. No review markings in imports.

Self-contained HTML has replay,pause,normal/half speed,seek and pale stone/dark teal backgrounds. No auto-loop. Replay clears cue history and resets actors/effects; seek does not emit events or re-arm passed cues. MP4 is1536x864,216frames at60fps,3.6seconds. Lossless APNG one-play, identical holds may coalesce. GIF768x432 uses20/10/20ms pattern and one repeat; quantized viewing derivative, not import/palette authority. Final scene matches initial pixels. Native and4x pixel-only stills verify exact enlargement independently of smooth light.

Dependencies: Python3/Pillow/NumPy, Node.js/@napi-rs/canvas, ffmpeg/ffprobe. From package directory:

```sh
python build.py
node test.cjs
node check-render.cjs
node export.cjs /absolute/scratch/quake-frames
python encode.py /absolute/scratch/quake-frames
python validate.py /absolute/scratch/quake-frames
```

## Verification and limitations

Actual geometry, rectangles, palette membership, binary alpha, safe bounds, anchors, boot equality, exact4x and ORA recomposition checked. Runtime tests3601 integer times and361 rendered states; cue/reset/seek/pause/half-speed logic and cleanup pass. All216 lossless decoded APNG slots match renderer; APNG/GIF total3600ms; MP4 decodes216frames at60fps. Repository tools/check.sh passes, retaining existing documented Quick Song/Delay warnings and16 attachment notices.

Inspected native review and light/dark assembled stills. Generated alpha haze cleaned, boot strip stabilized, stone pivot moved from inherited midair64 to ground106, and target drawn above stone to keep response readable. These are source/static assembly corrections, not post-playback claims. Fresh GIMP attempt failed to enter the export path because the focused text field could not be identified. Continuous normal/half-speed review, live HTML controls and GUI editable-source reopening remain unverified. Head/cloak continuity, claw anatomy and pose pacing require artistic review. Engine integration is untested. Publish as an explicitly incomplete draft; technical success does not certify smoothness.

## Complete copy-ready creation prompt

Create exactly one new Goku Quake action using the two source-generation requests below and the complete geometry, timeline, layering, export and validation contract above. Preserve Goku's identity. Generate action-specific art, retain originals, clean and register it, assemble the playable sequence and export actual assets. Keep the target a labeled secondary placeholder, leave gameplay and unrelated review work unchanged. Do not treat this brief as a completed animation; validate actual output and publish a draft if continuous review is unavailable.

```text
Create eight cohesive 16-bit JRPG pixel-art action keys for Goku's QUAKE. References show her identity. Calm young woman, short dark hair, moss-green/brown hooded cloak, leather wraps, small animal bones on cords, right hand oversized furred claw, short bone whistle at belt. Preserve identity and original restrained gothic horror. Face LEFT. Transparent1536x1024 sheet, four columns two rows,384x512cells, no text/borders/scenery. Each figure centered x192 soles y450, same head/body scale about360px tall, identical planted feet. Hand-placed stepped pixels, one-pixel-looking dark outlines, moss/earth/ivory controlled colors. Eight distinct consecutive poses: 1 upright ready claw low;2 knees soften claw draws inward;3 claw rises slowly to chest;4 elbow extends forward claw palm downward;5 claw presses downward to waist height with slight torso lean;6 hold lowered claw with cloak following through;7 hand returns halfway to ready;8 settled ready with cloak at rest. Keep gradual hand path, head registration and silhouette volume, do not wildly change hair. No effect painted into character. No Dragon Ball imagery.

Create eight new consecutive QUAKE effect drawings for a gothic16-bit JRPG. Transparent1536x1024 sheet4columns2rows,384x512cells,no labels,borders,actors or scenery. Identical ground anchor at local(192,430). Stone fractures upward like a buried ribcage: earthy grey brown slate, ivory fresh broken edges, black cavities, no blood, no glow. Pixel-cluster treatment stepped curves and dark contours. Max art withinx40..344,y70..440. Frame1 thin jagged horizontal crack smallpebbles;2 crack opens with three small tilted stone teeth;3 stone teeth rise shoulder-high spreadingoutwards;4 tall branching riblike stone slabs at peak with airborne chips, clear open center;5 slabs break apart and tilt outward, dense impact detail;6 lower broken slabs settling with a compact dust cluster;7 flat rubble and receding dust;8 tiny residual gravel at anchor. Distinct coherent geometry across frames, no random changing rocks. Horizontal footprint about280pixels with thin ground crack allframes exceptlast. No full background, floor plane, blur or soft glow. Each cell same scale, no repeated full scenery. This is substantial action-specific artwork for Goku Quake.

```
