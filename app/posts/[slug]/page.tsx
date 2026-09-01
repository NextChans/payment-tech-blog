import { getAllSlugs, getPostBySlug } from "@/lib/posts";
import { categoryLabel } from "@/lib/categories";
import AdSlot from "@/components/AdSlot";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

const SITE_URL = "https://payment-tech-blog.vercel.app";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  try {
    const post = await getPostBySlug(params.slug);
    const url = `${SITE_URL}/posts/${params.slug}`;
    return {
      title: post.title,
      description: post.description,
      keywords: post.keywords,
      alternates: { canonical: url },
      openGraph: {
        title: post.title,
        description: post.description,
        type: "article",
        publishedTime: post.date,
        url,
      },
      twitter: {
        card: "summary_large_image",
        title: post.title,
        description: post.description,
      },
    };
  } catch {
    return {};
  }
}

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  let post;
  try {
    post = await getPostBySlug(params.slug);
  } catch {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post!.title,
    description: post!.description,
    datePublished: post!.date,
    dateModified: post!.date,
    keywords: post!.keywords.join(", "),
    articleSection: categoryLabel(post!.category),
    mainEntityOfPage: `${SITE_URL}/posts/${post!.slug}`,
    publisher: {
      "@type": "Organization",
      name: "결제·핀테크 엔지니어링 브리핑",
    },
  };

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h1 className="text-2xl font-bold">{post!.title}</h1>
      <div className="mt-2 flex items-center gap-2 text-sm text-[var(--muted)]">
        <span>{post!.date}</span>
        <span className="rounded-full border border-[var(--border)] px-2 py-0.5 text-xs">
          {categoryLabel(post!.category)}
        </span>
      </div>
      <AdSlot label="Ad" />
      <div
        className="prose-post mt-6"
        dangerouslySetInnerHTML={{ __html: post!.contentHtml }}
      />
      <AdSlot label="Ad" />
    </article>
  );
}
