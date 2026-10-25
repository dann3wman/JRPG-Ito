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
