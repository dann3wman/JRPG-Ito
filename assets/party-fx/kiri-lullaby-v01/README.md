# Kiri: Lullaby v01

New, built 3.2-second battle-action study, 2026-11-14. Open [preview.html](preview.html) locally for replay, pause, seek, normal/half speed and light/dark surrounds. Download [lullaby.mp4](lullaby.mp4) for video or [lullaby.png](lullaby.png) for lossless one-shot APNG.

This implements the regular Lullaby's visual idea: Kiri hums, ivory threads reach two allies, their tension eases, and the threads fragment while Kiri returns to ready. It is not Lullaby for Ostrel's healing Limit Break. No gameplay values change. The design document's existing regular Lullaby rule is -20 Stress to other active allies and +10 Danger; the red mark suggests cost without inventing another rule.

## What is new

New choreography, 24 procedural effect states (23 visible and one transparent cleanup state), ally reaction, source-driven renderer, offline player and rendered exports. Four Kiri cels are reused unchanged from the current 54-frame sheet: idle1 and limit1-3. Reusing these humming drawings does not make this the existing 800 ms Limit animation: the action has new travelling threads, a fixed activation cue, receiver settlement, suspended connection, dissolution and recovery. No new Kiri raster drawing is claimed. The two gray ally mannequins and abstract stage are placeholders.

## Source and review continuity

Source default commit c1840737fef12061165ef6bb553e7bfa166b717b; `tools/party-sprite-viewer/kiri.sheet.webp`. Exact source hash and crop mapping are in [timeline.json](timeline.json). The source palette and shaded contours are preserved, including existing imperfections; this is not a claim of newly polished 16-bit character art.

Before selection, the current default branch, instructions, art conventions, established action rules and open PRs were checked. Kiri PR18 remains an incomplete re-review. Natsu PR20 repairs rims in a separate study; Halo Glance PR21 is a specification only. Earlier Miren/Natsu briefs and review log v12 were inspected earlier in this same session. None is assumed implemented. This action does not edit those branches, assets or records. No Lullaby choreography was present in the current two-entry skills.json (Spiral Cut and Cure).

All five supplied FFRK clips were recovered and sampled earlier in this session. The healing-ring clip (20150123_0qY82e8qugk.mp4, 13-15.5s, libfile_643cd8293c4c81918fee2fa51a3decf4) informs actor/effect separation; the purple-mote clip (20150123_OIw2mFut1No.mp4, 8-11s, libfile_585af039e0708191996443e0c5c5bfc0) informs an intentional hold before resolution. No copied spell/color treatment or source timing measurement is claimed.

## Implemented layout and rendering

Native scene 320x180, output 1280x720 exactly 4x for pixel previews. Origin top-left. Kiri faces left; cell origin (216,60), pivot (48,88), world feet anchor (264,148), fixed integer placement. Source cels remain 96x96, actor atlas 384x96, four columns, no gutters or margins. Source index mapping is 0,27,28,29. Pose-volume and registration differences inherent in those drawings remain an artistic limitation.

Effect cells 256x128, eight columns by three rows, atlas 2048x384. No gutters/margins. All visible effect pixels are inside x8..247/y8..119. Top-left anchored at world (32,24), no ground contact. Two thread roots are local (218,80); receiver curl centers start at (82,86) and (139,91), following the allies' 0-3 pixel settlement. Curves are rounded to integer pixels, with one-pixel solid ivory strokes and deliberate gaps during dissolution. There is no universal dark contour on these thin luminous threads. The palette is six saved opaque colors plus transparency; source actor colors are separate. Effects have binary alpha, normal source-over blend and nearest-neighbor filtering. No smooth light layers, blur, rotation resampling or opacity fade. Layer order is background, ground marks, ally placeholders, Kiri, threads. This local effect palette does not redefine project-wide rules.

