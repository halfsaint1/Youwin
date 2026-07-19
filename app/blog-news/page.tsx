import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarDays, UserRound } from "lucide-react";

import { posts } from "@/lib/posts";
import { PageHero } from "@/components/page-hero";
import { Stagger, StaggerItem } from "@/components/motion";
import { Badge } from "@/components/ui/badge";
import { CtaBand } from "@/components/sections/cta-band";

export const metadata: Metadata = {
  title: "Study Abroad Guides for Nigerian Students",
  description:
    "Current study abroad guides for Nigerian students covering UK and Canada visas, scholarships, course selection and safe application planning.",
  alternates: { canonical: "/blog-news" },
};

export default function BlogPage() {
  return (
    <>
      <PageHero
        breadcrumb="Blog & News"
        title="Study Abroad Guides for Nigerian Students"
        description="Practical, source-checked guidance on admissions, visas, scholarships and choosing the right course."
        wrapTitle
      />

      <section className="container-site py-20 sm:py-24">
        <Stagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <StaggerItem key={post.slug} className="h-full">
              <article className="group relative flex h-full flex-col rounded-3xl border bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-brand/20 hover:shadow-[0_16px_40px_rgba(45,90,5,0.10)]">
                <Badge className="self-start">{post.category}</Badge>
                <h2 className="mt-5 text-xl font-semibold leading-snug text-ink">
                  <Link
                    href={`/blog-news/${post.slug}`}
                    className="transition-colors after:absolute after:inset-0 group-hover:text-brand focus-visible:outline-none"
                  >
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {post.excerpt}
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 border-t pt-5 text-xs text-muted-foreground">
                  <p className="flex items-center gap-1.5">
                    <UserRound className="size-3.5" aria-hidden />
                    {post.author}
                  </p>
                  <p className="flex items-center gap-1.5">
                    <CalendarDays className="size-3.5" aria-hidden />
                    <time dateTime={post.dateISO}>{post.date}</time>
                  </p>
                  <p>{post.readingTime}</p>
                </div>
                <p className="mt-5 flex items-center gap-1.5 text-sm font-semibold text-brand">
                  Read Article
                  <ArrowRight
                    className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden
                  />
                </p>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <CtaBand />
    </>
  );
}
