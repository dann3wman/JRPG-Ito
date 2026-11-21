# Shio: Blink v01

November 21, 2026. One new standalone defensive action,3000ms: Shio raises her palm-eye, extends a ward over an ally, the eye closes around a short evasive sidestep, then fragments disappear and Shio recovers. Blink is established in design-doc.md as an ally dodging the next hit. This build visualizes activation only, without changing combat/dodge rules or consuming a status. Choreography is proposed; spell ownership is confirmed. No equivalent package or PR found.

Status: reference available, specified, generated/built, exported; technical results in validation.v01.json. Incomplete visual-review draft. Artistic approval and engine tests remain false. Eight newly generated actor poses and eight ward drawings; existing labelled training dummy reused as secondary ally context. Runtime/build infrastructure adapted from Fuyori Acid PR40, no Fuyori art reused. Runtime supplies ally displacement and separate soft light; arms, sleeves and ward progression are drawn. No camera shake.

[Player](../../assets/party-fx/shio-blink-v01/shio-blink.v01.html) | [MP4](../../assets/party-fx/shio-blink-v01/shio-blink.v01.mp4) | [APNG](../../assets/party-fx/shio-blink-v01/shio-blink.v01.apng) | [GIF](../../assets/party-fx/shio-blink-v01/shio-blink.v01.gif) | [Timeline](../../assets/party-fx/shio-blink-v01/timeline.v01.json) | [Validation](../../assets/party-fx/shio-blink-v01/validation.v01.json).

## Evidence and dependencies

Inspected default ccr-d8829a5a-ays4x1 at b5d0e9f9ac45c21b2acf28784d75fd977d35eb91, current cast and embedded Shio sprite/portrait, design-doc Blink, open PRs and actual PR42 correction script. PR42 removes 19 detached ground pixels from Fuyori; preserve its work and other review records. Current rotation libfile_e3bd1f9d5db0819185bc1c703e5bf682 version 19 was read. Miren libfile_6bfe860bb62c8191afed0871b6e0e0c2 and Natsu libfile_ba10f229c3608191af2cf0b314dc8e73 remain briefs, not implementation evidence; Halo Glance v02 supersedes its original source/masks. None is an art dependency for Blink.

Supplied local footage is available but not freshly reviewed continuously. Prior timing/layer notes only: 20150430_3VYVy_-wuQ.mp4/libfile_3d08908cd9608191bfd139d2d53d011c,8-14s; 20150522_vNXuejzstyQ.mp4/libfile_bde1fc1da2408191baeb0cf4de9e3547,8-14s; 20150323_9h9tSnldEE8.mp4/libfile_5ea2416c3fc08191afb807b6f13ec63b,12-17s; 20150123_OIw2mFut1No.mp4/libfile_585af039e0708191996443e0c5c5bfc0,8-11s; 20150123_0qY82e8qugk.mp4/libfile_643cd8293c4c81918fee2fa51a3decf4,13-15.5s. The last clip's party protection layering is the relevant precedent. Menu/charging time is not included in this authored 3000ms sequence. Footage is not committed.

## Geometry and timeline

Native scene 384x216, output 1536x864. Top-left origin, left-facing actor. Baseline 180, Shio feet(280,180), ally feet(104,180). Safe scene x8..375, y8..207. Actor 4x2 atlas 384x192 with 96x96 cells, pivot(48,86). Ward 4x2 atlas 512x256 with 128x128 cells, pivot(64,64). Row-major, zero gutters/margins,8px transparent cell safety. JSON gives exact rectangles and measured bounds. Each generated source 1536x1024,4x2 cells384x512. Actor nearest-scaled 72x76, lowest opaque row registered 85 and right boot edge aligned to first pose. Effect nearest-scaled 84x112 at(22,8). No resampled rotation. No copied foot strips. Source files preserved.

Eight unique drawings on each sheet. Actor exposures SB01..08 then SB01:250,200,250,200,250,250,250,350,1000ms. Ward BW01..08:180,120,100,160,220,220,200,200ms from 700, total 1400ms, hide 2100. Whole action 3000ms one-shot. Events cast 700, activation 1000, effect_clear 2100, action_complete 3000, each once and visual only. Terminal ready pose matches initial pixels.

| Cell | Actor / action | Ward / action |
|---|---|---|
|R1C1|SB01 ready|BW01 lid strokes|
|R1C2|SB02 lift forearm|BW02 almond outline|
|R1C3|SB03 palm eye|BW03 open ward|
|R1C4|SB04 extend|BW04 full ward|
|R2C1|SB05 open eye|BW05 half closed|
|R2C2|SB06 close fingers|BW06 closed seam|
|R2C3|SB07 lower arm|BW07 fragments|
|R2C4|SB08 settle|BW08 last clusters|

All actor cells use 48,86; all ward cells 64,64. Ward world anchor follows ally_x,145. Ally x keyframes(0,104),(1250,104),(1450,114),(1750,104),(3000,104), smoothstep and integer rounding; context image top y123. No attack or damage demonstration is implied by the sidestep. Actor fixed at 280,180. Sleeve motion is in drawings, not random jitter. Ward light envelope 1000/1100/1260/1600ms, restrained cool light around the same anchor. Shape changes use discrete timed keys, not crossfades between unrelated poses.

