import type { TechnologyStackData } from "@/data/technologies";
import { technologies } from "@/data/technologies";
import styles from "./technology-stack.module.css";

type TechnologyStackProps = {
  stack: TechnologyStackData;
};

export function TechnologyStack({ stack }: TechnologyStackProps) {
  return (
    <section className={`${styles.stack} case-stack`} aria-label="Technology stack">
      <div className={`${styles.groups} case-stack-groups`}>
        {stack.groups.map((group) => (
          <section className={`${styles.group} case-stack-group`} key={group.label}>
            <h3 className={`${styles.groupLabel} case-stack-group-label`}>{group.label}</h3>
            <ul className={`${styles.list} case-stack-list`}>
              {group.technologies.map((item) => {
                const technology = technologies[item.id];

                return (
                  <li className={`${styles.item} case-stack-item`} key={item.id}>
                    <span className={`${styles.mark} case-stack-mark`} aria-hidden="true">
                      <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24">
                        <path d={technology.icon.path} fill="currentColor" />
                      </svg>
                    </span>
                    <strong className={`${styles.name} case-stack-name`}>{technology.name}</strong>
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
