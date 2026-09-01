const LEGACY_UA =
  "Mozilla/5.0 (Windows NT 5.1) AppleWebKit/535.11 (KHTML, like Gecko) Chrome/17.0.963.56 Safari/535.11";

/**
 * next/og(Satori)는 woff2를 지원하지 않으므로, 구형 브라우저로 위장해
 * Google Fonts CSS API에서 필요한 글자만 담긴 woff 서브셋을 받아온다.
 */
export async function loadGoogleFont(
  text: string,
  weight: 400 | 700 = 400
): Promise<ArrayBuffer> {
  const cssUrl = `https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@${weight}&text=${encodeURIComponent(
    text
  )}`;
  const css = await fetch(cssUrl, {
    headers: { "User-Agent": LEGACY_UA },
  }).then((res) => res.text());

  const fontUrl = css.match(/src: url\(([^)]+)\)/)?.[1];
  if (!fontUrl) {
    throw new Error("Noto Sans KR 폰트 소스를 찾지 못했습니다");
  }

  const fontRes = await fetch(fontUrl);
  return fontRes.arrayBuffer();
}
