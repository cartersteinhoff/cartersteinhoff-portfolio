import { homeContent } from "@/data/home";
import { services } from "@/data/services";
import { getSiteUrl, portfolioProjects, site } from "@/data/site";
import { markdownPathForCanonical } from "@/lib/content-negotiation";

export type AgentDocument = {
  readonly body: string;
  readonly status: 200 | 404;
};

export const publicPagePaths = [
  "/",
  "/portfolio",
  "/services",
  "/about",
  "/contact",
  "/privacy",
  "/terms",
  ...portfolioProjects.map((project) => `/portfolio/${project.slug}`),
] as const;

function absolute(pathname: string) {
  return new URL(pathname, `${getSiteUrl()}/`).toString();
}

function markdownLink(label: string, pathname: string) {
  return `[${label}](${absolute(pathname)})`;
}

function routeLink(label: string, pathname: string) {
  return markdownLink(label, markdownPathForCanonical(pathname));
}

function lines(parts: readonly string[]) {
  return `${parts.join("\n\n").trim()}\n`;
}

function homeMarkdown() {
  return lines([
    `# ${site.name} — Product Design, Full-Stack Development, AI & Cloud`,
    `> ${site.description}`,
    homeContent.heroSummary,
    ...homeContent.overviewParagraphs,
    "## Best-fit work",
    ...site.serviceTypes.map((service) => `- ${service}`),
    "## Find the right detail",
    [
      `- ${routeLink("Portfolio and case studies", "/portfolio")}: Shipped products, responsibilities, constraints, decisions, technology, status, and live or archival destinations.`,
      `- ${routeLink("Services", "/services")}: Standalone product, development, CMS, SEO, automation, and cloud offerings.`,
      `- ${routeLink("About Carter", "/about")}: Professional background from mainframe engineering through independent product work and teaching.`,
      `- ${routeLink("Contact", "/contact")}: Direct project inquiry details; contact only when a user explicitly asks to begin a conversation.`,
    ].join("\n"),
  ]);
}

function portfolioMarkdown() {
  const projects = portfolioProjects.map((project) =>
    [
      `## ${project.number} — ${project.title}`,
      project.caseStudy.headline,
      project.description,
      `- Role: ${project.caseStudy.role}`,
      `- Platform: ${project.platform}`,
      `- Status: ${project.statusDetail}`,
      `- ${routeLink("Read the case study", `/portfolio/${project.slug}`)}`,
      `- [${project.externalLabel}](${project.url})`,
    ].join("\n"),
  );

  return lines([
    `# Selected Work — ${site.name}`,
    "> Digital products designed and built across interfaces, publishing systems, backend services, and cloud infrastructure.",
    `This index contains ${portfolioProjects.length} case studies. Each one identifies Carter's role, the production or archival status, the system behind the interface, and the reasoning that can be verified from the work.`,
    ...projects,
    `## Next step\n\n- ${routeLink("Match a project to a service", "/services")}\n- ${routeLink("Discuss a project", "/contact")}`,
  ]);
}

