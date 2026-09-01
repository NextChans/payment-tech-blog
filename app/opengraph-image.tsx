import { ImageResponse } from "next/og";
import { loadGoogleFont } from "@/lib/og-font";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt =
  "결제·핀테크 엔지니어링 브리핑 — PG·간편결제·전자금융 규제와 시스템 아키텍처 분석";

const KICKER = "PAYMENT · FINTECH ENGINEERING";
const TITLE_LINE_1 = "결제·핀테크";
const TITLE_LINE_2 = "엔지니어링 브리핑";
const SUBTITLE =
  "PG·간편결제·전자금융 규제와 시스템 아키텍처를 엔지니어 시각으로 분석합니다";

export default async function Image() {
  const [bold, regular] = await Promise.all([
    loadGoogleFont(`${TITLE_LINE_1}${TITLE_LINE_2}`, 700),
    loadGoogleFont(`${KICKER}${SUBTITLE}`, 400),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px 96px",
          backgroundColor: "#0b0f14",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            width: 14,
            backgroundColor: "#4f9dff",
            display: "flex",
          }}
        />
        <div
          style={{
            display: "flex",
            fontSize: 26,
            letterSpacing: 2,
            color: "#4f9dff",
            fontFamily: "Noto Sans KR",
            fontWeight: 400,
            marginBottom: 32,
          }}
        >
          {KICKER}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            color: "#e6edf3",
            fontFamily: "Noto Sans KR",
            fontWeight: 700,
            fontSize: 76,
            lineHeight: 1.25,
          }}
        >
          <div style={{ display: "flex" }}>{TITLE_LINE_1}</div>
          <div style={{ display: "flex" }}>{TITLE_LINE_2}</div>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 36,
            color: "#8b98a5",
            fontFamily: "Noto Sans KR",
            fontWeight: 400,
            fontSize: 30,
            width: 880,
          }}
        >
          {SUBTITLE}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Noto Sans KR", data: bold, weight: 700, style: "normal" },
        { name: "Noto Sans KR", data: regular, weight: 400, style: "normal" },
      ],
    }
  );
}
