# Phase 1 — Blog Analisia Execution Plan

> **Goal:** Scaffold, build, and deploy blog.analisia.id using Hugo + Decap CMS + Cloudflare Pages with bilingual support (ID + EN), newsletter subscribe flow, and full SEO optimization.
> **Based on:** PRD v1.5 + Wonder.so design exports
> **Tech Stack:** Hugo, Decap CMS, Cloudflare Pages, Resend, CF Worker, Plus Jakarta Sans + Inter

---

## Pre-Flight: Blockers to Resolve Before Task 1

Three open questions from the PRD need explicit sign-off before writing any code:

| # | Question | Recommended Answer (from designs) |
|---|----------|----------------------------------|
| OQ-12 | Flair reference: use vs adapt vs ignore? | Designs are original Wonder.so work — ignore Flair reference. Need explicit confirmation. |
| OQ-14 | Language switcher placement on mobile? | Top bar, next to hamburger menu (ID | EN text toggle) — per `Page - Blog Home Mobile.tsx`. |
| OQ-15 | Exact nav link labels (ID + EN)? | **ID:** Artikel / Kategori / Tentang <br> **EN:** Articles / Categories / About (proposed — need sign-off) |

**Action:** Ask user to confirm the three items above before starting Task 1.

---

## File Map (all final paths)

```
~/analisiablog/
├── hugo.toml                     # Hugo config with i18n
├── i18n/
│   ├── id.yaml                   # Indonesian strings
│   └── en.yaml                   # English strings
├── assets/
│   ├── css/
│   │   └── main.css              # Design system variables + base styles
│   └── js/
│       └── lang-redirect.js      # First-visit locale auto-detect
├── layouts/
│   ├── _default/
│   │   ├── baseof.html           # Shell: head, header, footer
│   │   ├── list.html             # Homepage (ID + EN)
│   │   └── single.html           # Article page with TOC sidebar
│   ├── partials/
│   │   ├── header.html           # Sticky navbar
│   │   ├── footer.html           # 3-column footer
│   │   ├── lang-switcher.html    # ID | EN toggle
│   │   ├── featured-posts.html   # Featured card list
│   │   ├── post-card.html        # Reusable card in list views
│   │   ├── subscribe-cta.html    # Inline email input block
│   │   ├── toc.html              # Auto-generated TOC from H2/H3
│   │   └── seo-meta.html         # OG, hreflang, JSON-LD, canonical
│   └── index.html                # Homepage (calls list.html via baseof)
├── content/
│   ├── _index.md                 # ID home
│   ├── en/
│   │   └── _index.md             # EN home
│   ├── tentang.md                # About page (ID)
│   ├── en/about.md               # About page (EN)
│   ├── berlangganan.md           # Subscribe page (ID)
│   ├── en/subscribe.md           # Subscribe page (EN)
│   ├── posts/                    # ID posts
│   └── en/posts/                 # EN posts
├── static/
│   ├── admin/
│   │   ├── config.yml            # Decap CMS config with i18n
│   │   └── index.html            # Decap CMS bootstrap
│   └── images/
│       └── uploads/              # Media folder
└── wrangler.toml                 # (Phase 2) For subscribe Worker
```

---

## Task 1 — Resolve Open Questions

**Objective:** Confirm OQ-12 (Flair reference), OQ-14 (mobile lang switcher), OQ-15 (nav labels EN) with user.

**Files:** None — conversation only.

**Verification:** User confirms all three before Task 2 begins.

---

## Task 2 — Scaffold Hugo Project

**Objective:** Initialize Hugo site with i18n configuration, custom fonts, and design system CSS variables.

**Files:**
- Create: `hugo.toml`
- Create: `i18n/id.yaml`
- Create: `i18n/en.yaml`
- Create: `assets/css/main.css`
- Create: `assets/js/lang-redirect.js`

**Step 1: Create Hugo site and clean defaults**
```bash
hugo new site ~/analisiablog --force
cd ~/analisiablog
rm -rf themes/ archetypes/ hugo.toml
mkdir -p content/{posts,en/posts} layouts/{_default,partials} static/admin i18n assets/{css,js}
```

