import Image from "next/image";
import Link from "next/link";
import { ArrowLink } from "@/components/arrow-link";
import { ArrowUpRightGlyph } from "@/components/arrow-up-right-glyph";
import { portfolioProjects, site } from "@/data/site";
import { createPageMetadata } from "@/lib/seo";
import styles from "./portfolio-index.module.css";

const description =
  "Explore digital products Carter Steinhoff designed and built across WordPress, Next.js, custom CMS platforms, backend systems, and cloud architecture.";

/* No `image` — the route's own opengraph-image.tsx supplies the card. */
export const metadata = createPageMetadata({
  title: "Portfolio",
  description,
  path: "/portfolio",
});

/**
 * Order and numbering both come from `portfolioProjects` itself. This
 * page used to keep its own list, which meant the index, the "next case
 * study" link, and the sitemap could each walk the projects in a
 * different order — and the stored `number` drifted out of step with
 * what the cards displayed.
 */
const orderedProjects = portfolioProjects;

export default function PortfolioPage() {
  return (
    <main className={styles.root}>
      <section className={styles.work} aria-labelledby="portfolio-title">
        <header className={`${styles.frame} ${styles.workIntro}`}>
          <div>
            <p className={styles.workKicker}>
              Portfolio · {String(orderedProjects.length).padStart(2, "0")} projects
            </p>
            <h1 id="portfolio-title" className={styles.workTitle}>
              Selected <em>work.</em>
            </h1>
          </div>
          <p className={styles.workSummary}>
            Digital products designed and built across interfaces, publishing systems, and cloud
            infrastructure.
          </p>
        </header>

        <div className={`${styles.frame} ${styles.workGrid}`}>
          {orderedProjects.map((project, index) => {
            const isLive = project.status === "Live";

            return (
              <article
                key={project.slug}
                id={`work-${project.slug}`}
                className={styles.card}
                aria-labelledby={`project-${project.slug}`}
              >
                <div className={styles.cardBody}>
                  <h2 id={`project-${project.slug}`} className={`display-4 ${styles.cardTitle}`}>
                    {project.title}
                  </h2>
                  <p className={styles.cardMeta}>
                    <span className={styles.cardNumber}>{project.number}</span>
                    <span>{project.shortPlatform}</span>
                    <span>{project.year}</span>
                  </p>
                  <p className={styles.cardHeadline}>{project.caseStudy.headline}</p>
                </div>

                {/* Browser chrome frames the screenshot as a product,
                 * which is what keeps a bright site from reading as a
                 * glaring rectangle on an ink-black page. */}
                <div className={styles.browser}>
                  <div className={styles.browserBar}>
                    <span className={styles.browserDots} aria-hidden="true">
                      <i />
                      <i />
                      <i />
                    </span>
                    <a
                      className={styles.browserDomain}
                      href={project.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {project.domain}{" "}
                      <span aria-hidden="true" className="cta-icon">
                        <ArrowUpRightGlyph />
                      </span>
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                    <span className={`${styles.browserStatus} ${isLive ? styles.statusLive : ""}`}>
                      {project.status}
                    </span>
                  </div>
                  {/* The screenshot is a redundant click target for the
                   * case study, so it is hidden from assistive tech and
                   * skipped by the keyboard: the "Case study" link below
                   * goes to the same place, and two tab stops per card
                   * pointing at one destination is noise. The chrome bar
                   * above stays announced — the domain and status are
                   * real information. */}
                  <Link
                    href={`/portfolio/${project.slug}`}
                    className={styles.shotLink}
                    tabIndex={-1}
                    aria-hidden="true"
                  >
                    <span className={styles.shot}>
                      <Image
                        src={project.image}
                        alt={project.imageAlt}
                        fill
                        loading={index === 0 ? "eager" : "lazy"}
                        sizes="(max-width: 767px) calc(100vw - 2.5rem), (max-width: 1023px) calc(100vw - 4rem), 40vw"
                        className={styles.shotImage}
                      />
                    </span>
                  </Link>
                </div>

                <div className={styles.cardActions}>
                  <ArrowLink href={`/portfolio/${project.slug}`}>
                    Case study
                    <span className="sr-only">: {project.title}</span>
                  </ArrowLink>
                  <a
                    className={styles.visitLink}
                    href={project.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Visit site{" "}
                    <span aria-hidden="true" className="cta-icon">
                      <ArrowUpRightGlyph />
                    </span>
                    <span className="sr-only"> ({project.domain}, opens in a new tab)</span>
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className={styles.finalCta} aria-labelledby="portfolio-cta-title">
        <div className={`${styles.frame} ${styles.finalCtaLayout}`}>
          <div>
            <p className="eyebrow">Have a product in mind?</p>
            <h2 id="portfolio-cta-title" className="display-3">
              Let’s build the <span>next one.</span>
            </h2>
          </div>
          <div className={styles.finalCtaActions}>
            <ArrowLink href="/contact">Tell me about your project</ArrowLink>
            <nav className={styles.profileLinks} aria-label="Professional profiles">
              <a href={site.linkedinUrl} target="_blank" rel="noreferrer">
                LinkedIn{" "}
                <span aria-hidden="true" className="cta-icon">
                  <ArrowUpRightGlyph />
                </span>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
              <a href={site.upworkUrl} target="_blank" rel="noreferrer">
                Hire through Upwork{" "}
                <span aria-hidden="true" className="cta-icon">
                  <ArrowUpRightGlyph />
                </span>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </nav>
          </div>
        </div>
      </section>
    </main>
  );
}
