# Madism Booking Landing Page — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a static single-page booking landing page for DJ Madism using Next.js, Tailwind CSS, and real assets from the EPK.

**Architecture:** Single scrollable page composed of 5 server components + 1 client component (Hero with scroll fade). Static export deployed to Vercel. No database, no auth, no CMS.

**Tech Stack:** Next.js 15 (App Router, TypeScript, static export), Tailwind CSS v4, Inter font via next/font/google, sharp for image processing.

---

### Task 1: Scaffold Next.js Project

**Context:** The current directory has a bare `package.json` and `index.js` that need replacing. We scaffold a fresh Next.js project with Tailwind.

**Step 1: Remove old files and scaffold**

```bash
cd /Users/jamesoliver/WebstormProjects/bookmadism
rm index.js package.json
npx create-next-app@latest . --typescript --tailwind --eslint --app --src=no --import-alias="@/*" --use-npm
```

When prompted about overwriting, say yes. This will create the Next.js project in the current directory.

**Step 2: Configure static export**

Modify `next.config.ts`:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
```

**Step 3: Verify it runs**

```bash
npm run dev
```

Visit http://localhost:3000 — should see the default Next.js page. Kill the dev server.

**Step 4: Commit**

```bash
git add -A
git commit -m "chore: scaffold Next.js project with Tailwind and static export"
```

---

### Task 2: Process and Place Image Assets

**Context:** Raw assets are in `picture_assets/` and `Madism_EPK_V5.pdf` in the root. We need to compress/convert them and place them in `/public/`.

**Files:**
- Create: `public/images/hero.jpg` (compressed from `picture_assets/062A8878.jpg`)
- Create: `public/images/madism-logo-white.png` (inverted from `picture_assets/MADISM_LOGO_FIXED.png`)
- Create: `public/downloads/Madism_EPK_V5.pdf` (copied from root)
- Modify: `picture_assets/MADISM_LOGO_ROUNDED.svg` → convert to white fill → `app/favicon.ico`

**Step 1: Install sharp for image processing**

```bash
npm install --save-dev sharp
```

**Step 2: Create image processing script**

Create `scripts/process-assets.mjs`:

```javascript
import sharp from "sharp";
import { copyFileSync, mkdirSync } from "fs";

mkdirSync("public/images", { recursive: true });
mkdirSync("public/downloads", { recursive: true });

// Compress hero image to ~400KB, 1920px wide
await sharp("picture_assets/062A8878.jpg")
  .resize(1920)
  .jpeg({ quality: 75 })
  .toFile("public/images/hero.jpg");

console.log("✓ hero.jpg compressed");

// Invert MADISM logo to white (negate the image, then flatten on transparent)
await sharp("picture_assets/MADISM_LOGO_FIXED.png")
  .negate({ alpha: false })
  .toFile("public/images/madism-logo-white.png");

console.log("✓ madism-logo-white.png created");

// Copy EPK PDF
copyFileSync("Madism_EPK_V5.pdf", "public/downloads/Madism_EPK_V5.pdf");
console.log("✓ EPK copied to public/downloads/");
```

**Step 3: Run the script**

```bash
node scripts/process-assets.mjs
```

Verify: `public/images/hero.jpg` should be ~300-500KB, `public/images/madism-logo-white.png` should show white text on transparent bg.

**Step 4: Create favicon from SVG**

Create a simple white-fill version of the SVG logo as a favicon. Modify the SVG fill from `#020202` to `#FFFFFF`, render to 32x32 ICO via sharp:

```bash
# Use sharp to convert SVG to favicon
node -e "
const sharp = require('sharp');
const fs = require('fs');
let svg = fs.readFileSync('picture_assets/MADISM_LOGO_ROUNDED.svg', 'utf8');
svg = svg.replace('#020202', '#FFFFFF');
// Add a black background circle for contrast
const wrappedSvg = '<svg width=\"505\" height=\"505\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"505\" height=\"505\" rx=\"252.5\" fill=\"#000\"/>' + svg.replace(/<svg[^>]*>/, '').replace('</svg>', '') + '</svg>';
sharp(Buffer.from(wrappedSvg)).resize(32, 32).png().toFile('app/favicon.ico').then(() => console.log('✓ favicon created'));
"
```

If this is fiddly, alternatively just copy the rounded logo PNG, invert it, and resize to 32x32:

```javascript
await sharp("picture_assets/MADISM_LOGO_ROUNDED (3).png")
  .negate({ alpha: false })
  .resize(32, 32)
  .toFile("app/favicon.ico");
```

**Step 5: Commit**

```bash
git add public/images/ public/downloads/ app/favicon.ico scripts/
git commit -m "chore: process and place image assets (hero, logo, EPK, favicon)"
```

---

### Task 3: Set Up Layout, Font, and Global Styles

**Files:**
- Modify: `app/layout.tsx`
- Modify: `app/globals.css`

**Step 1: Update globals.css**

Replace the contents of `app/globals.css` with the minimal Tailwind setup on a black background:

```css
@import "tailwindcss";
```

