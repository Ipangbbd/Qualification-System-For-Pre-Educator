# EduQualify Color Reference

## Primary Interactive Color

```
┌──────────────────────────────────────┐
│  #0066cc - Action Blue (Primary)    │  ← ALL buttons, links, interactive elements
├──────────────────────────────────────┤
│  #0071e3 - Focus Blue               │  ← Hover/focus states
├──────────────────────────────────────┤
│  #2997ff - Sky Blue (On Dark)       │  ← Links on dark backgrounds
└──────────────────────────────────────┘
```

## Text Colors

```
Light Backgrounds:
┌──────────────────────────────────────┐
│  #1d1d1f - Ink (Primary Text)       │  ← Body text, headlines
├──────────────────────────────────────┤
│  #333333 - Ink Muted 80             │  ← Secondary text
├──────────────────────────────────────┤
│  #7a7a7a - Ink Muted 48             │  ← Tertiary text, disabled
└──────────────────────────────────────┘

Dark Backgrounds:
┌──────────────────────────────────────┐
│  #ffffff - White                     │  ← Primary text on dark tiles
├──────────────────────────────────────┤
│  #cccccc - Body Muted               │  ← Secondary text on dark
└──────────────────────────────────────┘
```

## Surface Colors

```
Light Surfaces:
┌──────────────────────────────────────┐
│  #ffffff - Canvas (Pure White)       │  ← Main background, cards
├──────────────────────────────────────┤
│  #f5f5f7 - Canvas Parchment         │  ← Alternate sections, footer
├──────────────────────────────────────┤
│  #fafafc - Surface Pearl            │  ← Subtle cards, ghost buttons
└──────────────────────────────────────┘

Dark Surfaces:
┌──────────────────────────────────────┐
│  #000000 - Surface Black            │  ← Global nav only
├──────────────────────────────────────┤
│  #272729 - Surface Tile 1           │  ← Dark sections (main)
├──────────────────────────────────────┤
│  #2a2a2c - Surface Tile 2           │  ← Dark cards/components
├──────────────────────────────────────┤
│  #252527 - Surface Tile 3           │  ← Borders, subtle containers
└──────────────────────────────────────┘
```

## Borders & Dividers

```
┌──────────────────────────────────────┐
│  #f0f0f0 - Divider Soft             │  ← Subtle borders (ghost buttons)
├──────────────────────────────────────┤
│  #e0e0e0 - Hairline                 │  ← Card borders, separators
└──────────────────────────────────────┘
```

## Usage Examples

### Button Primary
```css
background: #0066cc     /* Action Blue */
text: #ffffff          /* White */
border-radius: 9999px  /* Pill shape */

hover → background: #0071e3
active → scale(0.95)
```

### Button Secondary (Ghost)
```css
background: transparent
text: #0066cc          /* Action Blue */
border: 1px solid #0066cc
border-radius: 9999px

hover → border: #0071e3
active → scale(0.95)
```

### Product Tile Light
```css
background: #ffffff    /* Canvas */
text: #1d1d1f         /* Ink */
padding: 80px
```

### Product Tile Dark
```css
background: #272729    /* Surface Tile 1 */
text: #ffffff         /* White */
padding: 80px
```

### Dashboard Mockup
```css
background: #272729    /* Surface Tile 1 - main canvas */
header: #2a2a2c       /* Surface Tile 2 */
borders: #252527      /* Surface Tile 3 */
text: #ffffff         /* White */

Active card border: #2997ff (Sky Blue)
Completed card border: #0066cc (Action Blue)
Locked card: opacity reduced
```

## Color Philosophy (Apple DNA)

### Single Accent Rule
❌ **Never** introduce a second brand color
✓ **Always** use `#0066cc` for interactive elements

### Text Hierarchy
1. Primary: `#1d1d1f` (Ink) - headlines, body
2. Secondary: `#333333` (Muted 80) - supporting text
3. Tertiary: `#7a7a7a` (Muted 48) - legal, disabled

### Surface Alternation
```
Section 1: #ffffff   (White tile)
Section 2: #f5f5f7   (Parchment tile)
Section 3: #272729   (Dark tile)
Section 4: #ffffff   (White tile)
Section 5: #f5f5f7   (Parchment footer)
```

**The color change IS the divider** - no borders between full-bleed sections.

### Shadow Usage
Only ONE shadow in the entire system:
```css
/* Product shadow (MacBook-style) */
filter: drop-shadow(0 5px 30px rgba(0, 0, 0, 0.22));
```

Applied ONLY to dashboard mockup. Never on buttons, cards, or text.

## Accessibility

All color combinations meet WCAG AA standards:
- White text on `#0066cc`: ✓ 4.6:1 ratio
- `#1d1d1f` text on white: ✓ 15.8:1 ratio
- White text on `#272729`: ✓ 14.9:1 ratio

## Implementation

All colors are defined in `tailwind.config.js`:

```javascript
colors: {
  'primary': '#0066cc',
  'primary-focus': '#0071e3',
  'primary-dark': '#2997ff',
  'ink': '#1d1d1f',
  // ... etc
}
```

Use as Tailwind classes:
- `bg-primary` → #0066cc background
- `text-ink` → #1d1d1f text
- `border-hairline` → #e0e0e0 border

## Don'ts

❌ Don't add gradients as decorative backgrounds
❌ Don't use multiple brand colors
❌ Don't add shadows to UI chrome (buttons, cards)
❌ Don't use pure black (#000) except for global nav
❌ Don't tint the primary blue - keep it consistent

## Do's

✓ Use the single blue accent consistently
✓ Alternate light/dark tiles for rhythm
✓ Apply the product shadow only to hero mockup
✓ Keep text hierarchy: Ink → Muted 80 → Muted 48
✓ Let photography breathe (when added)
