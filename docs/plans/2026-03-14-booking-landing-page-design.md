# Madism Booking Landing Page — Design

## Tech Stack
- Next.js (App Router, TypeScript, static export)
- Tailwind CSS
- Vercel hosting
- `images: { unoptimized: true }` — pre-optimize the few images manually
- Inter via `next/font/google`

## Design System
- Background: `#000000`
- Primary text: `#FFFFFF`
- Muted text: `#999999`
- Borders: `#222222`
- No gradients, no off-brand colours

## Component Tree
```
layout.tsx (Inter font, black body, meta/OG)
└─ page.tsx
   ├─ Hero.tsx ('use client' — scroll fade)
   ├─ Bio.tsx
   ├─ Highlights.tsx
   ├─ Assets.tsx
   └─ Contact.tsx
   + SectionLabel.tsx (shared)
```

## Hero (client component)
- Full-bleed `062A8878.jpg` (compressed) as background with dark overlay
- White-inverted MADISM wordmark logo (`MADISM_LOGO_FIXED.png`) — large, centered
- Tagline: "MAD ABOUT LIFE · MAD ABOUT MUSIC · MAD ABOUT YOU" in `#999999`
- Smaller line: "Available for Bookings Worldwide" in `#999999`
- Two CTA buttons:
  - "Download EPK" — white outlined, hover fills white/text-black → links to `/downloads/Madism_EPK_V5.pdf`
  - "Contact Email" — solid white, black text → `mailto:bookings@madism.com`
- `min-h-screen`, content vertically centered
- Scroll fade: logo + text + buttons fade out and translate up as user scrolls (~15 lines of JS, scroll listener + CSS transform)

## Bio
- SectionLabel: "ABOUT"
- Real copy from EPK Live Shows page (~150 words):
  "Madism brings a surge of high-energy beats and uplifting tunes that transform any event into an unforgettable experience. Known for electrifying sets that seamlessly blend today's hottest tracks with classic anthems and club edits of his own songs, Madism creates an atmosphere that keeps the dance floor packed. With multiple radio appearances showcasing his livesets and interviews, Madism has demonstrated his talent across a variety of platforms. From intimate club settings to massive festivals with crowds of up to 15,000 people, he consistently delivers top-tier performances. Madism feeds off the audience's energy, ensuring a personalized and engaging experience every time. Whether it's a club night or a festival stage, Madism is dedicated to delivering an exhilarating performance that leaves everyone buzzing with excitement."

## Highlights
- 4-item responsive grid (4-col desktop, 2-col mobile)
- "1B+" / Streams
- "Multi Platinum" / Certified Producer
- "15,000+" / Festival Crowds
- "Worldwide" / Bookings

## Assets
- SectionLabel: "DOWNLOADS"
- 3 cards (3-col desktop, 1-col mobile) with `#222222` border
- Press Photos (.zip) — `href="#"` TODO: Replace with CDN URL
- EPK (.pdf) — links to `/downloads/Madism_EPK_V5.pdf`
- Logo Files (.zip) — `href="#"` TODO: Replace with CDN URL

## Contact
- SectionLabel: "BOOKINGS"
- Supporting copy: "For bookings, appearances, and collaborations"
- Large solid white button: "Contact Email" → `mailto:bookings@madism.com` (TODO: Confirm booking email)

## Assets to Process
- `062A8878.jpg` → compress to ~300-500KB → `/public/images/hero.jpg`
- `MADISM_LOGO_FIXED.png` → invert to white → `/public/images/madism-logo-white.png`
- `MADISM_LOGO_ROUNDED.svg` → change fill to white → favicon
- `Madism_EPK_V5.pdf` → copy to `/public/downloads/Madism_EPK_V5.pdf`

## SEO
- Title: "Madism — Bookings"
- Description: "Official booking page for Madism. Download press assets, EPK, and get in touch."
- OG image: `/public/images/og.jpg` (placeholder TODO)
- `<html lang="en">` with black background on `<body>`
