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
            <ArrowLink href="#selected-work" inverse>
              View the work
            </ArrowLink>
          </div>
        </div>
      </section>

      <section
        id="selected-work"
        className="sunset-surface bg-[var(--dusk)] px-5 py-16 text-[var(--sand)] md:px-8 md:py-20"
      >
        <div className="mx-auto max-w-[1500px]">
          <Reveal className="mb-10 grid gap-5 md:mb-14 md:grid-cols-[0.55fr_1.45fr]">
            <p className="section-label">Selected work</p>
            <div>
              <h2 className="section-title">Built for real work.</h2>
              <p className="section-lead mt-7 md:ml-auto">
                Five platforms spanning publishing, events, desktop automation, pharmaceutical
                communications, and editorial storytelling.
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
                        ? "(max-width: 767px) 100vw, 92vw"
                        : "(max-width: 767px) 100vw, (max-width: 1023px) 48vw, 31vw"
                    }
                    className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.025]"
                  />
                </span>
                <span className="home-project-copy">
                  <span className="home-project-meta">
                    <span className="home-project-index">
                      {index === 0 ? `Featured ${project.number}` : project.number}
                    </span>
                    <span className="home-project-platform">
                      {project.shortPlatform}
                      {` · ${project.status}`}
                    </span>
                  </span>
                  <span className="mt-6 block">
                    <span className="home-project-title">{project.title}</span>
                    <span className="home-project-summary">
                      {index === 0
                        ? "Designed and developed end to end in WordPress, including custom plugins and editorial systems."
                        : project.summary}
                    </span>
                    <span className="home-project-action">
                      Case study
                      <span aria-hidden="true">↗</span>
                    </span>
                  </span>
                </span>
              </Link>
            ))}
          </div>

          <Reveal className="mt-10 flex justify-end md:mt-12">
            <ArrowLink href="/portfolio">See the portfolio</ArrowLink>
          </Reveal>
        </div>
      </section>

      <section className="sunset-band relative overflow-hidden bg-[var(--sunset-deep)] px-5 py-16 text-[var(--sand)] md:px-8 md:py-20">
        <div className="desert-orbit" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-[1500px]">
          <Reveal className="grid gap-7 md:grid-cols-[0.8fr_1.2fr] md:items-end">
            <div>
              <p className="section-label">Services</p>
              <h2 className="section-title mt-7">
                Design the screen.
                <br />
                Build the system.
              </h2>
            </div>
            <p className="section-lead md:ml-auto">
              Web design, custom CMS development, AI automation, and cloud delivery—one connected
              practice.
            </p>
          </Reveal>

          <div className="home-service-list mt-12 md:mt-16">
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

          <Reveal className="mt-10 flex justify-end md:mt-12">
            <ArrowLink href="/services">Explore all services</ArrowLink>
          </Reveal>
        </div>
      </section>

      <section className="grid bg-[var(--ink)] text-stone-100 md:grid-cols-[0.9fr_1.1fr]">
        <div className="relative min-h-[22rem] overflow-hidden md:min-h-[28rem]">
          <Image
            src="/images/phoenix-night.webp"
            alt="Phoenix city lights and the Sonoran Desert at night"
            fill
            unoptimized
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-[center_68%]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/10" />
        </div>
        <div className="flex items-center px-5 py-16 md:px-14 md:py-16">
          <Reveal>
            <p className="section-label">Experience</p>
            <h2 className="section-title mt-7 max-w-3xl">Teaching made the work sharper.</h2>
            <p className="mt-7 text-[0.72rem] font-bold tracking-[0.12em] text-[var(--accent)] uppercase">
              Former web development instructor · Nucamp
            </p>
            <p className="section-lead mt-5">
              It still shapes how I build: make the idea clear, the system understandable, and the
              handoff useful.
            </p>
            <div className="mt-8">
              <ArrowLink href="/about" inverse>
                More about me
              </ArrowLink>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-[var(--ink)] px-5 py-16 text-stone-100 md:px-8 md:py-20">
        <div className="mx-auto max-w-[1500px]">
          <Reveal className="grid gap-10 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <p className="section-label border-white/20 text-stone-400">Have a project?</p>
              <h2 className="section-title mt-7 max-w-5xl">
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
