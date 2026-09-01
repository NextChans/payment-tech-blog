import Link from "next/link";
import { getAllPostsMeta } from "@/lib/posts";
import AdSlot from "@/components/AdSlot";

export default function HomePage() {
  const posts = getAllPostsMeta();

  return (
    <div>
      <p className="mb-8 text-sm text-[var(--muted)]">
        PG·간편결제·전자금융 규제와 백엔드 아키텍처를 다룹니다. 매주 발행.
      </p>

      {posts.length === 0 && (
        <p className="text-[var(--muted)]">
          아직 글이 없습니다. content/posts에 첫 글을 추가하세요.
        </p>
      )}

      <ul className="space-y-8">
        {posts.map((post, idx) => (
          <li key={post.slug}>
            <Link href={`/posts/${post.slug}`} className="group block">
              <h2 className="text-xl font-semibold group-hover:text-[var(--accent)]">
                {post.title}
              </h2>
              <p className="mt-1 text-sm text-[var(--muted)]">{post.date}</p>
              <p className="mt-2 text-[var(--fg)]">{post.description}</p>
            </Link>
            {idx === 0 && <AdSlot />}
          </li>
        ))}
      </ul>
    </div>
  );
}
