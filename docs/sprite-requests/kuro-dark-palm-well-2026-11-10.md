# Kuro: Dark palm well v01

Production specification and complete creation prompt. 10 November 2026, America/New_York.

Exactly one deliverable is specified: a five-frame, 600 ms caster-side effect component. A small black cavity opens just above Kuro's palm, holds perfectly still, then contracts into a dark stitch and disappears. This is a proposed visual treatment for the preparation of **Dark**, not a new skill name or a complete spell choreography.

## Why this is next

The current repository already contains Spiral Cut v02 and Cure v01 choreography. The separate animation review has [PR #12](https://github.com/dann3wman/JRPG-Ito/pull/12) open for Kiri's idle sword and registration repair. Its actual changed-file list and review README were inspected. This specification changes neither that work nor the installed sheets.

Miren's recovery bridge and Natsu's halo glance were read in full. Both remain specifications without established implementation. Another independent effect component advances a different character without assuming either is finished. Kuro's existing design explicitly calls for a black orb in an open palm, but only Kiri and Natsu have installed party animation sheets. The five small effect drawings can be made in one focused session. They establish the scale, silhouette and unsettling pause before a later artist commits to Kuro's casting poses or a target-side effect.

The precedent is FFVI/FFRK's separation of a readable caster gesture from spell effects. Here a restrained, unlit cavity replaces an energetic charge. The player should see something absent above the hand, rather than an ordinary glowing projectile. The trade-off is intentional: this study cannot establish the readability of a complete attack or its damage beat.

## Evidence, decisions and dependencies

Repository inspected at default branch `ccr-d8829a5a-ays4x1`, commit `095f4fc80c206c1321a5435a45434ff9c50dce14`. Root AGENTS.md applies; no nested AGENTS.md was found in the documentation path. Read the documentation map, style guide, relevant design sections, cast data, party-art and sprite-animation guidance, corrections log and existing Kuro sheet request. Recent commits establish the installed Spiral Cut and Cure studies. No equivalent palm-well specification or same-day art-spec branch was found. A Kuro title search did not resolve a newer Library asset; this is not proof that none exists elsewhere.

| Evidence | Status and consequence |
| --- | --- |
| [Kuro design and cast](../../.claude/skills/party-art/references/cast.json), [earlier sheet request](kuro-sheet-2026-10-25.md) | Read. Violet/black robes, long dark hair, hollow eyes, open-hand casting and black palm orb are established. The requested 54-frame sheet is not evidence of completion. |
| Embedded Kuro sprite and portrait in [index.html](../../index.html) | Extracted using the existing `party_art.py refs kuro` command and visually inspected. Static references only. The portrait retains ink/hatching; the sprite is a small legacy reference, not an approved casting pose. |
| [Current choreography data](../../.claude/skills/party-art/references/skills.json) | Read. Contains Kiri and Natsu studies; no Kuro Dark choreography. No target-impact timing or moving palm attachment is approved by this document. |
| [Implementation status](../implementation-status.md) | Read. Party skill choreography is not yet drawn by the battle stage. Viewer support is not equivalent to battle-engine integration. |
| [Animation review log](https://chatgpt.com/library?file_id=libfile_e3bd1f9d5db0819185bc1c703e5bf682&account_id=personal) | Read current version 7 through its final line. Kiri's latest repair is exported and partially checked, with artistic/live-playback and engine limitations. |
| [Miren recovery bridge](https://chatgpt.com/library?file_id=libfile_6bfe860bb62c8191afed0871b6e0e0c2&account_id=personal), [Natsu halo glance](https://chatgpt.com/library?file_id=libfile_ba10f229c3608191af2cf0b314dc8e73&account_id=personal) | Read in full. Specifications only; no completion inferred. Neither is a dependency of this effect. |

Identity reference extraction hashes: `kuro-portrait.png` SHA256 `37da49bd19cb80a9f73c5c2e9425fb5a19c3150e0740d2fcda29063161c9a5bd`; the script's 6x `kuro-sprite.png` SHA256 `c4b261a2243f5910b0c21f928e306c533f72363bbacf01ed23763a0ebc58b4f2`. These are reference extraction outputs, not new art, and are not committed. Re-extract from the pinned repository commit when needed. Do not treat the legacy sprite's facing or pixel density as a new casting-sheet standard.

Confirmed: Kuro's identity, the black-palm-orb concept, current source availability and lack of an installed Kuro sheet in this checkout. Proposed: all geometry, colours, rhythm, attachment offsets and export names below. Missing dependencies for later integration: a reviewed left-facing Kuro casting pose, measured per-pose palm anchors, full Dark choreography, target response and engine event mapping. None blocks this isolated component. No art, playback preview or editable art source was produced by this specification run.

### Animation references inspected

All five named clips were available locally. Three stills per clip were freshly extracted and viewed at the times below. These are sampled observations, not continuous playback or measurements of authored frame durations. Menu and generic charging time are excluded from the proposed 600 ms effect.

| Reference | Sample times | Use here |
| --- | --- | --- |
| [20150430_3VYVy_-wuQ.mp4](https://chatgpt.com/library?file_id=libfile_3d08908cd9608191bfd139d2d53d011c&account_id=personal) | 8, 11, 14 s | Sweeping action changes scale and then clears; do not borrow its travel or large strikes for this stationary component. |
| [20150522_vNXuejzstyQ.mp4](https://chatgpt.com/library?file_id=libfile_bde1fc1da2408191baeb0cf4de9e3547&account_id=personal) | 8, 11, 14 s | Actor movement and directional effects are separate concerns; no runtime actor translation is needed here. |
| [20150323_9h9tSnldEE8.mp4](https://chatgpt.com/library?file_id=libfile_5ea2416c3fc08191afb807b6f13ec63b&account_id=personal) | 12, 14.5, 17 s | Primary staging reference: a small cue precedes much larger magic. Borrow the separation of preparation and resolution, not the apparition, pillars or flash. |
| [20150123_OIw2mFut1No.mp4](https://chatgpt.com/library?file_id=libfile_585af039e0708191996443e0c5c5bfc0&account_id=personal) | 8, 9.5, 11 s | A distributed cue resolves into a concentrated effect. Use a deliberate hold then contraction, without copying purple explosions. |
| [20150123_0qY82e8qugk.mp4](https://chatgpt.com/library?file_id=libfile_643cd8293c4c81918fee2fa51a3decf4&account_id=personal) | 13, 14.25, 15.5 s | Layered light can coexist with readable actors. Supporting light is deliberately omitted from this first silhouette test. |

## Complete copy-ready creation prompt

Copy everything between START and END. This is the entire production brief, including export and acceptance requirements.

**START**

Create exactly one small effect asset for FINAL FANTASY: THE HUMMING CRYSTAL: **Kuro's Dark palm well v01**. Draw five unique 48x48 pixel frames for a 600 ms one-shot caster-side preparation effect. A dense black cavity opens above an open palm, becomes unnaturally motionless, then folds inward into a short dark stitch and vanishes. The middle must feel hollow but remain opaque black, not a transparent hole. It is not an eye, a face, a rune, a spiral, a fireball or a projectile. Restrained violet edge pixels make its shape readable.

This component prepares a future Dark spell. Draw only the effect. No Kuro drawing, hand, weapon, enemy, background, ground shadow, damage number, target explosion or camera flash belongs in its import sheet. Do not build the full spell, change gameplay, or redraw any party sheet. Kuro is a thin woman with long purple-black hair, hollow eyes and layered violet/black robes; she casts with one open hand and has no weapon. Preserve that identity in any eventual context. Her hair's wind and character animation are outside this asset.

Sources are repository `dann3wman/JRPG-Ito` at commit `095f4fc80c206c1321a5435a45434ff9c50dce14`: `.claude/skills/party-art/references/cast.json`, `docs/sprite-requests/kuro-sheet-2026-10-25.md`, and embedded Kuro references in `index.html`. Extract references with `python3 .claude/skills/party-art/scripts/party_art.py refs kuro --out <scratch-directory>`. The 54-frame request is not a finished sheet. Kuro has no installed sheet or approved palm anchor in the inspected checkout. Use the neutral placement rig specified below; do not invent finished character art.

Use the five supplied FFRK reference clips for separated casting, buildup, resolution and recovery beats. Most relevant: `20150323_9h9tSnldEE8.mp4`, Library `libfile_5ea2416c3fc08191afb807b6f13ec63b`, action around 12-17 s, and `20150123_OIw2mFut1No.mp4`, `libfile_585af039e0708191996443e0c5c5bfc0`, around 8-11 s. Other supplied references: `20150430_3VYVy_-wuQ.mp4`, `libfile_3d08908cd9608191bfd139d2d53d011c`; `20150522_vNXuejzstyQ.mp4`, `libfile_bde1fc1da2408191baeb0cf4de9e3547`; `20150123_0qY82e8qugk.mp4`, `libfile_643cd8293c4c81918fee2fa51a3decf4`. Use their choreography principles, not their characters, colours or full-screen effects. Timing below is an authored proposal, not measured source timing.

### Native geometry and registration

Native cell: 48x48. Clean atlas: five columns, one row, 240x48, left to right. Zero gutters and outer margins. Every nontransparent pixel must remain within local x8..39 and y8..39 inclusive, leaving an 8-pixel transparent margin on each side. Frame bounds in the table below further constrain each drawing and include edge pixels. Top-left origin, x right, y down. Fixed attachment pivot **(24,36)** in all frames, representing the palm contact point below the cavity. Local y36 is a placement guide, never a ground baseline or exported pixel. Do not trim, recenter or rescale individual cells. Cavity shape grows upward from a stable lower rim at y34 in KW01-KW04; the bottom contracts to y33 in KW05. Its centre moves upward because it opens, not because the whole effect translates.

### Labeled cell table and animation

| Cell | ID and state | Atlas rectangle x,y,w,h | Duration / local interval | Drawing, extent and layer requirement |
| --- | --- | --- | --- | --- |
| R1C1 | KW01 SEED | 0,0,48,48 | 80 ms / [0,80) | Small opaque black seed, bounds x21..27,y28..34. One-pixel muted edge. No bright accent. Pivot (24,36); CORE then EDGE. |
| R1C2 | KW02 OPEN | 48,0,48,48 | 100 ms / [80,180) | Open upward to x16..32,y18..34. Slightly uneven stepped oval. Two short inward-facing edge notches, at most 1 pixel deep, without splitting the silhouette. Introduce the muted rim, no bright accent. Same pivot/layers. |
| R1C3 | KW03 HOLD | 96,0,48,48 | 240 ms / [180,420) | Largest cavity, x12..36,y10..34. Irregular 25x25 silhouette, not a perfect vector circle. Opaque black interior remains dominant. At most two brightest rim pixels in the upper-left quadrant. Keep this exact drawing for the entire hold; no shimmer, breathing, rotation or particle drift. Same pivot/layers. |
| R1C4 | KW04 FOLD | 144,0,48,48 | 100 ms / [420,520) | Sides fold inward to x18..30,y18..34. Preserve bottom registration and a broad dark middle. Remove brightest pixels; break the lighter inner rim into two uneven arcs while keeping the outer silhouette connected. Same pivot/layers. |
| R1C5 | KW05 STITCH | 192,0,48,48 | 80 ms / [520,600) | Short vertical dark stitch inside x23..25,y29..33. CORE with a one-pixel muted side edge. No bright pixels, motes or detached debris. Same pivot/layers. |

Five unique drawings and five exposures, order KW01, KW02, KW03, KW04, KW05. Total 600 ms. `loop=false`, no ping-pong, `hold_last=false`; hide completely at t=600 ms. There is no sixth blank cell. Replay resets to t=0 and re-arms diagnostic cues. On cancellation hide immediately and emit no completion cue.

Preparation is KW01; buildup is KW02; visual apex is the still KW03; contraction/residue is KW04-KW05; cleanup is the hide. There is **no impact cue or target reaction** in this caster-side component. Exactly two preview diagnostic cues: `well_held` at 180 ms and `well_clear` at 600 ms. They fire once each during uninterrupted forward playback, never on seek. `gameplay_events=[]`: no damage, healing, Stress, sound-trigger commitment or turn advancement. Do not treat disappearance as the Dark damage event. The later full spell must define its own target response and recovery before integration.

All shape/size changes are drawn. Runtime only selects a cell and applies an integer translation to its fixed anchor. No runtime scale animation, rotation, mirroring, tweening between frames, opacity animation or camera motion. Time sampling uses elapsed milliseconds and half-open intervals. Crossed cues must still fire once if a slow display frame crosses a boundary.

### Palette, pixels and compositing

Use five opaque colours plus transparency: cavity `#100F17`, inner edge shadow `#282233`, outer edge `#483950`, muted violet rim `#75618B`, restrained peak `#A496B2`. Save these exact swatches. Peak pixels appear only in KW03, maximum two pixels. These are this study's proposed colours, not a project-wide palette limit.

Use deliberate FFRK/FFVI-like clusters and stepped curves. The external silhouette has a one-native-pixel `#483950` contour, including the stitch ends; CORE fills inside it. The lighter rim sits just inside that contour and may be broken. A contour pixel should adjoin transparent space in an 8-neighbour inspection, allowing diagonal stair corners. No doubled dark band used as an outline. KW05's narrow width may leave only a one-pixel core. Inspect at 1x and 4x because an adjacency check alone cannot judge good contours. Dithering is unnecessary at this size; keep all narrow bands and the interior solid. Do not add textured noise to simulate hand placement.

Editable layers, bottom to top: `CORE` (black cavity), `EDGE` (shadow, contour, rim and the two optional peak pixels), `GUIDES` (pivot and safety rectangle, hidden on export). Composite CORE and EDGE at 48x48, normal source-over, straight RGBA alpha 0 or 255. Use nearest-neighbour sampling and exact 4x nearest-neighbour previews. No blur, antialiasing, gradient, glow, additive blend or fractional placement in these pixel layers. **There is no smooth/light layer in v01.** Smooth layers are permitted elsewhere in the project, but adding one here would obscure the silhouette question this study is meant to answer.

### Placement and viewable preview

Preview scene 320x180 native, 1280x720 output, exact 4x nearest-neighbour. Top-left origin. Provide two solid backgrounds selectable without changing effect pixels: pale stone `#C4C2B4` and dark teal `#101D26`. These are review backgrounds, not new environment assets.

Use a review-only neutral outline mannequin occupying x250..270,y97..152, nominal height 56 pixels, feet anchor (260,152), baseline y152. Add a simple static line arm from (252,116) to the palm guide (236,120). It is explicitly a **KURO PLACEHOLDER**, faces screen-left, and has no face, costume or hair design. The effect's pivot sits at world (236,120), cell origin (212,84). Maximum cavity bounds become x224..248,y94..118: visibly above the palm, clear of the torso. The 25-pixel maximum cavity width is about 45% of the 56-pixel actor height. These are proposed scale-test measurements, not measured Kuro anatomy.

Scene order: review background, neutral mannequin/arm, effect CORE, effect EDGE, optional guide overlay. The palm guide is under the effect and can be toggled off. No enemy sprite, target reaction, battlefield travel or extra drawable asset is needed. Full-scene safe region is x8..311,y8..171; the entire rig and effect fit within it. Labels are in the upper review band, outside this effect's cell.

Preview duration 1000 ms: [0,200) mannequin only, [200,800) the 600 ms effect, [800,1000) mannequin only for a clear cleanup tail. Scene diagnostic cue times are 380 and 800 ms. Both mannequin and palm stay fixed at all keyframes 0,200,380,620,720,800,1000 ms. The effect translates by zero throughout; no hidden motion path. This is an isolation preview, not a character recovery test. At 1000 ms stop on the effect-free scene. Manual Replay, Pause, Seek and 1x/0.5x speed controls; no automatic replay. Half-speed changes only presentation rate, not authored cue times. Seeking evaluates the image but dispatches no cues; resume does not retroactively dispatch skipped cues. Replay resets the event history. Reduced-motion mode offers still stepping without autoplay.

Later attachment must measure the palm on a reviewed left-facing Kuro pose. Never copy the provisional offset (palm minus feet = [-24,-32]) onto every future pose. Keep the native 48x48 cell and pivot, supply per-pose offsets, and ensure the orb is not also baked into the actor sheet. No runtime manifest edit is commissioned now.

### Labeled review sheet

Native canvas 288x104, output 1152x416 at exact 4x. Background `#20262C`. Header `KURO DARK PALM WELL` at (8,6), 5x7 bitmap font with one-pixel character spacing. Five 48x48 cells at (8,24),(64,24),(120,24),(176,24),(232,24). One-pixel grey `#777777` border immediately outside each cell, spanning x-1..x+48 and y-1..y+48. Cell ID at (cellX,74), state at (cellX,84), duration at (cellX,94), same bitmap font. KW01..KW05, SEED/OPEN/HOLD/FOLD/STITCH, 80ms/100ms/240ms/100ms/80ms fit their columns. Pivot/safety lines are a toggleable separate guide overlay, excluded from the default review PNG. Import sheets contain no labels, borders, guides, mannequins or backgrounds.

### Required exports, all future deliverables

Use basename `kuro_dark_palm_well_v01` and keep future production files together under `assets/party-fx/kuro-dark-palm-well-v01/`. The specification itself belongs in `docs/sprite-requests/`.

| Filename | Exact requirement |
| --- | --- |
| `kuro_dark_palm_well_v01.aseprite` | Editable 48x48 document, five frames, named layers, saved five-colour palette and durations 80/100/240/100/80 ms. Keep loop policy in metadata if the editor cannot save it. |
| `kuro_dark_palm_well_v01.png` | Clean transparent native atlas, 240x48, five columns/one row. |
| `kuro_dark_palm_well_v01_4x.png` | Exact nearest-neighbour atlas, 960x192. |
| `kuro_dark_palm_well_v01_review_4x.png` | Labeled review sheet, 1152x416. |
| `kuro_dark_palm_well_v01.json` | Machine-readable atlas rectangles, palette, fixed pivot, bounds, exposure order, durations, cues, scene offset, layer rules, source commit and statuses. Follow the proposed metadata below. |
| `kuro_dark_palm_well_v01_preview.html` | Self-contained offline viewable preview, both backgrounds, all controls and placeholder label specified above. Include its editable preview source; do not rely on remote assets. |
| `kuro_dark_palm_well_v01_preview.png` | Animated PNG, 1280x720, one play, dark background, seven exposures: blank-of-effect 200 ms, the five effect frames, blank-of-effect 200 ms. Total 1000 ms, terminal effect-free scene retained. This is a playback file, distinct from the static native atlas. |
| `kuro_dark_palm_well_v01_validation.json` | Actual check outcomes and hashes, missing exports, source reopening, visual review and engine-test fields kept separate. |
| `README.md` | Reproduction/export instructions, provenance, placeholder status and explicit absence of full Dark integration. |

Do not rename a raster to `.aseprite`. If an export tool cannot create a required format, identify that filename as missing and leave the corresponding status unverified. None of these exports exists merely because this brief names it.

Proposed metadata contract, to be completed with actual export hashes and results after creation:

```json
{
  "asset": "kuro_dark_palm_well_v01",
  "spec_only": true,
  "source_commit": "095f4fc80c206c1321a5435a45434ff9c50dce14",
  "image": "kuro_dark_palm_well_v01.png",
  "size": [240, 48], "cell": [48, 48], "columns": 5, "rows": 1,
  "gutter": 0, "margin": 0, "safe_bounds_inclusive": [8, 8, 39, 39],
  "origin": "top-left", "pivot": [24, 36], "ground_baseline": null,
  "palette": ["#100F17", "#282233", "#483950", "#75618B", "#A496B2"],
  "alpha_values": [0, 255],
  "frames": [
    {"id":"KW01","rect":[0,0,48,48],"bounds":[21,28,27,34],"ms":80},
    {"id":"KW02","rect":[48,0,48,48],"bounds":[16,18,32,34],"ms":100},
    {"id":"KW03","rect":[96,0,48,48],"bounds":[12,10,36,34],"ms":240},
    {"id":"KW04","rect":[144,0,48,48],"bounds":[18,18,30,34],"ms":100},
    {"id":"KW05","rect":[192,0,48,48],"bounds":[23,29,25,33],"ms":80}
  ],
  "bounds_convention": "local inclusive allowed extents",
  "order": ["KW01", "KW02", "KW03", "KW04", "KW05"],
  "duration_ms": 600, "loop": false, "hold_last": false,
  "hide_at_ms": 600, "cancel": "hide_without_completion_cue",
  "diagnostic_cues": [{"name":"well_held","ms":180},{"name":"well_clear","ms":600}],
  "impact_cues": [], "gameplay_events": [],
  "layers": [
    {"name":"CORE","resolution":[48,48],"blend":"source-over","filter":"nearest","scale":4},
    {"name":"EDGE","resolution":[48,48],"blend":"source-over","filter":"nearest","scale":4}
  ],
  "smooth_layers": [],
  "preview": {
    "native":[320,180],"output":[1280,720],"start_ms":200,"duration_ms":1000,
    "effect_pivot_world":[236,120],"effect_cell_origin":[212,84],
    "placeholder_feet":[260,152],"baseline":152,"facing":"left",
    "backgrounds":["#C4C2B4","#101D26"],"autoplay":false,"auto_replay":false,
    "apng_num_plays":1,"apng_exposure_ms":[200,80,100,240,100,80,200]
  },
  "exports": {
    "atlas_native":[240,48],"atlas_4x":[960,192],
    "review_native":[288,104],"review_4x":[1152,416]
  },
  "status": {
    "reference_available":true,"specified":true,"exported":false,
    "technically_checked":"specification arithmetic only",
    "artistically_approved":false,"engine_tested":false
  },
  "integration": "isolated caster-side component; target reaction and damage timing unassigned"
}
```

### Acceptance and status reporting

1. Check actual exports against all dimensions, row/column order, frame rectangles, safety bounds, fixed pivot and filenames. All visible pixels, including outlines, fit each cell's allowed extent. Verify no automatic trimming. Confirm placement math: (212,84)+(24,36)=(236,120), with no frame-dependent offsets.
2. Verify exact five-colour subset, binary alpha and opaque cavity interiors. No checkerboard painted into transparent space. Inspect one-pixel contours at native size and 4x; the lighter broken inner rim is intentional, accidental gaps in the outer silhouette are not. No extra pupil or face-like highlight.
3. Every native pixel in each static 4x output must become an identical 4x4 block, RGBA included. Decode the APNG and compare its effect crops to the atlas and its delays to the seven-exposure schedule. Palette conversion or smooth scaling is a failure.
4. Check five exposures sum to 600 ms, the hold occupies [180,420), the scene sums to 1000 ms, and effect pixels disappear at local 600 / scene 800 ms. Check the two diagnostic cues once each, zero impact/gameplay cues, no cues on seek, replay re-arms, cancellation hides, and the preview stops without looping. Verify the terminal blank-of-effect scene persists in the actual viewer.
5. View at native size, exact 4x and half speed on both specified backgrounds. Opening must read upward from the same palm, the 240 ms hold must be truly still, and contraction must read inward rather than as a shrunken copy popping down. If the five poses do not read convincingly, record an artistic failure before expanding the scope.
6. Confirm actor and palm remain stationary, the maximum cavity stays clear of the torso, the edge remains readable on dark teal and the core remains dense on pale stone. Do not add glow to rescue poor contrast. The effect must not look like a floating character eye. No target reaction is expected or approved: this test does not establish attack contact, travel momentum or full-cast recovery. Those remain explicit integration checks for later work.
7. Confirm guides, labels and the neutral placeholder never enter the native atlas. Confirm light/dark switching does not modify atlas colours, animation or alpha. Check pause, seek, slow playback and reduced-motion stepping by opening the actual preview, not just by reading its source.
8. Reopen the editable source in Aseprite and verify layers, palette and durations. Report this separately from file-format checks. Actual engine import requires a future approved casting pose and choreography; leave it untested until performed. Do not alter current manifests, sheets, battle rules or PR #12 to claim integration.

Report `reference_available`, `specified`, `exported`, `technically_checked`, `artistically_reviewed`, `artistically_approved` and `engine_tested` separately, with evidence or an explicit missing check. Passing dimensions does not make the art production-approved. This specification commissions one effect component and its review material, not a finished Kuro character set or complete Dark spell.

**END**

## Specification-run verification

Passed: proposed rectangles, timing totals and boundaries, safe-area containment, pivot arithmetic, review-label placement, 4x dimensions, JSON validity, export-name consistency and complete-prompt boundaries. These checks validate the brief, not future pixels. `tools/check.sh` passed, including repository links, data/reference checks, animation continuity/parity, authoring checks and the simulator smoke run. Its two existing drift warnings concern Quick Song and general Delay values, already recorded under open questions 3 and 2 in `docs/implementation-status.md`; existing creature attachment review notices remain. No gameplay or rig change is made here. Artwork exports, editable-source reopening, live effect playback, artistic approval and target-engine testing remain unperformed.
