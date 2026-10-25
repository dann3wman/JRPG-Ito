# Boss authoring guide

How a boss goes from a line in the [design doc](../design-doc.md) to a playable, tested encounter in `index.html`. Each boss is two things at once, per [AGENTS.md](../../AGENTS.md): a JRPG fight that teaches a mechanic, and an Ito story that escalates and ends on a reveal. This guide covers both, then the code. Agents should use the [`boss-design` skill](../../.claude/skills/boss-design/SKILL.md), which drives this guide step by step.

## 1. Design the fight on paper

Copy [`docs/templates/boss-spec.md`](../templates/boss-spec.md) to `docs/bosses/<key>.md` and fill it in before writing code. The spec answers four questions.

**What does it teach?** One mechanic, named in a sentence the Scan hint could use: "Give her no one to stand behind." Chapter bosses are puzzles that need at least two party members working together (design doc, *Boss mechanics*). Write down the intended answer, then write down the obvious answer that should fail and why.

**How does the story unfold?** Map the fight onto Ito's four beats:

| Beat | In the fight | Orlen and the Great Organ |
| --- | --- | --- |
| The ordinary detail | Phase 1's first turns: a telegraph that looks harmless | A sermon; an organ drone |
| Repetition | The rule repeats until the player learns to read it | Overdrive fills from the party's own Stress; every 5th Organ turn is Chord |
| The page turn | The phase change at 50% HP: the same rule, turned on the player | The ancestors wake: Sermon +30 |
| The cost | What winning takes, or the last image | The Organ rebuilt from the man inside it (*The Human Chair*) |

