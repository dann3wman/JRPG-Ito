# Kugai Provoke action, 2026-11-17

A new 3-second standalone battle action: Kugai loads his sword, strikes his tower shield, sends a metallic pressure pulse toward the enemy, draws its attention and returns to guard. This fills an unbuilt guardian action instead of repeating Spiral Cut, Cure or Chakra. The Final Fantasy guardian telegraph is the precedent: readable preparation and activation, followed by a deliberately quiet, featureless sentinel.

**Playable draft.** Generated, built, exported and technically checked. Not artistically approved or engine-tested. Live GIF playback was started in GIMP at 1x and 0.5x and sampled visually. This does not establish full continuous review, smoothness or final pose continuity. HTML controls were tested through their shared runtime logic, not live browser interaction. The labelled training target is secondary placeholder context. No gameplay or targeting rules changed.

[Open/download the self-contained player](../../assets/party-fx/kugai-provoke-v01/kugai-provoke.v01.html), then open it in a browser. Replay, pause, seek, normal/half speed and pale/dark backgrounds are included. [MP4](../../assets/party-fx/kugai-provoke-v01/kugai-provoke.v01.mp4), [lossless APNG](../../assets/party-fx/kugai-provoke-v01/kugai-provoke.v01.apng), [GIF](../../assets/party-fx/kugai-provoke-v01/kugai-provoke.v01.gif), [review sheet](../../assets/party-fx/kugai-provoke-v01/review.v01.4x.png), [timeline](../../assets/party-fx/kugai-provoke-v01/timeline.v01.json), [actual validation](../../assets/party-fx/kugai-provoke-v01/validation.v01.json).

## Sources and scope

Base default branch `ccr-d8829a5a-ays4x1`, commit `b5d0e9f9ac45c21b2acf28784d75fd977d35eb91`, inspected 2026-11-17 America/New_York. Current cast description and embedded Kugai portrait in `index.html`, plus `docs/sprite-requests/kugai-sheet-2026-10-25.md`, define the heavy charcoal plate, blood-red trim, broad right-hand sword, left-hand tower shield and empty black helmet opening. The legacy embedded sprite has visible facial/hair features and was inspected but excluded as an identity authority. New art preserves the portrait's black void. Final likeness and gear continuity remain artistic review questions.

New contributions: eight generated actor drawings, eight generated pressure drawings, registered native atlases, shield-contact choreography, target attention response, light envelopes and cue timeline. Source PNGs and full original generation prompts are in `source/`. All actor poses and main pressure shapes are new. Reused contributions: export/player infrastructure adapted from Tetsugi Chakra v01 and the existing `tools/party-sprite-viewer/fx/training-dummy.webp`, converted losslessly to `target-context.png`. Nothing is installed into the battle engine.

Continuity reviewed: current Miren recovery bridge and Natsu Halo Glance source briefs; repository Halo Glance v02 supersedes v01 masks, still specified only. Library character-animation-review log version 15 and the actual open Chakra review PR #30 were read. That task preserved the Chakra atlas and flagged volume continuity, without artist approval. PR #29 is unrelated balance work. Prior full actions are not recommissioned. No review-task files were changed.

Five FFRK reference files were available locally; their previously sampled contact sheet informed scale and overlap. No fresh continuous footage review was completed this run. Relevant prior observations are directional contact layering in `20150522_vNXuejzstyQ.mp4` at 8-14s and preparation/hold/release in `20150123_OIw2mFut1No.mp4` at 8-11s. Menu/charge footage is not counted in this authored 3000ms sequence. References are provenance, not copied designs or measured timing claims.


Reference registry, available for later continuous review:

