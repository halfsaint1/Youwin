"use client";

import { useMemo, useState } from "react";

import type { PostSummary } from "@/lib/posts";
import { cn } from "@/lib/utils";
import { PostCard } from "@/components/blog/post-card";

const ALL = "all";

export function BlogGrid({
  posts,
  featuredSlug,
}: {
  posts: PostSummary[];
  /** Hidden from the unfiltered grid because it is already shown above it. */
  featuredSlug?: string;
}) {
  const [active, setActive] = useState(ALL);

  const topics = useMemo(() => {
    const seen = new Map<string, { label: string; count: number }>();
    for (const post of posts) {
      const topic = seen.get(post.categorySlug);
      if (topic) topic.count += 1;
      else seen.set(post.categorySlug, { label: post.category, count: 1 });
    }
    return [...seen.entries()].map(([slug, topic]) => ({ slug, ...topic }));
  }, [posts]);

  const visible =
    active === ALL
      ? posts.filter((post) => post.slug !== featuredSlug)
      : posts.filter((post) => post.categorySlug === active);

  const chip = (selected: boolean) =>
    cn(
      "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
      selected
        ? "border-brand bg-brand text-white"
        : "border-border bg-white text-ink hover:border-brand/40 hover:text-brand"
    );

  return (
    <div>
      <div
        role="group"
        aria-label="Filter articles by topic"
        className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:flex-wrap"
      >
        <button
          type="button"
          aria-pressed={active === ALL}
          onClick={() => setActive(ALL)}
          className={cn(chip(active === ALL), "shrink-0")}
        >
          All guides
          <span className="font-mono text-xs opacity-70">{posts.length}</span>
        </button>
        {topics.map((topic) => (
          <button
            key={topic.slug}
            type="button"
            aria-pressed={active === topic.slug}
            onClick={() => setActive(topic.slug)}
            className={cn(chip(active === topic.slug), "shrink-0")}
          >
            {topic.label}
            <span className="font-mono text-xs opacity-70">{topic.count}</span>
          </button>
        ))}
      </div>

      <p className="sr-only" aria-live="polite">
        Showing {visible.length} {visible.length === 1 ? "article" : "articles"}
      </p>

      <ul className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((post) => (
          <li key={post.slug} className="h-full">
            <PostCard post={post} />
          </li>
        ))}
      </ul>
    </div>
  );
}
