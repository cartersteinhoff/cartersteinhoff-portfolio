import type { TechnologyStackData } from "@/data/technologies";

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

export type ProjectStory = readonly [
  {
    readonly label: string;
    readonly title: string;
    readonly body: string;
  },
  {
    readonly label: string;
    readonly title: string;
    readonly body: string;
  },
  {
    readonly label: string;
    readonly title: string;
    readonly body: string;
  },
];

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
        "RetailBoss combines daily publishing with structured destinations for brands, research, jobs, and events. I designed the frontend and built the WordPress tools that keep those parts inside one editorial system.",
      detail:
        "The central problem was scale: add distinct products without creating separate publishing workflows.",
      story: [
        {
          label: "Context",
          title: "The publication grew into a working intelligence platform.",
          body: "News moves quickly; brand records, jobs, events, rankings, and reports need durable fields and archives. RetailBoss has to support both without splitting into separate systems.",
        },
        {
          label: "Challenge",
          title: "Every new destination had to strengthen the same system.",
          body: "Separate templates and duplicated fields would multiply editorial work. Each content type needed its own structure while sharing one navigation model and backend.",
        },
        {
          label: "Approach",
          title: "Custom WordPress tools turn recurring work into reusable structure.",
          body: "I built reusable templates and custom plugins around the same content model, so editors can publish each format without rebuilding its interface.",
        },
      ] satisfies ProjectStory,
      technologyStack: {
        headline: "A publishing stack shaped around the newsroom.",
        summary:
          "WordPress is the editorial core; custom PHP, JavaScript, and CSS support the platform-specific workflows and interface.",
        groups: [
          {
            label: "Publishing system",
            technologies: [
              { id: "wordpress", role: "Editorial CMS and reusable content model" },
              { id: "php", role: "Custom theme, plugins, and backend workflows" },
            ],
          },
          {
            label: "Experience & delivery",
            technologies: [
              { id: "javascript", role: "Search, filtering, and progressive interactions" },
              { id: "css", role: "Responsive editorial and intelligence layouts" },
              { id: "apache", role: "Production web delivery for the WordPress application" },
            ],
          },
        ],
      } satisfies TechnologyStackData,
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
        {
          image: "/images/retailboss-brands.webp",
          title: "Brand directory",
          caption:
            "An alphabetized directory gives structured brand records a direct discovery path.",
          alt: "RetailBoss All brands directory with search, type and access filters, alphabet navigation, and brand entries",
        },
        {
          image: "/images/retailboss-rankings.webp",
          title: "All rankings",
          caption:
            "Filters and equal-format entries turn recurring market data into a browsable intelligence product.",
          alt: "RetailBoss All rankings page with category and access filters above retail ranking cards",
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
        "OpenWorkspace saves apps, windows, tabs, and layouts as reusable workspaces. I built the Next.js web experience and Fastify service connecting licensing, account data, and the desktop clients.",
      detail:
        "The key constraint is compatibility with installed Windows and macOS clients that do not update in lockstep.",
      story: [
        {
          label: "Context",
          title: "The product crosses the website, cloud service, and desktop.",
          body: "One product promise spans education, accounts, licensing, persistent data, and native clients. Those layers ship separately but must behave as one experience.",
        },
        {
          label: "Constraint",
          title: "A shipped desktop client makes compatibility non-negotiable.",
          body: "Server changes must preserve contracts used by installed clients. Authentication, licensing, and workspace responses therefore evolve from the client code outward.",
        },
        {
          label: "Approach",
          title: "Treat every surface as part of one product system.",
          body: "Next.js handles acquisition and account flows; Fastify centralizes service APIs; PostgreSQL stores product state; native clients perform the automation.",
        },
      ] satisfies ProjectStory,
      technologyStack: {
        headline: "One stack from product story to native client.",
        summary:
          "The web experience, TypeScript service, PostgreSQL data layer, AWS infrastructure, and native desktop code are designed as one connected product rather than separate deliveries.",
        groups: [
          {
            label: "Web experience",
            technologies: [
              { id: "nextjs", role: "Product, account, research, and trial experience" },
              { id: "react", role: "Component model across the public web application" },
              { id: "typescript", role: "Shared type safety throughout the web and API layers" },
              { id: "vercel", role: "Frontend build and deployment" },
            ],
          },
          {
            label: "Cloud service",
            technologies: [
              { id: "nodejs", role: "Runtime for the application service" },
              { id: "fastify", role: "Licensing, account, checkout, and client APIs" },
              { id: "drizzle", role: "Typed queries and database migrations" },
              { id: "postgresql", role: "Product data hosted through AWS RDS" },
            ],
          },
          {
            label: "Desktop clients",
            technologies: [
              { id: "cpp", role: "Core Windows desktop automation client" },
              { id: "dotnet", role: "Windows application and system integrations" },
              { id: "swift", role: "macOS client built with SwiftUI and AppKit" },
            ],
          },
        ],
      } satisfies TechnologyStackData,
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
          body: "Installed clients cannot change until a new release ships. Server updates therefore preserve their existing contracts, and client source is checked before any response field is removed.",
        },
        {
          title: "AWS keys were being handed to every client",
          body: "License validation returned raw IAM credentials that the desktop client did not use. After confirming that in the client source, I removed the field without changing client behavior.",
        },
        {
          title: "A missing return left admin routes open",
          body: "The authentication decorators returned a 401 but did not stop execution, allowing protected handlers to continue. Adding the missing return fixed the control-flow error.",
        },
        {
          title: "Three ways to create a license became one",
          body: "Checkout, the external API, and the admin UI created licenses through separate paths with different fields and responses. They now call one shared function instead.",
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
          image: "/images/openworkspace-capabilities.webp",
          title: "Capabilities",
          caption:
            "A capability map separates what the product restores today from the wider desktop roadmap.",
          alt: "OpenWorkspace capabilities page headed The road to a fully restorable desktop with workspace and browser restoration panels",
        },
        {
          image: "/images/openworkspace-framework.webp",
          title: "Desktop framework",
          caption:
            "The framework page explains Workspaces and FocalContextual as connected desktop concepts.",
          alt: "OpenWorkspace framework page headed A modern framework for the desktop with Workspaces and FocalContextual sections",
        },
        {
          image: "/images/openworkspace-research.webp",
          title: "Research",
          caption:
            "Research gives the product thesis a clear home beyond acquisition and account flows.",
          alt: "OpenWorkspace research page headed Advancing the desktop for the next era of work with two areas of inquiry",
        },
        {
          image: "/images/openworkspace-whitepaper-automating.webp",
          title: "Whitepaper",
          caption:
            "Long-form product thinking uses a quieter reading layout within the same visual system.",
          alt: "OpenWorkspace whitepaper titled Automating the Desktop with an overview and article navigation",
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
        "Pay It Forward serves collectors and dealers through one event platform. I designed the public experience and custom CMS so show details, dealer guidance, reservations, and community content stay coordinated.",
      detail:
        "Structured show records feed the public pages and backend workflows, with Neon Postgres for data and Vercel Functions for server-side actions.",
      story: [
        {
          label: "Context",
          title: "Collectors and dealers arrive for the same show in different ways.",
          body: "Collectors need dates, venues, and admission details. Dealers need table options and operating guidance. One site has to answer both paths without dividing the event.",
        },
        {
          label: "Challenge",
          title: "Event information becomes operational data almost immediately.",
          body: "One changed time or reservation link affects the homepage, archive, dealer guidance, email, and structured data. Duplicated event facts would drift quickly.",
        },
        {
          label: "Approach",
          title: "Make the show record the source of truth.",
          body: "Structured event records drive the public site, CMS, and serverless workflows. Dates, venues, dealer paths, and community content share one data layer throughout.",
        },
      ] satisfies ProjectStory,
      technologyStack: {
        headline: "A full-stack event platform in one deployable system.",
        summary:
          "The public experience, custom administration, event data, and communication workflows share a typed Next.js codebase and managed serverless infrastructure.",
        groups: [
          {
            label: "Experience",
            technologies: [
              { id: "nextjs", role: "Public site, custom CMS, and server routes" },
              { id: "react", role: "Show, dealer, and community interfaces" },
              { id: "typescript", role: "Typed content and application contracts" },
              { id: "tailwind", role: "Responsive visual system" },
            ],
          },
          {
            label: "Data & operations",
            technologies: [
              { id: "drizzle", role: "Typed schema and queries for the custom CMS" },
              { id: "neon", role: "Managed serverless PostgreSQL" },
              { id: "resend", role: "Transactional form and account email" },
              { id: "vercel", role: "Application and serverless deployment" },
            ],
          },
        ],
      } satisfies TechnologyStackData,
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
          body: "A completed database write no longer becomes an apparent failure when email delivery fails. Persistence is confirmed first; delivery is attempted separately and logged if it fails.",
        },
        {
          title: "Every event time is one timezone, in one place",
          body: "Homepage, archive, and JSON-LD now use one America/New_York date utility. Same-day events and DST offsets resolve consistently, and public copy labels times as ET.",
        },
        {
          title: "Reset links expire when the password changes",
          body: "Reset tokens are tied to the current password hash, so changing the password immediately invalidates older links without another table or expiry system.",
        },
        {
          title: "User text is escaped before it reaches email HTML",
          body: "Public form values are escaped before entering email HTML, including subjects and link attributes. Login and recovery rate limits use durable storage rather than a process-local map.",
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
        {
          image: "/images/pay-it-forward-contact.webp",
          title: "Contact",
          caption:
            "A direct contact path separates general questions from the structured dealer workflow.",
          alt: "Pay It Forward Card Shows contact page with message form and organization contact details",
        },
        {
          image: "/images/pay-it-forward-ebook.webp",
          title: "Collector guide",
          caption:
            "A focused guide signup extends the community content beyond event dates and logistics.",
          alt: "Pay It Forward Card Shows free ebook page with guide cover and signup form",
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
        "The WordPress site held years of books, essays, appearances, and Soul Salon material. I reorganized that archive around Anne’s current work and rebuilt it as a version-controlled Next.js site.",
      detail:
        "Reviewed content now generates static routes, with legacy paths preserved and contact isolated as the only server-side feature.",
      story: [
        {
          label: "Context",
          title: "Years of writing needed an editorial hierarchy, not a new skin.",
          body: "The archive spans books, essays, appearances, Soul Salon material, news, events, and a practitioner directory. The redesign had to clarify current work without flattening that history.",
        },
        {
          label: "Challenge",
          title: "Retire the runtime while preserving the record.",
          body: "Leaving WordPress meant preserving reviewed content, search value, and familiar paths. Inactive features were removed instead of rebuilt as controls that only appeared to work.",
        },
        {
          label: "Approach",
          title: "Turn the archive into versioned, prebuilt pages.",
          body: "Reviewed content now generates static routes for books, articles, news, events, and the directory. Redirects preserve old paths; contact remains the only server-side exception.",
        },
      ] satisfies ProjectStory,
      technologyStack: {
        headline: "A static publishing stack with one deliberate exception.",
        summary:
          "Next.js turns version-controlled editorial content into a complete static site; Vercel delivers it, while the contact path alone uses a server-side email service.",
        groups: [
          {
            label: "Editorial experience",
            technologies: [
              { id: "nextjs", role: "Static App Router pages and metadata" },
              { id: "react", role: "Reusable editorial components" },
              { id: "typescript", role: "Typed books, articles, events, and directory data" },
              { id: "tailwind", role: "Responsive visual and typography system" },
            ],
          },
          {
            label: "Delivery",
            technologies: [
              { id: "vercel", role: "Static hosting, redirects, and deployment" },
              { id: "resend", role: "Server-side delivery for the contact exception" },
            ],
          },
        ],
      } satisfies TechnologyStackData,
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
          body: "Portraits, book covers, and documentary images use reviewed source material. Generated artwork appears only where no authentic image existed, is disclosed in visible copy and alt text, and never depicts a named person or reported event as evidence.",
        },
        {
          title: "Share cards that carry the work, not the face",
          body: "Social cards use a build-time paper-sculpture motif instead of the author’s portrait; book pages retain real covers. That keeps previews recognizable without distributing her likeness through third-party caches.",
        },
        {
          title: "Conflicting sources stayed conflicted",
          body: "Conflicting source claims remained unresolved rather than being averaged into false certainty. Personal and health-related accounts stay attributed to the speaker.",
        },
        {
          title: "Static by default, with one authorised exception",
          body: "The inactive newsletter was removed rather than reproduced as a false control. Contact remains the single server-side path and reports success only after the delivery service accepts the message.",
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
        {
          image: "/images/anne-newgarden-about.webp",
          title: "Author story",
          caption:
            "A quieter biography page connects Anne’s curiosity, writing, and lived experience.",
          alt: "Anne Newgarden About page headed A writer led by curiosity with author photograph and biographical sections",
        },
        {
          image: "/images/anne-newgarden-blog.webp",
          title: "Writing archive",
          caption:
            "The migrated journal receives an editorial index with a direct path into long-form entries.",
          alt: "Anne Newgarden Blog page headed Notes from an unfinished conversation with featured article imagery",
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
        "Local City Places is a Phoenix-metro directory built around one rule: one merchant per category in each city. Residents browse businesses; merchants and admins manage the requests, listings, memberships, and billing behind that promise.",
      detail:
        "One Next.js application serves the public directory and three role-based dashboards over a shared Postgres schema.",
      story: [
        {
          label: "Context",
          title: "The directory is only the public edge of the product.",
          body: "Residents browse local businesses, services, media, and offers. Merchants manage listings and campaigns; administrators coordinate requests, invitations, and category availability.",
        },
        {
          label: "Product rule",
          title: "Category exclusivity has to be enforceable, not promotional copy.",
          body: "One business can hold a category in each city. Request time, location, category, fulfillment, and waitlist position therefore belong in durable product data.",
        },
        {
          label: "Approach",
          title: "One application keeps public pages and operations in sync.",
          body: "One Next.js application and Postgres schema connect merchant records, requests, nominations, offers, media, and history while each role gets a purpose-built interface.",
        },
      ] satisfies ProjectStory,
      technologyStack: {
        headline: "A typed product stack for three audiences.",
        summary:
          "The directory, role-based dashboards, merchant publishing, membership loop, and billing run in one Next.js application over a shared PostgreSQL model.",
        groups: [
          {
            label: "Experience",
            technologies: [
              { id: "nextjs", role: "Public directory and role-based application routes" },
              { id: "react", role: "Resident, merchant, member, and admin interfaces" },
              { id: "typescript", role: "Typed contracts across UI, actions, and data" },
              { id: "tailwind", role: "Responsive product design system" },
            ],
          },
          {
            label: "Data, commerce & delivery",
            technologies: [
              { id: "drizzle", role: "Schema, migrations, and typed data access" },
              {
                id: "neon",
                role: "Managed PostgreSQL for merchants, requests, members, offers, and history",
              },
              { id: "stripe", role: "Merchant subscription and billing workflows" },
              { id: "vercel", role: "Application, server routes, and asset delivery" },
            ],
          },
        ],
      } satisfies TechnologyStackData,
      contributions: [
        "Product design and full-stack Next.js development across the public site and all three dashboards",
        "Role-based admin, merchant, and member areas on one Postgres schema",
        "Timestamped category-request queue with waitlisting, invites, and merchant onboarding",
        "Passwordless magic-link authentication and a logged email campaign system",
      ],
      statusCopy: "Live in production; these screens are captured from the current build.",
      decisions: [
        {
          title: "Category priority is an index, not a promise",
          body: "Category requests are timestamped and indexed by city, state, category, and creation time. The admin queue resolves first-come priority from data instead of inbox history or judgment.",
        },
        {
          title: "A business exists before its owner does",
          body: "Requests, invitations, and merchant accounts remain separate. A listing can exist before ownership is claimed, then gain users and billing when an invitation is accepted.",
        },
        {
          title: "The daily entry cap is a unique index",
          body: "A unique index on member and Arizona entry date enforces one sweepstakes entry per day, including concurrent requests. A plain local date avoids DST conversion.",
        },
        {
          title: "One identity, three dashboards, no passwords",
          body: "Members, merchants, and admins share one passwordless user model with role-specific views. Listings, category positions, and member activity therefore remain in the same schema.",
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
            "The merchant dashboard presents category exclusivity alongside the included campaign channels.",
          alt: "MarketLock360 page in the merchant dashboard headlined Lock in your city, listing eight growth channels, 5,000 homes mailed monthly, and radio airplay",
        },
        {
          image: "/images/local-city-places-member.webp",
          title: "Member nominations",
          caption: "Members can see their nomination status and referral link from one dashboard.",
          alt: "Local City Places member dashboard showing sweepstakes cycle entry status, a referral link, and a leaderboard of five members",
        },
        {
          image: "/images/local-city-places-merchant.webp",
          title: "Public merchant page",
          caption:
            "A live profile brings gallery, hours, services, contact details, and merchant media into one public record.",
          alt: "Local City Places profile for R Robinson Bookkeeping with a photo gallery, Phoenix location, business details, hours, and overview",
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
      "I designed and built this statically generated Next.js portfolio around shared project data, build-time social cards, and one request-time contact endpoint.",
    services: ["Product design", "Next.js", "Design systems", "Static architecture"],
    image: "/images/cartersteinhoff-project.webp",
    imageAlt:
      "Carter Steinhoff homepage hero with the name set large in a serif display face over a photograph of a desk at night",
    caseStudy: {
      role: "Design, development & writing",
      system: "Next.js 16 · React 19 · TypeScript 7 · Tailwind CSS 4 · Biome · Playwright · Vercel",
      headline: "A studio site built to the standard of the work inside it.",
      overview:
        "The portfolio is both the artifact and the argument: every design and engineering claim has to survive inspection in the site itself.",
      detail:
        "The public pages and eight data-driven case studies are statically generated around a single contact function. React Server Components are the default, client code is reserved for a small set of interactive boundaries, and a production browser suite checks every route on desktop and mobile.",
      story: [
        {
          label: "Context",
          title: "The portfolio has to prove the claim while making it.",
          body: "Clients read the cases while judging the typography, images, performance, accessibility, and decisions used to present them. The portfolio is also a working product sample.",
        },
        {
          label: "Challenge",
          title: "Editorial ambition cannot depend on a fragile runtime.",
          body: "Large images, metadata, motion, structured data, and new case studies can create too much runtime complexity. The design needed character with a small production boundary.",
        },
        {
          label: "Approach",
          title: "Generate the publication; isolate the one live service.",
          body: "Project data drives the index, routes, navigation, metadata, sitemap, and case studies. Static rendering handles the publication; four client components handle interactions; contact is the only request-time endpoint.",
        },
      ] satisfies ProjectStory,
      technologyStack: {
        headline: "A static-first studio stack with one live endpoint.",
        summary:
          "Next.js and React generate the editorial site, Tailwind and shared tokens hold the visual system together, and Vercel runs the contact boundary without adding a database or CMS.",
        groups: [
          {
            label: "Experience",
            technologies: [
              { id: "nextjs", role: "App Router pages, metadata, and static case-study routes" },
              {
                id: "react",
                role: "Server-first component model with four interactive boundaries",
              },
              { id: "typescript", role: "Typed project data and route contracts" },
              { id: "tailwind", role: "Fluid type tokens and responsive layout utilities" },
            ],
          },
          {
            label: "Delivery",
            technologies: [
              { id: "vercel", role: "Static pages, image optimization, and contact function" },
              { id: "resend", role: "Server-only contact delivery" },
            ],
          },
        ],
      } satisfies TechnologyStackData,
      contributions: [
        "Product direction, editorial writing, and the full responsive visual system",
        "Data-driven App Router case studies and static route generation",
        "A shared fluid type scale as Tailwind v4 theme tokens, consumed by utilities and CSS Modules alike",
        "Build-time social cards, structured data, and production browser checks across desktop and mobile",
      ],
      statusCopy:
        "Live in production; the site you are reading is the system shown throughout this case study.",
      decisions: [
        {
          title: "The type scale is tokens, not conventions",
          body: "Heading size, line height, and tracking are Tailwind theme tokens exposed to both utilities and CSS Modules. Components choose a rank instead of inventing one.",
        },
        {
          title: "One request-time endpoint",
          body: "Every page prerenders; contact is the only request-time endpoint. That keeps the production surface small while preserving a real way to get in touch.",
        },
        {
          title: "Tests assert on structure, not on screenshots",
          body: "Playwright checks document hierarchy, links, image priority, reduced motion, project ordering, and overflow. Those contracts catch drift without coupling tests to pixels.",
        },
        {
          title: "The case studies say why, or say nothing",
          body: "Screenshots show what a thing does; prose explains why it is built that way. The Decisions section is optional because a plausible rationale reconstructed after the fact is worth less than an honest gap.",
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
              "Next.js 16 App Router and React 19 Server Components, with four client components",
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
            value: "TypeScript 7, Biome, and Playwright checks on desktop and mobile",
          },
        ],
      } satisfies ProjectArchitecture,
      screens: [
        {
          image: "/images/cartersteinhoff-project.webp",
          width: 1440,
          height: 900,
          title: "Homepage",
          caption:
            "The hero cycles through three scenes on a timer and stops entirely when the visitor prefers reduced motion — a behaviour the test suite asserts rather than trusts.",
          alt: "Homepage hero with the name in a large serif display face over a photograph of a desk at night, above a short positioning line and two calls to action",
        },
        {
          image: "/images/cartersteinhoff-gallery.webp",
          width: 1440,
          height: 900,
          title: "The work gallery",
          caption:
            "Each project sits in browser chrome with its real domain, then links into a case study with a separate path to the live site.",
          alt: "Portfolio index showing project cards in browser chrome, each with a screenshot, title, platform, year, and one line of summary",
        },
        {
          image: "/images/cartersteinhoff-decisions.webp",
          width: 1440,
          height: 900,
          title: "Decisions",
          caption:
            "The section this whole site exists to carry: the reasoning behind a build, in two columns of real paragraphs rather than a bulleted feature list.",
          alt: "Case study Decisions section headed Why it is built this way, with four numbered entries in two columns",
        },
        {
          image: "/images/cartersteinhoff-services.webp",
          width: 1440,
          height: 900,
          title: "Services",
          caption: "What I actually do, stated without the padding that usually surrounds it.",
          alt: "Services page with an oversized statement heading and a rule-topped summary column",
        },
        {
          image: "/images/cartersteinhoff-about.webp",
          width: 1440,
          height: 900,
          title: "About",
          caption:
            "The career story as dated chapters, from a COBOL internship on a mainframe to an independent studio in Phoenix.",
          alt: "About page showing centered chapter labels with years and left-aligned prose beneath each",
        },
        {
          image: "/images/cartersteinhoff-contact.webp",
          title: "Contact",
          caption:
            "A focused project brief keeps the site’s only request-time feature direct and useful.",
          alt: "Carter Steinhoff contact page with project brief fields beside the heading Let’s make something good",
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
    externalLabel: "View archive",
    status: "Archived",
    statusDetail: "Archived reference deployment; no longer the company’s current website",
    summary: "A pharmaceutical microsite built on a headless WordPress publishing stack.",
    seoDescription:
      "Provepharm case study: a Next.js and Faust.js pharmaceutical microsite powered by headless WordPress on WP Engine.",
    description:
      "I built Provepharm’s former microsite with Next.js and Faust.js, backed by headless WordPress on WP Engine. The archived Vercel deployment remains available as an implementation reference.",
    services: ["Web development", "Next.js", "Faust.js", "Headless WordPress"],
    image: "/images/provepharm-project.webp",
    imageAlt:
      "Provepharm microsite homepage with a surgical scene and pharmaceutical company message",
    caseStudy: {
      role: "Microsite development & headless CMS integration",
      system: "Next.js/Vercel · Faust.js · WordPress/WP Engine",
      headline: "A pharmaceutical microsite split cleanly between experience and publishing.",
      overview:
        "The former microsite separated a Next.js frontend on Vercel from a WordPress editorial backend on WP Engine.",
      detail:
        "Faust.js connected company, product, news, press-release, and event content to reusable frontend views.",
      story: [
        {
          label: "Context",
          title: "The microsite needed a focused frontend and a familiar newsroom.",
          body: "The public experience covered corporate positioning, company history, pharmaceutical products, news, press releases, and events. Those pages needed a consistent presentation layer while still giving the editorial team a WordPress publishing environment for structured updates.",
        },
        {
          label: "Publishing model",
          title: "Content and presentation run on separate platforms.",
          body: "WordPress on WP Engine owned the editorial records. Faust.js and GraphQL fed a separately deployed Next.js frontend, allowing publishing and presentation to follow separate deployment paths.",
        },
        {
          label: "Application",
          title: "Reusable views carry both product depth and company news.",
          body: "The frontend turned WordPress content into product, company, press, and event views. The archived deployment remains available, but Provepharm’s current corporate site now lives elsewhere.",
        },
      ] satisfies ProjectStory,
      technologyStack: {
        headline: "A decoupled stack from WordPress to Vercel.",
        summary:
          "Faust.js and GraphQL bridged a managed WordPress backend to a separately deployed Next.js frontend.",
        groups: [
          {
            label: "Frontend",
            technologies: [
              { id: "nextjs", role: "Customer-facing microsite and generated content routes" },
              { id: "react", role: "Reusable corporate, product, and archive views" },
              { id: "vercel", role: "Frontend build and historical reference deployment" },
            ],
          },
          {
            label: "Publishing",
            technologies: [
              { id: "wordpress", role: "Editorial source for company and product content" },
              { id: "graphql", role: "Faust.js content bridge and query layer" },
              { id: "wpengine", role: "Managed hosting for the headless WordPress backend" },
            ],
          },
        ],
      } satisfies TechnologyStackData,
      contributions: [
        "Next.js microsite development and Vercel deployment",
        "Faust.js integration between the frontend and headless WordPress",
        "WordPress editorial backend hosted on WP Engine",
        "Reusable views for corporate, product, news, press-release, and event content",
      ],
      statusCopy: "This is an archived implementation, not Provepharm’s current website.",
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
        {
          image: "/images/provepharm-about.webp",
          title: "Company story",
          caption:
            "Mission and company-history content used the same headless publishing model as the product catalog.",
          alt: "Archived Provepharm About page with surgical imagery and the message Connecting healthcare providers with patients to improve lives",
        },
        {
          image: "/images/provepharm-events.webp",
          title: "Events archive",
          caption:
            "Reusable event records extended the WordPress-fed editorial system beyond news.",
          alt: "Archived Provepharm Events page listing healthcare conferences and annual meetings",
        },
      ],
    },
  },
  {
    number: "08",
    slug: "anne-ross",
    year: "2024",
    title: "Anne Ross Creative",
    url: "https://anneross.com/",
    domain: "anneross.com",
    platform: "WordPress · Elementor · Hello theme",
    shortPlatform: "WordPress · Elementor",
    externalLabel: "Live site",
    status: "Live",
    statusDetail: "Live and in production",
    summary: "An image-first portfolio for a prop, set, and interior stylist.",
    seoDescription:
      "Anne Ross Creative case study: a WordPress and Elementor portfolio redesigned around responsive galleries for prop, set, interior, lifestyle, and still-life work.",
    description:
      "I redesigned and rebuilt Anne Ross Creative as an image-first WordPress portfolio, replacing the former theme-led gallery with a restrained Elementor system for her prop, set, interior, lifestyle, and still-life work.",
    services: ["Web design", "WordPress", "Elementor", "Content architecture"],
    image: "/images/anne-ross-project.webp",
    imageAlt:
      "Anne Ross Creative homepage with fixed sage navigation beside a three-column gallery of styled interiors, bedding, and tabletop photography",
    caseStudy: {
      role: "Web design & WordPress development",
      system: "WordPress · Elementor · Hello theme",
      headline: "A visual portfolio that gives the styling room to lead.",
      overview:
        "I rebuilt Anne Ross’s portfolio around direct access to her prop, set, interior, lifestyle, still-life, and motion work.",
      detail:
        "The rebuild replaces ePix and Visual Composer with Elementor and Hello, using persistent navigation and responsive galleries across desktop and mobile.",
      story: [
        {
          label: "Context",
          title: "The work should arrive before the explanation.",
          body: "Visitors often arrive looking for one kind of styling. The opening gallery establishes Anne’s range, then gives each discipline a direct path without placing a heavy interface over the images.",
        },
        {
          label: "Challenge",
          title: "Five disciplines need one recognizable browsing model.",
          body: "Home & Garden, Lifestyle, Still Life, Sets, and Motion use different media but belong to one practice. Navigation and image treatment remain consistent while each gallery keeps its own rhythm.",
        },
        {
          label: "Approach",
          title: "Use a quiet frame and let the galleries change inside it.",
          body: "A fixed desktop rail and compact mobile menu hold the frame steady. Masonry galleries carry photography; a separate video grid handles motion; Bio, Client List, and Contact provide context.",
        },
      ] satisfies ProjectStory,
      technologyStack: {
        headline: "A lightweight WordPress system built around visual work.",
        summary:
          "WordPress manages the galleries; Elementor and Hello provide the page system; Cloudflare supports delivery.",
        groups: [
          {
            label: "Publishing & delivery",
            technologies: [
              { id: "wordpress", role: "Portfolio content and page management" },
              { id: "php", role: "Theme and WordPress runtime" },
              { id: "cloudflare", role: "Edge proxy and cached asset delivery" },
            ],
          },
          {
            label: "Experience",
            technologies: [
              { id: "elementor", role: "Reusable gallery, motion, and information pages" },
              { id: "css", role: "Responsive masonry, navigation, and visual restraint" },
              { id: "javascript", role: "Menu and gallery interaction" },
            ],
          },
        ],
      } satisfies TechnologyStackData,
      contributions: [
        "Visual direction and responsive portfolio design",
        "WordPress and Elementor implementation with reusable gallery pages",
        "Content organization across Home & Garden, Lifestyle, Still Life, Sets, and Motion",
        "Responsive navigation plus dedicated bio, client-list, and contact paths",
      ],
      statusCopy:
        "The redesigned portfolio is live on anneross.com, with current work organized across focused visual galleries.",
      comparison: {
        headline: "From a theme-led gallery to a quieter frame.",
        summary:
          "The redesign replaces the former ePix portfolio shell with a restrained visual system, clearer disciplines, responsive navigation, and more direct paths to Anne’s biography, clients, and contact details.",
        before: {
          image: "/images/anne-ross-before.webp",
          label: "Before · ePix",
          alt: "Archived Anne Ross portfolio with a gray navigation rail, pale blue typography, and monochrome catalog gallery",
          url: "https://web.archive.org/web/20230320194455/https://anneross.com/",
          technology: "WordPress · ePix · Visual Composer",
        },
        after: {
          image: "/images/anne-ross-project.webp",
          label: "After · Elementor",
          alt: "Current Anne Ross Creative portfolio with a sage navigation rail and full-color masonry gallery of interiors and styled environments",
          url: "https://anneross.com/",
          technology: "WordPress · Elementor · Hello",
        },
      },
      architecture: {
        headline: "A WordPress portfolio organized around the work.",
        summary:
          "The site pairs a lightweight page system with visual category archives, keeping navigation steady while each discipline gets its own evolving gallery.",
        items: [
          {
            label: "Experience",
            value: "Responsive three-column galleries with persistent desktop navigation",
          },
          {
            label: "Publishing",
            value: "Elementor page system on the lightweight Hello theme",
          },
          {
            label: "Content",
            value: "Home & Garden, Lifestyle, Still Life, Sets, Motion, bio, clients, and contact",
          },
          {
            label: "Delivery",
            value: "Production WordPress site with Cloudflare edge caching",
          },
        ],
      } satisfies ProjectArchitecture,
      screens: [
        {
          image: "/images/anne-ross-project.webp",
          title: "Home & Garden",
          caption:
            "The portfolio opens directly on the work while a fixed desktop rail keeps every discipline close.",
          alt: "Anne Ross Creative Home and Garden gallery with styled interiors, bedrooms, linens, and tabletop scenes",
        },
        {
          image: "/images/anne-ross-lifestyle.webp",
          title: "Lifestyle",
          caption:
            "A dedicated gallery carries the same visual rhythm across fashion, food, home, and location work.",
          alt: "Anne Ross Creative Lifestyle gallery with colorful editorial photographs of models, flowers, food, and home scenes",
        },
        {
          image: "/images/anne-ross-still-life.webp",
          title: "Still Life",
          caption:
            "Product and tabletop compositions get a focused archive without changing the browsing model.",
          alt: "Anne Ross Creative Still Life gallery with styled products, apparel, glassware, textiles, and tabletop compositions",
        },
        {
          image: "/images/anne-ross-sets.webp",
          title: "Sets",
          caption:
            "Campaign environments and studio-built scenes sit inside the same restrained gallery system.",
          alt: "Anne Ross Creative Sets gallery with fashion campaigns, studio interiors, and winter landscape scenes",
        },
        {
          image: "/images/anne-ross-motion.webp",
          title: "Motion",
          caption: "A dedicated video grid adapts the portfolio system for moving-image work.",
          alt: "Anne Ross Creative Motion page with a three-column grid of video projects and campaign stills",
        },
        {
          image: "/images/anne-ross-bio.webp",
          title: "Bio",
          caption:
            "A concise biography adds professional context without interrupting the image-first galleries.",
          alt: "Anne Ross Creative biography page headed Creative Visions, Global Journeys with portrait and career text",
        },
      ],
    },
  },
] as const;
