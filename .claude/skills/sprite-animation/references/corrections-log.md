# Sprite animation corrections log

Every correction made to a generated sprite animation or sprite sheet, newest first. Read this before generating or changing any animation. Each entry is a worked example of what went wrong the first time and what fixed it.

Rules that apply beyond one creature also go, in short form, under **Standing rules** in `../SKILL.md`.

## Entry template

Copy this block to the top of the Log section and fill in every field.

```markdown
### YYYY-MM-DD · <creature> · <clip, bone or sheet part>
- **Reported problem:** what looked wrong, as the user described it or as you saw it (attach or name the snap.js contact sheet if one was made).
- **Original generation:** what was generated and why it produced the problem (the exact values or code: pivot, rest rotation, keyframes, part art, prompt wording).
- **Root cause:** the actual mistake. One of: rig fit (pv / at / r / s), clip motion (timing, curve, amplitude, loop seam), draw order (z), missing or unsuitable sheet art, tooling.
- **Solution implemented:** what changed, with before → after values or a short diff. Name the commit if there is one.
- **ChatGPT revision:** (only if the sheet had to be regenerated) the revision text sent, and whether the returned sheet needed further fixes.
- **Rule for next time:** the check or habit that would have prevented it. Promote it to Standing rules in SKILL.md if it is general.
```

## Log

### 2026-10-25 · Listener's Eye · unstable pulsation and squirming
- **Reported problem:** phase three should pulsate and squirm wildly as though unstable.
- **Original generation:** a restrained 12-second single-cycle idle with small iris rotations and anchor sway; the final form moved less than the earlier forms.
- **Root cause:** clip motion contradicted the requested escalation.
- **Solution implemented:** phase-three-only changes: root X scale ±12% and Y scale ∓9.5%, 10 pulses per 12-second loop, plus opposing lid/iris movement and independently staggered anchor, face and hair cycles (7–17 per loop). Broadened selected third-form influences for continuous skin. Renamed its default clip `Unstable / Convulsions`; attacks inherit this motion. Collapse/transition scales now fade to transparency at a minimum 0.3 instead of 0.04: the native sampler adds continuous idle scale offsets, so the old near-zero scale could invert at a different idle-clock phase.
- **Verification:** 2,178 source samples and 3,294 native mesh samples passed with positive triangle winding; shared continuity checks passed for 25 rigs / 106 clips. Inspected local-file idle extremes, attacks, collapse and mobile framing; no page exceptions, clocks advance, reduced motion remains paused. First and second form definitions compare exactly with the pre-change snapshot. Browser evidence is under `output/playwright/hellstar-unstable/`.
- **Rule for next time:** combine different local frequencies for instability instead of uniformly accelerating the whole sprite. When adding scale pulsation, test collapse clips at independent idle-clock offsets; transparent final frames still need valid transforms.

### 2026-10-25 · Hellstar · integrate with the existing bestiary
- **Reported problem:** a separate page for one boss was unnecessary, and animation/rigging was not apparent.
- **Original generation:** three mesh rigs lived in an isolated viewer with temporary bone rotation controls. Body idle offsets were only a few bind-space pixels, with smaller weighted displacement on screen. Numerical motion checks passed without establishing that the movement read clearly in the intended workflow.
- **Root cause:** tooling integration and motion readability. The new skinning method was treated as a reason to build another application instead of extending the existing one.
- **Solution implemented:** removed the extra page and launcher card. `hellstar.js` registers Hellstar I–III as native RIGS entries with parent-relative bones; the existing solver drives the mesh through inverse bind matrices. Playback, skeleton selection, joint dragging, Setup edits, undo/redo, patch round trips and clip tracks use the existing controls. Regional idle offsets increased 2.4x, attack rotation/translation 1.8x and influence radii 1.18x; source images are unchanged. The first amplitude-only test exposed a folded Devour triangle; widening influence radii resolved the fold rather than bypassing validation. The weighted-skin reference tray uses its own wrapping layout to prevent image/text overlap.
- **Verification:** local-file Chromium playback produced different rendered sprite pixels and advancing clocks for all three forms. Exercised all 18 clips, actual joint dragging, Setup deformation, undo/redo, patch import/export, transforms, 320/390/768px layouts, reduced motion, missing art and 18 transparent PNG exports. No page exceptions. Native mesh checks sampled 3,294 poses at three idle-clock offsets with no inverted triangles; 2,178 source samples also passed. Existing editor browser checks passed, including rendered interruption continuity.
- **Rule for next time:** integrate first, then prove visible motion and editable skin using the real launch path. Bone counts and numerical transforms alone do not establish a satisfactory animation experience.

