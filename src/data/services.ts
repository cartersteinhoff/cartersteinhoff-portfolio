export type ServiceOffering = {
  readonly number: string;
  readonly id: string;
  readonly title: string;
  readonly summary: string;
  readonly includes: readonly string[];
};

/**
 * Shared by the interactive service ledger and the agent-readable
 * Markdown representation. Keeping one catalog prevents the two public
 * formats from describing different work.
 */
export const services = [
  {
    number: "01",
    id: "website-product-design",
    title: "Website & product design",
    summary:
      "Turn an idea or an existing experience into a clear product direction and polished interface.",
    includes: [
      "Product strategy",
      "Information architecture",
      "UX/UI design",
      "Prototypes & design systems",
    ],
  },
  {
    number: "02",
    id: "full-stack-development",
    title: "Full-stack web development",
    summary:
      "Build fast, reliable websites and web apps from the interface through the API and data layer.",
    includes: [
      "Next.js, React & responsive frontend",
      "Node.js, Fastify & serverless APIs",
      "Postgres, Neon & data modeling",
      "Integrations, testing & deployment",
    ],
  },
  {
    number: "03",
    id: "cms-wordpress-development",
    title: "WordPress & CMS development",
    summary:
      "Create a publishing system your team can manage, whether it is WordPress, headless, or fully custom.",
    includes: [
      "Custom WordPress themes & plugins",
      "Headless & custom CMS builds",
      "Content models & editorial workflows",
      "Content migrations & team handoff",
    ],
  },
  {
    number: "04",
    id: "seo-performance",
    title: "Technical SEO & performance",
    summary:
      "Make your site easier to discover, faster to use, and safer to change without losing search visibility.",
    includes: [
      "Technical SEO audits",
      "Metadata, sitemaps & structured data",
      "Core Web Vitals & performance",
      "Redirects, migrations & launch QA",
    ],
  },
  {
    number: "05",
    id: "ai-automation",
    title: "AI automation & integrations",
    summary:
      "Reduce repetitive work by connecting AI, business tools, APIs, and human review into a reliable workflow.",
    includes: [
      "Workflow audits & opportunity mapping",
      "AI assistants & agent workflows",
      "Tool and API integrations",
      "Human approval, evaluation & safeguards",
    ],
  },
  {
    number: "06",
    id: "cloud-architecture",
    title: "Cloud architecture & delivery",
    summary:
      "Plan and ship dependable infrastructure for websites, applications, APIs, and data services.",
    includes: [
      "AWS, Azure, GCP & Vercel planning",
      "Compute, serverless, databases & storage",
      "CI/CD and environment strategy",
      "Monitoring, reliability & cost review",
    ],
  },
] as const satisfies readonly ServiceOffering[];
