import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRightGlyph } from "@/components/arrow-up-right-glyph";
import { BeforeAfterSlider } from "@/components/before-after-slider";
import { JsonLd } from "@/components/json-ld";
import { Reveal } from "@/components/reveal";
import { TechnologyStack } from "@/components/technology-stack";
import { getAbsoluteUrl, getSiteUrl, portfolioProjects } from "@/data/site";
import { createPageMetadata } from "@/lib/seo";
import styles from "./case-study.module.css";
import { CaseStudyGallery } from "./case-study-gallery";

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
  const responsiveProof =
    "responsiveProof" in project.caseStudy ? project.caseStudy.responsiveProof : null;
  const allScreens = project.caseStudy.screens;
  const coverScreen = allScreens[0];
  const proofScreenIndexes: readonly number[] = project.caseStudy.proofScreenIndexes;
  const proofScreens = proofScreenIndexes.map((screenIndex) => ({
    screen: allScreens[screenIndex] ?? coverScreen,
    screenIndex,
  }));
  const featuredScreenIndexes = new Set([0, ...proofScreenIndexes]);
  const galleryScreens = allScreens.filter((_, index) => !featuredScreenIndexes.has(index));
  const coverWidth = ("width" in coverScreen && coverScreen.width) || 1440;
  const coverHeight = ("height" in coverScreen && coverScreen.height) || 1000;
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

      <section className={styles.hero} data-case-section="hero" aria-labelledby="case-title">
        <div className={styles.heroAtmosphere} aria-hidden="true" />

        <div className={styles.heroInner}>
          <div className={styles.heroTopline}>
            <Link className={styles.backLink} href="/portfolio">
              <span aria-hidden="true" className="cta-icon">
                ←
              </span>{" "}
              Selected work
            </Link>
            <p className={styles.heroIndex}>Case study · {project.number}</p>
          </div>

          <div className={styles.heroLayout}>
            <div className={styles.heroCopy}>
              <p className={styles.heroEyebrow}>
                {project.year} · {project.caseStudy.role}
              </p>
              <h1 id="case-title" className={styles.title}>
                {project.title}
              </h1>
              <p className={styles.summary}>{project.summary}</p>
              <div className={styles.heroActions}>
                <a
                  className={styles.primaryLink}
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  {project.externalLabel}
                  <span aria-hidden="true" className="cta-icon">
                    <ArrowUpRightGlyph />
                  </span>
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
                    <span aria-hidden="true" className="cta-icon">
                      <ArrowUpRightGlyph />
                    </span>
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                ) : null}
              </div>
            </div>

            <figure className={styles.heroProof}>
              <div className={styles.heroMedia}>
                <Image
                  src={project.image}
                  alt={project.imageAlt}
                  width={coverWidth}
                  height={coverHeight}
                  loading="eager"
                  sizes="(max-width: 767px) 100vw, (max-width: 1199px) 62vw, 900px"
                />
              </div>
            </figure>
          </div>
        </div>

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
      </section>

      <section
        className={styles.proof}
        data-case-section="proof"
        aria-labelledby="case-proof-title"
      >
        <div className={styles.sectionShell}>
          <Reveal className={styles.proofHeading}>
            <p className={styles.sectionLabel}>Selected views</p>
            <div>
              <h2 id="case-proof-title">The work, before the process.</h2>
              <p>
                Two representative views establish the range before the case study moves into the
                decisions behind them.
              </p>
            </div>
          </Reveal>

          <div className={styles.proofGrid}>
            {proofScreens.map(({ screen, screenIndex }, index) => {
              const width = ("width" in screen && screen.width) || 1440;
              const height = ("height" in screen && screen.height) || 1000;

              return (
                <Reveal className={styles.proofItem} delay={index * 70} key={screen.image}>
                  <figure>
                    <div className={styles.proofMedia}>
                      <Image
                        src={screen.image}
                        alt={screen.alt}
                        width={width}
                        height={height}
                        sizes="(max-width: 767px) calc(100vw - 2.5rem), (max-width: 1199px) calc(50vw - 2.75rem), 680px"
                      />
                    </div>
                    <figcaption>
                      <span aria-hidden="true">{String(screenIndex + 1).padStart(2, "0")}</span>
                      <div>
                        <h3>{screen.title}</h3>
                        <p>{screen.caption}</p>
                      </div>
                    </figcaption>
                  </figure>
                </Reveal>
              );
            })}
          </div>

          {responsiveProof ? (
            <div className={styles.responsiveProof}>
              <Reveal className={styles.responsiveProofCopy}>
                <p className={styles.sectionLabel}>Responsive proof</p>
                <h3>{responsiveProof.headline}</h3>
                <p>{responsiveProof.summary}</p>
              </Reveal>

              <div className={styles.mobileProofGrid}>
                {responsiveProof.screens.map((screen, index) => (
                  <Reveal className={styles.mobileProofItem} delay={index * 60} key={screen.image}>
                    <figure>
                      <Image
                        src={screen.image}
                        alt={screen.alt}
                        width={screen.width}
                        height={screen.height}
                        sizes="(max-width: 767px) calc(100vw - 2.5rem), (max-width: 1199px) 30vw, 280px"
                      />
                      <figcaption>
                        <strong>{screen.title}</strong>
                        <span>{screen.caption}</span>
                      </figcaption>
                    </figure>
                  </Reveal>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </section>

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
                        <i className={`${styles.comparisonArrow} cta-icon`} aria-hidden="true">
                          <ArrowUpRightGlyph />
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

      <section
        className={styles.story}
        data-case-section="story"
        aria-labelledby="case-story-title"
      >
        <div className={styles.sectionShell}>
          <Reveal className={styles.storyIntro}>
            <p className={styles.sectionLabel}>Project story</p>
            <div>
              <h2 id="case-story-title">{project.caseStudy.headline}</h2>
              <div className={styles.storySummary}>
                <p className={styles.storyLead}>{project.caseStudy.overview}</p>
                <p className={styles.storyDetail}>{project.caseStudy.detail}</p>
              </div>
            </div>
          </Reveal>

          <div className={styles.storyChapters}>
            {project.caseStudy.story.map((chapter, index) => (
              <Reveal className={styles.storyChapter} delay={index * 70} key={chapter.title}>
                <p className={styles.chapterNumber}>{String(index + 1).padStart(2, "0")}</p>
                <span className={styles.chapterLabel}>{chapter.label}</span>
                <h3>{chapter.title}</h3>
                <p className={styles.chapterBody}>{chapter.body}</p>
              </Reveal>
            ))}
          </div>

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
                    <span className={styles.decisionNumber} aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3>{decision.title}</h3>
                    <p className={styles.decisionBody}>{decision.body}</p>
                  </Reveal>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </section>

      <section
        className={styles.build}
        data-case-section="build"
        aria-labelledby="case-build-title"
      >
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
            <TechnologyStack stack={project.caseStudy.technologyStack} />
          </div>
        </div>
      </section>

      <section
        className={styles.architecture}
        data-case-section="architecture"
        aria-labelledby="case-architecture-title"
      >
        <div className={styles.sectionShell}>
          <Reveal className={styles.architectureHeading}>
            <p className={styles.sectionLabel}>System architecture</p>
            <div>
              <h2 id="case-architecture-title">{project.caseStudy.architecture.headline}</h2>
              <p>{project.caseStudy.architecture.summary}</p>
            </div>
          </Reveal>

          <Reveal className={styles.architectureMap}>
            <ol>
              {project.caseStudy.architecture.items.map((item, index) => (
                <li key={item.label}>
                  <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <strong>{item.label}</strong>
                    <p>{item.value}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      <section
        className={styles.gallerySection}
        data-case-section="screens"
        aria-labelledby="case-gallery-title"
      >
        <div className={styles.sectionShell}>
          <Reveal className={styles.galleryHeading}>
            <p className={styles.sectionLabel}>Selected screens</p>
            <div>
              <h2 id="case-gallery-title">The system, seen in practice.</h2>
              <p>Readable views of the site and the system behind it.</p>
            </div>
          </Reveal>

          <CaseStudyGallery screens={galleryScreens} />
        </div>
      </section>

      <section className={styles.closing} data-case-section="closing" aria-labelledby="next-case">
        <div className={styles.closingInner}>
          <div className={styles.closingStatus}>
            <p className={styles.sectionLabel}>Current status</p>
            <strong className={styles.closingStatusTitle}>{project.statusDetail}</strong>
            <p>{project.caseStudy.statusCopy}</p>
            <Link href="/contact">
              Discuss a similar project
              <span aria-hidden="true" className="cta-icon">
                <ArrowUpRightGlyph />
              </span>
            </Link>
          </div>

          <Link
            className={styles.nextLink}
            data-next-project={nextProject.slug}
            href={`/portfolio/${nextProject.slug}`}
          >
            <div className={styles.nextCopy}>
              <span className={styles.nextLabel}>Next case study</span>
              <h2 id="next-case">{nextProject.title}</h2>
            </div>
            <div className={styles.nextMedia} aria-hidden="true">
              <Image src={nextProject.image} alt="" fill sizes="(max-width: 767px) 100vw, 32vw" />
            </div>
            <i className={`${styles.nextArrow} cta-icon`} aria-hidden="true">
              <ArrowUpRightGlyph />
            </i>
          </Link>
        </div>
      </section>
    </main>
  );
}