### 2026-10-25 · Ren · sprite effects and Sleep
- **Reported problem:** The slicer warned on cast1, special2 and special3; Ren also slept kneeling despite his character-specific upright Sleep.
- **Original generation:** A 6-by-9 green-key sheet requested compact effects and appended the upright twist to the generic sitting/kneeling Sleep description.
- **Root cause:** Unsuitable sheet art: muzzle flashes reached adjacent cuts, and the generic pose dominated the character override.
- **Solution implemented:** Image generation shortened gun reach and flashes and redrew both Sleep frames standing. The revision has real alpha, sliced with `--key=` without warnings. Ren's cast data now explicitly says standing on both feet, never sitting or kneeling. The shared sheet prompt counts flashes and shells as weapon reach.
- **ChatGPT revision:** Exact revision text is retained in `docs/sprite-requests/ren-generation-2026-10-25.md`. No further slicing fixes were needed.
- **Rule for next time:** Check effect pixels as well as limbs at cell cuts; inspect character-specific pose overrides rather than trusting the generic frame label. Circular pupil motion remains too subtle to verify in the packed Ren idle frames.

### 2026-10-25 · Hisui and Kuro · sprite grounding and portrait crops
- **Reported problem:** Hisui's first three attack frames touched cell edges, her portrait square crops clipped an eye, and ordinary sprite rows floated above the baseline.
- **Original generation:** long blades exceeded horizontal gaps; the portrait reference's side-heavy composition carried into the sheet. The slicer treated any source-relative bottom offset over 6 px as an airborne pose.
- **Root cause:** generated framing and an inferred-jump placement rule.
- **Solution implemented:** image edits shortened Hisui's attack blades and reduced/recentred her portrait heads. `cmd_sheet` now uses `BASE` unless the frame is explicitly in `airborneFrames`; Miren declares the four jump/dive frames. Re-sliced only Hisui and Kuro, preserving prior installed artwork.
- **ChatGPT revision:** retained prompts and images are recorded in `docs/sprite-requests/hisui-generation-2026-10-25.md` and `kuro-generation-2026-10-25.md`.
- **Verification:** no slicing warnings; 54 occupied sprite cells per character, each ending at row 88. Chromium exercised 26 animation controls, 12 portraits, all derived looks, flipping, whole-sheet view, existing cast selection and mobile layout without page errors. Battle embedding was unchanged.
- **Rule for next time:** declare intentional airborne frames; row drift is not evidence of a jump. Inspect portrait square crops as well as the full source page.

### 2026-10-25 · Hellstar · three-form weighted sprite rigs
- **Reported problem:** the three approved still images needed animation and rigging. The earlier combined battle sprite only had whole-body idle motion.
- **Original generation:** three complete transparent images, with interwoven ribbons, ribs and skin; no articulated bone or clip data.
- **Root cause:** missing animation assets. Cutting the approved continuous anatomy into rigid parts would require overlap art that the stills do not contain.
- **Solution implemented:** preserve the source PNGs and bind each to a 32-by-32 weighted grid. Authored 17/20/16 bones and six clips per form in `assets/bosses/hellstar-rigs.js`; added sampler, WebGL/Canvas renderer and dedicated preview. Same-form clip selection preserves the idle clock. Export reuses one renderer to avoid accumulating GPU contexts. Transitions contract and crossfade rather than claiming a newly painted anatomical morph.
- **Verification:** 2,178 numerical samples cover weights, rest placement, loop pose/velocity, action boundaries, frame bounds and positive triangle winding. Chromium rendered 72 samples across 18 clips; exercised live playback, all-form sequence, bone controls, rest/wire overlays, 320/390/768px layouts, reduced motion, missing art and direct-file Canvas fallback. Inspected three contact sheets and bone placement. All 18 exported sheets are 1536-square RGBA with true alpha; three JSON exports retain mesh weights. No page exceptions. Existing bestiary authoring/parity checks pass; their 16 attachment review notes remain separate.
- **Rule for next time:** choose the rig method from the actual art. A continuous mesh preserves joins but cannot reveal hidden surfaces. Keep animation assets, sampled sheets and combat integration distinct; inspect rendered extrema as well as numerical transforms.

