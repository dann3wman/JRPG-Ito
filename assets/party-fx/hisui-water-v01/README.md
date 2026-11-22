# Hisui: Water v01

November 22, 2026. One new standalone 3000 ms battle action: Hisui gathers her twin blades, raises a tide around one target, releases a crest, and lowers her blades as the target recoils and foam recedes. Water is established as Hisui's black magic in `docs/design-doc.md`. This adds an unbuilt action instead of repeating Double Cut or yesterday's Blink. Ownership is confirmed; visual choreography is proposed. No combat balance, HP, status rules or engine integration changes.

Status: reference available, specified, generated/built, exported and technically checked. Incomplete visual-review draft. Artistically approved: no. Engine-tested: no. Eight new generated actor drawings and eight new water drawings. Only the labelled training dummy and infrastructure are reused, from Shio Blink PR43. New blade articulation, sleeves, crest growth and collapse are drawn; target recoil and separate lighting use runtime keyframes.

[Player](hisui-water.v01.html) | [MP4](hisui-water.v01.mp4) | [APNG](hisui-water.v01.apng) | [GIF](hisui-water.v01.gif) | [Timeline](timeline.v01.json) | [Validation](validation.v01.json)

## Source reconciliation

Default branch freshly verified as `ccr-d8829a5a-ays4x1`, commit `b5d0e9f9ac45c21b2acf28784d75fd977d35eb91`. Current cast, Hisui sprite/portrait and Water definition inspected. Open PRs and equivalent Water search inspected, with no existing Water action found. Latest separate review is [PR45](https://github.com/dann3wman/JRPG-Ito/pull/45): its actual build script copies two boot contact masks in Shio's casting sheet. That work is untouched. Review log `libfile_e3bd1f9d5db0819185bc1c703e5bf682`, current name animation-review-rotation.json, version 20, records the same 556-pixel sole repair and incomplete artistic review.

Miren `libfile_6bfe860bb62c8191afed0871b6e0e0c2` and Natsu `libfile_ba10f229c3608191af2cf0b314dc8e73` current brief headers were checked; these remain continuity references, not dependencies or implementation evidence. Halo Glance v02 supersedes the old source/masks. No earlier spec status is promoted.

Five supplied footage references remain locally available. No fresh continuous footage inspection is claimed. Prior notes inform the rising, overlapping, target-centered staging, especially the apparition and pillar clip. Reference windows, excluding menus: `20150430_3VYVy_-wuQ.mp4` / `libfile_3d08908cd9608191bfd139d2d53d011c`, 8-14 s; `20150522_vNXuejzstyQ.mp4` / `libfile_bde1fc1da2408191baeb0cf4de9e3547`, 8-14 s; `20150323_9h9tSnldEE8.mp4` / `libfile_5ea2416c3fc08191afb807b6f13ec63b`, 12-17 s; `20150123_OIw2mFut1No.mp4` / `libfile_585af039e0708191996443e0c5c5bfc0`, 8-11 s; `20150123_0qY82e8qugk.mp4` / `libfile_643cd8293c4c81918fee2fa51a3decf4`, 13-15.5 s. Footage is not committed.

## Geometry and drawings

Native scene 384x216; output 1536x864. Top-left origin, integer native positions, left-facing actor. Baseline 180. Hisui feet (280,180), pivot (48,86); target feet initially (104,180), context image top-left (72,123). Water pivot (64,64) placed at fixed world (104,145). Scene safe bounds x8..375, y8..207. Actor atlas 384x192, four columns/two rows, 96x96 cells. Water atlas 512x256, four columns/two rows, 128x128 cells. No gutters or outer margins; all occupied pixels stay at least eight pixels from cell boundaries. Exact measured rectangles and occupied bounds are in timeline.v01.json.

Generated sheets are 1536x1024, four by two 384x512 source cells. One common nearest-neighbor scale per sheet: actor 72x76, water 84x112 at local (22,8). Actor bottom registered to row 85 and right boot edge aligned to first key. No resampled rotations, random jitter or crossfading unrelated poses. Generated contour variation remains an artistic-review concern, especially boots and the shoulder flower.

| Cell | Actor state | Water state | Local pivots |
| --- | --- | --- | --- |
| R1C1 | HW01: ready | WT01: ripple | Actor 48,86; water 64,64 |
| R1C2 | HW02: gather blades | WT02: wavelets | Actor 48,86; water 64,64 |
| R1C3 | HW03: cross blades | WT03: rising ribbons | Actor 48,86; water 64,64 |
| R1C4 | HW04: raise blades | WT04: crest | Actor 48,86; water 64,64 |
| R2C1 | HW05: release | WT05: impact splash | Actor 48,86; water 64,64 |
| R2C2 | HW06: lower blades | WT06: collapse | Actor 48,86; water 64,64 |
| R2C3 | HW07: relax elbows | WT07: foam fragments | Actor 48,86; water 64,64 |
| R2C4 | HW08: settle | WT08: remnants | Actor 48,86; water 64,64 |

## Timeline and compositing

Actor HW01..HW08 then HW01 exposures: 250,200,250,200,250,250,250,350,1000 ms. Eight unique actor drawings, nine exposures. Water WT01..WT08 durations: 180,160,140,100,180,200,220,220 ms, starting at 700 ms and hiding at 2100 ms. Whole action is 3000 ms, gameplay one-shot, no ping-pong. Cast at 700 ms; single impact at 1280 ms, exactly when WT05 starts; effect_clear at 2100 ms; action_complete at 3000 ms. These are visual cues only.

Target x keyframes (ms,x): (0,104),(1280,104),(1380,96),(1600,98),(2050,104),(3000,104), smoothstep then rounded to native integers. Hisui stays at x280. Water stays at world104,145 rather than following recoil. At 1460 ms the target is redrawn above the collapsing water to make the response visible. This is the one intentional layer crossover. Light rises at 1280, peaks at 1320, holds to 1400 and fades by 1650 ms. Recovery returns to HW01 at 2000 ms, holds to 3000, and terminal pixels match initial pixels.

Layer order: opaque 384x216 backdrop, nearest 4x; separate rear water light authored 768x432 with continuous alpha, source-over, linear 2x; target, actor and water at 384x216 with alpha 0/255, source-over, nearest 4x; target response above water from 1460..2100; optional runtime impact light from the same 768x432 layer, screen blend, linear 2x. The light is procedural support, not the main artwork. Pixel layers use sheet-wide palettes of at most 24 actor and 16 water colors. Alpha threshold 200 removes generated haze. Hard stepped contours and sparse dark outlines remain on actors; water has ivory foam without a universal black border. No full-screen flash, camera shake, or pixel-layer smoothing. Smooth layers are excluded from exact pixel-replication tests.

Review canvas 552x552, enlarged to 2208x2208 exactly. Header at (8,4); columns x8,144,280,416; actor rows y24,136; water rows y256,400. Exterior one-pixel grey borders and monochrome bitmap labels below cells. Imports contain no labels or guides.

## Actual deliverables and reproduction

Native/4x PNG atlases, two editable ORAs, original generated sources and prompts, review sheet, light/dark samples, timeline, renderer, self-contained HTML player, 60 fps MP4, APNG and GIF, actual validation JSON and repository check output. ORA layers are disjoint value partitions with exact recomposition, not semantic limb rigs. OpenRaster is supplied, no Aseprite source is claimed.

HTML has replay, pause, normal/half speed, seek and light/dark backgrounds. No auto-loop. Replay resets actors, effects and cue history; seek dispatches no gameplay events and does not re-arm consumed cues. APNG plays once, MP4 contains 180 frames/3 seconds, GIF is a 768x432 quantized viewing derivative with one repeat. Gameplay behavior is separate from viewing repeat behavior.

Requires Pillow, NumPy, Node with @napi-rs/canvas, ffmpeg/ffprobe. From repository root:

```sh
python3 assets/party-fx/hisui-water-v01/build.py
node assets/party-fx/hisui-water-v01/test.cjs
node assets/party-fx/hisui-water-v01/export.cjs /tmp/water-frames
python3 assets/party-fx/hisui-water-v01/encode.py /tmp/water-frames
node assets/party-fx/hisui-water-v01/check-render.cjs
python3 assets/party-fx/hisui-water-v01/validate.py /tmp/water-frames
bash tools/check.sh
```

Validation checks actual dimensions, rectangles/order, measured bounds/anchors, palette and alpha, exact 4x, reopened ORA recomposition, 3001 runtime states, 301 rendered safe-bound samples, event count, terminal cleanup, replay/seek/pause logic, decoded APNG equality against all 180 slots, GIF timing and MP4 decoding. Review and light/dark stills were inspected. Browser file access was rejected by URL policy, so live player controls and complete continuous normal/half-speed motion review remain unverified. No workaround attempted and no post-playback art correction claimed. Head, coat, boot and shoulder-flower continuity still need artistic judgment. Technical checks do not establish approval. Engine integration remains untested.

## Complete copy-ready creation prompt

Create exactly one Hisui Water battle action for FINAL FANTASY: THE HUMMING CRYSTAL. Preserve her black hair, crimson coat, twin curved blades and shoulder flower with an eye. Build the full 3000 ms one-shot described above, with eight new actor and eight new tide drawings, target recoil, separate restrained light, recovery and cleanup. Use the exact geometry, pivots, exposures, cues and layer rules above. Export all listed actual formats, source and validation. Keep the secondary target visibly labelled as a placeholder outside import artwork. Do not change gameplay rules. Review normal/half speed and light/dark playback, reporting draft status if continuous review is unavailable. Generate artwork using these complete prompts:

```text
Create eight cohesive key drawings for Hisui casting WATER in a gothic 16-bit JRPG, matching attached identity. Young pale woman long straight black hair, crimson long coat, twin curved blades, red chrysanthemum shoulder flower with dark eye. Full body faces LEFT. True transparent background. Sheet 1536x1024, four columns two rows each384x512, no text borders ground shadows. Eight keys row-major: relaxed blades low; bend elbows bring blades inward; blades cross at chest gathering tide; lift crossed blades slightly; separate blades outward to release spell; lower blades with sleeves following; relax elbows; settle to ready. Feet planted identically local y450, centered192, consistent body/head volume. Keep whole figure inside local x48..336 y48..464. Tiny deliberate hair and coat followthrough. Crisp FFVI pixel clusters and restrained palette, 1-pixel-like dark contours, no baked glows. Do not add water on this actor sheet.

Eight animation keys of WATER spell effect ONLY for gothic 16-bit pixel JRPG. True transparent background, no character text borders ground shadows. 1536x1024 exact four columns two rows, cells384x512. Each effect centered192,256 with min48px empty margin. Palette midnight teal, desaturated sea green, ivory foam, no neon. Hard deliberate stepped pixel edges. Row-major: 1 small low ripple; 2 ripple widens with inward curling wavelets; 3 two rising thick water ribbons framing open center; 4 tall curling tide crest folds over center; 5 heavy impact splash with ivory foam crown and dark hollow below; 6 tide slumps into broad receding sheets; 7 three broken curved foam fragments; 8 tiny droplets and ripple remnants. Consistent anchored bottom of main water at local y400, max width280 height320, no solid floor. Strong authored sculptural shapes, not thin lines. No faces. No baked light haze. Distinct growing upward then collapsing water sequence, readable negative space.

```
