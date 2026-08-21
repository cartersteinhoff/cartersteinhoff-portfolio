import Link from "next/link";
import { LegalDocument, type LegalSection } from "@/components/legal-document";
import { site } from "@/data/site";
import { createPageMetadata } from "@/lib/seo";

const description =
  "Terms governing use of Carter Steinhoff's portfolio website, project inquiries, portfolio content, and external links.";

export const metadata = createPageMetadata({
  title: "Terms of Use",
  description,
  path: "/terms",
});

const sections: readonly LegalSection[] = [
  {
    id: "agreement",
    title: "Agreement to these terms",
    content: (
      <>
        <p>
          These Terms of Use apply to your access to and use of cartersteinhoff.co and its related
          portfolio pages. The site is operated by Carter Steinhoff from Phoenix, Arizona.
        </p>
        <p>
          By using the site, you agree to these terms and the{" "}
          <Link href="/privacy">Privacy Policy</Link>. If you do not agree, please do not use the
          site.
        </p>
      </>
    ),
  },
  {
    id: "site-purpose",
    title: "Site purpose and information",
    content: (
      <>
        <p>
          This website presents Carter&apos;s services, experience, portfolio, and general
          information for prospective clients and collaborators. Content is provided for
          informational purposes and may be updated, corrected, or removed without notice.
        </p>
        <p>
          Nothing on the site is professional legal, financial, medical, or other regulated advice.
          You are responsible for evaluating whether the information and services are appropriate
          for your needs.
        </p>
      </>
    ),
  },
  {
    id: "project-inquiries",
    title: "Project inquiries and engagements",
    content: (
      <>
        <p>
          Sending a contact form, email, or other inquiry does not create a client, contractor,
          partnership, fiduciary, or confidential relationship. Please do not send confidential or
          highly sensitive information before an appropriate written agreement is in place.
        </p>
        <p>
          Any project scope, pricing, schedule, deliverables, ownership, warranties, support, and
          payment terms will be governed by a separate written proposal or agreement accepted by the
          relevant parties.
        </p>
      </>
    ),
  },
  {
    id: "ownership",
    title: "Site content and intellectual property",
    content: (
      <>
        <p>
          Unless otherwise stated, the original design, writing, layout, and code of this portfolio
          are owned by Carter Steinhoff or used with permission. You may view the site and share
          links to its public pages for legitimate personal or business-evaluation purposes.
        </p>
        <p>
          You may not reproduce, republish, sell, impersonate, or create misleading derivative uses
          of the site or its original content without permission. Nothing here transfers ownership
          or grants a license beyond the limited right to access and use the public site.
        </p>
      </>
    ),
  },
  {
    id: "portfolio-materials",
    title: "Portfolio projects and third-party materials",
    content: (
      <>
        <p>
          Client and project names, trademarks, logos, screenshots, product interfaces, and other
          third-party materials remain the property of their respective owners. They appear to
          identify and explain relevant portfolio work; their inclusion does not transfer ownership
          or imply an endorsement beyond the relationship described on the page.
        </p>
        <p>
          Portfolio descriptions are intended to summarize Carter&apos;s contribution and the
          technology used. Live third-party sites may change after the work shown here was
          completed.
        </p>
      </>
    ),
  },
  {
    id: "acceptable-use",
    title: "Acceptable use",
    content: (
      <>
        <p>You agree not to use the site to:</p>
        <ul>
          <li>Break applicable law or infringe another person&apos;s rights.</li>
          <li>Submit malicious code, spam, deceptive inquiries, or unlawful material.</li>
          <li>Probe, bypass, disable, or interfere with security or availability.</li>
          <li>Scrape or copy the site in a way that violates these terms or applicable law.</li>
          <li>Misrepresent your identity or your authority to act for another person or entity.</li>
        </ul>
        <p>
          Access may be restricted when reasonably necessary to protect the site or other people.
        </p>
      </>
    ),
  },
  {
    id: "external-services",
    title: "External links and services",
    content: (
      <>
        <p>
          The site links to project websites, LinkedIn, Upwork, and other services that Carter does
          not control. A link is provided for context or convenience and is not a guarantee of the
          external site&apos;s availability, accuracy, security, products, or privacy practices.
        </p>
        <p>You use third-party websites under their own terms and policies.</p>
      </>
    ),
  },
  {
    id: "disclaimers",
    title: "Disclaimers and limitation of liability",
    content: (
      <>
        <p>
          To the fullest extent permitted by law, the website and its content are provided “as is”
          and “as available,” without warranties of any kind, express or implied. Carter does not
          guarantee uninterrupted access, error-free operation, or that every item will remain
          current.
        </p>
        <p>
          To the fullest extent permitted by law, Carter will not be liable for indirect,
          incidental, special, consequential, or punitive damages arising from use of, or inability
          to use, the site or an external site linked from it. Nothing in these terms excludes
          rights or liability that cannot lawfully be excluded.
        </p>
      </>
    ),
  },
  {
    id: "governing-law-and-changes",
    title: "Governing law, changes, and contact",
    content: (
      <>
        <p>
          These terms are governed by the laws of the State of Arizona, without regard to its
          conflict-of-law rules, except where applicable law requires otherwise.
        </p>
        <p>
          Carter may revise these terms as the site or its practices change. Updated terms become
          effective when posted, and the date at the top of this page will be revised.
        </p>
        <p>
          Questions about these terms can be sent to{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
      </>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalDocument
      label="Terms of use"
      title="Terms of use"
      introduction="The ground rules for using this portfolio, reviewing project work, and starting a conversation about a potential engagement."
      summary="You are welcome to review and share the public portfolio. Project work begins only through a separate written agreement."
      effectiveDate="August 5, 2026"
      effectiveDateTime="2026-08-05"
      sections={sections}
    />
  );
}
