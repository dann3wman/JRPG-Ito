# Dev tools

Tools for building and checking game content. None needs a build step or a package install.

## Browser tools

Open the [developer tool launcher](index.html) to choose a tool, launch the battle prototype or browse the development reference. Each tool has a **Developer tools** link back to the launcher. You can also open any tool's `index.html` directly; no server is required.

| Tool | What it does |
| --- | --- |
| [`bestiary-rig-viewer/`](bestiary-rig-viewer/) | Previews 25 creature/form rigs, including Hellstar I–III, with shared playback, arenas, skeletons, joint dragging and rig authoring. The Hellstar forms use weighted skin and support PNG/JSON export. See [rigging guide](../docs/guides/hellstar-rigging.md). |
| [`party-sprite-viewer/`](party-sprite-viewer/) | Plays each party member's standard sprite sheet animations (with the derived Stone, Vanish, Mini and hit-flash looks) and shows their 12 state portraits. Open with `?who=<id>`. |
| [`ctb-planner/`](ctb-planner/) | Plans a fight's tempo: combatants with Speeds and cycles of Delays, pushes and pulls, Danger and Lost Turns, predicted with the battle's own turn-order rules. The URL holds the plan, so it can be linked from a boss spec. |

Each tool loads its assets by relative path, so keep the tool's files together in its folder.

## Command-line tools

Node 18 or later. They load `index.html` headlessly through [`lib/load-game.js`](lib/load-game.js), which runs the page's own scripts in a Node `vm` with a stub DOM, so they always test the real game code and never a copy of it.

| Tool | What it does |
| --- | --- |
| [`check.sh`](check.sh) | Runs the three checks below in CI order. `--full` adds a 100-run balance comparison. |
| [`data-check/check.js`](data-check/check.js) | **Integrity** (errors): every reference between ROSTER, SKILLS, FOES, SCRIPTS, ENCOUNTERS, the rigs and the CTB planner resolves; rule labels are unique; every phase has a fallback rule; every relative link in the repo's Markdown resolves. **Drift** (warnings): pinned numbers in the design doc against the code (Stress values, thresholds, skill Delays, roles, Limit Break names). |
| [`battle-sim/sim.js`](battle-sim/sim.js) | Plays the real battle loop hundreds of times per encounter under a policy (`advisor` = the in-game Helper, `no-role`, `attack`, `random`) and reports win rate, length, KOs, Stress Checks, flees and Lost Turns. `--baseline` shows each encounter's change from [`battle-sim/baseline.json`](battle-sim/baseline.json). |
| [`data-export/export.js`](data-export/export.js) | Generates [`docs/reference/game-data.md`](../docs/reference/game-data.md) from the code and the baseline. `--check` fails if it is stale. |
| [`animation-check/check.js`](animation-check/check.js) | Samples all rigs for loop/action continuity, valid pivots/transforms, timing and viewer/battle parity. Included in `check.sh`. |
| [`animation-check/browser.js`](animation-check/browser.js) | Chromium playback, reduced-motion, load-failure and throttled rendering checks. Requires Playwright; writes ignored review artifacts under `output/playwright/`. |
| [`animation-check/authoring.js`](animation-check/authoring.js) | Strict rig validation, pivot preservation, optional IK, held tracks, swaps and interrupted FX tests in both runtimes. Included in `check.sh`. |
| [`animation-check/hellstar.js`](animation-check/hellstar.js) | Hellstar weights, rest placement, loop velocity, action recovery, framing and triangle winding checks. Included in `check.sh`. |
| [`animation-check/hellstar-browser.js`](animation-check/hellstar-browser.js) | Checks native Hellstar entries in the Bestiary Rig Viewer through local-file playback, pixel motion, joint dragging, Setup edits, patch round trips and mobile layouts; uses a temporary HTTP server for PNG exports. Requires Playwright. |
| [`animation-check/editor-browser.js`](animation-check/editor-browser.js) | Chromium setup editing, undo/redo, patch round trips, clip controls, responsive layout and rendered interruption checks. |
| [`animation-check/visual.js`](animation-check/visual.js) | Six extreme-pose image comparisons and all-clip effect/warp overflow review. `--accept` updates references after inspection. Requires Playwright. |
| [`animation-check/sheet_test.py`](animation-check/sheet_test.py) | Sheet metadata, trim/scale proposals and pixel-exact retained-part tests. Requires Pillow and NumPy. |
| [`rig-data/export.js`](rig-data/export.js) | Exports resolved bone definitions and optional metadata for one creature; used by `sheet.py migrate`. |

The rig viewer's **Rig authoring** panel edits setup geometry, clip metadata and optional limb targets. Export patches before closing the tab. See the [sprite authoring guide](../docs/guides/sprite-playback.md#rig-authoring) for patch application and sheet migration.

```sh
node tools/battle-sim/sim.js orlen -n 300                   # one encounter, the Helper playing
node tools/battle-sim/sim.js t_goku --policy no-role        # does Goku's test need Goku?
node tools/battle-sim/sim.js widow --party kiri,tetsugi,kugai
node tools/battle-sim/sim.js --baseline                     # what did my change do to every fight?
node tools/battle-sim/sim.js -n 200 --write-baseline        # accept the new numbers
```

## Skills

Creature animations and player/creature sprite sheets use the shared `sprite-animation` skill in [`.claude/skills/sprite-animation/`](../.claude/skills/sprite-animation/SKILL.md). It renders images directly in ChatGPT/OpenAI Codex and supplies copy-paste prompts in Claude. It holds the rig and clip reference, corrections log, image specification template, and scripts to slice and pack creature sheets (`sheet.py`) and snapshot clips (`snap.js`). New player source sheets live under `assets/player-sheets/` until separately packed and fitted.

Party sprite sheets and portraits follow a fixed standard set by the `party-art` Claude skill in [`.claude/skills/party-art/`](../.claude/skills/party-art/SKILL.md). Its `party_art.py` writes the ChatGPT requests and slices, installs and embeds the results. `party-sprite-viewer/manifest.js` is generated by it; don't edit it by hand.

Bosses and encounters are designed, built and tuned with the `boss-design` skill in [`.claude/skills/boss-design/`](../.claude/skills/boss-design/SKILL.md), which drives the [boss authoring guide](../docs/guides/boss-authoring.md) and these command-line tools.
