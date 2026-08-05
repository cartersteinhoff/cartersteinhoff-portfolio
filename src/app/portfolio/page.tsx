import type { Metadata } from "next";
import Image from "next/image";
import { ArrowLink } from "@/components/arrow-link";
import { Reveal } from "@/components/reveal";
import { focusAreas, site } from "@/data/site";

const description =
  "Selected directions and forthcoming case studies from designer and developer Carter Steinhoff.";

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
        url: "/images/studio-hero.webp",
        width: 1672,
        height: 941,
        alt: "Carter Steinhoff working from his Phoenix studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Portfolio — ${site.name}`,
    description,
    images: ["/images/studio-hero.webp"],
  },
};

export default function PortfolioPage() {
  return (
    <main className="bg-[var(--dusk)] text-[var(--sand)]">
      <section className="px-5 pb-20 pt-36 md:px-8 md:pb-28 md:pt-44">
        <div className="mx-auto max-w-[1500px]">
          <div className="grid gap-8 md:grid-cols-[0.6fr_1.4fr]">
            <p className="page-kicker">Portfolio · Selected directions</p>
            <div>
              <h1 className="page-title">Work with a reason to exist.</h1>
              <p className="mt-10 max-w-xl text-base leading-7 text-stone-400 md:ml-auto md:text-lg md:leading-8">
                The first case studies are being edited now. Until then, here are the spaces where I
                do my best work—and the standard each project has to meet.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/15">
        {focusAreas.map((area) => (
          <article key={area.number} className="portfolio-entry">
            <div className="portfolio-entry-copy">
              <div className="flex items-center justify-between gap-4">
                <span className="text-[0.65rem] font-semibold tracking-[0.16em] text-stone-500">
                  {area.number}
                </span>
                <span className="text-[0.62rem] tracking-[0.16em] text-[var(--accent)] uppercase">
                  Case study in edit
                </span>
              </div>
              <div>
                <h2 className="font-[family-name:var(--font-display)] text-[clamp(3.2rem,7vw,7.4rem)] leading-[0.86] tracking-[-0.045em]">
                  {area.title}
                </h2>
                <p className="mt-5 max-w-lg text-base leading-7 text-stone-400">
                  {area.description}
                </p>
              </div>
              <ul className="flex flex-wrap gap-x-5 gap-y-2 text-[0.62rem] font-semibold tracking-[0.14em] text-stone-500 uppercase">
                {area.services.map((service) => (
                  <li key={service}>{service}</li>
                ))}
              </ul>
            </div>
            <div className="portfolio-entry-media group">
              <Image
                src={area.image}
                alt={area.imageAlt}
                fill
                unoptimized
                sizes="(max-width: 768px) 100vw, 58vw"
                className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.035]"
              />
              <div className="absolute inset-0 bg-black/10 transition-colors duration-500 group-hover:bg-transparent" />
            </div>
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
