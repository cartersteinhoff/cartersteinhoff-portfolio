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

export const portfolioProjects = [
  {
    number: "01",
    slug: "retailboss",
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
    slug: "pay-it-forward-card-shows",
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
    number: "03",
    slug: "openworkspace",
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
    number: "04",
    slug: "provepharm",
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
  {
    number: "05",
    slug: "anne-newgarden",
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
] as const;
