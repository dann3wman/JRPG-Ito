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

_No corrections logged yet. Replace this line with the first entry. Later entries go above earlier ones._
