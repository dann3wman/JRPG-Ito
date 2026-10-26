# Miren generation record · 2026-10-25

Generated with the built-in OpenAI image tool using the existing portrait as identity reference. Sprite generation also initially consulted the old battle sprite. The retained source sheets are [sprites](miren-sheet-2026-10-25.source.png) and [portraits](miren-portraits-2026-10-25.source.png). Preview WebPs and labelled checks are in [assets/player-sheets/miren/](../../assets/player-sheets/miren/).

## Viewer installation · 2026-10-25

Installed both sliced WebPs in the Party Sprite Viewer and regenerated its manifest. Chromium checks passed for all 26 animation controls, 12 portraits, four derived effects, flipping and whole-sheet view, with no page errors. The smaller 0.52-scale preview is retained. The art review items below remain; battle embedding is unchanged.

## Original generation verification

The retained sprite source has 54 occupied cells. Source boundary warnings were resolved; the preview is sliced at explicit scale 0.52 to avoid clipping in 96 px cells. This gives an idle body approximately 45 px high instead of the 56 px standard. Normal-size packing, heel-lift readability, grounded/airborne alignment and spear-arm continuity in chant poses need runtime/art review before embedding. Portrait faces sit toward the right of the square crops and need focal-point fitting.

Both sources were visually inspected, sliced and checked for occupied cells. Source dimensions: sprites 1024 × 1536; portraits 1536 × 1024. Sliced dimensions: sprites 576 × 864; portraits 1024 × 768. This is artwork delivery and preview preparation; no game/viewer assets were replaced, installed, embedded or runtime-tested. No commits or publication.

## Retained sprite generation specification

Draw a production pixel-art sprite atlas for Miren, an adult male fantasy dragoon: pale spiky blond hair, red/dark iron armour, a narrow steel-tipped wooden spear growing continuously out of his right forearm. Small chibi 16-bit FF6 style. Exactly SIX COLUMNS and NINE ROWS, 54 occupied cells, on pure solid bright green #00ff00. Canvas1024x1536. Each entire figure and spear SMALL, contained in central 100x110px of each 170x170px cell with broad blank gaps. Do not omit any cell. Battle faces left, standing on toes with heels lifted. Body same scale every cell. All nonjump feet aligned horizontally within each row. Spear always attached, shown diagonal to fit, no long trailing effects. This is animation frames, not a comic. No text, no borders. Frame contents row by row, exactly six each: ROW1 idle, breathe-in, breathe-out, ready, ready-bob, guard. ROW2 spear draw-back, forward thrust, follow-through, reverse wind-up, reverse strike, reverse follow-through. ROW3 left step1,left step2,left-facing chant1,left-facing chant2,cast-left,cast recovery. ROW4 hold vial,toss vial,recoil,stumble,kneel exhausted1,kneel exhausted2. ROW5 crouch to jump,whole body leaping upward small and fully inside cell,descending spear-first,falling-star dive windup,falling-star vertical dive,falling-star landing crouch with tiny spark. IMPORTANT ROW5 HAS SIX OCCUPIED CELLS, especially column6 landing with spear attached. ROW6 victory-rest,victory-raise-left-fist,victory-breathe,grey-pallor slack1,grey-pallor slack2,lying KO eyes closed spear attached alongside body. ROW7 sleep slumped1,sleep slumped2,rigid paralysis,confused look right,confused hand on head,angry charge stance. ROW8 facing-down stand,down walk left foot,down walk right foot,facing-up stand,up walk left foot,up walk right foot. ROW9 strict-left-profile stand,left walk1,left walk2,front startled,front head bowed,front listening. Every pose retains spear-arm even chant and sleep. Keep character and spear fully inside each cell with blank green gaps. Use muted sepia skin and iron grey with red armour accents. Reference is identity only, no ink hatching on pixel art.

### Facing correction

Edit the attached pixel-art atlas. Preserve exact character design and overall 6 columns x9 rows =54 cells. Fix ONLY row8 (second row from bottom): columns1,2,3 must face directly TOWARD VIEWER showing eyes and front chest armour: standing, walk left foot forward, walk right foot forward. Columns4,5,6 must face directly AWAY FROM VIEWER showing back of blond head and back armour: standing, walk left foot forward, walk right foot forward. Spear remains attached to right forearm in all six. Also make all spears no longer than the character's head-to-toe height, and keep EVERY spear tip at least20px inside its cell. Especially row2 thrusts must fit fully inside their own cells. Preserve all other poses and all54 occupied cells. Use real transparent background. Retain sharp pixel edges; no soft glow or translucent background haze. Do not change portrait style, colours, scale, frame order, character count.

### Final spacing correction

