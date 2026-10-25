# ChatGPT sprite sheet request

Use this specification for new or revised player-character and creature sheets. Follow **Platform and image delivery** in [the skill](../SKILL.md): on ChatGPT/OpenAI Codex, send the filled specification directly to the image-generation tool and display the image; on Claude, give it to the user as one copy-paste block. Save the filled copy to `docs/sprite-requests/<character-or-creature>-<yyyy-mm-dd>.md`.

## How to fill it in

- **Pick the mode.**
  - **New player sheet:** use the canon character description and existing portrait/sprite references. Specify the assembled pose and all separate parts, or the exact full-frame layout if requested. No existing creature ATLAS is assumed.
  - **Revised parts only** (default): ChatGPT draws just the new or fixed parts, and `sheet.py pack --base <creature>` merges them into the existing sheet. Unchanged parts stay pixel-identical, so their rig fits survive.
  - **Full sheet**: use it only when the whole creature needs redrawing (a style change or a redesign). Every bone then needs re-fitting.
- **Write each revision concretely.** Give the part's atlas name, what is wrong with it now, exactly what to draw instead, and *why the rig needs it* (ChatGPT follows constraints better when it knows the purpose). For example: "upperArmL: the shoulder end is cut flat, so a gap opens when the arm rotates. Redraw it with a full rounded shoulder cap extending ~20 px past the joint."
- **Give sizes in the existing sheet's pixels.** Get them from `python3 .claude/skills/sprite-animation/scripts/sheet.py show <creature>` (each entry is [x, y, w, h]).
- **Check the corrections log** for prompt wording that failed before for this kind of part, and avoid it.
- Delete any `[…]` guidance that doesn't apply before handing the prompt over.

## Prompt template

**Claude only:** tell the user to paste the completed prompt into ChatGPT, attach the named reference images and return the generated PNG. For a creature revision, the current sheet is `tools/bestiary-rig-viewer/<creature>.webp`. **ChatGPT:** load the references and generate directly; omit handoff instructions.

````text
I'm attaching the current sprite sheet for "<Creature name>", a creature in a dark gothic-horror JRPG. It's a cut-out animation sheet: every body part is a separate sprite that a 2D bone rig rotates and moves, plus an "assembled" image of the whole creature in its rest pose and a few separate effect sprites.

About the creature: <one or two sentences of look and lore from RIGS.<creature>.lore>

Please generate a NEW sprite sheet image with these revisions:

<numbered list, one per part, e.g.
1. head (currently ~152×133 px): the jaw is painted shut into the head, so the mouth can't open. Draw the head WITHOUT the lower jaw, with the inside of the mouth visible behind where the jaw was.
2. jaw (NEW, ~90×50 px): the lower jaw as its own piece, closed rest pose, with the hinge end drawn fully rounded so it can rotate open by up to 30° without a gap.
3. scream (NEW effect, ~300×200 px): a burst of jagged sound rings coming from the mouth, pale red, on transparency, for a "Scream" attack.>

[Revised parts only mode:]
Draw ONLY the parts listed above. Do not redraw any other part from the attached sheet.

[Full sheet mode:]
Draw EVERY part from the attached sheet (same parts, same names), with the revisions above applied, plus a new "assembled" rest-pose image of the whole creature built from exactly these parts.

Hard requirements. The sheet is cut up by a script, so these matter:
- Match the attached sheet's art style exactly: the same detailed pixel-art rendering, outline weight, palette, lighting direction (top-left) and level of detail. It must look like the same artist drew it.
- Match its scale: a part drawn here must be the same size in pixels as the same part in the attached sheet. New parts should be in proportion to the existing ones.
- TRUE TRANSPARENT background (a PNG with an alpha channel). Do not paint a grey-and-white checkerboard to suggest transparency. If you can't produce real transparency, use a single flat <#00FF00 pure green> background with no gradient, shadow or texture, and make sure that colour appears nowhere in the creature.
- Every part is a separate island: leave at least 24 px of empty background between parts. No part may touch, overlap or cut off another.
- Each part is complete on its own, including the bits normally hidden by overlap. Joint ends are drawn rounded and extended past the joint so rotation never shows a gap.
- Draw each part in its rest-pose orientation, the same as it appears in the assembled image. Don't rotate parts to fit them on the sheet.
- No text, labels, numbers, guide lines, grids, borders, drop shadows or ground under parts.
- Return it as a downloadable PNG.
````

## After generation or a returned sheet

Inspect the image and verify its alpha channel; requesting transparency does not prove it was delivered. Save project images in the workspace. For requested creature integration, follow "New or revised sheet art", step 3, in [the skill](../SKILL.md): `detect`, name the parts, `pack`, `diff`, `install`, re-fit and snapshot every clip. New player source sheets are not automatically rigged or installed. Log corrections in `corrections-log.md`, including any ignored image requirement and the wording used to correct it.
