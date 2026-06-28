# PRD: blog.analisia.id
**Performance Marketing Agency Blog**
Version 1.6 — June 2026

---

## Changelog

| Version | Date | Changes |
|---|---|---|
| 1.0 | Jun 28, 2026 | Initial PRD |
| 1.1 | Jun 28, 2026 | Added members-only content gating + multi-language (i18n) support |
| 1.2 | Jun 28, 2026 | Added Open Questions section + wireframe reference appendix |
| 1.3 | Jun 28, 2026 | Redesigned subscriber model to follow Ghost.org pattern — reverted in v1.4 |
| 1.4 | Jun 28, 2026 | Reverted to v1.2 subscriber model. Resolved OQ-1 through OQ-4 |
| 1.5 | Jun 28, 2026 | Dropped paid members system and content gating to unblock Phase 3. All OQ-6 through OQ-11 closed. Scope is now: public blog + newsletter only |
| 1.6 | Jun 28, 2026 | Closed OQ-12, OQ-14, OQ-15. All blockers resolved. Featured posts: single-column. About page: no stats panel. |

---

## Open Questions

All open questions resolved or closed.

| # | Question | Status |
|---|---|---|
| OQ-1 | Dark mode? | ✅ Light-only |
| OQ-2 | Brand fonts confirmed? | ✅ Plus Jakarta Sans + Inter |
| OQ-3 | How many nav links? | ✅ 3 links — exact labels (ID + EN) still needed before Phase 1 build |
| OQ-4 | Newsletter frequency & format? | ✅ Weekly digest |
| OQ-5 | Double opt-in or single opt-in? | ✅ Single opt-in — subscribe form submits directly, no confirmation email step |
| OQ-6 | Payment processor? | ✅ Closed — no payments in scope |
| OQ-7 | Membership pricing model? | ✅ Closed — no paid tier in scope |
| OQ-8 | Free member tier? | ✅ Closed — all content is public; newsletter signup is the only conversion action |
| OQ-9 | Gate detection method? | ✅ Closed — no content gating in scope |
| OQ-10 | Password reset flow? | ✅ Closed — no member auth in scope |
| OQ-11 | Member account page? | ✅ Closed — no member accounts in scope |
|| OQ-12 | Flair reference: use vs. adapt vs. ignore? | ✅ Designs are source of truth — Flair ignored |
|| OQ-13 | Gate overlay: full-bleed or contained? | ✅ Closed — no gating in scope |
|| OQ-14 | Language switcher placement on mobile? | ✅ Top bar, next to hamburger menu |
|| OQ-15 | Exact nav link labels (ID + EN)? | ✅ ID: Artikel / Kategori / Tentang · EN: Articles / Categories / About |

**All open questions resolved. No blockers remain before Phase 1.**

---

## 1. Overview

### Product Summary

A high-performance, SEO-optimized blog for Analisia — a performance marketing agency — built on Hugo, managed via Decap CMS, hosted on Cloudflare Pages, and powered by Resend for email delivery.

**Scope:** Public blog with bilingual content (ID + EN) and a weekly newsletter. No paid membership, no content gating, no member accounts.

**URL:** blog.analisia.id

### Goals

| Priority | Goal | Success Metric |
|---|---|---|
| 1 | Grow newsletter subscriber base | Email signups month-over-month |
| 2 | Grow newsletter open rate | Open rate > 40% |
| 3 | Deliver a clean, readable experience | Avg. time on page > 3 min |
| 4 | Rank for performance marketing keywords in ID + EN | Organic traffic growth per locale; Core Web Vitals all green |

### Out of Scope

- Paid membership / content gating (moved to v2)
- Member accounts, login, auth
- Comments system
- Custom analytics dashboard
- Social login
- Machine-translated content (all translations are human-authored)
- Dark mode

---

## 2. Tech Stack

| Layer | Technology | Reason |
|---|---|---|
| Static Site Generator | **Hugo** | Fastest build times, native i18n, excellent SEO control |
| CMS | **Decap CMS** | Git-based, no database, i18n collection support |
| Hosting & CDN | **Cloudflare Pages** | Free tier, global CDN, Workers integration |
| Email / Newsletter | **Resend** | Modern API, reliable deliverability, audience segmentation by locale |
| DNS | **Cloudflare DNS** | Zero-latency routing |
| Subscribe Handler | **Cloudflare Worker** | Single Worker for `/api/subscribe` — no auth or payment logic needed |
| Image Optimization | **Hugo pipes** (WebP) | Lazy-load, responsive srcsets, zero CDN cost |
| Search | **Pagefind** (Phase 3) | Static, privacy-first, works per locale |

---

## 3. Information Architecture

### URL Structure

Hugo default language: **Indonesian (id)** — served at root.
Secondary language: **English (en)** — served at `/en/` prefix.

