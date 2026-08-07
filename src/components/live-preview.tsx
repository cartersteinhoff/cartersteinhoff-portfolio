"use client";

import { type ReactNode, useId, useState } from "react";

type LivePreviewProps = {
  /** The site to embed. Also the fallback link target. */
  url: string;
  domain: string;
  /**
   * False when the site sends X-Frame-Options / frame-ancestors and cannot
   * be embedded. Those entries get a plain outbound link instead of a
   * button that would only ever render a blocked frame.
   */
  frameable: boolean;
  title: string;
  /** The static, art-directed plate shown until the visitor opts in. */
  children: ReactNode;
  /**
   * The card's title and copy. It sits between the plate and the action
   * row, so it is passed in rather than placed by the caller: the three
   * blocks have to be siblings in *this* order for keyboard focus and
   * screen-reader reading order to match what's on screen. Doing it with
   * CSS `order` instead would send focus to the bottom action row before
   * the title above it.
   */
  copy?: ReactNode;
  /**
   * The card's primary action, rendered first in the same row as the
   * preview controls. Each card used to carry two separate action rows —
   * one under the plate, one under the copy — which read as three
   * competing links with no primary. One row, primary first.
   */
  primaryAction?: ReactNode;
  className?: string;
};

/**
 * Click-to-load live site preview.
 *
 * The iframe is not rendered at all until the visitor asks for it, so the
 * page costs nothing by default — no third-party requests, cookies, or
 * analytics from the embedded site, and no weight added to Core Web
 * Vitals. Until then the matted screenshot stands on its own.
 */
export function LivePreview({
  url,
  domain,
  frameable,
  title,
  children,
  copy,
  primaryAction,
  className = "",
}: LivePreviewProps) {
  const [live, setLive] = useState(false);
  const regionId = useId();

  /* "Visit site", not "Open retailboss.co" — the domain is already
   * printed in the browser bar directly above, and repeating it made two
   * of the card's shouty uppercase fragments say the same thing. */
  const externalLink = (
    <a className="live-preview-link" href={url} target="_blank" rel="noreferrer">
      Visit site
      <span aria-hidden="true">↗</span>
      <span className="sr-only"> ({domain}, opens in a new tab)</span>
    </a>
  );

  /* `display: contents` on the wrapper: the plate, the copy, and the
   * action row become direct children of the card's grid, so the card
   * still controls their spacing and the middle block still stretches to
   * keep action rows aligned across a row of cards. */
  return (
    <div className={`live-preview ${className}`}>
      <div id={regionId} className="live-preview-region">
        {live && frameable ? (
          <div className="live-preview-stage">
            <iframe
              src={url}
              title={`Live preview of ${title}`}
              className="live-preview-frame"
              loading="lazy"
              referrerPolicy="no-referrer"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            />
          </div>
        ) : (
          children
        )}
      </div>

      {copy}

      <div className="live-preview-bar">
        {primaryAction}
        <span className="live-preview-secondary">
          {frameable ? (
            <button
              type="button"
              className="live-preview-toggle"
              aria-expanded={live}
              aria-controls={regionId}
              onClick={() => setLive((value) => !value)}
            >
              {live ? "Close preview" : "Preview here"}
            </button>
          ) : (
            /* Sites that send X-Frame-Options: DENY get the outbound
             * link only, but the row keeps its shape so the gallery
             * stays aligned. */
            <span className="live-preview-note" title="This site cannot be embedded">
              Preview unavailable
            </span>
          )}
          {externalLink}
        </span>
      </div>
    </div>
  );
}
