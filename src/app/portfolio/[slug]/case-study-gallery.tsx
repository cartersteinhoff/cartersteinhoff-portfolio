"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import styles from "./case-study-gallery.module.css";

export type CaseStudyGalleryScreen = {
  readonly image: string;
  readonly alt: string;
  readonly title: string;
  readonly caption: string;
  readonly width?: number;
  readonly height?: number;
};

export type CaseStudyGalleryProps = {
  readonly screens: readonly CaseStudyGalleryScreen[];
};

const FALLBACK_WIDTH = 1440;
const FALLBACK_HEIGHT = 1000;

function screenNumber(index: number) {
  return String(index + 1).padStart(2, "0");
}

export function CaseStudyGallery({ screens }: CaseStudyGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const openerIndexRef = useRef<number | null>(null);
  const triggerRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const id = useId();
  const titleId = `${id}-gallery-title`;
  const descriptionId = `${id}-gallery-description`;
  const activeScreen = activeIndex === null ? null : screens[activeIndex];

  useEffect(() => {
    const dialog = dialogRef.current;

    if (activeScreen && dialog && !dialog.open) {
      dialog.showModal();
      closeButtonRef.current?.focus();
    }
  }, [activeScreen]);

  function closeDialog() {
    dialogRef.current?.close();
  }

  function showPreviousScreen() {
    setActiveIndex((current) =>
      current === null ? current : (current - 1 + screens.length) % screens.length,
    );
  }

  function showNextScreen() {
    setActiveIndex((current) => (current === null ? current : (current + 1) % screens.length));
  }

  if (screens.length === 0) {
    return null;
  }

  return (
    <>
      <ol className={styles.gallery}>
        {screens.map((screen, index) => {
          const isLead = index === 0;
          const width = screen.width ?? FALLBACK_WIDTH;
          const height = screen.height ?? FALLBACK_HEIGHT;

          return (
            <li className={`${styles.item} ${isLead ? styles.lead : ""}`} key={screen.image}>
              <figure className={styles.figure}>
                <button
                  aria-haspopup="dialog"
                  aria-label={`Enlarge ${screen.title}`}
                  className={styles.mediaButton}
                  onClick={() => {
                    openerIndexRef.current = index;
                    setActiveIndex(index);
                  }}
                  ref={(element) => {
                    triggerRefs.current[index] = element;
                  }}
                  type="button"
                >
                  <Image
                    alt={screen.alt}
                    className={styles.image}
                    height={height}
                    sizes={
                      isLead
                        ? "(max-width: 767px) calc(100vw - 2.5rem), (max-width: 1199px) calc(75vw - 4rem), 1000px"
                        : "(max-width: 767px) calc(100vw - 2.5rem), (max-width: 1199px) calc(50vw - 3rem), 670px"
                    }
                    src={screen.image}
                    width={width}
                  />
                  <span aria-hidden="true" className={styles.enlargeLabel}>
                    <span>Enlarge</span>
                    <svg aria-hidden="true" viewBox="0 0 20 20">
                      <path d="M7.5 3.5h-4v4M12.5 3.5h4v4M7.5 16.5h-4v-4M12.5 16.5h4v-4" />
                    </svg>
                  </span>
                </button>

                <figcaption className={styles.caption}>
                  <span aria-hidden="true" className={styles.number}>
                    {screenNumber(index)}
                  </span>
                  <div>
                    <h3>{screen.title}</h3>
                    <p>{screen.caption}</p>
                  </div>
                </figcaption>
              </figure>
            </li>
          );
        })}
      </ol>

      {activeScreen && activeIndex !== null ? (
        <dialog
          aria-describedby={descriptionId}
          aria-labelledby={titleId}
          className={styles.dialog}
          onCancel={(event) => {
            event.preventDefault();
            closeDialog();
          }}
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              closeDialog();
            }
          }}
          onClose={() => {
            const returningIndex = openerIndexRef.current;
            openerIndexRef.current = null;
            setActiveIndex(null);

            if (returningIndex !== null) {
              window.requestAnimationFrame(() => triggerRefs.current[returningIndex]?.focus());
            }
          }}
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft") {
              event.preventDefault();
              showPreviousScreen();
            }

            if (event.key === "ArrowRight") {
              event.preventDefault();
              showNextScreen();
            }
          }}
          ref={dialogRef}
        >
          <div className={styles.dialogPanel}>
            <header className={styles.dialogHeader}>
              <div>
                <p aria-live="polite">
                  Screen {screenNumber(activeIndex)} / {String(screens.length).padStart(2, "0")}
                </p>
                <h2 id={titleId}>{activeScreen.title}</h2>
              </div>
              <button
                aria-label={`Close ${activeScreen.title}`}
                className={styles.closeButton}
                onClick={closeDialog}
                ref={closeButtonRef}
                type="button"
              >
                <span>Close</span>
                <svg aria-hidden="true" viewBox="0 0 20 20">
                  <path d="m4 4 12 12M16 4 4 16" />
                </svg>
              </button>
            </header>

            <figure className={styles.dialogFigure}>
              <div className={styles.dialogMedia}>
                <Image
                  alt={activeScreen.alt}
                  className={styles.dialogImage}
                  height={activeScreen.height ?? FALLBACK_HEIGHT}
                  sizes="calc(100vw - 4rem)"
                  src={activeScreen.image}
                  width={activeScreen.width ?? FALLBACK_WIDTH}
                />
              </div>
              <figcaption id={descriptionId}>{activeScreen.caption}</figcaption>
            </figure>

            {screens.length > 1 ? (
              <nav aria-label="Screen navigation" className={styles.dialogNavigation}>
                <button onClick={showPreviousScreen} type="button">
                  <span aria-hidden="true">←</span>
                  Previous
                </button>
                <button onClick={showNextScreen} type="button">
                  Next
                  <span aria-hidden="true">→</span>
                </button>
              </nav>
            ) : null}
          </div>
        </dialog>
      ) : null}
    </>
  );
}
