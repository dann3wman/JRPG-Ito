# Dev tools

Standalone browser tools for building and checking game content. Each tool lives in its own folder; open its `index.html` directly, with no build step.

| Tool | What it does |
| --- | --- |
| [`bestiary-rig-viewer/`](bestiary-rig-viewer/) | Previews the 22 bestiary creatures as bone rigs on their sprite sheets, with arena backdrops, animation clips, and a skeleton overlay. |

Each tool loads its assets by relative path, so keep the tool's files together in its folder.

Creature animations and sprite sheets are built and corrected with the `sprite-animation` Claude skill in [`.claude/skills/sprite-animation/`](../.claude/skills/sprite-animation/SKILL.md). It holds the rig and clip reference, a corrections log of past fixes, the ChatGPT prompt template for new sprite sheets, and scripts to slice and pack sheets (`sheet.py`) and snapshot clips (`snap.js`).
