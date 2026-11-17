# Miren Jump v03: keep spear contact attached during recoil

Partial review, 2026-11-12. Not production-approved.

During the 2140-2220 ms impact hold, v02 moved the target up to five native pixels left while leaving Miren at x=138. The spear tip separated from the registered wound. v03 moves Miren by the target's integer recoil offset during this hold and starts the 2220-2550 ms recovery at x=133 instead of 138. The anchor is continuous at release. This is a choreography correction; all six atlas cells are byte-for-byte unchanged. No new sprite drawings or in-betweens are claimed.

## Source reconciliation and rotation

- Base: `ccr-d8829a5a-ays4x1` at `c1840737fef12061165ef6bb553e7bfa166b717b`.
- Selected exactly one sheet: Miren Jump v02, [source package](https://chatgpt.com/library?file_id=libfile_8ba85fb985d48191abaf9fca5d357e9c&account_id=personal). Downloaded and hashed actual bytes. Atlas SHA256: `9f2737479e35760455f14513c407be767e93aa5f9e95acbcc029fe78d69f168c`. Source and delivered atlas hashes match.
- Library rotation log v8: last Miren review November 8, Kiri November 10, Natsu November 11. Miren is the least recently reviewed named character among accessible character-sheet candidates. Other characters' request/spec documents are not completed sheets.
- Open PR #14 contains Natsu's unmerged idle repair (`8f3e9c45fa7fc9c8c6c8f3c56240b4b1f77b3d52`); left intact and recorded for future rotation. Open PR #15 contains Hisui's wound-bud specification, not a character animation atlas. No existing Miren review PR was returned. Kiri PR #12 is merged.
- No matching Miren Jump PNG or importer exists on the default branch. This adds the Library motion-study source under the established `assets/player-sheets/` convention. It does not replace a newer installed atlas. Existing Miren repository requests describe a future 54-frame sheet, not this 6-frame study.
- Source authority remains limited: the study uses provisional silver hair and muted oxblood/slate clothing; repository art directions specify pale gold hair and red/dark-iron armour. Preserve the actual study identity here, do not silently reinterpret it as finished canonical character art. Final costume reconciliation remains open.
- The November 8 one-pixel MJ02 spear connection and target-following incision are already in v02 and retained. They are not new fixes in this run. The recovery-bridge specification [dated November 8](https://chatgpt.com/library?file_id=libfile_6bfe860bb62c8191afed0871b6e0e0c2&account_id=personal) has no delivered bridge drawings in the selected package.

## Geometry, timing and import

`poses.png` is 192x128 RGBA: 3 columns, 2 rows, six 64x64 cells. The pivot is (32,56). Row-major order is MJ01 HOVER, MJ02 COIL, MJ03 ASCEND, MJ04 SUSPEND, MJ05 DIVE, MJ06 RECOIL. This is one Jump sequence, not six independent animation loops.

| Phase | Interval in ms | Pose |
| --- | --- | --- |
| Hover | 0-400 | MJ01 |
| Coil | 400-800 | MJ02 |
| Ascent | 800-1200 | MJ03 |
| Suspended wait | 1200-1900 | MJ04 |
| Dive | 1900-2140 | MJ05 |
| Contact | 2140-2220 | MJ05 |
| Recoil | 2220-2550 | MJ06 |
| Return | 2550-3300 | MJ06 |
| Final hover | 3300-4400 | MJ01 |

Timing is supplied by v02; no action-timing assumptions were needed. Slow inspection preview uses an assumed 0.5x speed. The 4400 ms one-shot ends holding hover, with effects cleared. Five airborne turn slots are compressed to 700 ms for preview only; an engine adapter must await `jump_due`. Layout, frame count, timing, cues and vertical motion are unchanged. v03 metadata names the corrected motion source. This is not compatible with the 54-frame party importer without a deliberate adapter, and none is installed by this PR.

## Inspection and validation

Inspected every atlas pose as enlarged stills, plus rebuilt staged key frames and exact 2140/2180/2219 ms before/after contact comparisons. The coil is readable anticipation, ascent extends the silhouette, the suspended pose is an intentional hold, and the dive has a clear spear-first diagonal. The contact error is corrected. Miren remains airborne, so ordinary ground foot planting is not applicable. Sprite padding and stage bounds are intact in sampled key frames. The recoil-to-hover switch at 3300 ms remains sparse, with abrupt head/limb silhouette changes; hair, cloth, anatomy and volume need further artistic cleanup. Existing snappy action poses and the 80 ms contact hold were preserved.

Automated checks cover all 4401 integer-millisecond states: spear-tip/wound x error falls from a maximum 5 px to 0 px during contact; release position is continuous; y, pose, target motion, cues and beats are unchanged; all states outside 2140-2550 ms are unchanged. Native atlas is unchanged, 21 opaque colours, binary alpha, at least 8 px padding in all cells, with exact 4x nearest-neighbour review enlargement. The two 264-frame videos are rebuilt from this delivered PNG and the included before/after renderers, at 60 fps normal and 30 fps slow. MP4s are viewing evidence, not lossless import assets. Smooth light effects belong to the existing separate effects layer and do not change sprite pixels.

Live normal/slow playback was attempted but could not be inspected: Chromium fails with `socket() failed: Operation not permitted`. Generating and decoding videos is not live inspection. Arc rhythm, weight, secondary motion and perceived stutter remain unverified. The action is not looping; the terminal hover is checked by state sampling, not a claimed loop-playback approval. Reference video names in the recovery spec include FFRK clips `20150430_3VYVy_-wuQ.mp4` and `20150522_vNXuejzstyQ.mp4`; no matched reference playback was performed this run. Engine compatibility and scheduler behavior remain untested. Keep this PR a draft.

`tools/check.sh` passes, including reference freshness, animation parity/continuity, authoring checks and battle simulation. The pre-existing Quick Song and Delay drift warnings are already tracked in implementation-status questions 3 and 2; creature attachment notices are unrelated.

## Reproduction and files

- Native sheet: [poses.png](poses.png); matching [timeline.json](timeline.json).
- Editable v03 choreography: [render.js](render.js); preserved v02: [render.v02.js](render.v02.js). Both use the same unchanged PNG. `target_poses.png` is unchanged scene context, not a second reviewed character sheet.
- [Enlarged sheet](poses.review-4x.png), [storyboard](storyboard.png), [contact comparison](contact-comparison.png).
- [Normal before/after](jump.before-after.normal.mp4), [half-speed before/after](jump.before-after.slow.mp4), [interactive playback](review.html).
- Run `node rebuild.cjs /absolute/scratch/output` with Node and `@napi-rs/canvas`. Encode `%04d.png` using FFmpeg libx264/yuv420p at 60 or 30 fps. Do not commit the temporary frames.
- [validation.json](validation.json) records checks. [library-links.json](library-links.json) records saved outputs. [Persistent review log](https://chatgpt.com/library?file_id=libfile_e3bd1f9d5db0819185bc1c703e5bf682&account_id=personal) records the final publication SHA and PR URL.

Next run should prefer another eligible character or newly completed character sheet and inspect this draft before editing Miren again. Do not redo the contact repair or count this partial review as a pass.