### 2026-10-25 · Miren and Goku · party source sheets
- **Reported problem:** spear tips and hound effects crossed cells; Goku's last portrait column clipped faces. Miren's transparent output produced false occupied gaps.
- **Original generation:** effects exceeded margins; intermediate Miren revisions omitted a Limit frame or reversed field-facing directions. Background alpha 1–127 counted as art during cell detection although final output discarded it.
- **Root cause:** source composition and alpha preprocessing order.
- **Solution implemented:** regenerated compact effects and wider spacing, corrected Miren's down-facing frames and regenerated Goku's equal-width portraits. Applied the existing alpha >= 128 cutoff before cell detection in `party_art.py`. Miren's preview uses `--scale 0.52`; Goku uses default sizing.
- **ChatGPT revision:** full prompts, sources and limitations are recorded in `docs/sprite-requests/miren-generation-2026-10-25.md` and `goku-generation-2026-10-25.md`.
- **Verification:** both retained sprite previews and portrait grids slice without warnings; each sprite atlas contains 54 nonempty cells. No runtime integration. Miren's smaller preview, spear continuity, heel lift, portrait framing and animation grounding remain review items.
- **Rule for next time:** count all cells, specify field facing, bound effects with the body and apply final opacity rules before finding empty gaps. Clean slices are not runtime approval.

### 2026-10-25 · Three Hellstar stills · final Eye framing
- **Reported problem:** the new final Eye sprite placed outer ribs too close to the left and right boundaries despite a requested transparent margin.
- **Original generation:** 1254 × 1254 RGBA; visible-art bounds at alpha > 127 were `[10,132,1246,1127]`. The first two stages were retained, with distinct connected silhouettes and recognisable Ainsel features.
- **Root cause:** generated framing did not follow the requested percentage safety margin.
- **Solution implemented:** a built-in image edit requested the complete creature within the central 78% of the image, preserving the spinal iris, three anchors and tiny face. Retained final-form bounds are `[56,184,1206,1097]`; output is `assets/bosses/hellstar-stage-3-listeners-eye.png`. The margin improved but did not match the requested 11% exactly. No code-based raster edits were made.
- **ChatGPT revision:** prompts, retained asset links and measurements are in [the three-stage generation record](../../../../docs/sprite-requests/hellstar-three-stages-2026-10-25.md).
- **Verification:** all three outputs are 1254-square RGBA with true transparent pixels. Inspected browser rendering against both light and dark backgrounds; visible anatomy is complete and the three forms read distinctly. Very faint alpha reaches some source edges, so these are source stills rather than trimmed atlas-ready parts. No battle integration or animation claim.
- **Rule for next time:** inspect actual alpha and rendered contours separately; do not assume an image-generation margin instruction was obeyed. Retain full anatomical source images and apply any deliberate viewport crop only during integration.

