# PRD: blog.analisia.id
**Performance Marketing Agency Blog**
Version 2.0 — June 2026

---

## 1. Overview

### Product Summary

A high-performance, SEO-optimized blog for Analisia — a performance marketing agency — built on Hugo, managed via Decap CMS, hosted on Cloudflare Pages, and powered by Resend for email delivery.

**Scope:** Public blog in English with a weekly newsletter and site search. No paid membership, no content gating, no member accounts.

**URL:** blog.analisia.id

### Goals

| Priority | Goal | Success Metric |
|---|---|---|
| 1 | Grow newsletter subscriber base | Email signups month-over-month |
| 2 | Grow newsletter open rate | Open rate > 40% |
| 3 | Deliver a clean, readable experience | Avg. time on page > 3 min |
| 4 | Rank for performance marketing keywords | Organic traffic growth; Core Web Vitals all green |

---

## 2. Tech Stack

| Layer | Technology | Reason |
|---|---|---|
| Static Site Generator | **Hugo** | Fastest build times, excellent SEO control |
| CMS | **Decap CMS** | Git-based, no database |
| Hosting & CDN | **Cloudflare Pages** | Free tier, global CDN, Workers integration |
| Email / Newsletter | **Resend** | Modern API, reliable deliverability |
| DNS | **Cloudflare DNS** | Zero-latency routing |
| Subscribe Handler | **Cloudflare Worker** | Single Worker for `/api/subscribe` — no auth or payment logic needed |
| Image Optimization | **Hugo pipes** (WebP) | Lazy-load, responsive srcsets, zero CDN cost |
| Search | **Pagefind** (Phase 3) | Static, privacy-first |

---

## 3. Information Architecture

### URL Structure

```
blog.analisia.id/
├── /                          ← Blog home
├── /[category]/[slug]/        ← Single post
├── /about/                    ← About
└── /subscribe/                ← Subscribe page
```

### Hugo Project Structure

```
content/
├── posts/
│   └── YYYY-MM-DD-slug.md
├── _index.md
├── about.md
└── subscribe.md

layouts/
├── _default/
│   ├── baseof.html
│   ├── list.html
│   └── single.html
├── partials/
│   ├── header.html
│   ├── footer.html
│   ├── toc.html
│   ├── subscribe-cta.html
│   └── post-card.html
└── index.html

assets/
├── css/
└── js/
```

---

## 4. Page Specifications

### 4.1 Blog Home (`/`)

**Layout:**
- Sticky nav header: Logo left, Pagefind search bar right
- Hero: Heading, subtitle, email subscribe input + submit button
- Featured section: Single-column card list, max 3 posts tagged `featured: true`
- Post list: Tabbed category filter → paginated table-style rows
- Footer

---

### 4.2 Single Post (`/[category]/[slug]/`)

**References:** `table_of_content.png`, `font-styling.png`

**Layout — Desktop:**
- Sticky nav header: Logo left, Pagefind search bar right
- Post header: Category breadcrumb, Title, Subtitle, Author, Date, Read time
- Two-column reading layout:
  - Left sidebar (sticky, ~280px): Auto-generated TOC from H2/H3; active heading highlighted in brand accent
  - Right main column (~680px): Post body
    - Cover image (full-width, lazy-loaded) — sits inside the post body column, below the post header
- Inline subscribe CTA block at mid-post
- "Read next" block at bottom (same-category posts)

**Layout — Mobile:**
- Single column, full width
- Sticky nav header: Logo left, Pagefind search icon right (expands inline)
- Post header: Category breadcrumb, Title, Subtitle, Author, Date, Read time
- Cover image (full-width, lazy-loaded)
- Collapsible TOC toggle (collapsed by default, expands inline above the post body)
- Post body
- Inline subscribe CTA block at mid-post
- "Read next" block at bottom (same-category posts)

**Frontmatter schema:**
```yaml
---
title: "Article Title"
description: "SEO description max 155 characters"
date: 2026-06-28
lastmod: 2026-06-28
author: "Author Name"
categories: ["Guide"]
tags: ["performance marketing", "google ads"]
cover: /images/cover.jpg
featured: false
draft: false
readingTime: true
toc: true
---
```

---

### 4.3 Subscribe Page (`/subscribe/`)

**Layout:**
- Sticky nav header: Logo left, Pagefind search bar right
- Headline + value proposition
- Benefit list: what subscribers get (weekly digest)
- Name + email form → POST `/api/subscribe`
- Inline success state on submit (no redirect)

**Opt-in:** Single opt-in — applies to all subscribe entry points (hero form, inline mid-post CTA, and standalone Subscribe page). Subscriber is added to Resend audience immediately on submit with no confirmation email step.

---

### 4.4 About (`/about/`)

- Sticky nav header: Logo left, Pagefind search bar right
- Standard markdown content page
- No special components beyond nav header and footer

---

## 5. Newsletter & Subscribe Flow

**Cadence:** Weekly digest.

```
[Visitor submits subscribe form]
        ↓
POST /api/subscribe { email, name }
        ↓
CF Worker:
  1. Validates input
  2. Adds contact to Resend audience
  3. Sends welcome email
        ↓
[Inline success message — "Thanks! Check your inbox."]
        ↓
[Subscriber receives weekly digest]
```

### Email Templates

| Trigger | Template |
|---|---|
| Welcome — new subscriber | `welcome` |
| Weekly digest | `newsletter-weekly` |

