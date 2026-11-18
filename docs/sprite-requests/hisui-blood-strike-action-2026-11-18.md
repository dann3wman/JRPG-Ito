# Hisui: Blood Strike v01

New standalone 3-second battle action, built 2026-11-18. Hisui prepares her twin blades, bursts forward, makes one heavy crimson slash, recoils the training target and returns home. This implements an established unbuilt attack from the design document. The earlier isolated wound-bud study is not treated as completed or replaced. The FFVI/FFRK precedent is a readable approach/contact/return rhythm; the crimson petal residue carries Hisui's existing body-horror motif.

**Playable draft, not artistic approval.** New generated and assembled art, exported and technically checked. GIMP GIF playback was opened and sampled at normal and half speed. This provides snapshot evidence only. Full continuous playback assessment, live HTML controls and engine testing remain unverified. No balance, HP-cost calculation or combat rule changes. The canonical Blood Strike costs 15% HP; here blood_cost and damage are visual diagnostic cues only. Secondary target visibly labelled PLACEHOLDER.

[Player](../../assets/party-fx/hisui-blood-strike-v01/hisui-blood-strike.v01.html) | [MP4](../../assets/party-fx/hisui-blood-strike-v01/hisui-blood-strike.v01.mp4) | [APNG](../../assets/party-fx/hisui-blood-strike-v01/hisui-blood-strike.v01.apng) | [GIF](../../assets/party-fx/hisui-blood-strike-v01/hisui-blood-strike.v01.gif) | [Timeline](../../assets/party-fx/hisui-blood-strike-v01/timeline.v01.json) | [Validation](../../assets/party-fx/hisui-blood-strike-v01/validation.v01.json) | [4x review](../../assets/party-fx/hisui-blood-strike-v01/review.v01.4x.png).

## Evidence and scope

Current default branch was discovered as ccr-d8829a5a-ays4x1, base b5d0e9f9ac45c21b2acf28784d75fd977d35eb91. Read cast.json, current embedded Hisui sprite and portrait, design-doc Blood Strike entry, earlier Hisui wound-bud specification, Natsu Halo Glance v02 and continuity notes. Current Library review rotation version16 records the Kugai correction. Read PR33's actual build.py: exactly three detached boot pixels removed, not a new action. Leave PR31/33 and other review work untouched. Miren recovery and Natsu source briefs still establish specification context only. No equivalent Blood Strike package or open PR was found.

New: eight generated Hisui blade poses and eight generated slash/petal keys, native registration, motion, impact and recovery. Reused: training-dummy context from tools/party-sprite-viewer/fx/training-dummy.webp, and export/player infrastructure adapted from Provoke. No main actor or effect drawings reused. Identity reference: long black hair, pale face, crimson coat, twin curved blades and shoulder eye-flower. Shoulder-eye readability and blade continuity at native size require artist review.

The five supplied clips remain local references, with prior timing notes for directional contacts (20150522,8-14s), sweeping action/recovery (20150430,8-14s), overlapping summon layers (20150323,12-17s), hold/convergence (OIw2mFut1No,8-11s), and party layering (0qY82e8qugk,13-15.5s). No fresh continuous footage inspection is claimed. Authored duration excludes menu/charge time. Source IDs are retained in the task and prior project briefs; this build copies no reference footage.

## Implemented geometry and timing

Top-left origin. Left-facing actor. Native scene384x216, output1536x864. Baseline180, safe scene x8..375/y8..207. Actor pivot48,86, starting feet280,180. Target feet104,180. Actor atlas384x192,4 columns x2 rows,96x96cells; FX512x256,4x2,128x128cells, pivot64,64. No gutters/outer margins. Local8px safe bounds, measured boxes and all rectangles in timeline JSON. Original generated sheets1536x1024, sourcecells384x512. Pixel art stays on integer grid, no rotation or contour interpolation.

| Cell | Actor change | Actor start/hold ms | Effect change | Effect start/hold ms |
| --- | --- | --- | --- | --- |
| R1C1 | HS01 ready | 0/240 | BP01 narrow cut | 660/60 |
| R1C2 | HS02 load | 240/180 | BP02 widen | 720/80 |
| R1C3 | HS03 raise | 420/140 | BP03 crescent | 800/100 |
| R1C4 | HS04 cut in | 560/100 | BP04 split petals | 900/140 |
| R2C1 | HS05 extend slash | 660/100 | BP05 unfold | 1040/140 |
| R2C2 | HS06 overshoot | 760/180 | BP06 fragments | 1180/160 |
| R2C3 | HS07 lower blades | 940/240 | BP07 flakes | 1340/180 |
| R2C4 | HS08 settle | 1180/220 | BP08 last flakes | 1520/200 |

HS01 reused1400..3000 adds one exposure, not a drawing. Actor total3000ms; effect starts660, duration1060, hide1720. Cues: blood_cost420, damage800, effect_clear1720, action_complete3000, once each. Terminal actors return to initial state and all effects hide.

Actor x keyframes (ms,x):0:280,420:280,660:166,940:160,1200:166,1800:280,3000:280. Target0:104,800:104,900:94,1500:104,3000:104. Smoothstep interpolation rounded to native pixels. Effect pivot follows(target x+12,139) during recoil. Actor gesture, hair and coat overlap are drawn. Runtime handles approach, return, recoil and separate light envelopes, with no random jitter or camera shake.

## Layers, exports and playback

