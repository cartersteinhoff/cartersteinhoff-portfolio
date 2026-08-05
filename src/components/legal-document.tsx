import Link from "next/link";
import type { ReactNode } from "react";
import { site } from "@/data/site";
import styles from "./legal-document.module.css";

export type LegalSection = {
  readonly id: string;
  readonly title: string;
  readonly content: ReactNode;
};

type LegalDocumentProps = {
  readonly label: string;
  readonly title: string;
  readonly introduction: string;
  readonly summary: string;
  readonly effectiveDate: string;
  readonly effectiveDateTime: string;
  readonly sections: readonly LegalSection[];
};

export function LegalDocument({
  label,
  title,
  introduction,
  summary,
  effectiveDate,
  effectiveDateTime,
  sections,
}: LegalDocumentProps) {
  return (
    <main className={styles.page}>
      <header className={styles.masthead}>
        <span className={styles.gridLines} aria-hidden="true" />
        <div className={styles.shell}>
          <div className={styles.mastheadMeta}>
            <p>Legal · {label}</p>
            <time dateTime={effectiveDateTime}>Effective {effectiveDate}</time>
          </div>
          <div className={styles.mastheadGrid}>
            <h1>{title}</h1>
            <p>{introduction}</p>
          </div>
        </div>
      </header>

      <div className={`${styles.shell} ${styles.documentGrid}`}>
        <aside className={styles.rail}>
          <div className={styles.summary}>
            <span>Short version</span>
            <p>{summary}</p>
          </div>
          <nav aria-label={`${title} sections`}>
            <p>On this page</p>
            <ol>
              {sections.map((section, index) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </aside>

        <article className={styles.article} aria-label={title}>
          {sections.map((section, index) => (
            <section key={section.id} id={section.id} aria-labelledby={`${section.id}-title`}>
              <span className={styles.sectionNumber} aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h2 id={`${section.id}-title`}>{section.title}</h2>
                <div className={styles.body}>{section.content}</div>
              </div>
            </section>
          ))}

          <div className={styles.documentEnd}>
            <p>Have a question about these terms or your information?</p>
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <Link href="/contact">Contact Carter</Link>
          </div>
        </article>
      </div>
    </main>
  );
}
