export const site = {
  name: "Carter Steinhoff",
  shortName: "CS",
  role: "Designer & developer",
  location: "Phoenix, Arizona",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "cartersteinhoff@gmail.com",
  description:
    "Carter Steinhoff designs and builds thoughtful digital products, editorial platforms, and brand experiences from Phoenix, Arizona.",
};

export function getSiteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }

  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return "http://localhost:3000";
}

export const portfolioProjects = [
  {
    number: "01",
    slug: "retailboss",
    title: "RetailBoss",
    url: "https://retailboss.co/",
    domain: "retailboss.co",
    platform: "WordPress",
    summary: "A publishing and intelligence platform for the business of retail.",
    description:
      "I designed and developed RetailBoss end to end in WordPress, including its editorial experience, custom plugins, brand and research tools, jobs, events, and the systems supporting publication.",
    services: ["Web design", "WordPress", "Custom plugins", "Platform systems"],
    image: "/images/retailboss-project.webp",
    imageAlt:
      "RetailBoss homepage showing featured retail stories, jobs, events, and brand coverage",
    caseStudy: {
      role: "Design, development & platform systems",
      system: "WordPress · Custom plugins",
      headline: "A custom publishing system built for the pace of retail.",
      overview:
        "RetailBoss is a retail news and market-intelligence platform. I designed and developed the experience end to end in WordPress, pairing an editorial frontend with custom plugins and operational tools behind it.",
      detail:
        "The work spans daily publishing, brand discovery, research, jobs, events, structured content, and the reusable systems that let the platform keep expanding without turning every feature into a one-off.",
      contributions: [
        "Editorial templates and reusable content systems",
        "Custom WordPress plugins for platform-specific workflows",
        "Brand directory, rankings, reports, jobs, and events",
        "Responsive frontend, technical SEO, deployment, and production stewardship",
      ],
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
    platform: "Next.js",
    summary: "A focused event platform for collectors, dealers, and community giving.",
    description:
      "I designed and developed Pay It Forward Card Shows in Next.js, bringing upcoming shows, dealer information, reservations, and the organization’s community mission into one clear experience.",
    services: ["Web design", "Next.js", "Event systems", "Content workflows"],
    image: "/images/pay-it-forward-project.webp",
    imageAlt:
      "Pay It Forward Card Shows homepage featuring trading-card artwork and upcoming show links",
    caseStudy: {
      role: "Design & development",
      system: "Next.js · Event platform",
      headline: "A lively event platform built around the next show.",
      overview:
        "Pay It Forward Card Shows serves collectors and dealers through a recurring community event. I designed and developed the Next.js experience so the next show, dealer participation, reservations, and the organization’s mission are easy to find.",
      detail:
        "The visual system carries the energy of the show floor while the information architecture keeps dates, venue details, dealer guidance, and action paths within a few clear choices.",
      contributions: [
        "Responsive visual direction and frontend development",
        "Event discovery and date-driven content",
        "Dealer information and reservation paths",
        "Content structure for the organization’s community mission",
      ],
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
    platform: "Next.js",
    summary: "Desktop automation made simple enough to understand at a glance.",
    description:
      "I designed and developed OpenWorkspace in Next.js, shaping a focused product experience around one clear promise: save a working setup and reopen it whenever it is needed.",
    services: ["Product design", "Next.js", "Desktop automation", "Vercel"],
    image: "/images/openworkspace-project.webp",
    imageAlt: "OpenWorkspace homepage explaining how to save apps, windows, tabs, and layouts",
    caseStudy: {
      role: "Product design & development",
      system: "Next.js · Vercel",
      headline: "A product story for putting a working desktop back together.",
      overview:
        "OpenWorkspace saves apps, windows, tabs, and layout as a reusable workspace file. I designed and developed the Next.js product experience to explain that desktop-automation idea quickly and make the path to a trial feel straightforward.",
      detail:
        "The experience moves from one clear promise into visual workflow education, product UI, compatibility guidance, and a focused conversion path without burying the product in technical language.",
      contributions: [
        "Product positioning and responsive interface design",
        "Next.js marketing and product frontend",
        "Workflow explanation and product visualization",
        "Compatibility guidance, trial path, and Vercel delivery",
      ],
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
] as const;
