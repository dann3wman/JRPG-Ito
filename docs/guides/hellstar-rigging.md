# Hellstar sprite animation and rigging

Open the [Bestiary Rig Viewer](../../tools/bestiary-rig-viewer/index.html) and choose **Hellstar I**, **Hellstar II** or **Hellstar III** in its creature list. There is no separate boss page. Local-file playback works without a server or build. For WebGL rendering and PNG export, serve the repository with `python -m http.server 8771 --bind 127.0.0.1` and open `http://127.0.0.1:8771/tools/bestiary-rig-viewer/index.html?boss=hellstar_unwound`.

The three approved images remain intact. Each is a continuous weighted mesh: 1,089 vertices, 2,048 triangles, and an ordered bone hierarchy in a 1,000-square coordinate space. Elliptical influences blend skin across adjoining regions instead of introducing cut edges into the interwoven anatomy. A root influence keeps unweighted areas attached.

| Form | Bones | Idle | Attacks | Shared clips |
| --- | ---: | --- | --- | --- |
| Ainsel, the Unwound | 17 | Unequal breath, 8 seconds | Gaze / Offbeat; Tongue / Devour | Hit, transform, collapse |
| The Eaten | 20 | The bodies breathe, 10 seconds | Chorus; Binding arms / Unwind | Hit, transform, collapse |
| The Listener's Eye | 16 | Unstable / Convulsions, 12-second composite loop | Listen / Lost Turn; the anchors tighten | Hit, wind into the shell, collapse |

The staged final-boss reveal follows the Final Fantasy multipart-boss precedent: readable weak regions remain parts of one towering body. Ainsel leads the first breath, swallowed faces answer out of time in the second form, and the final Eye becomes violently unstable. It squeezes and expands every 1.2 seconds while the lids, spinal iris and anchors writhe at different frequencies. Ainsel's face and hair twitch against the surrounding motion. All cycles meet smoothly after 12 seconds; the convulsions continue underneath attack clips. Reduced motion still starts paused.

## Inspect and export

Use the existing animation buttons, Play/Pause, timeline and speed controls. Transform advances to the next form. Bones are visible by default; select one in the Skeleton tree or drag its joint on the stage. Mesh exposes the deformed triangles. Reference shows the original art. Rig authoring → Setup pauses on the rest pose and supports the same bone fields, undo/redo and changed-definition patch import/export as the other creatures. Animation mode supports editable pose tracks and timing. Temporary joint-drag offsets reset with Reset pose; Setup edits remain in the tab until exported. Reduced motion starts paused, and selecting a clip explicitly plays it.

**Export weighted rig** writes source animation parameters, current native bone/clip definitions, bind positions, normalized vertex weights and triangle indices. **Export changed definitions** writes the viewer's importable patch. **Export 16-frame PNG** writes a transparent 4-by-4 sheet with 384-square cells, including current authored edits. Frames are row-major: loops sample `i * duration / 16`, actions sample `i * duration / 15`. These are review sheets; live motion interpolates continuously. Transition sheets include the next form's crossfade. PNG export requires HTTP; local-file rig and patch exports work normally.

## Runtime files

- [hellstar-rigs.js](../../assets/bosses/hellstar-rigs.js): source art references, bones and 18 authored clips.
- [mesh-skin.js](../../tools/bestiary-rig-viewer/mesh-skin.js): weights, keyframe sampling and linear skinning.
- [mesh-renderer.js](../../tools/bestiary-rig-viewer/mesh-renderer.js): WebGL and Canvas rendering.
- [hellstar.js](../../tools/bestiary-rig-viewer/hellstar.js): registers three native RIGS entries with parent-relative bones and animation functions.
- [Bestiary Rig Viewer](../../tools/bestiary-rig-viewer/index.html): shared continuous idle clock, interruption blending, native bone solving, editor, rendering, transitions and exports.

The native solver produces bone matrices; inverse bind transforms convert them into skin matrices. Editing a native bone therefore changes the painted mesh, not just an overlay. Body-region idle amplitudes are 2.4 times the first draft, and regional attack translations/rotations are 1.8 times the first draft; influence radii widened by 18% to keep joins continuous at those extrema. Ainsel, the Eye and other parts can retain separate combat records while one mesh draws their shared body. Animation data contains no HP or move-selection rules.

These are 2D deformation rigs, not cut-out atlases or 3D models. They preserve existing painted overlaps and cannot reveal anatomy hidden in the source image. Large limb swings or a fully closing eye would require additional artwork. Transforms and collapses use controlled contraction and crossfade rather than a newly drawn anatomical morph. Sequential battle phases and combat-event hooks are still separate implementation work.

Run `node tools/animation-check/hellstar.js` for weight, seam, transform, action-boundary, framing and triangle-winding checks. Browser verification and export use `node tools/animation-check/hellstar-browser.js` with Playwright installed; set `PLAYWRIGHT_CHROMIUM_EXECUTABLE` if needed. Review artifacts go under ignored `output/playwright/hellstar-integrated/`.
