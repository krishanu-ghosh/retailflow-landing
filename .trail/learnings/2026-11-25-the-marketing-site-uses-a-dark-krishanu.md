---
title: "The marketing site uses a dark Midnight + brass theme, not Hallmark's light Coral theme"
author: Krishanu-ghosh
date: 2026-11-25
branch: main
cost: { minutes: 1, tokens: 1028 }
id: l-67974e0d
scope: repo
status: active
src: agent
touches:
  - tokens.css
  - styles.css
  - design.md
---

## Decided
The owner asked for a premium look instead of Hallmark's warm-white Coral theme, and picked Midnight + brass over a light indigo editorial option and a mixed dark-hero/light-body option. All pages that share the site stylesheet (index, pricing, privacy, terms, 404) are dark.
The two invoice cards (hero and "One bill") deliberately stay lit cotton paper on the dark desk. They are the signature object, so don't turn them into dark panels.
Brass comes from the logo's turmeric slip. Primary actions are brass with dark type.

## Watch out
The standard logo disappears on dark (its thread and "Retail" are ink). Dark pages must use the -reversed lockups, and the brand README now allows that one recolour.
A Hallmark re-run reads the design doc first. Keep the theme line there, or it may deal Coral back.
The docs pages (user manual, business guide, demo playbook, test suite) have their own styles and were not changed.

In the code: tokens.css (colour roles), styles.css "SURFACES (Midnight + brass)" block, where .doc.stock/.post-bill.stock/.card-peek.stock re-scope --color-ink/--color-rule/--color-muted back to light-paper values; brand/lockups/*-reversed.svg (#1D1614 → #F1ECE4); design.md Theme line.