Production correction to THIS EXACT sprite sheet. Keep all54 poses and 6x9 grid unchanged. Within each individual grid cell, SCALE DOWN its entire figure, spear, item and effects to 75% of their present size, centred horizontally, with grounded feet at 80% down that cell. The canvas stays1024x1536, but the sprites become visibly smaller surrounded by wide empty gaps. This must create at least32 pixels of clear space on all sides of EVERY cell. No connected artwork between cells. Especially row3 column5 casting spear, row4 column2 thrown item, row5 column5 vertical diving spear must fit entirely inside their own cell. Do not remove any part: shrink all parts together. Retain blond male character, red/iron armour, permanently fused spear arm, every pose, correct front/back field row. Fully transparent background and sharp opaque pixel art; no glows, haze or translucent pixels outside sprites. No text.

## Retained portrait generation specification

# Miren: portrait sheet request (2026-10-25)

Generated by `party_art.py prompt miren portraits`. Export the attachments with
`python3 .claude/skills/party-art/scripts/party_art.py refs miren --out <dir>`, then paste the
prompt into ChatGPT with `miren-portrait.png` attached and download the result as a PNG.

````text
I'm attaching the current portrait of "Miren" (Spearbound), a party member in a dark horror JRPG drawn in the style of Junji Ito's manga. Please draw a PORTRAIT SHEET: the same portrait in 12 different states, laid out like a manga page.

About the character: a brash young man with messy, spiky pale gold hair; red and dark-iron dragoon armour; a long spear whose shaft has grown into his right forearm, wood fused with veins. His spear has grown into his arm; he refuses to touch the ground.

Style: match the attached portrait exactly: Junji Ito-style ink linework, dense hatching, stark black and white with muted sepia and a little dark red. Restrained, precise horror: unsettling details drawn cleanly, never gory for its own sake.

Consistency is the most important thing. The game swaps between these portraits in place, so in EVERY panel: the same character, same costume, same head-and-shoulders crop as the attached portrait, the head the same size and in the same position, facing the same way. Only the expression, skin, lighting and small details change.

Panels, left to right, top to bottom:
Row 1:
  1. Standard: their usual expression, composed. This is the portrait used most of the time. For Miren: he stands with his heels lifted, never flat on the ground.
  2. Taking a hit: flinching from a blow, eyes squeezed or wide, head jerked aside, a fresh cut.
  3. Low HP (25% or less): bloodied, sweat-soaked, exhausted, breathing through the mouth, still conscious and still fighting. For Miren: the veins from the spear have crept up past his elbow.
  4. High Stress (75+): not yet broken but close: eyes slightly too wide, a fixed stare at something out of frame, a clenched jaw. One small detail is wrong. For Miren: he glances down at the ground with open fear.
Row 2:
  1. KO: unconscious: eyes closed or half open and unfocused, head fallen back or aside, drained of colour, lit from below.
  2. Afflicted: Berserk: rage that has forgotten its reason: teeth bared, pupils pinpricks, veins standing out, red in the shadows, the expression locked on like a mask.
  3. Afflicted: Zombie: undead pallor, grey-green skin, sunken eyes with milky irises, cracked lips, and calm, as if nothing is wrong.
  4. Afflicted: Paralyze: locked rigid, jaw clenched, the eyes straining to move while the face cannot, faint nerve-like lines across the skin. For Miren: the spear-arm has stiffened and is pulling him, the veins dark and rigid.
Row 3:
  1. Afflicted: Confuse: unfocused, the eyes pointing slightly different ways, a soft lost smile, small spirals in the irises.
  2. Afflicted: Slow: heavy-lidded and drooping as if under deep water, the face smeared into a long-exposure trail, hair drifting.
  3. Asleep: eyes closed, face peaceful, head drooping. The calm itself should feel slightly wrong.
  4. Inspired: passed a Stress Check and found resolve: a clear, steady, almost serene gaze, light catching the eyes. Still the same grim world, not heroic-bright.

Hard requirements. A script cuts this image up by a fixed grid, so these matter:
- Exactly 4 columns and 3 rows of equal cells filling the whole image, in the order listed. Nothing outside the grid, no title, no extra cells.
- Each cell holds one SQUARE panel, centred, separated from its neighbours by thick solid black gutters like a manga page. The art fills the panel edge to edge.
- No text, labels, numbers, frame borders or guide lines anywhere (the black gutters are the only lines between panels).
- Return it as a downloadable PNG, 1536 x 1024 (landscape orientation).
````


Generate now. Reference image defines Miren's face and drawing style. Keep same head size, centred face, same pale gold hair and red dark-iron armour throughout. Use a slightly wider upper-chest crop consistently in all panels so the spear-fused right forearm and dark branching veins can appear near the lower edge. No full-body panels: lifted heels are not visible in a portrait. Paralyze emphasizes the rigid fused arm pulling at shoulder; high Stress eyes look downward in fear while head framing stays fixed. No text. Exact 4x3 panels, black gutters, 1536x1024 PNG.

