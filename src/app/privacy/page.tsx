import Link from "next/link";
import { LegalDocument, type LegalSection } from "@/components/legal-document";
import { site } from "@/data/site";
import { createPageMetadata, defaultSocialImage } from "@/lib/seo";

const description =
  "How Carter Steinhoff collects, uses, protects, and shares information submitted through cartersteinhoff.co.";

export const metadata = createPageMetadata({
  title: "Privacy Policy",
  description,
  path: "/privacy",
  image: defaultSocialImage,
});

const sections: readonly LegalSection[] = [
  {
    id: "scope",
    title: "What this policy covers",
    content: (
      <>
        <p>
          This policy explains how Carter Steinhoff handles information connected with this
          portfolio website, its contact form, and direct project inquiries. It does not govern
          websites operated by portfolio clients or other third parties.
        </p>
        <p>
          By using the site or sending an inquiry, you acknowledge the practices described here.
          Please also review the <Link href="/terms">Terms of Use</Link>.
        </p>
      </>
    ),
  },
  {
    id: "information-you-provide",
    title: "Information you provide",
    content: (
      <>
        <p>When you submit the contact form, the site collects:</p>
        <ul>
          <li>Your name and email address.</li>
          <li>The project type you select.</li>
          <li>The message and project context you choose to provide.</li>
        </ul>
        <p>
          If you contact Carter by email instead, your email provider and the recipient email
          provider process the information contained in that message. Please do not submit
          passwords, financial information, health information, or other highly sensitive material.
        </p>
      </>
    ),
  },
  {
    id: "how-information-is-used",
    title: "How information is used",
    content: (
      <>
        <p>The information you provide may be used to:</p>
        <ul>
          <li>Review and respond to your inquiry.</li>
          <li>Discuss potential work, scope, scheduling, and next steps.</li>
          <li>Maintain necessary business records.</li>
          <li>Protect the website and contact form against spam, fraud, and abuse.</li>
          <li>Comply with legal obligations or protect legitimate rights and safety.</li>
        </ul>
        <p>
          Carter does not sell or rent contact-form information and does not use it for third-party
          behavioral advertising.
        </p>
      </>
    ),
  },
  {
    id: "contact-delivery",
    title: "Contact delivery and storage",
    content: (
      <>
        <p>
          Contact submissions are delivered as plain-text email through Resend to the configured
          recipient email account.{" "}
          <strong>This website does not keep a separate database copy</strong> of your submission.
        </p>
        <p>
          Messages may remain in the destination mailbox and in provider systems or operational logs
          according to account settings and provider policies. Resend explains its practices in its{" "}
          <a href="https://resend.com/legal/privacy-policy" target="_blank" rel="noreferrer">
            Privacy Policy
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
          .
        </p>
      </>
    ),
  },
  {
    id: "hosting-and-security",
    title: "Hosting, security, and automatic information",
    content: (
      <>
        <p>
          Vercel hosts the website and may process standard technical request information needed to
          deliver and secure it, such as IP address, approximate location, browser or device
          details, timestamps, requested pages, and server logs.
        </p>
        <p>
          The contact endpoint uses Vercel BotID Basic. BotID performs an invisible browser
          challenge and validates the protected submission to help distinguish people from automated
          abuse. Learn more in the{" "}
          <a href="https://vercel.com/docs/botid" target="_blank" rel="noreferrer">
            BotID documentation
            <span className="sr-only"> (opens in a new tab)</span>
          </a>{" "}
          and Vercel&apos;s{" "}
          <a href="https://vercel.com/legal/privacy-notice" target="_blank" rel="noreferrer">
            Privacy Notice
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
          .
        </p>
        <p>
          The site does not currently use advertising pixels, a visitor account system, or a
          dedicated visitor-analytics product. Carter does not intentionally set advertising or
          analytics cookies. Necessary hosting or security technology may use technical browser
          signals or cookies when required to operate and protect the site.
        </p>
      </>
    ),
  },
  {
    id: "retention-and-security",
    title: "Retention and security",
    content: (
      <>
        <p>
          Messages may be retained for as long as reasonably needed to respond, maintain business
          records, prevent abuse, resolve disputes, and meet legal obligations. Exact retention in
          email, hosting, backup, and delivery systems is controlled partly by those providers.
        </p>
        <p>
          Reasonable safeguards are used, including server-only provider credentials, input limits,
          validation, no-store API responses, a hidden spam trap, and BotID verification. No method
          of transmission or electronic storage can be guaranteed to be completely secure.
        </p>
      </>
    ),
  },
  {
    id: "your-choices",
    title: "Your choices and rights",
    content: (
      <>
        <p>
          Depending on where you live, you may have rights to request access to, correction of, or
          deletion of personal information. You may also ask how your information has been used.
        </p>
        <p>
          Send a request to <a href={`mailto:${site.email}`}>{site.email}</a>. Carter may need to
          verify the request and may retain information where required for legitimate recordkeeping,
          security, dispute resolution, or legal obligations.
        </p>
      </>
    ),
  },
  {
    id: "external-links-and-changes",
    title: "External links, changes, and contact",
    content: (
      <>
        <p>
          This site links to LinkedIn, Upwork, portfolio projects, and other websites that Carter
          does not operate. Their privacy practices apply after you follow those links.
        </p>
        <p>
          This policy may change when the site, its providers, or legal requirements change. The
          effective date at the top will be updated when a revised policy is posted.
        </p>
        <p>
          Questions or privacy requests can be sent to{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
      </>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <LegalDocument
      label="Privacy policy"
      title="Privacy policy"
      introduction="Clear about what this site collects, why it is needed, and where a project inquiry goes after you press send."
      summary="The contact form collects only the details you choose to send, uses them to respond to your inquiry, and does not create a separate contact database."
      effectiveDate="August 5, 2026"
      effectiveDateTime="2026-08-05"
      sections={sections}
    />
  );
}
