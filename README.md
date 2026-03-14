# Madism — Booking Landing Page

Static single-page booking site for DJ Madism. Built with Next.js, Tailwind CSS, deployed on Vercel.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Replacing Placeholder Content

Search the codebase for `TODO` comments to find all placeholders:

- **Booking email:** Update `bookings@madism.com` in `app/components/Hero.tsx` and `app/components/Contact.tsx`
- **Press Photos download:** Replace `href="#"` in `app/components/Assets.tsx` with the CDN URL for the press photos zip
- **Logo Files download:** Replace `href="#"` in `app/components/Assets.tsx` with the CDN URL for the logo files zip
- **OG image:** Add `/public/images/og.jpg` and uncomment the OG image line in `app/layout.tsx`

## Adding Real Download Files

Place files in `public/downloads/`:
- `Madism_EPK_V5.pdf` (already included)
- `madism-press-photos.zip`
- `madism-logo-files.zip`

## Build & Deploy

```bash
npm run build   # Outputs to /out
```

Deploy to Vercel: connect the repo and Vercel auto-detects the Next.js static export. No special config needed.
