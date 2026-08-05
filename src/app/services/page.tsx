import Image from "next/image";
import Link from "next/link";
import { ArrowLink } from "@/components/arrow-link";
import { portfolioProjects, site } from "@/data/site";
import { createPageMetadata } from "@/lib/seo";
import styles from "./services.module.css";

const description =
  "Product and website design, full-stack development, custom CMS and WordPress work, technical SEO, AI automation, and cloud architecture from strategy through production.";

export const metadata = createPageMetadata({
  title: "Services",
  description,
  path: "/services",
  image: {
    url: "/images/openworkspace-product-ui.webp",
    width: 1440,
    height: 1000,
    alt: "OpenWorkspace product interface designed and developed by Carter Steinhoff",
  },
});

type ProjectSlug = (typeof portfolioProjects)[number]["slug"];

type RelatedWork = {
  readonly slug: ProjectSlug;
  readonly label: string;
};

type ServiceFamily = {
  readonly number: string;
  readonly id: string;
  readonly title: string;
  readonly goal: string;
  readonly promise: string;
  readonly summary: string;
  readonly disciplines: readonly string[];
  readonly includes: readonly string[];
  readonly relatedWork: readonly RelatedWork[];
  readonly visual: {
    readonly src: string;
    readonly alt: string;
    readonly caption: string;
    readonly label: string;
  };
};

const buyerPaths = [
  {
    number: "01",
    title: "Launch a product",
    copy: "Strategy, UX, frontend, backend, and data.",
    href: "#design-build",
  },
  {
    number: "02",
    title: "Rebuild a platform",
    copy: "CMS, WordPress, migrations, search, and performance.",
    href: "#publish-grow",
  },
  {
    number: "03",
    title: "Automate operations",
    copy: "AI workflows, integrations, and cloud delivery.",
    href: "#automate-operate",
  },
] as const;

