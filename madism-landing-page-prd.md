# Product Requirements Document
## DJ Madism — Booking Landing Page

| Field | Detail |
|---|---|
| Version | 1.0 |
| Status | Draft |
| Date | March 2026 |
| Owner | DJ Madism / Management |

---

## 1. Overview

### Purpose

This document defines the requirements for a single-page booking landing page for DJ Madism. The page is purpose-built for booking agents and promoters — enabling them to rapidly assess the artist's brand, download press assets, review the EPK, and initiate contact via email with minimal friction.

The page is not a general-purpose artist website. It has one job: convert a visiting booking agent into an enquiry.

### Target Audience

- Booking agents and agency scouts
- Event promoters and festival talent buyers
- Club and venue programmers

These users are time-constrained, often browsing on mobile between shows, and need to make a fast first impression decision. Every design and content choice must serve this audience specifically.

### Success Metrics

- Bounce rate below 40% (booking agents quickly find what they need)
- Asset download rate — tracked via download link events
- Email CTA click-through rate
- Time-on-page target: 60–120 seconds (optimal for asset review)

---

## 2. Brand & Visual Direction

### Aesthetic

Minimal and clean with a bold, high-contrast edge. The visual language is built on a pure black background with white text — creating a premium, confident feel that lets photography and identity command attention. Generous whitespace, precise typography, and restrained use of accent tones form the foundation.

### Colour Palette

| Role | Value | Usage |
|---|---|---|
| Background | `#000000` | Full page background — pure black |
| Primary text | `#FFFFFF` | All headings and body copy |
| Supporting text | `#999999` | Subtitles, captions, labels |
| Borders / dividers | `#222222` | Subtle section separators |
| Accent (optional) | `#FFFFFF` or single brand colour | CTA button, hover states only |

> The black and white palette is non-negotiable. No gradients, no busy backgrounds, no off-brand colour introductions without explicit approval.

### Typography

One typeface family — recommend a geometric sans (e.g. Inter, Neue Haas Grotesk, Aktiv Grotesk). Large, confident headline sizing. Tight tracking on display text. Body copy at a comfortable reading size with generous line-height. All type renders white on black.

### Photography

High-quality press photography dominates the hero. Images should be sharp and feel editorial — ideally with dark or atmospheric tones that complement the black canvas. The artist should read clearly at a glance. Avoid busy or brightly coloured backgrounds that clash with the palette.

### Motion & Animation

Subtle only. Fade-in on scroll, soft transitions. Nothing that distracts from content. Performance must not be compromised by animation.

---

## 3. Page Architecture

The page is a single scrollable document. Sections are defined below in scroll order. No navigation tabs or multi-page routing — agents should be able to read the full picture without clicking away.

### Section Order

1. **Hero** — Full-bleed press photo with name and one-line descriptor
2. **Bio** — Concise artist biography (150–200 words max)
3. **Highlights** — Key stats, notable bookings, or genre tags
4. **Assets** — Download panel (Press Photos, EPK, Logo Files)
5. **Contact** — Email CTA

### Hero Section

Full-bleed press photograph. Name displayed prominently — large, bold, upper or mixed case per brand standards. White text overlaid on image or directly below on black. A single subtitle line establishes genre/context (e.g. *"Electronic / House — Available for Bookings Worldwide"*). No clutter. No paragraph text. The hero should communicate brand and quality instantly.

### Bio Section

A tight, professional biography. Written in third person. 150–200 words. Should cover: genre identity, notable venues or festivals, career milestones, and booking context. No filler — every sentence earns its place.

*Provide the copy to the developer pre-approved. This is not placeholder content.*

### Highlights / Key Facts

A small set of scannable data points — presented as large typographic stats or a clean grid, white on black. Examples: notable venues, genres, countries played, years active. This section must be digestible in under 10 seconds.

Suggested format: 3–4 items max. Label + value. No prose.

### Assets Panel

A clearly labelled download section. Three downloadable items:

- **Press Photos** — High-res JPG/ZIP package
- **EPK (PDF)** — Full Electronic Press Kit
- **Logo Files** — Vector and PNG variants

Each asset is presented with a label, brief description, and a download button styled in white or outlined white. Files must be hosted reliably (e.g. CDN, cloud storage). Download links must be direct — no login gates, no forms.

*File naming convention: `madism-press-photos.zip`, `madism-epk.pdf`, `madism-logo-files.zip`*

