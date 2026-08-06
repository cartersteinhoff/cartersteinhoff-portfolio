import Image from "next/image";
import { ArrowLink } from "@/components/arrow-link";
import { site } from "@/data/site";

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
          <Image
            src="/images/desk-night-hero.webp"
            alt=""
            fill
            loading="eager"
            sizes="100vw"
            className="hero-scene hero-scene-desk"
            data-hero-scene="desk"
          />
          <div className="hero-light-shift" />
        </div>
        <div className="hero-scrim" />

        <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1500px] flex-col justify-end px-5 pb-8 pt-32 md:px-8 md:pb-10">
          {/* Carries the hairline every other eyebrow on the site has;
           * without it the label floated free of the name. */}
          <p className="hero-kicker mb-5 w-max max-w-full border-t border-white/30 pt-3 text-[0.72rem] font-semibold tracking-[0.13em] text-stone-300 uppercase md:mb-7">
            Product · Full-stack · AI &amp; cloud
          </p>
          <h1 className="hero-title home-hero-title">
            <span className="block">Carter</span>
            <span className="block pl-[0.14em] italic text-[var(--accent)]">Steinhoff.</span>
          </h1>

          {/* One left-anchored column so the photograph owns the right
           * half. Splitting the lead and the actions to opposite edges
           * left ~676px of dead space between them. */}
          <div className="hero-bottom mt-9 grid max-w-2xl gap-7 border-t border-white/25 pt-6 text-stone-100">
            <div className="grid gap-4">
              {/* The kicker already names the disciplines, so this states
               * the scope and who is doing it instead of re-listing. */}
              <p className="text-[length:var(--text-lead)] leading-[1.65] text-stone-300">
                I design the product and build the system it runs on — one person carrying a project
                from the first interface through to the infrastructure behind it.
              </p>
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
    </main>
  );
}