**Step 2: Write `hugo.toml`**
```toml
baseURL = "https://blog.analisia.id"
defaultContentLanguage = "id"
defaultContentLanguageInSubdir = false
title = "Blog Analisia"
theme = "analisia"

disableKinds = ["RSS", "sitemap"]

[params]
  brandAccent = "#FF4C1E"
  brandAccentLight = "#fff1ed"
  brandAccentBorder = "#ffd9ce"
  textPrimary = "#111111"
  textSecondary = "#666666"
  textMuted = "#999999"
  border = "#e5e5e5"
  background = "#ffffff"
  fontHeading = "Plus Jakarta Sans"
  fontBody = "Inter"
  fontCode = "JetBrains Mono"
  maxContentWidth = "680px"
  tocWidth = "260px"
  pageMaxWidth = "1200px"

[languages]
  [languages.id]
    languageName = "Indonesia"
    languageCode = "id-ID"
    weight = 1
    title = "Blog Analisia"
    [languages.id.params]
      subtitle = "Panduan, studi kasus, dan tips performance marketing"
      locale = "id_ID"
  [languages.en]
    languageName = "English"
    languageCode = "en-US"
    weight = 2
    contentDir = "content/en"
    title = "Analisia Blog"
    [languages.en.params]
      subtitle = "Guides, case studies, and performance marketing tips"
      locale = "en_US"

[permalinks]
  posts = "/:slug/"
  en = "/en/:slug/"

[markup]
  [markup.goldmark]
    [markup.goldmark.renderer]
      unsafe = true
  [markup.tableOfContents]
    startLevel = 2
    endLevel = 3
```

**Step 3: Write `i18n/id.yaml`**
```yaml
# Navigation
nav_artikel: "Artikel"
nav_kategori: "Kategori"
nav_tentang: "Tentang"

# Subscribe
subscribe_cta: "Berlangganan Newsletter"
subscribe_placeholder: "Alamat email kamu"
subscribe_button: "Daftar"
subscribe_success: "Terima kasih! Cek email kamu."
subscribe_hero_title: "Panduan, studi kasus, dan tips performance marketing."
subscribe_hero_desc: "Strategi yang terbukti meningkatkan ROAS dari tim Analisia. Newsletter mingguan, langsung ke inbox kamu."

# Homepage
featured_title: "Pilihan Editor"
see_all: "Lihat semua"
filter_all: "Semua"

# Post
read_next: "Baca Selanjutnya"
table_of_contents: "Daftar Isi"
published: "Diterbitkan"
reading_time: "menit baca"
min_read: "m"
by: "oleh"
categories: "Kategori"
tags: "Tags"

# Footer
footer_description: "Blog performance marketing dari agensi Analisia. Terbit dwibahasa, ID dan EN."
footer_konten: "Konten"
footer_newsletter: "Newsletter"
footer_berlangganan: "Berlangganan"
footer_arsip_digest: "Arsip digest"
footer_bahasa: "Bahasa"
footer_copyright: "© 2026 Analisia. blog.analisia.id"

# Subscribe page
subscribe_page_title: "Satu email seminggu. Nol fluff."
subscribe_page_desc: "Panduan, studi kasus, dan tips performance marketing yang bisa langsung kamu terapkan — dikurasi tim Analisia tiap Kamis pagi."
subscribe_benefit_1: "Studi kasus nyata dengan angka ROAS dan CPA yang sebenarnya"
subscribe_benefit_2: "Taktik Google Ads & Meta Ads yang sudah teruji di akun klien"
subscribe_benefit_3: "Tanpa spam. Berhenti berlangganan kapan saja dalam satu klik"
subscribe_social_proof: "Dibaca 3.200+ marketer setiap minggu"
subscribe_name_label: "Nama"
subscribe_name_placeholder: "Nama kamu"
subscribe_email_label: "Email"
subscribe_email_placeholder: "nama@email.com"
subscribe_button_text: "Daftar sekarang"
subscribe_note: "Single opt-in · langsung aktif · dilindungi Turnstile"

# Subscribe success
subscribe_success_title: "Terima kasih!"
subscribe_success_body: "Cek email kamu — kami baru saja mengirim email selamat datang. Digest mingguan pertama tiba Kamis pagi."
subscribe_success_fallback: "Tidak menerima email? Cek folder spam atau daftar ulang."

# About
about_title: "Kami menulis tentang apa yang benar-benar menggerakkan angka."
about_desc: "Blog Analisia adalah catatan terbuka dari agensi performance marketing Analisia — tempat kami membagikan kerangka kerja, eksperimen, dan pelajaran dari mengelola anggaran iklan klien setiap hari."

# Common
read_more: "Baca selengkapnya"
updated: "Diperbarui"
minute_read: "menit baca"
```

