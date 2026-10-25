# Glossary

One name for each thing, and where it lives in the code. The prototype's code was written before some player-facing names settled, so several systems go by an older name internally. The left column is canon: use it in the design doc, the UI, battle log lines and commit messages. Use the code name only in code.

## Battle terms

| Canon term | Meaning | Code names |
| --- | --- | --- |
| **Danger** | 0–100 meter of how loud the world has become. Above 30 it brings Lost Turns; Spiral Cut grows with it | `G.hum`, `cfg.hum`, `addHum`, `ENCOUNTERS[k].hum` |
| **Stress** | 0–200 per character; carries between battles. 100 brings a Stress Check, 200 a flee | `u.stress`, `addStress`; the setup slider "starting Stress" is `cfg.dread` |
| **Stress Check** | The roll at 100 Stress: Afflicted or Inspired | `queue(id, 'check')`, `stressCheck` |
| **Afflicted** | Bad Stress Check result (Berserk, Zombie, Paralyze, Confuse, Slow) that sometimes overrides commands | `u.aff`, `AFFS`; chance `cfg.harm`, override chance `cfg.over`, `afflictionTurn` |
| **Inspired** | Good Stress Check result (Fearless, Disrupt, Rally, Focus, Reraise) | `u.insp`, `INSP` |
| **Flee** | Leaving the battle at 200 Stress, gone for the dungeon | `u.fled`, `fleeScene` |
| **Lost Turn** | An empty slot in the turn order: nobody acts and everyone gains Stress | `G.void`, `voidOn`, `voidInterval`, side `'void'` |
| **Turn order** | The strip of the next 16 turns | `forecast`, `renderBar`, `#bar` |
| **Delay** | How long a command takes to recover; higher means a later next turn | `SKILLS[k].delay`, `delayOf` |
| **Rank** | An enemy skill's Delay | `skill.rank`, `setDelay` |
| **Tick speed** | Ticks per point of Delay: `max(8, 30 − Speed)` | `tickOf` |
| **Speed** | The stat that sets tick speed | `agi` |
| **Slot** | 12 ticks. Pushes and pulls are measured in slots | `SLOT` |
| **Push back** | Delaying a unit by some slots; costs a party member 4 Stress per slot | `delayUnit` (party), `pushEnemy` (enemy) |
| **Break / Broken** | An enemy pushed back enough is Broken: pushed further and takes +50% damage | `e.brk`, `e.broken`, `e.breakImm` |
| **Swap** | Trade an active character for a reserve; the reserve takes the current turn | `swapIn`, `reserves()` |
| **Active / reserve** | The three fighting, and the rest watching | `G.active`, `reserves()` |
| **Airborne** | Miren after Jump: out of the turn order and untouchable until he lands | `u.airborne`, `land` |
| **Sound attack** | An enemy skill Counter-Melody cancels and Sayo and Kugai ignore | `skill.sound`, `soundAttack`, `soundImmune`, `G.melody` |
| **Limit Break** | Character super move; gauge fills from damage taken and Stress gained | `u.limit`, `u.lb`, `LIMIT`, `limit()` |
| **Overdrive** | An enemy's Limit, filled by the party's Stress | `e.od`, `SCRIPTS[k].overdrive` |
| **Mark** | The Hellstar's and Star Fragment's chosen target for Devour | `e.mark`, `markValid` |
| **Bloom** | Hisui's +10% damage stacks from crits taken (the flowers in her wounds) | `u.bloom` |
| **Plan** | An enemy's next action, chosen at the end of its turn and shown in the turn order | `e.plan`, `planNext`, `planText` |
| **Rule** | One line of an enemy's priority list | `SCRIPTS[k].rules` |
| **Reacts** | A rule re-checked when the party acts, so the enemy can answer a counter | `rule.react`, `reacting` |
| **Late target** | A skill that picks its target when it acts, not when it plans | `skill.late` |
| **Phase** | A boss state with its own rules, usually from 50% HP | `SCRIPTS[k].phases`, `e.phase` |
| **Part** | A body piece of a boss that re-forms after defeat (Sailors, Organ, Tongue), or that only collapses with it (Wicks, the Hull, Wet Chicks) | `SCRIPTS[k].parts` (`respawn: 0` never re-forms), `FOES[k].parentKey`, `spawnPart` |
| **Untargetable** | A foe the party can't target or hit for now: underwater, at the helm, in the air. The card says why | `SCRIPTS[k].targetable`, `hidden`, `reachable`, `foesHittable` |
| **Guest** | An ally who fights beside the party under their own AI: never Swapped, never targeted, no Stress Checks (Goku against the Grey Hound) | `ENCOUNTERS[k].guest`, `u.guest`, `SCRIPTS[k].guestTurn` |
| **Sleep** | Loses the next turn(s). On the party it lasts 1 turn and a hit wakes them; on enemies it counts their turns | `u.sleep`, `e.sleep` |
| **Encounter** | A playable fight in the prototype | `ENCOUNTERS` |
| **Role test** | A short fight built to teach one character's role | `ENCOUNTERS[k].role` |
| **Helper** | The in-game advisor that recommends a command and says why | `cfg.helper`, `advise`, `adviseFocus` |
| **Bestiary / info panel** | The enemy page showing its full script | `openInfo`, `scriptInfo` |
| **Rig** | A creature's bone skeleton and animation clips | `RIGS`, `ART_RIG`, `SKILL_CLIP`, `RigAnim` |

## Progression and world terms

These are in the design doc and not yet in the prototype.

| Canon term | Meaning |
| --- | --- |
| **Sphere Grid** | The spiral board characters grow on; there are no levels |
| **AP / S.Lv (Sphere Level)** | AP fills to grant S.Lv; each S.Lv moves one node |
| **Deep node** | Ring 7 nodes with a permanent cost |
| **Resolve** | Stat reducing Stress gained, 1% per point, up to 50% |
| **Save point / camping** | Saving costs +10 Stress; three saves in one area spawn a copy |
| **Pip's Comfort** | Pip takes on a character's Stress, permanently |
| **Disc** | The three story acts (The Hum, The Ear, The Star); boss rules harden by disc |
| **Rematch** | A Disc 3 refight of an earlier boss with +50% stats and extra mechanics |
| **Superboss** | One of the four fights larger than the screen |

## Story names

| Name | What it is |
| --- | --- |
| **Aurel** | The continent: four kingdoms, four Crystals |
| **The hum / the note** | The sound coming from the Crystals. Small "h": it is a sound, not the Danger meter |
| **The Ear** | The Fifth Crystal, under the sea west of Vesk |
| **The Great Spiral** | Ainsel's plan to wind the world into the Ear |
| **The Hellstar / the Listener** | Natsu's star, a living planet that has been listening for 400 years |
| **The Quiet** | The standard ending, and the postgame world |

## Words to avoid

| Avoid | Use | Why |
| --- | --- | --- |
| Hum (for the meter) | Danger | "The hum" is the sound in the story. The meter is what the sound does to you |
| Sanity, fear, panic | Stress | One meter, one word. "Stress" is plain enough to turn strange |
| Level (for characters) | S.Lv, or the encounter's level in the prototype | The game has no character levels |
| Dread, void, harm, over | Stress, Lost Turn, Afflicted, override chance | Internal names only |
| "Round", undefined | "between two of its turns" | CTB has no rounds. Several design-doc bosses (Hundred Listeners, Face Thief, Puppeteers, Last Note) need two characters to act "in the same round"; until that is defined, write the window in turns. See open questions in [implementation status](implementation-status.md) |