Pixel layers: actor24-colour palette, effect16, alpha0/255, source-over, nearest. Exact palettes in JSON. Dark stepped contours and clusters; one-pixel contour quality is a visual requirement, not claimed as an automated proof. Original haze is removed with alpha threshold200 and near-neutral light background removal (minRGB>190, RGBspread<22). No copied boot strips, avoiding the cross-pose artifact in Provoke. Full native cells remain registered without automatic trimming.

Composite order: opaque background384x216; rear smooth light768x432 source-over/linear2x; target,actor,effect on384x216 binary pixel layer nearest4x; front contact light768x432 screen/linear2x. Light is separate from pixel-only previews. Captions at y204 outside actor/effect art. Native actor/FX atlases and exact4x outputs1536x768/2048x1024. Editable ORAs contain three real value-partition layers: Highlights, Midtones, Ink and cavities. They recompose exactly but are not semantic limb rigs. Source PNGs and generation prompts included.

Review552x552, exact4x2208x2208. Actor cells x8/144/280/416,y24/136; effect same x,y256/400. One-pixel exterior grey borders, bitmap IDs y+cellheight+2, header8,4. Clean import atlases omit all review labels and borders.

HTML is self-contained: replay,pause,seek,normal/half speed,light/dark backgrounds. No auto-loop. Replay resets all state and cues; seeking dispatches none. Gameplay is one-shot. APNG plays once; MP4 has180 frames at60fps,3000ms. GIF768x432 is a quantized viewing derivative with one repeat and20/10/20ms timing pattern, not palette authority. ORA and renderer are the editable source; no Aseprite file is claimed.

## Reproduce and checks

Requires Python3/Pillow/NumPy, Node with @napi-rs/canvas, ffmpeg/ffprobe. From repo root:

```sh
python3 assets/party-fx/hisui-blood-strike-v01/build.py
node assets/party-fx/hisui-blood-strike-v01/test.cjs
node assets/party-fx/hisui-blood-strike-v01/export.cjs /tmp/hisui-frames
python3 assets/party-fx/hisui-blood-strike-v01/encode.py /tmp/hisui-frames
node assets/party-fx/hisui-blood-strike-v01/check-render.cjs
python3 assets/party-fx/hisui-blood-strike-v01/validate.py /tmp/hisui-frames
bash tools/check.sh
```

Actual results are in validation.v01.json. Checks cover atlas dimensions/rectangles/order, alpha/palette, safety bounds, pivot metadata, exact4x, ORA recomposition,3001 timeline states, single damage cue, replay/seek/pause/speed logic,301 rendered safe-bound samples, decoded APNG pixels/timing, GIF timing and MP4 frames/timing, final cleanup. Technical validity does not establish smoothness. Outstanding: continuous normal/half-speed review on both backgrounds, blade contact, shoulder-eye readability, body volume, live HTML controls and engine integration. Keep this a draft until those pass.

## Complete creation and assembly prompt

Create exactly one Hisui Blood Strike battle action using the two full artwork prompts below. Preserve current portrait/cast identity. Assemble eight actor drawings plus eight effect drawings in the native grids, anchors, safe bounds, layer order, timing table, motion paths and cues specified above. Render3000ms at60fps; include a labelled secondary target, readable recoil and return. Keep pixel layers nearest4x and smooth light separate. Export real editable ORA layers, native and4x atlases, labeled review, timeline JSON, renderer/build code, self-contained controlled player, MP4/APNG/GIF and actual validation. Inspect actual normal/half-speed playback, fix defects and report incomplete checks honestly. Do not alter gameplay or claim a generated sheet alone is an animation.

```text
Create a cohesive eight-key sprite animation sheet for Hisui BLOOD STRIKE, FINAL FANTASY THE HUMMING CRYSTAL. Reference portrait establishes identity only. Young adult woman, long straight black hair, cold pale face, long crimson coat over charcoal clothes, twin curved blades one per hand, red chrysanthemum flower with single dark eye at shoulder. Crisp FFVI/FFRK 16-bit pixel clusters, muted crimson/ivory/charcoal palette, solid dark outline, no smoothing. Exactly 4 columns 2 rows, transparent 1536x1024 canvas, equal384x512 cells. No labels. Full body in each cell, identical body volume, feet anchored local192,450, art within x30..354 y60..460. Facing LEFT threequarter throughout. Row-major keys:1 ready blades low;2 low anticipation knees bent and blades drawn back;3 torso twists with front blade raised and rear blade low;4 forward cutting swing halfway;5 full extended leftward diagonal slash, front arm extended, rear blade guards body;6 overshoot with hair and coat trailing right;7 blade lowers and weight recovers;8 returns to ready with cloth settling. Eight distinct purposeful articulated drawings, no duplicated poses, no detached limbs, no extra weapons, no scenery, no effects baked in. Preserve shoulder eye-flower across all poses. Balanced chibi silhouette roughly56 native pixels high after downsample. Generate substantial clean action artwork, not a diagram.

Eight sequential isolated pixel-art Blood Strike impact effects for gothic16bit JRPG. Transparent1536x1024,4columns2rows equal384x512cells, centered192,256 each. Restrained ivory cutting edge, dried crimson petal-like ribbons, charcoal contour. Rowmajor:1 narrow diagonal slash upperright to lowerleft;2 widening curved cut;3 strong crescent ivory edge and red inner tissue;4 impact splitting into three curling crimson petals;5 petals unfolding away from central incision;6 broken fragments;7 small descending red flakes;8 sparse last flakes. Shape continuity, deliberate stepped clusters, no characters, no weapons, no faces, no text, no backdrop, no glow, no blur. Contain eachshape within x60..324,y80..432. This is an impact and residue sequence not a spiral or healing ring.
```
