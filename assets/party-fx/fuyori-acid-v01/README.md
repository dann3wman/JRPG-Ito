# Fuyori: Acid v01

Built November 20, 2026. One new standalone 3000 ms battle action: Fuyori draws a vial, winds up, throws it in an arc, breaks it against a target, leaves a hollow corrosive curtain and recovers. Acid belongs to Fuyori in docs/design-doc.md. It fills an unbuilt item-specialist action rather than repeating Fire, Cure or Spiral Cut. The FFVI/FFRK precedent is readable preparation, travelling projectile, target-centered contact and recovery. Corrosion cavities and persistent dripping carry the restrained horror. Action ownership is confirmed; the visual choreography is proposed. No gameplay damage, defense, inventory or balance rules changed.

**Incomplete playable draft, not production-approved.** New art generated, animation built, files exported and technically checked. GIMP preliminary GIF playback was started and sampled at normal and half speed. Discrete screenshots do not establish continuous motion quality. A sequencing error let the first encoding overlap frame export; validation caught a pixel mismatch, and all animation formats were re-encoded sequentially after export completed. Final encoded outputs pass pixel/decoder checks but were not replayed live. Complete continuous review, live HTML controls, artistic approval and engine integration remain unverified. No post-playback artistic correction is claimed.

[Playable HTML](fuyori-acid.v01.html) | [MP4](fuyori-acid.v01.mp4) | [APNG](fuyori-acid.v01.apng) | [GIF](fuyori-acid.v01.gif) | [Timeline](timeline.v01.json) | [Validation](validation.v01.json) | [Review](review.v01.4x.png).

## Sources and continuity

Inspected current default `ccr-d8829a5a-ays4x1` at `b5d0e9f9ac45c21b2acf28784d75fd977d35eb91`, Fuyori's cast.json entry, actual embedded portrait/sprite, design-doc Acid entry, recent commits and open PRs. No equivalent Acid package or PR was found. Fuyori has a dark bob, olive imperial coat, notebook, glass vials and pale crystal patches. Retain these identity details; final palette/readability and likeness still require artistic review.

Read actual review PR39 changes at `6c6d48291775205202e3294fa14b1c91d89e010d`: Ren Fire review contains no pixel corrections and remains partial. Its pistol-hand mirroring concern does not apply to this new left-facing source. Do not edit that review, its rotation record or other open action branches.

Current continuity: Miren recovery brief `libfile_6bfe860bb62c8191afed0871b6e0e0c2`, Natsu Halo Glance brief `libfile_ba10f229c3608191af2cf0b314dc8e73`, rotation `libfile_e3bd1f9d5db0819185bc1c703e5bf682` version18. Briefs are specifications, not implementation evidence. Repository Halo Glance v02 supersedes its earlier source/masks. Fuyori Acid does not depend on these unfinished studies.

Five supplied clips remain available locally, but no fresh continuous reference viewing is claimed: `20150430_3VYVy_-wuQ.mp4` / `libfile_3d08908cd9608191bfd139d2d53d011c` (launch/hold/strikes, 8-14s); `20150522_vNXuejzstyQ.mp4` / `libfile_bde1fc1da2408191baeb0cf4de9e3547` (travel/contact, 8-14s); `20150323_9h9tSnldEE8.mp4` / `libfile_5ea2416c3fc08191afb807b6f13ec63b` (layered casting, 12-17s); `20150123_OIw2mFut1No.mp4` / `libfile_585af039e0708191996443e0c5c5bfc0` (hold/convergence, 8-11s); `20150123_0qY82e8qugk.mp4` / `libfile_643cd8293c4c81918fee2fa51a3decf4` (party connection, 13-15.5s). These are prior notes; menu time is excluded from authored duration. Reference footage is not committed.

New: eight generated Fuyori throw drawings and eight acid projectile/impact/residue drawings, both original source sheets retained. Reused: labelled target from `tools/party-sprite-viewer/fx/training-dummy.webp`; build/player infrastructure adapted from Ren Fire PR37 commit `258b2bb256ae3fcbbdc06868c3ce33487e124396`. No Ren artwork reused. Arms, torso, coat and vapor shape changes are drawn. Projectile arc, target recoil and restrained light are runtime choreography. No camera shake or random pixel perturbation.

## Geometry and registration

Top-left origin; Fuyori faces left. Native scene384x216, output1536x864, safe area x8..375,y8..207. Ground baseline180. Actor feet(280,180), target feet(104,180). Actor atlas384x192:4 columns,2 rows,96x96 cells,pivot(48,86). Effect atlas512x256:4 columns,2 rows,128x128 cells,pivot(64,64). Row-major rectangles, no gutters or outer margins. Every native cell has8px transparent safety margin. JSON records every actual rect, pivot, palette and measured content box.

