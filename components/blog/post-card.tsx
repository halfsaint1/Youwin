import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";

import type { PostSummary } from "@/lib/posts";
import { Badge } from "@/components/ui/badge";

export function PostCard({
  post,
  headingLevel = "h2",
}: {
  post: PostSummary;
  headingLevel?: "h2" | "h3";
}) {
  const Heading = headingLevel;
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border bg-white transition-all duration-300 hover:-translate-y-1 hover:border-brand/20 hover:shadow-[0_16px_40px_rgba(45,90,5,0.10)]">
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        <Image
          src={post.image}
          alt={post.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
        <Badge className="absolute left-4 top-4 bg-white/95 shadow-sm backdrop-blur">
          {post.category}
        </Badge>
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <p className="flex items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-muted-foreground">
          <time dateTime={post.dateISO}>{post.date}</time>
          <span aria-hidden>·</span>
          <span className="flex items-center gap-1">
            <Clock className="size-3" aria-hidden />
            {post.readingTime}
          </span>
        </p>
        <Heading className="mt-3 text-balance text-xl font-semibold leading-snug tracking-tight text-ink transition-colors group-hover:text-brand">
          <Link
            href={`/blog-news/${post.slug}`}
            className="after:absolute after:inset-0 focus-visible:outline-none"
          >
            {post.title}
          </Link>
        </Heading>
        <p className="mt-3 line-clamp-3 flex-1 text-pretty text-sm leading-relaxed text-muted-foreground">
          {post.excerpt}
        </p>
        <p className="mt-6 flex items-center justify-between border-t pt-5 text-sm">
          <span className="text-muted-foreground">{post.author}</span>
          <span className="flex size-9 items-center justify-center rounded-full border text-muted-foreground transition-all duration-300 group-hover:border-brand group-hover:bg-brand group-hover:text-white">
            <ArrowUpRight className="size-4" aria-hidden />
          </span>
        </p>
      </div>
    </article>
  );
}
