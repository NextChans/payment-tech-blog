import { MetadataRoute } from "next";

const SITE_URL = "https://fintech.ongirok.co.kr";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
