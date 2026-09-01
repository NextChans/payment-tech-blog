import { getAllPostsMeta } from "@/lib/posts";
import PostList from "@/components/PostList";

export default function HomePage() {
  const posts = getAllPostsMeta();

  return (
    <div>
      <p className="mb-8 text-sm text-[var(--muted)]">
        PG·간편결제·전자금융 규제와 시스템 아키텍처를 다룹니다. 매주 발행.
      </p>

      {posts.length === 0 ? (
        <p className="text-[var(--muted)]">
          아직 글이 없습니다. content/posts에 첫 글을 추가하세요.
        </p>
      ) : (
        <PostList posts={posts} />
      )}
    </div>
  );
}