Sources1536x1024 with384x512 cells. Alpha threshold200 removes generated haze without color-keying ivory foam. Actor cells nearest-resized72x76, placed x12 and registered to last opaque row85; per-pose horizontal offset aligns the right edge of the lowest6px boot band to FA01. No mirroring, copied boots or runtime actor scaling. Effect cells nearest-resized84x112 at(22,8), except projectile cells AS01/02 further reduced to34x45 and their actual bounds centered on(64,64). This corrects the oversized airborne vial. Launch anchor corrected from(250,112) to(250,143), near the extended hand. Original generated sources remain unchanged. Pixel art has24 actor colors and16 effect colors with binary alpha, dark stepped contours and solid small details. No imposed universal outline on smooth light or faint vapor. Thin-contour artistry and pale crystal readability are still review items.

| Cell | Actor state | Start / hold ms | Effect state | Start / hold ms |
| --- | --- | --- | --- | --- |
| R1C1 | FA01 ready | 0 /250 | AS01 sealed vial | 700 /180 |
| R1C2 | FA02 draw vial | 250 /200 | AS02 flight drops | 880 /120 |
| R1C3 | FA03 high anticipation | 450 /250 | AS03 glass break | 1000 /100 |
| R1C4 | FA04 release | 700 /200 | AS04 splash crown | 1100 /160 |
| R2C1 | FA05 follow through | 900 /250 | AS05 corrosion curtain | 1260 /220 |
| R2C2 | FA06 arm recovery | 1150 /250 | AS06 drips/vapor | 1480 /220 |
| R2C3 | FA07 straighten | 1400 /250 | AS07 wisps | 1700 /200 |
| R2C4 | FA08 settle | 1650 /350 | AS08 last droplets | 1900 /200 |

FA01 repeats2000..3000ms. Eight unique actor drawings, nine exposures; eight unique effect drawings,1400ms from700..2100. Events release700, damage/contact1000, effect_clear2100, action_complete3000; each once. These are visual cues only. No looping or ping-pong. Terminal holds ready actors and hides all effects.

Flight700..1000: u=clamp((t-700)/300), x=250-134u, y=143-160u(1-u), rounded to integer native pixels. Peak at850ms is40px above endpoints. No resampled rotation. After contact effect pivot follows target_x+12,y143. Target x keys(0,104),(1000,104),(1120,96),(1700,104),(3000,104), smoothstep between keys then integer rounding. Target y123 for its64x64 context image. Fuyori remains at fixed feet280,180. Splash grows by authored shape changes, then drips dissolve by removed clusters. Soft wake samples the same trajectory, not random points.

Layers back to front: opaque384x216 review backdrop nearest4x; separate768x432 rear light/wake, continuous alpha source-over linear2x; target,actor,acid on384x216 binary-alpha pixel layer nearest4x; contact light screen composite linear2x at0.22 times contact envelope. Contact light envelope1000/1040/1100/1240ms; vapor light1100/1280/1600/2100ms. Pixel-only preview excludes all smooth light. Composite video includes it. Light code is editable, not a baked pixel atlas.

Review canvas552x552, output2208x2208 exactly4x nearest. Header(8,4), readable monochrome bitmap labels outside import cells. Columns x8,144,280,416. Actor rows y24,136; effect rows y256,400. Exterior1px gray borders; label at cellTop+cellHeight+2. Clean PNG atlases contain no labels/guides.

## Outputs and reproduction

Native `fuyori-throw.v01.png`, `acid-splash.v01.png`; corresponding4x atlases1536x768 and2048x1024; two editable `.ora` sources; generated source PNGs/prompts; build.py/render.js/player.template.html/export.cjs/encode.py; timeline; review; scene samples; actual validation JSON and README. ORA layers are genuine non-overlapping value partitions Highlights/Midtones/Ink and cavities, not semantic limb rigs. Programmatic reopen and exact recomposition are checked. Aseprite is not supplied; OpenRaster is the editable alternative.

HTML is self-contained: replay, pause, normal/half speed, seeking, light/dark backgrounds. No auto-loop. Replay resets time, actors, effects and cue history. Seek emits no events and does not re-arm passed cues. MP4:180frames,60fps,3000ms. APNG:one play with rational timing, identical holds may merge. GIF768x432 uses20/10/20ms timing cycles, one repeat, quantized viewing derivative only. Captions visibly label the secondary target PLACEHOLDER outside usable art. The actor is generated Fuyori art, not a placeholder. This is a standalone action, not an engine integration.

Requires Python/Pillow/NumPy, Node @napi-rs/canvas, ffmpeg/ffprobe. Execute sequentially, waiting for each export to finish before encoding:

```sh
python3 assets/party-fx/fuyori-acid-v01/build.py
node assets/party-fx/fuyori-acid-v01/test.cjs
node assets/party-fx/fuyori-acid-v01/export.cjs /tmp/fuyori-acid-frames
python3 assets/party-fx/fuyori-acid-v01/encode.py /tmp/fuyori-acid-frames
node assets/party-fx/fuyori-acid-v01/check-render.cjs
python3 assets/party-fx/fuyori-acid-v01/validate.py /tmp/fuyori-acid-frames
bash tools/check.sh
```

