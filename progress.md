Original prompt: In the battle prototype render a single arena with the player characters to the right side (except pincer, party on both sides, and ambush attacks, party starts on left with backs turned) and the enemy sprites on the left side.

- Scope: shared battle arena and visual formation selection; preserve combat rules and existing uncommitted animation work.
- Design: classic Final Fantasy side-view readability inside the existing manga panel language. Paper, ink and violet come from docs/style-guide.md. ENERGY 2 / RHYTHM 2 / MOTION 2: one arena focal point, separate readable status captions, existing creature animation only.
- Skills: develop-web-game, antislop, antislop-ui. Read sprite-animation guidance for integrating the existing rigs; no clip or sheet changes planned.
- Implemented one backdrop with existing enemy rigs/static sprites and active-party sprites. Enemy details and party status stay below it. Formation selection restarts the encounter; ambushed characters turn when they act. No balance or initiative changes.
- Browser checks passed: enemy info via Enter/Escape, attacks through arena enemy targets, items through arena ally targets, swap replacement, ambush facing after Defend, 144 combinations (16 encounters x 3 formations x 3 viewport widths: 1440, 390, 320), no page errors or horizontal overflow. Screenshots reviewed in output/arena.
- Project checks: data integrity 0 errors, 3 existing design drift warnings; animation checks passed (22 rigs, 88 clips); 5 simulations of every encounter reached a result. Generated reference had CRLF-only freshness drift; regenerated with the existing exporter, no content difference.
- Browser tooling: installed Playwright expected an absent Chromium version. Used the installed Chromium 1248 through an output/arena wrapper for the skill client. Used localhost for canvas captures because file URLs taint rig canvases.
- Final visual refinement verified: party rows no longer overlap on mobile; Tetsugi's name stays on one line. Repeated the skill client and all 144 layout combinations plus interaction checks, with no page errors. Final desktop and mobile screenshots reviewed.
- No commits or publication. Preserve unrelated edits in animation scripts, viewer, loader, checks and ignore rules; these were already changing independently during this work.

Delivery audit (changed arena and formation controls only):
- Hard gate PASS: 320/390/1440px bounds and overflow assertions, real select controls and target buttons, Enter/Escape enemy inspection, no page errors. Existing paper/ink and paper/violet text colors retained.
- Purpose gate PASS: existing encounter backdrops establish location; transparent sprites share the arena; panels below preserve readable intentions. No new decorative effects or typefaces.
- Liveliness PASS: one arena focal point, manga borders and violet acting labels; existing creature animations retained. ENERGY 2 / RHYTHM 2 / MOTION 2 preserved.
- Craftsmanship PASS: attack and item targets, swapping and ambush turns exercised in browser; all encounter/formation/viewport bounds passed. Combat data unchanged; unrelated project drift and art-review notes remain outside this task.
- Remaining task TODOs: none. No claim of resolving unrelated design drift or creature-art review notes.
