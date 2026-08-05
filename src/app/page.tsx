import Image from "next/image";
import Link from "next/link";
import { ArrowLink } from "@/components/arrow-link";
import { Reveal } from "@/components/reveal";
import { portfolioProjects } from "@/data/site";

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
              I turn ambitious ideas into useful digital products—from the interface to the systems
              behind them.
            </p>
            <p className="hidden max-w-xs text-xs leading-5 text-stone-400 md:block">
              Web design, custom CMS systems, AI automation, and cloud delivery—carried from first
              sketch to production.
            </p>
            <ArrowLink href="#selected-work" inverse>
              View the work
            </ArrowLink>
          </div>
        </div>
      </section>

      <section
        id="selected-work"
        className="sunset-surface bg-[var(--dusk)] px-5 py-24 text-[var(--sand)] md:px-8 md:py-36"
      >
        <div className="mx-auto max-w-[1500px]">
          <Reveal className="mb-14 grid gap-8 md:mb-20 md:grid-cols-[0.55fr_1.45fr]">
            <p className="section-label">Selected work</p>
            <div>
              <h2 className="max-w-5xl font-[family-name:var(--font-display)] text-[clamp(3.8rem,8vw,8.6rem)] leading-[0.86] tracking-[-0.05em]">
                Real products.
                <br />
                <span className="italic text-[var(--accent)]">Built to work.</span>
              </h2>
              <p className="mt-9 max-w-xl text-base leading-7 text-stone-400 md:ml-auto md:text-lg md:leading-8">
                Three live platforms for publishing, events, and desktop automation—each designed
                and developed around a different set of people and operating needs.
              </p>
            </div>
          </Reveal>

          <div className="home-project-grid">
            {portfolioProjects.map((project, index) => (
              <Link
                key={project.slug}
                href={`/portfolio/${project.slug}`}
                className={`home-project group ${index === 0 ? "home-project-primary" : ""}`}
              >
                <span className="home-project-media">
                  <Image
                    src={project.image}
                    alt=""
                    fill
                    unoptimized
                    sizes={
                      index === 0
                        ? "(max-width: 768px) 100vw, 62vw"
                        : "(max-width: 768px) 100vw, 38vw"
                    }
                    className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.025]"
                  />
                </span>
                <span className="home-project-copy">
                  <span className="flex items-center justify-between gap-4 text-[0.62rem] font-semibold tracking-[0.16em] uppercase">
                    <span className="text-[var(--accent)]">{project.number}</span>
                    <span className="text-stone-500">{project.platform} · Live</span>
                  </span>
                  <span className="mt-8 flex items-end justify-between gap-6">
                    <span>
                      <span className="block font-[family-name:var(--font-display)] text-[clamp(2.8rem,5vw,5.8rem)] leading-[0.88] tracking-[-0.04em]">
                        {project.title}
                      </span>
                      <span className="mt-4 block max-w-lg text-sm leading-6 text-stone-500 md:text-base">
                        {project.summary}
                      </span>
                    </span>
                    <span className="focus-arrow shrink-0" aria-hidden="true">
                      ↗
                    </span>
                  </span>
                </span>
                <span className="sr-only">View the {project.title} case study</span>
              </Link>
            ))}
          </div>

          <Reveal className="mt-12 flex justify-end">
            <ArrowLink href="/portfolio">See the portfolio</ArrowLink>
          </Reveal>
        </div>
      </section>

      <section className="sunset-band relative overflow-hidden bg-[var(--sunset-deep)] px-5 py-24 text-[var(--sand)] md:px-8 md:py-36">
        <div className="desert-orbit" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-[1500px]">
          <Reveal className="grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:items-end">
            <div>
              <p className="section-label">Services</p>
              <h2 className="mt-8 max-w-4xl font-[family-name:var(--font-display)] text-[clamp(3.8rem,8vw,8.2rem)] leading-[0.86] tracking-[-0.05em]">
                From first screen to the
                <span className="italic text-[var(--accent)]"> system behind it.</span>
              </h2>
            </div>
            <p className="max-w-lg text-base leading-7 text-stone-300 md:ml-auto md:text-lg md:leading-8">
              Strategy, design, development, custom CMS work, automation, and cloud delivery—kept
              connected from the start.
            </p>
          </Reveal>

          <div className="home-service-list mt-16 md:mt-24">
            {[
              [
                "01",
                "Design & product",
                "Website design, product UX, visual direction, prototyping, and design systems.",
              ],
              [
                "02",
                "Web, CMS & custom plugins",
                "Next.js, React, WordPress, custom themes and plugins, APIs, and editorial systems.",
              ],
              [
                "03",
                "AI, automation & cloud",
                "AI workflows, systems integration, AWS, Azure, Google Cloud, Vercel, and CI/CD.",
              ],
            ].map(([number, title, copy]) => (
              <Reveal key={number} className="home-service-row">
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-12 flex justify-end">
            <ArrowLink href="/services">Explore all services</ArrowLink>
          </Reveal>
        </div>
      </section>

      <section className="grid bg-[var(--ink)] text-stone-100 md:min-h-[70svh] md:grid-cols-2">
        <div className="relative min-h-[55svh] overflow-hidden md:min-h-full">
          <Image
            src="/images/phoenix-night.webp"
            alt="Phoenix city lights and the Sonoran Desert at night"
            fill
            unoptimized
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/10" />
        </div>
        <div className="flex items-center px-5 py-24 md:px-16 md:py-32">
          <Reveal>
            <p className="section-label">Experience</p>
            <h2 className="mt-8 max-w-3xl font-[family-name:var(--font-display)] text-[clamp(3.5rem,6.5vw,7rem)] leading-[0.88] tracking-[-0.045em]">
              Builder by practice.
              <span className="block italic text-[var(--accent)]">Teacher by experience.</span>
            </h2>
            <p className="mt-9 max-w-xl text-base leading-7 text-stone-400 md:text-lg md:leading-8">
              I’m a Phoenix-based designer and developer and a former web development instructor at
              Nucamp. Teaching made the work sharper: explain the idea clearly, make the system
              understandable, and leave people able to move it forward.
            </p>
            <div className="mt-10">
              <ArrowLink href="/about" inverse>
                More about me
              </ArrowLink>
            </div>
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