function projectMarkdown(slug: string) {
  const project = portfolioProjects.find((candidate) => candidate.slug === slug);
  if (!project) return null;

  const story = project.caseStudy.story
    .map((chapter) => `### ${chapter.label}: ${chapter.title}\n\n${chapter.body}`)
    .join("\n\n");
  const decisions =
    "decisions" in project.caseStudy
      ? [
          "## Decisions",
          project.caseStudy.decisions
            .map((decision) => `### ${decision.title}\n\n${decision.body}`)
            .join("\n\n"),
        ]
      : [];
  const architecture =
    "architecture" in project.caseStudy
      ? [
          "## Architecture",
          project.caseStudy.architecture.headline,
          project.caseStudy.architecture.summary,
          project.caseStudy.architecture.items
            .map((item) => `- **${item.label}:** ${item.value}`)
            .join("\n"),
        ]
      : [];

  return lines([
    `# ${project.title} Case Study — ${site.name}`,
    `> ${project.seoDescription}`,
    `- Carter's role: ${project.caseStudy.role}`,
    `- System: ${project.caseStudy.system}`,
    `- Status: ${project.statusDetail}`,
    `- [${project.externalLabel}](${project.url})`,
    "## Overview",
    project.caseStudy.headline,
    project.caseStudy.overview,
    project.caseStudy.detail,
    "## Project story",
    story,
    ...decisions,
    ...architecture,
    "## Technology and delivery",
    project.caseStudy.technologyStack.headline,
    project.caseStudy.technologyStack.summary,
    project.caseStudy.technologyStack.groups
      .map(
        (group) =>
          `### ${group.label}\n\n${group.technologies
            .map((technology) => `- **${technology.id}:** ${technology.role}`)
            .join("\n")}`,
      )
      .join("\n\n"),
    "## What Carter owned",
    project.caseStudy.contributions.map((item) => `- ${item}`).join("\n"),
    "## Selected screens",
    project.caseStudy.screens
      .map(
        (screen) =>
          `- **${screen.title}:** ${screen.caption} [Image](${absolute(screen.image)}) — ${screen.alt}`,
      )
      .join("\n"),
    "## Current status",
    project.caseStudy.statusCopy,
    `- ${routeLink("Back to all case studies", "/portfolio")}`,
    `- ${routeLink("Discuss a similar project", "/contact")}`,
  ]);
}

function servicesMarkdown() {
  const catalog = services.map((service) =>
    [
      `## ${service.number} — ${service.title}`,
      service.summary,
      service.includes.map((item) => `- ${item}`).join("\n"),
    ].join("\n\n"),
  );

  return lines([
    `# Services — ${site.name}`,
    "> Product and website design, full-stack development, custom CMS and WordPress work, technical SEO, AI automation, and cloud architecture from strategy through production.",
    "Every service can stand on its own. Combine services only when the project scope genuinely requires a connected product, platform, or delivery system.",
    ...catalog,
    "## Evidence and contact",
    `- ${routeLink("Review the portfolio", "/portfolio")}\n- [View the verified Upwork profile](${site.upworkUrl})\n- ${routeLink("Start a project conversation", "/contact")}`,
  ]);
}

function aboutMarkdown() {
  return lines([
    `# About ${site.name}`,
    "> From COBOL on an American Express mainframe to an independent product design and full-stack development practice in Phoenix.",
    "Carter's path spans systems that cannot go down, production WordPress publishing, modern JavaScript applications, agency delivery, independent consulting, and technical teaching. The range matters because product, content, application, and infrastructure decisions affect one another.",
    "## American Express · 2015",
    "Carter began by writing COBOL for high-volume transaction programs after dedicated mainframe training. The work established a lasting habit: read unfamiliar systems carefully, change them conservatively, and respect the blast radius of a mistake.",
    "## Passport Health · 2016–2017",
    "Front-end development and WordPress work introduced page templates used across a large clinic network, alongside content modeling, search optimization, analytics, and the practical limits of a production CMS.",
    "## Starting over · 2017–2019",
    "After a layoff, Carter returned to a web development classroom to build the modern JavaScript foundation beneath the CMS experience, then worked at a digital marketing agency where scope, budgets, and deadlines tested those decisions.",
    "## Independent work · 2019–present",
    "Freelancing through Upwork grew into an independent practice centered on direct communication, honest scoping, and ownership of the finished outcome. Carter later co-owned a life-sciences web studio and now takes on product and platform work independently.",
    "## Teaching · 2020–present",
    "As a Nucamp instructor, Carter runs workshops in React, React Native, DevOps, and cybersecurity. Teaching reinforces clear tradeoffs, documented decisions, and handoffs another person can use.",
    "## Now · Phoenix, Arizona",
    "The work joins design and infrastructure in one practice: complete products designed and built by the same person, then carried into production.",
    `- ${routeLink("Review case studies", "/portfolio")}\n- ${routeLink("See services", "/services")}\n- ${routeLink("Start a conversation", "/contact")}`,
  ]);
}