### Contact Section

A minimal closing section on black. The primary action is a `mailto:` link to the booking enquiry email address. Style as a prominent white button or large white link — this is the conversion point.

Supporting copy: one sentence only, e.g. *"For booking enquiries, get in touch directly."*

No contact form. No third-party embed. No social media feed. Clean finish.

---

## 4. Feature Requirements

| Feature | Description | Priority | Notes |
|---|---|---|---|
| Hero image | Full-bleed, above-fold press photo | High | Must load fast — optimise format |
| Artist name | Large typographic display of "Madism" | High | White on black |
| Artist bio | 150–200 word biography block | High | Copy provided by artist |
| Stats / highlights | Scannable key facts grid | Medium | 3–4 data points max |
| Press photo download | Direct download link to hi-res ZIP | High | Hosted on CDN |
| EPK download | Direct PDF download | High | Hosted on CDN |
| Logo download | Direct download of logo ZIP | High | Hosted on CDN |
| Email CTA | Prominent `mailto:` booking link | High | Primary conversion action |
| Download analytics | Track download events | Medium | Google Analytics or similar |
| Mobile responsive | Fully optimised for all viewports | High | Agents browse on mobile |
| Page speed | Sub-2s load on mobile (LCP) | High | Compress hero image |
| OG / meta tags | Title, description, image for link previews | Medium | For sharing via email/Slack |
| No cookies / GDPR | No tracking without consent if needed | Low | Verify with legal if analytics used |

---

## 5. Content Requirements

### Assets to be Supplied by Artist / Management

- Hero press photograph — minimum 2400px wide, high quality, dark/atmospheric tones preferred
- Additional press photos for download package — minimum 5 images
- Completed EPK as final PDF — not a draft
- Logo files — SVG (primary), PNG on transparent background (white version essential for black bg use)
- Approved bio copy — final, third-person, 150–200 words
- Booking email address — verified and monitored
- Highlights / stats content — at least 3 approved data points

### Content Review Gate

No development work on asset-dependent sections should begin until all content listed above has been delivered and approved. Placeholder assets are acceptable for initial build and internal review only.

---

## 6. Technical Requirements

| Requirement | Detail |
|---|---|
| Framework | Static site preferred — Next.js (static export), Astro, or plain HTML/CSS |
| Hosting | Vercel, Netlify, or Cloudflare Pages — globally distributed CDN |
| Asset hosting | Cloudflare R2, S3, or equivalent — direct public download URLs |
| Performance target | Lighthouse score ≥ 90 on mobile |
| Image format | WebP with JPEG fallback. Hero compressed ≤ 400KB |
| Background | CSS `background-color: #000000` set at root level — no exceptions |
| Text colour | CSS `color: #FFFFFF` as default — overrides only for supporting/muted text |
| Analytics | Optional — Google Analytics 4 or Plausible (privacy-friendly) |
| Domain | TBD — ideally `madism.com` or `booking.madism.com` |
| SSL | HTTPS required |
| Browser support | Modern evergreen browsers. IE not required. |

---

## 7. Out of Scope (v1.0)

The following are explicitly excluded from v1.0:

- Music player or embedded audio
- Social media feed or widget
- Blog or news section
- Merch store or any ecommerce functionality
- Contact form (email link is the chosen CTA)
- Multi-language support
- Video embeds or background video

*These may be considered for future versions but are not required to launch.*

---

## 8. Suggested Timeline

| Phase | Activity | Est. Duration |
|---|---|---|
| 1 — Content | Supply and approve all assets, bio copy, and highlights | 3–5 days |
| 2 — Design | Figma mockup of all sections (black bg, white text). Artist approval required. | 3–5 days |
| 3 — Build | Development of approved design. Mobile QA. | 5–7 days |
| 4 — Review | Stakeholder review, amends, content accuracy check | 2–3 days |
| 5 — Launch | DNS, final QA, go-live | 1 day |

---

## 9. Open Questions

- Has the booking email address been confirmed?
- Is a custom domain available? If so, what is it?
- Will download analytics be required from day one?
- Are all press photos cleared for web use and distribution by booking agents?
- Is there an existing brand guide or logo usage rules to follow?
- What is the approved highlights content (stats, venues, milestones)?
- Are there specific accent colour(s) used in existing Madism branding, or is pure black/white the full palette?

---

*DJ Madism Booking Landing Page — PRD v1.0 | Confidential*
