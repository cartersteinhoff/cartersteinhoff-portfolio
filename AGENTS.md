# AGENTS.md

## Project intent

This is Carter Steinhoff's personal portfolio. Keep it editorial, image-led, direct, and deliberately sparse. The visual thesis is “desert noir studio”: ink-black surfaces, warm sand typography, a single sunset-orange accent, and cinematic Phoenix photography.

## Stack

- Next.js App Router with TypeScript
- React Server Components by default; add `"use client"` only for real browser interaction
- Tailwind CSS v4 through `@tailwindcss/postcss`
- Biome for formatting and linting
- npm and the committed `package-lock.json`

## Commands

- `npm run dev` — local development
- `npm run lint` — Biome check
- `npm run lint:fix` — apply safe Biome formatting and fixes
- `npm run typecheck` — TypeScript without emitting files
- `npm run build` — production build

Run lint, typecheck, and build before publishing. For visible changes, also check every route at desktop and mobile widths and confirm there are no console errors or horizontal overflow.

## Structure and editing

- Routes live in `src/app`.
- Shared components live in `src/components`.
- Edit the central identity, contact email, and portfolio entries in `src/data/site.ts`.
- Keep route metadata accurate when page content changes.
- Store production imagery in `public/images` and render it with `next/image`, an accurate `alt`, and a responsive `sizes` value.
- Do not commit Carter's original reference portrait. It is source material, not a public asset.

## Design rules

- The name “Carter Steinhoff” remains the loudest element in the homepage hero.
- Keep the homepage hero full bleed and first-viewport-safe on desktop and mobile.
- Use at most the two configured typefaces and the existing color system unless the art direction is intentionally revised.
- Prefer sections, rows, dividers, and media planes over generic cards.
- Keep copy brief and concrete. Do not fabricate clients, project outcomes, metrics, testimonials, or credentials.
- Featured work must use current screenshots, accurate platform labels, and verified live URLs.
- Motion should clarify hierarchy: one entrance, one depth/scroll treatment, and restrained hover feedback. Respect `prefers-reduced-motion`.
- Preserve keyboard focus, semantic headings, form labels, and readable contrast.

## Contact behavior

The contact form posts JSON to `/api/contact`, verifies requests with BotID Basic, and sends through Resend without database persistence. Keep the API key and sender/recipient values server-only through `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, and `CONTACT_TO_EMAIL`. `NEXT_PUBLIC_CONTACT_EMAIL` controls the visible manual email fallback. Preserve truthful pending, success, and failure states, and never expose provider errors or secrets to the browser.

## Deployment

- Never commit `.env*` values or `.vercel` project metadata.
- Set `NEXT_PUBLIC_SITE_URL` to the deployed/custom origin and `NEXT_PUBLIC_CONTACT_EMAIL` to Carter's confirmed inbox.
- Before a production deploy, verify `/`, `/about`, `/portfolio`, every `/portfolio/[slug]` case study, `/services`, `/contact`, `/robots.txt`, and `/sitemap.xml` locally and again on the deployed origin.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
