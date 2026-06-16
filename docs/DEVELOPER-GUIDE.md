# RIMA AFRICA — Developer Guide

## Tech Stack
- Next.js 15 App Router (TypeScript, static export)
- Tailwind CSS with custom design tokens
- Cormorant Garamond (headings) + Inter (body) via Google Fonts
- Cloudflare Pages (hosting) + Cloudflare R2 (all media)
- Resend (transactional email)

## Brand Colours
| Token              | Hex     | Usage                              |
|--------------------|---------|------------------------------------|
| rima-jungle        | #2D4A35 | Header/nav (Hemingways green)       |
| rima-jungle-dark   | #1E3326 | Footer background                  |
| rima-gold          | #C9A84C | CTAs, italic text highlights       |
| rima-dark          | #1A1A1A | Brand statement section, headings  |
| rima-cream         | #F5F0E8 | Section backgrounds                |
| rima-teal          | #2A7B8C | Indian Ocean Islands accent only   |

## Directory Structure
src/
  app/(site)/         -- All public pages (Header + Footer layout)
  app/api/            -- API routes (inquiries, newsletter)
  components/
    layout/           -- Header, Footer
    sections/         -- Homepage sections (HeroSection, etc.)
    ui/               -- WhatsAppFloat and small UI components
    booking/          -- PlanWizard (5-step inquiry form)
  data/destinations.ts -- All 13 destination data + WHY_US + EXPERIENCE_TYPES
  types/index.ts      -- TypeScript interfaces
  lib/utils.ts        -- Helpers (r2Url, cn, formatPrice, etc.)
  lib/r2.ts           -- R2 URL builders and R2 folder documentation
  hooks/              -- useIntersection, useCounter
  styles/globals.css  -- Global CSS + all component classes

## Adding a Destination
1. Add to DESTINATIONS array in src/data/destinations.ts
2. Add to CONTINENT_GROUPS
3. Upload images to R2 (see r2-manifest/)
4. generateStaticParams auto-includes it at /destinations/[slug]

## Deploying
git add . && git commit -m "update" && git push
Cloudflare Pages builds automatically on push.