const serviceFamilies = [
  {
    number: "01",
    id: "design-build",
    title: "Design & build",
    goal: "Launch a product",
    promise: "Take a product from rough idea to a working, production-ready experience.",
    summary:
      "I shape the offer and user experience, then build the responsive frontend, application logic, APIs, and data layer as one coherent system.",
    disciplines: ["Website & product design", "Full-stack development"],
    includes: [
      "Product strategy & UX/UI",
      "Responsive websites & apps",
      "Frontend, backend & APIs",
      "Data, integrations & testing",
    ],
    relatedWork: [
      { slug: "anne-newgarden", label: "Anne Newgarden redesign" },
      { slug: "pay-it-forward-card-shows", label: "Pay It Forward platform" },
      { slug: "openworkspace", label: "OpenWorkspace product" },
    ],
    visual: {
      src: "/images/openworkspace-product-ui.webp",
      alt: "OpenWorkspace product interface for saving a desktop workspace configuration",
      caption: "Product design, application experience, API, and AWS delivery.",
      label: "Shipped work · OpenWorkspace",
    },
  },
  {
    number: "02",
    id: "publish-grow",
    title: "Publish & grow",
    goal: "Rebuild a platform",
    promise: "Turn content, search, and performance into a maintainable publishing system.",
    summary:
      "I build custom WordPress, headless, and purpose-built CMS workflows—then protect discoverability with technical SEO, migration planning, and performance work.",
    disciplines: ["CMS & WordPress", "Technical SEO & performance"],
    includes: [
      "Custom WordPress themes & plugins",
      "Headless & custom CMS",
      "Content models & migrations",
      "Technical SEO & performance",
    ],
    relatedWork: [
      { slug: "retailboss", label: "RetailBoss custom platform" },
      { slug: "provepharm", label: "Provepharm headless WordPress" },
      { slug: "pay-it-forward-card-shows", label: "Pay It Forward custom CMS" },
    ],
    visual: {
      src: "/images/services-cms-system.webp",
      alt: "Editorial concept illustration showing scattered content becoming a structured publishing system",
      caption: "From scattered source material to one coherent publishing system.",
      label: "Concept · Content system",
    },
  },
  {
    number: "03",
    id: "automate-operate",
    title: "Automate & operate",
    goal: "Automate operations",
    promise: "Remove repetitive work and run the result on dependable infrastructure.",
    summary:
      "I connect models, tools, APIs, and human approval steps into understandable workflows, then design the cloud and delivery path around the real product needs.",
    disciplines: ["AI automation & integrations", "Cloud architecture & delivery"],
    includes: [
      "Workflow audits & mapping",
      "AI assistants & integrations",
      "Human approval & evaluation",
      "Cloud delivery & observability",
    ],
    relatedWork: [
      { slug: "openworkspace", label: "OpenWorkspace on AWS" },
      { slug: "pay-it-forward-card-shows", label: "Pay It Forward on Vercel & Neon" },
    ],
    visual: {
      src: "/images/services-ai-workflow.webp",
      alt: "Concept illustration of an automation moving through connected checkpoints and a human approval loop",
      caption: "Connected tools, explicit checkpoints, and human judgment where it matters.",
      label: "Concept · Automation system",
    },
  },
] as const satisfies readonly ServiceFamily[];

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
          <div className={styles.introMeta}>
            <p className={styles.kicker}>Services · Strategy through production</p>
            <p>Independent studio · Phoenix, Arizona</p>
          </div>
          <div className={styles.introStatement}>
            <h1 id="services-title">
              Product design and full-stack delivery—from <em>interface to infrastructure.</em>
            </h1>
            <div className={styles.introSummary}>
              <p>
                Websites, products, CMS, technical SEO, AI automation, and cloud systems—planned and
                built by one accountable partner.
              </p>
              <div className={styles.introActions}>
                <ArrowLink href="/contact">Start a project</ArrowLink>
                <Link href="/portfolio" className={styles.textLink}>
                  See case studies <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>

          <h2 id="paths-title" className="sr-only">
            Start with what you need
          </h2>
          <div className={styles.pathGrid}>
            {buyerPaths.map((path) => (
              <Link key={path.number} href={path.href}>
                <span>{path.number}</span>
                <strong>{path.title}</strong>
                <p>{path.copy}</p>
                <i aria-hidden="true">↓</i>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.offer} aria-labelledby="offer-title">
        <div className={`${styles.shell} ${styles.offerGrid}`}>
          <div className={styles.offerIntro}>
            <p className={styles.kicker}>Capabilities</p>
            <h2 id="offer-title">Six services. Three connected lanes.</h2>
            <p>Start with the closest lane; the scope can narrow from there.</p>
          </div>

          <div className={styles.serviceList}>
            {serviceFamilies.map((service) => (
              <div key={service.id} className={styles.serviceRow}>
                <article id={service.id} aria-labelledby={`${service.id}-title`}>
                  <span className={styles.serviceNumber}>{service.number}</span>
                  <div className={styles.serviceTitle}>
                    <p>{service.disciplines.join(" + ")}</p>
                    <h3 id={`${service.id}-title`}>{service.title}</h3>
                    <span className={styles.serviceGoal}>For: {service.goal}</span>
                  </div>
                  <div className={styles.serviceBody}>
                    <strong>{service.promise}</strong>
                    <p>{service.summary}</p>
                    <ul aria-label={`${service.title} includes`}>
                      {service.includes.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                    <figure className={styles.serviceVisual}>
                      <Image
                        src={service.visual.src}
                        alt={service.visual.alt}
                        width={2172}
                        height={724}
                        sizes="(max-width: 767px) calc(100vw - 2.5rem), (max-width: 1023px) 56vw, 43vw"
                      />
                      <figcaption>
                        <span>{service.visual.label}</span>
                        {service.visual.caption}
                      </figcaption>
                    </figure>
                    <nav
                      className={styles.relatedWork}
                      aria-label={`${service.title} related work`}
                    >
                      <span>Relevant work</span>
                      <div>
                        {service.relatedWork.map((work) => (
                          <Link key={work.slug} href={`/portfolio/${work.slug}`}>
                            {work.label} <span aria-hidden="true">↗</span>
                          </Link>
                        ))}
                      </div>
                    </nav>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.proof} aria-labelledby="proof-title">
        <div className={styles.shell}>
          <div className={styles.sectionHeading}>
            <p className={styles.kicker}>Selected case studies</p>
            <h2 id="proof-title">See the work behind the offer.</h2>
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
                          unoptimized
                          sizes="(max-width: 767px) 92vw, (max-width: 1023px) 46vw, 30vw"
                          className="object-cover object-top"
                        />
                      </span>
                    </Link>
                    <div className={styles.proofCopy}>
                      <p>{proof.eyebrow}</p>
                      <h3>{proof.headline}</h3>
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

      <section className={styles.engagements} aria-labelledby="engagements-title">
        <div className={`${styles.shell} ${styles.engagementGrid}`}>
          <div className={styles.engagementHeading}>
            <p className={styles.kicker}>Ways to work together</p>
            <h2 id="engagements-title">Pick the right starting point.</h2>
          </div>
          <div className={styles.engagementList}>
            {engagements.map((engagement) => (
              <div key={engagement.number} className={styles.engagementRow}>
                <article>
                  <span>{engagement.number}</span>
                  <h3>{engagement.title}</h3>
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
              <p className={styles.kicker}>Former Nucamp web development instructor</p>
              <h2 id="teaching-title">Clear thinking. Maintainable handoffs.</h2>
            </div>
            <p>
              Teaching sharpened how I explain tradeoffs and document decisions. You get a system
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
            <p className={styles.kicker}>Bring me the messy version</p>
            <h2 id="services-final-title">
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
