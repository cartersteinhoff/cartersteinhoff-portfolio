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
      <section className={styles.offer} aria-labelledby="services-title">
        <div className={`${styles.shell} ${styles.offerGrid}`}>
          <div className={styles.offerIntro}>
            <p className="eyebrow">Service catalog</p>
            <h1 id="services-title" className="display-2">
              Choose the help you need.
            </h1>
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
                  <h2 id={`${service.id}-title`} className="display-3">
                    {service.title}
                  </h2>
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
                {upwork.badge} on Upwork, with a {upwork.jobSuccess} job success score.
              </h2>
              <p className={styles.proofBandLead}>
                A current capture of my public Upwork profile, with live metrics and client feedback
                linked at the source.
              </p>
            </div>
            <a
              className={styles.proofBandLink}
              href={site.upworkUrl}
              target="_blank"
              rel="noreferrer"
            >
              View live Upwork profile <span aria-hidden="true">↗</span>
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>

          <div className={styles.proofEvidence}>
            <a
              className={styles.proofProfile}
              href={site.upworkUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Open Carter's Upwork profile (opens in a new tab)"
            >
              <span className={styles.proofProfileHeader} aria-hidden="true">
                <span className={styles.proofProfileIdentity}>
                  <strong>Carter S. on Upwork</strong>
                  <span>upwork.com/freelancers/cartersteinhoff</span>
                </span>
                <span className={styles.proofProfileAction}>Open live profile ↗</span>
              </span>
              <span className={styles.proofProfileImage}>
                <Image
                  src={upwork.profileScreenshot.src}
                  alt={upwork.profileScreenshot.alt}
                  width={upwork.profileScreenshot.width}
                  height={upwork.profileScreenshot.height}
                  sizes="(max-width: 767px) 100vw, (max-width: 1599px) 72vw, 1120px"
                  className={styles.proofProfileImageAsset}
                />
              </span>
            </a>

            <dl className={styles.proofStats}>
              {upwork.stats.map((stat) => (
                <div key={stat.label}>
                  <dt>{stat.label}</dt>
                  <dd>{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>

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