Pixel layers: 24 actor colors,16 ward colors, alpha 0/255; hard stepped contours, no pixel-layer smoothing. Alpha threshold 200 removes source haze. This is this asset's palette contract only. Layer order: opaque 384x216 background nearest 4x; separate 768x432 rear ward light continuous-alpha source-over linear 2x; ally/actor/ward 384x216 nearest 4x; activation light screen linear 2x. Exact 4x checks exclude smooth layers. No full-screen flash.

Review 552x552 native,2208x2208 nearest 4x; header8,4. Columns8,144,280,416; actor rows24,136 and ward rows256,400. Exterior 1px grey borders; monochrome bitmap labels at cellTop+height+2. Clean import atlases have no labels or guides.

## Actual outputs and validation

Two PNG atlases with exact 4x derivatives, two editable ORAs, original generated sheets and full prompts, review and light/dark samples, timeline, renderer/player/build/export/encode/test/validation source. ORA layers are real disjoint value partitions, not semantic limb rigs; recomposition is checked. OpenRaster is supplied instead of Aseprite, which is not claimed. HTML has replay, pause, normal/half speed, seek, light/dark backgrounds and no auto-loop. Replay clears history and resets actors/FX; seeking dispatches no events or re-arms passed cues. MP4 is 180 frames at 60 fps, 3 s; APNG one play with rational timing; GIF 768x432 quantized viewing derivative with one repeat. Gameplay one-shot is separate from GIF inspection repeat. Secondary ally visibly labelled PLACEHOLDER.

Requires Pillow, NumPy, Node @napi-rs/canvas, ffmpeg/ffprobe. Run sequentially:

```sh
python3 assets/party-fx/shio-blink-v01/build.py
node assets/party-fx/shio-blink-v01/test.cjs
node assets/party-fx/shio-blink-v01/export.cjs /tmp/blink-frames
python3 assets/party-fx/shio-blink-v01/encode.py /tmp/blink-frames
node assets/party-fx/shio-blink-v01/check-render.cjs
python3 assets/party-fx/shio-blink-v01/validate.py /tmp/blink-frames
bash tools/check.sh
```

Checks include dimensions/rectangles/order/anchors, safe bounds, palettes/binary alpha, exact 4x, editable layer reopen/recomposition,3001 runtime states,301 rendered safe-bound samples, duration and single activation cue, replay/seek/pause logic, decoded APNG pixel equality against 180 slots, GIF timing, MP4 decode and terminal equality. tools/check.sh result retained separately. Existing QuickSong/Delay warnings and attachment notices are unrelated and unchanged. Contour quality, palm-eye readability and head/robe continuity need artistic assessment. The exported GIF was opened in GIMP and sampled with playback running at 1x and 0.5x. Those discrete observations do not establish complete continuous motion review. Complete normal/half-speed comparison, live HTML controls and engine tests remain unverified. No post-playback art revision is claimed. Do not mistake decoded pixels or stills for motion approval.

## Complete creation prompt

Build exactly one Shio Blink action using the following complete art prompts and the geometry/timing/anchors/layers above. Preserve the pale oracle's grey-blue hood, wrapped robes, palm eye and hood-lining eyes. Assemble the actual 3000ms one-shot at 60 fps with eight unique actor and eight ward drawings, ally response and cleanup. Export the editable ORAs, native and 4x assets, labelled review, timeline, self-contained player, rendered animations, source and actual validation. No gameplay rules or other character assets change. Inspect normal/half-speed continuous playback and light/dark backgrounds; report incomplete draft status if review cannot be completed. Do not substitute a sheet or prompt for animation.

```text
Create 8 animation key drawings of Shio casting BLINK, gothic FFVI/FFRK pixel art. Match supplied references: pale young woman, grey-blue hood over dark hair, wrapped grey-blue robes, brown boots, small open eyes in hood lining and open palm. No weapon. Transparent background. Exact sheet1536x1024 four columns two rows of384x512 cells, no labels borders shadows. All8 fullbody figures face LEFT, same head size, planted boots on local y450, body centered192 with40px safety. Keys left to right: ready hands low; inhale lift forearm; palm raises near chest showing eye; extend palm toward ally left; palm eye opens wide with sleeve following; gently curl fingers to close eye; lower arm sleeve settles; ready settle. Distinct arm articulation and cloth followthrough, small restrained head movement. Consistent body volume, no flips, no sliding or detached ground pixels. Crisp pixel clusters, dark outlines, controlled bluegrey palette with ivory eyes and subdued rose iris. No glow or effects on actor sheet.

Eight coherent animation keys for BLINK protective spell: an uncanny ivory eye-shaped ward opens around an ally then closes, leaves a tiny eyelid seam and dissolves. EFFECT ONLY no person. Gothic16bit pixel clusters, slate blue outer ribbons, ivory lid edges, muted rose iris, dark pupil empty hole with transparency. Transparent background.1536x1024 sheet four columns two rows equal384x512cells,no text labels borders. Center each at192,256 min48px empty margin. Left-to-right keys:1 two small curved ivory strokes;2 strokes lengthen forming almond outline;3 large complete open eye with transparent hollow pupil and thin rose iris;4 largest fully open eye ward with upperlower ribbon flourishes;5 eyelids close halfway on same center;6 lids fully close into curved ivory seam with two trailing ribbons;7 seam breaks into three curled fragments;8 three tiny fading pixel clusters. Maximum shape width280 height300. Keep exact same center, no independent rotation or offcenter wandering. Hard crisp edges with sparse dark contours, no baked soft glow or shadow. Strong unique developed shapes, elegantly unsettling.

```
