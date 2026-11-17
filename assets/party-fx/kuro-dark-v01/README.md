# Kuro: Dark v01

A new 3,400 ms standalone battle action: Kuro lifts her palm, holds an unlit cavity, opens a larger fold around the target, releases one delayed hit, then settles while the fold contracts. This implements a complete action beyond the earlier unbuilt palm-well component. It does not install a full Kuro sheet or change combat rules.

**Built and exported, technically checked, incomplete visual review. Not artistically approved or engine-tested.** GIMP played the GIF at normal and half speed and the casting ORA reopened with three layers. Live inspection was sampled, not a complete continuous review. The local browser preview refused connections, so browser control interactions remain unverified. No polished/finished animation claim follows from the technical checks.

Open [kuro-dark.v01.html](kuro-dark.v01.html) locally for Replay, Pause, normal/half speed, seeking and pale-stone/dark-teal backgrounds. All images and renderer code are embedded. No network or server is required by the delivered file. Download [MP4](kuro-dark.v01.mp4), [lossless APNG](kuro-dark.v01.apng) or [GIF viewing derivative](kuro-dark.v01.gif). The HTML and APNG are one-shot; the GIF metadata permits one repeat, and native GIMP's own playback loop can repeat independently. Gameplay intent is always one-shot. Replay resets cue history; seeking emits nothing and does not re-arm already passed cues. No cues mutate gameplay.

## Actual contributions

- New generated raster art: eight Kuro casting keys and eight target-fold keys. Two original 1536x1024 generated sheets and the exact prompts are retained under `source/`.
- Cleanup: threshold generated alpha at 200, common nearest-neighbour scale, shared 24-colour actor palette and 16-colour fold palette, fixed registration, exact reuse of the idle boot strip across the eight poses. Four source-edge pixels are excluded from fold cells to reject boundary wisps. No colour key removes the black cavity interiors.
- Five palm drawings are smaller derived versions of the new fold artwork, not five additional independently drawn frames. Four small residue fragments reuse the last palm drawing.
- Reused supporting art: the repository's training dummy, visibly labelled as a placeholder. Its 64x64 RGBA pixels are preserved in `target-context.png`. Kuro is newly drawn, not a placeholder. No existing Kiri/Natsu/Miren sequence is relabelled or retimed.
- Authored animation: eight articulated arm/body/hair/robe drawings, ten actor exposures, eight fold exposures, fixed feet, measured per-pose palm anchors, deterministic target recoil, continuous supporting light at 2x authored resolution. No random jitter, camera shake, unrelated-pose blending or fractional actor movement.

## Files and formats

| File | Content |
| --- | --- |
| `kuro-casting.v01.png`, `.4x.png`, `.ora` | Eight 96x96 cells, 4 columns x 2 rows, native atlas 384x192, preview 1536x768. Real OpenRaster source, three editable luminance-separated raster layers. |
| `dark-folds.v01.png`, `.4x.png`, `.ora` | Eight 128x128 cells, 4 columns x 2 rows, native atlas 512x256, preview 2048x1024. Three editable layers. |
| `palm.v01.png` | Five 48x48 cells, 240x48, transparent derived palm strip. |
| `timeline.v01.json` | Exact rectangles, cell labels, anchors, palettes, exposure durations, cues, motion paths and layer rules. Frame indices are zero-based; labels are one-based. |
| `review.v01.png`, `review.v01.4x.png` | 552x552 and exact 2208x2208, readable bitmap labels outside usable cells. |
| `scene.pixel-native.v01.png`, `scene.pixel-4x.v01.png` | Pixel-only 384x216 / 1536x864 replication pair. No smooth-light or UI contamination. |
| `scene.dark.v01.png`, `scene.light.v01.png` | Composite 1536x864 inspection stills, including separately rendered light and placeholder labels. |
| `kuro-dark.v01.html`, `.mp4`, `.apng`, `.gif` | Self-contained player; 60 fps 1536x864 MP4; lossless 1536x864 APNG; 768x432 quantised GIF derivative. |
| `build.py`, `render.js`, `export.cjs`, `encode.py`, `player.template.html` | Reproducible raster cleanup, shared runtime renderer, export and player source. |
| `test.cjs`, `check-render.cjs`, `validate.py` | State/event, actual rendered-layer and decoded-output checks. |
| `validation.v01.json`, `runtime-validation.json`, `render-validation.json` | Actual results, hashes, limitations and separate approval statuses. |

OpenRaster was selected as the editable art format. No Aseprite file is claimed or required by this build. ORA contains editable raster value layers, not invented original hand-painted layers or an animation timeline. The external JSON owns timing. The eight-pose study is not compatible with the standard 54-frame party importer without a separate integration step.

## Rebuild

Requires Python 3 with Pillow and NumPy, Node with `@napi-rs/canvas`, and FFmpeg. Run from this directory, with a scratch directory for temporary rendered frames:

```sh
python3 build.py
node export.cjs /tmp/kuro-dark-frames
python3 encode.py /tmp/kuro-dark-frames
node test.cjs
node check-render.cjs
python3 validate.py /tmp/kuro-dark-frames
```

If Node cannot resolve the canvas package, configure `NODE_PATH` to your installed dependency directory. No image API is needed to reproduce the checked exports from the preserved generated sheets. Regeneration is a separate creative operation and may produce different pixels.

## Evidence and limits

Current default branch discovered at run time: `ccr-d8829a5a-ays4x1`, base `5fbc8b8c6e3366196eda437e0296ef1ff3ec71bf`. Relevant instructions, cast, static extracted sprite/portrait, [prior palm brief](../../../docs/sprite-requests/kuro-dark-palm-well-2026-11-10.md), recent commits and open PRs were inspected. No equivalent built Kuro action or same-date branch existed. [PR #24](https://github.com/dann3wman/JRPG-Ito/pull/24) and review-log version 13 establish Miren's unresolved recovery snap; their actual changes are untouched. The Miren recovery and Natsu Halo Glance briefs remain continuity references, not finished assets. Natsu's v02 mask specification in PR #21 is unrelated to Kuro.

Five supplied reference clips remain locally available. Their previously extracted action-window contact sheet was inspected again. The small-cue to larger target magic in `20150323_9h9tSnldEE8.mp4` and convergence timing in `20150123_OIw2mFut1No.mp4` inform this action. This is not a fresh continuous footage review or a measured copy of their timings. See the [implementation brief](../../../docs/sprite-requests/kuro-dark-action-2026-11-15.md) for source IDs and full creation prompt.

Static/native inspection found coherent costume and silhouette, and fixed feet. Live GIMP samples showed cast and contraction states advancing at 1x and 0.5x. Those observations do not establish smoothness across every transition. Full normal/half-speed continuous review, target-response readability through the closing folds, final UI interaction testing, user artistic approval, and game-engine import remain outstanding. Final placeholder labels, the glow-radius safety correction and foreground target emergence at the damage cue were validated in exports after the sampled playback; they were not replayed live. The target is deliberately obscured during the held cavity. Judge whether its reappearance and recoil read clearly before approval.

Corrections during this build: removed low-alpha generated backdrop fringe; replaced boot-strip variation; increased review height from 536 to 552 so the last labels fit; limited the target glow radius from 70 to 64 native units to preserve the scene safety margin; prevented backward seeking from re-firing damage; labelled the target in rendered previews; moved its emergence in front of closing folds at1830ms so the recoil is not hidden. No claimed visual revision depends on unseen continuous playback.
