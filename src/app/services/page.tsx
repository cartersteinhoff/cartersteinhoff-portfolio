import Image from "next/image";
import Link from "next/link";
import { ArrowLink } from "@/components/arrow-link";
import { portfolioProjects, site, upwork } from "@/data/site";
import { createPageMetadata } from "@/lib/seo";
import styles from "./services.module.css";

const description =
  "Product and website design, full-stack development, custom CMS and WordPress work, technical SEO, AI automation, and cloud architecture from strategy through production.";

export const metadata = createPageMetadata({
  title: "Services",
  description,
  path: "/services",
});

type ProjectSlug = (typeof portfolioProjects)[number]["slug"];

type ServiceOffering = {
  readonly number: string;
  readonly id: string;
  readonly title: string;
  readonly summary: string;
  readonly includes: readonly string[];
};

const services = [
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

const proofStories = [
  {
    slug: "retailboss",
    eyebrow: "CMS, WordPress & technical SEO",
    headline: "Custom publishing, plugins, and search architecture.",
    copy: "RetailBoss connects editorial workflows, structured content, custom WordPress plugins, and technical SEO in one production platform.",
    image: "/images/retailboss-research.webp",
    alt: "RetailBoss research page with retail rankings, filters, and reports",
  },
  {
    slug: "pay-it-forward-card-shows",
    eyebrow: "Full-stack application & custom CMS",
    headline: "A complete event system from page to database.",
    copy: "A Next.js experience backed by a custom CMS, Vercel Functions, and Neon Postgres.",
    image: "/images/pay-it-forward-shows.webp",
    alt: "Pay It Forward Card Shows upcoming shows page with dates and venue information",
  },
  {
    slug: "openworkspace",
    eyebrow: "Product, backend & cloud architecture",
    headline: "A product spanning web, desktop, API, and AWS.",
    copy: "A Next.js product connected to Windows and macOS clients through Fastify, AWS EC2, and RDS.",
    image: "/images/openworkspace-how-it-works.webp",
    alt: "OpenWorkspace product sequence explaining how desktop workspaces are saved and reopened",
  },
] as const satisfies readonly {
  readonly slug: ProjectSlug;
  readonly eyebrow: string;
  readonly headline: string;
  readonly copy: string;
  readonly image: string;
  readonly alt: string;
}[];

const engagements = [
  {
    number: "01",
    title: "Audit & roadmap",
    copy: "A focused review with priorities, tradeoffs, and implementation-ready next steps.",
    bestFor: "Unclear scope, inherited systems, or a high-stakes rebuild",
  },
  {
    number: "02",
    title: "Build or rebuild",
    copy: "A scoped website, product, CMS, or automation from discovery through production.",
    bestFor: "New launches, redesigns, migrations, and major features",
  },
  {
    number: "03",
    title: "Ongoing product partner",
    copy: "Senior design and development support for iteration, SEO, automation, and infrastructure.",
    bestFor: "Teams that need continuity without another full-time hire",
  },
] as const;

const technologyGroups = [
  {
    label: "Experience",
    values: "Product strategy · UX/UI · Next.js · React · TypeScript · Tailwind CSS",
  },
  {
    label: "Content",
    values: "WordPress · Custom plugins · Headless CMS · Custom admin tools · Migrations",
  },
  {
    label: "Backend & data",
    values: "Node.js · Fastify · Serverless Functions · Postgres · Neon · REST APIs",
  },
  {
    label: "Cloud & delivery",
    values: "Vercel · AWS EC2/RDS · Azure/GCP planning · CI/CD · Observability",
  },
  {
    label: "Search & quality",
    values: "Technical SEO · Structured data · Core Web Vitals · Playwright · Axe · Biome",
  },
] as const;

function getProject(slug: ProjectSlug) {
  const project = portfolioProjects.find((item) => item.slug === slug);

  if (!project) {
    throw new Error(`Unknown portfolio project: ${slug}`);
  }

  return project;
}

export default function ServicesPage() {
  return (
    <main className={styles.page}>
      <section className={styles.intro} aria-labelledby="services-title">
        <div className={styles.introGridLines} aria-hidden="true" />
        <div className={`${styles.shell} ${styles.introInner}`}>
          <div className={styles.introStatement}>
            <h1 id="services-title" className={`display-1 ${styles.introTitle}`}>
              Design, development, automation, and <em>cloud.</em>
            </h1>
            <div className={styles.introSummary}>
              <p>
                Websites, products, CMS, SEO, AI workflows, and infrastructure—hire me for one
                focused service or combine only what your project needs.
              </p>
              <div className={styles.introActions}>
                <ArrowLink href="/contact">Start a project</ArrowLink>
                <Link href="/portfolio" className={styles.textLink}>
                  See case studies <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.offer} aria-labelledby="offer-title">
        <div className={`${styles.shell} ${styles.offerGrid}`}>
          <div className={styles.offerIntro}>
            <p className="eyebrow">Service catalog</p>
            <h2 id="offer-title" className="display-2">
              Choose the help you need.
            </h2>
            <p>
              Every service can stand on its own. Start with one, or combine services when the scope
              genuinely calls for it.
            </p>
          </div>

          <div className={styles.serviceCatalog}>
            {services.map((service) => (
              <article
                key={service.id}
                id={service.id}
                className={styles.serviceItem}
                aria-labelledby={`${service.id}-title`}
              >
                <span className={styles.serviceNumber}>{service.number}</span>
                <div className={styles.serviceCopy}>
                  <h3 id={`${service.id}-title`} className="display-3">
                    {service.title}
                  </h3>
                  <p>{service.summary}</p>
                </div>
                <div className={styles.serviceIncludes}>
                  <span>Services include</span>
                  <ul aria-label={`${service.title} services include`}>
                    {service.includes.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.proof} aria-labelledby="proof-title">
        <div className={styles.shell}>
          <div className={styles.sectionHeading}>
            <p className="eyebrow">Selected case studies</p>
            <h2 id="proof-title" className="display-2">
              See the work behind the offer.
            </h2>
            <p>
              Three shipped systems. Each case study shows the interface and what runs behind it.
            </p>
          </div>

          <div className={styles.proofGrid}>
            {proofStories.map((proof) => {
              const project = getProject(proof.slug);

              return (
                <div key={proof.slug} className={styles.proofStory}>
                  <article>
                    <Link
                      href={`/portfolio/${project.slug}`}
                      className={styles.proofMedia}
                      aria-label={`View the ${project.title} case study`}
                    >
                      <span className={styles.browserBar}>
                        <span className={styles.browserDots} aria-hidden="true">
                          <i />
                          <i />
                          <i />
                        </span>
                        <span>{project.domain}</span>
                        <span aria-hidden="true">↗</span>
                      </span>
                      <span className={styles.proofImage}>
                        <Image
                          src={proof.image}
                          alt={proof.alt}
                          fill
                          sizes="(max-width: 767px) 92vw, (max-width: 1023px) 46vw, 30vw"
                          className="object-cover object-top"
                        />
                      </span>
                    </Link>
                    <div className={styles.proofCopy}>
                      <p>{proof.eyebrow}</p>
                      <h3 className="display-4">{proof.headline}</h3>
                      <p>{proof.copy}</p>
                      <Link href={`/portfolio/${project.slug}`}>
                        View {project.title} case study <span aria-hidden="true">↗</span>
                      </Link>
                    </div>
                  </article>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Third-party proof, placed after the work so the evidence stacks:
       * here is what I built, and here is what the clients said. Every
       * figure links back to the profile it came from, so the claim is
       * checkable rather than asserted. */}
      <section className={styles.proofBand} aria-labelledby="upwork-proof-title">
        <div className={styles.shell}>
          <div className={styles.proofBandHead}>
            <div>
              <p className="eyebrow">Verified on Upwork</p>
              <h2 id="upwork-proof-title" className={`display-3 ${styles.proofBandTitle}`}>
                {upwork.badge}, and a {upwork.jobSuccess} job success score.
              </h2>
              <p className={styles.proofBandLead}>
                Public reputation metrics and client feedback from my active Upwork profile.
              </p>
            </div>
            <a
              className={styles.proofBandLink}
              href={site.upworkUrl}
              target="_blank"
              rel="noreferrer"
            >
              See the profile <span aria-hidden="true">↗</span>
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>

          <a
            className={styles.proofBandFallback}
            href={site.upworkUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="Open Carter's Upwork profile (opens in a new tab)"
          >
            Open verified Upwork profile for live metrics and reputation details.{" "}
            <span aria-hidden="true">↗</span>
            <span className="sr-only"> (opens in a new tab)</span>
          </a>

          <dl className={styles.proofStats}>
            {upwork.stats.map((stat) => (
              <div key={stat.label}>
                <dt>{stat.label}</dt>
                <dd>{stat.value}</dd>
              </div>
            ))}
          </dl>

          <div className={styles.proofQuotes}>
            {upwork.testimonials.map((item) => (
              <figure key={item.quote} className={styles.proofQuote}>
                <blockquote>
                  <p className="display-5">“{item.quote}”</p>
                </blockquote>
                <figcaption>
                  {item.context} · {item.date}
                </figcaption>
              </figure>
            ))}
          </div>

          <p className={styles.proofFootnote}>
            {upwork.totalJobs} jobs and {upwork.totalHours} hours on Upwork as of {upwork.asOf}.
          </p>
        </div>
      </section>

      <section className={styles.engagements} aria-labelledby="engagements-title">
        <div className={`${styles.shell} ${styles.engagementGrid}`}>
          <div className={styles.engagementHeading}>
            <p className="eyebrow">Engagement options</p>
            <h2 id="engagements-title" className={`display-2 ${styles.engagementTitle}`}>
              Choose how you want to work.
            </h2>
          </div>
          <div className={styles.engagementList}>
            {engagements.map((engagement) => (
              <div key={engagement.number} className={styles.engagementRow}>
                <article>
                  <span>{engagement.number}</span>
                  <h3 className="display-4">{engagement.title}</h3>
                  <p>{engagement.copy}</p>
                  <div>
                    <strong>Best for</strong>
                    <p>{engagement.bestFor}</p>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.teaching} aria-labelledby="teaching-title">
        <div className={styles.shell}>
          <div className={styles.teachingGrid}>
            <div>
              <p className="eyebrow">Nucamp web development instructor</p>
              <h2 id="teaching-title" className={`display-3 ${styles.teachingTitle}`}>
                Clear thinking. Maintainable handoffs.
              </h2>
            </div>
            <p>
              Teaching sharpens how I explain tradeoffs and document decisions. You get a system
              your team can understand and extend.
            </p>
            <ul aria-label="Handoff principles">
              <li>Clear tradeoffs</li>
              <li>Documented decisions</li>
              <li>Maintainable handoff</li>
            </ul>
          </div>
          <dl className={styles.trustStack} aria-label="Selected technology stack">
            {technologyGroups.map((group) => (
              <div key={group.label}>
                <dt>{group.label}</dt>
                <dd>{group.values}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className={styles.finalCta} aria-labelledby="services-final-title">
        <div className={`${styles.shell} ${styles.finalInner}`}>
          <div>
            <p className="eyebrow">Bring me the messy version</p>
            <h2 id="services-final-title" className={`display-2 ${styles.finalTitle}`}>
              I’ll help turn it into a clear plan and a working system.
            </h2>
          </div>
          <div className={styles.finalActions}>
            <ArrowLink href="/contact">Start a project</ArrowLink>
            <nav aria-label="Professional profiles">
              <a href={site.upworkUrl} target="_blank" rel="noreferrer">
                Hire through Upwork <span aria-hidden="true">↗</span>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
              <a href={site.linkedinUrl} target="_blank" rel="noreferrer">
                Connect on LinkedIn <span aria-hidden="true">↗</span>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </nav>
          </div>
        </div>
      </section>
    </main>
  );
}
