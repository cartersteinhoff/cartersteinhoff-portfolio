import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        alignItems: "center",
        background: "#101111",
        color: "#f7f1e8",
        display: "flex",
        fontFamily: "Georgia, serif",
        fontSize: 74,
        height: "100%",
        justifyContent: "center",
        letterSpacing: "-0.08em",
        position: "relative",
        width: "100%",
      }}
    >
      <div
        style={{
          border: "5px solid #f2a86f",
          borderRadius: "999px",
          display: "flex",
          inset: "14px",
          position: "absolute",
        }}
      />
      CS
    </div>,
    size,
  );
}
