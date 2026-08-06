import Image from "next/image";
import { ArrowLink } from "@/components/arrow-link";

/* The homepage is the hero and nothing else. Work lives on /portfolio and
 * the contact CTA lives in the site footer, so repeating either here only
 * delayed the visitor's first real choice. */
export default function Home() {
  return (
    <main>
      <section className="home-hero">
        <div className="hero-scenes" aria-hidden="true">
          <Image
            src="/images/studio-hero.webp"
            alt=""
            fill
            preload
            sizes="100vw"
            className="hero-scene hero-scene-studio"
            data-hero-scene="studio"
          />
          <Image
            src="/images/phoenix-moonrise-hero.webp"
            alt=""
            fill
            loading="eager"
            sizes="100vw"
            className="hero-scene hero-scene-moonrise"
            data-hero-scene="moonrise"
          />
          <div className="hero-light-shift" />
        </div>
        <div className="hero-scrim" />

        <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1500px] flex-col justify-end px-5 pb-8 pt-32 md:px-8 md:pb-10">
          <p className="hero-kicker mb-5 text-[0.72rem] font-semibold tracking-[0.13em] text-stone-300 uppercase md:mb-7">
            Product · Full-stack · AI &amp; cloud
          </p>
          <h1 className="hero-title home-hero-title">
            <span className="block">Carter</span>
            <span className="block pl-[0.14em] italic text-[var(--accent)]">Steinhoff.</span>
          </h1>

          <div className="hero-bottom mt-9 grid gap-6 border-t border-white/25 pt-5 text-stone-100 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
            <p className="max-w-lg text-[0.95rem] leading-6 text-stone-300 md:text-base">
              I design and build complete digital products—from interface and CMS to backend, cloud
              architecture, and AI automation.
            </p>
            {/* Was an anchor to the removed on-page section; now goes
             * straight to the portfolio. */}
            <ArrowLink href="/portfolio" inverse>
              View the work
            </ArrowLink>
          </div>
        </div>
      </section>
    </main>
  );
}
