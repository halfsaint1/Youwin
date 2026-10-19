import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, Mail } from "lucide-react";

import { posts, toSummary } from "@/lib/posts";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/motion";
import { Badge } from "@/components/ui/badge";
import { BlogGrid } from "@/components/blog/blog-grid";
import { NewsletterForm } from "@/components/newsletter-form";
import { CtaBand } from "@/components/sections/cta-band";

export const metadata: Metadata = {
  title: "Study Abroad Guides for Nigerian Students",
  description:
    "Current study abroad guides for Nigerian students covering UK and Canada visas, scholarships, course selection and safe application planning.",
  alternates: { canonical: "/blog-news" },
};

export default function BlogPage() {
  const summaries = posts.map(toSummary);
  const featured = summaries[0];

  return (
    <>
      <PageHero
        breadcrumb="Blog & News"
        title="Study Abroad Guides for Nigerian Students"
        description="Practical, source-checked guidance on admissions, visas, scholarships and choosing the right course."
        wrapTitle
      />

      <section className="container-site pt-14 sm:pt-20">
        <Reveal>
          <article className="group relative grid overflow-hidden rounded-[2rem] border bg-white transition-shadow duration-300 hover:shadow-[0_24px_60px_-20px_rgba(45,90,5,0.18)] lg:grid-cols-[1.15fr_1fr]">
            <div className="relative aspect-[16/10] overflow-hidden bg-muted lg:aspect-auto lg:min-h-[26rem]">
              <Image
                src={featured.image}
                alt={featured.imageAlt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
            </div>
            <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="accent">Featured guide</Badge>
                <Badge>{featured.category}</Badge>
              </div>
              <h2 className="mt-5 text-balance text-2xl font-bold leading-tight tracking-tight text-ink sm:text-3xl lg:text-4xl">
                <Link
                  href={`/blog-news/${featured.slug}`}
                  className="transition-colors after:absolute after:inset-0 group-hover:text-brand focus-visible:outline-none"
                >
                  {featured.title}
                </Link>
              </h2>
              <p className="mt-4 text-pretty leading-relaxed text-muted-foreground sm:text-lg">
                {featured.excerpt}
              </p>
              <p className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground">
                <span>{featured.author}</span>
                <span aria-hidden>·</span>
                <time dateTime={featured.dateISO}>{featured.date}</time>
                <span aria-hidden>·</span>
                <span className="flex items-center gap-1">
                  <Clock className="size-3" aria-hidden />
                  {featured.readingTime}
                </span>
              </p>
              <p className="mt-8 flex items-center gap-2 font-semibold text-brand">
                Read the guide
                <ArrowRight
                  className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden
                />
              </p>
            </div>
          </article>
        </Reveal>
      </section>

      <section
        aria-labelledby="all-guides-heading"
        className="container-site py-16 sm:py-20"
      >
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Browse by topic</p>
            <h2
              id="all-guides-heading"
              className="mt-2 text-2xl font-bold tracking-tight text-ink sm:text-3xl"
            >
              Latest guides
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            Every guide links to official sources, so you can confirm rules
            and deadlines before you apply.
          </p>
        </div>
        <BlogGrid posts={summaries} featuredSlug={featured.slug} />
      </section>

      <section className="container-site pb-20 sm:pb-24">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-ink px-7 py-10 sm:px-12 sm:py-14">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-brand/60 blur-[90px]"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-24 left-1/3 size-64 rounded-full bg-lime/15 blur-[90px]"
            />
            <div className="relative grid items-center gap-8 lg:grid-cols-[1fr_auto] lg:gap-16">
              <div>
                <span className="flex size-12 items-center justify-center rounded-full bg-lime text-ink">
                  <Mail className="size-5" aria-hidden />
                </span>
                <h2 className="mt-5 text-balance text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  Get new guides and deadline reminders
                </h2>
                <p className="mt-3 max-w-xl text-pretty leading-relaxed text-white/70">
                  Visa rule changes, scholarship openings and intake deadlines
                  for Nigerian students, sent straight to your inbox.
                </p>
              </div>
              <NewsletterForm id="blog-newsletter-email" />
            </div>
          </div>
        </Reveal>
      </section>

      <CtaBand />
    </>
  );
}