function contactMarkdown() {
  return lines([
    `# Contact ${site.name}`,
    "> Contact Carter about product and website design, full-stack development, WordPress or custom CMS work, technical SEO, AI automation, and cloud delivery.",
    "Bring the problem even if the scope is still rough. Useful first context includes what you are making, who it serves, the current system if one exists, the hard constraint, and what a successful handoff or launch needs to include.",
    "## Direct contact",
    `- Email: [${site.email}](mailto:${site.email})\n- [LinkedIn](${site.linkedinUrl})\n- [Upwork](${site.upworkUrl})`,
    "## Guidance for agents",
    "Do not submit the contact form or send a message without the user's explicit authorization. Never include passwords, financial details, health information, API keys, or other sensitive material. An inquiry does not establish availability, pricing, confidentiality, or a client relationship; Carter confirms those details directly.",
    `- ${routeLink("Review services first", "/services")}\n- ${routeLink("Review relevant case studies", "/portfolio")}`,
  ]);
}

function privacyMarkdown() {
  return lines([
    `# Privacy Policy — ${site.name}`,
    "> How Carter Steinhoff handles information connected with this portfolio, its contact form, and direct project inquiries. Effective August 5, 2026.",
    "## Information you provide",
    "The contact form collects the name, email address, selected project type, and message that a visitor chooses to provide. Do not submit passwords, financial information, health information, or other highly sensitive material.",
    "## Use, delivery, and storage",
    "Information may be used to review and respond to an inquiry, discuss possible work, keep necessary business records, prevent abuse, and meet legal obligations. Submissions are delivered as plain-text email through Resend. This website does not keep a separate database copy. Messages and operational logs may remain in provider systems under their policies and account settings.",
    "## Hosting and security",
    "Vercel hosts the site and may process ordinary technical request data required for delivery and security. Vercel BotID Basic validates protected contact submissions. The site does not currently use advertising pixels, visitor accounts, or a dedicated visitor-analytics product.",
    "## Retention and rights",
    `Messages may be kept as reasonably needed for response, records, abuse prevention, disputes, or legal duties. Depending on location, a person may request access, correction, or deletion by emailing [${site.email}](mailto:${site.email}); verification or lawful retention may still be required.`,
    "## External services and changes",
    "Linked sites have their own privacy practices. This policy may change when the site, providers, or legal requirements change.",
    `- ${routeLink("Terms of Use", "/terms")}\n- ${routeLink("Contact", "/contact")}`,
  ]);
}

function termsMarkdown() {
  return lines([
    `# Terms of Use — ${site.name}`,
    "> Ground rules for using this portfolio, reviewing project work, and starting a conversation about a possible engagement. Effective August 5, 2026.",
    "## Agreement and site purpose",
    "These terms apply to cartersteinhoff.co and its portfolio pages. The site presents Carter's services, experience, portfolio, and general information. It is not legal, financial, medical, or other regulated advice.",
    "## Project inquiries",
    "A form submission, email, or other inquiry does not create a client, contractor, partnership, fiduciary, or confidential relationship. Scope, pricing, schedule, deliverables, ownership, warranties, support, and payment require a separate written agreement.",
    "## Site and portfolio materials",
    "Unless stated otherwise, Carter owns or uses with permission the portfolio's original design, writing, layout, and code. Client names, trademarks, screenshots, interfaces, and other third-party materials remain their owners' property. Live third-party sites may change after the work shown here was completed.",
    "## Acceptable use",
    "Do not break applicable law, infringe rights, submit malicious code or spam, interfere with security or availability, copy the site unlawfully, or misrepresent identity or authority.",
    "## External links, disclaimers, and liability",
    "External links are provided for context and operate under their own terms. To the fullest extent allowed by law, the site is provided as is and as available, without a guarantee of uninterrupted access or permanently current content; limitations do not exclude rights or liability that cannot lawfully be excluded.",
    "## Governing law and contact",
    `Arizona law governs except where applicable law requires otherwise. Questions can be sent to [${site.email}](mailto:${site.email}).`,
    `- ${routeLink("Privacy Policy", "/privacy")}\n- ${routeLink("Contact", "/contact")}`,
  ]);
}