### 2026-10-25 · Tetsugi · party sheet generation
- **Reported problem:** Limit Break effects crossed a cell boundary; chant poses disagreed on facing.
- **Original generation:** the generic clear-space instruction allowed trails near neighbouring cells, and the generic chant descriptions did not repeat the left-facing requirement.
- **Root cause:** unsuitable sheet art and underspecified pose margins.
- **Solution implemented:** regenerated with wider internal margins, shorter effects and explicit left-facing chants. Updated `party_art.py` prompt wording. The final source is `docs/sprite-requests/tetsugi-sheet-2026-10-25.source.png`; all 54 frames slice without warnings.
- **ChatGPT revision:** two edits returned RGBA images with residual slicing warnings. A fresh generation from the original portrait produced the retained sheet. All 12 portraits sliced cleanly on the first attempt.
- **Rule for next time:** inspect actual alpha, require internal margins around effects, and distinguish clean slicing from runtime proof. Grounding offsets and the sprite KO eye detail remain review items; no battle assets were replaced.

### 2026-10-25 · Hellstar combined battle sprite
- **Reported problem:** the final boss lacked scale and appeared as three separate sprites.
- **Original generation:** arena formation placed Ainsel, the Hellstar and its Tongue in three equal rows, each with its own image or rig.
- **Root cause:** presentation assumed one sprite per combatant; the Tongue reference also included a fragment of the Hellstar's mouth.
- **Solution implemented:** generated one connected transparent sprite with Ainsel fused into the left surface and a continuous tongue. The final encounter renders one canvas, with three independent numbered buttons mapped to existing enemy IDs. Region masks dim defeated parts; regrowth redraws living art. One subtle eight-second idle breath respects reduced motion. Existing individual rigs remain unchanged.
- **ChatGPT revision:** built-in generation used all three embedded portraits as identity/style references. Prompt and output are recorded in [the generation record](../../../../docs/sprite-requests/hellstar-combined-2026-10-25.md). Output is 1254 × 1254 RGBA with 544,348 fully transparent pixels, rather than the requested 1536 square. It is assembled artwork, not a packed atlas or a new bone rig.
- **Verification:** browser inspection at 1440, 768, 390 and 320px across three formations; one canvas, three unobstructed 44px-minimum targets, separate damage/status state, defeat/regrowth and reduced motion. Party details remain outside the artwork.
- **Rule for next time:** separate shared artwork from combat state. Mirror hit regions with the image and test each region after death and regrowth; never infer shared HP from a shared sprite.

### 2026-10-25 · Rig authoring, validation and coordinate migration
- **Reported problem:** implement six improvements: strict rig validation, setup editing, clip timing choices, optional limb targets, sheet metadata and rendered regression checks.
- **Original generation:** unresolved parent chains were discarded by sorting; a pose Proxy created unknown bone names silently. Dragging only changed temporary rotation. All clips shared 120/220 ms edge envelopes and a 160 ms interruption blend, with outgoing FX discarded. Sheet trimming printed coordinate warnings without preserving metadata.
- **Root cause:** tooling allowed invalid definitions to look successful and left setup coordinates and visual continuity difficult to inspect.
- **Solution implemented:** validate before sorting and throw named pose errors; setup pivot/attachment/rotation editing with child/world preservation, per-creature undo/redo and patch round trips; optional timing, marker, held-track and discrete-swap metadata; deterministic two-bone targets with adjustable influence and bend direction. Interruption captures now retain outgoing FX and fade them using the incoming clip's policy. Sheet packing writes source/scale/trim metadata and migrate emits a review-only coordinate proposal.
- **Additional correction:** a revised-parts test found that lossless WebP encoding alone could change RGB under zero alpha. Added `exact=True`; retained parts now compare byte-for-byte in decoded RGBA. No existing sprite sheet was rewritten.
- **Verification:** numerical authoring tests run in viewer and battle; Chromium editor checks cover pivot/target dragging, undo/redo, export/import, held clips, invalid-input recovery and pixel-identical interruption starts. Six extreme-pose references were rendered and inspected. All-clip overflow scanning includes FX and warp bounds. Existing 16 attachment and 10 FX-framing warnings remain review findings.
- **Rule for next time:** fail malformed definitions before deriving rigs; preserve child placement when moving pivots; keep visibility swaps discrete; test outgoing FX as rendered pixels. Coordinate migration requires art correspondence, and visual references require inspection before acceptance.

