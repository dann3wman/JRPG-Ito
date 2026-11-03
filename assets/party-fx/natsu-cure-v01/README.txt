FINAL FANTASY: THE HUMMING CRYSTAL
NATSU / CURE / MOTION STUDY 01

A stationary healing animation with a quiet horror detail. Natsu prays,
offers light to an allied Kiri, and restores her. After the healing, a small
face-like echo travels back and becomes caught in Natsu's halo.

Status: choreography prototype. The sprites and stage are placeholders.
The Natsu atlas is newly generated from her established character description.
The allied Kiri atlas is the placeholder from Spiral Cut v02. Neither is
claimed as an approved final character sheet. No reference-video footage or
audio is reused. The video is silent.

PLAY
natsu_cure_v01.mp4: one 4.1-second play at 1536x864, 60 fps.
natsu_cure_v01.html: self-contained preview, no network dependencies.
Controls: play/pause, replay, time scrubbing, 1x/0.5x/0.25x speed, light/dark stage.
The preview stops on an idle scene with the ally healed and the new face present.
Replay resets the single-cast demonstration; it does not accumulate more faces.
storyboard.png: six key stages.
poses_review.png: labeled placeholder pose cells.

EDIT
render.js: deterministic Canvas 2D scene, animation, and effects.
poses.png: 128x128 Natsu atlas, 2 columns by 2 rows of 64x64 cells.
poses_4x.png: 512x512 nearest-neighbor enlargement.
ally_poses.png: 192x128 Kiri reference atlas, 3 columns by 2 rows.
timeline.json: frame mapping, anchors, layer rules, phase and event timings.
creation_prompt.txt: complete production brief.
validation.json: completed checks and limitations.
After editing render.js or the PNGs, run node build_preview.cjs to rebuild
the embedded HTML. Only built-in Node modules are needed for that command.

NATSU CELL MAP (native pixel coordinates)
R1C1 IDLE:    x0,  y0,  w64, h64
R1C2 PRAYER:  x64, y0,  w64, h64
R2C1 OFFER:   x0,  y64, w64, h64
R2C2 RECOVER: x64, y64, w64, h64
All frames share local pivot (32,56); origin top-left, +x right, +y down.
No labels or borders in the import atlas. Pose cells have transparent margins.
Kiri uses cell index 4 while wounded and index 0 after healing.
The additional halo face is drawn at native resolution by the renderer and
attached with small thorn-like strokes. It is separate from the four pose cells.

RENDERING
Native scene 384x216. Output 1536x864, exactly 4x.
Actors, added face, and stage: integer pixels, nearest-neighbor enlargement.
Rings, ribbons, blooms, and motes: smooth 4x layers with partial transparency.
All layers use source-over compositing. No universal six-color palette or
binary-alpha limit applies to the VFX. Colors are cream, pale sage, muted gold,
slate teal, and bone. Character pixels keep their crisp contours.
Caster remains at (266,166); ally at x120, baseline166 after recovery.
Crown focus is (266,128). The new face attaches near (275,131).
The background is a simple test stage, not a completed battle-background asset.

TIMELINE (milliseconds)
0-450: Ready. Ally is in a tired pose with a low review health bar.
450-1000: Prayer. Palms meet; restrained light gathers around the crown.
1000-1400: Halo awakens. Hands open; two light streams arc toward the ally.
1400-2000: Light gathers. Rings rise around the ally; motes collect.
2000-2400: Cure. One heal event, localized bloom, stance and health recovery.
2400-2880: A face returns. A small pale echo follows a curved path to the crown.
2880-3350: The halo remembers. One new face attaches; Natsu briefly lowers her
shoulders and gathers her hands. The face persists while the glow subsides.
3350-4100: Ready. No transient effects; the new halo face remains visible.

EVENT CONTRACT
1000 halo_awaken
2000 heal (exactly once)
2880 face_added (exactly once)
3350 effect_clear (transient layers only)
The face is a persistent visual state for the remainder of this invocation.
The review health bar is illustrative; no game statistics are connected.

UNIQUE ART VERSUS PLAYBACK
Four unique Natsu poses, two reused Kiri poses, and one procedural face glyph.
The 246 video frames come from runtime holds, compositing, paths, and effects.
They are not 246 separately drawn character poses.

VALIDATION
The same render.js used by the HTML was executed with a Canvas 2D renderer.
Key stages were visually reviewed on light and dark backgrounds.
Checks verify one healing event, one face addition, stationary anchors, final
idle, transient cleanup, and persistence of the added face.
Real-browser layout/playback and game-engine integration remain untested.
The original three-face crown is placeholder art, not a validated production rig.
Do not treat this package as final approved character animation.
