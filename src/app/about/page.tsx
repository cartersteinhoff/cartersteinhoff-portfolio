import type { Metadata } from "next";
import Image from "next/image";
import { ArrowLink } from "@/components/arrow-link";
import { Reveal } from "@/components/reveal";
import { site } from "@/data/site";

const description =
  "Meet Carter Steinhoff, a Phoenix-based designer, developer, and former Nucamp instructor.";

export const metadata: Metadata = {
  title: "About",
  description,
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: `About — ${site.name}`,
    description,
    type: "website",
    url: "/about",
    images: [
      {
        url: "/images/carter-phoenix-portrait-v2.webp",
        width: 1024,
        height: 1536,
        alt: "Carter Steinhoff in Phoenix at blue hour",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `About — ${site.name}`,
    description,
    images: ["/images/carter-phoenix-portrait-v2.webp"],
  },
};

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

      <section className="about-context px-5 pb-20 pt-14 md:px-8 md:pb-28 md:pt-20">
        <div className="mx-auto grid max-w-[1500px] gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden bg-white/5">
              <Image
                src="/images/carter-phoenix-portrait-v2.webp"
                alt="Carter Steinhoff in Phoenix at blue hour"
                fill
                unoptimized
                sizes="(max-width: 1023px) 100vw, 42vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={120} className="about-context-copy lg:pt-12">
            <p className="section-label">A little context</p>
            <h2 className="about-context-title section-title mt-8 max-w-3xl">
              I’m Carter—a designer and developer who likes making complicated things feel
              <span className="italic text-[var(--accent)]"> inevitable.</span>
            </h2>
            <div className="about-context-body mt-10 grid gap-6 text-base leading-7 text-stone-400 md:text-lg md:leading-8 lg:grid-cols-2">
              <p>
                My work sits where product thinking, visual direction, and frontend craft meet. I
                care about the idea, the system behind it, and the last five percent people can feel
                even when they cannot name it.
              </p>
              <p>
                Phoenix keeps the work grounded: direct, bright, a little unexpected. When I’m not
                at the desk, I’m usually noticing how a place, sign, tool, or story could be made
                clearer.
              </p>
              <p className="border-t border-white/15 pt-6 lg:col-span-2">
                I also served as a web development instructor at Nucamp, helping new developers turn
                technical concepts into practical skills and working software.
              </p>
            </div>
            <a className="profile-link mt-9" href={site.upworkUrl} target="_blank" rel="noreferrer">
              <span>View my Upwork profile</span>
              <span aria-hidden="true">↗</span>
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </Reveal>
        </div>
      </section>

      <section className="sunset-surface border-y border-white/10 px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-[1500px]">
          <Reveal>
            <p className="section-label">What guides the work</p>
            <div className="about-principles mt-12 grid border-t border-white/15 lg:grid-cols-3">
              {[
                [
                  "01",
                  "Clarity before decoration",
                  "The main idea should survive every design decision.",
                ],
                ["02", "Character without noise", "Distinct does not have to mean complicated."],
                [
                  "03",
                  "Care all the way through",
                  "A strong concept deserves an equally strong build.",
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

      <section className="px-5 py-20 md:px-8 md:py-28">
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
