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
  className = "",
}: LivePreviewProps) {
  const [live, setLive] = useState(false);
  const regionId = useId();

  const externalLink = (
    <a className="live-preview-link" href={url} target="_blank" rel="noreferrer">
      Open {domain}
      <span aria-hidden="true">↗</span>
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );

  if (!frameable) {
    /* No toggle, but the bar keeps its single-row shape so this card
     * still lines up with the rest of the gallery. */
    return (
      <div className={className}>
        {children}
        <div className="live-preview-bar">
          <span className="live-preview-note" title="This site sends X-Frame-Options: DENY">
            Preview unavailable
          </span>
          {externalLink}
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <div id={regionId}>
        {live ? (
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

      <div className="live-preview-bar">
        <button
          type="button"
          className="live-preview-toggle"
          aria-expanded={live}
          aria-controls={regionId}
          onClick={() => setLive((value) => !value)}
        >
          {live ? "Close live preview" : "Explore live site"}
          <span aria-hidden="true">{live ? "×" : "→"}</span>
        </button>
        {externalLink}
      </div>
    </div>
  );
}
