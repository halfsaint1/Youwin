import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";

import {
  destinationGuides,
  getDestinationGuide,
} from "@/lib/destination-guides";
import { site } from "@/lib/site";
import { UniversityPartnersMarquee } from "@/components/university-partners-marquee";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function generateStaticParams() {
  return destinationGuides.map((destination) => ({
    slug: destination.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const destination = getDestinationGuide(slug);

  if (!destination) return {};

  const description = `${destination.summary} Explore programmes, costs, visas and university partners with YouWin.`;

  return {
    title: `${destination.headline} from Nigeria`,
    description,
    keywords: destination.keywords,
    alternates: { canonical: `/destinations/${destination.slug}` },
    openGraph: {
      title: `${destination.headline} from Nigeria`,
      description,
      url: `/destinations/${destination.slug}`,
      images: [
        {
          url: `${site.url}${destination.image}`,
          alt: destination.imageAlt,
        },
      ],
    },
  };
}

export default async function DestinationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const destination = getDestinationGuide(slug);

  if (!destination) notFound();

  const destinationUrl = `${site.url}/destinations/${destination.slug}`;
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: destination.faq.map((item) => ({
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
      {
        "@type": "ListItem",
        position: 2,
        name: "Destinations",
        item: `${site.url}/destinations`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: destination.name,
        item: destinationUrl,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden border-b bg-cream">
        <div
          aria-hidden
          className="absolute -right-24 top-0 size-[28rem] rounded-full bg-brand-soft/70 blur-[100px]"
        />
        <div className="container-site relative grid items-center gap-10 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:py-20">
          <div>
            <nav
              aria-label="Breadcrumb"
              className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground"
            >
              <Link href="/" className="hover:text-brand">
                Home
              </Link>
              <span aria-hidden className="px-2">
                /
              </span>
              <Link href="/destinations" className="hover:text-brand">
                Destinations
              </Link>
              <span aria-hidden className="px-2">
                /
              </span>
              <span className="text-brand">{destination.shortName}</span>
            </nav>

            <div className="mt-7 flex items-center gap-3">
              <Image
                src={destination.flag}
                alt=""
                width={48}
                height={32}
                className="h-8 w-auto rounded-md shadow-sm"
              />
              <p className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-brand">
                Study destinations
              </p>
            </div>

            <h1 className="mt-5 max-w-xl text-balance text-[clamp(2.5rem,6vw,4.75rem)] font-bold leading-[0.98] tracking-[-0.04em] text-ink">
              {destination.headline}
            </h1>
            <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              {destination.summary}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/book-consultation">
                  Book Free Consultation
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="bg-white">
                <Link href="/apply">Start Application</Link>
              </Button>
            </div>
          </div>

          <div className="relative aspect-[5/4] overflow-hidden rounded-[2rem] shadow-soft sm:aspect-[4/3] lg:aspect-[5/4]">
            <Image
              src={destination.image}
              alt={destination.imageAlt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 46vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Why study */}
      <section className="container-site grid gap-10 py-16 sm:py-20 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <p className="eyebrow">Why {destination.shortName}?</p>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Why study in {destination.studyInLabel}?
          </h2>
        </div>
        <p className="max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
          {destination.whyStudy}
        </p>
      </section>

      {/* Highlights */}
      <section className="border-y bg-white">
        <div className="container-site grid sm:grid-cols-2 lg:grid-cols-4">
          {destination.highlights.map((item, index) => (
            <article
              key={item.label}
              className={`px-6 py-8 ${
                index > 0 ? "border-t sm:border-t-0 sm:border-l" : ""
              } ${index === 2 ? "lg:border-l" : ""}`}
            >
              <p className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-brand">
                {item.label}
              </p>
              <p className="mt-2 text-xl font-bold text-ink">{item.value}</p>
            </article>
          ))}
        </div>
      </section>

      {/* University partners marquee */}
      <UniversityPartnersMarquee partners={destination.partners} />

      {/* Programs */}
      <section className="container-site py-16 sm:py-20">
        <div className="max-w-2xl">
          <p className="eyebrow">Popular programmes</p>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Top programmes to study in {destination.studyInLabel}
          </h2>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {destination.programs.map((program) => (
            <article
              key={program.title}
              className="rounded-3xl border bg-white p-7 transition-colors hover:border-brand/25"
            >
              <h3 className="text-lg font-semibold text-ink">{program.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {program.detail}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="container-site py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p className="eyebrow">FAQs</p>
            <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              Common questions
            </h2>
          </div>
          <Accordion
            type="single"
            collapsible
            className="rounded-3xl border bg-white px-6"
          >
            {destination.faq.map((item, index) => (
              <AccordionItem key={item.question} value={`item-${index}`}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden border-t border-white/5 bg-[linear-gradient(160deg,#1b1d23_0%,#23262e_48%,#1f2a14_100%)]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-lime/50 to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 top-1/2 size-[32rem] -translate-y-1/2 rounded-full bg-brand/25 blur-[140px]"
        />
        <div className="container-site relative flex flex-col gap-10 py-20 sm:py-24 lg:flex-row lg:items-center lg:justify-between lg:gap-20">
          <div className="max-w-2xl">
            <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-lime/90">
              Free consultation
            </p>
            <h2 className="mt-5 text-balance text-[clamp(1.9rem,3.8vw,3.15rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-white">
              Let&apos;s plan your move to {destination.studyInLabel}
            </h2>
            <p className="mt-6 max-w-xl text-pretty text-[1.05rem] leading-[1.7] text-white/62">
              Share your background, budget, and preferred intake. We&apos;ll
              shortlist the right options, clarify costs, and outline the visa
              process clearly and without pressure.
            </p>
          </div>

          <div className="shrink-0">
            <Button
              asChild
              size="lg"
              variant="accent"
              className="h-14 px-9 text-[0.95rem] shadow-[0_12px_40px_-12px_rgba(184,244,81,0.55)] transition-transform duration-300 hover:-translate-y-0.5"
            >
              <Link href="/book-consultation">
                Book a free consultation
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