No custom CSS needed — all styling via Tailwind utility classes.

**Step 2: Update layout.tsx**

Replace `app/layout.tsx` with:

```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Madism — Bookings",
  description:
    "Official booking page for Madism. Download press assets, EPK, and get in touch.",
  openGraph: {
    title: "Madism — Bookings",
    description:
      "Official booking page for Madism. Download press assets, EPK, and get in touch.",
    // TODO: Add OG image when ready
    // images: [{ url: "/images/og.jpg" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}
```

**Step 3: Verify**

```bash
npm run dev
```

Page should load with a black background and Inter font. Kill dev server.

**Step 4: Commit**

```bash
git add app/layout.tsx app/globals.css
git commit -m "feat: set up layout with Inter font, black background, and SEO meta"
```

---

### Task 4: Build SectionLabel Component

**Files:**
- Create: `app/components/SectionLabel.tsx`

**Step 1: Create the component**

```tsx
export default function SectionLabel({ children }: { children: string }) {
  return (
    <div className="mb-10">
      <h2 className="text-sm uppercase tracking-[0.2em] text-[#999999] pb-3 border-b border-[#222222]">
        {children}
      </h2>
    </div>
  );
}
```

**Step 2: Commit**

```bash
git add app/components/SectionLabel.tsx
git commit -m "feat: add SectionLabel reusable component"
```

---

### Task 5: Build Hero Component

**Files:**
- Create: `app/components/Hero.tsx`

**Step 1: Create the Hero component**

This is the only `'use client'` component. It needs a scroll listener that fades out the content as the user scrolls down.

```tsx
"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export default function Hero() {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return;
      const scrollY = window.scrollY;
      const opacity = Math.max(1 - scrollY / 500, 0);
      const translateY = scrollY * -0.3;
      contentRef.current.style.opacity = String(opacity);
      contentRef.current.style.transform = `translateY(${translateY}px)`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <Image
        src="/images/hero.jpg"
        alt="Madism performing live"
        fill
        priority
        className="object-cover"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div ref={contentRef} className="relative z-10 text-center px-6">
        {/* Wordmark logo */}
        <Image
          src="/images/madism-logo-white.png"
          alt="MADISM"
          width={600}
          height={120}
          className="mx-auto mb-6 w-[280px] md:w-[400px] lg:w-[520px] h-auto"
        />

        {/* Tagline */}
        <p className="text-[#999999] text-sm md:text-base tracking-[0.15em] uppercase mb-2">
          Mad About Life · Mad About Music · Mad About You
        </p>

        {/* Availability line */}
        <p className="text-[#999999] text-xs md:text-sm tracking-wide mb-10">
          Available for Bookings Worldwide
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="/downloads/Madism_EPK_V5.pdf"
            download
            className="border border-white text-white px-8 py-3 text-sm uppercase tracking-wider hover:bg-white hover:text-black transition-colors"
          >
            Download EPK
          </a>
          {/* TODO: Confirm booking email */}
          <a
            href="mailto:bookings@madism.com"
            className="bg-white text-black px-8 py-3 text-sm uppercase tracking-wider hover:bg-[#999999] transition-colors"
          >
            Contact Email
          </a>
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Commit**

```bash
git add app/components/Hero.tsx
git commit -m "feat: add Hero component with scroll fade and CTA buttons"
```

---

### Task 6: Build Bio Component

**Files:**
- Create: `app/components/Bio.tsx`

**Step 1: Create the Bio component**

```tsx
import SectionLabel from "./SectionLabel";

export default function Bio() {
  return (
    <section className="px-6 md:px-16 lg:px-24 py-16 md:py-24 max-w-4xl mx-auto">
      <SectionLabel>About</SectionLabel>
      <p className="text-white leading-relaxed text-base md:text-lg">
        Madism brings a surge of high-energy beats and uplifting tunes that
        transform any event into an unforgettable experience. Known for
        electrifying sets that seamlessly blend today&apos;s hottest tracks with
        classic anthems and club edits of his own songs, Madism creates an
        atmosphere that keeps the dance floor packed. With multiple radio
        appearances showcasing his livesets and interviews, Madism has
        demonstrated his talent across a variety of platforms. From intimate club
        settings to massive festivals with crowds of up to 15,000 people, he
        consistently delivers top-tier performances. Madism feeds off the
        audience&apos;s energy, ensuring a personalized and engaging experience
        every time. Whether it&apos;s a club night or a festival stage, Madism is
        dedicated to delivering an exhilarating performance that leaves everyone
        buzzing with excitement.
      </p>
    </section>
  );
}
```

**Step 2: Commit**

```bash
git add app/components/Bio.tsx
git commit -m "feat: add Bio component with EPK copy"
```

---

### Task 7: Build Highlights Component

**Files:**
- Create: `app/components/Highlights.tsx`

**Step 1: Create the Highlights component**

```tsx
import SectionLabel from "./SectionLabel";

