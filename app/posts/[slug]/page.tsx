import { getAllSlugs, getPostBySlug } from "@/lib/posts";
import AdSlot from "@/components/AdSlot";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

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
    return {
      title: post.title,
      description: post.description,
      keywords: post.keywords,
      openGraph: {
        title: post.title,
        description: post.description,
        type: "article",
        publishedTime: post.date,
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

  return (
    <article>
      <h1 className="text-2xl font-bold">{post!.title}</h1>
      <p className="mt-2 text-sm text-[var(--muted)]">{post!.date}</p>
      <AdSlot label="Ad" />
      <div
        className="prose-post mt-6"
        dangerouslySetInnerHTML={{ __html: post!.contentHtml }}
      />
      <AdSlot label="Ad" />
    </article>
  );
}
