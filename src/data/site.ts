export const site = {
  name: "Carter Steinhoff",
  shortName: "CS",
  defaultUrl: "https://cartersteinhoff.co",
  role: "Product designer & full-stack developer · AI automation · Cloud architecture",
  seoTitle: "Product Designer, Full-Stack Developer & AI Automation Expert",
  location: "Phoenix, Arizona",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "cartersteinhoff@gmail.com",
  upworkUrl: "https://www.upwork.com/freelancers/cartersteinhoff",
  linkedinUrl: "https://www.linkedin.com/in/carter-steinhoff",
  description:
    "Carter Steinhoff is a Phoenix product designer and full-stack developer specializing in AI automation, cloud architecture, Next.js, and custom WordPress and CMS platforms.",
  socialImageAlt:
    "Carter Steinhoff, Phoenix product designer, full-stack developer, and AI automation expert",
  serviceTypes: [
    "Website and product design",
    "Full-stack product development",
    "WordPress, headless, and custom CMS development",
    "Technical SEO and performance",
    "AI automation and integrations",
    "Cloud architecture and production delivery",
  ],
};

/**
 * Verified Upwork standing, transcribed from the public profile at
 * site.upworkUrl. Every figure here must match that page — nothing is
 * rounded, estimated, or inferred. The profile is the source of truth,
 * so re-check these when `asOf` starts looking old and update both
 * together.
 *
 * Testimonials are excerpts. Upwork truncates feedback for logged-out
 * visitors, so each quote is the complete opening sentence of a longer
 * review rather than an abridged version of the whole thing. Clients are
 * attributed by project type rather than name.
 */
export const upwork = {
  asOf: "August 2026",
  jobSuccess: "100%",
  badge: "Top Rated",
  rating: "4.9",
  reviewCount: 28,
  totalJobs: 37,
  totalHours: 600,
  profileScreenshot: {
    src: "/images/upwork-profile-carter-steinhoff.png",
    width: 3798,
    height: 1849,
    alt: "Carter S.'s public Upwork profile showing his verified badge, 100% job success, Top Rated status, 4.9 rating, 37 jobs, and 600 hours.",
  },
  stats: [
    { label: "Job success", value: "100%" },
    { label: "Rating", value: "4.9 / 5" },
    { label: "Reviews", value: "28" },
    { label: "Hours", value: "600" },
  ],
  testimonials: [
    {
      quote: "Working with Carter has been one of the best decisions we've made for BrandLift.",
      context: "Platform maintenance & model validation",
      date: "June 2026",
    },
    {
      quote: "Carter has become my go-to for any website and CMS troubleshooting.",
      context: "WordPress & Elementor troubleshooting",
      date: "May 2026",
    },
  ],
} as const;

function normalizeSiteUrl(value: string) {
  const url =
    value.startsWith("http://") || value.startsWith("https://")
      ? new URL(value)
      : new URL(`https://${value}`);

  return url.origin;
}

export function getSiteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);
  }

  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return normalizeSiteUrl(process.env.VERCEL_PROJECT_PRODUCTION_URL);
  }

  if (process.env.VERCEL_URL) {
    return normalizeSiteUrl(process.env.VERCEL_URL);
  }

  return site.defaultUrl;
}

export function getAbsoluteUrl(path = "/") {
  return new URL(path, `${getSiteUrl()}/`).toString();
}

export type ProjectArchitecture = {
  readonly headline: string;
  readonly summary: string;
  readonly items: readonly {
    readonly label: string;
    readonly value: string;
  }[];
};

/**
 * The reasoning behind a build — the one thing screenshots can't carry.
 * `title` states the decision; `body` gives the constraint that forced it
 * and what it bought, rather than restating the feature.
 *
 * Optional on purpose. An entry belongs here only when the reasoning is
 * genuinely recoverable from the work; a plausible rationale invented
 * afterwards is worse than no section at all.
 */
export type ProjectDecision = {
  readonly title: string;
  readonly body: string;
};

