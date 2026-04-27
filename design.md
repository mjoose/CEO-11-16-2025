# Adpar Construction — Design System

This document defines the visual language for adparconstruction.com. Every component, page, and layout decision should be checked against this document before being built.

The brief in `/README.md` defines *what* the site says. This document defines *how it looks while saying it*.

---

## Design intent in one paragraph

The site looks like the firm: lean, deliberate, confident without ornament. Generous whitespace, restrained typography, almost no decoration. A reader who scrolls the site should feel that the design is *getting out of the way of the content* — because the content (the operational substance, the documentation, the discipline) is the proof, and the design's job is to frame it cleanly, not perform alongside it.

The visual reference points are quiet, content-led service brands — not architectural-monograph editorial, not consumer-friendly Squarespace warmth, not modern SaaS marketing. Think: a thoughtfully-set technical journal, or a small architecture practice's portfolio site at its most restrained.

---

## Color palette

Five colors total. Restraint is the whole point.

```
--color-ink:        #1A1A1A   /* Primary text, headlines */
--color-ink-soft:   #4A4A4A   /* Secondary text, captions */
--color-paper:      #FAFAF7   /* Page background — warm off-white, never pure white */
--color-rule:       #E5E3DD   /* Borders, dividers, table rules */
--color-accent:     #8B6F47   /* Single accent — links, focus states, small highlights */
```

### Usage rules

