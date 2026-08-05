# Carter Steinhoff — Portfolio

A cinematic, image-led portfolio for Carter Steinhoff, built with Next.js App Router, Tailwind CSS, TypeScript, and Biome.

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

- Identity, email, location, and portfolio focus areas live in `src/data/site.ts`.
- Page copy lives in each route under `src/app`.
- Final project images belong in `public/images` and should be served through `next/image`.
- The contact form currently opens the visitor's email app. Set `NEXT_PUBLIC_CONTACT_EMAIL` in Vercel to use a different address.
- Set `NEXT_PUBLIC_SITE_URL` to the final custom domain so canonical metadata, robots, and the sitemap use it.

The three portfolio entries are intentionally labeled “Case study in edit” so the live site does not invent client work. Replace them in `src/data/site.ts` as final projects are ready.

## Generated photography

- `public/images/studio-hero.webp` — identity-referenced studio hero generated from Carter's supplied portrait.
- `public/images/carter-phoenix-portrait.webp` — identity-referenced editorial portrait generated from Carter's supplied portrait.
- `public/images/phoenix-night.webp` — generated Phoenix night editorial landscape.

The supplied source portrait is not committed; only the compact generated website assets are part of the project. High-resolution generated PNG sources stay local under the ignored `source-assets` directory.
