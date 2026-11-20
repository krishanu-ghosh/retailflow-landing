# Design: RetailFlow

The locked system. Every Hallmark run reads this first and pages share it. Change it on purpose; the file is the rule.

## System
- Genre: modern-minimal
- Shape of the first page: composed (Index, Figures, Table, Split, Rows — built for a content-rich retail SaaS redesign, not a single catalog macrostructure)
- Theme: Coral (dealt 1/3, seed retailflow-pos-billing-inventory-6f83)
- Axes: light/grotesk-sans/warm · posture: restrained

## Tokens
`tokens.css` is the source of truth. The roles:
```css
:root {
  --color-paper: oklch(97% 0.006 55);  --color-paper-2: oklch(94.5% 0.007 55);  --color-paper-3: oklch(91.5% 0.009 55);
  --color-ink: oklch(21% 0.012 38);  --color-ink-2: oklch(29% 0.013 40);  --color-muted: oklch(47% 0.013 45);  --color-rule: oklch(87% 0.009 55);
  --color-accent: oklch(74% 0.125 30);  --color-accent-ink: oklch(21% 0.012 38);  --color-focus: oklch(54% 0.17 30);
  --font-display: "General Sans", ui-sans-serif, system-ui, sans-serif;  --font-body: var(--font-display);  --font-outlier: "Geist Mono", ui-monospace, monospace;
  --radius-card: 8px;  --radius-pill: 999px;  --rule-hair: 1px;  --shadow-card: 0 1px 2px oklch(20% 0.01 35 / 0.05);
}
```
The spacing scale, the type scale, the easings and the durations are the scaffold's and live in `tokens.css`. The material (cotton stock, felt desk, the pressed "Paid" stamp, letterpress cards) is Coral's own — see `references/themes/coral.md` in the Hallmark skill, and `styles.css`'s `.stock`, `.desk`, `.board`, `.stamp-paid` utilities.

## Controls
- Primary: `.btn--card` — cotton stock, `--radius-stock`, 48px tall, lift + shadow on hover. One per page.
- Secondary: `.btn--quiet` — outline, same radius and height, no fill.
- Nav action and the feature-list toggle are quiet/outline too — nav actions stay quieter than the hero's (craft.md § 9).

## Motion
- Character: calm. One reveal at most (`[data-reveal]`, scoped under `.js`, staggered by `--i`), content visible with scripting off. Under reduced motion everything ends at once.

## Exports
`tokens.css` and `base.css` in this project, imported at the top of `styles.css`. No Tailwind, DTCG or shadcn blocks requested yet — add here on request, per `export-formats.md`.

## Variants
- `index.html`: hero posture Stage (the signature invoice fills the right column), nav edge-aligned, footer mast.
- `pricing.html`: no Stage hero — a plain centred header (`pricing-hero`) leading straight into the EAP offer card; same nav, same footer, same Coral material throughout (tier cards use `.stock`/`.board` surfaces, the billing-cycle switcher uses the theme's `--press-groove`).
