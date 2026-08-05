import Image from "next/image";
import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/reveal";
import { site } from "@/data/site";
import { createPageMetadata } from "@/lib/seo";

const description =
  "Contact Carter Steinhoff about website design, Next.js or WordPress development, custom CMS work, AI automation, and cloud delivery.";

export const metadata = createPageMetadata({
  title: "Contact",
  description,
  path: "/contact",
  image: {
    url: "/images/phoenix-night.webp",
    width: 1672,
    height: 941,
    alt: "Phoenix city lights beyond the Sonoran Desert at night",
  },
});

export default function ContactPage() {
  return (
    <main className="contact-sunset min-h-screen bg-[var(--sunset-deep)] text-[var(--sand)]">
      <section className="contact-hero page-hero">
        <Image
          src="/images/phoenix-night.webp"
          alt=""
          fill
          preload
          unoptimized
          sizes="100vw"
          className="contact-hero-media object-cover"
        />
        <span className="contact-hero-scrim" aria-hidden="true" />
        <div className="contact-hero-inner page-hero-inner">
          <p className="page-kicker">Contact · Start anywhere</p>
          <div className="contact-hero-stage">
            <div className="contact-hero-copy">
              <h1 className="contact-hero-title page-title max-w-4xl">
                Let’s make something
                <span className="italic text-[var(--accent)]"> good.</span>
              </h1>
              <div className="contact-hero-intro mt-8 border-t border-white/20 pt-6">
                <p className="section-lead">
                  Tell me what you’re thinking—even if it is still rough. I’ll read it, ask the
                  useful questions, and reply directly.
                </p>
                <a
                  className="contact-email-link mt-5 inline-flex min-h-11 items-center text-sm font-semibold text-[var(--accent)] underline decoration-white/20 underline-offset-8 hover:decoration-[var(--accent)]"
                  href={`mailto:${site.email}`}
                >
                  {site.email}
                </a>
              </div>
            </div>
            <aside className="contact-signal" aria-label="Working details">
              <span className="contact-signal-line" aria-hidden="true">
                <i />
              </span>
              <p className="contact-signal-title">From first thought to production.</p>
              <dl className="contact-signal-details">
                <div>
                  <dt>Range</dt>
                  <dd>Interface → infrastructure</dd>
                </div>
                <div>
                  <dt>Based</dt>
                  <dd>Phoenix · MST</dd>
                </div>
                <div>
                  <dt>Reply</dt>
                  <dd>Direct from Carter</dd>
                </div>
              </dl>
            </aside>
          </div>
        </div>
      </section>

      <section className="contact-form-section border-t border-white/15 bg-[var(--ink)] px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto grid max-w-[1500px] gap-14 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
          <Reveal className="contact-form-intro">
            <p className="section-label">Project brief</p>
            <h2 className="contact-form-title section-title mt-8">Tell me what you’re making.</h2>
            <p className="section-lead mt-7 max-w-md">
              Name the kind of project and add the context you already have. Submitting opens a
              draft in your email app.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
