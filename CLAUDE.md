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