```
blog.analisia.id/
├── /                          ← Blog home (ID)
├── /en/                       ← Blog home (EN)
├── /[category]/[slug]/        ← Single post (ID)
├── /en/[category]/[slug]/     ← Single post (EN)
├── /tentang/                  ← About (ID)
├── /en/about/                 ← About (EN)
├── /berlangganan/             ← Subscribe page (ID)
└── /en/subscribe/             ← Subscribe page (EN)
```

### Hugo Project Structure

```
content/
├── posts/                     ← Indonesian posts (default)
│   └── YYYY-MM-DD-slug.md
├── en/posts/                  ← English posts
│   └── YYYY-MM-DD-slug.md
├── _index.md                  ← Home (ID)
├── en/_index.md               ← Home (EN)
├── tentang.md
└── en/about.md

i18n/
├── id.yaml
└── en.yaml

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
│   ├── lang-switcher.html
│   └── post-card.html
└── index.html

assets/
├── css/
└── js/
    └── lang-redirect.js       ← Auto-detect browser locale on first visit
```

---

## 4. Page Specifications

### 4.1 Blog Home (`/` and `/en/`)

**Reference:** `blog_home.png` (Flair theme — see OQ-12 for adapt/replace decisions)

**Layout:**
- Fixed top navbar: Logo left, 3 nav links center (labels TBD — OQ-15), language switcher (ID | EN) right, subscribe CTA button
- Hero: Heading, subtitle, email subscribe input + submit button (all strings from i18n YAML)
- Featured section: Single-column card list for `featured: true` posts — locale-scoped
- Post list: Tabbed category filter → paginated table-style rows
- Footer: Localized labels; language switcher repeated

**Behaviour:**
- All list pages are automatically locale-scoped by Hugo
- Language switcher links to translated equivalent if it exists, else falls back to that locale's home

---

### 4.2 Single Post (`/[category]/[slug]/`)

**References:** `table_of_content.png`, `font-styling.png`

**Layout:**
- Sticky navbar with language switcher
- Post header: Category breadcrumb, Title, Subtitle, Author, Date, Read time
- Cover image (full-width, lazy-loaded)
- Two-column reading layout:
  - Left sidebar (sticky, ~280px): Auto-generated TOC from H2/H3; active heading highlighted in brand accent
  - Right main column (~680px): Post body
- Inline subscribe CTA block at mid-post
- "Read next" block at bottom (same-locale posts only)

**Frontmatter schema:**
```yaml
---
title: "Judul Artikel"
description: "Deskripsi SEO max 155 karakter"
date: 2026-06-28
lastmod: 2026-06-28
author: "Author Name"
categories: ["Panduan"]
tags: ["performance marketing", "google ads"]
cover: /images/cover.jpg
featured: false
draft: false
readingTime: true
toc: true
translationKey: "post-slug"    # links ID + EN versions for lang switcher
---
```

---

### 4.3 Subscribe Page (`/berlangganan/` and `/en/subscribe/`)

**Layout:**
- Headline + value proposition (localized)
- Benefit list: what subscribers get (weekly digest)
- Name + email form → POST `/api/subscribe`
- Inline success state on submit (no redirect)

**Opt-in:** Single opt-in — subscriber is added to Resend audience immediately on submit.

---

### 4.4 About (`/tentang/` and `/en/about/`)

- Standard markdown content page
- No special components beyond navbar, footer, lang switcher (stats panel was considered but dropped)

---

## 5. Newsletter & Subscribe Flow

**Cadence:** Weekly digest, sent separately per locale.

```
[Visitor submits subscribe form]
        ↓
POST /api/subscribe { email, name, locale }
        ↓
CF Worker:
  1. Validates input
  2. Adds contact to Resend audience with tag locale:id or locale:en
  3. Sends welcome email (localized template)
        ↓
[Inline success message shown — "Terima kasih! Cek email kamu."]
        ↓
[Subscriber receives weekly digest every week]
```

### Resend Audience Segments

| Tag | Who | Gets |
|---|---|---|
| `locale:id` | ID subscribers | Weekly digest (ID) |
| `locale:en` | EN subscribers | Weekly digest (EN) |

### Email Templates

| Trigger | ID template | EN template |
|---|---|---|
| Welcome — new subscriber | `welcome-id` | `welcome-en` |
| Weekly digest | `newsletter-weekly-id` | `newsletter-weekly-en` |

### CF Worker — `/api/subscribe`

Single Worker, single endpoint. No auth, no KV member records needed.

```
POST /api/subscribe
Body: { email, name, locale }

→ Validate: email format, locale is "id" or "en"
→ Resend: createContact({ email, firstName: name, audienceId, tags })
→ Resend: sendEmail({ template: welcome-{locale}, to: email })
→ Return 200 { success: true }
```