| File | Persistent source | Prior action window |
| --- | --- | --- |
| 20150430_3VYVy_-wuQ.mp4 | [Reference](https://chatgpt.com/library?file_id=libfile_3d08908cd9608191bfd139d2d53d011c&account_id=personal) | 8-14s: launch, hold, sweeps, recovery |
| 20150522_vNXuejzstyQ.mp4 | [Reference](https://chatgpt.com/library?file_id=libfile_bde1fc1da2408191baeb0cf4de9e3547&account_id=personal) | 8-14s: movement and contact trails |
| 20150323_9h9tSnldEE8.mp4 | [Reference](https://chatgpt.com/library?file_id=libfile_5ea2416c3fc08191afb807b6f13ec63b&account_id=personal) | 12-17s: apparition and overlapping damage |
| 20150123_OIw2mFut1No.mp4 | [Reference](https://chatgpt.com/library?file_id=libfile_585af039e0708191996443e0c5c5bfc0&account_id=personal) | 8-11s: motes, hold, convergence |
| 20150123_0qY82e8qugk.mp4 | [Reference](https://chatgpt.com/library?file_id=libfile_643cd8293c4c81918fee2fa51a3decf4&account_id=personal) | 13-15.5s: party rings and column |

Continuity: [Miren recovery brief](https://chatgpt.com/library?file_id=libfile_6bfe860bb62c8191afed0871b6e0e0c2&account_id=personal), [Natsu source brief](https://chatgpt.com/library?file_id=libfile_ba10f229c3608191af2cf0b314dc8e73&account_id=personal), [review log version 15 inspected this run](https://chatgpt.com/library?file_id=libfile_e3bd1f9d5db0819185bc1c703e5bf682&account_id=personal), [actual Chakra review PR30](https://github.com/dann3wman/JRPG-Ito/pull/30). These references establish context, not approval of this action.

## Geometry and cells

Top-left origin, integer native coordinates, facing left. Scene 384x216, baseline y180, visible art safe bounds x8..375/y8..207. Pixel-only scene preview is exactly 1536x864 nearest-neighbor. Kugai's foot pivot (48,86) maps to (280,180); lowest opaque boot row is 85. Target context uses the same baseline with anchor (104,180). Actor is about 55 native pixels tall. The pressure centre starts at (288,139), at the shield, then travels left.

Actor atlas `kugai-provoke-actor.v01.png`: 384x192, 4 columns x 2 rows, 96x96 cells. Effect atlas `provoke-pressure.v01.png`: 512x256, 4 x 2, 128x128 cells. No gutters or outside margins. Local safe bounds actor x8..87/y8..87, effect x8..119/y8..119. Rectangles, palettes and measured per-cell bounding boxes are in timeline JSON. Every cell is read left to right, then next row. Actor pivot stays (48,86); effect pivot stays (64,64). No actor runtime scaling/rotation or camera shake.

| Row/column | Actor cell, state | Actor start, hold | Effect cell, state | Effect start, hold |
| --- | --- | --- | --- | --- |
| R1C1 | KP01 ready | 0ms, 240ms | PP01 small clang star | 660ms, 60ms |
| R1C2 | KP02 load | 240ms, 180ms | PP02 split contact | 720ms, 80ms |
| R1C3 | KP03 sword raised | 420ms, 140ms | PP03 crescent opens | 800ms, 100ms |
| R1C4 | KP04 inward swing | 560ms, 100ms | PP04 broad pressure | 900ms, 140ms |
| R2C1 | KP05 shield contact | 660ms, 100ms | PP05 fractures | 1040ms, 140ms |
| R2C2 | KP06 rebound, cape lag | 760ms, 180ms | PP06 separated shards | 1180ms, 160ms |
| R2C3 | KP07 sword lowers | 940ms, 240ms | PP07 flakes | 1340ms, 180ms |
| R2C4 | KP08 settled guard | 1180ms, 220ms | PP08 final flakes | 1520ms, 200ms |

KP01 is reused from 1400 to 3000ms, adding a ninth exposure, not another drawing. Eight actor drawings and eight effect drawings total. Effect track lasts 1060ms, starts 660ms, hides at 1720ms. All transient lights/markers clear by 1720ms. Terminal scene pixels equal initial pixels; actor remains ready. Four one-time visual cues: shield_contact 660ms, provoke 1040ms, effect_clear 1720ms, action_complete 3000ms. No damage cue. Provoke's canonical next-three-targeted-attacks rule is outside this test; the preview applies no status mutation.

Drawn movement: torso anticipation, sword arc, shield contact, recoil, cape lag and recovery. Runtime: pressure x keys (time,x) [(0,288),(800,288),(1040,180),(1240,130),(1720,112),(3000,112)], smoothstep interpolation rounded to native pixels; y139. PP01/02 use 32x32 nearest-neighbor display boxes at (272,123), quarter-size from their authored 128x128 cells. PP03 onward displays at native size. Target x keys [(0,104),(1040,104),(1140,108),(1400,104),(3000,104)] lean toward Kugai, not damage knockback. The head marker appears 1040..1720ms. Actor registration is fixed; boots in local rectangle [34,81,64,89) are reused from KP01, avoiding whole-contour random redraw. This is key art with timed exposures, not interpolated unrelated silhouettes.

## Rendering and editable assets

Actor uses 24 opaque palette colours, pressure uses 16, plus transparency. Exact colours are recorded in JSON. Alpha is binary on native raster layers. Stepped edges, dark contours and sparse internal clusters stay crisp. Contours were visually inspected, not proved uniformly one pixel by automation. The darkest near-black void has no eyes or facial details. No smoothing or opacity fade is applied to pixel fragments. Generated semitransparent haze was removed at alpha >=200 and palettes were quantized once across each full set.

Layer order: opaque 384x216 background; rear light 768x432, continuous alpha/source-over/linear at 2x; target, actor, pressure and attention marker on 384x216 binary-alpha source-over pixel layer, nearest at 4x; foreground contact light 768x432 continuous alpha/screen/linear at 2x. Soft light is explicitly separate from the pixel preview and supports the authored pressure art. It never substitutes for actor drawings. Captions occupy y204, outside usable art.

Native atlases have `.4x.png` derivatives: 1536x768 actor and 2048x1024 pressure. Each `.ora` contains editable Highlights, Midtones, and Ink and cavities layers, partitioned by value. These are real compositing layers that recompose exactly, not a semantic limb rig or a claim of hand-layered original painting. The original generated RGBA sheets are 1536x1024, 4x2 source cells of 384x512.

Review canvas 552x552, 2208x2208 at exact 4x. Actor cells at x8/144/280/416, y24/136. Pressure cells at the same x, y256/400. One-pixel grey borders immediately outside each cell. Bitmap labels are at cell x, y+height+2, outside usable pixels. Header starts (8,4). Import atlases contain no captions, borders or guides.

## Playback, reproduction and validation

HTML is self-contained and makes no network requests. Gameplay/test policy is one shot, no loop; replay resets clock, actors, effects and cue history. Seeking never dispatches cues and cannot duplicate already passed cues. APNG has num_plays=1. MP4 is one 3-second run, 180 frames at 60fps. GIF is a 768x432 quantized viewing derivative with one repeat, not the palette authority; its 20/10/20ms exposure pattern preserves 3000ms. APNG compresses identical exposures into 67 frames while preserving all 180 render slots and duration.

Dependencies: Python 3, Pillow, NumPy, ffmpeg/ffprobe, Node and `@napi-rs/canvas`. Run from repository root, with the Canvas package resolvable through NODE_PATH if necessary:

```sh
python3 assets/party-fx/kugai-provoke-v01/build.py
node assets/party-fx/kugai-provoke-v01/test.cjs
node assets/party-fx/kugai-provoke-v01/export.cjs /tmp/kugai-provoke-frames
python3 assets/party-fx/kugai-provoke-v01/encode.py /tmp/kugai-provoke-frames
node assets/party-fx/kugai-provoke-v01/check-render.cjs
python3 assets/party-fx/kugai-provoke-v01/validate.py /tmp/kugai-provoke-frames
bash tools/check.sh
```

Actual checks passed: atlas dimensions/rectangles/order; 8px safe areas; palette counts and binary alpha; exact 4x replication; fixed boot strip; ORA reopen and exact recomposition; 3001 integer timeline states; four cues with one provoke; replay/reset/seek/pause/half-speed logic; 301 rendered layer samples at 10ms steps within scene bounds; decoded APNG pixels and timing; GIF duration; MP4 frame count/rate/duration; terminal cleanup. `tools/check.sh` passed, with pre-existing Quick Song/Delay drift and creature attachment review notices. This does not test this standalone package in the game engine.

Concrete corrections: narrowed boot registration from a full-width bottom strip to the boot rectangle because the former copied a lowered sword-tip fragment into other poses; replaced the antialiased attention triangle with integer scanline fills after the binary-alpha render check failed. Reviewed light/dark scenes and native keys after correction. GIMP live samples at normal and half speed showed pressure travel, fragmentation and recovery. They are not a complete frame-by-frame or continuous motion review. Remaining checks: full continuous playback on both backgrounds, sword/shield contact and body-volume continuity at normal speed, HTML UI interaction in a live browser, artist approval and battle-engine import. No claim of polished or production-approved animation.

## Complete creation prompt

The following is a complete reproducible direction for this one action, followed by the exact prompts used for the two generated art sheets. It is supporting documentation for the actual files above.

```text
Create exactly one playable Kugai Provoke action for FINAL FANTASY: THE HUMMING CRYSTAL. Inspect the current Kugai portrait and cast first. Preserve heavy charcoal plate, restrained blood-red trim, broad sword in right hand, tower shield in left hand, and a featureless black void inside the open helmet. Do not use the old facial/hair placeholder sprite as identity authority.
Generate eight coherent left-facing actor keys: ready, load, raise sword, inward swing, sword-to-shield contact, rebound with cape lag, lower sword, settle. Generate eight separate metallic pressure keys: small clang, split clang, opening crescent, broad crescent, fracture, shards, flakes, final flakes. Use substantial authored pixel clusters, restrained gothic horror and consistent anatomy/gear. No camera shake or full-screen flash.
Clean and register into 4x2 native atlases: actor 96x96 cells, atlas384x192, pivot48,86; effect128x128 cells, atlas512x256, pivot64,64. No gutters/margins; 8px local transparent safe areas. Use shared24/16-colour palettes with binary alpha, nearest filtering and exact4x pixel previews. Retain real editable ORA value layers and original generated sources. Inspect and correct identity, silhouette, gear and registration instead of claiming generated sheets are finished animation.
Assemble a384x216 scene output1536x864. Baseline180; Kugai feet280,180 facing left; labelled secondary training target104,180. Actor exposures in milliseconds: KP01:240,KP02:180,KP03:140,KP04:100,KP05:100,KP06:180,KP07:240,KP08:220,KP01:1600. Total3000, one shot. Effect begins660 with PP01..08 holds60,80,100,140,140,160,180,200. Contact660, provoke1040, clear1720, complete3000. No HP or targeting-rule changes.
Pressure centre y139; x keys0:288,800:288,1040:180,1240:130,1720:112,3000:112, smoothstep and integer pixel positions. PP01/02 display32x32 centred288,139 with nearest filtering; PP03..08 display128x128. Target leans x104 to108 between1040 and1140 then returns104 by1400. A pixel head marker persists1040..1720. Transient effects hide1720; terminal actor ready. Keep feet fixed and use drawn sword/cloth progression, no rigid actor sliding.
Separate continuous-alpha light at768x432: rear source-over, foreground contact screen, linear2x. Pixel scene source-over nearest4x. Render60fps, hold authored keys deliberately. Provide self-contained HTML replay/pause/seek/normal/half speed/light/dark controls, APNG, MP4 and GIF. Replay resets all state/cues; seek dispatches none. Label target placeholder outside usable art. HTML/APNG one-shot; GIF one repeat documented separately.
Export clean native PNG atlases, exact4x atlases, editable ORA, original art sources, renderer/build/validation code, timeline JSON including rects/pivots/palettes/keys/layers/cues, README and a552x552 labelled review enlarged4x. Review cell x8,144,280,416; actor y24,136; effect y256,400;1px exterior borders, bitmap labels y+height+2, header8,4. Keep labels out of import assets.
Validate actual dimensions, anchors, safe bounds, alpha/palette, four event cues,3000ms, final cleanup, exact4x pixels, ORA recomposition and decoded animation timing. Play normal/half speed and both backgrounds. Fix observed defects. Report generated versus reused work, missing capabilities and unverified artistic/engine checks honestly. Publish only this action and supporting documents on a dedicated branch and draft PR, with no automatic merge.
```

Exact art-generation prompts:

```text
Generate a cohesive 8-key animation sprite sheet for Kugai performing PROVOKE, FINAL FANTASY THE HUMMING CRYSTAL. Reference portrait for dark ornate armour and FACELESS identity. Crisp FFVI/FFRK-style16-bit pixel clusters. Tall chibi knight, heavy charcoal plate armour, muted steel highlights, blood-red trim and short dark red cape. Open helmet contains absolutely flat black void, no eyes, mouth, nose, ears or skin. Broad sword in RIGHT hand, tower shield strapped LEFT forearm, consistent equipment across all8poses. Exactly4columns2rows on transparent1536x1024 canvas; equal384x512cells, no text or grid. Each fullbody fits local x50..334,y60..460. Feet fixed local(192,460). Facing LEFT threequarter. Keep head/body size and armour silhouette consistent. Sequence rowmajor:1 ready sword lowered diagonal left and shield forward;2 knees load slightly, right elbow draws sword back;3 sword raised outward with shoulder anticipation, shield planted vertically forward;4 sword swings inward toward own shield, blade nearcontact;5 blade visibly contacts upper outer edge of tower shield, torso leans forward, cape lags;6 blade rebounds a little away, shieldarm absorbs impact;7 sword lowers, torso eases from lean, cape follows;8 settled defensive brace close to1. Purposeful inbetweens and overlapping cape. No detached sword, no extra limbs, no horn additions, no facial features anywhere. Use chunky native-like stepped curves and controlled charcoal/steel/oxblood palette, dark1pixel contour appearance, no antialias/glows/background. This is new action artwork, not a portrait or full character set.

Create eight sequential transparent pixel-art FX keys for a dark knight's PROVOKE sword-on-shield clang in a16bit gothic JRPG. No actor or weapon. Sheet1536x1024 exactly4columns2rows, each384x512. Centre each effect(192,256), contain x48..336 y80..432. Crisp steel-white, ash-grey and tiny oxblood accent, hard stepped clusters and charcoal contour. No glow or blur. Rowmajor:1 tight four-point metallic contactstar;2 split contactstar with three curved iron splinters;3 expanding left-facing broad crescent pressure edge with broken inner arcs;4 larger left-facing broad pressure crescent with a ragged torn inner edge, transparent centre;5 crescent starts cracking into three curved shards;6 three separated curved shards curling toward screen-left;7 six tiny steel flakes;8 three sparse grey flakes. Shapes evolve coherently, strong silhouette, no runes, no eyes/faces, no feathers, no healing rings, no background, no labels. This is a forceful metallic threat wave with a fast snap and lingering fragment decay.
```