### 2026-10-25 · Platform routing and Kiri source sheet
- **Reported problem:** ChatGPT sessions were producing image handoff prompts instead of rendering player-character sheets.
- **Original generation:** the skill said "Sprite sheet art is generated in ChatGPT, not here" and always asked the user to copy a prompt elsewhere.
- **Root cause:** workflow assumed Claude from the skill's directory rather than identifying the running platform; player-sheet guidance was missing.
- **Solution implemented:** AGENTS.md and the shared skill now route ChatGPT/OpenAI Codex to direct image generation and Claude to one copy-paste prompt. CLAUDE.md already imports AGENTS.md. Added player references/output conventions and an explicit unavailable-tool fallback. Preserved the creature integration workflow and existing animation corrections.
- **ChatGPT revision:** generated Kiri from the embedded portrait/sprite, then removed fused torso sleeves and corrected the arm and leg segmentation. A broad arm correction inadvertently produced complete legs and a stray hand in the leg row; a second prompt named that exact row and required two thighs plus two lower legs. Full prompts and review are in [the generation record](../../../../docs/sprite-requests/kiri-2026-10-25.md).
- **Verification:** inspected the rendered sheet and measured 1536 × 1024 RGBA with 943,598 fully transparent pixels. Maximum alpha is 254; source art still needs edge, scale and joint-fit checks when integrated. No atlas, animation or runtime claim.
- **Rule for next time:** determine platform from session identity/tools; render on ChatGPT. Name each limb segment by its two joints and inspect all parts after a correction, because edits can change unrelated anatomy.

### 2026-10-25 · Shared playback and creature fitting
- **Reported problem:** improve animation quality and reliable fluid playback across the viewer and battle.
- **Original generation:** actions and idle both restarted at zero; clip time discarded visible frame time above 50 ms while hit reactions used wall time. Ghosts wrapped backwards into a future action frame. Framing sampled idle only. Battle smoothing switched at `k * dpr = 1.5` and the viewer defaulted to Crisp.
- **Root cause:** clip transitions, loop seams, inconsistent clocks, idle-only framing and expensive per-strip drawing. Ostrel smoke used a modulo sawtooth and jumped every two seconds. Puppeteers bodyB had pivot `[90,150]` outside its 192×146 sprite. The Whisperer's independently fitted sleeves left the elbow visibly disconnected.
- **Solution implemented:** shared continuous-idle/action sampling, 160 ms interruption blend, 120/220 ms action edge envelopes, cached position/velocity seam correction and whole-cycle warps. Visible frames up to 250 ms retain elapsed time; suspension pauses visual clocks. Ghost history is clamped to the action's past. Bounds sample all body clips. Smoothing is consistent and isolated part canvases have two-pixel padding. Sheets are decoded and parts prewarmed before battle; low detail reduces decorative cost without changing bone poses or duration. bodyB now uses pivot `[90,140]` and attachment `[140,269]`, preserving its rest placement. Whisperer upper-arm fit changed from `[212,212,32,0.66,false]` to `[224,199,16,0.86,false]`; forearm fit from `[286,190,-55,0.62,false]` to `[282,205,0,0.86,false]`, with elbow pivot `[36,108]` replacing `[90,120]`. Ostrel smoke uses a two-second sine drift. Undertow overshoots to 1.12 with a 90 ms tail/fin lag; hair and ancestors settle after impact; Offbeat retains a brief 60 ms snap.
- **Verification:** Node checks sample all 22 rigs / 88 clips, including six shared battle rigs, loop derivatives, action boundaries and interrupted transitions. Chromium checks render all clips and exercise controls, missing-sheet fallback, reduced motion, suspension and a six-rig CPU-throttled profile. `snap.js` supports seam, extrema and continuous-idle sequence captures. Attachment-box warnings remain visual review prompts; they do not establish a missing painted joint. Performance results are machine-specific.
- **Rule for next time:** keep preview and battle sampling in parity, compare seam velocity as well as pose, and test transitions at a nonzero idle phase. Do not use still samples as proof of frame pacing. Preserve intentional discontinuities inside horror clips; correct accidental wrap and transition discontinuities.
