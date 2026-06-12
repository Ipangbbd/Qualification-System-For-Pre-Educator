---
version: 1.0
name: EduQualify-User-Dashboard
description: Design spec for the user dashboard (glass mockup, progress steps, bento tiles) following the project's Apple-like token template.
colors:
  surface: "{colors.canvas-parchment}"
  surface-foreground: "{colors.ink}"
  accent: "{colors.primary}"
  chip: "{colors.surface-chip}"

typography:
  headline:
    token: "{typography.display-md}"
    use: "Dashboard headings (34–40px tightened)"
  body:
    token: "{typography.body}"
    use: "Standard body copy and status lines"
  caption:
    token: "{typography.caption}"
    use: "Small labels, step captions"

components:
  dashboard-mockup:
    style: "glass-mockup"
    background: "rgba(255,255,255,0.6)"
    blur: "backdrop-filter: blur(6px)"
    border-radius: "{rounded.card}"
    shadow: "0 30px 60px rgba(0,0,0,0.06)"
    chrome: "three mac-style control dots in top-left; subtle hairline separator under header"

  progress-step:
    shape: "rounded small panel (use {rounded.md} for compact, {rounded.lg} for feature)"
    background: "transparent or white/6 on glass"
    emphasis: "use accent only sparingly — status chips, active markers"

  bento-grid:
    layout: "6-column grid on desktop; highlight card spans 3 cols"
    spacing: "gap 24px ( {spacing.lg} )"

accessibility:
  contrast: "Keep text contrast >= 4.5:1 against background. For low-contrast decorative gray, use aria-hidden and provide text equivalents."
  keyboard: "Steps & CTA must be reachable via keyboard; focus ring uses {colors.primary-focus}."

Overview

The dashboard is a lightweight glass mockup centered on the hero tile. Use the glass surface to suggest an app-like viewport without heavy chrome. Interior content should use the same typographic scale as the site: headline, status line, progress step tiles, call-to-action.

Layout

- Container: max-width 1200px centered.
- Mockup: centered, full-width up to container, internal padding 32–48px depending on breakpoint.
- Grid: progress steps align in a 3-column grid inside the mockup; feature highlight uses a larger card (bento style).

Components (notes)

- Header: left cluster has three small round control dots (red/yellow/green) sized ~10px, centered vertically; right side small meta label in `{typography.caption}`.
- Status row: user greeting, status text uses `{typography.body-strong}` for label and `{typography.body}` for supporting copy.
- Progress tiles: no heavy borders — use subtle divider hairlines and fill variants (white/6, white/4). Active tile uses accent chip with white text.
- Action: primary action under the mockup uses capsule (`{rounded.pill}`) with dark fill and white text when on light tiles.

Implementation notes

- Reuse `.glass-mockup` utility in `src/index.css` and component-level classes.
- Use SVG outline icons and avoid colored badges.
- Keep all interactive labels short and use micro-interactions (`transform: scale(0.95)` on press).
