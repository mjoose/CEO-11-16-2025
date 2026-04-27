# Adpar Construction — Website

A four-page marketing site for Adpar Construction, a residential renovation general contractor in Palm Beach and Miami.

This README is the project brief. Read it before generating any code, copy, or design. Every prompt to Cursor should reference this document and `/design.md` for context.

---

## What this site is

A small, principled marketing site whose only job is to make architects and designers feel confident enough about Adpar's operational discipline to send a serious project inquiry.

The site does not have a blog, a CMS, a client portal, e-commerce, or any authenticated areas. It is four content pages, statically rendered, fast.

## What this site is not

- Not a portfolio site (Adpar is a new firm; there is no completed project work to show yet)
- Not a generic GC site (no service category grids, no stock photography, no testimonial carousels at launch)
- Not a SaaS-styled site (no gradient hero backgrounds, no marquee text strips, no animated stat counters)

If a pattern is on every other contractor's website in Florida, it does not belong on this one.

---

## Stack

- **Framework:** Astro
- **Styling:** Tailwind CSS
- **Hosting:** Cloudflare Pages or Netlify (deploy from GitHub on push)
- **Content:** Markdown files in `/src/content/`, consumed via Astro content collections
- **Images:** Local files in `/src/assets/` (founder headshots, eventual hero image, redacted document samples)
- **Forms:** None at launch (contact page is three exposed mailto links)
- **JavaScript:** Minimal. Astro ships HTML by default; client-side JS only where strictly necessary (and at launch, it isn't necessary anywhere).

## Why this stack

Astro produces static HTML for content sites and ships almost no JavaScript by default. For a four-page brochure site with no interactivity, this means sub-second load times, 100 Lighthouse scores with minimal effort, free hosting, and a maintainable codebase. Next.js would ship a React runtime for a site that doesn't need React.

---

## Brand brief

### Audience standard

The site is written to **architects and designers**. Homeowners and commercial/developer prospects also use the site, but architects are the demanding reader — writing to their standard pulls everyone else up.

### Project tier

**$250k–$1M residential renovations.** Not estate-tier. Not handyman-tier. The bread-and-butter band where architect-referred work lives.

### Geography

**Palm Beach + Miami.** South Florida only. No Naples, no Tampa, no Orlando.

### Voice

**Warm, direct, grounded.** Lean residential service brand — not editorial, not institutional, not consumer-soft.

The voice should feel like a senior project manager talking to an architect over coffee: knowledgeable, plainspoken, confident without swagger, never marketing-flavored. Sentences are short to medium. Words are concrete.

What the voice is not:
- Not architectural-monograph editorial ("a meditation on craft")
- Not corporate ("we deliver world-class solutions")
- Not consumer-soft ("we'd love to help with your dream home")
- Not technical jargon for jargon's sake

### Brand thesis

**Adparavimus** — Latin for *we have prepared.*

The thesis: **most of what goes wrong on a renovation goes wrong because something wasn't decided early enough.** Adpar's entire operating model is built around closing those gaps before they open. Every page of the site is, in some sense, an instance of that thesis.

### What the site competes on

Not portfolio depth (none yet). Not aesthetic finish (no project photography yet). Not size or legacy (new firm).

The site competes on **operational visibility**: every artifact, document, and cadence an architect would normally have to vet through a series of phone calls is shown on the site before the call happens. The proof is in the *legibility of the operation*.

### Founders

**Cesar Osella** — Co-founder. 15 years of field experience across high-end residential and complex commercial renovations. Leads estimating, scope, and owner–architect coordination.

**Varush [Last Name]** — Co-founder. 10 years as a corporate auditor before transitioning to construction. Leads project execution, quality control, and documentation discipline.

Both have provided headshots (circular, black & white). Use them on the How We Work page in the founders section.

---

## Site architecture

Four pages, in this nav order:

```
1. Home              (/)
2. How we work       (/how-we-work)
3. Documents         (/documents)
4. Contact           (/contact)
```

No portfolio tab. No "current work" tab at launch (will be added later when the first project is permission-cleared and shootable).

### Page purposes

- **Home** — Trailer for the rest of the site. Brand thesis, qualification, deliverables list, team intro, contact CTA. Goal: make the reader click into How We Work.
- **How we work** — The strongest selling page. A 7-step walkthrough of a real project, from pre-bid site walk to closeout binder. Includes founder bios at the bottom.
- **Documents** — Gallery of operational artifacts (9 documents) with redacted sample images. Includes "operational backbone" (license, insurance) at the bottom.
- **Contact** — Three exposed email addresses (architects, homeowners, commercial), no form, no phone numbers.

---

## Content file structure

Copy lives in `/src/content/pages/` as markdown files, one per page:

```
/src/content/pages/
  home.md
  how-we-work.md
  documents.md
  contact.md
```

The locked copy for each page is provided separately as `.md` files. Cursor should consume these via Astro content collections — copy is not hardcoded into components.

Frontmatter on each markdown file should include:
- `title` (page title for `<title>` tag and og:title)
- `description` (meta description, ~155 chars)
- `slug` (URL slug)

Component-level structure (hero, sections, lists, founder cards, document cards) lives in `/src/components/`. Components consume content from the markdown files via Astro's content layer.

---

## Visual assets

### Available at launch

- **Two founder headshots** (`cesar.png`, `varush.png`) — circular, black & white, on white background. Provided.

### Required before launch

- **One hero image for the Home page.** Real photography — a job site moment, founders on site, or a specific architectural detail. Not stock. If real photography is not available, the site does not launch until it is. (See `/design.md` for hero treatment.)
- **Three to five redacted document samples** for the Documents page. Highest priority: weekly site report, line-item estimate, CSI scope of work. The Documents page launches with the rest of the artifacts shown as titled placeholders with "Sample in preparation" framing.

### Can be added post-launch

- Remaining document samples (page is built to accommodate them as they're prepared)
- Additional artifact images on How We Work
- Later: Current Work page, when the first project is permission-cleared

---

## Build sequence

Recommended order for Cursor prompts:

1. **Project scaffold.** Astro + Tailwind + content collections. Install Tailwind, configure `astro.config.mjs`, set up the content collection schema for pages.
2. **Design tokens.** Implement the type stack, color palette, and spacing scale from `/design.md` as Tailwind theme extensions in `tailwind.config.mjs`.
3. **Layout shell.** Top-level `Layout.astro` with `<head>`, nav, footer, and a content slot. Nav is text-only, no logo image at launch (or use a wordmark if one exists).
4. **Components in this order:** Hero, ProseSection, DeliverablesTable, ProcessStep, FounderCard, DocumentCard, EmailCard.
5. **Pages in this order:** Home → How we work → Documents → Contact. Build Home first to validate the design system at scale; the other three pages reuse most of the same components.
6. **Polish pass.** Responsive behavior, focus states, link colors, hover treatments, reduced-motion preferences.
7. **Performance and SEO pass.** Image optimization (Astro's `<Image>` component), per-page meta, Open Graph tags, sitemap, robots.txt.
8. **Deploy.** Cloudflare Pages or Netlify, custom domain.

---

## Hard "do not" rules for the build

These come up repeatedly in default AI-generated marketing sites and should never appear in this build:

- **No stock photography of any kind.** Not Unsplash, not Pexels, not generative AI imagery posing as real. If a real photograph isn't available, leave the space empty or use typography/whitespace instead.
- **No marquee text strips, scrolling tickers, or animated headlines.**
- **No animated stat counters** (the current site has these and they're broken showing zeros — do not replicate).
- **No four-tile service grids** ("Residential / Remodeling / Commercial / Outdoor"). The Home page replaces this with the deliverables table.
- **No anonymous testimonials.** Either named, attributable endorsements with permission, or no testimonial section at all. At launch: no testimonial section.
- **No phone numbers anywhere on the site.** Not in the hero, not in the footer, not on contact. Deliberate.
- **No contact form.** Three exposed mailto: links only.
- **No portfolio or "showcase" section.** Even a placeholder.
- **No emojis in body copy.** Acceptable in nothing.
- **No "Lorem ipsum" or filler copy** during build. Use the real content from the markdown files. If a section's copy isn't ready, skip the section entirely.
- **No gradient hero backgrounds.** No animated SVG blobs. No "modern SaaS" visual tropes.
- **No social media icons** (Adpar doesn't have a social presence yet, and adding empty icons reads as desperate).

---

## Open items still to be resolved

These are content gaps the build should accommodate but that are not yet filled:

- Varush's last name (drop into `how-we-work.md` founder section when known)
- Florida CGC license number (drop into `documents.md` operational backbone and footer when known)
- Hero image file (required before launch)
- 3–5 redacted document samples (required before launch)
- 4–6 additional document samples (can be added post-launch)

---

## Success criteria for the launch site

When the site goes live, an architect or designer landing on it for the first time should come away with this impression:

> *A small, principal-led firm in Palm Beach and Miami, founded by two operators with complementary backgrounds — fifteen years of construction execution and ten years of process auditing. Their thesis is that renovation outcomes are decided in preparation, and the website is itself an artifact of that preparation: every page shows real operational substance instead of marketing flourish.*

If the site reads as templated, generic, or "another contractor website," the build has failed regardless of how technically clean it is.
