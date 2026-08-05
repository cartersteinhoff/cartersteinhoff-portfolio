# Carter Steinhoff — Portfolio

A cinematic, image-led portfolio for Carter Steinhoff, built with Next.js App Router, Tailwind CSS, TypeScript, and Biome.

Production: [cartersteinhoff.co](https://cartersteinhoff.co)

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Quality checks

```bash
npm run lint
npm run typecheck
npm run build
```

## Content updates

- Identity, email, location, and portfolio projects live in `src/data/site.ts`.
- Page copy lives in each route under `src/app`.
- Final project images belong in `public/images` and should be served through `next/image`.
- The contact form posts to `/api/contact`, verifies the browser with BotID Basic, and sends through Resend. Configure `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, and `CONTACT_TO_EMAIL` as server-only Vercel environment variables. `NEXT_PUBLIC_CONTACT_EMAIL` controls the visible fallback email link.
- Production uses `NEXT_PUBLIC_SITE_URL=https://cartersteinhoff.co` so canonical metadata, robots, structured data, and the sitemap share one public origin.

The homepage and Portfolio page currently feature RetailBoss, Pay It Forward Card Shows, OpenWorkspace, and the Provepharm microsite. Each project has a dedicated case study under `src/app/portfolio/[slug]`, and the Services page lives at `src/app/services/page.tsx`.

## Project screenshots

- `public/images/retailboss-*.webp` — current homepage, jobs, events, and research screens from RetailBoss.
- `public/images/pay-it-forward-*.webp` — current homepage, shows, dealer, and about screens from Pay It Forward Card Shows.
- `public/images/openworkspace-*.webp` — current product, workflow, interface, and compatibility screens from OpenWorkspace.
- `public/images/provepharm-*.webp` — archived homepage, product, Bludigo, and press-release screens from the Provepharm microsite.

Browser capture sources stay local under the ignored `output` directory. Refresh the compact WebPs when a featured site changes materially.

## Generated photography

- `public/images/studio-hero.webp` — identity-referenced studio hero generated from Carter's supplied portrait.
- `public/images/carter-phoenix-portrait-v2.webp` — identity-referenced editorial portrait with the requested ear-length hairstyle.
- `public/images/phoenix-night.webp` — generated Phoenix night editorial landscape.

The supplied source portrait is not committed; only the compact generated website assets are part of the project. High-resolution generated PNG sources stay local under the ignored `source-assets` directory.