export const portfolioProjects = [
  {
    number: "01",
    slug: "retailboss",
    year: "2026",
    title: "RetailBoss",
    url: "https://retailboss.co/",
    domain: "retailboss.co",
    platform: "WordPress · Custom plugins",
    shortPlatform: "WordPress · Custom plugins",
    externalLabel: "Live site",
    status: "Live",
    statusDetail: "Live and in production",
    summary: "An editorial and intelligence platform powered by custom WordPress systems.",
    seoDescription:
      "RetailBoss case study: a custom WordPress publishing platform with purpose-built plugins for editorial, research, jobs, events, and brands.",
    description:
      "I designed and developed RetailBoss end to end in WordPress, including its editorial experience, custom plugins, brand and research tools, jobs, events, and the systems supporting publication.",
    services: ["Web design", "WordPress", "Custom plugins", "Platform systems"],
    image: "/images/retailboss-project.webp",
    imageAlt:
      "RetailBoss homepage showing featured retail stories, jobs, events, and brand coverage",
    caseStudy: {
      role: "Design, development & platform systems",
      system: "WordPress · Custom plugins · Editorial backend",
      headline: "A custom publishing system built for the pace of retail.",
      overview:
        "RetailBoss is a retail news and market-intelligence platform. I designed and developed the experience end to end in WordPress, pairing an editorial frontend with custom plugins and operational tools behind it.",
      detail:
        "The work spans daily publishing, brand discovery, research, jobs, events, structured content, and the reusable systems that let the platform keep expanding without turning every feature into a one-off.",
      contributions: [
        "End-to-end platform design and WordPress development",
        "Custom plugins for platform-specific editorial and operational workflows",
        "Backend content systems for brands, research, jobs, and events",
        "Responsive frontend, technical SEO, deployment, and production stewardship",
      ],
      statusCopy:
        "Available in production today; the live experience reflects the system shown throughout this case study.",
      architecture: {
        headline: "A custom WordPress publishing architecture.",
        summary:
          "The public editorial experience and its backend tools live in one custom WordPress platform, extended with purpose-built plugins for the work RetailBoss actually needs to do.",
        items: [
          {
            label: "Experience",
            value: "Responsive WordPress frontend and reusable editorial templates",
          },
          {
            label: "Application layer",
            value: "Purpose-built WordPress plugins for publishing and platform workflows",
          },
          {
            label: "Content system",
            value: "Structured backend models for stories, brands, research, jobs, and events",
          },
          {
            label: "Operations",
            value: "Technical SEO, deployment, integrations, and production stewardship",
          },
        ],
      } satisfies ProjectArchitecture,
      screens: [
        {
          image: "/images/retailboss-project.webp",
          title: "Editorial homepage",
          caption:
            "Current stories, brand intelligence, jobs, and events share one publishing surface.",
          alt: "RetailBoss editorial homepage with featured story, retail jobs, events, and article grid",
        },
        {
          image: "/images/retailboss-jobs.webp",
          title: "Retail jobs",
          caption:
            "A custom jobs destination connects filters, role details, structured data, and application paths.",
          alt: "RetailBoss jobs page showing current roles and job filters",
        },
        {
          image: "/images/retailboss-events.webp",
          title: "Industry events",
          caption:
            "A structured calendar turns conferences, trade shows, and industry gatherings into a useful planning tool.",
          alt: "RetailBoss events directory showing upcoming retail conferences and trade shows",
        },
        {
          image: "/images/retailboss-research.webp",
          title: "Research & intelligence",
          caption:
            "Rankings and reports extend the editorial system into reusable market-intelligence products.",
          alt: "RetailBoss research page with retail rankings and reports",
        },
      ],
    },
  },
  {
    number: "02",
    slug: "openworkspace",
    year: "2026",
    title: "OpenWorkspace",
    url: "https://openworkspace.com/",
    domain: "openworkspace.com",
    platform: "Next.js/Vercel · AWS",
    shortPlatform: "Next.js · AWS",
    externalLabel: "Live site",
    status: "Live",
    statusDetail: "Live and in production",
    summary: "A cross-platform desktop automation product backed by a purpose-built AWS service.",
    seoDescription:
      "OpenWorkspace case study: a Next.js frontend, Fastify API, AWS EC2 and RDS backend, and Windows and macOS desktop clients.",
    description:
      "I designed and developed OpenWorkspace end to end: a Next.js frontend on Vercel and the entire Fastify backend on AWS EC2, connected to AWS RDS and handling requests from Windows and macOS desktop clients.",
    services: ["Product design", "Next.js & Vercel", "Fastify backend", "AWS infrastructure"],
    image: "/images/openworkspace-project.webp",
    imageAlt: "OpenWorkspace homepage explaining how to save apps, windows, tabs, and layouts",
    caseStudy: {
      role: "Product design & full-stack development",
      system: "Next.js/Vercel · Fastify · AWS",
      headline: "One product system connecting the web, cloud, and desktop.",
      overview:
        "OpenWorkspace saves apps, windows, tabs, and layout as reusable workspaces. I designed and developed the whole product stack: the Next.js/Vercel frontend and the Fastify web server running on AWS EC2.",
      detail:
        "The backend connects to AWS RDS and handles requests from Windows and macOS desktop clients, while the public experience explains the workflow and gives the product a focused trial path.",
      contributions: [
        "Product positioning and responsive Next.js/Vercel frontend",
        "Complete Fastify backend and web-server development",
        "AWS EC2 application hosting and AWS RDS integration",
        "Request handling for Windows and macOS desktop clients",
      ],
      statusCopy:
        "Available in production today; the live experience reflects the system shown throughout this case study.",
      decisions: [
        {
          title: "A shipped desktop app is a fixed constraint",
          body: "The C++ desktop client is installed on machines I do not control and cannot be updated without a release. That inverts the usual order of work: the server had to change around a client that was already frozen. Before removing anything from a response, I read the client's own validation source to confirm it never touched that field. Every fix on this list had to be provably invisible to an install that would never be patched.",
        },
        {
          title: "AWS keys were being handed to every client",
          body: "License validation returned raw IAM access keys to every desktop install on every call — credentials sitting in memory on thousands of machines for no reason. The function that injected them is gone. Deleting it was only safe because the client source proved the field went unread, which is exactly why the constraint above came first: on a frozen client, verification is the only alternative to guessing.",
        },
        {
          title: "A missing return left admin routes open",
          body: "The authentication decorators sent a 401 and then fell through, so the handler ran anyway and every admin route was effectively unprotected. The fix is one keyword. It is worth stating plainly because it is the shape these bugs take — not a subtle cryptographic mistake but a control-flow slip that looks correct in review and passes any test that only asserts on status codes.",
        },
        {
          title: "Three ways to create a license became one",
          body: "Checkout, the external API, and the admin UI each built licenses their own way, with different fields, different preset resolution, and different response shapes — and checkout reached its own server over HTTP to do it, paying DNS, nginx, and about 50ms to call a function in the same process. Every new column meant editing three inserts and missing one. Now they all import the same function.",
        },
      ] satisfies readonly ProjectDecision[],
      architecture: {
        headline: "A web-to-desktop product architecture.",
        summary:
          "The public frontend, cloud service, database, and desktop clients work as one system designed and developed end to end.",
        items: [
          {
            label: "Frontend",
            value: "Next.js product experience deployed on Vercel",
          },
          {
            label: "Backend",
            value: "Fastify web server running on AWS EC2",
          },
          {
            label: "Database",
            value: "AWS RDS",
          },
          {
            label: "Clients",
            value: "Windows and macOS desktop applications sending requests to the backend",
          },
        ],
      } satisfies ProjectArchitecture,
      screens: [
        {
          image: "/images/openworkspace-project.webp",
          title: "Product promise",
          caption:
            "The opening screen explains the product in one sentence and gives the trial one clear action.",
          alt: "OpenWorkspace homepage with a desktop-automation headline and product preview",
        },
        {
          image: "/images/openworkspace-how-it-works.webp",
          title: "How it works",
          caption:
            "A visual sequence turns a multi-step desktop workflow into an approachable product story.",
          alt: "OpenWorkspace how-it-works section explaining the workspace workflow",
        },
        {
          image: "/images/openworkspace-product-ui.webp",
          title: "Product interface",
          caption:
            "Real product UI makes the saved-workspace concept tangible before a visitor starts a trial.",
          alt: "OpenWorkspace product interface showing a saved workspace configuration",
        },
        {
          image: "/images/openworkspace-compatibility.webp",
          title: "Compatibility",
          caption:
            "Platform and application support are surfaced before they become a purchase question.",
          alt: "OpenWorkspace compatibility section with supported platforms and applications",
        },
      ],
    },
  },
  {
    number: "03",
    slug: "pay-it-forward-card-shows",
    year: "2026",
    title: "Pay It Forward Card Shows",
    url: "https://www.payitforwardcardshows.com/",
    domain: "payitforwardcardshows.com",
    platform: "Next.js · Vercel",
    shortPlatform: "Next.js · Vercel",
    externalLabel: "Live site",
    status: "Live",
    statusDetail: "Live and in production",
    summary:
      "A community event platform with a custom CMS and serverless backend for shows and dealers.",
    seoDescription:
      "Pay It Forward Card Shows case study: a Next.js event platform for show discovery, dealer information, and table reservations.",
    description:
      "I designed and developed Pay It Forward Card Shows as a Next.js platform, with a custom CMS, Vercel Serverless Functions, and Neon Postgres supporting shows, dealer workflows, reservations, and community content.",
    services: ["Web design", "Next.js", "Custom CMS", "Serverless backend"],
    image: "/images/pay-it-forward-project.webp",
    imageAlt:
      "Pay It Forward Card Shows homepage featuring trading-card artwork and upcoming show links",
    caseStudy: {
      role: "Design, full-stack development & CMS",
      system: "Next.js · Vercel Functions · Neon",
      headline: "A lively event platform built around the next show.",
      overview:
        "Pay It Forward Card Shows serves collectors and dealers through a recurring community event. I designed and developed the Next.js experience and the custom CMS behind it so shows, dealer participation, reservations, and the organization’s mission remain easy to manage and find.",
      detail:
        "The visual system carries the energy of the show floor while Vercel Serverless Functions and Neon Postgres support the data and backend workflows behind dates, venue details, dealer guidance, and reservation paths.",
      contributions: [
        "Responsive visual direction and frontend development",
        "Custom CMS for shows, venues, dealer guidance, and community content",
        "Vercel Serverless Functions for backend and reservation workflows",
        "Neon Postgres data layer and Vercel deployment",
      ],
      statusCopy:
        "Available in production today; the live experience reflects the system shown throughout this case study.",
      decisions: [
        {
          title: "A saved form is a success, even if the email fails",
          body: "Public forms used to return a 500 when the transactional email failed, after the submission had already been written to the database. The person on the other end sees an error and submits again — so the failure mode of a flaky email provider was duplicate records, not a lost one. Persistence and delivery are now separate guarded steps: the row is saved, delivery is attempted, and a delivery failure is logged rather than shown.",
        },
        {
          title: "Every event time is one timezone, in one place",
          body: "Date logic was duplicated across the homepage, the events page, and the structured data, and the copies disagreed — same-day shows would appear upcoming in one view and past in another, and the drift got worse around daylight saving. It is now one set of utilities anchored to America/New_York, one query path shared by 'next event' and 'upcoming events', and DST-correct offsets in the event JSON-LD. Public copy says ET so nobody has to infer it.",
        },
        {
          title: "Reset links expire when the password changes",
          body: "A reset token stayed usable until its clock ran out, so a link sitting in an old inbox was still a working key after the password had already been changed. The token is now versioned against the current password hash, which invalidates it the moment the password moves. No extra table, no new expiry to tune, and nothing the person resetting their password has to notice.",
        },
        {
          title: "User text is escaped before it reaches email HTML",
          body: "Form values were interpolated straight into HTML email bodies, which makes every notification a delivery vehicle for whatever someone typed into a public form. Values, subjects, and link attributes are escaped now. Rate limiting on the login and password-recovery routes is durable rather than a process-local map, so it survives the serverless instance it started on.",
        },
      ] satisfies readonly ProjectDecision[],
      architecture: {
        headline: "A custom event stack from page to database.",
        summary:
          "The Next.js experience is backed by a purpose-built CMS and serverless application layer, keeping event content and operational workflows in one deployable system.",
        items: [
          {
            label: "Frontend",
            value: "Next.js experience deployed through Vercel",
          },
          {
            label: "Content",
            value: "Custom CMS for shows, venues, dealers, and community information",
          },
          {
            label: "Backend",
            value: "Vercel Serverless Functions for application and reservation workflows",
          },
          {
            label: "Database",
            value: "Neon Postgres",
          },
        ],
      } satisfies ProjectArchitecture,
      screens: [
        {
          image: "/images/pay-it-forward-project.webp",
          title: "Show-first homepage",
          caption:
            "The next event and the strongest visitor actions stay visible from the first screen.",
          alt: "Pay It Forward Card Shows homepage with event navigation and trading-card artwork",
        },
        {
          image: "/images/pay-it-forward-shows.webp",
          title: "Upcoming shows",
          caption:
            "Dates, venue details, and show information are organized around the next visit.",
          alt: "Pay It Forward Card Shows upcoming shows page",
        },
        {
          image: "/images/pay-it-forward-dealers.webp",
          title: "Dealer information",
          caption:
            "Practical guidance and reservation paths give dealers a clear way to participate.",
          alt: "Pay It Forward Card Shows dealer information and table reservation page",
        },
        {
          image: "/images/pay-it-forward-about.webp",
          title: "Community story",
          caption:
            "The organization’s purpose and pay-it-forward mission have a dedicated place in the experience.",
          alt: "Pay It Forward Card Shows about page describing its community mission",
        },
      ],
    },
  },
  {
    number: "04",
    slug: "anne-newgarden",
    year: "2026",
    title: "Anne Newgarden",
    url: "https://annenewgarden.vercel.app/",
    domain: "annenewgarden.vercel.app",
    platform: "Next.js 16 · Static export · Vercel",
    shortPlatform: "Next.js · Static",
    externalLabel: "View redesign",
    status: "Redesign preview",
    statusDetail:
      "The redesign is deployed on Vercel; the original WordPress site remains on annenewgarden.com",
    summary: "A legacy author site rebuilt as a static-first editorial platform.",
    seoDescription:
      "Anne Newgarden case study: an author website redesigned and rebuilt with Next.js, React, TypeScript, static editorial content, and Vercel.",
    description:
      "I redesigned and rebuilt Anne Newgarden’s author site, migrating books, essays, news, events, and resources into a versioned Next.js experience with a clearer editorial hierarchy and a static-first delivery model.",
    services: ["Product design", "Next.js", "Content migration", "Static architecture"],
    image: "/images/anne-newgarden-project.webp",
    imageAlt:
      "Rebuilt Anne Newgarden homepage with an editorial lavender hero, large author name, portrait, book and Soul Salon actions, and simplified navigation",
    caseStudy: {
      role: "Product design, content migration & development",
      system: "Next.js 16 · React 19 · TypeScript · Tailwind CSS 4 · Vercel",
      headline: "From a legacy publishing template to a distinctive author platform.",
      overview:
        "The existing WordPress site held years of books, essays, appearances, and community material. I turned that body of work into a focused editorial experience built around Anne’s voice, current books, and Soul Salon.",
      detail:
        "The rebuild moves public content into statically generated Next.js routes, preserves reviewed archives and legacy paths, and delivers the site without a runtime CMS or database.",
      contributions: [
        "Editorial product direction, information architecture, and responsive visual system",
        "Migration of books, long-form articles, news, events, and directory content",
        "Next.js App Router architecture with version-controlled static publishing",
        "Metadata, structured data, legacy redirects, accessibility testing, and Vercel delivery",
      ],
      statusCopy:
        "The redesigned experience is publicly available on Vercel while annenewgarden.com continues to serve the original WordPress site pending domain cutover.",
      decisions: [
        {
          title: "No generated likeness of the author",
          body: "Image generation was excluded from the author portrait, the books, and every documentary photograph — those are real, reviewed source images. One Soul Salon hero is a conceptual illustration because no authentic wide image existed; it carries a visible disclosure, says so in its alt text, and its prompt is kept in the repo. Blog images are deliberately conceptual for the same reason: on a site about personal accounts, a synthetic photograph of a named person, or of a reported event, would read as evidence.",
        },
        {
          title: "Share cards that carry the work, not the face",
          body: "Social previews use a paper-sculpture motif — a gold thread crossing from a warm page into an unknown — generated at build time in the site's own typefaces. It gives each page a recognisable card without pushing the author's likeness into third-party sharing surfaces that cache and redistribute whatever they are given. Book cards keep the real covers, because those are the work.",
        },
        {
          title: "Conflicting sources stayed conflicted",
          body: "The old site said 'nearly 100' readings in one place and 'hundreds' in another; a book's release information disagreed with itself. A rewrite is the moment those quietly become a single confident number, and it would be the writer's reputation carrying the invention, not mine. Each conflict was left unresolved rather than averaged, and personal and health-related accounts stayed attributed to the speaker instead of being recast as settled fact.",
        },
        {
          title: "Static by default, with one authorised exception",
          body: "The rebuild retired the CMS, the database, and the newsletter runtime. The newsletter form was removed rather than reproduced as a control that accepts an address and does nothing with it — a false success state is worse than an absent feature. Contact is the single dynamic path: one function and a delivery service, added after explicit sign-off, reporting success only once the message is genuinely accepted, with the retention boundary written on the privacy page.",
        },
      ] satisfies readonly ProjectDecision[],
      comparison: {
        headline: "Same body of work. A clearer way into it.",
        summary:
          "The redesign replaces a dense, theme-led WordPress homepage with a deliberate editorial hierarchy for the author, books, writing archive, and Soul Salon. Drag the divider to compare the same opening viewport.",
        before: {
          image: "/images/anne-newgarden-before.webp",
          label: "Before · WordPress",
          alt: "Original Anne Newgarden WordPress homepage with a purple masthead, book promotion, Soul Salon panel, and multi-column layout",
          url: "https://annenewgarden.com/",
          technology: "Apache · WordPress · Theme and plugin stack",
        },
        after: {
          image: "/images/anne-newgarden-project.webp",
          label: "After · Next.js",
          alt: "Rebuilt Anne Newgarden homepage with an editorial lavender hero, large author name, portrait, book and Soul Salon actions, and simplified navigation",
          url: "https://annenewgarden.vercel.app/",
          technology: "Next.js 16 · React 19 · Static Vercel export",
        },
      },
      architecture: {
        headline: "A static editorial system with no runtime CMS.",
        summary:
          "The rebuild turns migrated publishing content into pre-generated pages, keeping the public experience fast, portable, and easy to reason about while preserving the depth of the archive.",
        items: [
          {
            label: "Experience",
            value: "Next.js 16 App Router, React 19, TypeScript, and Tailwind CSS 4",
          },
          {
            label: "Publishing",
            value: "Version-controlled books, blog, news, events, and directory content",
          },
          {
            label: "Delivery",
            value: "Static Vercel export with metadata, sitemap, robots, redirects, and headers",
          },
          {
            label: "Quality",
            value: "Biome, Vitest, Playwright, and Axe accessibility checks",
          },
        ],
      } satisfies ProjectArchitecture,
      screens: [
        {
          image: "/images/anne-newgarden-project.webp",
          title: "Editorial homepage",
          caption:
            "A simplified opening frame gives Anne’s voice, portrait, books, and Soul Salon a clear hierarchy.",
          alt: "Anne Newgarden redesign homepage with author portrait, editorial headline, and book and Soul Salon actions",
        },
        {
          image: "/images/anne-newgarden-books.webp",
          title: "Books",
          caption:
            "A visual books destination separates the catalog from the author story and gives each title room to lead.",
          alt: "Anne Newgarden books page with an editorial headline and two book covers",
        },
        {
          image: "/images/anne-newgarden-directory.webp",
          title: "Resource directory",
          caption:
            "Migrated recommendations become a concise, scannable directory instead of another long-form page.",
          alt: "Anne Newgarden directory page listing practitioners, specialties, and websites in a structured table",
        },
        {
          image: "/images/anne-newgarden-soul-salon.webp",
          title: "Soul Salon",
          caption:
            "The recurring gathering receives its own focused story, invitation, and visual identity.",
          alt: "Anne Newgarden Soul Salon page with an editorial introduction and online gathering artwork",
        },
      ],
    },
  },
  {
    number: "05",
    slug: "local-city-places",
    year: "2026",
    title: "Local City Places",
    url: "https://localcityplaces.com/",
    domain: "localcityplaces.com",
    platform: "Next.js · Postgres · Stripe",
    shortPlatform: "Next.js · Postgres · Stripe",
    externalLabel: "Live site",
    status: "Live",
    statusDetail: "Live and in production",
    summary: "A local business directory and membership rewards platform for the Phoenix metro.",
    seoDescription:
      "Local City Places case study: a Next.js directory and membership rewards platform with merchant self-service pages, Stripe billing, and role-based dashboards on Postgres.",
    description:
      "I designed and built Local City Places end to end — a Phoenix-metro business directory where merchants claim and run their own listing, members earn rewards, and admins operate the whole thing from role-based dashboards.",
    services: ["Product design", "Full-stack development", "Custom CMS", "Payments & cloud"],
    image: "/images/local-city-places-project.webp",
    imageAlt:
      "Local City Places homepage showing a grid of Phoenix metro merchants with photos, cities, and categories",
    caseStudy: {
      role: "Product design & full-stack development",
      system: "Next.js · Drizzle · Neon Postgres · Stripe · Vercel",
      headline: "A directory that sells one business per category, per city.",
      overview:
        "Local City Places looks like a Phoenix metro business directory, and for residents that is exactly what it is. For merchants it is something narrower and more valuable: the platform sells an exclusive category position in a single city, so one barber shop in Phoenix, one bike shop in Scottsdale. That promise is the product, and almost every hard decision in the build comes from having to keep it.",
      detail:
        "Three audiences use one application. Residents browse merchant pages and nominate favourites into a monthly sweepstakes. Merchants run their own page and watch their category lock, radio spot, and campaign audio from a dashboard. Admins work a timestamped queue of category requests, moderate reviews, and send logged email campaigns. Underneath, one Postgres schema keeps a merchant's page, position, and history in a single place, because reconciling those across separate systems is how an exclusivity promise quietly breaks.",
      contributions: [
        "Product design and full-stack Next.js development across the public site and all three dashboards",
        "Role-based admin, merchant, and member areas on one Postgres schema",
        "Timestamped category-request queue with waitlisting, invites, and merchant onboarding",
        "Passwordless magic-link authentication and a logged email campaign system",
      ],
      statusCopy:
        "Live in production with merchants across the Phoenix metro; the screens here are captured from the current build.",
      decisions: [
        {
          title: "Category priority is an index, not a promise",
          body: "Selling one business per category per city only works if you can answer 'who asked first?' months later, under pressure, when two owners disagree. So requests are their own table, timestamped on arrival, with a composite index on city, state, category, and creation time. The ordering is a query rather than a judgement call — which is why the admin queue can show a Tempe dining request as fulfilled and the next one as waitlisted without anyone arbitrating.",
        },
        {
          title: "A business exists before its owner does",
          body: "Requests, invites, and merchants are three separate tables rather than one row with status flags. A business can hold a public page with no account attached, then become a real merchant with owners and billing once an invite is accepted. Collapsing those into a single record would have meant either creating accounts for people who never asked for one, or leaving the directory empty until merchants signed up — and a directory nobody has heard of cannot attract the merchants that would fill it.",
        },
        {
          title: "The daily entry cap is a unique index",
          body: "The sweepstakes allows one entry per member per day, which is the kind of rule that quietly fails under two concurrent requests if you enforce it with a lookup and an insert. It is a unique index on member and entry date instead, so the database refuses the duplicate. The date is stored as a plain Arizona-time day rather than a timestamp: Arizona does not observe daylight saving, so 'a day' never shifts underneath the rule.",
        },
        {
          title: "One identity, three dashboards, no passwords",
          body: "Members, merchants, and admins are the same user record with a role and a profile, reached by magic link — there is no password column in the schema. Three separate applications would have meant three auth systems and constant reconciliation between a merchant's page, their category position, and the member activity pointing at them. Those three things are the product; keeping them in one schema is what makes the loop hold together.",
        },
      ] satisfies readonly ProjectDecision[],
      architecture: {
        headline: "One schema, three audiences.",
        summary:
          "A single Next.js application serves the public directory and all three dashboards, with a typed Postgres schema underneath so merchants, members, offers, and campaigns stay consistent across every surface.",
        items: [
          {
            label: "Experience",
            value: "Next.js App Router, React, TypeScript, Tailwind, and Radix primitives",
          },
          {
            label: "Application layer",
            value: "Role-based admin, merchant, and member dashboards with magic-link auth",
          },
          {
            label: "Data",
            value:
              "Drizzle ORM over Neon Postgres covering merchants, members, offers, and reviews",
          },
          {
            label: "Operations",
            value: "Stripe billing, transactional and campaign email, Vercel delivery",
          },
        ],
      } satisfies ProjectArchitecture,
      screens: [
        {
          image: "/images/local-city-places-project.webp",
          title: "Merchant directory",
          caption:
            "The public directory leads with real merchants, their city, and their category rather than a search box.",
          alt: "Local City Places homepage with a grid of Phoenix metro merchants including restaurants, nurseries, and services",
        },
        {
          image: "/images/local-city-places-request.webp",
          title: "Founding merchant request",
          caption:
            "A four-step request flow uses address autocomplete and timestamps each submission so category priority is first come, first served.",
          alt: "Local City Places founding merchant request form showing step one of four with category and business address fields",
        },
        {
          image: "/images/local-city-places-requests.webp",
          title: "The category queue",
          caption:
            "Two Tempe dining requests, a week apart: the first is fulfilled, the second waitlisted. Priority is decided by submission time, not by who follows up hardest.",
          alt: "Local City Places admin merchant requests table showing seven businesses with categories, submission dates, and statuses including one waitlisted",
        },
        {
          image: "/images/local-city-places-marketlock.webp",
          title: "What the merchant buys",
          caption:
            "The offer stated plainly inside the merchant's own dashboard — exclusivity first, then the channels that come with it.",
          alt: "MarketLock360 page in the merchant dashboard headlined Lock in your city, listing eight growth channels, 5,000 homes mailed monthly, and radio airplay",
        },
        {
          image: "/images/local-city-places-member.webp",
          title: "Why residents come back",
          caption:
            "Members nominate favourite businesses into a monthly sweepstakes. Entries and referrals are what turn a directory listing into repeat traffic.",
          alt: "Local City Places member dashboard showing sweepstakes cycle entry status, a referral link, and a leaderboard of five members",
        },
      ],
    },
  },
  {
    number: "06",
    slug: "cartersteinhoff",
    year: "2026",
    title: "Carter Steinhoff",
    url: "https://cartersteinhoff.co/",
    domain: "cartersteinhoff.co",
    platform: "Next.js · TypeScript · Tailwind CSS",
    shortPlatform: "Next.js · Tailwind",
    externalLabel: "Live site",
    status: "Live",
    statusDetail: "Live and in production",
    summary: "An independent studio site built to the standard of the work inside it.",
    seoDescription:
      "Carter Steinhoff portfolio case study: a statically generated Next.js 16 and React 19 site on Tailwind CSS v4, typed with TypeScript 7, checked by Biome and Playwright, delivered on Vercel.",
    description:
      "I designed and built this site end to end — a statically generated Next.js application with a single shared type scale, per-route social cards rendered at build time, and one dynamic route in the whole project.",
    services: ["Product design", "Next.js", "Design systems", "Static architecture"],
    image: "/images/cartersteinhoff-project.webp",
    imageAlt:
      "Carter Steinhoff homepage hero with the name set large in a serif display face over a photograph of a desk at night",
    caseStudy: {
      role: "Design, development & writing",
      system: "Next.js 16 · React 19 · TypeScript 7 · Tailwind CSS 4 · Biome · Playwright · Vercel",
      headline: "A studio site built to the standard of the work inside it.",
      overview:
        "A portfolio is a strange product: the artefact and the argument are the same thing. Somebody deciding whether to hire me is judging the build as much as reading it, so the site had to be defensible under exactly the scrutiny it invites — which mostly meant refusing the shortcuts that would have been invisible to anyone not looking closely.",
      detail:
        "Eight routes, all statically generated except a single contact function. React Server Components by default, with five client components across the whole project. The type scale lives in one place as Tailwind v4 theme tokens, so headings cannot drift. Social cards render at build time from the site's own fonts. A Playwright suite runs every route on desktop and mobile against a production build.",
      contributions: [
        "Product direction, editorial writing, and the full responsive visual system",
        "Statically generated Next.js App Router architecture with one dynamic route",
        "A shared fluid type scale as Tailwind v4 theme tokens, consumed by utilities and CSS Modules alike",
        "Build-time social cards, structured data, and a 38-test Playwright suite on desktop and mobile",
      ],
      statusCopy:
        "Live in production; the site you are reading is the system shown throughout this case study.",
      decisions: [
        {
          title: "The type scale is tokens, not conventions",
          body: "Every heading size, its line height, and its tracking are bound together as Tailwind v4 theme tokens, which makes each one both a utility for markup and a variable for CSS Modules. A hand-rolled font-size is the moment a design system starts dying, so there is nowhere in this project to write one that looks like it belongs. Ranks are chosen, not invented.",
        },
        {
          title: "One dynamic route in the whole site",
          body: "Everything is prerendered except the contact endpoint. Not for a performance score — for a smaller set of things that can break while I am not looking. A static page has no database to go down, no cold start, no runtime secret to leak. The contact form earns its exception because a portfolio without a way to reach me is decorative.",
        },
        {
          title: "Tests assert on structure, not on screenshots",
          body: "The suite checks that heading ranks descend without skipping, that internal links resolve, that the hero image is the only prioritised one, that motion actually stops under a reduced-motion preference, and that project numbers match their position in the data. Two of those exist because the numbering silently drifted from the ordering once already. Pixel snapshots would have caught none of it.",
        },
        {
          title: "The case studies say why, or say nothing",
          body: "Screenshots show what a thing does; only prose explains why it is built that way, and that is the part a client is actually evaluating. So the Decisions section is optional in the data model. Two projects here do not have one, because their source is not in front of me and a plausible-sounding rationale reconstructed after the fact would be worth less than an honest gap.",
        },
      ] satisfies readonly ProjectDecision[],
      architecture: {
        headline: "A build-time site with one moving part.",
        summary:
          "The pages, the social cards, and the type scale are all resolved before a visitor arrives. The only thing that runs on request is the contact form, and the only thing that runs in their browser is the handful of components that genuinely need state.",
        items: [
          {
            label: "Experience",
            value:
              "Next.js 16 App Router and React 19 Server Components, five client components total",
          },
          {
            label: "Design system",
            value:
              "Tailwind CSS v4 theme tokens for a fluid type scale, with CSS Modules per route",
          },
          {
            label: "Build output",
            value: "Static prerendering for every route plus build-time OpenGraph cards",
          },
          {
            label: "Quality gates",
            value: "TypeScript 7, Biome, and 38 Playwright tests on desktop and mobile",
          },
        ],
      } satisfies ProjectArchitecture,
      screens: [
        {
          image: "/images/cartersteinhoff-project.webp",
          title: "Homepage",
          caption:
            "The hero cycles through three scenes on a timer and stops entirely when the visitor prefers reduced motion — a behaviour the test suite asserts rather than trusts.",
          alt: "Homepage hero with the name in a large serif display face over a photograph of a desk at night, above a short positioning line and two calls to action",
        },
        {
          image: "/images/cartersteinhoff-gallery.webp",
          title: "The work gallery",
          caption:
            "Each project sits in browser chrome with its real domain, and can be opened as a live embed in place. Nothing loads from those sites until a visitor asks for it.",
          alt: "Portfolio index showing project cards in browser chrome, each with a screenshot, title, platform, year, and one line of summary",
        },
        {
          image: "/images/cartersteinhoff-decisions.webp",
          title: "Decisions",
          caption:
            "The section this whole site exists to carry: the reasoning behind a build, in two columns of real paragraphs rather than a bulleted feature list.",
          alt: "Case study Decisions section headed Why it is built this way, with four numbered entries in two columns",
        },
        {
          image: "/images/cartersteinhoff-services.webp",
          title: "Services",
          caption: "What I actually do, stated without the padding that usually surrounds it.",
          alt: "Services page with an oversized statement heading and a rule-topped summary column",
        },
        {
          image: "/images/cartersteinhoff-about.webp",
          title: "About",
          caption:
            "The career story as dated chapters, from a COBOL internship on a mainframe to an independent studio in Phoenix.",
          alt: "About page showing centered chapter labels with years and left-aligned prose beneath each",
        },
      ],
    },
  },
  {
    number: "07",
    slug: "provepharm",
    year: "2024",
    title: "Provepharm",
    url: "https://provepharm.vercel.app/",
    domain: "provepharm.vercel.app",
    platform: "Next.js · Faust.js · Headless WordPress",
    shortPlatform: "Next.js · Faust",
    externalLabel: "View microsite",
    status: "Previously used",
    statusDetail: "Used by Provepharm for a period of time",
    summary: "A pharmaceutical microsite built on a headless WordPress publishing stack.",
    seoDescription:
      "Provepharm case study: a Next.js and Faust.js pharmaceutical microsite powered by headless WordPress on WP Engine.",
    description:
      "I built a microsite for Provepharm that the company used for a period of time, pairing a Next.js frontend hosted on Vercel with Faust.js and a headless WordPress backend hosted on WP Engine.",
    services: ["Web development", "Next.js", "Faust.js", "Headless WordPress"],
    image: "/images/provepharm-project.webp",
    imageAlt:
      "Provepharm microsite homepage with a surgical scene and pharmaceutical company message",
    caseStudy: {
      role: "Microsite development & headless CMS integration",
      system: "Next.js/Vercel · Faust.js · WordPress/WP Engine",
      headline: "A pharmaceutical microsite split cleanly between experience and publishing.",
      overview:
        "I built this microsite for Provepharm, and the company used it for a period of time. The public experience ran as a Next.js application on Vercel while WordPress served as the headless CMS from WP Engine.",
      detail:
        "Faust.js connected those two layers so the frontend and its deployment could remain separate from the editorial backend supporting company information, products, news, press releases, and events.",
      contributions: [
        "Next.js microsite development and Vercel deployment",
        "Faust.js integration between the frontend and headless WordPress",
        "WordPress editorial backend hosted on WP Engine",
        "Reusable views for corporate, product, news, press-release, and event content",
      ],
      statusCopy:
        "The deployed microsite remains available as a reference for the implementation Provepharm used.",
      architecture: {
        headline: "A decoupled frontend and publishing architecture.",
        summary:
          "The customer-facing Next.js application and the WordPress editorial system ran on purpose-built platforms, with Faust.js joining them into one publishing experience.",
        items: [
          {
            label: "Frontend",
            value: "Next.js application hosted on Vercel",
          },
          {
            label: "Headless bridge",
            value: "Faust.js connecting the frontend to WordPress content",
          },
          {
            label: "CMS",
            value: "Headless WordPress hosted on WP Engine",
          },
          {
            label: "Content",
            value: "Company pages, products, news, press releases, and events",
          },
        ],
      } satisfies ProjectArchitecture,
      screens: [
        {
          image: "/images/provepharm-project.webp",
          title: "Corporate homepage",
          caption:
            "A focused opening statement established the company’s therapeutic and diagnostic mission.",
          alt: "Provepharm microsite homepage with a surgical scene and pharmaceutical company message",
        },
        {
          image: "/images/provepharm-products.webp",
          title: "Product catalog",
          caption:
            "Structured product content gave visitors a clear path into detailed pharmaceutical information.",
          alt: "Provepharm product catalog listing injectable pharmaceutical products",
        },
        {
          image: "/images/provepharm-bludigo.webp",
          title: "Bludigo product page",
          caption:
            "The product experience balanced brand imagery, product information, and required safety content.",
          alt: "Provepharm Bludigo product page with packaging, ampule, and safety information",
        },
        {
          image: "/images/provepharm-press-releases.webp",
          title: "Press releases",
          caption:
            "WordPress-managed announcements flowed into a focused archive on the decoupled frontend.",
          alt: "Provepharm press releases archive with a Bludigo FDA approval announcement",
        },
      ],
    },
  },
] as const;
