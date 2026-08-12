import type { TechnologyStackData } from "@/data/technologies";
import { technologies } from "@/data/technologies";

type TechnologyStackProps = {
  stack: TechnologyStackData;
  system: {
    headline: string;
    items: readonly {
      label: string;
      value: string;
    }[];
  };
};

export function TechnologyStack({ stack, system }: TechnologyStackProps) {
  return (
    <section className="case-stack" aria-label="Technology stack">
      <header className="case-stack-header">
        <p className="case-stack-eyebrow">Technology stack</p>
        <h2 className="case-stack-title">{stack.headline}</h2>
        <p className="case-stack-summary">{stack.summary}</p>
      </header>

      <div className="case-stack-groups">
        {stack.groups.map((group) => (
          <section className="case-stack-group" key={group.label}>
            <h3 className="case-stack-group-label">{group.label}</h3>
            <ul className="case-stack-list">
              {group.technologies.map((item) => {
                const technology = technologies[item.id];

                return (
                  <li className="case-stack-item" key={item.id}>
                    <span className="case-stack-mark" aria-hidden="true">
                      <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24">
                        <path d={technology.icon.path} fill="currentColor" />
                      </svg>
                    </span>
                    <span className="case-stack-copy">
                      <strong className="case-stack-name">{technology.name}</strong>
                      <span className="case-stack-role">{item.role}</span>
                    </span>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>

      <div className="case-stack-system">
        <div className="case-stack-system-heading">
          <p className="case-stack-system-label">System map</p>
          <h3>{system.headline}</h3>
        </div>
        <dl className="case-stack-system-list">
          {system.items.map((item) => (
            <div key={item.label}>
              <dt>{item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
