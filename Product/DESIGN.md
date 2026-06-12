# Apple Design System - Qualification System Frontend

## Overview

A photography-first interface that turns marketing into a museum gallery. Edge-to-edge product tiles alternate light and dark canvases, framed by SF Pro Display headlines with negative letter-spacing and a single Action Blue (#0066cc) interactive color.

---

## Colors

### Brand & Accent
- **Action Blue** (`#0066cc`): Primary interactive color for all CTAs and links
- **Focus Blue** (`#0071e3`): Keyboard focus ring color
- **Sky Link Blue** (`#2997ff`): Links on dark surfaces

### Surface
- **Pure White** (`#ffffff`): Main canvas
- **Parchment** (`#f5f5f7`): Alternating light tiles
- **Pearl Button** (`#fafafc`): Secondary button backgrounds
- **Near-Black Tile 1** (`#272729`): Primary dark tile
- **Near-Black Tile 2** (`#2a2a2c`): Micro-step lighter dark tile
- **Near-Black Tile 3** (`#252527`): Micro-step darker dark tile
- **Pure Black** (`#000000`): Global nav and true void

### Text
- **Near-Black Ink** (`#1d1d1f`): Headlines and body on light
- **Body On Dark** (`#ffffff`): Text on dark tiles
- **Body Muted** (`#cccccc`): Secondary copy on dark
- **Ink Muted 80** (`#333333`): Body on pearl
- **Ink Muted 48** (`#7a7a7a`): Disabled and legal text

### Hairlines & Borders
- **Divider Soft** (`#f0f0f0`): Soft borders
- **Hairline** (`#e0e0e0`): 1px borders on cards

---

## Typography

### Font Stack
- **Display**: `SF Pro Display, system-ui, -apple-system, sans-serif`
- **Body**: `SF Pro Text, system-ui, -apple-system, sans-serif`

### Type Scale

| Token | Size | Weight | Line Height | Letter Spacing | Use |
|---|---|---|---|---|---|
| `hero-display` | 56px | 600 | 1.07 | -0.28px | Hero headlines |
| `display-lg` | 40px | 600 | 1.10 | 0 | Tile headlines |
| `display-md` | 34px | 600 | 1.47 | -0.374px | Section heads |
| `lead` | 28px | 400 | 1.14 | 0.196px | Product tile subcopy |
| `lead-airy` | 24px | 300 | 1.5 | 0 | Environment lead |
| `tagline` | 21px | 600 | 1.19 | 0.231px | Sub-tile tagline |
| `body-strong` | 17px | 600 | 1.24 | -0.374px | Strong emphasis |
| `body` | 17px | 400 | 1.47 | -0.374px | Default paragraph |
| `dense-link` | 17px | 400 | 2.41 | 0 | Footer links |
| `caption` | 14px | 400 | 1.43 | -0.224px | Captions |
| `caption-strong` | 14px | 600 | 1.29 | -0.224px | Emphasized captions |
| `button-large` | 18px | 300 | 1.0 | 0 | Store hero CTAs |
| `button-utility` | 14px | 400 | 1.29 | -0.224px | Utility buttons |
| `fine-print` | 12px | 400 | 1.0 | -0.12px | Fine-print |
| `micro-legal` | 10px | 400 | 1.3 | -0.08px | Legal disclaimers |
| `nav-link` | 12px | 400 | 1.0 | -0.12px | Nav items |

### Typography Principles
- Negative letter-spacing on display sizes (17px+)
- Body at 17px (not 16px) for reading pace
- Weight ladder: 300 / 400 / 600 / 700 (no 500)
- Headlines at weight 600
- Line-height varies by context (1.07-1.47 for display, 1.47 for body, 2.41 for footer links)

---

## Spacing

| Token | Value | Use |
|---|---|---|
| `xxs` | 4px | Tight adjustments |
| `xs` | 8px | Small gaps |
| `sm` | 12px | Standard spacing |
| `md` | 17px | Medium |
| `lg` | 24px | Card padding |
| `xl` | 32px | Large spacing |
| `xxl` | 48px | Extra large |
| `section` | 80px | Section padding |

---

## Rounded Corners

| Token | Value | Use |
|---|---|---|
| `none` | 0px | Full-bleed tiles |
| `xs` | 5px | Inline links |
| `sm` | 8px | Utility buttons |
| `md` | 11px | Pearl buttons |
| `lg` | 18px | Utility cards |
| `pill` | 9999px | Primary CTAs |
| `full` | 50% | Circular elements |

---

## Components

### Buttons

**Primary Button** (`button-primary`)
- Background: Action Blue (#0066cc)
- Text Color: White
- Typography: body (17px/400)
- Rounded: pill (9999px)
- Padding: 11px 22px
- Active State: `transform: scale(0.95)`
- Focus State: 2px solid outline (#0071e3)

**Secondary Button** (`button-secondary-pill`)
- Background: transparent
- Text Color: Action Blue
- Border: 1px solid Action Blue
- Typography: body
- Rounded: pill
- Padding: 11px 22px

**Dark Utility Button** (`button-dark-utility`)
- Background: Near-Black Ink (#1d1d1f)
- Text Color: White
- Typography: button-utility (14px/400)
- Rounded: sm (8px)
- Padding: 8px 15px

**Pearl Capsule Button** (`button-pearl-capsule`)
- Background: Pearl (#fafafc)
- Text Color: Ink Muted 80 (#333333)
- Typography: caption (14px)
- Border: 3px solid Divider Soft
- Rounded: md (11px)
- Padding: 8px 14px

**Store Hero Button** (`button-store-hero`)
- Background: Action Blue
- Text Color: White
- Typography: button-large (18px/300)
- Rounded: pill
- Padding: 14px 28px

**Icon Circular Button** (`button-icon-circular`)
- Size: 44×44px
- Background: Translucent Chip Gray (~64% alpha)
- Icon Color: Near-Black Ink
- Rounded: full

### Navigation

**Global Nav** (`global-nav`)
- Background: Pure Black (#000000)
- Height: 44px
- Text: White in nav-link style (12px/400)
- Position: Fixed top
- Content: Logo + links (left), Search + Bag (right)

**Sub Nav Frosted** (`sub-nav-frosted`)
- Background: Parchment at 80% opacity + backdrop blur
- Height: 52px
- Typography: tagline (21px/600)
- Position: Sticky below global-nav
- Content: Category name (left), links + CTA (right)

### Cards & Tiles

**Product Tile Light** (`product-tile-light`)
- Background: White
- Text: Near-Black Ink
- Full-bleed, no rounded corners
- Padding: 80px vertical
- Content: Headline (display-lg) → Tagline (lead) → Buttons → Image with shadow

**Product Tile Dark** (`product-tile-dark`)
- Background: Near-Black Tile 1 (#272729)
- Text: White
- Full-bleed, no rounded corners
- Padding: 80px vertical
- Same content stack as light tile

**Product Tile Dark 2** (`product-tile-dark-2`)
- Background: Near-Black Tile 2 (#2a2a2c)
- Micro-step lighter for separation

**Product Tile Dark 3** (`product-tile-dark-3`)
- Background: Near-Black Tile 3 (#252527)
- Used at bottom of stack

**Product Tile Parchment** (`product-tile-parchment`)
- Background: Parchment (#f5f5f7)
- Breaks consecutive white tiles

**Store Utility Card** (`store-utility-card`)
- Background: White
- Border: 1px solid Hairline (#e0e0e0)
- Rounded: lg (18px)
- Padding: 24px
- Content: Image (1:1 crop, 8px radius) → Name (body-strong) → Price (body) → Link

**Configurator Option Chip** (`configurator-option-chip`)
- Background: White
- Text: Near-Black Ink in caption
- Rounded: pill
- Padding: 12px 16px
- Content: Thumbnail + Label + Price delta
- Selected State: 2px solid Action Blue border

**Environment Quote Card** (`environment-quote-card`)
- Background: Near-Black Tile 1 or photographic
- Text: White in display-lg
- Full-bleed, 80px padding
- Content: Logo + Headline + CTA

**Floating Sticky Bar** (`floating-sticky-bar`)
- Background: Parchment at 80% + backdrop blur
- Height: 64px
- Position: Fixed bottom
- Padding: 12px 32px
- Content: Price (left) + CTA (right)

### Inputs & Forms

**Search Input** (`search-input`)
- Background: White
- Text: Near-Black Ink in body
- Border: 1px solid rgba(0,0,0,0.08)
- Rounded: pill
- Padding: 12px 20px
- Height: 44px
- Leading icon: Search glyph (14px)

### Footer

**Footer** (`footer`)
- Background: Parchment (#f5f5f7)
- Text: Ink Muted 80 in fine-print
- Padding: 64px vertical
- Link columns: dense-link (17px/400/2.41 line)
- Headings: caption-strong (14px/600)
- Legal row: fine-print (12px/400) in Ink Muted 48

---

## Elevation & Depth

| Level | Treatment | Use |
|---|---|---|
| Flat | No shadow, no border | Tiles, nav, footer |
| Soft Hairline | 1px rgba(0,0,0,0.08) border | Utility cards |
| Backdrop Blur | `backdrop-filter: blur(20px)` | Sticky bars |
| Product Shadow | `rgba(0,0,0,0.22) 3px 5px 30px` | Product images only |

**Shadow Philosophy:**
- Exactly ONE drop-shadow in entire system
- Applied ONLY to product photography
- Never on cards, buttons, or text
- Elevation via surface-color change and backdrop-blur

---

## Responsive Breakpoints

| Name | Width | Key Changes |
|---|---|---|
| Small Phone | ≤ 419px | 1-column tiles, hero 28px, sub-nav collapses |
| Phone | 420–640px | 1-column stack, renders 80% width, hero 34px |
| Large Phone | 641–735px | Padding 48px vertical, fine-print wraps |
| Tablet Portrait | 736–833px | Global nav hamburger, sub-nav minimal |
| Tablet Landscape | 834–1023px | Global nav expands, 3-col → 2-col grids |
| Small Desktop | 1024–1068px | 2/3 width tiles, hero 40px |
| Desktop | 1069–1440px | Full layout, 4-5 col grids |
| Wide Desktop | ≥ 1441px | Content lock at 1440px |

---

## Do's and Don'ts

### Do
✓ Use Action Blue (#0066cc) for every interactive element
✓ Set headlines with negative letter-spacing for "Apple tight" feel
✓ Run body at 17px/400/1.47 for reading pace
✓ Alternate light/dark tiles for rhythm (no borders needed)
✓ Reserve pill shape for primary CTAs
✓ Apply product shadow ONLY to imagery
✓ Use `scale(0.95)` for button active state
✓ Keep global nav pure black

### Don't
✗ Don't add second accent color
✗ Don't add shadows to cards/buttons/text
✗ Don't use decorative gradients
✗ Don't set body to weight 500 (use 400/600 only)
✗ Don't round full-bleed tiles
✗ Don't tighten line-height below 1.47 for body
✗ Don't mix radius grammars
✗ Don't use Sky Link Blue on light surfaces

---

## Known Gaps

- Form validation and error states not yet documented
- Dark-mode variants for utility cards pending
- Backdrop-filter blur radius varies by platform (20px baseline)
- Player controls and dynamic content not formalized
- Atmospheric imagery is content asset, not token
