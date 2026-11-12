# Drowned Chapel: rear lancet v01

Production specification, 12 November 2026. Exactly one static background component: a small pointed window with damaged glazing, masonry and a few strands of hanging growth. One drawing, not a whole battle background or animation.

## Why this is useful now

The current backdrop establishes a flooded Gothic chapel, but its delivered 1672x941 raster is not a declared native-pixel construction kit. A single 64x80 window establishes a controlled battle-scale treatment for distant stone and glass before anyone commissions a larger replacement. It is independent of the unfinished party studies and avoids duplicating the current animation reviews. The FFVI precedent is a detailed architectural backdrop with quiet space behind combatants. The benefit is readable silhouettes; the trade-off is that this isolated study cannot certify a finished arena or a seamless replacement for the existing image.

## Inspected evidence and status

Default branch refreshed and verified as `ccr-d8829a5a-ays4x1`, head `c1840737fef12061165ef6bb553e7bfa166b717b`. Root AGENTS.md applies; no nested documentation AGENTS.md was found. Documentation and art instructions remain unchanged from the preceding runs. Inspected the current layout, style guide, recent commits, open PRs and the arena declaration in `tools/bestiary-rig-viewer/index.html`: chapel uses `bg_chapel.webp`, bottom 0.8, height 0.58, water true. Those are existing runtime settings, not a native layout contract for this study.

Freshly viewed and measured [the existing chapel image](../../tools/bestiary-rig-viewer/bg_chapel.webp): 1672x941 RGB, SHA256 `78f135426a189e674ac049832977d9850c57803c8741a72b4505d4a466199222`. It shows pointed arches, broken leaded glass, cold blue-green illumination, dark stone, hanging growth and a flooded floor. The source is available and exported. Its artistic approval and engine-wide validation are not established here. Do not infer a 4x native grid from its pixel-like surface.