Actual checks: geometry/order/rectangles,8px padding, anchors, palettes, binary alpha, exact4x, ORA recomposition,3001 timeline states,301 rendered safe-bound samples,1400ms effect/3000ms action, single damage cue, replay/seek/pause/half-speed logic, all APNG pixels against180 rendered slots, GIF duration, MP4 decode and terminal equality. Repository checks passed with existing Quick Song/Delay warnings and16 pre-existing attachment art notices. These are unchanged and already recorded in project status. Remaining visual checks: full continuous normal/half-speed playback on both backgrounds, stable head/hand/cloth volume, convincing release-to-flight transition, contact readability, corrosion persistence and recovery. No production or engine approval follows from technical checks.

## Complete copy-ready creation prompt

Build exactly one Fuyori Acid action for FINAL FANTASY: THE HUMMING CRYSTAL. Use the two complete art prompts below, the inspected Fuyori portrait/sprite, and the full geometry, labeled cell table, durations, anchors, flight formula, target response, layer and cleanup contract above. Preserve Fuyori's dark bob, olive imperial coat, notebook and cheek/hand crystal patches. Produce eight distinct actor drawings plus eight acid drawings, register them, assemble the3000ms one-shot, render60fps and export actual ORA/native/4x/review/timeline/HTML/MP4/APNG/GIF/source/validation files. Use generated artwork as the main action, with runtime trajectory and separate smooth light supporting it. Keep exactly one action, one labelled secondary target and no gameplay rule changes. Correct alpha haze, foot alignment and projectile scale before encoding. Wait for frame export to finish, then encode and compare decoded pixels. Review actual normal and half speed and both backgrounds. Report draft status when full continuous review remains incomplete. Never substitute a static sheet or prompt for the working animation.

```text
Create production sprite artwork for Fuyori's ACID BOTTLE THROW, FINAL FANTASY THE HUMMING CRYSTAL. Use both supplied references for her identity: young adult woman, neat dark bob, studious face, olive imperial alchemist coat with pockets and belt, cream sleeves, boots, pale blue crystal patches on cheek and backs of hands. Notebook held at waist in her left hand, small sealed amber-green glass vial in throwing right hand. Restrained gothic horror, FFVI/FFRK crisp pixel cluster sprite treatment, dark 1 pixel contours, no blur. Transparent background. EXACT composition: 1536x1024 sheet, four equal columns two equal rows, 8 complete full-body drawings, one per 384x512 cell. NO text, labels, borders or shadows. Same small chibi body volume and head size, same ground line at y440 within each cell, body centered x192, at least 36 px empty margin on every side. Face LEFT throughout. Eight consecutive distinct key poses read left to right: 1 ready notebook lowered vial near belt; 2 draw vial back near right shoulder and bend knees; 3 high elbow anticipation with coat hem lagging; 4 forward release hand extended left, vial now absent; 5 follow through arm diagonally downward left, torso slight lean; 6 recoil hand back inward coat swing follows; 7 straighten with notebook and empty hand return; 8 settle nearly ready, hand at belt reaching next vial. Keep planted feet position stable and BOTH boots visible. Head stays registered except deliberate 2 pixel lean. Create substantial distinct arm, body and cloth action; no pose clones. Vial exists ONLY in first three drawings. No acid effect, no scenery, no other characters. Transparent alpha.

EFFECT SOURCE
Create EIGHT distinct raster effect keys for one gothic JRPG ACID BOTTLE THROW. Pixel art, crisp hand placed FFVI/FFRK clusters, restrained olive acid, pale cyan glass glints, ivory foam, dark cavities, green-black corrosion. Transparent background, no characters, text, labels, scenery, border, checkerboard or full screen glow. EXACT 1536x1024 sheet, four columns two rows, each cell384x512. Each object centered at192,256 with min40 pixels transparent perimeter, never cross cells. Read left to right: 1 small sealed green glass medicine vial tilted left, tightly contained; 2 same vial tilted further in flight with short attached droplets behind upper right; 3 sharp asymmetric glass break and compact acid splash at contact; 4 broad leftward impact crown of thick liquid tendrils surrounding dark hollow; 5 heavy olive acid curtain drips downward, small corroded dark islands amid foam; 6 smaller stringy downward drips and two twisting vapor ribbons, hollow center; 7 sparse wispy vapor and a few falling drops; 8 tiny isolated dissolving droplets. Frame3 impact is visibly smaller than frame4 peak, frames5-8 steadily dissipate. Glass projectile occupies roughly70x110 pixels in first two cells, impact peak frame4 roughly260x330, falling residue progressively smaller. Hard deliberate stair step edges with dark contour on fluid silhouettes; interior bright ivory foam clusters, no airbrushed glow. No skulls or faces. These are animation keys for ONE acid bottle action, not eight unrelated designs.

```
