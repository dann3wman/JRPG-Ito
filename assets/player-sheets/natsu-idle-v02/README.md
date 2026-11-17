# Natsu idle registration v02

Partial review, 11 November 2026. Not production-approved.

The installed idle2 and idle3 sit six native pixels left of idle1 despite the stationary breathing specification. Translated both by (+6,0), with no redraw, resampling, colour changes, clipping or timing changes. All 52 other cells are RGBA-identical in the native PNG. The installed lossless WebP matches its alpha and visible pixels.

Geometry: 576x864, 6x9 cells of 96x96, baseline88. All 54 frame names and 26 animations come from the current manifest. Idle remains idle1,idle2,idle3,idle2 at240ms per slot,960ms total. No timing assumptions. Slow previews double durations. All normal/slow APNGs were decoded against the reopened corrected PNG; duplicate held poses retain their total duration. Single-pose sequences are intentionally static. GIF previews are convenience quantised copies.

## Selection and source reconciliation

Previous review was Kiri. PR12 is now merged; no open PRs existed during selection. This run uses the current default head, preserving that repair and the newer Kuro specification. Natsu's installed atlas has not been reviewed, unlike the larger source and separate four/eight-pose Cure studies. Kuro's new asset remains an effect specification, not a character sheet. Miren's prior review is retained. This run prioritises a confirmed defect in an unreviewed runtime version.

The repository raw source SHA256 is 2bffcf6cd43b1fe6baa7b8700c9b9d1479a24efd0a935e83c609e6992f363d8c, matching Library source libfile_e687144b34488191bac515e07c4176f7 recorded in the current log. The previous Library correction repacked it into192px cells. That is not interchangeable with this96px runtime atlas and is not overwritten. The runtime metadata is authoritative for this export. Original raw source remains in Git; build.py reproduces this local repair from the pinned original runtime blob. Re-slicing the uncorrected source would need this registration checked again.

## Inspection

Every original and corrected pose inspected as stills. Idle: lateral discontinuity corrected while retaining breathing/hair changes. Ready/defend/advance: braced and stepping silhouettes readable. Attack/attackB: anticipation, extended casting strike and follow-through poses present; intentional short90ms slots retained. Chant/cast/item: hands, light and thrown vial readable. Hurt/lowhp: recoil and kneeling contacts retained. Special/limit: Cure gestures and expanded halo readable. Victory/zombie/KO: front-facing, slack and prone poses retained. Sleep/paralyze/confuse/berserk: intentional status distortions and holds preserved. WalkDown/Up/Side: standing and opposing foot poses present. Shock/downcast/listen: single-pose emotes retained. No other edits justified from stills alone.

Original head/hair/robe volume and halo face counts vary. Palette has81813 opaque RGB colours, not strict20-colour FFVI art. Existing shaded clusters remain; this patch adds no blur or antialiasing. Professional artistic cleanup remains incomplete. Root cause is imported pose registration, but the upstream cause is not established; do not assume per-frame bounding-box centring.

Live normal/slow playback attempted but not inspected: Chromium failed with socket() Operation not permitted. Consequently spacing, arcs, weight, impact, follow-through rhythm, secondary motion and loop seams remain unverified. Derived status looks and engine integration untested. Repository Natsu Cure video is a4.1s placeholder choreography reference, not a matching idle reference; its README was read, but video playback was not verified. Cure choreography metadata is preserved unchanged, including its quiet delayed face-return beat.

## Deliverables and validation

Native natsu.sheet.v02.png, matching JSON, nearest-neighbour2x review sheet, idle normal/slow GIFs, review.html with52 normal/slow APNG previews, and editable build.py. Run python3 build.py from this directory with Pillow and NumPy. Source identity, hashes, exact order/timing, per-frame bounds and validation flags are in JSON.

Asset checks pass: exact translations, unchanged cells, binary alpha, palette subset, transparent padding, PNG/WebP parity and lossless preview pixels/durations. tools/check.sh passes with pre-existing Quick Song and Delay warnings tracked in implementation-status questions3 and2, plus unrelated creature attachment review notices. Final diff inspected. Draft PR required until playback and art review are complete.
