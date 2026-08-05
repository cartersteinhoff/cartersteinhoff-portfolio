import type { Metadata } from "next";
import { ArrowLink } from "@/components/arrow-link";
import { Reveal } from "@/components/reveal";
import { site } from "@/data/site";

const description =
  "Website design, full-stack development, custom CMS systems, AI automation, and cloud delivery from Carter Steinhoff.";

export const metadata: Metadata = {
  title: "Services",
  description,
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: `Services — ${site.name}`,
    description,
    type: "website",
    url: "/services",
    images: [
      {
        url: "/images/studio-hero.webp",
        width: 1672,
        height: 941,
        alt: "Carter Steinhoff working in his Phoenix studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Services — ${site.name}`,
    description,
    images: [
      {
        url: "/images/studio-hero.webp",
        alt: "Carter Steinhoff working in his Phoenix studio",
      },
    ],
  },
};

const services = [
  {
    number: "01",
    title: "Web strategy & design",
    description:
      "Turn a rough idea or an aging experience into a clear product direction, visual system, and responsive interface.",
    capabilities: [
      "Discovery",
      "UX architecture",
      "Website design",
      "Product design",
      "Design systems",
      "Responsive prototypes",
    ],
  },
  {
    number: "02",
    title: "Full-stack development",
    description:
      "Build fast, maintainable web products with a frontend people enjoy using and a backend that supports the real workflow.",
    capabilities: [
      "Next.js",
      "React",
      "TypeScript",
      "APIs",
      "Databases",
      "Authentication",
      "Payments & integrations",
    ],
  },
  {
    number: "03",
    title: "CMS development",
    description:
      "Create publishing systems around the people who use them, from a tailored editorial workflow to custom business functionality.",
    capabilities: [
      "WordPress",
      "Custom themes",
      "Custom plugins",
      "Headless CMS",
      "Content modeling",
      "Editorial workflows",
      "Migrations",
    ],
  },
  {
    number: "04",
    title: "AI automation",
    description:
      "Connect models, tools, and human review into useful workflows that reduce repetitive work without hiding how the system operates.",
    capabilities: [
      "Agent workflows",
      "Process automation",
      "Content pipelines",
      "Data enrichment",
      "API integrations",
      "Human review",
      "Monitoring",
    ],
  },
  {
    number: "05",
    title: "Cloud & DevOps",
    description:
      "Take a product from local development to a dependable production environment with the right platform, deployment, and visibility.",
    capabilities: [
      "AWS",
      "Microsoft Azure",
      "Google Cloud",
      "Vercel",
      "CI/CD",
      "Environment strategy",
      "Observability",
    ],
  },
  {
    number: "06",
    title: "Performance & stewardship",
    description:
      "Keep the experience fast, findable, accessible, secure, and maintainable after the first launch.",
    capabilities: [
      "Accessibility",
      "Performance",
      "Technical SEO",
      "Analytics",
      "Security hardening",
      "Maintenance",
      "Documentation",
    ],
  },
] as const;

export default function ServicesPage() {
  return (
    <main className="bg-[var(--dusk)] text-[var(--sand)]">
      <section className="services-hero page-hero">
        <div className="page-hero-inner">
          <p className="page-kicker">Services · Idea to infrastructure</p>
          <div className="services-hero-stage">
            <div className="services-hero-copy">
              <h1 className="services-hero-title page-title max-w-6xl">
                <span className="block">Design it. Build it.</span>
                <span className="italic text-[var(--accent)]">Make it useful.</span>
              </h1>
              <p className="services-intro section-lead mt-8">
                I work across the whole digital product: the idea, interface, code, content system,
                integrations, infrastructure, and handoff.
              </p>
            </div>
            <div className="services-system-map" aria-hidden="true">
              <span className="services-system-ring services-system-ring-outer" />
              <span className="services-system-ring services-system-ring-inner" />
              <span className="services-system-axis services-system-axis-horizontal" />
              <span className="services-system-axis services-system-axis-vertical" />
              <span className="services-system-core">
                <strong>One system</strong>
                <small>idea → live product</small>
              </span>
              <span className="services-system-node services-system-node-strategy">Strategy</span>
              <span className="services-system-node services-system-node-design">Design</span>
              <span className="services-system-node services-system-node-build">Build</span>
              <span className="services-system-node services-system-node-ai">AI</span>
              <span className="services-system-node services-system-node-cloud">Cloud</span>
              <span className="services-system-node services-system-node-cms">CMS</span>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/15">
        <div className="mx-auto max-w-[1500px] px-5 md:px-8">
          {services.map((service) => (
            <Reveal key={service.number} className="service-entry">
              <span className="service-number">{service.number}</span>
              <h2 className="service-title">{service.title}</h2>
              <div>
                <p className="service-description section-lead">{service.description}</p>
                <ul className="service-capability-list mt-9">
                  {service.capabilities.map((capability) => (
                    <li key={capability}>{capability}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="sunset-band overflow-hidden bg-[var(--sunset-deep)] px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-[1500px]">
          <Reveal className="services-platform-intro grid gap-10 lg:grid-cols-[0.65fr_1.35fr]">
            <p className="section-label">Platforms</p>
            <div>
              <h2 className="services-platform-heading section-title max-w-5xl">
                The right cloud,
                <span className="italic text-[var(--accent)]"> not more cloud.</span>
              </h2>
              <p className="section-lead mt-8 lg:ml-auto">
                I work across the major platforms and choose around the product’s needs—then leave a
                deployment path the next person can understand.
              </p>
            </div>
          </Reveal>
          <Reveal className="platform-rail mt-14 md:mt-16">
            {[
              ["AWS", "Amazon Web Services"],
              ["Azure", "Microsoft cloud"],
              ["GCP", "Google Cloud"],
              ["Vercel", "Frontend cloud"],
            ].map(([name, detail]) => (
              <div key={name}>
                <strong>{name}</strong>
                <span>{detail}</span>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="bg-[var(--ink)] px-5 py-20 md:px-8 md:py-28">
        <Reveal className="mx-auto grid max-w-[1500px] gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
          <div>
            <p className="section-label">Teaching experience</p>
            <p className="section-lead mt-7 max-w-sm">
              I served as a web development instructor at Nucamp, helping new developers turn
              technical ideas into practical, working skills.
            </p>
          </div>
          <div>
            <h2 className="services-teaching-heading section-title max-w-5xl">
              Good systems should be
              <span className="italic text-[var(--accent)]"> explainable.</span>
            </h2>
            <div className="mt-10 flex justify-end">
              <ArrowLink href="/contact" inverse>
                Talk about a project
              </ArrowLink>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
