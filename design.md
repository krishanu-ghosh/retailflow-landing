# Design: RetailFlow

The locked system. Every Hallmark run reads this first and pages share it. Change it on purpose; the file is the rule.

## System
- Genre: modern-minimal
- Shape of the first page: composed (Index, Figures, Table, Split, Rows — built for a content-rich retail SaaS redesign, not a single catalog macrostructure)
- Theme: **Midnight + brass** (since 2026-11-25; replaced Hallmark's Coral to give the site a premium, dark look). Coral was dealt 1/3, seed retailflow-pos-billing-inventory-6f83.
- Axes: dark/grotesk-sans/warm · posture: restrained

## Tokens
`tokens.css` is the source of truth. The roles:
```css
:root {
  --color-paper: oklch(14.5% 0.014 265);  --color-paper-2: oklch(18% 0.016 265);  --color-paper-3: oklch(21.5% 0.018 265);
  --color-ink: oklch(95% 0.008 80);  --color-ink-2: oklch(84% 0.012 78);  --color-muted: oklch(68% 0.016 260);  --color-rule: oklch(100% 0 0 / 0.08);
  --color-accent: oklch(78% 0.115 78) /* brass */;  --color-accent-ink: oklch(17% 0.02 70);  --color-accent-2: oklch(81% 0.11 80);  --color-focus: oklch(84% 0.13 85);
  --font-display: "General Sans", ui-sans-serif, system-ui, sans-serif;  --font-body: var(--font-display);  --font-outlier: "Geist Mono", ui-monospace, monospace;
  --radius-card: 14px;  --radius-stock: 12px;  --radius-pill: 999px;  --rule-hair: 1px;
}
```
The spacing scale, the type scale, the easings and the durations are the scaffold's and live in `tokens.css`. The material: midnight surfaces with a faint brass bloom and grain; `.stock` is a dark glass panel; `.desk` is a brass spotlight with a faint ledger grid; `.board` is a lifted panel with a brass glow. The signature invoices (`.doc`, `.post-bill`, `.card-peek`) stay lit cotton paper, the one warm-white object on the dark page, and re-scope the ink/rule/muted tokens locally. Primary actions are brass (`.btn--primary`, `.btn--card`, `.form-submit`). Pages use the reversed logo `brand/lockups/retailflow-horizontal-reversed.svg`. The original Coral material is described — see `references/themes/coral.md` in the Hallmark skill, and `styles.css`'s `.stock`, `.desk`, `.board`, `.stamp-paid` utilities.

## Controls
- Primary: `.btn--primary` / `.btn--card` — brass gradient with dark type, `--radius-stock`, 48px tall, lift + glow on hover.
- Secondary: `.btn--quiet` — outline, same radius and height, no fill.
- Nav action and the feature-list toggle are quiet/outline too — nav actions stay quieter than the hero's (craft.md § 9).

## Motion
- Character: calm. One reveal at most (`[data-reveal]`, scoped under `.js`, staggered by `--i`), content visible with scripting off. Under reduced motion everything ends at once.

## Exports
`tokens.css` and `base.css` in this project, imported at the top of `styles.css`. No Tailwind, DTCG or shadcn blocks requested yet — add here on request, per `export-formats.md`.

## Variants
- `index.html`: hero posture Stage (the signature invoice fills the right column), nav edge-aligned, footer mast.
- `pricing.html`: no Stage hero — a plain centred header (`pricing-hero`) leading straight into the EAP offer card; same nav, same footer, same Midnight + brass material throughout (tier cards use `.stock`/`.board` surfaces, the billing-cycle switcher uses the theme's `--press-groove`).
