import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  ChevronRight,
  Clock,
  ExternalLink,
  Info,
  Mail,
  Phone,
  RefreshCw,
} from "lucide-react";

import { site } from "@/lib/site";
import {
  getPost,
  getRelatedPosts,
  posts,
  type PostBlock,
} from "@/lib/posts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { WhatsAppIcon } from "@/components/social-icons";
import { ArticleToc, type TocItem } from "@/components/blog/article-toc";
import { PostCard } from "@/components/blog/post-card";
import { ReadingProgress } from "@/components/blog/reading-progress";
import { ShareButtons } from "@/components/blog/share-buttons";
import { CtaBand } from "@/components/sections/cta-band";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.keywords,
    alternates: { canonical: `/blog-news/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.dateISO,
      modifiedTime: post.updatedISO,
      authors: [post.author],
      images: [{ url: `${site.url}${post.image}`, alt: post.imageAlt }],
    },
  };
}

function headingId(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

function Block({ block }: { block: PostBlock }) {
  switch (block.type) {
    case "h2":
      return (
        <h2
          id={headingId(block.text)}
          className="mt-14 scroll-mt-28 text-balance text-2xl font-bold tracking-tight text-ink first:mt-0 sm:text-[1.875rem] sm:leading-tight"
        >
          {block.text}
        </h2>
      );
    case "h3":
      return (
        <h3 className="mt-9 text-xl font-semibold tracking-tight text-ink">
          {block.text}
        </h3>
      );
    case "p":
      return (
        <p className="mt-5 text-pretty text-[1.0625rem] leading-[1.8] text-ink/75">
          {block.text}
        </p>
      );
    case "ul":
      return (
        <ul className="mt-5 space-y-3">
          {block.items.map((item) => (
            <li
              key={item}
              className="flex gap-3.5 text-[1.0625rem] leading-[1.75] text-ink/75"
            >
              <span
                aria-hidden
                className="mt-3 size-1.5 shrink-0 rounded-full bg-brand"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="mt-6 space-y-4">
          {block.items.map((item, i) => (
            <li
              key={item}
              className="flex gap-4 text-[1.0625rem] leading-[1.75] text-ink/75"
            >
              <span
                aria-hidden
                className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-brand-soft font-mono text-xs font-semibold text-brand"
              >
                {i + 1}
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ol>
      );
    case "note":
      return (
        <aside className="mt-8 flex gap-4 rounded-2xl border border-brand/15 bg-brand-soft px-5 py-5 sm:px-6">
          <Info className="mt-0.5 size-5 shrink-0 text-brand" aria-hidden />
          <p className="leading-relaxed text-ink">{block.text}</p>
        </aside>
      );
  }
}

function ConsultationCard() {
  return (
    <div className="rounded-3xl bg-ink p-6 text-white">
      <p className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-lime">
        Free consultation
      </p>
      <p className="mt-3 text-lg font-semibold leading-snug">
        Not sure this applies to you? Talk it through with a YouWin adviser.
      </p>
      <Button asChild className="mt-5 w-full bg-lime text-ink hover:bg-lime/90">
        <Link href="/book-consultation">
          Book a free call <ArrowRight aria-hidden />
        </Link>
      </Button>
      <a
        href={site.whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 flex items-center justify-center gap-2 rounded-full border border-white/20 py-2.5 text-sm font-semibold transition-colors hover:bg-white/10"
      >
        <WhatsAppIcon className="size-4" aria-hidden />
        Chat on WhatsApp
      </a>
    </div>
  );
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const index = posts.findIndex((p) => p.slug === post.slug);
  const previousPost = posts[(index - 1 + posts.length) % posts.length];
  const nextPost = posts[(index + 1) % posts.length];
  const relatedPosts = getRelatedPosts(post.slug);
  const postUrl = `${site.url}/blog-news/${post.slug}`;
  const wasUpdated = post.updatedISO !== post.dateISO;

  const toc: TocItem[] = post.body
    .filter(
      (block): block is Extract<PostBlock, { type: "h2" }> =>
        block.type === "h2"
    )
    .map((block) => ({ id: headingId(block.text), text: block.text }));
  toc.push({ id: "faq", text: "Frequently asked questions" });

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: `${site.url}${post.image}`,
    datePublished: post.dateISO,
    dateModified: post.updatedISO,
    keywords: post.keywords.join(", "),
    author: { "@type": "Organization", name: post.author },
    publisher: {
      "@type": "EducationalOrganization",
      name: site.name,
      logo: { "@type": "ImageObject", url: `${site.url}/images/youwin-logo.png` },
    },
    mainEntityOfPage: postUrl,
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "Blog & News", item: `${site.url}/blog-news` },
      { "@type": "ListItem", position: 3, name: post.title },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <ReadingProgress />

      <article>
        <header className="relative overflow-hidden bg-cream">
          <div
            aria-hidden
            className="pointer-events-none absolute -left-32 -top-20 size-96 rounded-full bg-brand-soft blur-[110px]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-20 top-10 size-72 rounded-full bg-lime/20 blur-[100px]"
          />
          <div className="container-site relative pb-36 pt-10 sm:pb-44 sm:pt-14">
            <div className="mx-auto max-w-4xl animate-in fade-in slide-in-from-bottom-4 fill-mode-both duration-700">
              <nav aria-label="Breadcrumb">
                <ol className="flex flex-wrap items-center gap-1.5 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
                  <li>
                    <Link href="/" className="transition-colors hover:text-brand">
                      Home
                    </Link>
                  </li>
                  <li aria-hidden>
                    <ChevronRight className="size-3.5" />
                  </li>
                  <li>
                    <Link
                      href="/blog-news"
                      className="transition-colors hover:text-brand"
                    >
                      Blog &amp; News
                    </Link>
                  </li>
                  <li aria-hidden>
                    <ChevronRight className="size-3.5" />
                  </li>
                  <li aria-current="page" className="text-brand">
                    {post.category}
                  </li>
                </ol>
              </nav>

              <Badge className="mt-8">{post.category}</Badge>
              <h1 className="mt-4 text-balance text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.08] tracking-tight text-ink">
                {post.title}
              </h1>
              <p className="mt-5 max-w-3xl text-pretty text-lg leading-relaxed text-muted-foreground">
                {post.excerpt}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
                <p className="flex items-center gap-2.5 font-medium text-ink">
                  <span
                    aria-hidden
                    className="flex size-9 items-center justify-center rounded-full bg-brand font-mono text-[0.6875rem] font-semibold text-lime"
                  >
                    YW
                  </span>
                  {post.author}
                </p>
                <p className="flex items-center gap-1.5">
                  <CalendarDays className="size-4" aria-hidden />
                  <time dateTime={post.dateISO}>{post.date}</time>
                </p>
                {wasUpdated && (
                  <p className="flex items-center gap-1.5">
                    <RefreshCw className="size-4" aria-hidden />
                    Updated{" "}
                    <time dateTime={post.updatedISO}>
                      {formatDate(post.updatedISO)}
                    </time>
                  </p>
                )}
                <p className="flex items-center gap-1.5">
                  <Clock className="size-4" aria-hidden />
                  {post.readingTime}
                </p>
              </div>
            </div>
          </div>
        </header>

        <div className="container-site">
          <div className="relative mx-auto -mt-28 aspect-[16/9] max-w-5xl overflow-hidden rounded-[2rem] bg-muted shadow-[0_30px_70px_-25px_rgba(27,29,35,0.35)] sm:-mt-36">
            <Image
              src={post.image}
              alt={post.imageAlt}
              fill
              priority
              sizes="(max-width: 1100px) 100vw, 1024px"
              className="object-cover"
            />
          </div>
        </div>

        <div className="container-site py-14 sm:py-20">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-16">
            <div className="min-w-0 max-w-3xl">
              <details className="group rounded-2xl border bg-muted/40 lg:hidden">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-semibold text-ink [&::-webkit-details-marker]:hidden">
                  In this guide
                  <ChevronRight
                    className="size-4 text-brand transition-transform group-open:rotate-90"
                    aria-hidden
                  />
                </summary>
                <ol className="space-y-2 border-t px-5 py-4 text-sm">
                  {toc.map((item, i) => (
                    <li key={item.id} className="flex gap-3">
                      <span className="font-mono text-xs text-brand">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <a
                        href={`#${item.id}`}
                        className="text-muted-foreground transition-colors hover:text-brand"
                      >
                        {item.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </details>

              <div className="mt-10 lg:mt-0">
                {post.body.map((block, i) => (
                  <Block key={i} block={block} />
                ))}
              </div>

              <section id="faq" className="mt-16 scroll-mt-28">
                <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-[1.875rem]">
                  Frequently asked questions
                </h2>
                <Accordion
                  type="single"
                  collapsible
                  className="mt-6 rounded-3xl border bg-white px-6 sm:px-8"
                >
                  {post.faq.map((item, i) => (
                    <AccordionItem key={item.question} value={`faq-${i}`}>
                      <AccordionTrigger>{item.question}</AccordionTrigger>
                      <AccordionContent>{item.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </section>

              <section className="mt-12 rounded-3xl border bg-cream p-7 sm:p-8">
                <h2 className="text-lg font-bold text-ink">Official sources</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Rules and deadlines can change. Confirm current details with
                  these primary sources before applying.
                </p>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {post.sources.map((source) => (
                    <li key={source.url}>
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-full items-start justify-between gap-3 rounded-xl border bg-white px-4 py-3 text-sm font-medium text-ink transition-colors hover:border-brand/30 hover:text-brand"
                      >
                        {source.label}
                        <ExternalLink
                          className="mt-0.5 size-3.5 shrink-0 text-brand"
                          aria-hidden
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              </section>

              {post.relatedLinks.length > 0 && (
                <section className="mt-12">
                  <h2 className="text-lg font-bold text-ink">
                    Continue your research
                  </h2>
                  <ul className="mt-4 divide-y border-y">
                    {post.relatedLinks.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className="group flex items-center justify-between gap-4 py-4 font-medium text-ink transition-colors hover:text-brand"
                        >
                          {item.label}
                          <ArrowRight
                            className="size-4 shrink-0 text-brand transition-transform group-hover:translate-x-1"
                            aria-hidden
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              <div className="mt-12 flex flex-wrap items-center justify-between gap-4 rounded-2xl border px-6 py-5">
                <p className="font-semibold text-ink">
                  Found this useful? Share it with a friend.
                </p>
                <ShareButtons url={postUrl} title={post.title} />
              </div>

              <aside className="mt-12 rounded-3xl bg-brand-soft p-7 sm:p-10">
                <h2 className="text-xl font-bold text-ink sm:text-2xl">
                  Ready to start your application?
                </h2>
                <p className="mt-2 max-w-xl leading-relaxed text-muted-foreground">
                  Our consultants can review your profile and give you a clear,
                  honest plan. The first consultation is free.
                </p>
                <div className="mt-5 flex flex-wrap gap-x-8 gap-y-3 text-sm font-medium text-ink">
                  <a
                    href={`tel:${site.phones[1].replace(/\s/g, "")}`}
                    className="flex items-center gap-2 transition-colors hover:text-brand"
                  >
                    <Phone className="size-4 text-brand" aria-hidden />
                    {site.phones[1]}
                  </a>
                  <a
                    href={`mailto:${site.email}`}
                    className="flex items-center gap-2 transition-colors hover:text-brand"
                  >
                    <Mail className="size-4 text-brand" aria-hidden />
                    {site.email}
                  </a>
                </div>
                <Button asChild className="mt-6">
                  <Link href="/book-consultation">
                    Book Free Consultation <ArrowRight aria-hidden />
                  </Link>
                </Button>
              </aside>

              <nav
                aria-label="Article navigation"
                className="mt-12 grid gap-4 border-t pt-8 sm:grid-cols-2"
              >
                <Link
                  href={`/blog-news/${previousPost.slug}`}
                  className="group rounded-2xl border p-5 transition-colors hover:border-brand/30"
                >
                  <span className="flex items-center gap-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-muted-foreground">
                    <ArrowLeft className="size-3.5" aria-hidden /> Previous
                  </span>
                  <span className="mt-2 block font-semibold leading-snug text-ink transition-colors group-hover:text-brand">
                    {previousPost.title}
                  </span>
                </Link>
                <Link
                  href={`/blog-news/${nextPost.slug}`}
                  className="group rounded-2xl border p-5 text-right transition-colors hover:border-brand/30"
                >
                  <span className="flex items-center justify-end gap-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-muted-foreground">
                    Next <ArrowRight className="size-3.5" aria-hidden />
                  </span>
                  <span className="mt-2 block font-semibold leading-snug text-ink transition-colors group-hover:text-brand">
                    {nextPost.title}
                  </span>
                </Link>
              </nav>
            </div>

            <aside className="hidden lg:block">
              <div className="sticky top-28 space-y-8">
                <nav aria-label="Table of contents">
                  <p className="mb-4 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted-foreground">
                    In this guide
                  </p>
                  <ArticleToc items={toc} />
                </nav>
                <div>
                  <p className="mb-3 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted-foreground">
                    Share
                  </p>
                  <ShareButtons url={postUrl} title={post.title} />
                </div>
                <ConsultationCard />
              </div>
            </aside>
          </div>
        </div>
      </article>

      <section className="border-t bg-cream">
        <div className="container-site py-16 sm:py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Keep reading</p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                More guides for your journey
              </h2>
            </div>
            <Button asChild variant="outline">
              <Link href="/blog-news">
                All articles <ArrowRight aria-hidden />
              </Link>
            </Button>
          </div>
          <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {relatedPosts.map((related) => (
              <li key={related.slug} className="h-full">
                <PostCard post={related} headingLevel="h3" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
