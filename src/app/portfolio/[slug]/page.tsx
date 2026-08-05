import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/reveal";
import { portfolioProjects, site } from "@/data/site";

type CaseStudyPageProps = {
  params: Promise<{ slug: string }>;
};

function getProject(slug: string) {
  return portfolioProjects.find((project) => project.slug === slug);
}

export function generateStaticParams() {
  return portfolioProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  const title = `${project.title} case study`;
  const description = `${project.caseStudy.overview} Explore Carter Steinhoff's role, approach, and selected screens.`;
  const url = `/portfolio/${project.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} — ${site.name}`,
      description,
      type: "article",
      url,
      images: [
        {
          url: project.image,
          width: 1440,
          height: 1000,
          alt: project.imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} — ${site.name}`,
      description,
      images: [{ url: project.image, alt: project.imageAlt }],
    },
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  const projectIndex = portfolioProjects.findIndex((item) => item.slug === project.slug);
  const nextProject = portfolioProjects[(projectIndex + 1) % portfolioProjects.length];

  return (
    <main className="case-study bg-[var(--dusk)] text-[var(--sand)]" data-project={project.slug}>
      <section className="case-hero px-5 pb-16 pt-32 md:px-8 md:pb-24 md:pt-40">
        <div className="mx-auto max-w-[1500px]">
          <Link className="case-back-link" href="/portfolio">
            <span aria-hidden="true">←</span> All selected work
          </Link>

          <div className="case-hero-heading">
            <p className="page-kicker">Case study · {project.number}</p>
            <div>
              <h1 className="case-title">{project.title}</h1>
              <p className="case-summary">{project.summary}</p>
            </div>
          </div>

          <dl className="case-facts">
            <div>
              <dt>Role</dt>
              <dd>{project.caseStudy.role}</dd>
            </div>
            <div>
              <dt>System</dt>
              <dd>{project.caseStudy.system}</dd>
            </div>
            <div>
              <dt>Status</dt>
              <dd>Live and in production</dd>
            </div>
            <div>
              <dt>Website</dt>
              <dd>
                <a href={project.url} target="_blank" rel="noreferrer">
                  {project.domain} ↗<span className="sr-only"> (opens in a new tab)</span>
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="case-featured-media px-5 py-10 md:px-8 md:py-16">
        <Reveal className="mx-auto max-w-[1500px]">
          <div className="case-browser">
            <div className="project-browser-bar">
              <span className="project-browser-dots" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              <span>{project.domain}</span>
              <span aria-hidden="true">01</span>
            </div>
            <div className="case-browser-image">
              <Image
                src={project.image}
                alt={project.imageAlt}
                fill
                preload
                unoptimized
                sizes="(max-width: 768px) 94vw, 92vw"
                className="object-cover"
              />
            </div>
          </div>
        </Reveal>
      </section>

      <section className="case-overview-section px-5 py-24 md:px-8 md:py-36">
        <div className="mx-auto max-w-[1500px]">
          <Reveal className="case-overview-heading">
            <p className="section-label">The work</p>
            <h2>{project.caseStudy.headline}</h2>
          </Reveal>

          <div className="case-overview-grid">
            <Reveal className="case-narrative">
              <p>{project.caseStudy.overview}</p>
              <p>{project.caseStudy.detail}</p>
            </Reveal>

            <Reveal className="case-contributions">
              <p className="case-list-label">Selected contributions</p>
              <ol>
                {project.caseStudy.contributions.map((contribution, index) => (
                  <li key={contribution}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <strong>{contribution}</strong>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="case-gallery-section px-5 py-24 md:px-8 md:py-36">
        <div className="mx-auto max-w-[1500px]">
          <Reveal className="case-gallery-heading">
            <p className="section-label">Important screens</p>
            <h2>A platform is more than its homepage.</h2>
            <p>
              Real screens from the live product show how the visual system carries into the parts
              people actually use.
            </p>
          </Reveal>

          <div className="case-gallery">
            {project.caseStudy.screens.slice(1).map((screen, index) => (
              <Reveal
                className={`case-screen ${index === 0 ? "case-screen-wide" : ""}`}
                delay={index * 80}
                key={screen.image}
              >
                <figure>
                  <div className="case-screen-browser">
                    <div className="project-browser-bar">
                      <span className="project-browser-dots" aria-hidden="true">
                        <i />
                        <i />
                        <i />
                      </span>
                      <span>{screen.title}</span>
                      <span aria-hidden="true">{String(index + 2).padStart(2, "0")}</span>
                    </div>
                    <Image
                      src={screen.image}
                      alt={screen.alt}
                      width={1440}
                      height={1000}
                      unoptimized
                      sizes={
                        index === 0
                          ? "(max-width: 768px) 94vw, 92vw"
                          : "(max-width: 768px) 94vw, 46vw"
                      }
                      className="h-auto w-full"
                    />
                  </div>
                  <figcaption>
                    <span>{screen.title}</span>
                    <p>{screen.caption}</p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="case-next-section px-5 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-[1500px]">
          <p className="section-label">Next case study</p>
          <Link className="case-next-link group" href={`/portfolio/${nextProject.slug}`}>
            <span>{nextProject.title}</span>
            <span className="case-next-arrow" aria-hidden="true">
              ↗
            </span>
          </Link>
        </div>
      </section>
    </main>
  );
}
