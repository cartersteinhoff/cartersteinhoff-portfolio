import Image from "next/image";
import { ArrowLink } from "@/components/arrow-link";
import { homeContent } from "@/data/home";
import { site } from "@/data/site";

/* The first viewport remains a focused hero. The editorial overview below
 * gives no-JavaScript readers and agents enough context to understand the
 * practice without duplicating the portfolio or service catalog. */
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

      <section className="home-overview" aria-labelledby="home-overview-title">
        <div className="home-overview-shell">
          <p className="eyebrow">Independent product studio · {site.location}</p>
          <div className="home-overview-grid">
            <h2 id="home-overview-title">{homeContent.overviewTitle}</h2>
            <div className="home-overview-copy">
              {homeContent.overviewParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <nav className="home-overview-links" aria-label="Explore Carter Steinhoff's work">
                <ArrowLink href="/portfolio">Review case studies</ArrowLink>
                <ArrowLink href="/about">Read the background</ArrowLink>
                <ArrowLink href="/contact">Discuss a project</ArrowLink>
              </nav>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