Rate-limited by CF WAF and protected by CF Turnstile on the form.

---

## 6. Multi-Language (i18n) System

### Hugo Configuration

`hugo.toml`:
```toml
defaultContentLanguage = "id"
defaultContentLanguageInSubdir = false

[languages]
  [languages.id]
    languageName = "Indonesia"
    languageCode = "id-ID"
    weight = 1
    title = "Blog Analisia"
    [languages.id.params]
      subtitle = "Panduan, studi kasus, dan tips performance marketing"

  [languages.en]
    languageName = "English"
    languageCode = "en-US"
    weight = 2
    contentDir = "content/en"
    title = "Analisia Blog"
    [languages.en.params]
      subtitle = "Guides, case studies, and performance marketing tips"
```

### i18n String Files

`i18n/id.yaml`:
```yaml
subscribe_cta: "Berlangganan Newsletter"
subscribe_placeholder: "Alamat email kamu"
subscribe_button: "Daftar"
subscribe_success: "Terima kasih! Cek email kamu."
read_next: "Baca Selanjutnya"
table_of_contents: "Daftar Isi"
published: "Diterbitkan"
reading_time: "menit baca"
```

`i18n/en.yaml`:
```yaml
subscribe_cta: "Subscribe to Newsletter"
subscribe_placeholder: "Your email address"
subscribe_button: "Subscribe"
subscribe_success: "Thanks! Check your inbox."
read_next: "Read Next"
table_of_contents: "Table of Contents"
published: "Published"
reading_time: "min read"
```

Usage: `{{ i18n "subscribe_cta" }}`

### Language Switcher

`partials/lang-switcher.html`:
```html
{{ range .Translations }}
  <a href="{{ .Permalink }}" lang="{{ .Lang }}">
    {{ .Language.LanguageName }}
  </a>
{{ end }}
{{ if not .IsTranslated }}
  <!-- No translation — link to other locale home -->
{{ end }}
```

Mobile placement: TBD — OQ-14.

### Auto-Locale Redirect

`assets/js/lang-redirect.js` — runs once on first visit:
```js
// Browser locale is ID → stay at /
// Browser locale is non-ID → redirect to /en/
// Set cookie after first redirect; never redirect again
```

### Decap CMS i18n Config

`static/admin/config.yml`:
```yaml
i18n:
  structure: multiple_folders
  locales: [id, en]
  default_locale: id

collections:
  - name: posts
    label: Blog Posts
    folder: content/posts
    i18n: true
    create: true
    slug: "{{year}}-{{month}}-{{day}}-{{slug}}"
    fields:
      - { label: Title,        name: title,          widget: string,   i18n: true }
      - { label: Description,  name: description,    widget: string,   i18n: true }
      - { label: Body,         name: body,           widget: markdown, i18n: true }
      - { label: Tags,         name: tags,           widget: list,     i18n: true }
      - { label: Publish Date, name: date,           widget: datetime, i18n: duplicate }
      - { label: Last Modified,name: lastmod,        widget: datetime, i18n: duplicate }
      - { label: Author,       name: author,         widget: string,   i18n: duplicate }
      - { label: Categories,   name: categories,     widget: list,     i18n: duplicate }
      - { label: Cover Image,  name: cover,          widget: image,    i18n: duplicate }
      - { label: Featured,     name: featured,       widget: boolean,  i18n: duplicate, default: false }
      - { label: Translation Key, name: translationKey, widget: string, i18n: duplicate }
      - { label: Draft,        name: draft,          widget: boolean,  i18n: duplicate, default: false }
      - { label: Show TOC,     name: toc,            widget: boolean,  i18n: duplicate, default: true }
```

### hreflang & Sitemaps

Each post `<head>`:
```html
<link rel="alternate" hreflang="id" href="https://blog.analisia.id/panduan/slug/" />
<link rel="alternate" hreflang="en" href="https://blog.analisia.id/en/guides/slug/" />
<link rel="alternate" hreflang="x-default" href="https://blog.analisia.id/panduan/slug/" />
```

Separate sitemaps: `/sitemap.xml` (ID) and `/en/sitemap.xml` (EN) — both submitted to Google Search Console.

---

## 7. SEO Requirements

| Element | Requirement |
|---|---|
| Meta title | `{Post Title} — Blog Analisia` (ID) / `{Post Title} — Analisia Blog` (EN) |
| Meta description | From frontmatter `description`, localized |
| OG / Twitter cards | Auto-generated; `og:locale` = `id_ID` or `en_US` |
| Canonical URL | Self-referencing; never cross-locale |
| hreflang | On every page; links ID ↔ EN + `x-default` |
| Sitemap | One per locale; both submitted to GSC |
| robots.txt | Allow all; list both sitemaps |
| Schema.org | `Article` JSON-LD with `inLanguage` |
| Slug structure | ID: `/panduan/nama-artikel/` · EN: `/en/guides/post-name/` |
| Core Web Vitals | LCP < 2.0s, CLS < 0.1, INP < 200ms |
| Internal linking | "Read next" links to same-locale posts only |