**Step 4: Write `i18n/en.yaml`** (parallel translations)

**Step 5: Write `assets/css/main.css`** with design system:
- CSS custom properties (brand accent, text, border colors)
- Font imports: Plus Jakarta Sans (600,700,800) + Inter (400,500,600,700)
- Prose styles: body 18px, line-height 1.75, max-width 680px
- TOC sidebar styles: sticky, 260px, active item with brand left border
- Card styles: rounded-lg (8px), border, overflow-hidden
- Subscribe CTA: tinted background, inline email input
- Blockquote: 4px brand left border
- Responsive breakpoints for mobile (390px)

**Step 6: Write `assets/js/lang-redirect.js`**
- Check cookie `_analisia_lang`
- If no cookie: detect browser language, redirect to /en/ if not Indonesian
- Set cookie after redirect

**Verification:**
```bash
cd ~/analisiablog && hugo server --minify
# Visit http://localhost:1313/ — should load with blank layout
# Visit http://localhost:1313/en/ — should load blank layout in EN
```

---

## Task 3 — Build Base Layout Shell (baseof.html + Partials)

**Objective:** Create the page shell: DOCTYPE, `<head>` with font loading + CSS, sticky navbar, footer, and language switcher.

**Files:**
- Create: `layouts/_default/baseof.html`
- Create: `layouts/partials/header.html`
- Create: `layouts/partials/footer.html`
- Create: `layouts/partials/lang-switcher.html`

**Step 1: `baseof.html`**
- DOCTYPE + `<html lang="{{ .Site.Language.Lang }}">`
- `<head>`: charset, viewport, title ({{ .Title }} — {{ .Site.Title }}), description
- Preconnect to Google Fonts
- Link main.css
- `<body>`: {{ partial "header" . }} → {{ block "main" . }}{{ end }} → {{ partial "footer" . }}
- lang-redirect.js before closing body
- Defer analytics

**Step 2: `partials/header.html`**
- Fixed 72px height, border-bottom, white bg, px-10
- Logo: orange "A" square with Plus Jakarta Sans bold + "Blog Analisia"
- Nav links center: 3 links using i18n strings, active state via `.RelPermalink` matching
- Language switcher right: `{{ partial "lang-switcher" . }}`
- Subscribe CTA button: orange bg, "Berlangganan" text, arrow icon

**Step 3: `partials/footer.html`**
- Border-top, px-10, py-14, 3 columns
- Col 1: Logo + description + copyright
- Col 2: "Konten" heading → Artikel / Kategori / Tentang links
- Col 3: "Newsletter" heading → Berlangganan / Arsip digest
- Col 4: "Bahasa" heading → Indonesia / English (with active state)

**Step 4: `partials/lang-switcher.html`**
- Range .Translations → link to .Permalink
- If not translated → link to other locale's home
- Active locale: underlined with brand accent
- Format: "ID" | "EN" (minimal toggle)

**Step 5: Mobile header variant**
- Media query: @media (max-width: 768px)
- Replace nav links + CTA with hamburger menu icon
- Keep logo and lang-switcher
- Hamburger icon open/close handled via JS toggle

**Verification:**
```bash
hugo server --minify
# Check: navbar renders with 3 links, lang switcher shows ID underlined
# Check: footer renders with 4 columns
# Check: /en/ shows EN labels instead of ID
```

---

## Task 4 — Homepage List Layout (list.html)

**Objective:** Build the blog home page with hero, featured posts (single-column card list), and category-filtered post table.

**Files:**
- Create: `layouts/_default/list.html`
- Create: `layouts/partials/featured-posts.html`
- Create: `layouts/partials/post-card.html`

**Step 1: `list.html` structure**
- Hero section: heading from i18n, subtitle, email input + submit button (inline, centered)
- "Pilihan Editor" section heading with "Lihat semua" link
- Single-column card list for featured posts (page where `featured: true`)
- Category filter tabs: Semua (default active), Panduan, Studi Kasus, Google Ads, Meta Ads, SEO — underline-style active tab with brand accent
- Table-style post list: rows with category label (uppercase, small, orange), title (bold, 18px), author, date with clock icon, read time
- Mobile: tabs become pill/chips, rows become stacked vertical layout

