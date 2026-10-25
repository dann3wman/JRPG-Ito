# Docs

Everything written about *Final Fantasy: The Humming Crystal* and its battle prototype, and the workflow for changing either.

## What to read

| Document | Read it when | Kind |
| --- | --- | --- |
| [Design doc](design-doc.md) | Always first. Story, cast, systems, every boss: what the game should be | Target |
| [Style guide](style-guide.md) | Writing any player-facing text, designing a fight or system, styling a page | Rules |
| [Glossary](glossary.md) | Naming anything; reading code that says `hum`, `void` or `dread` | Reference |
| [Battle math](systems/battle-math.md) | Changing a number, or predicting what a change will do | How the prototype works |
| [Game data reference](reference/game-data.md) | Looking up a stat, skill or enemy script | Generated from the code |
| [Implementation status](implementation-status.md) | Planning work; checking whether something is built; open decisions | Tracker |
| [Boss authoring guide](guides/boss-authoring.md) | Building or tuning a boss or encounter | How-to |
| [Boss spec template](templates/boss-spec.md) | Starting a new boss (copy it to `bosses/<key>.md`) | Template |
| [Boss specs](bosses/) | Looking up how a built boss was meant to play | Per-boss |
| `sprite-requests/` | Sprite sheet requests sent to ChatGPT (written by the `sprite-animation` skill) | Records |

The design doc is the source of truth for intent; `index.html` is the source of truth for what exists. Everything else here either explains one of them or tracks the gap between them.

## Making a change

1. **Read** the design doc section, the style guide's horror rules, and the row in implementation status for the system you're touching.
2. **Design** as a designer (see [AGENTS.md](../AGENTS.md)): name the precedent and the effect on the player. For a fight, write a spec from the template. For a turn-order puzzle, lay it out in `tools/ctb-planner/`.
3. **Build** in `index.html` (single file, no build step). Use the `boss-design` skill for encounters and the `sprite-animation` skill for rigs.
4. **Check**:
   ```sh
   tools/check.sh             # data check, reference freshness, simulator smoke run (CI runs this)
   tools/check.sh --full      # plus a 100-run balance comparison against the baseline
   ```
5. **Measure** any change that can move balance: `node tools/battle-sim/sim.js --baseline` shows each encounter's change from the stored baseline. When the change is intended, store the new numbers with `node tools/battle-sim/sim.js -n 200 --write-baseline`.
6. **Regenerate** the reference with `node tools/data-export/export.js` (CI fails if it is stale).
7. **Keep the docs in step**, in the same commit: the design doc if a documented rule changed, implementation status if a row moved, battle math if a formula changed, the glossary if a term was added.

## Drift

`node tools/data-check/check.js` compares numbers the design doc states with the numbers the code uses (Stress values, thresholds, skill Delays, role and Limit Break names) and reports each disagreement as a warning. A warning is a decision, not a bug: either the doc or the code is right, and the other one moves. Undecided cases go in implementation status under open questions. When you implement a new documented number, add a pinned pair to `DOC_RULES` in the checker so it stays in step.