---

## 8. Design System

**Reference:** Flair theme + Bear/Lettera reading layout (OQ-12 adapt/replace annotations pending)

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
- **Navbar:** Logo left · 3 nav links center (labels TBD — OQ-15) · lang switcher + subscribe CTA right
- **Language switcher:** Minimal text toggle `ID | EN`, active locale underlined. Mobile placement TBD — OQ-14
- **Subscribe CTA block:** Inline mid-post strip with email input; also appears in hero and as standalone subscribe page
- **Post card:** Category label, title, author, date, read time. `featured: true` cards appear in the 2-column hero grid

---

## 9. Performance Targets

| Metric | Target |
|---|---|
| Lighthouse Performance | ≥ 95 |
| Lighthouse SEO | ≥ 95 |
| Lighthouse Accessibility | ≥ 90 |
| TTFB | < 200ms |
| LCP | < 2.0s |
| Total page weight (avg post) | < 400KB |
| Hugo build time (both locales) | < 20 seconds |

---

## 10. Cloudflare Setup Checklist

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

## 11. Development Phases

### Phase 1 — Foundation (Week 1–2)
> **Start when:** OQ-12, OQ-14, OQ-15 resolved

- Hugo project init with i18n config (ID + EN)
- i18n YAML string files
- Design system: CSS variables, typography (Plus Jakarta Sans + Inter, light-only)
- Header (3-link navbar), footer, lang-switcher partials
- Homepage list layout (locale-scoped, featured grid)
- Single post layout with sticky TOC sidebar
- hreflang partial + localized sitemaps
- Decap CMS config with i18n collections
- Deploy to Cloudflare Pages with custom domain

### Phase 2 — Newsletter & SEO (Week 3)
> **Start when:** Phase 1 done

- CF Worker `/api/subscribe` with Resend integration and locale tagging
- Welcome email templates (ID + EN)
- Subscribe CTA partial (hero + inline mid-post)
- Standalone subscribe page
- Hugo SEO partials: meta, OG, JSON-LD with `inLanguage`, hreflang
- Image optimization pipeline (Hugo pipes → WebP)
- CF Turnstile on subscribe form
- WAF rate-limit on `/api/subscribe`

### Phase 3 — Polish & Launch (Week 4)
> **Start when:** Phase 2 done

- Category/tag archive pages (locale-scoped)
- "Read next" block (same-locale posts only)
- Social share buttons
- Mobile responsive audit (lang switcher placement, TOC, subscribe form)
- Lighthouse audit + Core Web Vitals fixes
- Seed 5–10 posts per locale via Decap CMS
- Soft launch; submit both sitemaps to Google Search Console
- Pagefind static search (locale-aware index)

### Phase 4 — Post-Launch (Ongoing)
- Weekly digest broadcasts (separate ID + EN sends via Resend)
- A/B test subscribe CTA copy per locale
- Monitor GSC for both locale properties
- Evaluate v2 scope: paid membership, content gating, member accounts

---

## 12. Risks & Mitigations

| Risk | Mitigation |
|---|---|
| Nav label copy not delivered (OQ-15) | Phase 1 uses placeholder strings; labels must be confirmed before header partial is finalised |
| Designer annotations not delivered (OQ-12) | Phase 1 proceeds with Flair reference as-is; OQ-12 must be resolved before UI review |
| Newsletter emails land in spam | Configure SPF, DKIM, DMARC via Resend; warm up sending domain before launch |
| Subscribe Worker hit by bots | CF Turnstile + WAF rate-limit on `/api/subscribe` |
| Resend rate limits on broadcast day | Stagger ID + EN sends; monitor dashboard |
| Duplicate content across locales | hreflang implemented correctly; unique title/description per locale |
| Translation bottleneck | Prioritise translating top-performing ID posts; Decap auto-creates EN draft on ID publish |
| Decap CMS i18n UX complexity for editors | Create onboarding doc; use `i18n: duplicate` for shared fields |

---

## Appendix A — Page Wireframes
*See companion file: `wireframes-analisia-blog.html`*

Screens:
1. Blog Home (`/`)
2. Single Post with TOC sidebar + inline subscribe CTA
3. Subscribe page (standalone)
4. About page

---

*Document owner: Analisia Team | Version: 1.5 | Status: Ready for Phase 1 pending OQ-12, OQ-14, OQ-15*
