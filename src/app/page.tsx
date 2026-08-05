import Image from "next/image";
import { ArrowLink } from "@/components/arrow-link";
import { FocusIndex } from "@/components/focus-index";
import { Reveal } from "@/components/reveal";

export default function Home() {
  return (
    <main>
      <section className="home-hero">
        <Image
          src="/images/studio-hero.webp"
          alt="Carter Steinhoff working at a desk in his Phoenix studio"
          fill
          preload
          unoptimized
          sizes="100vw"
          className="hero-image object-cover"
        />
        <div className="hero-scrim" />

        <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1500px] flex-col justify-end px-5 pb-8 pt-32 md:px-8 md:pb-10">
          <p className="hero-kicker mb-5 text-[0.65rem] font-semibold tracking-[0.2em] text-stone-300 uppercase md:mb-7">
            Independent designer &amp; developer · Phoenix, AZ
          </p>
          <h1 className="hero-title max-w-6xl font-[family-name:var(--font-display)] text-[clamp(4.7rem,13.2vw,13.5rem)] leading-[0.72] tracking-[-0.055em] text-[#f5f0e7]">
            <span className="block">Carter</span>
            <span className="block pl-[0.14em] italic text-[var(--accent)]">Steinhoff.</span>
          </h1>

          <div className="hero-bottom mt-9 grid gap-7 border-t border-white/25 pt-5 text-stone-100 md:grid-cols-[1fr_1fr_auto] md:items-end">
            <p className="max-w-sm text-sm leading-6 text-stone-300 md:text-base">
              I shape ambitious ideas into digital work with clarity, character, and a careful
              finish.
            </p>
            <p className="hidden max-w-xs text-xs leading-5 text-stone-400 md:block">
              Product thinking, visual direction, and frontend development—carried from first sketch
              to final screen.
            </p>
            <ArrowLink href="/portfolio" inverse>
              View the work
            </ArrowLink>
          </div>
        </div>
      </section>

      <section className="sunset-surface bg-[var(--dusk)] px-5 py-24 text-[var(--sand)] md:px-8 md:py-36">
        <div className="mx-auto max-w-[1500px]">
          <Reveal className="grid gap-8 md:grid-cols-[0.55fr_1.45fr]">
            <p className="section-label">The point of view</p>
            <div>
              <h2 className="max-w-5xl font-[family-name:var(--font-display)] text-[clamp(3.3rem,7.8vw,8.4rem)] leading-[0.89] tracking-[-0.045em]">
                Clear thinking.
                <br />
                <span className="italic text-[var(--accent)]">Unmistakable</span> work.
              </h2>
              <p className="mt-10 max-w-xl text-base leading-7 text-stone-400 md:ml-auto md:text-lg md:leading-8">
                The best digital experiences feel obvious after they exist. I get there by asking
                sharper questions, editing hard, and making every detail earn its place.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section
        id="selected-work"
        className="bg-[var(--dusk)] px-5 pb-24 text-[var(--sand)] md:px-8 md:pb-36"
      >
        <div className="mx-auto max-w-[1500px]">
          <Reveal>
            <div className="mb-10 flex items-end justify-between gap-6 md:mb-14">
              <div>
                <p className="section-label mb-4">Selected directions</p>
                <h2 className="font-[family-name:var(--font-display)] text-5xl tracking-[-0.035em] md:text-7xl">
                  Work in focus.
                </h2>
              </div>
              <p className="hidden max-w-xs text-right text-sm leading-6 text-stone-500 md:block">
                Case studies are being edited now. These are the kinds of problems I keep coming
                back to.
              </p>
            </div>
          </Reveal>
          <FocusIndex />
          <Reveal className="mt-12 flex justify-end">
            <ArrowLink href="/portfolio">See the portfolio</ArrowLink>
          </Reveal>
        </div>
      </section>

      <section className="sunset-band relative overflow-hidden bg-[var(--sunset-deep)] px-5 py-24 text-[var(--sand)] md:px-8 md:py-36">
        <div className="desert-orbit" aria-hidden="true" />
        <div className="relative z-10 mx-auto grid max-w-[1500px] gap-16 md:grid-cols-[0.8fr_1.2fr] md:items-end">
          <Reveal>
            <p className="section-label">How I work</p>
            <p className="mt-6 max-w-sm text-base leading-7 text-stone-400">
              Close collaboration, visible decisions, and enough restraint to keep the main idea
              intact.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <ol className="process-list">
              <li>
                <span>01</span>
                <strong>Find the signal</strong>
              </li>
              <li>
                <span>02</span>
                <strong>Shape the system</strong>
              </li>
              <li>
                <span>03</span>
                <strong>Make it real</strong>
              </li>
            </ol>
          </Reveal>
        </div>
      </section>

      <section className="bg-[var(--ink)] px-5 py-24 text-stone-100 md:px-8 md:py-36">
        <div className="mx-auto max-w-[1500px]">
          <Reveal className="grid gap-12 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <p className="section-label border-white/20 text-stone-500">Have a project?</p>
              <h2 className="mt-7 max-w-5xl font-[family-name:var(--font-display)] text-[clamp(4rem,9vw,9.5rem)] leading-[0.84] tracking-[-0.05em]">
                Let’s make it
                <br />
                <span className="italic text-[var(--accent)]">worth opening.</span>
              </h2>
            </div>
            <ArrowLink href="/contact" inverse>
              Start a conversation
            </ArrowLink>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