**Step 2: `partials/featured-posts.html`**
- Filter: `where .Site.RegularPages "Params.featured" true`
- Limit to 3 posts
- Card: cover image (200px height), category label, title (24px bold), author · date · read time
- Single-column flex layout

**Step 3: `partials/post-card.html`** (reusable in list and read-next)
- Props: context page
- Category badge (uppercase, orange, 12px)
- Title (link to .Permalink)
- Author · Date · Read time metadata row

**Step 4: Category filtering behavior**
- By default show all posts for the locale (no JS filter — build-time)
- Hugo generates the full list. JS filtering on the frontend is optional enhancement.
- Each tab links to a section _index page or uses JS to filter rows.

**Verification:**
```bash
hugo server --minify
# Visit / → hero renders, featured cards show (if any post has featured: true), post table renders
# Visit /en/ → all text in English
```

---

## Task 5 — Single Post Layout (single.html)

**Objective:** Build the article page with sticky TOC sidebar, cover image, reading content, inline subscribe CTA, and read next.

**Files:**
- Create: `layouts/_default/single.html`
- Create: `layouts/partials/toc.html`
- Create: `layouts/partials/subscribe-cta.html`

**Step 1: `single.html` structure**
- Sticky navbar (same as home)
- Breadcrumb: Blog > Category > (no current page)
- Post header: Title (48px, extra bold), Subtitle (20px, secondary), Author avatar + name, date with calendar icon, clock icon + read time
- Cover image: full-width, 420px height, lazy-loaded, object-cover
- Two-column reading layout:
  - Left: sticky TOC sidebar (260px, top: 100px offset)
  - Right: post body content (max-width 680px, 18px Inter, line-height 1.75)
- Inline subscribe CTA block at mid-post (after ~50% of content)
- "Baca Selanjutnya" — 3 card grid of same-locale recent posts
- Footer

**Step 2: `toc.html`**
- Use Hugo's `.TableOfContents` built-in
- Wrap in a styled container
- Active heading: JS IntersectionObserver highlights current H2/H3 with brand accent left border
- Sticky positioning

**Step 3: `subscribe-cta.html`**
- Orange-tinted background (brandAccentLight + brandAccentBorder)
- Headline: "Dapatkan taktik seperti ini tiap minggu"
- Subtitle: "Digest mingguan performance marketing, langsung ke inbox kamu."
- Email input + submit button (inline)
- Same style as hero subscribe but compact

**Step 4: Mobile single post**
- TOC becomes collapsible accordion (click "Daftar Isi" to expand)
- Single-column layout
- Cover image 220px height
- Read next: horizontal scrollable list with thumbnail + title

**Verification:**
```bash
hugo server --minify
# Visit /panduan/test-post/ → TOC renders, headings link correctly, subscribe CTA shows
# Resize to 390px → TOC becomes accordion, single column
```

---

## Task 6 — SEO Meta Partial + hreflang + Sitemaps

**Objective:** Implement all SEO requirements: meta tags, OG, Twitter cards, hreflang, canonical, JSON-LD, localized sitemaps, robots.txt.

**Files:**
- Create: `layouts/partials/seo-meta.html`
- Create: `layouts/robots.txt` (alias if possible, or static/robots.txt)
- Modify: `hugo.toml` (enable sitemap generation per locale)

**Step 1: `seo-meta.html`** — included in baseof.html `<head>`
- Meta title: `{{ .Title }} — {{ .Site.Title }}`
- Meta description: from .Description or .Summary
- Canonical: `<link rel="canonical" href="{{ .Permalink }}">`
- OG tags: og:title, og:description, og:url, og:type (article vs website), og:locale, og:site_name, og:image (from cover)
- Twitter card: summary_large_image
- hreflang: for each translation `.Translations`, emit `<link rel="alternate" hreflang="...">` plus x-default pointing to ID page
- JSON-LD: Article schema with headline, description, datePublished, dateModified, author, inLanguage

**Step 2: hreflang logic**
```html
{{ range .AllTranslations }}
<link rel="alternate" hreflang="{{ .Language.Lang }}" href="{{ .Permalink }}">
{{ end }}
<link rel="alternate" hreflang="x-default" href="{{ .Site.Home.Permalink }}">
```

**Step 3: Sitemap config**
Hugo generates sitemap.xml per locale automatically. Just set in hugo.toml:
```toml
[sitemap]
  changefreq = "weekly"
  priority = 0.5
  filename = "sitemap.xml"
```

