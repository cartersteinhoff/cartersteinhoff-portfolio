import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

/**
 * Shared renderer for every route's share card, so a link to any page
 * looks like the site rather than a screenshot of it.
 *
 * Satori cannot read the hashed .woff2 files next/font emits — it needs
 * ttf/otf/woff — so the brand faces are committed under src/app/_og-fonts
 * and read at build time. Manrope must be a *static* instance: Satori
 * throws on the variable Manrope[wght].ttf with "Cannot read properties
 * of undefined (reading '256')".
 *
 * The background is a photograph rather than CSS because Satori's radial
 * gradients render with a hard step — measured as a 33-level luminance
 * cliff in a single row. Linear gradients it handles cleanly.
 */
const fontDir = join(process.cwd(), "src/app/_og-fonts");
const assetDir = join(process.cwd(), "src/app/_og-assets");

const sand = "#f2ece4";
const accent = "#f4a261";
const siteHostname = new URL(site.defaultUrl).hostname;
/* Lighter than the site's --muted. Over a photograph the background sits
 * around 74-90 luminance, where --muted only reaches ~3.2:1. */
const muted = "#d9d2c9";

async function loadFonts() {
  const [display, sans] = await Promise.all([
    readFile(join(fontDir, "InstrumentSerif-Regular.ttf")),
    readFile(join(fontDir, "Manrope-Bold.ttf")),
  ]);

  return [
    { name: "Instrument Serif", data: display, weight: 400 as const, style: "normal" as const },
    { name: "Manrope", data: sans, weight: 700 as const, style: "normal" as const },
  ];
}

async function loadBackground() {
  const jpeg = await readFile(join(assetDir, "og-background.jpg"));
  return `data:image/jpeg;base64,${jpeg.toString("base64")}`;
}

type OgCardOptions = {
  /** Small uppercase label above the headline. */
  eyebrow: string;
  /** The headline. Set in the display face. */
  title: string;
  /** One supporting line under the headline. */
  subtitle: string;
  /** Display size, so long titles do not overflow the frame. */
  titleSize?: number;
};

export async function renderOgCard({ eyebrow, title, subtitle, titleSize = 112 }: OgCardOptions) {
  const [background, fonts] = await Promise.all([loadBackground(), loadFonts()]);

  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "hidden",
        justifyContent: "space-between",
        padding: "64px 72px",
        background: "#09090b",
        color: sand,
        fontFamily: "Manrope",
      }}
    >
      {/** biome-ignore lint/performance/noImgElement: Satori renders this
       * card outside the browser; next/image does not apply. */}
      <img
        src={background}
        alt=""
        width={ogSize.width}
        height={ogSize.height}
        style={{ position: "absolute", inset: 0, objectFit: "cover" }}
      />
      <div
        style={{
          display: "flex",
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(90deg, rgba(9, 9, 11, 0.95) 0%, rgba(9, 9, 11, 0.88) 55%, rgba(9, 9, 11, 0.5) 100%)",
        }}
      />
      <div
        style={{
          display: "flex",
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(0deg, rgba(9, 9, 11, 0.9) 0%, rgba(9, 9, 11, 0.2) 42%, rgba(9, 9, 11, 0) 70%)",
        }}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: 21,
          fontWeight: 700,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
        }}
      >
        <span style={{ color: muted }}>{eyebrow}</span>
        <span style={{ color: accent }}>{site.location}</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <span
          style={{
            display: "flex",
            maxWidth: 900,
            fontFamily: "Instrument Serif",
            fontSize: titleSize,
            letterSpacing: "-0.045em",
            lineHeight: 1.02,
          }}
        >
          {title}
        </span>
        <span
          style={{
            display: "flex",
            maxWidth: 760,
            marginTop: 26,
            color: muted,
            fontSize: 29,
            lineHeight: 1.45,
          }}
        >
          {subtitle}
        </span>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: 26,
          borderTop: "1px solid rgba(242, 236, 228, 0.24)",
          fontSize: 21,
          fontWeight: 700,
          letterSpacing: "0.13em",
          textTransform: "uppercase",
        }}
      >
        <span style={{ color: muted }}>Design through deployment</span>
        <span style={{ color: sand }}>{siteHostname}</span>
      </div>
    </div>,
    { ...ogSize, fonts },
  );
}
