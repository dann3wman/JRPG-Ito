# Ren: Fire v01

Built November 19, 2026. Exactly one new, standalone 3000 ms action: a planted casting gesture summons a coal, throws it leftward, blooms against a target, leaves smoke/embers and recovers. Fire is Ren's Ring 2 black spell in docs/design-doc.md. This fills an unbuilt spell rather than repeating Spiral Cut, Cure or Blood Strike. The FFVI/FFRK precedent is preparation, travelling magic, a target-centered burst and restrained recovery. The flame's hollow center supplies the horror accent. Visual choreography is proposed, spell ownership is confirmed. No combat balance, MP/HP or status logic changes.

**Incomplete playable draft.** Generated/built and exported; technical results are in validation.v01.json. Artistic approval and engine tests: no. Chromium opened but explicitly blocked the local HTML file by organizational policy. No complete continuous playback, normal/half-speed perceptual review or live control approval is claimed. A static sheet or successful decoder is not an animation-quality pass. No speculative post-playback revision is claimed.

[Playable HTML](ren-fire.v01.html) | [MP4](ren-fire.v01.mp4) | [APNG](ren-fire.v01.apng) | [GIF](ren-fire.v01.gif) | [Timeline](timeline.v01.json) | [Validation](validation.v01.json) | [Review 4x](review.v01.4x.png).

## Sources and continuity

Inspected current default ccr-d8829a5a-ays4x1 at b5d0e9f9ac45c21b2acf28784d75fd977d35eb91, party-art cast.json Ren entry, actual embedded Ren portrait/sprite exported by party_art.py, design-doc Fire entry and open PRs. No equivalent Ren Fire package or PR found. Read actual review PR36 files: Hisui review has no pixel edits and explicitly remains partial. Preserve it, Kugai PR33 and Tetsugi PR30 unchanged.

Read current continuity records: Miren recovery brief libfile_6bfe860bb62c8191afed0871b6e0e0c2, Natsu Halo Glance brief libfile_ba10f229c3608191af2cf0b314dc8e73 and review rotation libfile_e3bd1f9d5db0819185bc1c703e5bf682 version17. These do not establish finished source art. Repository Halo Glance v02 remains authoritative for its own masks. This action has no dependency on those unfinished studies.

Five supplied clips are available locally: 20150430_3VYVy_-wuQ.mp4 (libfile_3d08908cd9608191bfd139d2d53d011c), 20150522_vNXuejzstyQ.mp4 (libfile_bde1fc1da2408191baeb0cf4de9e3547), 20150323_9h9tSnldEE8.mp4 (libfile_5ea2416c3fc08191afb807b6f13ec63b), 20150123_OIw2mFut1No.mp4 (libfile_585af039e0708191996443e0c5c5bfc0), 20150123_0qY82e8qugk.mp4 (libfile_643cd8293c4c81918fee2fa51a3decf4). Prior notes describe travel/contact at 8-14s, casting/layer overlap at 12-17s, convergence at 8-11s and party connection at 13-15.5s. No fresh continuous footage inspection is claimed. Menu time is not part of authored duration.

New art: eight generated captain casting poses and eight generated ember/flame/smoke keys. Reused: labelled training dummy from tools/party-sprite-viewer/fx/training-dummy.webp; build/player infrastructure adapted from Blood Strike PR34, not its artwork. Runtime moves the ember and target recoil; actor gesture and cloth motion are drawn. No arbitrary camera shake.

## Geometry and drawing contract

Origin top-left, left-facing. Native scene384x216, output1536x864. Scene safe bounds x8..375,y8..207. Ground baseline180; Ren feet(280,180), target feet(104,180). Actor 4x2 grid of96x96 cells, atlas384x192, pivot(48,86). Effect4x2 grid128x128, atlas512x256,pivot(64,64). Row-major, zero gutters/outer margins. Eight-pixel transparent safe margin in every native cell. Each actual rectangle, palette and measured content box is in timeline JSON.

Generated sheets1536x1024, source cells384x512. Actor was incorrectly right-facing: whole source cells flipped horizontally, then nearest-scaled72x76 and positioned x12 with last opaque row85. This preserves pose anatomy and lands boots at world179. No copied foot strip. Effect scaled84x112 at(22,8). Original generated sources preserved. Alpha threshold200 and neutral-light haze removal minRGB>190, spread<22; whole-sheet quantization24 actor colours/16 effect colours. Artist review still needed for likeness, pistol hand laterality after mirroring, hand/hat volume and coat continuity. Do not label this canonical approved art.

| Row/column | Actor ID and change | Start / hold ms | Effect ID and change | Start / hold ms |
| --- | --- | --- | --- | --- |
| R1C1 | RF01 ready | 0 / 250 | FB01 coal | 500 / 200 |
| R1C2 | RF02 hand to chest | 250 / 200 | FB02 flying ember | 700 / 160 |
| R1C3 | RF03 cup hand | 450 / 250 | FB03 flame spear | 860 / 140 |
| R1C4 | RF04 extend halfway | 700 / 200 | FB04 impact crown | 1000 / 120 |
| R2C1 | RF05 release palm | 900 / 250 | FB05 hollow bloom | 1120 / 180 |
| R2C2 | RF06 wrist recoil | 1150 / 250 | FB06 fold inward | 1300 / 200 |
| R2C3 | RF07 lower hand | 1400 / 250 | FB07 smoke/embers | 1500 / 220 |
| R2C4 | RF08 settle | 1650 / 350 | FB08 last ashes | 1720 / 280 |

