import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fff1f2",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              fontSize: "80px",
              color: "#f43f5e",
            }}
          >
            💖
          </div>
        </div>
        <div
          style={{
            fontSize: "60px",
            fontWeight: "bold",
            color: "#be123c",
            textAlign: "center",
            marginBottom: "20px",
            padding: "0 40px",
          }}
        >
          Will You Be
        </div>
        <div
          style={{
            fontSize: "60px",
            fontWeight: "bold",
            color: "#be123c",
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          My Valentine?
        </div>
        <div
          style={{
            fontSize: "24px",
            color: "#9f1239",
            textAlign: "center",
          }}
        >
          A special proposal just for you 💕
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
