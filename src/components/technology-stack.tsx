import type { TechnologyStackData } from "@/data/technologies";
import { technologies } from "@/data/technologies";
import styles from "./technology-stack.module.css";

type TechnologyStackProps = {
  stack: TechnologyStackData;
};

export function TechnologyStack({ stack }: TechnologyStackProps) {
  return (
    <section className={styles.stack} aria-label="Technology stack">
      <p className={styles.stackLabel}>Technology roles</p>
      <div className={styles.groups}>
        {stack.groups.map((group) => (
          <section className={styles.group} key={group.label}>
            <h3 className={styles.groupLabel}>{group.label}</h3>
            <ul className={styles.list}>
              {group.technologies.map((item) => {
                const technology = technologies[item.id];

                return (
                  <li className={styles.item} key={item.id}>
                    <span className={styles.mark} aria-hidden="true">
                      <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24">
                        <path d={technology.icon.path} fill="currentColor" />
                      </svg>
                    </span>
                    <span className={styles.copy}>
                      <strong className={styles.name}>{technology.name}</strong>
                      <span className={styles.role}>{item.role}</span>
                    </span>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
    </section>
  );
}
