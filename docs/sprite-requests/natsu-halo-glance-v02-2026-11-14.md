# Natsu: Halo Glance v02, repaired-rim source revision

Production specification, 2026-11-14, America/New_York. Exactly one four-state facial micro-animation, three new drawings and one reused prayer pose. Specification only; no glance art or preview is produced by this run.

## Why revise this now

[PR #20](https://github.com/dann3wman/JRPG-Ito/pull/20) has a concrete dependency change: Natsu's eight-pose Cure v03 stabilizes halo rims while retaining their inner features. The earlier Halo Glance brief points to v02 and permits edits across larger face boxes. Building from that brief would discard the repaired prayer rims or risk repainting them. This complete replacement brief pins v03 and restricts edits to its protected feature interiors. It does not repeat the repair, expand the four-state scope, or claim that the previous glance was implemented.

Confirmed by this run: current default branch is `ccr-d8829a5a-ays4x1`, head `c1840737fef12061165ef6bb553e7bfa166b717b`; root instructions and existing documentation conventions apply. The actual PR #20 README and build.py were read. Its PNG and preserved v02 source were extracted from commit `82bc044a17f482507ed49f0399503dc6d19e7493`. Native hash, dimensions 384x192, 24 opaque colors, binary alpha and prayer bounds were checked. The prayer crop contains 110 changed pixels; its half-open occupied bounds are (29,15,78,87), so its lowest occupied row is 86. This corrects v01's contradictory lowest-row wording while retaining pivot (48,87).

The v03 build's idle feature boxes are (60,20,6,7) and (67,34,6,5). Applying its prayer offset (-2,+1) yields the new edit boxes in the prompt. Native/enlarged prayer pixels were inspected. No live glance playback exists to inspect. The seven-exposure, 760 ms choreography remains a proposed isolated study, not measured FFRK timing or approved integration timing.

## Continuity and status

- [Halo Glance v01](https://chatgpt.com/library?file_id=libfile_ba10f229c3608191af2cf0b314dc8e73&account_id=personal) was reread; this v02 supersedes its source, edit masks and baseline wording, with the complete prompt rewritten below.
- [Miren recovery bridge](https://chatgpt.com/library?file_id=libfile_6bfe860bb62c8191afed0871b6e0e0c2&account_id=personal) scope/status were reread; no bridge exports established.
- [Review log, version 12](https://chatgpt.com/library?file_id=libfile_fde3_f-e3bd1f9d5db0819185bc1c703e5bf682_5857d73f1cec8191b4bdff001e4a3037&account_id=personal) reports v03 live GIF review in GIMP at normal/half speed, technical checks and remaining artistic issues. That is evidence reported by the review task, not fresh live playback in this specification run. Engine tests and production approval remain absent.
- Open PRs #14, #16 and #18 retain their separate review work. Specification PRs #15, #17 and #19 remain open. The Tetsugi portrait, Hisui bud and chapel lancet are not assumed exported. No equivalent v02 brief or same-day branch existed at selection.
- Spiral Cut v02 and Natsu's separate 4.1-second Cure choreography already exist in repository context. Neither the original Spiral Cut request nor a full Cure commission is repeated here.

| Item | Reference available | Specified | Exported | Technically checked | Artistically approved | Engine-tested |
| --- | --- | --- | --- | --- | --- | --- |
| Natsu Cure eight-pose v03 source | Yes, inspected | Existing | Yes, PR #20 | Source checks independently repeated; broader checks reported by review task | No production approval | No |
| Halo Glance v02 | Source available | This document | No | Specification geometry/timing only | No | No |

## References and dependencies

Use the [pinned source PNG](https://github.com/dann3wman/JRPG-Ito/blob/82bc044a17f482507ed49f0399503dc6d19e7493/assets/player-sheets/natsu-cure-v03/natsu.cure.v03.png), [source metadata](https://github.com/dann3wman/JRPG-Ito/blob/82bc044a17f482507ed49f0399503dc6d19e7493/assets/player-sheets/natsu-cure-v03/natsu.cure.v03.json) and [repair implementation](https://github.com/dann3wman/JRPG-Ito/blob/82bc044a17f482507ed49f0399503dc6d19e7493/assets/player-sheets/natsu-cure-v03/build.py). These are unmerged reference dependencies, not files to copy into this documentation PR. If their bytes cannot be recovered, artwork is blocked until the pinned source is available. No fallback to a similarly named atlas.

All five supplied clips were recovered after workspace cleanup. This run inspected newly extracted samples, not continuous playback:
| Clip | Samples in seconds | Applicable principle |
| --- | --- | --- |
| [20150430_3VYVy_-wuQ.mp4](https://chatgpt.com/library?file_id=libfile_3d08908cd9608191bfd139d2d53d011c&account_id=personal) | 8,11,14 | Separate activity from recovery |
| [20150522_vNXuejzstyQ.mp4](https://chatgpt.com/library?file_id=libfile_bde1fc1da2408191baeb0cf4de9e3547&account_id=personal) | 8,11,14 | Clear directional intent |
| [20150323_9h9tSnldEE8.mp4](https://chatgpt.com/library?file_id=libfile_5ea2416c3fc08191afb807b6f13ec63b&account_id=personal) | 12,14.5,17 | Distinct actor and effect layers |
| [20150123_OIw2mFut1No.mp4](https://chatgpt.com/library?file_id=libfile_585af039e0708191996443e0c5c5bfc0&account_id=personal) | 8,9.5,11 | Deliberate anticipation before change |
| [20150123_0qY82e8qugk.mp4](https://chatgpt.com/library?file_id=libfile_643cd8293c4c81918fee2fa51a3decf4&account_id=personal) | 13,14.25,15.5 | Keep the actor readable under healing light |

The last clip is the primary layering reference. No golden palette, full-party column, movement attack or flash is copied. Menu/charging time is not used to derive the proposed 760 ms duration. Future full-Cure integration needs approved choreography timing and measured anchors for each pose; it is outside this session.

## Complete copy-ready creation prompt

Copy START through END as one complete brief.

START
Create exactly one asset for FINAL FANTASY: THE HUMMING CRYSTAL: Natsu's Halo Glance v02. Make a four-frame pixel-art study using one fixed prayer pose. Only the two visible halo faces change their gaze and small facial shapes. Deliver the editable source, clean strip, previews, metadata and validation report below. Do not redraw Natsu's full sheet or assume any other project asset is complete.

SOURCE AND IDENTITY
Use natsu.cure.v03.png from assets/player-sheets/natsu-cure-v03/ at repository dann3wman/JRPG-Ito commit 82bc044a17f482507ed49f0399503dc6d19e7493, SHA256 969be514f6825a6e36a927843f6fc9dc93f7ee9715acc4dd871afe4b0e26ca6b. This is the draft eight-pose study in PR #20, not the installed 54-frame atlas. Pin these bytes even while the PR is unmerged. Do not substitute the older v02 atlas or rerun its rim repair. The source prayer pose is zero-based frame 2, rectangle (192,0,96,96). Preserve its actual pixels as the master base. If that source cannot be retrieved or its hash differs, report the missing/mismatched dependency rather than inventing a replacement.

Natsu is a gentle young woman with long pale blonde hair, cream/white healer robes and a spiked halo carrying human faces. She prays with both hands together and has no weapon. Match this source's identity, hair, robe, crown, hand position and silhouette exactly. Keep the two currently visible halo faces; this study neither adds a patient's face nor asserts a canonical lifetime face count. The faces' attention is the unsettling detail. No blood, screaming mouths, head detachment, new horns, weapon or costume changes.

GEOMETRY
Every native frame is 96x96. Clean atlas: four columns, one row, 384x96, no gutters or outer margins. All opaque pixels must remain inside x8..87 and y8..87 inclusive. Top-left origin; x right, y down. Fixed pivot (48,87), facing screen-left. Preserve the source feet exactly, including foot baseline and lowest occupied row y86. The pivot is one pixel below this row. Do not normalize the soles, recenter cells, trim transparency or translate Natsu.

Editable regions, local to each frame:
A: upper face interior, rectangle (58,21,6,7), inclusive x58..63/y21..27.
B: lower face interior, rectangle (65,35,6,5), inclusive x65..70/y35..39.
These are the protected feature boxes from the v03 repair, translated by the prayer pose offset (-2,+1). Only currently opaque pixels inside them may change. Save a binary edit mask of that intersection, 96x96, as a hidden editable-source layer named EDIT_MASK. The surrounding repaired rim boxes (56,19,10,11) and (63,33,10,9), minus these interiors, are locked pixel-for-pixel. This replaces v01's larger face boxes so the glance cannot undo the rim stabilization.
Within these boxes edit only pixels belonging to the two face shapes. The surrounding crown, spokes, spikes, hair and transparent pixels remain locked. Create and save an explicit face-only mask after inspecting the source at native size. No edits outside the union of these boxes. Use internal eyes/nose/cheek pixels to suggest turning; do not rotate the outer face outline or move the whole face. All four frames must have an identical alpha silhouette.

CELL TABLE

All cells use pivot (48,87), a locked v03 base and separate opaque facial replacement layers. Only the two interior masks may change.

| Row/column | ID | State | Rectangle x,y,w,h | Drawn action |
| --- | --- | --- | --- | --- |
| R1C1 | HG01 | REST | 0,0,96,96 | Exact v03 prayer source crop |
| R1C2 | HG02 | NOTICE | 96,0,96,96 | Upper face eye/nose cluster shifts one pixel left inside A; lower face unchanged |
| R1C3 | HG03 | FOLLOW | 192,0,96,96 | Retain HG02 upper face; lower eye/nose cluster shifts one pixel left inside B |
| R1C4 | HG04 | WATCH | 288,0,96,96 | Retain both gazes; narrow lower mouth by one pixel inside B using neighboring skin color |

Preserve a dark eye and pale cheek. No moving outer face silhouette, open mouths or expression changes to Natsu herself. If a one-pixel feature shift would cross its mask, redraw the interior cluster within the mask; never translate a whole face patch.

PLAYBACK
Four unique drawings; seven timed exposures:
0-120 ms: HG01, 120 ms.
120-200: HG02, 80 ms.
200-280: HG03, 80 ms.
280-480: HG04, 200 ms.
480-560: HG03, 80 ms.
560-640: HG02, 80 ms.
640-760: HG01, 120 ms.
Total 760 ms. One-shot, loop=false. Explicit order [HG01,HG02,HG03,HG04,HG03,HG02,HG01]; do not also apply an automatic ping-pong mode. At completion retain HG01 and stop. There is no blank frame. Replay resets time and preview cue history.

Preparation is the still prayer; buildup is the staggered leftward attention; the visual apex is HG04's watch; residue is the short retained look; recovery unwinds the gaze back to rest. There is no attack impact, target recoil or heal event in this isolated study. Required review-only diagnostic cues gaze_locked at 280 ms and gaze_reset at 640 ms fire once each during forward playback, never during seeking. They must not apply damage, healing, Stress or halo-face increments.

This study does not change the eight-pose Cure timeline of 1620 ms. Its prayer exposure is only 240 ms, so the 760 ms strip must not be inserted into that window without a separate choreography decision. No integration timing is approved here. Future integration can reuse these facial states; retiming and per-pose crown registration remain separate work. Never silently extend the spell or delay its release.

DRAWN VERSUS RUNTIME
Draw only the three modified face states. Runtime selects exposures and enlarges pixels; it performs no movement, scaling animation, rotation, blending between facial frames or opacity fade. Use a 384x216 native review scene, output 1536x864. Place Natsu's pivot at (272,180), so her cell top-left is (224,93). A review-only patient-location crosshair is centered at (104,144); it is not a new actor asset, and it does not react. All world positions are integers. Test the gaze toward this same leftward location throughout.

PALETTE, LAYERS AND OUTLINES
Use only the exact 24 opaque RGB colors extracted from the source, plus transparency. Save the palette. Alpha values are 0 or 255. Existing skin, ivory and dark brown outline colors are sufficient; add no highlights. Keep FFRK/FFVI-style deliberate pixel clusters. Within the edit mask use one-native-pixel dark facial marks and retain the existing outer contour unchanged. No anti-aliasing, blur, glow, gradient, fractional coordinates or resampled rotation. Narrow facial features remain solid, without dithering. Preserve source shading outside the masks even if broader cleanup remains needed.

Editable document: LOCKED_BASE contains the unchanged prayer crop; FACE_A and FACE_B contain opaque replacement pixels covering the original facial details; EDIT_MASK contains the binary allowed-pixel mask and is hidden; GUIDES contains pivot and is hidden on export. Replacement patches must fully cover superseded opaque details, not leave duplicate pupils. All drawable layers are authored at 96x96, normal source-over blend, binary alpha, nearest-neighbor filtering. Composite BASE, FACE_A, FACE_B at 96x96; then enlarge exactly 4x nearest-neighbor. This asset contains no smooth/light layer. If later composited with Cure lighting, that light must remain a separately authored layer above the actor and may not conceal the gaze test. Its creation is outside scope.

REVIEW LAYOUT
Native review canvas 432x144; enlarged output 1728x576. Background #20262C. Header NATSU HALO GLANCE at (8,6) using a 5x7 bitmap font and one-pixel character spacing. Cell origins (8,24),(112,24),(216,24),(320,24), each exactly 96x96. Draw a one-pixel gray border immediately outside each cell, at x-1..x+96 and y-1..y+96. Labels HG01..HG04 at each cell's x,y+98. Put state names REST, NOTICE, FOLLOW, WATCH at y+108. No labels, borders, guides or patient marker in import assets.

EXPORTS
Use basename natsu_halo_glance_v02.
.aseprite: 96x96 layered editable document, saved 24-color palette; seven timeline exposures with linked cels for repeats of the four unique states. Preserve durations exactly.
.png: clean transparent 384x96 four-state atlas. Frame rectangles remain a four-column one-row layout, not a seven-cell exposure strip.
_4x.png: exact nearest-neighbor 1536x384 atlas.
_review_4x.png: labeled 1728x576 review.
.json: source commit/path/hash and source crop; explicit mask and protected rim regions; four state rectangles; pivot [48,87]; edit regions; palette; seven ordered exposures/durations; duration_ms=760; loop=false; hold_last=true; diagnostic cues; gameplay_events=[]; integration_status='isolated study, not mapped to Cure'.
_preview.html plus editable preview source: offline playback, replay, pause, seek, 1x/0.5x speed, dark/light backgrounds, full scene and enlarged head-detail view. State four unique drawings and seven exposures. Label reused body as a draft reference.
_preview.gif: isolated 96x96 actor cell rendered at exactly 384x384, 760 ms one-shot at exact 4x scale; 10 ms timing units preserve all durations. Omit the looping extension, verify decoder behavior, retain the final rest frame.
_validation.json: actual dimensions, palette/alpha checks, unchanged-region comparison, hashes, timing and event counts, plus separate artistic/engine/software-opening results.
natsu_halo_glance_v02_README.md: source provenance, playback and the explicit lack of full-Cure integration.
If any format cannot be exported, name the missing deliverable; never rename an image as an editable source or claim the export succeeded.

ACCEPTANCE
Confirm exact dimensions, rectangles, safety margins, pivot and row-major order. Compare HG01 pixel-for-pixel to the source prayer crop. All pixels outside the approved face-only mask, including Natsu and the crown, must be identical in every state. Alpha masks must be identical across frames. No added colors or partial source alpha. Verify every repaired rim pixel equals the v03 prayer source in all four states. Baseline y86 and pivot y87 must not be conflated. Compare HG01 to v03, never to v02.
Verify every enlarged pixel is an exact 4x4 replication. Review the face outlines and eye clusters at native size. A bounding-box match alone does not establish identity or anatomical quality.
Verify exposure durations sum to 760 ms and replay returns to time zero. Test no automatic looping, final HG01 hold, pause, seeking without events and each diagnostic cue exactly once. Confirm zero gameplay events.
Inspect at normal and half speed on dark teal #101D26 and pale stone #C4C2B4. The upper face must notice first; the lower face follows; both attend left; neither flickers, changes size or resembles a blinking lamp. If the turn cannot read at native size, report that artistic failure rather than enlarging the faces or adding light.
Confirm the body, hands, feet, hair and crown stay perfectly still and the ending equals the beginning. This prevents the cast from appearing to slide or breathe when only the halo should respond.
Record actual editable-source reopening and target-engine import as separate tests. Do not call simulated controls, exported files or static inspection engine-tested. Report statuses separately: reference available, exported, technically checked, artistically reviewed/approved and engine-tested. This micro-animation does not complete Natsu's sprite sheet, Cure choreography or halo accumulation system.

MACHINE-READABLE CONTRACT
Use this as the required metadata core; add the extracted palette, actual output hashes and test results. Rectangles use x,y,width,height. Durations in exposures are milliseconds. Rim boxes are protected except their contained edit boxes.

```json
{
  "asset": "natsu_halo_glance_v02",
  "source_commit": "82bc044a17f482507ed49f0399503dc6d19e7493",
  "source_path": "assets/player-sheets/natsu-cure-v03/natsu.cure.v03.png",
  "source_sha256": "969be514f6825a6e36a927843f6fc9dc93f7ee9715acc4dd871afe4b0e26ca6b",
  "source_crop": [
    192,
    0,
    96,
    96
  ],
  "atlas_size": [
    384,
    96
  ],
  "cell_size": [
    96,
    96
  ],
  "columns": 4,
  "rows": 1,
  "gutters": 0,
  "margins": 0,
  "safe_bounds_inclusive": [
    8,
    8,
    87,
    87
  ],
  "pivot": [
    48,
    87
  ],
  "feet_baseline_y": 86,
  "edit_boxes": [
    [
      58,
      21,
      6,
      7
    ],
    [
      65,
      35,
      6,
      5
    ]
  ],
  "rim_boxes": [
    [
      56,
      19,
      10,
      11
    ],
    [
      63,
      33,
      10,
      9
    ]
  ],
  "mask_rule": "opaque source pixels within edit_boxes; all others locked",
  "frames": [
    {
      "id": "HG01",
      "rect": [
        0,
        0,
        96,
        96
      ]
    },
    {
      "id": "HG02",
      "rect": [
        96,
        0,
        96,
        96
      ]
    },
    {
      "id": "HG03",
      "rect": [
        192,
        0,
        96,
        96
      ]
    },
    {
      "id": "HG04",
      "rect": [
        288,
        0,
        96,
        96
      ]
    }
  ],
  "exposures": [
    [
      "HG01",
      120
    ],
    [
      "HG02",
      80
    ],
    [
      "HG03",
      80
    ],
    [
      "HG04",
      200
    ],
    [
      "HG03",
      80
    ],
    [
      "HG02",
      80
    ],
    [
      "HG01",
      120
    ]
  ],
  "duration_ms": 760,
  "loop": false,
  "hold_last": true,
  "diagnostic_cues": [
    {
      "name": "gaze_locked",
      "time_ms": 280
    },
    {
      "name": "gaze_reset",
      "time_ms": 640
    }
  ],
  "gameplay_events": [],
  "review_native_size": [
    432,
    144
  ],
  "review_output_size": [
    1728,
    576
  ],
  "atlas_preview_size": [
    1536,
    384
  ],
  "scene_size": [
    384,
    216
  ],
  "scene_preview_size": [
    1536,
    864
  ],
  "scene_pivot": [
    272,
    180
  ],
  "scene_cell_origin": [
    224,
    93
  ],
  "scene_patient_marker": [
    104,
    144
  ],
  "alpha": [
    0,
    255
  ],
  "blend": "source-over",
  "filter": "nearest",
  "smooth_layers": [],
  "integration_status": "isolated study; not inserted into either Cure choreography"
}
```

END
