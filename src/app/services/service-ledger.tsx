"use client";

import { useState } from "react";
import type { ServiceOffering } from "@/data/services";
import styles from "./services.module.css";

type ServiceLedgerProps = {
  readonly services: readonly ServiceOffering[];
};

export function ServiceLedger({ services }: ServiceLedgerProps) {
  const [activeServiceId, setActiveServiceId] = useState<string | null>(services[0]?.id ?? null);

  return (
    <div className={styles.serviceCatalog}>
      {services.map((service) => {
        const isActive = service.id === activeServiceId;
        const triggerId = `${service.id}-trigger`;
        const panelId = `${service.id}-panel`;

        return (
          <article
            key={service.id}
            id={service.id}
            className={`${styles.serviceItem} ${isActive ? styles.serviceItemActive : ""}`}
          >
            <h2 className={styles.serviceHeading}>
              <button
                id={triggerId}
                type="button"
                className={styles.serviceTrigger}
                aria-expanded={isActive}
                aria-controls={panelId}
                onClick={() => setActiveServiceId(isActive ? null : service.id)}
              >
                <span className={styles.serviceNumber} aria-hidden="true">
                  {service.number}
                </span>
                <span className={styles.serviceTitle}>{service.title}</span>
                <span className={styles.serviceIcon} aria-hidden="true">
                  <span />
                  <span />
                </span>
              </button>
            </h2>

            <section
              id={panelId}
              aria-labelledby={triggerId}
              aria-hidden={!isActive}
              className={`${styles.servicePanel} ${isActive ? styles.servicePanelOpen : ""}`}
            >
              <div className={styles.servicePanelClip}>
                <div className={styles.servicePanelInner}>
                  <p>{service.summary}</p>
                  <span className="sr-only">Services include</span>
                  <ul aria-label={`${service.title} services include`}>
                    {service.includes.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          </article>
        );
      })}
    </div>
  );
}