[threads-review-4x.png](threads-review-4x.png) is a 4256x3552 labeled review, native 1064x888, four columns/six rows. Cell origins (8+264c,24+144r), exterior one-pixel border and bitmap labels at y+130. Labels/guides are absent from import atlases. LT01..LT24 are row-major in the import sheet; LT24 is deliberately transparent. Actor preview is 1536x384; effect atlas preview 8192x1536. [contact.png](contact.png) is a supplemental 2x scene contact sheet, not the required 4x asset preview.

## Timeline

| Time ms | Pose/action | Response |
| --- | --- | --- |
| 0-320 | idle1, ready | Allies tense |
| 320-720 | limit1, close eyes and begin humming | Threads start at 560 |
| 720-1520 | limit2, sustain; threads extend left | Curl buildup precedes activation |
| 1520-2320 | limit3, held hum | One relief cue at 1520; allies settle 3 px over 320 ms; connection hangs then fragments |
| 2320-2560 | limit2 | Thread strip ends at 2480 |
| 2560-2800 | limit1, release breath | No new transient effects |
| 2800-3200 | idle1 | Ready; hold terminal frame |

The effect has 24 exposures of 80 ms, starting at 560 and ending at 2480, total 1920 ms. Scene is sampled every 40 ms, 80 video frames. APNG merges identical holds into fewer stored frames while retaining the full 3200 ms and exact decoded pixels. Gameplay and HTML playback are one-shot; APNG uses one play, video does not contain a repeated cycle. The player stops at 3200, retains the ready frame, and Replay resets actors, effects and cue history. Seek pauses and emits no cues. Cues: hum_start 560, relief 1520, clear 2480, ready 2800. These are preview diagnostics, not engine mutations.

## Rebuild and verification

Run `python3 assets/party-fx/kiri-lullaby-v01/build.py` from any working directory with Pillow and ffmpeg installed. The procedural renderer and player template are the editable source; PNGs are clean exports, not falsely renamed Aseprite files. No new painted layers require an Aseprite source. Run `node assets/party-fx/kiri-lullaby-v01/check-player.cjs` for control tests.

[validation.json](validation.json) records actual bounds, binary alpha, unchanged cels, 4x pixel replication, total duration and exact APNG pixel checks. MP4 is 1280x720, 25 fps, 80 frames, 3.2 seconds; compression makes APNG the authoritative lossless review. The player was checked in a simulated DOM for normal/half speed, one relief cue, stop, seek, reset and background controls. Native contact states were visually inspected, including connection, receiver response and cleanup. Live browser playback could not be verified: local HTTP refused the connection and cloud browser policy blocks file URLs. No workaround of that policy was attempted. Native-size perception, continuous rhythm and source pose transitions still need live artistic review. Engine integration was not performed. The existing source-cel spirals disappear with the switch to idle1 at 2800; new thread effects clear at 2480.

Status: built and exported; technical checks passed; live artistic approval pending; engine-tested false. This is a useful standalone action test, not production-approved game integration.

## Complete reproduction brief

Build one 3200 ms regular Kiri Lullaby battle action using unchanged source cels idle1/limit1/limit2/limit3 from the pinned Kiri sheet. Preserve scarf, hair, costume and source proportions. Use a 320x180 pixel scene and exact 4x previews. Keep Kiri at (264,148), facing two explicitly labeled placeholder allies. Author ivory stepped threads from her mouth toward both allies, arriving by the single 1520 ms relief cue, then hold the connection unnaturally before deleting clusters and clearing by 2480. Let ally heads settle 3 pixels during the 320 ms after relief, with thread endpoints following them. Suggest the existing Danger cost with one restrained dried-red mark near Kiri. Follow the timeline, palette, atlas geometry, safe margins, labels, anchors and blend rules above and timeline.json exactly. Return to idle1 at 2800 and stop at 3200. Do not apply healing, damage or new status rules. Deliver reproducible source, actor/effect native atlases, exact 4x previews, labeled review, timeline JSON, offline player, APNG, MP4 and actual validation. Test replay, pause, seek, cue counts, light/dark backgrounds and normal/half speed, and distinguish simulated checks from live playback. Do not claim artistic approval or engine integration without evidence.
