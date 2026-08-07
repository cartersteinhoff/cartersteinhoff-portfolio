import Image from "next/image";
import Link from "next/link";
import { ArrowLink } from "@/components/arrow-link";
import { LivePreview } from "@/components/live-preview";
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

/**
 * Sites that refuse embedding. Verified by request, not assumed:
 * annenewgarden.vercel.app returns `X-Frame-Options: DENY` and
 * `Content-Security-Policy: frame-ancestors 'none'`, so a frame there
 * renders only a browser error. The other four embed cleanly.
 * Re-check with `curl -I` if a project's hosting changes.
 */
const nonEmbeddableSlugs = new Set<string>(["anne-newgarden"]);

export default function PortfolioPage() {
  return (
    <main className={styles.root}>
      {/* Mirrors the services hero: grid-line texture, angled gradient,
       * accent-coloured closing word, and a rule-topped summary column. */}
      <section className={styles.hero} aria-labelledby="portfolio-title">
        <div className={styles.heroGridLines} aria-hidden="true" />
        <div className={`${styles.frame} ${styles.heroInner}`}>
          <div className={styles.heroStatement}>
            <h1 id="portfolio-title" className={`display-1 ${styles.heroTitle}`}>
              Products from interface to <em>infrastructure.</em>
            </h1>
            <div className={styles.heroSummary}>
              <p>
                I design the experience, build the system behind it, and take both into production.
              </p>
              <div className={styles.heroActions}>
                <ArrowLink href="/contact">Start a project</ArrowLink>
                <Link href="/services" className={styles.textLink}>
                  See services <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.work} aria-label="Selected work">
        <div className={`${styles.frame} ${styles.workGrid}`}>
          {orderedProjects.map((project) => {
            const isLive = project.status === "Live";

            return (
              <article
                key={project.slug}
                id={`work-${project.slug}`}
                className={styles.card}
                aria-labelledby={`project-${project.slug}`}
              >
                <LivePreview
                  url={project.url}
                  domain={project.domain}
                  frameable={!nonEmbeddableSlugs.has(project.slug)}
                  title={project.title}
                >
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
                      <span className={styles.browserDomain}>{project.domain}</span>
                      <span
                        className={`${styles.browserStatus} ${isLive ? styles.statusLive : ""}`}
                      >
                        {project.status}
                      </span>
                    </div>
                    <div className={styles.shot}>
                      <Image
                        src={project.image}
                        alt={project.imageAlt}
                        fill
                        sizes="(max-width: 767px) calc(100vw - 2.5rem), (max-width: 1023px) calc(100vw - 4rem), 40vw"
                        className={styles.shotImage}
                      />
                    </div>
                  </div>
                </LivePreview>

                <p className={styles.cardMeta}>
                  <span className={styles.cardNumber}>{project.number}</span>
                  <span>{project.shortPlatform}</span>
                  <span className={styles.cardYear}>{project.year}</span>
                </p>

                <h2 id={`project-${project.slug}`} className={`display-4 ${styles.cardTitle}`}>
                  {project.title}
                </h2>
                <p className={styles.cardHeadline}>{project.caseStudy.headline}</p>
                <p className={styles.cardSummary}>{project.summary}</p>

                <dl className={styles.cardFacts}>
                  <div>
                    <dt>Role</dt>
                    <dd>{project.caseStudy.role}</dd>
                  </div>
                  <div>
                    <dt>System</dt>
                    <dd>{project.caseStudy.system}</dd>
                  </div>
                </dl>

                <div className={styles.cardActions}>
                  <ArrowLink href={`/portfolio/${project.slug}`}>Read the case study</ArrowLink>
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
                LinkedIn <span aria-hidden="true">↗</span>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
              <a href={site.upworkUrl} target="_blank" rel="noreferrer">
                Hire through Upwork <span aria-hidden="true">↗</span>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </nav>
          </div>
        </div>
      </section>
    </main>
  );
}
