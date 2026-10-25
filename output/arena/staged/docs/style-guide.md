# Style guide

How *The Humming Crystal* sounds and looks: the horror rules every system, fight and line of text answers to, the house voice for player-facing text, and the visual language of the battle page. The [design doc](design-doc.md) says what happens; this says how it should feel. Terms follow the [glossary](glossary.md).

## The horror rules

These are the design doc's premise turned into checks. A new system, boss, item or line should pass all six.

1. **The comfort is the threat.** Horror arrives through things the player already trusts: the inn, the save point, Phoenix Down, the level-up fanfare. Find the familiar JRPG beat first, then make it cost something. *Check: which comfort does this turn strange?*
2. **The system carries the dread, not the flavour text.** Kiri's grey-out, Tetsugi's revive count and the save-point copies work because they are mechanics. If deleting the description leaves nothing frightening, the mechanic isn't doing the work. *Check: would it still be unsettling with no text at all?*
3. **Repeat until it's wrong, then show it once.** Ito's slow build: a detail recurs (a spiral in smoke, a hum in sleep, a second Miren) until the player is uneasy, and the payoff is one full-page reveal. In a fight that reveal is the phase change; in the story it is a chapter's last scene. Keep reveals rare enough to land. *Check: what repeats, and where is the single page turn?*
4. **Never explain.** No lore dump says why the Crystals hum or what the Hellstar wants. Characters guess, and they are often wrong. Mechanics are explained exactly; the fiction is not. *Check: does any line answer a question the player should be left holding?*
5. **Victories cost a body part or a mind.** Nothing is won clean. A boss ends on a cost or a reveal, not a fanfare. *Check: what does winning take?*
6. **Precise, almost beautiful.** Body horror is drawn and described with clean lines and exact detail, never gore for its own sake. The flower in Hisui's wound has eyes; it isn't bleeding everywhere. *Check: is it specific and quiet, or loud and vague?*

### Fair horror

The fiction can be unreliable. The rules can't. This is the line between dread and frustration, and the battle UI holds it:

- The player can always read the turn order, each enemy's next action and target, and the Stress cost of a choice before making it. Enemy plans are rolled when they are planned, so what the turn order shows is what happens.
- Scan (the info panel) shows an enemy's whole script on Disc 1 and a hint later, never a lie. When a superboss hides its script, the hiding is the mechanic and the game says so.
- A boss's trick is taught in its first phase before it is punished in its second.
- Randomness sets odds the player can see (Afflicted 75%, a 30% Stop). It never decides a fight on one hidden roll.
- When the UI itself turns strange (Kiri's name greying out, the Whisperer writing commands into the turn order), the true state is still readable somewhere on screen.

## Voice

### Player-facing text

- **Plain words, short sentences, present tense.** "Tetsugi dies quietly in bed every night and is alive each morning." Horror lands harder in a flat voice.
- **State the mechanic exactly, the fiction sparingly.** Skill descriptions are rules: "−25 Stress to one ally." Fiction belongs in names and in one clause at most: "Undertow pushes whoever is about to act back 3 slots."
- **Numbers are digits.** "+14 Stress", "3 slots", "50% HP". Spell out only "one", "two" and "three" in story prose.
- **Mechanics words are capitalised** as names: Stress, Danger, Lost Turn, Stress Check, Afflicted, Inspired, Delay, Swap, Break, Limit Break, Overdrive, Phoenix Down, and every skill and item name.
- **British spelling** in prose and UI: harbour, grey, centre, neighbour, travellers, armour. Leave proper names alone: Ito's titles (*Honored Ancestors*) and the Sphere Grid's Center.

### Typography

| Use | Character | Example |
| --- | --- | --- |
| Negative numbers and reductions | − (U+2212), not a hyphen | −20 Stress |
| Multipliers and counts | × (U+00D7) | 1.4× ATK · Ruri ×2 |
| Targets in the log | → | Cure → Kiri. |
| Separators in titles and meta lines | · | Port of Vesk · Tide-Widow |
| Ranges | – (en dash) | Ch. 1–20, 0–100 |
| Apostrophes in code strings | ' (straight) | KO'd |

### Battle log lines

The log is the battle's caption track. One event per line, the actor first, ending in a full stop.

| Event | Pattern |
| --- | --- |
| A command | `Kiri: Spiral Cut (+40% from Danger).` |
| A targeted command | `Natsu: Cure → Miren.` |
| Damage | `Tide-Widow takes 64 damage (critical).` |
| Stress | `Sayo +14 Stress (Lullaby).` with the cause in brackets |
| A state | `Hisui is KO'd.` / `Kuro is no longer Afflicted (Slow).` |
| A rule firing | `Provoke: the attack is redirected to Kugai.` |
| An enemy reacting | `Archbishop Orlen reacts: Crozier → Kiri.` |

Log classes carry the tone: `party` for neutral events, `foe` for enemy actions and damage, `dread` for Stress and Stress Checks, `void` for Lost Turns, `sys` for battle start and end.

### Encounter briefs

The setup panel's brief is three beats in this order: the threat as a rule, the answer the fight wants, then the Ito source in brackets.

> Its damage rises 25% with every turn it takes. Delay Shot keeps it from acting, so it stays weaker, but Breaking it wakes it angry. (The Long Dream)

### Names

- **Bosses and creatures** are ordinary words made wrong: *The Well-Rested*, *Forty Years*, *The Neighbour*, *Your Own Tracks*. Avoid fantasy compound names (no "Shadowmaw").
- **Skills** are verbs or plain nouns from the creature's body or habit: Undertow, Sermon, Chisel, Grease Rain, Beckon.
- **Every enemy has an Ito source** in `STORY` and in its brief. A creature without a source isn't finished.

## Visual language: the manga page

The battle screen is laid out like a manga page, so panels, page turns and black and white are UI language, not decoration.

| Element | Rule |
| --- | --- |
| Palette | Paper `#ecebe6` and ink `#151515`, with one accent: hum violet `#5c4874` (and its tint `#d6cee0`). No other hues outside creature and portrait art. No red, not even for damage |
| Panels | Thick ink borders (3px for panels, 2px for frames). Battle panels sit left; the turn order runs down the right as a strip of frames, and across the top on phones |
| Turn order frames | Party turns are paper frames, enemy turns are inverted (solid ink), and Lost Turns are dashed and filled with screentone: the slot is there, but nothing is in it. The acting character's frame gets a violet drop shadow |
| Screentone | The dotted `--tone` texture is for shading and dread states, used sparingly |
| Type | Shippori Mincho B1 for display (titles, names, reveals); Zen Kaku Gothic New for body; IBM Plex Mono for numbers, labels and the log |
| Reveals | Stress Checks, flees and phase changes use the full-screen overlay: a panel that stops time. Hold the reveal briefly before the button enables, as a page turn would |
| Motion | Creature rigs move slowly and wrongly: anticipation, overshoot, settle. Everything respects `prefers-reduced-motion` |

Creature rigs and sprite sheets follow the [`sprite-animation` skill](../.claude/skills/sprite-animation/SKILL.md). Tools in `tools/` share the battle page's tokens and fonts, so a design tool reads like the screen it designs.

### Accessibility

- Every interactive element is a real `button` or form control with a visible `:focus-visible` ring.
- State is never colour-only: Afflicted, KO and targetable cards also change text or border.
- The turn order and the log are readable by a screen reader in the order they happen.
- Text contrast stays at WCAG AA against paper, including grey secondary text (`--ink-2`).
- Reduced motion shortens waits and stops idle animation; it never hides information.