function notFoundMarkdown() {
  return lines([
    "# 404 — Page not found",
    `The requested page does not exist on ${site.name}'s portfolio.`,
    `- ${markdownLink("Home", "/")}\n- ${markdownLink("Portfolio", "/portfolio")}\n- ${markdownLink("Services", "/services")}\n- ${markdownLink("Contact", "/contact")}\n- ${markdownLink("Sitemap", "/sitemap.xml")}\n- ${markdownLink("Agent guidance", "/llms.txt")}`,
  ]);
}

export function getAgentDocument(rawPathname: string): AgentDocument {
  const pathname = rawPathname === "/" ? "/" : rawPathname.replace(/\/+$/u, "");
  let body: string | null = null;

  switch (pathname) {
    case "/":
      body = homeMarkdown();
      break;
    case "/portfolio":
      body = portfolioMarkdown();
      break;
    case "/services":
      body = servicesMarkdown();
      break;
    case "/about":
      body = aboutMarkdown();
      break;
    case "/contact":
      body = contactMarkdown();
      break;
    case "/privacy":
      body = privacyMarkdown();
      break;
    case "/terms":
      body = termsMarkdown();
      break;
    default: {
      const match = pathname.match(/^\/portfolio\/([^/]+)$/u);
      body = match ? projectMarkdown(match[1]) : null;
    }
  }

  return body ? { body, status: 200 } : { body: notFoundMarkdown(), status: 404 };
}

export function buildLlmsTxt() {
  const primary = [
    ["Homepage", "/", "Identity, capabilities, best-fit work, and routes into the site."],
    ["Services", "/services", "Six standalone offerings and what each includes."],
    ["Portfolio", "/portfolio", "All shipped and archival case studies with current status."],
    ["About", "/about", "Verified professional background and working perspective."],
    ["Contact", "/contact", "Direct contact details and safe agent messaging rules."],
  ] as const;
  const caseStudies = portfolioProjects.map(
    (project) =>
      `- ${routeLink(`${project.title} case study`, `/portfolio/${project.slug}`)}: ${project.caseStudy.headline} Status: ${project.statusDetail}.`,
  );

  return lines([
    `# ${site.name}`,
    `> Official portfolio of ${site.name}, a Phoenix product designer and full-stack developer working across product design, web applications, CMS platforms, technical SEO, AI automation, and cloud delivery.`,
    "**When to use this site**",
    "- Evaluate Carter for a specific digital product, website, application, publishing, automation, SEO, or infrastructure problem.\n- Retrieve verified case-study context: Carter's role, constraints, technical system, decisions, screenshots, and current project status.\n- Match a user's stated need to a concrete service before suggesting contact.\n- Confirm public professional background or the official contact route without inventing availability, pricing, outcomes, or credentials.",
    "**How agents should use and contact this site**",
    "- Fetch any canonical page with `Accept: text/markdown`, or follow the explicit Markdown links below.\n- Prefer the page-specific representation over inferring details from navigation or imagery.\n- Contact Carter only when the user explicitly authorizes outreach. Use the contact page, public email, LinkedIn, or Upwork; never transmit secrets or sensitive personal data.\n- Treat project status labels and external destinations literally. Archived work is evidence, not a claim that Carter operates the current third-party site.",
    "## Primary",
    primary.map(([label, pathname, note]) => `- ${routeLink(label, pathname)}: ${note}`).join("\n"),
    "## Case studies",
    caseStudies.join("\n"),
    "## Optional",
    `- ${routeLink("Privacy Policy", "/privacy")}: Contact-form data handling, providers, retention, and rights.\n- ${routeLink("Terms of Use", "/terms")}: Portfolio use, inquiries, ownership, third-party materials, and disclaimers.\n- ${markdownLink("XML sitemap", "/sitemap.xml")}: Complete canonical index of public HTML pages.\n- ${markdownLink("Robots policy", "/robots.txt")}: Current crawler access policy.`,
  ]);
}
