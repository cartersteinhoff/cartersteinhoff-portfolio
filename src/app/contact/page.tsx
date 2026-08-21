import Image from "next/image";
import { ContactForm } from "@/components/contact-form";
import { site } from "@/data/site";
import { createPageMetadata } from "@/lib/seo";

const description =
  "Contact Carter Steinhoff about website design, Next.js or WordPress development, custom CMS work, AI automation, and cloud delivery.";

export const metadata = createPageMetadata({
  title: "Contact",
  description,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <main className="contact-sunset min-h-screen bg-[var(--sunset-deep)] text-[var(--sand)]">
      <section className="contact-page-shell">
        <div className="contact-page-art" aria-hidden="true">
          <Image
            src="/images/phoenix-night.webp"
            alt=""
            fill
            preload
            sizes="100vw"
            className="contact-page-media object-cover"
          />
          <span className="contact-page-scrim" />
        </div>
        <div className="contact-page-inner">
          <header className="contact-page-copy">
            <p className="page-kicker">Contact · Start anywhere</p>
            <div>
              <h1 className="contact-page-title page-title">
                Bring me the
                <span className="italic text-[var(--accent)]"> hard part.</span>
              </h1>
              <p className="contact-page-intro">
                Tell me what you’re thinking—even if it is still rough. I’ll ask the useful
                questions and reply directly.
              </p>
            </div>
          </header>

          <div className="contact-page-form">
            <div className="contact-form-heading">
              <p className="section-label">Project brief</p>
              <h2>Tell me what you’re making.</h2>
            </div>
            <ContactForm />
          </div>

          <aside className="contact-page-details" aria-label="Direct contact details">
            <a className="contact-email-link" href={`mailto:${site.email}`}>
              {site.email}
            </a>
            <span>Phoenix · MST</span>
            <nav aria-label="Professional profiles">
              <a href={site.linkedinUrl} target="_blank" rel="noreferrer">
                LinkedIn<span className="sr-only"> (opens in a new tab)</span>
              </a>
              <a href={site.upworkUrl} target="_blank" rel="noreferrer">
                Upwork<span className="sr-only"> (opens in a new tab)</span>
              </a>
            </nav>
          </aside>
        </div>
      </section>
    </main>
  );
}
