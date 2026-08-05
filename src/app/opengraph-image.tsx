import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const alt = site.socialImageAlt;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        alignItems: "stretch",
        background: "#101111",
        color: "#f7f1e8",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "space-between",
        overflow: "hidden",
        padding: "68px 72px",
        position: "relative",
        width: "100%",
      }}
    >
      <div
        style={{
          background:
            "radial-gradient(circle at center, rgba(242, 168, 111, 0.98) 0%, rgba(207, 88, 45, 0.86) 42%, rgba(86, 34, 30, 0) 72%)",
          borderRadius: "999px",
          display: "flex",
          height: "610px",
          position: "absolute",
          right: "-120px",
          top: "-250px",
          width: "610px",
        }}
      />
      <div
        style={{
          border: "1px solid rgba(247, 241, 232, 0.24)",
          display: "flex",
          inset: "28px",
          position: "absolute",
        }}
      />

      <div
        style={{
          alignItems: "center",
          display: "flex",
          fontFamily: "Arial, sans-serif",
          fontSize: 20,
          fontWeight: 700,
          justifyContent: "space-between",
          letterSpacing: "0.16em",
          textTransform: "uppercase",
        }}
      >
        <span>Design &amp; development</span>
        <span style={{ color: "#f2a86f" }}>Phoenix · Arizona</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", maxWidth: "880px" }}>
        <span
          style={{
            fontFamily: "Georgia, serif",
            fontSize: 106,
            letterSpacing: "-0.055em",
            lineHeight: 0.92,
          }}
        >
          Carter Steinhoff.
        </span>
        <span
          style={{
            color: "#d7cec2",
            fontFamily: "Arial, sans-serif",
            fontSize: 30,
            lineHeight: 1.35,
            marginTop: "28px",
          }}
        >
          Digital products, publishing systems, AI automation, and cloud delivery.
        </span>
      </div>

      <div
        style={{
          alignItems: "center",
          borderTop: "1px solid rgba(247, 241, 232, 0.28)",
          display: "flex",
          fontFamily: "Arial, sans-serif",
          fontSize: 20,
          justifyContent: "space-between",
          paddingTop: "24px",
        }}
      >
        <span>From first screen to production.</span>
        <span style={{ color: "#f2a86f" }}>CS / 33.4484° N</span>
      </div>
    </div>,
    size,
  );
}
