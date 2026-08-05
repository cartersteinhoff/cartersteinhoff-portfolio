import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/reveal";
import { site } from "@/data/site";

const description = "Start a project or conversation with Carter Steinhoff in Phoenix, Arizona.";

export const metadata: Metadata = {
  title: "Contact",
  description,
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: `Contact — ${site.name}`,
    description,
    type: "website",
    url: "/contact",
    images: [
      {
        url: "/images/phoenix-night.webp",
        width: 1672,
        height: 941,
        alt: "Phoenix city lights beyond the Sonoran Desert at night",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Contact — ${site.name}`,
    description,
    images: ["/images/phoenix-night.webp"],
  },
};

export default function ContactPage() {
  return (
    <main className="contact-sunset min-h-screen bg-[var(--sunset-deep)] text-[var(--sand)]">
      <section className="px-5 pb-24 pt-36 md:px-8 md:pb-36 md:pt-44">
        <div className="mx-auto max-w-[1500px]">
          <div className="grid gap-16 md:grid-cols-[0.9fr_1.1fr] md:gap-24">
            <Reveal>
              <p className="page-kicker">Contact · Start anywhere</p>
              <h1 className="mt-8 max-w-3xl font-[family-name:var(--font-display)] text-[clamp(4.2rem,9vw,9.6rem)] leading-[0.8] tracking-[-0.055em]">
                Let’s make something
                <span className="italic text-[var(--accent)]"> good.</span>
              </h1>
              <div className="mt-12 border-t border-white/15 pt-6 md:mt-20">
                <p className="max-w-md text-base leading-7 text-stone-400">
                  Tell me what you’re thinking—even if it is still rough. I’ll read it, ask the
                  useful questions, and reply directly.
                </p>
                <a
                  className="mt-7 inline-block text-sm font-semibold text-[var(--accent)] underline decoration-white/20 underline-offset-8 hover:decoration-[var(--accent)]"
                  href={`mailto:${site.email}`}
                >
                  {site.email}
                </a>
              </div>
            </Reveal>
            <Reveal delay={120} className="md:pt-12">
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}