- **Background is always `--color-paper`.** Pure white (`#FFFFFF`) is forbidden anywhere on the site. The warmth of `#FAFAF7` is a small but consistent signal that this isn't a generic template.
- **Body text is `--color-ink` (#1A1A1A), never pure black.** Pure black (`#000000`) is forbidden in body copy.
- **Accent color is used sparingly.** Reserved for: text links, focus rings, the small CTA arrows, and active nav states. Never as a background fill, never as a button color, never on more than ~3% of the page surface.
- **No gradients. No drop shadows. No glows.** A border or a hairline rule does the same job with more discipline.

### Do not introduce

- No additional colors without removing an existing one (palette stays at 5)
- No "success green" or "error red" (the site has no forms or states that need them)
- No tonal variations of the accent (no light brown, no dark brown — one accent, one value)

---

## Typography

Two typefaces. One serif, one sans. Both must be self-hosted via `@fontsource` packages — no Google Fonts CDN, no FOIT.

### Type stack

```
Display + headings:  "Söhne" or fallback to "Inter"
Body + UI:           "Söhne" or fallback to "Inter"
```

For the launch build, **use Inter for everything** (single typeface, lightest possible loading footprint). Inter at varying weights and sizes carries the entire visual hierarchy. If a budget for a paid display face becomes available later, the upgrade path is to swap headlines to a more distinctive sans (Söhne, GT America, ABC Diatype) without touching the rest of the system.

```
Install: @fontsource-variable/inter
Weights used: 400 (regular), 500 (medium), 600 (semibold)
```

### Type scale

A modest scale. No hero text larger than 64px. No body text smaller than 16px.

```
--text-display:   3.5rem  / 56px / line-height 1.05 / weight 500 / tracking -0.02em
--text-h1:        2.5rem  / 40px / line-height 1.15 / weight 500 / tracking -0.015em
--text-h2:        1.75rem / 28px / line-height 1.25 / weight 500 / tracking -0.01em
--text-h3:        1.25rem / 20px / line-height 1.35 / weight 600 / tracking 0
--text-body-lg:   1.1875rem / 19px / line-height 1.6 / weight 400
--text-body:      1rem    / 16px / line-height 1.65 / weight 400
--text-small:     0.875rem / 14px / line-height 1.5 / weight 400
--text-caption:   0.8125rem / 13px / line-height 1.45 / weight 500 / tracking 0.04em / uppercase
```

### Typography rules

- **Display weight is 500, not 700.** Bold headlines read as marketing-loud; medium-weight headlines read as confident-quiet. This is one of the highest-leverage decisions in the system.
- **Negative letter-spacing on display and h1.** Slightly tighter tracking makes large type feel more deliberate.
- **Body line-height is 1.65.** Generous, for readable long-form (the How We Work page especially).
- **Body line-length capped at 65 characters.** Use `max-width: 65ch` on prose containers. Wider lines in long-form prose are a readability problem at the architect-tier reading speed we're designing for.
- **Captions are uppercase, tracked +4%, weight 500, 13px.** Used for section labels, document titles in the gallery, founder role labels.
- **Italics only for genuine emphasis or foreign-language words** (e.g., *adparavimus*). Never for decoration.

---

## Spacing system

Tailwind's default 4px base unit. Use the scale; don't invent values.

### Vertical rhythm

Section spacing is generous — the site uses whitespace as a structural element, not as filler.

```
Section vertical padding (desktop):  py-32  (128px top + bottom)
Section vertical padding (mobile):   py-20  (80px top + bottom)
Inter-paragraph spacing in prose:    mb-6   (24px)
Header-to-paragraph spacing:         mt-12 mb-4
List item vertical spacing:          mb-3
```

### Horizontal layout

Three container widths, used consistently:

```
--container-prose:    max-w-2xl   (672px) — long-form text on How We Work
--container-content:  max-w-4xl   (896px) — most page content
--container-wide:     max-w-6xl   (1152px) — hero, full-bleed sections
```

Pages use `--container-content` by default. Prose-heavy sections (How We Work step descriptions, the Adparavimus thesis on Home) narrow to `--container-prose`. The hero on Home extends to `--container-wide`.

Horizontal page padding: `px-6` on mobile, `px-12` on desktop. Containers are centered with `mx-auto`.

---

## Components

### Layout shell

- **Top nav.** Text-only at launch. Adpar wordmark on the left (text "Adpar" in display font, weight 500), four nav links on the right ("How we work / Documents / Contact"). Sticky on scroll, with a 1px hairline border-bottom in `--color-rule` that only appears once the user has scrolled past the hero. No mobile hamburger menu — at launch, four short nav items fit on a phone with a smaller font size.
- **Footer.** Two lines. Line 1: "Adpar Construction — Palm Beach · Miami". Line 2: "Florida-licensed Certified General Contractor, fully insured." Centered, `--text-small`, `--color-ink-soft`. No social icons. No newsletter signup. No "back to top" button.

### Hero (Home page only)

- Full-bleed background image (real photograph — see `/README.md` for asset requirements).
- Overlay: a subtle dark gradient from bottom (40% opacity) fading to transparent at 50% height — used only to ensure text legibility, never as a decorative effect.
- Text positioned in the lower-left of the hero, max-width 720px.
- Headline ("Built on preparation.") in `--text-display`, color paper.
- Subhead ("The work that decides a renovation happens before construction starts. We're built around that fact.") in `--text-body-lg`, color paper, weight 400.
- Single CTA ("See how we work →") as a text link with the accent color underline on hover, never a filled button.
- Hero height: 80vh on desktop, 60vh on mobile. Never 100vh — the user should see the next section's edge to know there's more below.

### ProseSection

A container for long-form text on How We Work and the Adparavimus block on Home.

- `max-w-2xl` (65ch effective)
- Headings in `--text-h2` or `--text-h3`
- Paragraphs in `--text-body` with `mb-6`
- Section vertical padding `py-20` to `py-32`
- Optional eyebrow caption above the headline (`--text-caption`, `--color-ink-soft`)

### DeliverablesTable (Home — "What we deliver" section)

A two-column table without visible cell borders. Left column: the artifact name in `--text-body` weight 600. Right column: the description in `--text-body` weight 400, `--color-ink-soft`. 1px `--color-rule` divider between rows only (no vertical lines). Generous row padding (`py-5`). On mobile, rows stack: artifact name above description.

### ProcessStep (How We Work — the 7 steps)

Each step is a numbered block. The number ("1." through "7.") sits in `--text-h2`, accent color, with significant whitespace separating it from the step title. Step title is `--text-h2`, `--color-ink`. Body is `--text-body` in a `--container-prose` width. If an artifact image accompanies the step, it appears below the prose, full container-prose width, with a 1px `--color-rule` border. Caption beneath the image in `--text-small`, `--color-ink-soft`, italic.

### FounderCard

Two cards side-by-side on desktop, stacked on mobile. Each card: circular headshot at 160px diameter, name in `--text-h3`, role label in `--text-caption` `--color-accent`, bio paragraph in `--text-body`. Cards are not visually bounded — no border, no background color, no shadow. Generous gap between cards (`gap-16` on desktop).

### DocumentCard (Documents page)

Each numbered document is a horizontal block. Number ("1." through "9.") in `--text-h2`, `--color-accent`. Document name in `--text-h3`. One- or two-sentence description in `--text-body`. Below: either an artifact image (1px `--color-rule` border, full container-content width) or a "Sample in preparation" placeholder block. The placeholder is a muted gray rectangle (background `--color-rule` at 30% opacity) with the document name centered inside in `--text-caption` `--color-ink-soft`. Same dimensions as a real artifact image so the page rhythm holds whether the artifact is present or pending.

### EmailCard (Contact page)

Three cards stacked vertically. Each card: audience label in `--text-caption` `--color-accent`, email address in `--text-h3`, weight 500, displayed as a `mailto:` link with `--color-ink` color and an underline on hover. No icons, no decoration, no card backgrounds.

---

## Imagery treatment

### Photography

When real photography is added (hero, eventual project documentation, future Current Work page):

- Black and white only at launch, or a very desaturated color treatment if B&W feels too austere
- 1px `--color-rule` border on inline images (not on the hero)
- No drop shadows, no rounded corners on rectangular images, no filters or overlays
- Image captions in `--text-small`, `--color-ink-soft`, italic, mt-2

### Headshots

Already provided: Cesar and Varush. Circular, black and white, white background. Used as-is. Do not crop, recolor, or apply effects.

### Document samples

When redacted document images are added to the Documents page:

- Treat them as photographs of documents — slight perspective is fine, suggesting a real document on a real desk
- Or as flat scans with a 1px border
- Pick one treatment and apply it consistently to all 9 artifact images

---

## Motion

Almost none.

- **Page transitions:** instant. No fade-ins, no page-load animations.
- **Scroll-triggered animations:** none. No reveal-on-scroll, no parallax, no progressive reveals.
- **Hover states:** subtle. Underlines appear/thicken on link hover. Nav items shift opacity slightly. That's it.
- **Focus states:** must be visible. 2px solid `--color-accent` outline with `outline-offset: 2px`. Never `outline: none` without a visible replacement.
- **Reduced motion:** respect `prefers-reduced-motion: reduce`. Disable any animation that exists (currently almost none anyway).

The principle: motion has to *earn* its presence. On this site, nothing earns it. A site that's perfectly still feels confident; a site full of small animations feels like it's trying to keep your attention.

---

## Responsive behavior

Mobile-first construction. The site must look and read excellently on a 375px-wide phone screen.

### Breakpoints (Tailwind defaults)

- `sm`: 640px
- `md`: 768px
- `lg`: 1024px (most desktop layouts kick in here)
- `xl`: 1280px

### Mobile-specific rules

- Display headlines drop to `--text-h1` size on mobile (40px instead of 56px)
- Section padding reduces to `py-20` from `py-32`
- Founder cards stack vertically with a `gap-12` between them
- Hero text container narrows; CTA stays as a text link, never becomes a fixed button
- Nav remains horizontal (no hamburger) — the four short labels fit at a smaller font size

---

## Accessibility (non-negotiable)

- Color contrast: all text passes WCAG AA at minimum (the palette above is designed for this; do not introduce colors that don't pass)
- Focus states visible on every interactive element
- Semantic HTML: `<nav>`, `<main>`, `<article>`, `<section>` used correctly
- Headings in proper hierarchical order (no h3 before h2)
- All images have alt text; decorative images use `alt=""` and `role="presentation"`
- Email links use `mailto:` and have visible focus states
- Page must be fully navigable via keyboard

---

## Anti-patterns (do not build any of these)

The cumulative list of "things default AI-generated marketing sites do that this site does not." Most of these are also in `/README.md`; gathered here for the design context.

- Gradient hero backgrounds (purple-to-pink, blue-to-teal, anything)
- Animated SVG blobs or shapes
- Floating illustration elements
- "Modern SaaS" pill-shaped CTAs with arrow icons
- Filled colored buttons (links and underlines do this work instead)
- Drop shadows on cards
- Hover-elevation effects (cards that "lift" on mouseover)
- Three-column "Why us" feature grids with icons
- Animated number counters
- Auto-playing video heroes
- Carousels of any kind (testimonials, projects, logos)
- "Trusted by" client logo bars
- Sticky CTA bars at the bottom of the viewport
- Cookie consent banners with branded styling (use a minimal default if needed)
- Live chat widgets
- Newsletter signup forms in the footer
- Social media icon clusters
- Phone numbers visible anywhere on the public site

If a pattern feels like it would appear on a Webflow template gallery, it does not belong on this site.

---

## When to deviate

This document is the standard, not a contract. Real design judgment sometimes requires departing from a system. The rule for deviation:

**A deviation is acceptable only if you can articulate, in one sentence, why the system as written produces a worse outcome for this specific case.** "It would look more interesting" is not a reason. "The eye needs a resting point here that the current spacing doesn't provide" is.

When in doubt, choose the more restrained option. The site's competitive position is built on restraint; defaulting to restraint defaults to brand.
