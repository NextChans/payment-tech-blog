"use client";

import { useState } from "react";
import Link from "next/link";
import { CATEGORIES, categoryLabel, type Category } from "@/lib/categories";
import type { PostMeta } from "@/lib/posts";
import AdSlot from "@/components/AdSlot";

export default function PostList({ posts }: { posts: PostMeta[] }) {
  const [filter, setFilter] = useState<Category | "all">("all");

  const filtered =
    filter === "all" ? posts : posts.filter((p) => p.category === filter);

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-2">
        <FilterTab
          active={filter === "all"}
          onClick={() => setFilter("all")}
          label={`전체 (${posts.length})`}
        />
        {CATEGORIES.map((c) => {
          const count = posts.filter((p) => p.category === c.value).length;
          if (count === 0) return null;
          return (
            <FilterTab
              key={c.value}
              active={filter === c.value}
              onClick={() => setFilter(c.value)}
              label={`${c.label} (${count})`}
            />
          );
        })}
      </div>

      {filtered.length === 0 && (
        <p className="text-[var(--muted)]">해당 카테고리에는 아직 글이 없습니다.</p>
      )}

      <ul className="space-y-8">
        {filtered.map((post, idx) => (
          <li key={post.slug}>
            <Link href={`/posts/${post.slug}`} className="group block">
              <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
                <span>{post.date}</span>
                <span className="rounded-full border border-[var(--border)] px-2 py-0.5 text-xs">
                  {categoryLabel(post.category)}
                </span>
              </div>
              <h2 className="mt-1 text-xl font-semibold group-hover:text-[var(--accent)]">
                {post.title}
              </h2>
              <p className="mt-2 text-[var(--fg)]">{post.description}</p>
            </Link>
            {idx === 0 && <AdSlot />}
          </li>
        ))}
      </ul>
    </div>
  );
}

function FilterTab({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        "rounded-full border px-3 py-1 text-sm transition-colors " +
        (active
          ? "border-[var(--accent)] bg-[var(--accent)] text-black"
          : "border-[var(--border)] text-[var(--muted)] hover:text-[var(--fg)]")
      }
    >
      {label}
    </button>
  );
}
