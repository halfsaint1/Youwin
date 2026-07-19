import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { homepagePosts } from "@/lib/posts";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { Button } from "@/components/ui/button";

export function BlogPreview() {
  return (
    <section className="bg-white">
      <div className="container-site py-20 sm:py-28">
        <Reveal className="flex flex-wrap items-end justify-between gap-6 border-b pb-8">
          <div>
            <p className="eyebrow">Blog &amp; News</p>
            <h2 className="text-heading mt-3 max-w-xl text-balance text-ink">
              Stories, Guides &amp; Immigration Know-How
            </h2>
          </div>
          <p className="max-w-sm text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
            Expand your opportunities and build a future abroad with top
            immigration-friendly countries.
          </p>
        </Reveal>

        <Stagger gap={0.06}>
          <ul>
            {homepagePosts.map((post) => (
              <li key={post.slug} className="border-b">
                <StaggerItem>
                  <Link
                    href={`/blog-news/${post.slug}`}
                    className="group grid items-center gap-6 py-7 transition-colors duration-300 hover:bg-brand-soft/40 focus-visible:bg-brand-soft/40 focus-visible:outline-none sm:grid-cols-[15rem_1fr_auto] sm:gap-8 lg:grid-cols-[18rem_1fr_auto]"
                  >
                    {/* Featured image */}
                    <div className="relative aspect-[16/10] overflow-hidden rounded-2xl">
                      <Image
                        src={post.image}
                        alt={post.imageAlt}
                        fill
                        sizes="(max-width: 640px) 100vw, 18rem"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                      />
                    </div>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                        <span className="rounded-full bg-brand-soft px-3 py-1 font-mono text-[0.625rem] font-medium uppercase tracking-[0.1em] text-brand">
                          {post.category}
                        </span>
                        <p className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-muted-foreground/70">
                          {post.date} · {post.readingTime}
                        </p>
                      </div>
                      <h3 className="mt-2.5 max-w-2xl text-balance text-xl font-semibold leading-snug tracking-tight text-ink transition-colors duration-300 group-hover:text-brand sm:text-2xl">
                        {post.title}
                      </h3>
                      <p className="mt-2 hidden max-w-xl text-pretty text-sm leading-relaxed text-muted-foreground md:line-clamp-2 md:block">
                        {post.excerpt}
                      </p>
                    </div>

                    <span className="hidden size-13 shrink-0 items-center justify-center self-center rounded-full border border-border text-muted-foreground transition-all duration-300 group-hover:border-brand group-hover:bg-brand group-hover:text-white sm:flex">
                      <ArrowUpRight className="size-5" aria-hidden />
                      <span className="sr-only">Read {post.title}</span>
                    </span>
                  </Link>
                </StaggerItem>
              </li>
            ))}
          </ul>
        </Stagger>

        <Reveal className="mt-12 flex justify-center">
          <Button asChild variant="outline" size="lg">
            <Link href="/blog-news">
              View All Articles <ArrowRight className="size-4" aria-hidden />
            </Link>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