### CF Worker — `/api/subscribe`

```
POST /api/subscribe
Body: { email, name }

→ Validate: email format
→ Resend: createContact({ email, firstName: name, audienceId })
→ Resend: sendEmail({ template: welcome, to: email })
→ Return 200 { success: true }
```

Rate-limited by CF WAF and protected by CF Turnstile on the form.

---

## 6. SEO Requirements

| Element | Requirement |
|---|---|
| Meta title | `{Post Title} — Analisia Blog` |
| Meta description | From frontmatter `description` |
| OG / Twitter cards | Auto-generated; `og:locale` = `en_US` |
| Canonical URL | Self-referencing |
| Sitemap | Single sitemap; submitted to GSC |
| robots.txt | Allow all; list sitemap |
| Schema.org | `Article` JSON-LD with `inLanguage: en` |
| Slug structure | `/guides/post-name/` |
| Core Web Vitals | LCP < 2.0s, CLS < 0.1, INP < 200ms |
| Internal linking | "Read next" links |

---

## 7. Design System

**Reference:** Bear/Lettera reading layout

| Token | Value |
|---|---|
| Brand accent | `#FF4C1E` |
| Text primary | `#111111` |
| Text secondary | `#666666` |
| Background | `#FFFFFF` |
| Border / divider | `#E5E5E5` |
| Font — Headings | Plus Jakarta Sans, Bold |
| Font — Body | Inter, Regular 18px, line-height 1.75 |
| Font — Code | JetBrains Mono |
| Max content width | 680px (post body) |
| TOC sidebar width | 260px |
| Page max-width | 1200px |
| Border radius | 8px (cards), 4px (inputs/buttons) |
| Dark mode | Not supported |

**Components:**
- **Nav header:** Sticky, full-width. Logo left, Pagefind search bar right (collapses to icon on mobile)
- **Subscribe CTA block:** Inline mid-post strip with email input; also appears in hero and as standalone Subscribe page. Single opt-in on all entry points
- **Post card:** Category label, title, author, date, read time. Max 3 `featured: true` cards appear in the single-column featured section

---

## 8. Performance Targets

| Metric | Target |
|---|---|
| Lighthouse Performance | ≥ 95 |
| Lighthouse SEO | ≥ 95 |
| Lighthouse Accessibility | ≥ 90 |
| TTFB | < 200ms |
| LCP | < 2.0s |
| Total page weight (avg post) | < 400KB |
| Hugo build time | < 20 seconds |

---

## 9. Cloudflare Setup Checklist

- [ ] CF Pages project connected to GitHub
- [ ] Build command: `hugo --minify`
- [ ] Build output: `public/`
- [ ] `HUGO_VERSION=0.127.0` env var
- [ ] Custom domain: `blog.analisia.id` → CF Pages
- [ ] SSL: Auto
- [ ] Worker `subscribe-handler` → `/api/subscribe`
- [ ] Secret: `RESEND_API_KEY`
- [ ] SPF, DKIM, DMARC on analisia.id via Resend DNS setup
- [ ] WAF rate-limit rule on `/api/subscribe`
- [ ] CF Turnstile on subscribe form
- [ ] CF Web Analytics enabled
- [ ] Cache rules: HTML 1 hour, static assets 1 year, `/api/*` no cache

---

## 10. Development Phases

### Phase 1 — Foundation (Week 1–2)

- Hugo project init (English)
- Design system: CSS variables, typography (Plus Jakarta Sans + Inter, light-only)
- Nav header partial (logo + Pagefind search)
- Footer partial
- Homepage layout (hero, featured section, post list)
- Single post layout with sticky TOC sidebar (desktop) + collapsible TOC toggle (mobile)
- Decap CMS config
- Deploy to Cloudflare Pages with custom domain

### Phase 2 — Newsletter & SEO (Week 3)

- CF Worker `/api/subscribe` with Resend integration
- Welcome email template
- Subscribe CTA partial (hero + inline mid-post)
- Standalone subscribe page
- Hugo SEO partials: meta, OG, JSON-LD
- Image optimization pipeline (Hugo pipes → WebP)
- CF Turnstile on subscribe form
- WAF rate-limit on `/api/subscribe`

### Phase 3 — Polish & Launch (Week 4)

- Category/tag archive pages
- "Read next" block
- Social share buttons
- Mobile responsive audit (collapsible TOC, subscribe form, search icon)
- Lighthouse audit + Core Web Vitals fixes
- Seed 5–10 posts via Decap CMS
- Soft launch; submit sitemap to Google Search Console
- Pagefind index build + search UI in nav header

---

## 11. Risks & Mitigations

| Risk | Mitigation |
|---|---|
| Newsletter emails land in spam | Configure SPF, DKIM, DMARC via Resend; warm up sending domain before launch |
| Subscribe Worker hit by bots | CF Turnstile + WAF rate-limit on `/api/subscribe` |
| Resend rate limits on broadcast day | Monitor dashboard |

---

## Appendix A — Page Wireframes
*See companion file: `wireframes-analisia-blog.html`*

Screens:
1. Blog Home (`/`)
2. Single Post with TOC sidebar + inline subscribe CTA
3. Subscribe page (standalone)
4. About page

---

*Document owner: Analisia Team | Version: 2.0 | Status: Ready for Phase 1*
