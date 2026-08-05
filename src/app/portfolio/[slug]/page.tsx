import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
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
      <section className="case-hero px-5 pb-14 pt-28 md:px-8 md:pb-20 md:pt-32">
        <div className="mx-auto max-w-[1500px]">
          <Link className="case-back-link" href="/portfolio">
            <span aria-hidden="true">←</span> All selected work
          </Link>

          <div className="case-hero-heading">
            <p className="page-kicker">Case study · {project.number}</p>
            <div>
              <h1 className="case-title">{project.title}</h1>
              <p className="case-summary">{project.summary}</p>
            </div>
          </div>

          <dl className="case-facts">
            <div>
              <dt>Role</dt>
              <dd>{project.caseStudy.role}</dd>
            </div>
            <div>
              <dt>System</dt>
              <dd>{project.caseStudy.system}</dd>
            </div>
            <div>
              <dt>Status</dt>
              <dd>{project.statusDetail}</dd>
            </div>
            <div>
              <dt>Website</dt>
              <dd>
                <a href={project.url} target="_blank" rel="noreferrer">
                  {project.domain} ↗<span className="sr-only"> (opens in a new tab)</span>
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="case-featured-media px-5 py-8 md:px-8 md:py-12">
        <Reveal className="mx-auto max-w-[1500px]">
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
                unoptimized
                sizes="(max-width: 768px) 94vw, 92vw"
                className="object-cover"
              />
            </div>
          </div>
        </Reveal>
      </section>

      <section className="case-overview-section px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-[1500px]">
          <Reveal className="case-overview-heading">
            <p className="section-label">The work</p>
            <h2>{project.caseStudy.headline}</h2>
          </Reveal>

          <div className="case-overview-grid">
            <Reveal className="case-narrative">
              <p>{project.caseStudy.overview}</p>
              <p>{project.caseStudy.detail}</p>
            </Reveal>

            <Reveal className="case-contributions">
              <p className="case-list-label">Selected contributions</p>
              <ol>
                {project.caseStudy.contributions.map((contribution, index) => (
                  <li key={contribution}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <strong>{contribution}</strong>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="case-architecture-section px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-[1500px]">
          <Reveal className="case-architecture-heading">
            <p className="section-label">Backend & systems</p>
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

      <section className="case-gallery-section px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-[1500px]">
          <Reveal className="case-gallery-heading">
            <p className="section-label">Important screens</p>
            <h2>A platform is more than its homepage.</h2>
            <p>
              Real screens from the project show how the visual system carries into the parts people
              actually use.
            </p>
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

      <section className="case-next-section px-5 py-20 md:px-8 md:py-24">
        <div className="mx-auto max-w-[1500px]">
          <p className="section-label">Next case study</p>
          <Link className="case-next-link group" href={`/portfolio/${nextProject.slug}`}>
            <span>{nextProject.title}</span>
            <span className="case-next-arrow" aria-hidden="true">
              ↗
            </span>
          </Link>
        </div>
      </section>
    </main>
  );
}
