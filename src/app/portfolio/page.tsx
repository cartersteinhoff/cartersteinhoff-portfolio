import Image from "next/image";
import Link from "next/link";
import { ArrowLink } from "@/components/arrow-link";
import { Reveal } from "@/components/reveal";
import { portfolioProjects, site } from "@/data/site";
import { createPageMetadata } from "@/lib/seo";

const description =
  "Explore Carter Steinhoff's WordPress, Next.js, headless CMS, and cloud product case studies, including RetailBoss and OpenWorkspace.";

export const metadata = createPageMetadata({
  title: "Portfolio",
  description,
  path: "/portfolio",
  image: {
    url: "/images/retailboss-project.webp",
    width: 1440,
    height: 1000,
    alt: "RetailBoss homepage designed and developed by Carter Steinhoff",
  },
});

export default function PortfolioPage() {
  return (
    <main className="bg-[var(--dusk)] text-[var(--sand)]">
      <section className="portfolio-hero page-hero">
        <div className="page-hero-inner">
          <p className="page-kicker">Portfolio · Selected work</p>
          <div className="portfolio-hero-stage">
            <div className="portfolio-hero-copy">
              <h1 className="portfolio-hero-title page-title">Work with a reason to exist.</h1>
              <p className="portfolio-hero-lead section-lead mt-8">
                Four platforms shaped through development: custom publishing systems, focused
                products, and a headless pharmaceutical microsite.
              </p>
              <a
                className="profile-link mt-7"
                href={site.upworkUrl}
                target="_blank"
                rel="noreferrer"
              >
                <span>View my Upwork profile</span>
                <span aria-hidden="true">↗</span>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>
            <nav className="portfolio-hero-reel" aria-label="Selected project previews">
              {portfolioProjects.slice(0, 3).map((project, index) => (
                <Link
                  key={project.slug}
                  className={`portfolio-hero-shot portfolio-hero-shot-${index + 1}`}
                  href={`/portfolio/${project.slug}`}
                  aria-label={`View the ${project.title} case study`}
                >
                  <Image
                    src={project.image}
                    alt=""
                    fill
                    unoptimized
                    sizes="(max-width: 767px) 72vw, 44vw"
                    className="object-cover"
                  />
                  <span className="portfolio-hero-shot-scrim" aria-hidden="true" />
                  <span className="portfolio-hero-shot-label">
                    <span>{project.number}</span>
                    <strong>{project.title}</strong>
                  </span>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </section>

      <section className="border-t border-white/15">
        {portfolioProjects.map((project) => (
          <article key={project.slug} className="portfolio-entry" data-project={project.slug}>
            <div className="portfolio-entry-copy">
              <div className="flex items-center justify-between gap-4">
                <span className="text-[0.72rem] font-semibold tracking-[0.11em] text-[var(--muted-soft)]">
                  {project.number}
                </span>
                <span className="text-[0.72rem] font-semibold tracking-[0.11em] text-[var(--accent)] uppercase">
                  {project.status} · {project.platform}
                </span>
              </div>
              <div>
                <h2 className="portfolio-entry-title">{project.title}</h2>
                <p className="portfolio-entry-summary mt-6 max-w-xl">{project.summary}</p>
                <p className="portfolio-entry-description mt-5 max-w-lg text-base leading-7 text-stone-400">
                  {project.description}
                </p>
              </div>
              <div className="flex flex-col gap-8">
                <ul className="portfolio-entry-services flex flex-wrap gap-x-5 gap-y-2 uppercase">
                  {project.services.map((service) => (
                    <li key={service}>{service}</li>
                  ))}
                </ul>
                <div className="flex flex-wrap items-center gap-x-8 gap-y-5">
                  <ArrowLink href={`/portfolio/${project.slug}`}>View case study</ArrowLink>
                  <a
                    className="inline-flex min-h-11 items-center text-[0.72rem] font-semibold tracking-[0.11em] text-[var(--muted)] uppercase transition-colors hover:text-[var(--accent)]"
                    href={project.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {project.status === "Live" ? "Live site" : "View microsite"} ↗
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </div>
              </div>
            </div>
            <Link
              className="portfolio-entry-media group"
              href={`/portfolio/${project.slug}`}
              aria-label={`View the ${project.title} case study`}
            >
              <span className="project-browser">
                <span className="project-browser-bar">
                  <span className="project-browser-dots" aria-hidden="true">
                    <i />
                    <i />
                    <i />
                  </span>
                  <span>{project.domain}</span>
                  <span aria-hidden="true">↗</span>
                </span>
                <span className="project-browser-image">
                  <Image
                    src={project.image}
                    alt={project.imageAlt}
                    fill
                    unoptimized
                    sizes="(max-width: 1023px) 92vw, 56vw"
                    className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.018]"
                  />
                </span>
              </span>
            </Link>
          </article>
        ))}
      </section>

      <section className="sunset-band bg-[var(--sunset-deep)] px-5 py-20 md:px-8 md:py-28">
        <Reveal className="mx-auto grid max-w-[1500px] gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <h2 className="portfolio-cta-title section-title max-w-5xl">
            Your project could be
            <span className="italic"> next.</span>
          </h2>
          <ArrowLink href="/contact">Tell me about it</ArrowLink>
        </Reveal>
      </section>
    </main>
  );
}
