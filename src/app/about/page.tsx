import type { Metadata } from "next";
import Image from "next/image";
import { ArrowLink } from "@/components/arrow-link";
import { Reveal } from "@/components/reveal";
import { site } from "@/data/site";

const description =
  "Meet Carter Steinhoff, a Phoenix-based designer and developer focused on thoughtful digital work.";

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
        url: "/images/carter-phoenix-portrait.webp",
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
    images: ["/images/carter-phoenix-portrait.webp"],
  },
};

export default function AboutPage() {
  return (
    <main className="bg-[var(--dusk)] text-[var(--sand)]">
      <section className="px-5 pb-20 pt-36 md:px-8 md:pb-28 md:pt-44">
        <div className="mx-auto max-w-[1500px]">
          <p className="page-kicker">About · Phoenix, Arizona</p>
          <h1 className="page-title mt-8 max-w-[1300px]">
            Built in the desert.
            <br />
            <span className="italic text-[var(--accent)]">Curious everywhere.</span>
          </h1>
        </div>
      </section>

      <section className="relative min-h-[70svh] overflow-hidden md:min-h-[88svh]">
        <Image
          src="/images/phoenix-night.webp"
          alt="Phoenix city lights and the Sonoran Desert at night"
          fill
          preload
          unoptimized
          sizes="100vw"
          className="about-city-image object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/5" />
        <p className="absolute bottom-6 left-5 z-10 max-w-xs text-xs leading-5 text-white/75 md:bottom-8 md:left-8">
          Phoenix after dark—hard edges, warm light, and a lot of room to think.
        </p>
      </section>

      <section className="px-5 py-24 md:px-8 md:py-36">
        <div className="mx-auto grid max-w-[1500px] gap-14 md:grid-cols-[0.8fr_1.2fr] md:gap-24">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden bg-white/5">
              <Image
                src="/images/carter-phoenix-portrait.webp"
                alt="Carter Steinhoff in Phoenix at blue hour"
                fill
                unoptimized
                sizes="(max-width: 768px) 100vw, 42vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={120} className="md:pt-20">
            <p className="section-label">A little context</p>
            <h2 className="mt-8 max-w-3xl font-[family-name:var(--font-display)] text-[clamp(3rem,6vw,6.4rem)] leading-[0.9] tracking-[-0.04em]">
              I’m Carter—a designer and developer who likes making complicated things feel
              <span className="italic text-[var(--accent)]"> inevitable.</span>
            </h2>
            <div className="mt-10 grid gap-6 text-base leading-7 text-stone-400 md:grid-cols-2 md:text-lg md:leading-8">
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
            </div>
          </Reveal>
        </div>
      </section>

      <section className="sunset-surface border-y border-white/10 px-5 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-[1500px]">
          <Reveal>
            <p className="section-label">What guides the work</p>
            <div className="mt-12 grid border-t border-white/15 md:grid-cols-3">
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
                  className="border-b border-white/15 py-8 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0"
                >
                  <span className="text-[0.65rem] tracking-[0.16em] text-[var(--accent)]">
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

      <section className="px-5 py-24 md:px-8 md:py-36">
        <Reveal className="mx-auto flex max-w-[1500px] flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <h2 className="max-w-4xl font-[family-name:var(--font-display)] text-[clamp(3.8rem,8vw,8rem)] leading-[0.86] tracking-[-0.045em]">
            Good work starts with a good
            <span className="italic text-[var(--accent)]"> conversation.</span>
          </h2>
          <ArrowLink href="/contact">Say hello</ArrowLink>
        </Reveal>
      </section>
    </main>
  );
}
