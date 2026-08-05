import Link from "next/link";
import { ArrowLink } from "@/components/arrow-link";
import { Reveal } from "@/components/reveal";
import { portfolioProjects } from "@/data/site";
import { createPageMetadata } from "@/lib/seo";

const description =
  "Product design, full-stack and CMS development, AI automation, cloud architecture, and delivery across AWS, Azure, GCP, and Vercel.";

export const metadata = createPageMetadata({
  title: "Services",
  description,
  path: "/services",
  image: {
    url: "/images/studio-hero.webp",
    width: 1672,
    height: 941,
    alt: "Carter Steinhoff working in his Phoenix studio",
  },
});

type ProjectSlug = (typeof portfolioProjects)[number]["slug"];

type ServiceGroup = {
  readonly number: string;
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly capabilities: readonly string[];
  readonly projectSlugs: readonly ProjectSlug[];
};

const serviceGroups = [
  {
    number: "01",
    id: "product-design-frontend",
    title: "Product design & frontend",
    description:
      "Shape the product before building it—positioning, user flows, visual direction, and a responsive interface that makes the experience clear from the first screen.",
    capabilities: [
      "Product strategy",
      "UX architecture",
      "Interface design",
      "Design systems",
      "Next.js & React",
      "Accessibility & performance",
    ],
    projectSlugs: ["openworkspace", "provepharm"],
  },
  {
    number: "02",
    id: "full-stack-cms",
    title: "Full-stack platforms & CMS",
    description:
      "Build the application and the operating surface behind it: APIs, data, custom publishing workflows, integrations, and a deployment path that stays maintainable.",
    capabilities: [
      "TypeScript & APIs",
      "Postgres & data modeling",
      "Custom WordPress plugins",
      "Headless & custom CMS",
      "Authentication & payments",
      "Technical SEO & stewardship",
    ],
    projectSlugs: ["retailboss", "pay-it-forward-card-shows"],
  },
  {
    number: "03",
    id: "ai-cloud",
    title: "AI automation & cloud delivery",
    description:
      "Connect models, tools, APIs, and human review into useful workflows, then deliver the surrounding system with clear infrastructure, monitoring, and handoff.",
    capabilities: [
      "Agent workflows",
      "Process automation",
      "API integrations",
      "AWS, Azure & GCP",
      "Vercel & serverless",
      "CI/CD & observability",
    ],
    projectSlugs: ["openworkspace", "pay-it-forward-card-shows"],
  },
] as const satisfies readonly ServiceGroup[];

export default function ServicesPage() {
  return (
    <main className="services-page bg-[var(--dusk)] text-[var(--sand)]">
      <section className="services-compact-hero relative overflow-hidden border-b border-white/15 px-5 pt-28 pb-12 md:px-8 md:pt-32 md:pb-16 lg:pt-36">
        <div className="services-compact-hero-inner mx-auto grid max-w-[1500px] gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(22rem,0.65fr)] lg:items-end lg:gap-16">
          <div className="services-compact-hero-heading">
            <p className="page-kicker">Services · Product to production</p>
            <h1 className="services-compact-title mt-8 max-w-5xl font-[family-name:var(--font-display)] text-[clamp(3.25rem,7.4vw,7.25rem)] leading-[0.88] font-normal tracking-[-0.042em] text-balance">
              <span className="block">Ideas into</span>
              <span className="italic text-[var(--accent)]">working systems.</span>
            </h1>
          </div>

          <div className="services-compact-hero-copy border-t border-white/20 pt-6">
            <p className="section-lead">
              I design the experience, build the full stack, and carry the product through
              automation, cloud architecture, launch, and stewardship.
            </p>
            <p className="services-hero-evidence mt-5 max-w-xl text-sm leading-7 text-[var(--muted-soft)]">
              Selected work includes custom WordPress plugins, Vercel and Neon backends, and a
              Fastify service running on AWS EC2 with RDS.
            </p>
            <div className="mt-7">
              <ArrowLink href="/contact">Start a project</ArrowLink>
            </div>
          </div>
        </div>
      </section>

      <div id="services" className="services-disciplines">
        <div className="mx-auto max-w-[1500px] px-5 md:px-8">
          {serviceGroups.map((service) => (
            <section
              key={service.number}
              id={service.id}
              className="services-discipline scroll-mt-24"
              aria-labelledby={`${service.id}-title`}
            >
              <Reveal className="service-entry services-discipline-layout">
                <span className="service-number" aria-hidden="true">
                  {service.number}
                </span>
                <h2 id={`${service.id}-title`} className="service-title services-discipline-title">
                  {service.title}
                </h2>
                <div className="services-discipline-detail">
                  <p className="service-description section-lead">{service.description}</p>
                  <ul className="service-capability-list services-discipline-capabilities mt-8">
                    {service.capabilities.map((capability) => (
                      <li key={capability}>{capability}</li>
                    ))}
                  </ul>

                  <aside
                    className="services-related-work mt-9"
                    aria-label={`Related ${service.title} case studies`}
                  >
                    <p className="services-related-work-label text-xs font-bold tracking-[0.14em] text-[var(--muted-soft)] uppercase">
                      Related work
                    </p>
                    <ul className="services-proof-list mt-3 border-t border-white/15">
                      {service.projectSlugs.map((slug) => {
                        const project = portfolioProjects.find((item) => item.slug === slug);

                        if (!project) return null;

                        return (
                          <li key={project.slug} className="services-proof-item">
                            <Link
                              className="services-proof-link group grid min-h-20 gap-3 border-b border-white/15 py-4 transition-colors hover:text-[var(--accent)] sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:gap-6"
                              href={`/portfolio/${project.slug}`}
                              aria-label={`View the ${project.title} case study`}
                            >
                              <span className="services-proof-copy">
                                <strong className="block text-base font-semibold">
                                  {project.title}
                                </strong>
                                <span className="mt-1 block max-w-xl text-sm leading-6 text-[var(--muted)]">
                                  {project.summary}
                                </span>
                              </span>
                              <span className="services-proof-platform flex items-center gap-3 text-xs font-semibold tracking-[0.08em] text-[var(--muted-soft)] uppercase">
                                {project.platform}
                                <span
                                  className="transition-transform group-hover:translate-x-1"
                                  aria-hidden="true"
                                >
                                  →
                                </span>
                              </span>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </aside>
                </div>
              </Reveal>
            </section>
          ))}
        </div>
      </div>

      <section className="services-credibility-strip border-y border-white/15 bg-[var(--ink)] px-5 py-10 md:px-8 md:py-12">
        <Reveal className="services-credibility-inner mx-auto grid max-w-[1500px] gap-8 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.25fr)_auto] md:items-center md:gap-10">
          <div className="services-credibility-heading">
            <p className="section-label">Teaching experience</p>
            <h2 className="mt-4 max-w-md text-2xl leading-tight font-medium text-balance md:text-3xl">
              Former web development instructor at Nucamp.
            </h2>
          </div>
          <p className="services-credibility-copy max-w-2xl text-base leading-7 text-[var(--muted)]">
            Teaching sharpened how I explain architecture, document decisions, and leave teams with
            systems they can understand and extend.
          </p>
          <div className="services-credibility-cta md:justify-self-end">
            <ArrowLink href="/contact" inverse>
              Talk about a project
            </ArrowLink>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
