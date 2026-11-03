FINAL FANTASY: THE HUMMING CRYSTAL
Kiri Haldane / Spiral Cut / v01

Contents
  kiri_spiral_cut_v01.aseprite       Editable indexed source, 64x64, six frames
  kiri_spiral_cut_v01.png           Transparent native atlas, 192x128
  kiri_spiral_cut_v01_4x.png        Nearest-neighbor atlas, 768x512
  kiri_spiral_cut_v01_review_4x.png Labeled review, 896x736
  kiri_spiral_cut_v01.json          Frame rectangles and playback contract
  kiri_spiral_cut_v01_playback.gif  Pale-stone and dark-teal playback preview
  kiri_spiral_cut_v01_validation.json
  generation_prompt.txt

Playback and import
Read the atlas in row-major order as a 3x2 grid of 64x64 cells.
Use durations 60, 60, 80, 120, 100, 80 milliseconds.
Align local pivot (32,32) with the target impact position.
Render above the target using nearest-neighbor filtering, integer placement,
normal alpha blending, and no texture smoothing or mipmaps.
Start on Kiri's forward sweep. Trigger one impact event at 120 ms.
Hide the effect at 500 ms; do not hold SC06 or loop.

The Aseprite document contains one visible editable layer, six compressed
indexed cels, a named six-color palette plus transparency, a forward tag
set to one play, and a slice with pivot (32,32). Aseprite's editor may hold
the last cel after playback; the runtime must honor the JSON hide contract.

The GIF has six visible frames totaling 500 ms, followed by a blank terminal
frame beginning at 500 ms. This seventh preview-only frame demonstrates the
hide behavior. The atlas and editable source each contain exactly six frames.
The GIF plays once; reload it to replay.

Production method
Artwork originated with built-in image generation. The chosen connected
spiral was reduced to native pixels, mapped to the specified palette, and
cleaned on the integer grid. The impact ribbon's traced centerline drives
SC03 and SC04. SC05 and SC06 remove sections of that same centerline, so the
dissolve cannot introduce frame-to-frame position drift. Dark contours were
normalized to one native pixel. Labeled review and exports were generated
from the same final pixels.

Validation
See the included machine-readable validation report. Dimensions, palette,
binary alpha, per-frame bounds, contours, dissolve registration, timing,
impact cue, exact 4x replication, and source roundtrip all passed.
The preview was inspected on pale stone and dark teal. The GIF timings and
terminal blank frame were checked from the saved file.

Limits of validation
The Aseprite desktop application is not installed in this environment.
The saved binary was independently parsed: all six cels matched the atlas
byte-for-byte; palette, durations, tag, and pivot slice were verified.
No game project was supplied, so actual engine import, character timing,
and gameplay effects have not been tested.

The source encoding follows the official Aseprite file specification:
https://github.com/aseprite/aseprite/blob/main/docs/ase-file-specs.md
