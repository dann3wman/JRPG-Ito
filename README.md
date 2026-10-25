# JRPG-Ito

**Humming Crystal Battle**: a turn-based JRPG battle prototype laid out like a manga page, in a single HTML file. It prototypes the CTB battle system from *Final Fantasy: The Humming Crystal*; see the [design doc](docs/design-doc.md).

## Running

Open [`tools/index.html`](tools/index.html) for the developer tool launcher, with links to the rig viewer, party sprite viewer, CTB planner, battle prototype and development reference.

Open `index.html` in a browser. There is no build step. Portrait art is embedded in the page as data URIs. Animated enemies load their sprite sheets from `tools/bestiary-rig-viewer/` (one copy shared with the rig viewer) and fall back to static art if a sheet is missing. The only external resource is Google Fonts.

## Checking a change

The command-line tools need Node 18 or later and nothing else.

```sh
tools/check.sh          # data integrity, design-doc drift, generated reference, simulator smoke run
```

CI runs the same script on every push and pull request. [`docs/README.md`](docs/README.md) has the full workflow.

## Layout

- `index.html`: the game (markup, styles, script, and embedded art).
- `docs/`: design and development docs. See [`docs/README.md`](docs/README.md).
  - `docs/design-doc.md`: the full design doc (story, cast, battle and Stress systems, bosses, Sphere Grid, side content, endings).
  - `docs/style-guide.md`, `docs/glossary.md`: the horror rules, house voice, visual language, and canon names.
  - `docs/systems/battle-math.md`: the prototype's formulas. `docs/reference/game-data.md`: every number it uses (generated).
  - `docs/implementation-status.md`: what is built, where code and doc disagree, balance findings, open decisions.
  - `docs/guides/`, `docs/templates/`, `docs/bosses/`: how to build a boss, the spec template, and per-boss specs.
- `tools/`: the dev tool suite. See [`tools/README.md`](tools/README.md).
  - `tools/bestiary-rig-viewer/`: creature rig and animation previewer, plus the creature sprite sheets (`<creature>.webp`) and arena backdrops (`bg_*.webp`).
  - `tools/party-sprite-viewer/`: party sprite sheet and state portrait previewer, plus the installed sheets (`<id>.sheet.webp`, `<id>.portraits.webp`).
  - `tools/ctb-planner/`: turn-order design tool for tempo puzzles.
  - `tools/battle-sim/`, `tools/data-check/`, `tools/data-export/`: command-line balance simulator, data and drift checker, and reference generator.
- `docs/sprite-requests/`: every ChatGPT art request as sent, with the original image ChatGPT returned.
- `.claude/skills/`: Claude skills. `sprite-animation` builds and corrects creature animations and sprite sheets; `party-art` sets the standard party art set (54-frame sprite sheet, 12 state portraits), writes the ChatGPT requests, and slices, installs and embeds the results; `boss-design` designs, builds and tunes encounters. Each keeps a log of lessons from past corrections.
