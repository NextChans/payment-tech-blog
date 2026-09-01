import { ImageResponse } from "next/og";
import { getAllPostsMeta, getAllSlugs } from "@/lib/posts";
import { categoryLabel } from "@/lib/categories";
import { loadGoogleFont } from "@/lib/og-font";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

const SITE_NAME = "결제·핀테크 엔지니어링 브리핑";

function titleFontSize(title: string): number {
  if (title.length <= 30) return 58;
  if (title.length <= 42) return 50;
  if (title.length <= 56) return 42;
  return 36;
}

export default async function Image({
  params,
}: {
  params: { slug: string };
}) {
  const post = getAllPostsMeta().find((p) => p.slug === params.slug);
  const title = post?.title ?? SITE_NAME;
  const category = post ? categoryLabel(post.category) : "";
  const date = post?.date ?? "";
  const fontSize = titleFontSize(title);

  const [bold, regular] = await Promise.all([
    loadGoogleFont(title, 700),
    loadGoogleFont(`${category}${date}${SITE_NAME}`, 400),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 88px",
          backgroundColor: "#0b0f14",
        }}
      >
        <div style={{ display: "flex" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "10px 24px",
              borderRadius: 999,
              border: "2px solid #4f9dff",
              color: "#4f9dff",
              fontFamily: "Noto Sans KR",
              fontWeight: 400,
              fontSize: 24,
            }}
          >
            {category}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            color: "#e6edf3",
            fontFamily: "Noto Sans KR",
            fontWeight: 700,
            fontSize,
            lineHeight: 1.35,
            width: 1000,
          }}
        >
          {title}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            color: "#8b98a5",
            fontFamily: "Noto Sans KR",
            fontWeight: 400,
            fontSize: 26,
          }}
        >
          <div style={{ display: "flex" }}>{SITE_NAME}</div>
          <div style={{ display: "flex" }}>{date}</div>
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
