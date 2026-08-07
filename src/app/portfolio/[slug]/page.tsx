import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BeforeAfterSlider } from "@/components/before-after-slider";
import { JsonLd } from "@/components/json-ld";
import { Reveal } from "@/components/reveal";
import { getAbsoluteUrl, getSiteUrl, portfolioProjects } from "@/data/site";
import { createPageMetadata } from "@/lib/seo";

type CaseStudyPageProps = {
  params: Promise<{ slug: string }>;
};

function getProject(slug: string) {
  return portfolioProjects.find((project) => project.slug === slug);
}

export function generateStaticParams() {
  return portfolioProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  const title = `${project.title} Case Study`;
  const url = `/portfolio/${project.slug}`;

  return createPageMetadata({
    title,
    description: project.seoDescription,
    path: url,
    type: "article",
    image: {
      url: project.image,
      width: 1440,
      height: 1000,
      alt: project.imageAlt,
    },
  });
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  const projectIndex = portfolioProjects.findIndex((item) => item.slug === project.slug);
  const nextProject = portfolioProjects[(projectIndex + 1) % portfolioProjects.length];
  const comparison = "comparison" in project.caseStudy ? project.caseStudy.comparison : null;
  const siteUrl = getSiteUrl();
  const caseStudyUrl = getAbsoluteUrl(`/portfolio/${project.slug}`);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${caseStudyUrl}#creative-work`,
    name: `${project.title} case study`,
    headline: project.caseStudy.headline,
    description: project.seoDescription,
    url: caseStudyUrl,
    image: getAbsoluteUrl(project.image),
    sameAs: project.url,
    creator: {
      "@id": `${siteUrl}/#person`,
    },
    author: {
      "@id": `${siteUrl}/#person`,
    },
    isPartOf: {
      "@id": `${siteUrl}/#website`,
    },
    mainEntityOfPage: caseStudyUrl,
    keywords: project.services,
    about: {
      "@type": "WebSite",
      name: project.title,
      url: project.url,
    },
  };

  return (
    <main className="case-study bg-[var(--dusk)] text-[var(--sand)]" data-project={project.slug}>
      <JsonLd id="case-study-structured-data" data={structuredData} />
      <section className="case-hero px-5 pb-12 pt-24 md:px-8 md:pb-16 md:pt-28">
        <div className="case-hero-shell mx-auto max-w-[1500px]">
          <div className="case-hero-topline">
            <Link className="case-back-link" href="/portfolio">
              <span aria-hidden="true">←</span> All selected work
            </Link>
            <p className="page-kicker">Case study · {project.number}</p>
          </div>

          <div className="case-hero-layout">
            <div className="case-hero-copy">
              <h1 className="case-title">{project.title}</h1>
              <p className="case-summary">{project.summary}</p>
              <div className="case-hero-actions">
                <a className="case-hero-action" href={project.url} target="_blank" rel="noreferrer">
                  {project.externalLabel}
                  <span aria-hidden="true"> ↗</span>
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
                {comparison ? (
                  <a
                    className="case-hero-action case-hero-action-secondary"
                    href={comparison.before.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View original
                    <span aria-hidden="true"> ↗</span>
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                ) : null}
              </div>
            </div>

            <dl className="case-hero-facts">
              <div>
                <dt>Year</dt>
                <dd>{project.year}</dd>
              </div>
              <div>
                <dt>Role</dt>
                <dd>{project.caseStudy.role}</dd>
              </div>
              <div>
                <dt>Stack</dt>
                <dd>{project.caseStudy.system}</dd>
              </div>
              <div>
                <dt>Status</dt>
                <dd>{project.statusDetail}</dd>
              </div>
            </dl>
          </div>

          <div className="case-hero-proof">
            <div className="case-browser">
              <div className="project-browser-bar">
                <span className="project-browser-dots" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </span>
                <span>{project.domain}</span>
                <span aria-hidden="true">01</span>
              </div>
              <div className="case-browser-image">
                <Image
                  src={project.image}
                  alt={project.imageAlt}
                  fill
                  preload
                  sizes="(max-width: 768px) 94vw, 92vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="case-brief-section px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-[1500px]">
          <Reveal className="case-brief-heading">
            <p className="section-label">Project brief</p>
            <h2>{project.caseStudy.headline}</h2>
          </Reveal>

          <div className="case-brief-grid">
            <Reveal className="case-brief-copy">
              <p>{project.caseStudy.overview}</p>
              <p>{project.caseStudy.detail}</p>
            </Reveal>
          </div>
        </div>
      </section>

      {comparison ? (
        <section
          className="case-comparison-section px-5 py-16 md:px-8 md:py-24"
          aria-labelledby="case-comparison-title"
        >
          <div className="mx-auto max-w-[1500px]">
            <Reveal className="case-comparison-heading">
              <p className="section-label">Before / after</p>
              <div>
                <h2 id="case-comparison-title">{comparison.headline}</h2>
                <p>{comparison.summary}</p>
              </div>
            </Reveal>

            <Reveal className="case-comparison-stage">
              <figure>
                <div className="case-comparison-key">
                  {[comparison.before, comparison.after].map((state) => (
                    <a href={state.url} target="_blank" rel="noreferrer" key={state.label}>
                      <span className="case-comparison-state-label">{state.label}</span>
                      <strong>{state.technology}</strong>
                      <i aria-hidden="true">↗</i>
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  ))}
                </div>

                <BeforeAfterSlider
                  before={{ src: comparison.before.image, label: comparison.before.label }}
                  after={{ src: comparison.after.image, label: comparison.after.label }}
                  ariaLabel={`${comparison.before.alt}. Compared with ${comparison.after.alt}.`}
                />

                <figcaption>
                  <span>Drag to compare</span>
                  <p>
                    One matched viewport. The original WordPress site is still on the custom domain;
                    the redesign is the public Vercel preview.
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </section>
      ) : null}

      <section className="case-ownership-section px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-[1500px]">
          <Reveal className="case-ownership-heading">
            <p className="section-label">What I owned</p>
            <h2>The work behind the finished product.</h2>
          </Reveal>

          <div className="case-ownership-grid">
            {project.caseStudy.contributions.map((contribution, index) => (
              <Reveal className="case-ownership-item" delay={index * 60} key={contribution}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{contribution}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="case-architecture-section px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-[1500px]">
          <Reveal className="case-architecture-heading">
            <p className="section-label">Architecture</p>
            <div>
              <h2>{project.caseStudy.architecture.headline}</h2>
              <p className="case-architecture-intro">{project.caseStudy.architecture.summary}</p>
            </div>
          </Reveal>

          <div className="case-architecture-grid">
            {project.caseStudy.architecture.items.map((item, index) => (
              <Reveal className="case-architecture-item" delay={index * 70} key={item.label}>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="case-gallery-section px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-[1500px]">
          <Reveal className="case-gallery-heading">
            <p className="section-label">Selected screens</p>
            <h2>{project.title}, beyond the opening screen.</h2>
          </Reveal>

          <div className="case-gallery">
            {project.caseStudy.screens.slice(1).map((screen, index) => (
              <Reveal
                className={`case-screen ${index === 0 ? "case-screen-wide" : ""}`}
                delay={index * 80}
                key={screen.image}
              >
                <figure>
                  <div className="case-screen-browser">
                    <div className="project-browser-bar">
                      <span className="project-browser-dots" aria-hidden="true">
                        <i />
                        <i />
                        <i />
                      </span>
                      <span>{screen.title}</span>
                      <span aria-hidden="true">{String(index + 2).padStart(2, "0")}</span>
                    </div>
                    <Image
                      src={screen.image}
                      alt={screen.alt}
                      width={1440}
                      height={1000}
                      unoptimized
                      sizes={
                        index === 0
                          ? "(max-width: 768px) 94vw, 92vw"
                          : "(max-width: 768px) 94vw, 46vw"
                      }
                      className="h-auto w-full"
                    />
                  </div>
                  <figcaption>
                    <span>{screen.title}</span>
                    <p>{screen.caption}</p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="case-status-section px-5 py-16 md:px-8 md:py-20">
        <div className="case-status-layout mx-auto max-w-[1500px]">
          <Reveal className="case-status-copy">
            <p className="section-label">Current status</p>
            <h2>{project.statusDetail}</h2>
          </Reveal>
          <Reveal className="case-status-action">
            <p>{project.caseStudy.statusCopy}</p>
          </Reveal>
        </div>
      </section>

      <section className="case-cta-section px-5 py-16 md:px-8 md:py-24">
        <Reveal className="case-cta-layout mx-auto max-w-[1500px]">
          <div>
            <p className="section-label">Have a similar project?</p>
            <h2>Let’s design and build the system behind it.</h2>
          </div>
          <Link className="case-cta-link" href="/contact">
            Discuss your project <span aria-hidden="true">↗</span>
          </Link>
        </Reveal>
      </section>

      {/* "Next case study" is a label, not a section heading. As an <h2>
       * it rendered at 12px beside 84px siblings and put a rank-2 entry
       * in the document outline that carried no content. The project name
       * is the actual heading here. */}
      <section
        className="case-next-section px-5 py-16 md:px-8 md:py-20"
        aria-labelledby="next-case"
      >
        <div className="mx-auto max-w-[1500px]">
          <p className="section-label">Next case study</p>
          <Link className="case-next-link group" href={`/portfolio/${nextProject.slug}`}>
            <h2 id="next-case" className="case-next-title">
              {nextProject.title}
            </h2>
            <span className="case-next-arrow" aria-hidden="true">
              ↗
            </span>
          </Link>
        </div>
      </section>
    </main>
  );
}
