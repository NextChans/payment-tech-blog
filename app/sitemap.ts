import { MetadataRoute } from "next";
import { getAllPostsMeta } from "@/lib/posts";

const SITE_URL = "https://payment-tech-blog.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPostsMeta();
  return [
    { url: SITE_URL, lastModified: new Date() },
    ...posts.map((post) => ({
      url: `${SITE_URL}/posts/${post.slug}`,
      lastModified: post.date,
    })),
  ];
}
