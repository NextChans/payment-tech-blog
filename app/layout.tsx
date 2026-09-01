import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";

const SITE_URL = "https://payment-tech-blog.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "결제·핀테크 엔지니어링 브리핑",
    template: "%s | 결제·핀테크 엔지니어링 브리핑",
  },
  description:
    "PG·간편결제·전자금융 규제와 백엔드 아키텍처를 현직 엔지니어 시각으로 분석합니다.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "결제·핀테크 엔지니어링 브리핑",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "결제·핀테크 엔지니어링 브리핑",
    description:
      "PG·간편결제·전자금융 규제와 백엔드 아키텍처를 현직 엔지니어 시각으로 분석합니다.",
  },
  robots: { index: true, follow: true },
  verification: {
    google: "QgLmW4s9nbqp5RawDw2LpkyJiaJOmOTuqVe9DYCg0Uc",
  },
  other: {
    "google-adsense-account": "ca-pub-6567959460588054",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6567959460588054"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <Header />
        <main className="mx-auto max-w-3xl px-4 py-10">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
