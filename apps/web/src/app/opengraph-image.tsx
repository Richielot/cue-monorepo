import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "GUARDIS — NIS2 compliance for CEE SMEs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px",
        background:
          "linear-gradient(135deg, #0b1020 0%, #1a2040 50%, #2563eb 100%)",
        color: "white",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          marginBottom: "40px",
        }}
      >
        <div
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "12px",
            background: "#2563eb",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "28px",
            fontWeight: 800,
          }}
        >
          G
        </div>
        <div style={{ fontSize: "28px", fontWeight: 600, letterSpacing: "-0.01em" }}>
          GUARDIS
        </div>
      </div>
      <div
        style={{
          fontSize: "68px",
          fontWeight: 800,
          lineHeight: 1.05,
          letterSpacing: "-0.03em",
          maxWidth: "900px",
        }}
      >
        NIS2 compliance, without the consultants.
      </div>
      <div
        style={{
          marginTop: "32px",
          fontSize: "26px",
          color: "#94a3b8",
          maxWidth: "900px",
          lineHeight: 1.4,
        }}
      >
        Automated assessments, incident reporting, and audit-ready reports for
        SMEs in Slovakia, Czechia, and Poland. EU-hosted.
      </div>
    </div>,
    { ...size },
  );
}