**Step 4: `static/robots.txt`**
```
User-agent: *
Allow: /

Sitemap: https://blog.analisia.id/sitemap.xml
Sitemap: https://blog.analisia.id/en/sitemap.xml
```

**Verification:**
```bash
hugo --minify -d public
curl -s http://localhost:1313/ | grep -E 'og:|canonical|hreflang'
curl -s http://localhost:1313/sitemap.xml | head -20
curl -s http://localhost:1313/robots.txt
```

---

## Task 7 — About Page + Subscribe Page + Subscribe Success

**Objective:** Create the static content pages with proper templates.

**Files:**
- Create: `content/tentang.md`
- Create: `content/en/about.md`
- Create: `content/berlangganan.md`
- Create: `content/en/subscribe.md`
- (No separate file needed for success — it's an inline state in the subscribe page)

**Step 1: Markdown content pages**
- `tentang.md`: front matter with title, description. Body ≈ PRD copy about Analisia.
- `berlangganan.md`: front matter with title, description. Body minimal since layout comes from template.

**Step 2: Template override**
If needed, create `layouts/page/single.html` for about/subscribe pages.
- About: minimal — just title + body content at max-width 680px
- Subscribe: hero layout with heading, benefit list, form card
  - Left column: headline, description, benefit items with checkmark icons, social proof avatars
  - Right column: card form with name input, email input, submit button, Turnstile note
  - On mobile: stack vertically

**Step 3: Subscribe success state**
- Same page, JS-controlled: on form submit → show success panel instead of form
- Success: large checkmark circle, "Terima kasih!" heading, user email shown, instruction text, fallback note

**Verification:**
```bash
hugo server --minify
# Visit /tentang/ → renders cleanly
# Visit /berlangganan/ → subscribe page renders with form
```

---

## Task 8 — Decap CMS Configuration with i18n

**Objective:** Wire Decap CMS for bilingual content editing.

**Files:**
- Create: `static/admin/config.yml`
- Create: `static/admin/index.html`

**Step 1: `config.yml`**
```yaml
backend:
  name: github
  repo: analisia/analisia-blog
  branch: main
  base_url: https://analisia-blog-oauth.analisia.workers.dev
  auth_endpoint: api/oauth/auth

media_folder: "static/images/uploads"
public_folder: "/images/uploads"

i18n:
  structure: multiple_folders
  locales: [id, en]
  default_locale: id

collections:
  - name: "posts"
    label: "Blog Posts"
    folder: "content/posts"
    i18n: true
    create: true
    slug: "{{year}}-{{month}}-{{day}}-{{slug}}"
    fields:
      - {label: "Title", name: "title", widget: "string", i18n: true}
      - {label: "Description", name: "description", widget: "string", i18n: true}
      - {label: "Body", name: "body", widget: "markdown", i18n: true}
      - {label: "Tags", name: "tags", widget: "list", i18n: true}
      - {label: "Categories", name: "categories", widget: "list", i18n: duplicate}
      - {label: "Author", name: "author", widget: "string", i18n: duplicate}
      - {label: "Publish Date", name: "date", widget: "datetime", i18n: duplicate}
      - {label: "Cover Image", name: "cover", widget: "image", i18n: duplicate}
      - {label: "Featured", name: "featured", widget: "boolean", i18n: duplicate, default: false, required: false}
      - {label: "Show TOC", name: "toc", widget: "boolean", i18n: duplicate, default: true, required: false}
      - {label: "Translation Key", name: "translationKey", widget: "string", i18n: duplicate, hint: "Must match between ID and EN versions"}
      - {label: "Draft", name: "draft", widget: "boolean", i18n: duplicate, default: false, required: false}
      - {label: "Reading Time", name: "readingTime", widget: "boolean", i18n: duplicate, default: true, required: false}

  - name: "pages"
    label: "Pages"
    folder: "content"
    i18n: true
    create: false
    fields:
      - {label: "Title", name: "title", widget: "string", i18n: true}
      - {label: "Description", name: "description", widget: "string", i18n: true}
      - {label: "Body", name: "body", widget: "markdown", i18n: true}
```

**Step 2: `index.html`** — standard Decap CMS bootstrap
```html
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /></head>
<body>
  <script src="https://unpkg.com/decap-cms@^3/dist/decap-cms.js"></script>
</body>
</html>
```

**Verification:**
```bash
# Visit https://blog.analisia.id/admin/ → should load CMS login
# Login → should see Posts and Pages collections
# Create post → should show i18n tabs for ID and EN
```

---

## Task 9 — Cloudflare Pages Deployment

**Objective:** Deploy site to Cloudflare Pages with custom domain.

**Files:**
- Modify: `hugo.toml` (ensure baseURL is correct)
- (No wrangler.toml yet — that's Phase 2)

**Step 1: Create Cloudflare Pages project**
1. Cloudflare Dashboard → Workers & Pages → Create → Pages → Connect to Git
2. Select GitHub repo (analisia/analisia-blog)
3. Build settings:
   - Framework: Hugo
   - Build command: `hugo --minify`
   - Build output: `public`
   - Env var: `HUGO_VERSION = 0.127.0`
4. Save and Deploy

**Step 2: Custom domain**
1. Pages project → Custom domains → Set up custom domain
2. Enter `blog.analisia.id`
3. Cloudflare auto-creates DNS CNAME + SSL

**Step 3: Cache rules**
1. Cloudflare Dashboard → Rules → Page Rules (or Cache Rules)
2. HTML: 1 hour browser cache
3. Static assets (css, js, images): 1 year
4. `/api/*`: no cache (Phase 2)

**Step 4: Verification**
```bash
curl -sI https://blog.analisia.id/ | head -10
# Should return HTTP/2 200 with Cloudflare headers

# Test a few pages
curl -s https://blog.analisia.id/tentang/ | head -5
curl -s https://blog.analisia.id/en/ | head -5

# Check OG tags are present
curl -s https://blog.analisia.id/ | grep og:title
```

---

## Post-Phase 1 Verification Checklist

| Item | How to Verify |
|------|--------------|
| Homepage renders (ID) | Visit / — hero, featured, post list, footer |
| Homepage renders (EN) | Visit /en/ — all text in English |
| Single post layout | Create seed post, visit /:slug/ |
| TOC sidebar | Scroll post — headings highlighted in brand accent |
| Language switcher | Click ID | EN — navigates between locales |
| hreflang tags | View source — alternates present for both locales |
| Canonical URLs | View source — self-referencing |
| OG tags | View source — og:title, og:description, og:image |
| JSON-LD | View source — Article schema with inLanguage |
| Sitemaps | /sitemap.xml and /en/sitemap.xml — both valid XML |
| robots.txt | /robots.txt — lists both sitemaps |
| Mobile layout | 390px viewport — header, cards, TOC adapt |
| Decap CMS login | /admin/ — loads CMS, can create post |
| About page | /tentang/ and /en/about/ |
| Subscribe page | /berlangganan/ and /en/subscribe/ |
| Cloudflare deploy | Push to main → auto-deploys in <2 min |

---

## Risks & Edge Cases

1. **Decap CMS i18n UX complexity** — The `i18n: true` widget on every field adds UI complexity (each field has a language tab). Mitigation: use `i18n: duplicate` for shared fields (date, author, cover, categories) to reduce editor friction.

2. **GitHub OAuth Worker needed for Decap CMS** — Cloudflare Pages doesn't have Netlify Identity. Need a CF Worker for GitHub OAuth before Decap CMS login works. Build this in Phase 1 or document as Phase 1.5 blocker.

3. **Sitemap duplication** — Both `/sitemap.xml` and `/en/sitemap.xml` must be submitted to separate Google Search Console properties (`blog.analisia.id` + `blog.analisia.id/en/`). Common mistake: submitting only one.

4. **Translation key linkage** — ID and EN versions of a post require matching `translationKey` in frontmatter for the lang switcher to find equivalents. Editors must remember to set this. Mitigation: add hint text in Decap CMS config.

5. **Hugo version mismatch** — Local Hugo and Cloudflare Pages Hugo versions must match. Pin `HUGO_VERSION` env var in CF Pages settings.

---

## Proposed Task Order

```
Task 1 — Resolve Open Questions (user sign-off)
Task 2 — Scaffold Hugo + i18n + design system CSS
Task 3 — Base layout: baseof.html, header, footer, lang-switcher
Task 4 — Homepage: list.html, featured, post-card
Task 5 — Single post: single.html, TOC, subscribe-cta
Task 6 — SEO: meta partial, hreflang, sitemaps, robots.txt
Task 7 — Static pages: About, Subscribe
Task 8 — Decap CMS config
Task 9 — Deploy to Cloudflare Pages
```
