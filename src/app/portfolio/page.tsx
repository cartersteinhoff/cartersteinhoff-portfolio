import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLink } from "@/components/arrow-link";
import { Reveal } from "@/components/reveal";
import { portfolioProjects, site } from "@/data/site";

const description =
  "Selected WordPress and Next.js projects designed and developed by Carter Steinhoff.";

export const metadata: Metadata = {
  title: "Portfolio",
  description,
  alternates: {
    canonical: "/portfolio",
  },
  openGraph: {
    title: `Portfolio — ${site.name}`,
    description,
    type: "website",
    url: "/portfolio",
    images: [
      {
        url: "/images/retailboss-project.webp",
        width: 1440,
        height: 1000,
        alt: "RetailBoss homepage designed and developed by Carter Steinhoff",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Portfolio — ${site.name}`,
    description,
    images: [
      {
        url: "/images/retailboss-project.webp",
        alt: "RetailBoss homepage designed and developed by Carter Steinhoff",
      },
    ],
  },
};

export default function PortfolioPage() {
  return (
    <main className="bg-[var(--dusk)] text-[var(--sand)]">
      <section className="px-5 pb-20 pt-36 md:px-8 md:pb-28 md:pt-44">
        <div className="mx-auto max-w-[1500px]">
          <div className="grid gap-8 md:grid-cols-[0.6fr_1.4fr]">
            <p className="page-kicker">Portfolio · Selected work</p>
            <div>
              <h1 className="page-title">Work with a reason to exist.</h1>
              <p className="mt-10 max-w-xl text-base leading-7 text-stone-400 md:ml-auto md:text-lg md:leading-8">
                Three live platforms shaped from design through development: a custom WordPress
                publishing system and two focused Next.js products.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/15">
        {portfolioProjects.map((project) => (
          <article key={project.slug} className="portfolio-entry" data-project={project.slug}>
            <div className="portfolio-entry-copy">
              <div className="flex items-center justify-between gap-4">
                <span className="text-[0.65rem] font-semibold tracking-[0.16em] text-stone-500">
                  {project.number}
                </span>
                <span className="text-[0.62rem] tracking-[0.16em] text-[var(--accent)] uppercase">
                  Live · {project.platform}
                </span>
              </div>
              <div>
                <h2 className="font-[family-name:var(--font-display)] text-[clamp(3.2rem,7vw,7.4rem)] leading-[0.86] tracking-[-0.045em]">
                  {project.title}
                </h2>
                <p className="mt-6 max-w-xl font-[family-name:var(--font-display)] text-3xl leading-tight tracking-[-0.025em] text-[var(--accent)] italic">
                  {project.summary}
                </p>
                <p className="mt-5 max-w-lg text-base leading-7 text-stone-400">
                  {project.description}
                </p>
              </div>
              <div className="flex flex-col gap-8">
                <ul className="flex flex-wrap gap-x-5 gap-y-2 text-[0.62rem] font-semibold tracking-[0.14em] text-stone-500 uppercase">
                  {project.services.map((service) => (
                    <li key={service}>{service}</li>
                  ))}
                </ul>
                <div className="flex flex-wrap items-center gap-x-8 gap-y-5">
                  <ArrowLink href={`/portfolio/${project.slug}`}>View case study</ArrowLink>
                  <a
                    className="text-[0.65rem] font-semibold tracking-[0.14em] text-stone-500 uppercase transition-colors hover:text-[var(--accent)]"
                    href={project.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Live site ↗<span className="sr-only"> (opens in a new tab)</span>
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
                    sizes="(max-width: 768px) 92vw, 56vw"
                    className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.018]"
                  />
                </span>
              </span>
            </Link>
          </article>
        ))}
      </section>

      <section className="sunset-band bg-[var(--sunset-deep)] px-5 py-24 md:px-8 md:py-36">
        <Reveal className="mx-auto grid max-w-[1500px] gap-10 md:grid-cols-[1fr_auto] md:items-end">
          <h2 className="max-w-5xl font-[family-name:var(--font-display)] text-[clamp(4rem,9vw,9rem)] leading-[0.83] tracking-[-0.05em]">
            Your project could be
            <span className="italic"> next.</span>
          </h2>
          <ArrowLink href="/contact">Tell me about it</ArrowLink>
        </Reveal>
      </section>
    </main>
  );
}
