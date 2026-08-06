import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const alt = site.socialImageAlt;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

/**
 * Satori renders this card, and it cannot read the hashed .woff2 files
 * next/font emits — it needs ttf/otf/woff. So the two brand faces are
 * committed alongside this route and read at build time. Without them
 * the card silently falls back to Georgia and Arial, which is what made
 * the previous version look like a different site.
 *
 * Manrope must be a *static* instance. Satori throws on the variable
 * `Manrope[wght].ttf` ("Cannot read properties of undefined (reading
 * '256')"), so this is the 700 weight pulled from the Google Fonts CSS
 * API rather than the variable file in the google/fonts repo.
 */
const fontDir = join(process.cwd(), "src/app/_og-fonts");

/**
 * The desk hero, pre-cropped to 1200x630 and darkened, inlined as a data
 * URI. Satori has no network access at build time, and its radial
 * gradients render with a hard step (a 33-level luminance cliff in one
 * row), so the background is a real photograph rather than CSS.
 */
async function loadBackground() {
  const jpeg = await readFile(join(process.cwd(), "src/app/_og-assets/og-background.jpg"));
  return `data:image/jpeg;base64,${jpeg.toString("base64")}`;
}

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

const ink = "#09090b";
const sand = "#f2ece4";
const accent = "#f4a261";

/* Lighter than the site's --muted (#b8afa7). Over a photograph the
 * background sits around 74-90 luminance, where --muted only reaches
 * ~3.2:1 — passing for large text but thin. This holds ~4.6:1. */
const muted = "#d9d2c9";

export default async function OpenGraphImage() {
  const background = await loadBackground();

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
        background: ink,
        color: sand,
        fontFamily: "Manrope",
      }}
    >
      {/* The hero photograph, so a shared link looks like the page it
       * opens. */}
      {/** biome-ignore lint/performance/noImgElement: Satori renders this
       * card outside the browser; next/image does not apply. */}
      <img
        src={background}
        alt=""
        width={1200}
        height={630}
        style={{ position: "absolute", inset: 0, objectFit: "cover" }}
      />
      {/* Linear gradients only — Satori renders these cleanly, unlike its
       * radial gradients. Left-weighted so the type stays legible while
       * the desk and window read on the right. */}
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
        <span style={{ color: muted }}>Product · Full-stack · AI &amp; cloud</span>
        <span style={{ color: accent }}>{site.location}</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <span
          style={{
            display: "flex",
            fontFamily: "Instrument Serif",
            fontSize: 148,
            letterSpacing: "-0.045em",
            lineHeight: 1,
          }}
        >
          Carter Steinhoff.
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
          I design the product and build the system it runs on.
        </span>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: 26,
          borderTop: `1px solid rgba(242, 236, 228, 0.24)`,
          fontSize: 21,
          fontWeight: 700,
          letterSpacing: "0.13em",
          textTransform: "uppercase",
        }}
      >
        <span style={{ color: muted }}>Design through deployment</span>
        <span style={{ color: sand }}>cartersteinhoff.com</span>
      </div>
    </div>,
    { ...size, fonts: await loadFonts() },
  );
}
