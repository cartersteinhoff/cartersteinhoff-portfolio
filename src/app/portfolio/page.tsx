import Image from "next/image";
import Link from "next/link";
import { ArrowLink } from "@/components/arrow-link";
import { Reveal } from "@/components/reveal";
import { portfolioProjects, site } from "@/data/site";
import { createPageMetadata } from "@/lib/seo";

const description =
  "Explore digital products Carter Steinhoff designed and built end to end across WordPress, Next.js, custom CMS, backend systems, and cloud architecture.";

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
  const featuredProject = portfolioProjects[0];
  const secondaryProjects = portfolioProjects.slice(1);

  return (
    <main className="portfolio-index bg-[var(--dusk)] text-[var(--sand)]">
      <section className="portfolio-intro page-hero" aria-labelledby="portfolio-title">
        <div className="portfolio-intro-inner page-hero-inner">
          <p className="portfolio-intro-kicker page-kicker">Portfolio · Selected work</p>
          <div className="portfolio-intro-grid">
            <div className="portfolio-intro-copy">
              <h1 id="portfolio-title" className="portfolio-intro-title page-title">
                Selected products, built end to end.
              </h1>
              <p className="portfolio-intro-lead section-lead">
                I turn product ideas into complete working systems—from interface and CMS to
                backend, automation, and cloud infrastructure.
              </p>
              <ArrowLink href="#selected-work">Explore the work</ArrowLink>
            </div>

            <div className="portfolio-intro-proof">
              <p className="portfolio-intro-proof-label">Across the work</p>
              <ul className="portfolio-intro-proof-list">
                <li>Product design</li>
                <li>Full-stack development</li>
                <li>Custom CMS systems</li>
                <li>AI automation</li>
                <li>Cloud architecture</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section
        id="selected-work"
        className="portfolio-featured-section"
        aria-labelledby="featured-project-title"
      >
        <div className="portfolio-featured-shell">
          <article className="portfolio-featured" data-project={featuredProject.slug}>
            <header className="portfolio-featured-header">
              <div className="portfolio-featured-labels">
                <span>{featuredProject.number} · Featured project</span>
                <span>
                  {featuredProject.status} · {featuredProject.platform}
                </span>
              </div>
              <h2 id="featured-project-title" className="portfolio-featured-title">
                {featuredProject.title}
              </h2>
              <p className="portfolio-featured-summary">{featuredProject.summary}</p>
            </header>

            <Link
              className="portfolio-featured-media group"
              href={`/portfolio/${featuredProject.slug}`}
              aria-label={`View the ${featuredProject.title} case study`}
            >
              <span className="project-browser">
                <span className="project-browser-bar">
                  <span className="project-browser-dots" aria-hidden="true">
                    <i />
                    <i />
                    <i />
                  </span>
                  <span>{featuredProject.domain}</span>
                  <span aria-hidden="true">↗</span>
                </span>
                <span className="project-browser-image">
                  <Image
                    src={featuredProject.image}
                    alt={featuredProject.imageAlt}
                    fill
                    preload
                    unoptimized
                    sizes="(max-width: 767px) 100vw, (max-width: 1279px) 92vw, 82vw"
                    className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.018]"
                  />
                </span>
              </span>
            </Link>

            <div className="portfolio-featured-content">
              <p className="portfolio-featured-description">{featuredProject.description}</p>
              <div className="portfolio-featured-details">
                <ul className="portfolio-featured-services" aria-label="Services provided">
                  {featuredProject.services.map((service) => (
                    <li key={service}>{service}</li>
                  ))}
                </ul>
                <div className="portfolio-project-links">
                  <ArrowLink href={`/portfolio/${featuredProject.slug}`}>View case study</ArrowLink>
                  <a
                    className="portfolio-live-link"
                    href={featuredProject.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Live site ↗<span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="portfolio-secondary" aria-labelledby="more-work-title">
        <div className="portfolio-secondary-inner">
          <Reveal className="portfolio-secondary-header">
            <p className="portfolio-secondary-kicker page-kicker">More selected work</p>
            <h2 id="more-work-title" className="portfolio-secondary-title">
              Different products. The same end-to-end ownership.
            </h2>
          </Reveal>

          <Reveal className="portfolio-secondary-grid">
            {secondaryProjects.map((project) => (
              <article
                key={project.slug}
                className="portfolio-secondary-item"
                data-project={project.slug}
                aria-labelledby={`project-${project.slug}`}
              >
                <Link
                  className="portfolio-secondary-media group"
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
                        sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.018]"
                      />
                    </span>
                  </span>
                </Link>

                <div className="portfolio-secondary-content">
                  <div className="portfolio-secondary-meta">
                    <span>{project.number}</span>
                    <span>
                      {project.status} · {project.platform}
                    </span>
                  </div>
                  <h3 id={`project-${project.slug}`} className="portfolio-secondary-item-title">
                    <Link href={`/portfolio/${project.slug}`}>{project.title}</Link>
                  </h3>
                  <p className="portfolio-secondary-summary">{project.summary}</p>
                  <ul className="portfolio-secondary-services" aria-label="Services provided">
                    {project.services.map((service) => (
                      <li key={service}>{service}</li>
                    ))}
                  </ul>
                  <div className="portfolio-project-links">
                    <ArrowLink href={`/portfolio/${project.slug}`}>View case study</ArrowLink>
                    <a
                      className="portfolio-live-link"
                      href={project.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {project.status === "Live" ? "Live site" : "View microsite"} ↗
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="portfolio-final-cta sunset-band bg-[var(--sunset-deep)]">
        <Reveal className="portfolio-final-cta-inner">
          <div className="portfolio-final-cta-copy">
            <p className="page-kicker">Have a product in mind?</p>
            <h2 className="portfolio-cta-title section-title">
              Let’s build the
              <span className="italic"> next one.</span>
            </h2>
          </div>
          <div className="portfolio-final-cta-actions">
            <ArrowLink href="/contact">Tell me about it</ArrowLink>
            <nav className="portfolio-profile-links" aria-label="Professional profiles">
              <a className="profile-link" href={site.linkedinUrl} target="_blank" rel="noreferrer">
                <span>LinkedIn</span>
                <span aria-hidden="true">↗</span>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
              <a className="profile-link" href={site.upworkUrl} target="_blank" rel="noreferrer">
                <span>Hire through Upwork</span>
                <span aria-hidden="true">↗</span>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </nav>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
