# JRPG-Ito

**Humming Crystal Battle**: a turn-based JRPG battle prototype laid out like a manga page, in a single HTML file. It prototypes the CTB battle system from *Final Fantasy: The Humming Crystal*; see the [design doc](docs/design-doc.md).

## Running

Open `index.html` in a browser. There is no build step. Portrait art is embedded in the page as data URIs; the only external resource is Google Fonts.

## Layout

- `index.html`: the game (markup, styles, script, and embedded art).
- `docs/design-doc.md`: the full design doc (story, cast, battle and Stress systems, bosses, Sphere Grid, side content, endings).
- `tools/`: the dev tool suite. See [`tools/README.md`](tools/README.md).
  - `tools/bestiary-rig-viewer/`: creature rig and animation previewer, plus the creature sprite sheets (`<creature>.webp`) and arena backdrops (`bg_*.webp`).
- `.claude/skills/sprite-animation/`: the Claude skill for building and correcting creature animations and sprite sheets. It keeps a log of past corrections and the ChatGPT prompt template for new sheets.
