import Image from "next/image";
import { ArrowLink } from "@/components/arrow-link";
import { Reveal } from "@/components/reveal";
import { homeContent } from "@/data/home";
import { portfolioProjects, site } from "@/data/site";
import styles from "./home-proof.module.css";

const featuredProjects = homeContent.featuredProjectSlugs.map((slug) => {
  const project = portfolioProjects.find((candidate) => candidate.slug === slug);
  const media = homeContent.featuredProjectMedia.find((candidate) => candidate.slug === slug);

  if (!project || !media) {
    throw new Error(`Unknown featured homepage project: ${slug}`);
  }

  const detailScreen =
    project.caseStudy.screens.find((screen) => screen.image === media.detailImage) ??
    ("responsiveProof" in project.caseStudy
      ? project.caseStudy.responsiveProof.screens.find(
          (screen) => screen.image === media.detailImage,
        )
      : undefined);

  if (!detailScreen) {
    throw new Error(`Unknown featured homepage image: ${media.detailImage}`);
  }

  return { project, media, detailScreen };
});

/* The first viewport remains a focused hero. The proof section below
 * moves directly into shipped work instead of repeating the studio pitch. */
export default function Home() {
  return (
    <main>
      <section className="home-hero">
        <div className="hero-scenes" aria-hidden="true">
          <Image
            src="/images/studio-hero-v3.webp"
            alt=""
            fill
            preload
            sizes="100vw"
            className="hero-scene hero-scene-studio"
            data-hero-scene="studio"
          />
          {/* The desk now owns the second cut, but both later scenes remain
           * lazy and low priority behind the preloaded LCP image. Because the
           * stacked frames overlap the viewport, the browser still discovers
           * them early enough for the fast sequence. */}
          <Image
            src="/images/desk-night-hero.webp"
            alt=""
            fill
            loading="lazy"
            fetchPriority="low"
            sizes="100vw"
            className="hero-scene hero-scene-desk"
            data-hero-scene="desk"
          />
          <Image
            src="/images/phoenix-moonrise-hero.webp"
            alt=""
            fill
            loading="lazy"
            fetchPriority="low"
            sizes="100vw"
            className="hero-scene hero-scene-moonrise"
            data-hero-scene="moonrise"
          />
          <div className="hero-light-shift" />
        </div>
        <div className="hero-scrim" />

        <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1500px] flex-col justify-end px-5 pb-8 pt-32 md:justify-center md:px-8 md:pb-10">
          {/* Carries the hairline every other eyebrow on the site has;
           * without it the label floated free of the name. */}
          <p className="hero-kicker mb-5 w-max max-w-full border-t border-white/30 pt-3 text-[0.72rem] font-semibold tracking-[0.13em] text-stone-300 uppercase md:mb-7">
            Product · Full-stack · AI &amp; cloud
          </p>
          <h1 className="hero-title home-hero-title">
            <span className="sr-only">{site.name}. </span>
            <span>Products </span>
            <span>from interface </span>
            <span>
              to <em>infrastructure.</em>
            </span>
          </h1>

          <div className="hero-bottom mt-8 grid max-w-2xl gap-6 border-t border-white/25 pt-5 text-stone-100">
            <div className="grid gap-4">
              <p className="home-hero-summary">{homeContent.heroSummary}</p>
              <p className="text-[0.72rem] font-bold tracking-[0.13em] text-stone-400 uppercase">
                Independent studio · {site.location}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-x-9 gap-y-3">
              <ArrowLink href="/portfolio" inverse>
                View the work
              </ArrowLink>
              <ArrowLink href="/services" inverse>
                See services
              </ArrowLink>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.proof} aria-labelledby="home-proof-title" data-home-proof>
        <div className={styles.shell}>
          <header className={styles.sectionHead}>
            <h2 id="home-proof-title" className={styles.sectionTitle}>
              {homeContent.proofEyebrow}
            </h2>
            <p className={styles.sectionCount}>01—03</p>
          </header>

          <div className={styles.projects}>
            {featuredProjects.map(({ project, media, detailScreen }, index) => {
              const isReverse = index % 2 === 1;
              return (
                <Reveal
                  key={project.slug}
                  className={`${styles.projectReveal} ${isReverse ? styles.reverse : ""}`}
                >
                  <article
                    className={styles.project}
                    aria-labelledby={`home-project-${project.slug}`}
                    data-home-project={project.slug}
                  >
                    <div className={styles.visual} data-project-media>
                      <div className={styles.primaryFrame} data-project-primary>
                        <Image
                          src={project.image}
                          alt={project.imageAlt}
                          fill
                          sizes="(max-width: 639px) calc(100vw - 2.5rem), (max-width: 1023px) calc(100vw - 4rem), 62vw"
                          className={styles.primaryImage}
                        />
                      </div>
                      <div
                        className={`${styles.detailFrame} ${
                          media.detailKind === "portrait"
                            ? styles.detailPortrait
                            : styles.detailLandscape
                        }`}
                        data-project-detail
                      >
                        <Image
                          src={media.detailImage}
                          alt={detailScreen.alt}
                          fill
                          sizes={
                            media.detailKind === "portrait"
                              ? "(max-width: 1023px) 7rem, 13rem"
                              : "(max-width: 1023px) 50vw, 25rem"
                          }
                          className={styles.detailImage}
                        />
                      </div>
                    </div>

                    <div className={styles.projectCopy} data-project-copy>
                      <p className={styles.projectNumber}>
                        {project.number} <span aria-hidden="true">/ 03</span>
                        <span className="sr-only"> of 3</span>
                      </p>
                      <h3 id={`home-project-${project.slug}`} className={styles.projectTitle}>
                        {project.title}
                      </h3>
                      <p className={styles.projectHeadline}>{project.caseStudy.headline}</p>
                      <ArrowLink href={`/portfolio/${project.slug}`}>
                        View case study<span className="sr-only">: {project.title}</span>
                      </ArrowLink>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>

          <footer className={styles.sectionFooter}>
            <ArrowLink href="/portfolio">View all case studies</ArrowLink>
          </footer>
        </div>
      </section>
    </main>
  );
}