**Is it fair?** Run the [fair horror](../style-guide.md#fair-horror) checks. The player must be able to see the plan, the target and the Stress cost before choosing. The first phase must teach the trick before the second punishes it.

**How hard, by disc?** Follow the disc table in the design doc (Scan detail, number of HP phases, status-effect rate, whether it punishes the obvious strategy). Rematches add the listed extra mechanics on top of +50% stats.

## 2. Plan the tempo

If the fight is about turn order (most are), lay it out in the [CTB planner](../../tools/ctb-planner/index.html) first: party Speeds, the boss's Speed and rank cycle, Delay Shots and Quick Songs, and the Danger range. Paste the planner link into the spec. Check that the intended answer *fits*: does Ren's Delay Shot land before the Helmsman's turn at these Speeds? Does a Lost Turn fall inside the window at the boss's Danger?

## 3. Build it

All of this goes in `index.html`. The [game data reference](../reference/game-data.md) shows every existing script in readable form; copy the nearest one.

### `FOES[key]`

```js
widow: { name:'Tide-Widow', hp:3200, atk:105, def:7, mdef:6, agi:11, art:'widow', ai:'script' },
sailor:{ name:'Drowned Sailor', hp:390, atk:45, def:4, mdef:4, agi:9, art:'sailor', ai:'script', parentKey:'widow' },
```

`crit` (default 0.1) sets its crit chance for skills that roll `e.crit`. A part names its boss in `parentKey`. `art` keys `ENEMY_ART` (the static image) and `ART_RIG` (the animated rig, if there is one).

### `SCRIPTS[key]`

| Field | What it does |
| --- | --- |
| `rules` | The priority list. The first rule that holds picks the next action. **Labels must be unique** (plans are matched by label), and the last rule of each phase must be unconditional |
| `skills` | The enemy's moves (below) |
| `phases` | `[{id:'p1', label}, {id:'p2', label, when:e=>…, enter:'skillKey', free, enterFn}]`. `enter` runs a skill on entry and uses the turn unless `free`; `enterFn` changes state silently |
| `parts` | `[{key, respawn, respawnP2, hpPct, label}]`: body parts that re-form after `respawn` of the boss's turns, and collapse when it dies |
| `interrupts` | Rules checked at execution time that override the plan. Rarely needed: prefer `react` |
| `onTurn` | Passive run at the start of each of its turns (`e=>addHum(6)`) |
| `status` | One-line live state for the info panel, e.g. ``e=>`DEF ${e.def}` `` |
| `notes` | Extra lines for the info panel; say what the rules can't |
| `overdrive` | `true` to fill `e.od` from party Stress (0.6 per point) |

Hooks for fights that bend the usual rules. Each is optional; the Disc 1 chapter bosses show each one in use.

| Hook | What it does | Used by |
| --- | --- | --- |
| `init(e, i)` | Sets up state at battle start, before the turn order (`i` is its place in the encounter's foe list) | Well-Rested (picks the original), Your Own Tracks (copies the party) |
| `targetable(e)` + `hidden(e)` | While `targetable` is false the party can't target or hit it, and the card shows ``Can't be targeted: ${hidden(e)}``. Area attacks and landings skip it too | Lake Hen, Helmsman, a Track in the air |
| `landProof` | `true`: Miren's landing never hits it, even when it can be targeted | Lake Hen |
| `onDamage(e, d, src)` | Runs before damage lands. Return the damage to deal (0 refuses it, and the hook logs why). `src` has `attacker`, `magic`, `key` (the party skill, or `'limit'`) and `area` | Pelt, Lamp Hollow, Wick, Well-Rested, Dead Wolf, Grey Hound, Tracks |
| `onPush(e, slots)` | Runs when anything tries to push it, even if Break recovery resists | The Hull (off course) |
| `onDown(e)` | Runs when it is defeated | Wick (the dark), Rewound Wolf, Well-Rested original |
| `onPartyAct(e, u, act, target)` | Runs after every party command | Well-Rested (Lullaby puts copies to sleep) |
| `onLand(e, u)` | Runs when an airborne ally lands | Lake Hen (the splash) |
| `holds(e, u)` + `holdText(e, u)` | While `holds` is true, that ally's turns are spent, with `holdText` in the log | Pelt (Goku on the leash) |
| `afterTurn(e)` | Runs after its action, before it plans the next. Use it for "for N of its turns" counters | Pelt hold, Lamp Hollow dark |
| `hpOf(e)` | `{hp, max, text}` to show instead of its own HP | Well-Rested (the original's HP on every body), Dead Wolf, Grey Hound |
| `planName(e)`, `planText(e)` | Override what the turn order and the card call its next action, when the action is decided live | Your Own Tracks |
| `guestTurn(e, u)` | Drives the encounter's guest (below) on the guest's turns | Grey Hound |

A sleeping foe (`e.sleep > 0`) skips its turns and the turn order says so. A skill can set `rankOf(e)` to choose its Delay when it acts.

A **rule** is `{ label, phase?, when?(e, n), chance?, chanceText?, roll?, rollText?, skill?, target?, react? }`:

- `when(e, n)`: `n` is the turn number about to be planned (1-based), so `n % 5 === 0` is "every 5th turn".
- `chance` (a number or `e=>number`, in percent) skips the rule when the roll fails; `roll: [[weight, 'skill'], …]` picks one of several. Give either a `chanceText` or `rollText` whenever the odds change with state, so the info panel can say how.
- `react: true` re-checks the rule the moment the party acts. Use it for answers to counterplay (Counter-Melody up, Provoke up, Blink on the marked ally), so the enemy visibly changes its plan in the turn order instead of cheating at execution.
- `target` overrides the skill's default targeting for this rule.

A **skill** is `{ name, rank, tags, target, power, desc, run(e, t), sound?, late?, noProvoke?, odReset? }`:

- `rank` is its Delay. `tags` show in the info panel; use `Physical`, `Sound`, `Stress`, `Delay`, `Heal`, `Summon`, `Phase`, `Mark`, `Combined`, `Defeat`. A `Sound` tag needs `sound: true` as well.
- `target` is one of `random`, `lowest` (HP%), `fastest`, `biggest` (max HP), `stress` (closest to a Stress Check, who can hear), `brink` (closest to a Stress Check), `last` (acted last), `next` (acts next), `mark`, `unblinked`, `uncountered`, `fastestCold`, `summoner` (Goku), `mirror` (decided by the script), `all`, `none` or `foe`. A new type needs a case in `aiTarget`, a `TARGET_TEXT` line, and an entry in `SINGLE` if it picks one ally.
- `late: true` picks the target when it acts, which lets the player steer it with the turn order. It needs a `LATE_TEXT` entry.
- `run(e, t)` does the work, using the battle helpers: `hitParty(t, e.atk * k, {src: e, crit})`, `addStress(t, n, 'Name', {sound: true})`, `delayUnit(t, slots)`, `addHum(n)`, `spawnPart(e, key, ct)`, `log`. (`heal()` is for party members; to heal an enemy, change `hp` and call `fx`, as Benediction does.) State helpers: `foeOf(key)`, `parentOf(e)`, `hearers()`, `targetsForFoes()`, `nearBrink(ts, n)`, `toBrink(t)`, `markValid(e)`, `p2(e)`, `provokeUp()`, `unplugged()`.
- `power` and `desc` are what the info panel shows. They must agree with `run`.

### `ENCOUNTERS[key]`

```js
widow: { lv:8, group:'Story bosses', title:'Port of Vesk · Tide-Widow', foes:['widow'], hum:20, party:['kiri','natsu','tetsugi'],
  brief:'…threat as a rule. The answer. (Ito source)' },
```

`lv` sets party stat scaling, `hum` the starting Danger, `party` the default trio, and `inv` overrides the starting bag. `stats: { key: {hp, atk, …} }` restates a foe's stats for this encounter only, so one script serves a recurring boss at several levels (Ruri ×1 at level 7). `guest` names a character who fights beside the party under a foe script's `guestTurn`, starting at `guestStress`: never Swapped, never targeted, capped below a Stress Check. A role test sets `role` and `group:'Role tests'`. The brief follows the [style guide](../style-guide.md#encounter-briefs).

### Also

- `STORY[key]`: the Ito work it draws on.
- `ENEMY_ART[art]`: a static image. A rig is optional: build it with the [`sprite-animation` skill](../../.claude/skills/sprite-animation/SKILL.md), then add `ART_RIG` and, where skill and clip names differ, `SKILL_CLIP`.
- **The Helper.** Teach `advise()` (and `adviseFocus()` for target choice) the intended answer, keyed on `cfg.enc`. The simulator's `advisor` policy *is* the Helper, so a boss the Helper can't solve will read as impossibly hard.

## 4. Verify

```sh
node tools/data-check/check.js                          # references resolve, doc numbers agree
node tools/battle-sim/sim.js <key> -n 300               # how it plays for a competent player
node tools/battle-sim/sim.js <key> -n 300 --policy attack
node tools/battle-sim/sim.js <key> -n 300 --policy random
```

Then play it in the browser with the Helper on and off.

### Targets

Starting bands for the simulator, to be revised by playtesting. They encode the design doc's ramp: Disc 1 plays like a standard Final Fantasy, and later discs ask more.

| Fight | `advisor` win | `attack` win | `no-role` win | Party commands (won) | Afflicted per fight |
| --- | --- | --- | --- | --- | --- |
| Role test | ≥ 90% | ≤ 20% | ≤ 50% | 15–40 | 0–1 |
| Disc 1 boss | ≥ 90% | ≤ 25% | — | 25–60 | 0.5–2 |
| Disc 2 boss | 80–95% | ≤ 10% | — | 35–70 | 1–3 |
| Disc 3, rematch, optional | 60–85% | 0% | — | 40–90 | 2–4 |

- **`attack` is the "does it teach anything" line.** If pressing Attack wins, the fight has no puzzle.
- **`no-role` is the role-test line.** The tested character keeps playing but never uses a signature skill. If the win rate barely moves, the test doesn't need its role (Persona's weakness drills and Dragon Quest's metal slimes work because the wrong tool truly fails).
- **Afflicted per fight** is the horror dial. Zero means Stress is decoration in this fight. More than about 3 on Disc 1 means the player spends the fight managing breakdowns instead of learning the trick.
- **Length** keeps an endurance fight from becoming a slog. FF bosses on the first disc usually end within 5–10 minutes; at about 6 seconds per command, 60 commands is that ceiling.

Record the numbers in the spec and in the encounter's row in [implementation status](../implementation-status.md). Then refresh the baseline and the reference:

```sh
node tools/battle-sim/sim.js --write-baseline -n 200
node tools/data-export/export.js
```

## 5. Close the loop

- If the boss changed a documented rule, update the design doc in the same commit (AGENTS.md).
- Move the boss's row in [implementation status](../implementation-status.md).
- If you learned something that applies to the next boss, add it to the lessons in the [`boss-design` skill](../../.claude/skills/boss-design/SKILL.md).