const stats = [
  { value: "1B+", label: "Streams" },
  { value: "Multi Platinum", label: "Certified Producer" },
  { value: "15,000+", label: "Festival Crowds" },
  { value: "Worldwide", label: "Bookings" },
];

export default function Highlights() {
  return (
    <section className="px-6 md:px-16 lg:px-24 py-16 md:py-24 max-w-6xl mx-auto">
      <SectionLabel>Highlights</SectionLabel>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
        {stats.map((stat) => (
          <div key={stat.label}>
            <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
              {stat.value}
            </p>
            <p className="text-sm text-[#999999] uppercase tracking-wider">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
```

**Step 2: Commit**

```bash
git add app/components/Highlights.tsx
git commit -m "feat: add Highlights component with real stats from EPK"
```

---

### Task 8: Build Assets Component

**Files:**
- Create: `app/components/Assets.tsx`

**Step 1: Create the Assets component**

```tsx
import SectionLabel from "./SectionLabel";

const assets = [
  {
    name: "Press Photos",
    description: "High-resolution press photos (.zip)",
    // TODO: Replace with CDN URL for press photos zip
    href: "#",
  },
  {
    name: "EPK",
    description: "Electronic press kit (.pdf)",
    href: "/downloads/Madism_EPK_V5.pdf",
  },
  {
    name: "Logo Files",
    description: "Logo pack with SVG, PNG formats (.zip)",
    // TODO: Replace with CDN URL for logo files zip
    href: "#",
  },
];

export default function Assets() {
  return (
    <section className="px-6 md:px-16 lg:px-24 py-16 md:py-24 max-w-6xl mx-auto">
      <SectionLabel>Downloads</SectionLabel>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {assets.map((asset) => (
          <div
            key={asset.name}
            className="border border-[#222222] p-6 flex flex-col"
          >
            <h3 className="text-white font-bold text-lg mb-1">{asset.name}</h3>
            <p className="text-[#999999] text-sm mb-6 flex-1">
              {asset.description}
            </p>
            <a
              href={asset.href}
              download={asset.href !== "#"}
              className="border border-white text-white text-center px-6 py-3 text-sm uppercase tracking-wider hover:bg-white hover:text-black transition-colors"
            >
              Download
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
```

**Step 2: Commit**

```bash
git add app/components/Assets.tsx
git commit -m "feat: add Assets component with download cards"
```

---

### Task 9: Build Contact Component

**Files:**
- Create: `app/components/Contact.tsx`

**Step 1: Create the Contact component**

```tsx
import SectionLabel from "./SectionLabel";

export default function Contact() {
  return (
    <section className="px-6 md:px-16 lg:px-24 py-16 md:py-24 max-w-4xl mx-auto text-center">
      <SectionLabel>Bookings</SectionLabel>
      <p className="text-[#999999] text-base md:text-lg mb-8">
        For bookings, appearances, and collaborations
      </p>
      {/* TODO: Confirm booking email */}
      <a
        href="mailto:bookings@madism.com"
        className="inline-block bg-white text-black px-10 py-4 text-sm uppercase tracking-wider font-bold hover:bg-[#999999] transition-colors"
      >
        Contact Email
      </a>
    </section>
  );
}
```

**Step 2: Commit**

```bash
git add app/components/Contact.tsx
git commit -m "feat: add Contact component with mailto CTA"
```

---

### Task 10: Assemble Page and Clean Up

**Files:**
- Modify: `app/page.tsx`
- Modify: `CLAUDE.md`
- Create: `README.md`

**Step 1: Replace app/page.tsx**

```tsx
import Hero from "./components/Hero";
import Bio from "./components/Bio";
import Highlights from "./components/Highlights";
import Assets from "./components/Assets";
import Contact from "./components/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <Bio />
      <Highlights />
      <Assets />
      <Contact />
    </main>
  );
}
```

**Step 2: Create README.md**

```markdown
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
```

**Step 3: Update CLAUDE.md**

```markdown
# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Madism booking landing page — a static single-page site for DJ booking agents. Built with Next.js (App Router, static export), Tailwind CSS, deployed on Vercel.

## Commands

- **Dev server:** `npm run dev`
- **Build:** `npm run build` (outputs static files to `/out`)
- **Lint:** `npm run lint`
- **Process assets:** `node scripts/process-assets.mjs` (compresses hero image, inverts logo, copies EPK)

## Architecture

Single page (`app/page.tsx`) composed of server components except Hero (client component for scroll-fade effect). All components in `app/components/`. Design system: black bg (#000), white text, #999 muted, #222 borders. Inter font via next/font/google.

## TODOs

Search for `TODO` to find placeholders needing real content (booking email, download URLs, OG image).
```

**Step 4: Verify locally**

```bash
npm run dev
```

Open http://localhost:3000 — verify all 5 sections render correctly, hero scroll fade works, download EPK link works, mailto link works.

```bash
npm run build
```

Verify static export completes without errors.

**Step 5: Commit**

```bash
git add app/page.tsx CLAUDE.md README.md
git commit -m "feat: assemble page with all sections, add README and update CLAUDE.md"
```
