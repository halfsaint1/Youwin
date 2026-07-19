import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { site } from "@/lib/site";

export function PageHero({
  title,
  description,
  breadcrumb,
  withBreadcrumbSchema = true,
  titleVisible = true,
  wrapTitle = false,
}: {
  title: string;
  description?: string;
  breadcrumb: string;
  /** Disable when the page emits its own richer BreadcrumbList. */
  withBreadcrumbSchema?: boolean;
  /** Set false to hide the H1 visually while keeping it in the document. */
  titleVisible?: boolean;
  /** Allow longer titles, such as article headlines, to wrap on small screens. */
  wrapTitle?: boolean;
}) {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: breadcrumb },
    ],
  };

  return (
    <section className="relative overflow-hidden border-b bg-cream">
      {withBreadcrumbSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
      )}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 -top-20 size-96 rounded-full bg-brand-soft blur-[110px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 bottom-0 size-72 rounded-full bg-lime/20 blur-[100px]"
      />
      <div className="container-site relative py-8 sm:py-10">
        {/* CSS-only entrance keeps the H1 visible in server-rendered HTML */}
        <div className="animate-in fade-in slide-in-from-bottom-4 fill-mode-both duration-700">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
              <li>
                <Link href="/" className="transition-colors hover:text-brand">
                  Home
                </Link>
              </li>
              <li aria-hidden>
                <ChevronRight className="size-3.5" />
              </li>
              <li aria-current="page" className="text-brand">
                {breadcrumb}
              </li>
            </ol>
          </nav>
          <div
            className={
              titleVisible
                ? "mt-4 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                : undefined
            }
          >
            <h1
              className={
                titleVisible
                  ? `${wrapTitle ? "text-balance" : "whitespace-nowrap"} text-[clamp(1.25rem,3.5vw,2.5rem)] font-bold leading-tight tracking-tight text-ink`
                  : "sr-only"
              }
            >
              {title}
            </h1>
          </div>
          {description && (
            <p className="mt-2 max-w-2xl text-pretty text-sm leading-snug text-muted-foreground sm:text-base">
              {description}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
