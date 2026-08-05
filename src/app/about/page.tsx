import Image from "next/image";
import { ArrowLink } from "@/components/arrow-link";
import { Reveal } from "@/components/reveal";
import { site } from "@/data/site";
import { createPageMetadata } from "@/lib/seo";

const description =
  "Meet Carter Steinhoff, a Phoenix product designer, full-stack developer, AI automation specialist, cloud architect, and former Nucamp instructor.";

export const metadata = createPageMetadata({
  title: "About",
  description,
  path: "/about",
  image: {
    url: "/images/phoenix-night.webp",
    width: 1672,
    height: 941,
    alt: "Phoenix city lights and the Sonoran Desert at night",
  },
});

export default function AboutPage() {
  return (
    <main className="bg-[var(--dusk)] text-[var(--sand)]">
      <section className="about-hero">
        <Image
          src="/images/phoenix-night.webp"
          alt="Phoenix city lights and the Sonoran Desert at night"
          fill
          preload
          unoptimized
          sizes="100vw"
          className="about-hero-media about-city-image object-cover"
        />
        <div className="about-hero-scrim absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-black/10" />
        <div className="about-hero-content relative z-10 mx-auto flex w-full max-w-[1500px] flex-col justify-between gap-16">
          <p className="page-kicker">About · Phoenix, Arizona</p>
          <div>
            <h1 className="about-hero-title page-title max-w-[1200px]">
              Built in the desert.
              <br />
              <span className="italic text-[var(--accent)]">Curious everywhere.</span>
            </h1>
            <div className="about-hero-meta">
              <p className="about-hero-caption">
                Phoenix after dark—hard edges, warm light, and a lot of room to think.
              </p>
              <p className="about-hero-coordinates">
                <span>33.4484° N</span>
                <span>112.0740° W</span>
                <span>MST</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-context px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-[1500px] gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-20">
          <Reveal>
            <div className="about-studio-frame relative aspect-[4/3] overflow-hidden bg-white/5 lg:aspect-[5/6]">
              <Image
                src="/images/studio-hero.webp"
                alt="Carter Steinhoff working at his desk in Phoenix"
                fill
                unoptimized
                sizes="(max-width: 1023px) 100vw, 45vw"
                className="object-cover object-[66%_center]"
              />
            </div>
          </Reveal>
          <Reveal delay={120} className="about-context-copy">
            <p className="section-label">What I do</p>
            <h2 className="about-context-title section-title mt-8 max-w-3xl">
              I turn product ideas into
              <span className="italic text-[var(--accent)]"> useful, working systems.</span>
            </h2>
            <div className="about-context-body mt-8 grid gap-5 text-base leading-7 text-stone-400 md:text-lg md:leading-8">
              <p>
                I work across product strategy, interface design, frontend and backend development,
                AI automation, and cloud architecture. The goal is one coherent product—not a stack
                of disconnected deliverables.
              </p>
              <p>
                That range lets me move from an early idea to the CMS, API, database, deployment,
                and details people actually experience. Phoenix keeps the work direct, warm, and a
                little unexpected.
              </p>
              <p className="border-t border-white/15 pt-5">
                I also served as a web development instructor at Nucamp, helping new developers turn
                technical concepts into practical skills and working software.
              </p>
            </div>
            <nav className="mt-9 flex flex-wrap gap-x-6 gap-y-3" aria-label="Professional profiles">
              <a className="profile-link" href={site.linkedinUrl} target="_blank" rel="noreferrer">
                <span>Connect on LinkedIn</span>
                <span aria-hidden="true">↗</span>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
              <a className="profile-link" href={site.upworkUrl} target="_blank" rel="noreferrer">
                <span>Hire through Upwork</span>
                <span aria-hidden="true">↗</span>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </nav>
          </Reveal>
        </div>
      </section>

      <section className="sunset-surface border-y border-white/10 px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-[1500px]">
          <Reveal>
            <div className="grid gap-6 md:grid-cols-[0.55fr_1.45fr] md:items-end">
              <p className="section-label">One connected practice</p>
              <h2 className="section-title max-w-4xl">
                Three layers. <span className="italic text-[var(--accent)]">One product.</span>
              </h2>
            </div>
            <div className="about-principles mt-10 grid border-t border-white/15 lg:grid-cols-3">
              {[
                [
                  "01",
                  "Product & interface",
                  "Strategy, information architecture, visual direction, and responsive frontend work.",
                ],
                [
                  "02",
                  "Platform & cloud",
                  "APIs, databases, CMS architecture, AWS infrastructure, and dependable deployment.",
                ],
                [
                  "03",
                  "Automation & stewardship",
                  "AI workflows, integrations, performance, technical SEO, and a handoff people can use.",
                ],
              ].map(([number, title, copy]) => (
                <div
                  key={number}
                  className="border-b border-white/15 py-8 lg:border-r lg:px-8 lg:first:pl-0 lg:last:border-r-0"
                >
                  <span className="text-[0.72rem] font-semibold tracking-[0.12em] text-[var(--accent)]">
                    {number}
                  </span>
                  <h3 className="mt-16 font-[family-name:var(--font-display)] text-4xl tracking-[-0.03em]">
                    {title}
                  </h3>
                  <p className="mt-5 max-w-sm text-sm leading-6 text-stone-400">{copy}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-5 py-16 md:px-8 md:py-20">
        <Reveal className="mx-auto flex max-w-[1500px] flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="about-cta-title section-title max-w-4xl">
            Good work starts with a good
            <span className="italic text-[var(--accent)]"> conversation.</span>
          </h2>
          <ArrowLink href="/contact">Say hello</ArrowLink>
        </Reveal>
      </section>
    </main>
  );
}