Read the new Miren entry in [review log version 10](https://chatgpt.com/library?file_id=libfile_e3bd1f9d5db0819185bc1c703e5bf682&account_id=personal) and the actual corrected renderer and README on [PR #16](https://github.com/dann3wman/JRPG-Ito/pull/16). It changes contact/recoil x registration, keeps all six sprite cells unchanged and remains a draft with live playback and engine testing incomplete. Natsu PR #14 also remains a draft. [Hisui's specification PR #15](https://github.com/dann3wman/JRPG-Ito/pull/15) is open; Kuro's specification is merged. None establishes new art merely by publication. Refreshed the selection/status sections of the [Miren recovery specification](https://chatgpt.com/library?file_id=libfile_6bfe860bb62c8191afed0871b6e0e0c2&account_id=personal) and [Natsu halo-glance specification](https://chatgpt.com/library?file_id=libfile_ba10f229c3608191af2cf0b314dc8e73&account_id=personal). No delivered bridge/glance art is established. This work does not change their assets or prompts.

The five supplied FFRK clips remain available locally. Their November 10 contact sheet was viewed again today, not re-extracted or continuously replayed. The action windows demonstrate why a background must yield to moving actors, large sweeps and overlapping light. No animation timing is taken from them for this static asset. References: [sweeps, 8-14 s](https://chatgpt.com/library?file_id=libfile_3d08908cd9608191bfd139d2d53d011c&account_id=personal), [directional contacts, 8-14 s](https://chatgpt.com/library?file_id=libfile_bde1fc1da2408191baeb0cf4de9e3547&account_id=personal), [apparition/pillars, 12-17 s](https://chatgpt.com/library?file_id=libfile_5ea2416c3fc08191afb807b6f13ec63b&account_id=personal), [motes/convergence, 8-11 s](https://chatgpt.com/library?file_id=libfile_585af039e0708191996443e0c5c5bfc0&account_id=personal), [party light, 13-15.5 s](https://chatgpt.com/library?file_id=libfile_643cd8293c4c81918fee2fa51a3decf4&account_id=personal).

Confirmed: reference architecture, current backdrop bytes and arena settings. Proposed: every native dimension, palette, placement and construction rule below. Dependency for a future arena: approved native camera/scene dimensions, wall layer, water layer and compositing decision. These do not block one standalone window. Status of this new component: specified only; not exported, art-technically checked, artistically approved or engine-tested.

## Complete copy-ready creation prompt

Copy START through END as one production brief.

**START**

Create exactly one small static art asset for FINAL FANTASY: THE HUMMING CRYSTAL: **Drowned Chapel rear lancet v01**. Draw a pointed Gothic window with a narrow weathered stone surround, damaged blue-green leaded glass and two restrained strands of hanging growth. Keep the original chapel's cold, drowned atmosphere. Make architectural decay the disturbing detail. No faces, eyes, figures, statues, readable symbols, new lore, blood, foreground vegetation, floor, water, reflection, moon, sky panorama or whole-room repaint.

Use `tools/bestiary-rig-viewer/bg_chapel.webp` in `dann3wman/JRPG-Ito`, commit `c1840737fef12061165ef6bb553e7bfa166b717b`, as composition and material reference. Its SHA256 is `78f135426a189e674ac049832977d9850c57803c8741a72b4505d4a466199222`. It is a 1672x941 RGB image, not an approved native tile sheet. Inspect it before drawing. Do not cut out and shrink a section, trace resampled pixels or treat its apparent pixel size as authoritative. Construct the new component directly on the native grid. If the source differs or is inaccessible, report the dependency instead of inventing an inspection.

### Geometry and composition

One native 64x80 cell, one column and one row. Clean import PNG is exactly 64x80, rectangle [0,0,64,80]. No atlas gutters or outer sheet margins beyond the cell itself. All nontransparent art, including contours and growth tips, remains within local x8..55,y8..71 inclusive. This creates an 8-pixel transparent safety margin on every side. Origin top-left, x right, y down. Fixed placement anchor (32,72), immediately below the sill. No ground-contact baseline; the window belongs on a rear wall. Fixed front-facing view, no perspective tilt or runtime rotation.

| Cell | ID | Part/state | Construction and placement |
| --- | --- | --- | --- |
| R1C1 | CL01 | Rear lancet, static | [0,0,64,80], anchor (32,72). Stone arch rises to y8 around x31..32; uprights stay within x8..15 and x48..55; sill occupies y68..71. Composite RECESS, GLASS, STONE, GROWTH; no guides in export. |

The arch tapers into a pointed apex. The inner opening begins near (32,17), widening into the region x17..46 below y30 and ending at y67. Follow the pointed arch silhouette rather than filling that bounding box indiscriminately. Make three uneven vertical glazing sections separated by dark lead strips at approximately x25 and x38 below y30. Break two small panes using opaque recess colour, not transparent holes through the wall. Keep the centre low-contrast. Do not reproduce the source's large rose window: this is one secondary lancet.

Keep weathering sparse. At most six masonry chips, each a deliberate cluster no larger than 3x3 pixels. Two hanging strands originate from the upper stone, stay close to the left/right surround and end above y52. No free-floating debris. A few offset lead joints can imply age, but no spiral, face or eye motif is added. The resulting silhouette must remain recognisably architectural at native size.

### Palette, outlines and layers

Use these ten opaque colours plus transparency: `#111C22` deepest outline; `#1C2B31` recess; `#2D3D43` stone shadow; `#46585D` stone body; `#687A7D` stone ridge; `#233E49` glass shadow; `#345765` glass body; `#537D87` glass accent; `#253B35` growth shadow; `#42564A` growth body. Proposed study palette, not an extraction from the source and not a universal game constraint. No pure white, bright cyan or emissive highlight. Glass accent occupies at most 24 native pixels in total. Save the palette.

Crisp 16-bit treatment with hand-placed clusters and stepped curves. Use a one-native-pixel darkest contour around the outer stone silhouette and growth where exposed to transparency. Inner lead is one pixel wide except deliberate two-pixel intersections. Stone thickness is structure, not a doubled outline. Use solid narrow strands. Optional two-colour dithering is limited to four 2x2 patches inside broad stone blocks; no random texture, antialiasing, blur or gradients.

Editable order, bottom to top: RECESS (solid dark backing of the opening), GLASS (panes and lead), STONE (complete surrounding arch and sill), GROWTH, GUIDES (hidden). RECESS extends at least one pixel beneath stone along every inner boundary, preventing accidental holes. Separate layers share the full 64x80 canvas and identical anchor. Outside the entire component remains transparent. Do not embed review backgrounds.

All art layers are native 64x80, normal source-over, straight RGBA with alpha 0 or 255. Composite at native resolution, then enlarge exactly 4x nearest-neighbour. No smooth/light layer is included. Glass is painted material, not additive light. Future ability light may be composited separately but is not part of this asset. No exploded rig or bone fitting is needed.

### Static behaviour and seams

Exactly one unique frame, no animation, duration not applicable (`duration_ms:null`), no loop or ping-pong, no events, no impact/recovery cues. It remains visible while the test scene is open. Hide only when that scene/layer is unloaded. No flicker, pulsing panes, moving growth, parallax, camera travel or runtime scaling animation. Do not manufacture extra frames for a static background detail.

This is a non-tiling standalone cutout. Opposite cell borders do not join. Never wrap/repeat it or mirror it into a row to claim a finished wall. Keep its 8-pixel transparent border intact in imports. A later wall composition must place masonry behind it and review inner/outer seams; no automatic replacement of `bg_chapel.webp` is commissioned. The current water-reflection flag remains unchanged. This component contains no baked reflection, so a later renderer must avoid reflecting it twice.

### Placement and combat-safe preview

Create a static comparison preview, not a choreography program. Native scene 320x180, output 1280x720. Review-only matte: rear area y0..103 and flat floor area y104..179. Anchor the window at world (160,88), so its cell origin is (128,16) and all art lies within x136..183,y24..87. No perspective scaling. Reserve x8..311,y104..171 as the combat-safe band: the new asset contributes zero opaque pixels there.

Use three neutral flat actor silhouettes as review aids, labelled PLACEHOLDERS outside their bodies. Each is a simple outlined rectangle, 20x56, standing on baseline y160: bounds x38..57,y105..160; x150..169,y105..160; x262..281,y105..160. These are readability markers, not new character designs. Use dark fill `#19151D` with pale outline `#D3C7B4`. Keep them in front of the backdrop. No floor shadows or additional art assets.

Scene order: matte, window composite, actor placeholders, optional anchor/safe-band guides. Make two preview PNGs with identical window/actor pixels: pale-stone matte `#C4C2B4` and dark-teal matte `#101D26`. The entire matte uses the selected colour; its rear/floor split is a guide only. Show guides in a separate toggleable source layer, not default PNGs. Test both backgrounds for fringe, accidental transparency and silhouette dominance. No temporal target reaction, residue, momentum or recovery is applicable to this static asset; the relevant scene check is whether it stays visually subordinate to actors and leaves the combat band clear.

### Labeled review and exports

Review canvas 96x120 native, 384x480 at exact 4x. Neutral background `#20262C`. Header `CHAPEL ARCH` at (8,6), 5x7 bitmap font with one-pixel spacing. Place the 64x80 cell at (16,24); draw one-pixel grey `#777777` border immediately outside it, x15..80,y23..104. Label `CL01 STATIC` at (16,106), same font. No labels, border or guide pixels in imports. The default review contains no anchor guides.

Use basename `chapel_rear_lancet_v01`; future production files belong together under `assets/background-studies/chapel-rear-lancet-v01/`. Requested outputs, none claimed created by this specification:

- `chapel_rear_lancet_v01.aseprite`: editable 64x80 source, one frame, named layers, saved palette. Editor default frame duration is not runtime animation; metadata duration is null.
- `chapel_rear_lancet_v01.png`: clean transparent 64x80 import image, also the one-cell atlas.
- `chapel_rear_lancet_v01_4x.png`: exact nearest-neighbour 256x320 import preview.
- `chapel_rear_lancet_v01_review_4x.png`: labeled 384x480 review.
- `chapel_rear_lancet_v01_scene_light_4x.png` and `chapel_rear_lancet_v01_scene_dark_4x.png`: 1280x720 static placement comparisons; include the editable 320x180 scene as `chapel_rear_lancet_v01_scene.aseprite` with reference and guide layers identified.
- `chapel_rear_lancet_v01.json`: the metadata contract below plus exact palette, source hash, output hashes and actual export status.
- `chapel_rear_lancet_v01_validation.json` and `README.md`: checks performed, evidence, missing exports, provenance and future integration constraints.

No animated preview or replay controls are needed for one static frame. Name any unsupported export explicitly; never rename a PNG as an editable source.

```json
{
  "asset":"chapel_rear_lancet_v01",
  "source_commit":"c1840737fef12061165ef6bb553e7bfa166b717b",
  "size":[64,80],"columns":1,"rows":1,"gutter":0,"margin":0,
  "frame_count":1,"frames":[{"id":"CL01","rect":[0,0,64,80]}],
  "safe_bounds_inclusive":[8,8,55,71],"anchor":[32,72],
  "origin":"top-left","ground_baseline":null,"facing":"front",
  "duration_ms":null,"loop":false,"events":[],"tileable":false,
  "alpha_values":[0,255],"filter":"nearest","blend":"source-over",
  "layers":["RECESS","GLASS","STONE","GROWTH"],"smooth_layers":[],
  "scene":{"native":[320,180],"output":[1280,720],"anchor_world":[160,88],
    "cell_origin":[128,16],"combat_band_inclusive":[8,104,311,171],
    "placeholder_baseline":160,"parallax":[0,0]},
  "exports":{"atlas_4x":[256,320],"review_native":[96,120],"review_4x":[384,480]},
  "status":{"specified":true,"exported":false,"art_technically_checked":false,
    "artistically_approved":false,"engine_tested":false}
}
```

### Acceptance and reporting

Validate actual image sizes, single-cell rectangle, safety margin, anchor alignment, layer order and ten-colour palette membership. Check binary alpha and transparent outer margins. Check the recess has no accidental transparent pinholes and extends under the stone. Verify one-pixel contours and lead, dither-patch limits and glass-accent count. Inspect clusters at native size; numerical bounds cannot certify convincing masonry.

Compare each native pixel with its exact 4x4 block in both atlas and review previews. In scene exports, check the window crop matches the native asset at (128,16) before enlargement; identical art pixels must be used on both mattes. Assert no window alpha enters y104..171. Inspect roots of growth and the arch/recess seam against both light and dark backgrounds, without masking defects with shadows.

Confirm the arch reads as distant chapel architecture rather than a bright UI icon, face or modern doorway. Keep actor placeholders dominant, with quiet negative space between their heads and the sill. Assess whether the damaged glazing and masonry retain the source's mood at native scale. A failure of contrast or shape is an artistic failure even if all dimensions pass.

Reopen both editable sources in Aseprite, verify layer visibility and palette, and record that test separately. A future engine test must verify placement, native sampling, wall overlap, water/reflection ownership and camera behaviour against the actual scene. No such integration is authorised here. Report reference available, specified, exported, technically checked, artistically reviewed/approved and engine-tested separately. This one window does not complete or replace the chapel background.

**END**

## Specification verification

Passed: document arithmetic, metadata validity, label bounds, safe placement, exact 4x dimensions and git diff whitespace checks. `tools/check.sh` passed, with existing Quick Song/Delay drift warnings already tracked in implementation-status open questions 3 and 2, and existing creature attachment review notices. These checks do not establish produced artwork, editable-source reopening, artistic approval or engine compatibility.