RF01 reused2000..3000, ninth exposure, not a ninth drawing. Actor total3000; effect500..2000 totals1500ms. Gameplay one-shot, no ping-pong. Cues once each: release700, damage1000, effect_clear2000, action_complete3000. No gameplay mutations. Ren stays x280. Ember pivot path (ms,x):500:254,700:250,1000:116, y139, smoothstep rounded to native pixels. At1000 attaches to target x+12. Target x:0:104,1000:104,1120:96,1600:104,3000:104. All effects hide and actors exactly restore their initial pixels at end.

Pixel layers are binary alpha, source-over, nearest4x. Do not blur or interpolate unrelated actor drawings. Controlled dark stepped outlines, solid narrow forms; contour artistry remains a visual check. Composition: opaque384x216 background; separate768x432 smooth rear light source-over linear2x; target/actor/flame native384x216 nearest4x; separate contact light screen linear2x. Smooth glow is explicitly excluded from exact pixel-only previews. Glow follows the impact, not the entire screen. No imported review guides.

Review552x552, exact4x2208x2208. Header(8,4), monochrome bitmap labels outside cells. Actor x8,144,280,416 and y24,136; effect same x and y256,400. One-pixel exterior grey borders. Label y=cellTop+cellHeight+2. Native import sheets are clean/unlabelled.

## Actual files and use

ren-casting.v01.png (384x192), fire-bloom.v01.png (512x256), corresponding exact4x atlases1536x768 and2048x1024, two editable ORAs, original generated PNGs, full prompts, renderer/build source, review, scene samples and timeline. ORA layers are real non-overlapping value partitions Highlights/Midtones/Ink and cavities, not semantic limb rigs. Recomposition is validated. No Aseprite export is claimed; ORA is the editable alternative.

Self-contained HTML has replay, pause, normal/half speed, seek and light/dark backgrounds. No auto-loop. Replay resets actors/effects/cue history. Seeking does not dispatch cues or re-arm previously passed cues. MP4:180frames,60fps,3seconds. APNG:one play with exact rational timing, merged identical holds allowed. GIF768x432 is a quantized viewing derivative with one repeat, not import authority. Gameplay remains one-shot. Captions label the secondary target PLACEHOLDER outside usable art.

Requires Python/Pillow/NumPy, Node @napi-rs/canvas, ffmpeg/ffprobe. From repo root:

```sh
python3 assets/party-fx/ren-fire-v01/build.py
node assets/party-fx/ren-fire-v01/test.cjs
node assets/party-fx/ren-fire-v01/export.cjs /tmp/ren-frames
python3 assets/party-fx/ren-fire-v01/encode.py /tmp/ren-frames
node assets/party-fx/ren-fire-v01/check-render.cjs
python3 assets/party-fx/ren-fire-v01/validate.py /tmp/ren-frames
bash tools/check.sh
```

Checks: dimensions/order/rectangles,8px safe bounds, anchors,palette,binary alpha, exact4x, ORA layers,3001 timeline states,301 rendered bounds samples,1500ms FX/3000ms action, single damage cue, replay/seek/pause logic, decoded APNG pixel equality and timing, GIF timing,MP4 decode, terminal equality. Live controls, continuous movement/hand attachment/contact, target response rhythm, smoke persistence and recovery need further perceptual review on both backgrounds. Repository checks do not establish engine integration. Initial duration assertion caught a100ms mismatch; metadata/cue now match the actual1500ms effect track ending2000. No missing requested playback format.

## Complete copy-ready creation prompt

Build exactly one Ren Fire action from the two art prompts below. Preserve the current scarred older captain identity, dark hat/coat, brass buttons, teal trousers and low pistol. Assemble the exact grids, safe margins, anchors, frame table, timing, path, target recoil, layer rules and cleanup above. Keep flame and actor on native pixel grids; smooth light separate. Produce the actual self-contained player, editable ORAs, atlases, review, timeline, renderer and decoded animation outputs. Do not alter combat rules. Review normal and half speed against pale stone and dark teal; keep draft status when review is blocked.

```text
Create eight cohesive full-body pixel-art animation keys for Ren casting FIRE in FINAL FANTASY THE HUMMING CRYSTAL. Reference image is identity reference. Weathered male airship captain late forties, stubble, dark widebrim hat, long charcoal captain coat brass buttons, muted teal trousers, leather boots, long pistol held low in right hand, free left hand casts. Exactly4columns2rows transparent1536x1024 canvas equal384x512 cells. Full figure facingLEFT threequarter, same proportions and scale, feet local192,450 each cell. Art containedx40..344 y60..460. Crisp16bit FFVI/FFRK pixel clusters, dark outlines, limited charcoal/brass/teal palette. Rowmajor8distinct articulated poses: ready; breath and draw free hand to chest; cupped hand lifted; extend casting arm halfway; full palm-left release; recoil wrist and coat followthrough; lower hand; settle ready. Boots planted, hat and head stable, subtle torso lean and cloth overlap. No fire baked in, no scenery, no text, no duplicate limbs. Preserve old captain face and hat; no swords. Cohesive restrained gothic horror.

Eight sequential FIRE spell pixel-art effect keys, gothic16bit JRPG, transparent1536x1024 atlas4columns2rows equal384x512cells no labels. Each centered192,256 artwithin60..324,80..432. Rowmajor1 compact smoldering coal with tiny ochre flame;2 windblown leftward ember with long smoky tail right;3 stretched flying flame spear;4 impact unfolds into low curling flame crown;5 tall branching amber fire bloom with black hollow center;6 flame folds inward into ragged tongues;7 falling rust-orange embers in charcoal smoke;8 sparse ember ashes. Distinct detailed coherent evolving shapes, ivory hot edges, muted ochre amber burnt sienna charcoal, no neon rainbow or blue. Stepped crisp pixel clusters controlled dark contours, no blur/glow/background/characters/weapons/text. Fire should resemble a lamp burning in an empty room, beautiful and unsettling. Generous transparent space eachcell.
```
