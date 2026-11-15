# The Tongue: phase-aware Grab warning

B002, 2026-11-15. Source default head: `5fbc8b8c6e3366196eda437e0296ef1ff3ec71bf`. Branch: `bestiary/2026-11-15-tongue-grab-count`.

The current queue is generation 1, revision 4. PR22 is merged; its prior visual check is still unverified. Open PRs 14–21 and 23–25 cover party art/specification/animation work and do not duplicate B002. No unrelated unmerged code was imported.

## Result

The next-action text previously always said “whoever has the most Stress”, including when Grab would take two allies. Grab now supplies a phase-aware late-target description: “up to 1 ally with the most Stress when it acts” or “up to 2 allies with the most Stress when it acts”. It uses the phase the engine will evaluate at the next turn, so crossing half HP updates the warning immediately. “Up to” describes the cap even when fewer allies remain available. It never locks in names early.

The shared formatter accepts this optional description and retains its existing fallback for every other late-target skill. No targeting, damage, probabilities, delays or phase rules changed. This follows FFX's readable CTB precedent: explain the imminent threat while the player can still respond.

## Validation

The new regression fails on original code and passes after repair. Seven live-script cases cover above/exactly/below half HP, pending phase transition, Stress changes after preview, ignored Provoke, stable equal-Stress ties and zero through three available allies. Additional assertions cover unchanged Savour, Sleep, absent plans and Undertow fallback. Preview evaluation must neither mutate state nor consume RNG. Execution checks confirm the advertised target cap and late selection. All four existing rescue regression cases pass.

Browser launch was attempted using installed Chromium and failed before page creation with `socket() failed: Operation not permitted`. Actual layout, narrow-screen readability and visual acceptance remain outstanding; deliver as a draft. No art or animation change is claimed.

## Lesson

For an action whose target count changes at an HP threshold, derive the warning from the phase that will execute, not just the cached phase from the previous turn. Preserve late selection and communicate a cap rather than promising more targets than are available.

## Next

Seven actionable pending tasks remain. B003 is next: measure and shorten Tide-Widow's overlong fight while preserving its Stress lesson. B010 and B011 remain blocked by design/engine dependencies. B009 remains separate: swallow-turn replanning is not changed here.

Repository validation: `tools/check.sh` passed, including data integrity, generated reference freshness, both Tongue regressions, 22-rig/88-clip continuity and six-rig battle parity, authoring checks and five battles per each of 37 encounters. The two existing design drift warnings and attachment-review notices remain. `git diff --check` passed. No balance retuning or baseline regeneration was needed for this display-only change.
