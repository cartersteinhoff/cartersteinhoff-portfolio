import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BeforeAfterSlider } from "@/components/before-after-slider";
import { JsonLd } from "@/components/json-ld";
import { Reveal } from "@/components/reveal";
import { TechnologyStack } from "@/components/technology-stack";
import { getAbsoluteUrl, getSiteUrl, portfolioProjects } from "@/data/site";
import { createPageMetadata } from "@/lib/seo";
import styles from "./case-study.module.css";

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

  const cover = project.caseStudy.screens[0];

  return createPageMetadata({
    title: `${project.title} Case Study`,
    description: project.seoDescription,
    path: `/portfolio/${project.slug}`,
    type: "article",
    image: {
      url: project.image,
      width: ("width" in cover && cover.width) || 1440,
      height: ("height" in cover && cover.height) || 1000,
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
  const decisions = "decisions" in project.caseStudy ? project.caseStudy.decisions : null;
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
    <main className={`${styles.caseStudy} case-study`} data-project={project.slug}>
      <JsonLd id="case-study-structured-data" data={structuredData} />

      <section className={styles.hero} aria-labelledby="case-title">
        <Image
          src={project.image}
          alt={project.imageAlt}
          fill
          preload
          sizes="100vw"
          className={styles.heroImage}
        />
        <div className={styles.heroScrim} aria-hidden="true" />

        <div className={styles.heroInner}>
          <div className={styles.heroTopline}>
            <Link className={styles.backLink} href="/portfolio">
              <span aria-hidden="true">←</span> Selected work
            </Link>
            <p className={styles.heroIndex}>Case study · {project.number}</p>
          </div>

          <div className={styles.heroCopy}>
            <p className={styles.heroEyebrow}>
              {project.year} · {project.caseStudy.role}
            </p>
            <h1 id="case-title" className={styles.title}>
              {project.title}
            </h1>
            <p className={styles.summary}>{project.summary}</p>
            <div className={styles.heroActions}>
              <a className={styles.primaryLink} href={project.url} target="_blank" rel="noreferrer">
                {project.externalLabel}
                <span aria-hidden="true"> ↗</span>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
              {comparison ? (
                <a
                  className={styles.secondaryLink}
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
        </div>
      </section>

      <dl className={styles.facts} aria-label="Project details">
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

      {comparison ? (
        <section
          className={`${styles.comparison} case-comparison-section`}
          aria-labelledby="case-comparison-title"
        >
          <div className={styles.sectionShell}>
            <Reveal className={styles.sectionHeading}>
              <p className={styles.sectionLabel}>Before / after</p>
              <div>
                <h2 id="case-comparison-title">{comparison.headline}</h2>
                <p>{comparison.summary}</p>
              </div>
            </Reveal>

            <Reveal className={`${styles.comparisonStage} case-comparison-stage`}>
              <figure>
                <BeforeAfterSlider
                  before={{ src: comparison.before.image, label: comparison.before.label }}
                  after={{ src: comparison.after.image, label: comparison.after.label }}
                  ariaLabel={`${comparison.before.alt}. Compared with ${comparison.after.alt}.`}
                />
                <figcaption className={styles.comparisonCaption}>
                  <p className={styles.comparisonNote}>Drag to compare the same viewport.</p>
                  <div>
                    {[comparison.before, comparison.after].map((state) => (
                      <a href={state.url} target="_blank" rel="noreferrer" key={state.label}>
                        <span>{state.label}</span>
                        <strong className={styles.comparisonTechnology}>{state.technology}</strong>
                        <i className={styles.comparisonArrow} aria-hidden="true">
                          ↗
                        </i>
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    ))}
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </section>
      ) : null}

      <section className={styles.story} aria-labelledby="case-story-title">
        <div className={`${styles.sectionShell} ${styles.storyGrid}`}>
          <Reveal className={styles.storyIntro}>
            <div className={styles.stickyIntro}>
              <p className={styles.sectionLabel}>Project story</p>
              <h2 id="case-story-title">{project.caseStudy.headline}</h2>
              <p className={styles.storyLead}>{project.caseStudy.overview}</p>
              <p className={styles.storyDetail}>{project.caseStudy.detail}</p>
            </div>
          </Reveal>

          <div className={styles.storyChapters}>
            {project.caseStudy.story.map((chapter, index) => (
              <Reveal className={styles.storyChapter} delay={index * 70} key={chapter.title}>
                <p className={styles.chapterNumber}>{String(index + 1).padStart(2, "0")}</p>
                <div>
                  <span>{chapter.label}</span>
                  <h3>{chapter.title}</h3>
                  <p>{chapter.body}</p>
                </div>
              </Reveal>
            ))}

            {decisions ? (
              <div className={`${styles.decisions} case-decisions-section`}>
                <p className={styles.sectionLabel}>Decisions</p>
                <div className={styles.decisionsGrid}>
                  {decisions.map((decision, index) => (
                    <Reveal
                      className={`${styles.decision} case-decision`}
                      delay={index * 60}
                      key={decision.title}
                    >
                      <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                      <h3>{decision.title}</h3>
                      <p>{decision.body}</p>
                    </Reveal>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <section className={styles.build} aria-labelledby="case-build-title">
        <div className={styles.sectionShell}>
          <Reveal className={styles.buildHeading}>
            <p className={styles.sectionLabel}>The build</p>
            <div>
              <h2 id="case-build-title">{project.caseStudy.technologyStack.headline}</h2>
              <p>{project.caseStudy.technologyStack.summary}</p>
            </div>
          </Reveal>

          <div className={styles.buildGrid}>
            <div className={styles.contributions}>
              <h3>What I owned</h3>
              <ol>
                {project.caseStudy.contributions.map((contribution, index) => (
                  <li key={contribution}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <p>{contribution}</p>
                  </li>
                ))}
              </ol>
            </div>
            <TechnologyStack
              stack={project.caseStudy.technologyStack}
              system={project.caseStudy.architecture}
            />
          </div>
        </div>
      </section>

      <section className={styles.gallerySection} aria-labelledby="case-gallery-title">
        <div className={styles.sectionShell}>
          <Reveal className={styles.galleryHeading}>
            <p className={styles.sectionLabel}>Selected screens</p>
            <h2 id="case-gallery-title">The work, beyond the opening frame.</h2>
          </Reveal>

          <div className={styles.gallery}>
            {project.caseStudy.screens.slice(1).map((screen, index) => (
              <article
                className={`${styles.galleryItem} case-screen ${
                  index === 0 ? `${styles.galleryItemLead} case-screen-wide` : ""
                }`}
                key={screen.image}
              >
                <figure>
                  <div className={styles.galleryMedia}>
                    <Image
                      src={screen.image}
                      alt={screen.alt}
                      width={("width" in screen && screen.width) || 1440}
                      height={("height" in screen && screen.height) || 1000}
                      sizes={
                        index === 0
                          ? "(max-width: 767px) 100vw, 92vw"
                          : "(max-width: 767px) 100vw, (max-width: 1199px) 50vw, 620px"
                      }
                    />
                  </div>
                  <figcaption>
                    <span>{String(index + 2).padStart(2, "0")}</span>
                    <div>
                      <strong>{screen.title}</strong>
                      <p>{screen.caption}</p>
                    </div>
                  </figcaption>
                </figure>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.closing} aria-labelledby="next-case">
        <Image src={nextProject.image} alt="" fill sizes="100vw" className={styles.nextImage} />
        <div className={styles.closingScrim} aria-hidden="true" />
        <div className={styles.closingInner}>
          <div className={styles.closingStatus}>
            <p className={styles.sectionLabel}>Current status</p>
            <strong className={styles.closingStatusTitle}>{project.statusDetail}</strong>
            <p>{project.caseStudy.statusCopy}</p>
            <Link href="/contact">Discuss a similar project ↗</Link>
          </div>

          <Link className={styles.nextLink} href={`/portfolio/${nextProject.slug}`}>
            <span>Next case study</span>
            <h2 id="next-case">{nextProject.title}</h2>
            <i className={styles.nextArrow} aria-hidden="true">
              ↗
            </i>
          </Link>
        </div>
      </section>
    </main>
  );
}
