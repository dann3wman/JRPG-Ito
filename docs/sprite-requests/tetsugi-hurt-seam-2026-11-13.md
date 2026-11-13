# Tetsugi Haldane: Hurt seam portrait study v01

Production specification, 2026-11-13, America/New_York.

Exactly one asset: one static portrait variant with a small neck-seam edit. This is a focused ink-art session, not a character sheet, complete Hurt performance, animation or gameplay change. The full creation prompt below is the authoritative brief.

## Selection, evidence and dependencies

Tetsugi's established Hurt detail is a popped stitch revealing feathers rather than blood. His current portrait supplies a strong identity and neck seam, while the installed manifest reports `sheet: false` and `portraits: false`. The October 25 request for twelve portraits is not evidence of completed states. This study reduces that broad request to one measurable question: can the feathered seam read without changing his head, costume or crop? It enables a later decision about the full Hurt portrait and its short card display.

Confirmed: character identity, existing ink/hatching treatment, the feather-under-stitches motif, the standard 256x256 portrait panel, and the current embedded 154x154 reference. Proposed: the exact mask, feather silhouette, normalization recipe and review layout below. The result remains an isolated study until approved. A full Hurt expression and game integration are separate dependencies, not implied deliverables.

Inspected this run:
- Default branch `ccr-d8829a5a-ays4x1`, head `c1840737fef12061165ef6bb553e7bfa166b717b`; root instructions, party-art conventions, current cast, Tetsugi's earlier portrait request, manifest and relevant design/style rules. No applicable nested documentation instructions were found.
- Actual extracted Tetsugi portrait at native size and a normalized enlarged reference. It is a close-shaved man with his head tilted back toward screen-right, stitched scalp/jaw/neck, sepia skin, black engraved background and dense hatching. Preserve the observed crop, not an invented front-facing gi portrait.
- [Current review log](https://chatgpt.com/library?file_id=libfile_e3bd1f9d5db0819185bc1c703e5bf682&account_id=personal), version 11, including the November 13 entry; actual README patch of [Kiri review PR #18](https://github.com/dann3wman/JRPG-Ito/pull/18). It adds review/playback records, no new drawings. Live playback, artistic cleanup and engine verification remain incomplete.
- Current [Miren recovery brief](https://chatgpt.com/library?file_id=libfile_6bfe860bb62c8191afed0871b6e0e0c2&account_id=personal) and [Natsu Halo Glance brief](https://chatgpt.com/library?file_id=libfile_ba10f229c3608191af2cf0b314dc8e73&account_id=personal). Neither is established as implemented. Open [Natsu PR #14](https://github.com/dann3wman/JRPG-Ito/pull/14) and [Miren PR #16](https://github.com/dann3wman/JRPG-Ito/pull/16) contain separate review work. Open [Hisui specification PR #15](https://github.com/dann3wman/JRPG-Ito/pull/15) and [chapel specification PR #17](https://github.com/dann3wman/JRPG-Ito/pull/17) are not completed artwork.
- No equivalent Tetsugi seam specification or same-day branch/PR was found before writing. The older Spiral Cut priority is superseded by its existing v02 choreography and these later records. Recommissioning it would duplicate work.

Primary repository references, pinned to the inspected revision:
- [Embedded original portrait](https://github.com/dann3wman/JRPG-Ito/blob/c1840737fef12061165ef6bb553e7bfa166b717b/index.html), extracted with `python3 .claude/skills/party-art/scripts/party_art.py refs tetsugi --out <scratch-directory>`.
- [Cast identity and state twists](https://github.com/dann3wman/JRPG-Ito/blob/c1840737fef12061165ef6bb553e7bfa166b717b/.claude/skills/party-art/references/cast.json).
- [Earlier twelve-state request](tetsugi-portraits-2026-10-25.md) and [portrait format](../../.claude/skills/party-art/SKILL.md).
- [Current manifest](../../tools/party-sprite-viewer/manifest.js) and [design document](../design-doc.md).

All five supplied FFRK clips are available locally. Their existing reference notes remain background context, not fresh playback observations or measured timing in this run. This static portrait uses their general principle of readable actor information; it borrows no spell, motion, color or timing.
| Reference | Prior action window and relevance |
| --- | --- |
| [20150430_3VYVy_-wuQ.mp4](https://chatgpt.com/library?file_id=libfile_3d08908cd9608191bfd139d2d53d011c&account_id=personal) | 8-14 s, staged movement and recovery; no movement is commissioned here |
| [20150522_vNXuejzstyQ.mp4](https://chatgpt.com/library?file_id=libfile_bde1fc1da2408191baeb0cf4de9e3547&account_id=personal) | 8-14 s, readable contact; only the Hurt motif is relevant |
| [20150323_9h9tSnldEE8.mp4](https://chatgpt.com/library?file_id=libfile_5ea2416c3fc08191afb807b6f13ec63b&account_id=personal) | 12-17 s, distinct layers; no apparition or pillar |
| [20150123_OIw2mFut1No.mp4](https://chatgpt.com/library?file_id=libfile_585af039e0708191996443e0c5c5bfc0&account_id=personal) | 8-11 s, held buildup; no timing transferred |
| [20150123_0qY82e8qugk.mp4](https://chatgpt.com/library?file_id=libfile_643cd8293c4c81918fee2fa51a3decf4&account_id=personal) | 13-15.5 s, layered party readability; no light layer |

Status now: reference available and inspected; specification written; no new art exported; only specification arithmetic checked; artistic approval absent; source-editor reopening and engine tests not performed. The normalized reference is an inspection aid, not a new portrait export. No files from the animation-review branches are changed.

## Complete copy-ready creation prompt

Copy START through END as one complete brief.

START

Create exactly one asset for FINAL FANTASY: THE HUMMING CRYSTAL: **Tetsugi Haldane, Hurt seam portrait study v01**. Produce one static 256x256 ink portrait with a localized neck-seam change and the review/export package below. Budget one focused art session. Do not draw eleven additional states, new body poses or a complete Hurt expression. This tests one established state detail; it does not claim to complete the character's portrait set.

**Source and identity**

Use the current embedded portrait from repository `dann3wman/JRPG-Ito`, commit `c1840737fef12061165ef6bb553e7bfa166b717b`, `index.html`. Extract it using `python3 .claude/skills/party-art/scripts/party_art.py refs tetsugi --out <scratch-directory>` at that revision. Expected output `tetsugi-portrait.png`: 154x154 RGB; file SHA256 `5514f58e21815ea9fef6709ff26e4ce5722fdf78c753bee7bf86ebf02d3df3ce`. If unavailable or mismatched, identify the dependency and stop artwork production rather than inventing a replacement.

Tetsugi is Kiri's close-shaved, stitched brother, a monk repeatedly revived by Phoenix Down. Feathers grow under his skin. Preserve his actual upward-facing profile, scalp/jaw stitching, ear, facial features, shoulder crop, muted sepia, black background and engraved hatching. Do not substitute a generic monk, add costume details outside the crop, or redraw his face.

Prepare a deterministic reference base: decode source as RGB, resize the entire 154x154 image once to 256x256 with Pillow `Image.Resampling.LANCZOS`, with no crop, sharpening, color conversion beyond RGB, or additional resampling. Expected SHA256 of the normalized raw row-major RGB bytes is `9cb60149f96301309bb5f2faa6055bd88698219432b3d3c580c682c4232bd7b9`. Record the Pillow version and retain that base in the editable source. This is a one-time normalization of an ink portrait to the existing panel format, not a pixel-sprite enlargement. It does not recover missing source detail. Preserve its existing softness outside the edit mask and report it as a source limitation. All requested 4x previews use nearest-neighbor.

**Geometry and labeled cell**

One unique drawing, one column, one row, cell and clean import sheet both 256x256. Rectangle notation is x,y,width,height. No gutters, outer margins, trimming, packing rotation or extra transparent border. Top-left origin; x increases right, y increases down. The existing opaque background and deliberate shoulder crop remain full bleed to x0..255/y0..255. Do not impose an effect's transparent safety margin on this portrait.

All new or altered marks must remain within mask M = (128,174,48,44), inclusive x128..175/y174..217. This lies inside an additional review safety region x16..239/y16..239. No feather, thread, changed hatching or antialiasing fringe may cross M. All RGB pixels outside M must equal the normalized reference exactly. Alpha is 255 throughout the flattened portrait.

| Row/column | Cell ID | State/action | Rectangle | Anchors and layer requirements |
| --- | --- | --- | --- | --- |
| R1C1 | TH01 | Hurt-seam study: one neck stitch opens; a small feather is exposed | 0,0,256,256 | Panel pivot (128,128), seam root (148,190), locked base plus seam and feather layers, no face edits |

The panel pivot is for placement, not a bone or a ground contact. There is no ground baseline. The review-only crop baseline is y255, the bottom pixel row of the panel. Keep the exact source facing and normalized scale. Do not translate, rotate, mirror or recenter the head. In later standard-sheet work this corresponds to the named `hurt` state, but do not fabricate a twelve-cell atlas or install this isolated test.

**The single drawn change**

Open one stitch at the neck seam near root (148,190). Preserve the seam's existing diagonal direction and adjacent stitch rhythm. Separate its two ends by 3-4 authored pixels, with a narrow near-black recess no longer than 10 pixels. Reveal one damp gray feather tip rooted at (148,190), pointing slightly down and toward screen-right, contained in x146..160/y188..204. Use a slender shaft and two or three uneven barb clusters, not a leaf, eyelash, spike or second mouth. Visible tip length is 10-14 authored pixels; maximum width 7 pixels. Keep the recess smaller than the feather. Restore local skin hatching around the opening so it belongs to the reference.

No blood spray, red glow, fleshy cavity, new eyes, dramatic facial grimace, head motion, loose flying feather or additional seam. The strange material under the stitch is the entire new visual statement. The rest of the portrait remains unchanged, including any earlier ambiguous feather or stitch details outside M. Do not claim this localized edit alone is the finished Hurt expression.

**Static behavior**

One frame. `duration_ms: null` means static, not a zero-length animation. Playback order [TH01], loop=false, hold_last=true, no animation timeline, no automatic ping-pong and zero gameplay or diagnostic events. Runtime performs no translation, rotation, opacity fade, light pulse or scaling animation. The portrait remains visible until its caller replaces it.

The review offers manual SOURCE and STUDY switching only. SOURCE is the normalized reference, not another commissioned asset. Reset selects SOURCE. Switching back restores the reference exactly; it emits no impact, damage, healing, Stress or status event. No authored preparation, attack momentum, target response, residue timing or recovery motion applies to this static asset. A later timed Hurt-card test must separately establish display duration, readability at the actual card crop and return to the previous state. Do not infer timing from FFRK menu or charging footage.

**Rendering, palette and compositing**

Preserve ink linework, dense directional hatching and muted sepia. This portrait is not a 16-bit battle sprite and must not be converted to a six-color outlined effect. Keep the existing source RGB colors outside M. Within M, sample near-black, charcoal, mid gray, bone and muted skin colors from the normalized source, allowing antialiased blends only between those sampled colors. Save these swatches in the editable source and list their actual RGB values in metadata. Add no new saturated hue, white bloom or colored light.

Use approximately 1-2 authored-pixel ink strokes on the feather shaft and stitch ends, with thinner antialiased hatch strokes as needed. There is no universal one-pixel silhouette outline or binary-alpha requirement for editable ink layers. Match adjacent mark density rather than applying a new black border. Use hatching, not ordered pixel dithering; no blur, glow, sharpening or gradient filter over the finished panel.

Editable layers, back to front: LOCKED_REFERENCE (opaque normalized source), SEAM_REPAIR (skin/hatching replacement fully covering the selected old stitch), FEATHER (shaft/barbs and recess refinement), GUIDES (mask, root, crop, hidden on export). All artwork layers authored at 256x256, normal source-over blend, straight alpha. Edit layers may have alpha 0..255 but their nonzero bounds stay inside M. Flatten to opaque RGB PNG. No separately rendered smooth/light layer, additive blend, scene lighting or particle pass is included.

The 4x preview is exactly 1024x1024: each authored pixel becomes an identical 4x4 block, including the source portrait's existing intermediate shades. Do not smooth the enlarged preview. This rule is for inspection and does not redefine the project's pixel-effect rules.

**Review layout**

Native review canvas 544x304, output exactly 2176x1216 nearest-neighbor. Neutral background #20262C. Header TETSUGI HURT SEAM at (8,6), 5x7 bitmap font, one-pixel character spacing. Two comparison windows, each 256x256: SOURCE at (8,24), TH01 at (280,24). These are review windows, not a two-state import atlas.

Draw a one-pixel #777777 border immediately outside each window: for window origin (x,y), perimeter x-1..x+256 and y-1..y+256. Labels SOURCE and TH01 HURT SEAM at their window x and y290. Put no text inside usable cells. Source and study have identical scale and registration. Guides are a separate toggle, off in the saved review image.

The review viewer displays the same full-portrait comparisons on pale stone #C4C2B4 and dark teal #101D26 surrounds. Because the portrait is opaque, these surrounds must not tint it or reveal alpha fringes. Preserve its deliberate full-bleed edges. Do not invent a game-card crop; mark actual card readability as unverified until tested in the game.

**Requested exports**

These are required future artifacts, not files claimed to exist by this specification.

| Filename | Required contents/dimensions |
| --- | --- |
| tetsugi_hurt_seam_v01.ora | Editable 256x256 OpenRaster, four named layers above, guides hidden, source attribution and saved swatches in companion JSON |
| tetsugi_hurt_seam_v01.png | One clean unlabeled 256x256 opaque RGB portrait, TH01 only |
| tetsugi_hurt_seam_v01_4x.png | Exact 1024x1024 nearest-neighbor enlargement |
| tetsugi_hurt_seam_v01_review_4x.png | Labeled 2176x1216 comparison sheet |
| tetsugi_hurt_seam_v01.json | Geometry, source/base hashes, mask, root, static behavior, actual sampled RGB swatches and statuses |
| tetsugi_hurt_seam_v01_review.html | Offline self-contained manual SOURCE/STUDY comparison, 1x/4x, background controls, optional guides; no auto-play or invented animation |
| tetsugi_hurt_seam_v01_validation.json | Actual checks, hashes, editor-reopening result and separate technical, artistic and engine statuses |
| tetsugi_hurt_seam_v01_README.md | Provenance, normalization recipe, controls, source limitations, isolated-study status and missing deliverables |

The native portrait itself is the one-cell clean import sheet. No animated GIF, MP4, extra states or full character package is requested. Reopen the ORA in a compatible editor and verify layer compositing equals the PNG. If an exporter cannot produce a required format, name the missing file explicitly. Do not rename a flattened image to an editable-source extension.

Required metadata skeleton follows. Add sampled swatches, hashes of actual exports and test evidence; do not change geometric fields silently.

```json
{
  "asset": "tetsugi_hurt_seam_v01",
  "kind": "static_portrait_detail_study",
  "source_commit": "c1840737fef12061165ef6bb553e7bfa166b717b",
  "source_file_sha256": "5514f58e21815ea9fef6709ff26e4ce5722fdf78c753bee7bf86ebf02d3df3ce",
  "normalized_rgb_sha256": "9cb60149f96301309bb5f2faa6055bd88698219432b3d3c580c682c4232bd7b9",
  "source_size": [154,154],
  "authored_size": [256,256],
  "atlas_size": [256,256],
  "grid": [1,1],
  "gutters": 0,
  "outer_margins": 0,
  "frame_count": 1,
  "frames": [{"id":"TH01","rect":[0,0,256,256],"pivot":[128,128],"duration_ms":null}],
  "edit_mask_rect": [128,174,48,44],
  "seam_root": [148,190],
  "feather_bounds_inclusive": [146,188,160,204],
  "review_safe_bounds_inclusive": [16,16,239,239],
  "crop_baseline_y": 255,
  "ground_baseline": null,
  "playback_order": ["TH01"],
  "total_duration_ms": null,
  "loop": false,
  "hold_last": true,
  "gameplay_events": [],
  "diagnostic_events": [],
  "flattened_alpha": 255,
  "blend": "source-over",
  "smooth_light_layers": [],
  "preview_scale": 4,
  "preview_filter": "nearest",
  "preview_size": [1024,1024],
  "review_native_size": [544,304],
  "review_output_size": [2176,1216],
  "review_cells": [{"id":"SOURCE","rect":[8,24,256,256]},{"id":"TH01","rect":[280,24,256,256]}],
  "integration_status": "isolated study; not installed as the Hurt state"
}
```

**Acceptance**

1. Verify source file hash and normalized raw RGB hash before painting. Confirm unchanged source framing, head angle, ear, facial features, scalp stitching and shoulder crop.
2. Check actual export dimensions, one-cell rectangle, zero gutters/margins, pivot and seam root. Pixel-diff the finished portrait against the normalized base: every changed RGB pixel must be inside M. Check the edit layers' alpha bounds too, not just the flattened difference.
3. Check the feather fits the declared bounds and the new recess/thread stay within M. Border-touching source background and shoulders are intentional; changed anatomy or new marks at a cell border are failures.
4. Verify flattened alpha is 255 everywhere, source-over blending, hidden guides, and no labels/borders in the import PNG. Sampled colors and antialiasing must remain within the source's subdued ink/sepia family. Inspect local stitch continuity and line widths; do not pretend a palette count proves artistic quality.
5. Verify the 1024x1024 PNG and 2176x1216 review reproduce each corresponding native pixel as exactly 4x4 identical pixels. Check review font, labels and outside borders for clipping.
6. Verify one static frame, null duration, no animation schedule, no loops and zero events. Manual reset returns SOURCE. Study-to-source switching must not move the head or change any region outside M.
7. Inspect at 256x256 and 4x against both surrounds. The exposed material must read as feather beneath a popped stitch, not a leaf, blood or an insect. Check dense hatching does not hide it. Retain quiet horror; if it is illegible at native size, report failure instead of expanding the approved mask or saturating the palette.
8. Reopen ORA, compare its guide-free composite with the PNG, and test offline review controls. Export and software checks are separate from artistic approval.
9. Record the later engine/card check as NOT TESTED until actual import and Hurt-to-prior-state switching are observed. The head must remain registered, the neck detail must survive the real crop, and the existing hit shake must not be changed merely to display the study. Timed hit readability and recovery are outstanding integration questions. Do not modify gameplay, FACE coordinates, pState selection, the 12-state standard or the installed manifest in this task.
10. Report reference available, specified, exported, technically checked, artistically approved and engine-tested separately. Technical success does not establish a finished portrait, approval of source softness or completion of Tetsugi's art set.

END
