import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  ExternalLink,
  Mail,
  Phone,
  UserRound,
} from "lucide-react";

import { site } from "@/lib/site";
import { getPost, posts, type PostBlock } from "@/lib/posts";
import { PageHero } from "@/components/page-hero";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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

function Block({ block }: { block: PostBlock }) {
  switch (block.type) {
    case "h2":
      return (
        <h2
          id={headingId(block.text)}
          className="scroll-mt-28 mt-12 text-balance text-2xl font-bold tracking-tight text-ink sm:text-3xl"
        >
          {block.text}
        </h2>
      );
    case "h3":
      return (
        <h3 className="mt-10 text-xl font-semibold text-ink">{block.text}</h3>
      );
    case "p":
      return (
        <p className="mt-5 leading-relaxed text-muted-foreground">{block.text}</p>
      );
    case "ul":
      return (
        <ul className="mt-5 space-y-3">
          {block.items.map((item) => (
            <li key={item} className="flex gap-3 leading-relaxed text-muted-foreground">
              <span
                aria-hidden
                className="mt-2.5 size-1.5 shrink-0 rounded-full bg-brand"
              />
              {item}
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="mt-5 list-decimal space-y-3 pl-6 marker:font-semibold marker:text-brand">
          {block.items.map((item) => (
            <li key={item} className="pl-1 leading-relaxed text-muted-foreground">
              {item}
            </li>
          ))}
        </ol>
      );
    case "note":
      return (
        <aside className="mt-6 rounded-2xl border-l-4 border-brand bg-brand-soft px-6 py-5 leading-relaxed text-ink">
          {block.text}
        </aside>
      );
  }
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
  const nextPost = posts[(index + 1) % posts.length];

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
    mainEntityOfPage: `${site.url}/blog-news/${post.slug}`,
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
      <PageHero
        breadcrumb={post.category}
        title={post.title}
        withBreadcrumbSchema={false}
        wrapTitle
      />

      <article>
        <figure className="container-site pt-10 sm:pt-12">
          <div className="relative mx-auto aspect-[16/9] max-w-4xl overflow-hidden rounded-3xl bg-muted shadow-[0_20px_50px_rgba(45,90,5,0.12)]">
            <Image
              src={post.image}
              alt={post.imageAlt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 896px"
              className="object-cover"
            />
          </div>
          <figcaption className="mx-auto mt-3 max-w-4xl text-center text-xs text-muted-foreground">
            {post.imageAlt}
          </figcaption>
        </figure>

        <div className="container-site py-12 sm:py-16">
        <div className="mx-auto max-w-3xl">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3 border-b pb-8 text-sm text-muted-foreground">
            <Badge>{post.category}</Badge>
            <p className="flex items-center gap-1.5">
              <UserRound className="size-4" aria-hidden />
              {post.author}
            </p>
            <p className="flex items-center gap-1.5">
              <CalendarDays className="size-4" aria-hidden />
              <time dateTime={post.dateISO}>{post.date}</time>
            </p>
            <p>{post.readingTime}</p>
          </div>

          <nav
            aria-label="Table of contents"
            className="mt-8 rounded-2xl border bg-muted/30 p-6"
          >
            <h2 className="font-semibold text-ink">In this guide</h2>
            <ul className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
              {post.body
                .filter(
                  (block): block is Extract<PostBlock, { type: "h2" }> =>
                    block.type === "h2"
                )
                .map((block) => (
                  <li key={block.text}>
                    <a
                      href={`#${headingId(block.text)}`}
                      className="text-muted-foreground transition-colors hover:text-brand"
                    >
                      {block.text}
                    </a>
                  </li>
                ))}
            </ul>
          </nav>

          {post.body.map((block, i) => (
            <Block key={i} block={block} />
          ))}

          <section className="mt-14 border-t pt-10">
            <h2 className="text-2xl font-bold tracking-tight text-ink">
              Frequently asked questions
            </h2>
            <div className="mt-6 space-y-6">
              {post.faq.map((item) => (
                <div key={item.question}>
                  <h3 className="font-semibold text-ink">{item.question}</h3>
                  <p className="mt-2 leading-relaxed text-muted-foreground">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-12 rounded-3xl border bg-muted/20 p-7 sm:p-8">
            <h2 className="text-xl font-bold text-ink">Official sources</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Rules and deadlines can change. Confirm current details with these
              primary sources before applying.
            </p>
            <ul className="mt-5 space-y-3">
              {post.sources.map((source) => (
                <li key={source.url}>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-start gap-2 text-sm font-medium text-brand hover:underline"
                  >
                    {source.label}
                    <ExternalLink className="mt-0.5 size-3.5 shrink-0" aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-12">
            <h2 className="text-xl font-bold text-ink">Continue your research</h2>
            <ul className="mt-4 space-y-3">
              {post.relatedLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-2 font-medium text-brand hover:underline"
                  >
                    {item.label}
                    <ArrowRight className="size-4" aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* Contact strip */}
          <aside className="mt-14 rounded-3xl bg-brand-soft p-8 sm:p-10">
            <h2 className="text-xl font-bold text-ink">
              Reach out to our consultants
            </h2>
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
                Book Free Consultation{" "}
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </Button>
          </aside>

          <nav
            aria-label="Article navigation"
            className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t pt-8"
          >
            <Button asChild variant="ghost">
              <Link href="/blog-news">
                <ArrowLeft className="size-4" aria-hidden /> All Articles
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href={`/blog-news/${nextPost.slug}`}>
                Next: {nextPost.category}
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </Button>
          </nav>
        </div>
        </div>
      </article>

      <CtaBand />
    </>
  );
}
