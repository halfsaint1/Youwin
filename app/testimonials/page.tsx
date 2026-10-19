import type { Metadata } from "next";
import Image from "next/image";
import { Quote, Star } from "lucide-react";

import { caseStudies, homeTestimonials } from "@/lib/content";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { Stagger, StaggerItem } from "@/components/motion";
import { Badge } from "@/components/ui/badge";
import { CtaBand } from "@/components/sections/cta-band";

export const metadata: Metadata = {
  title: "Student Success Stories",
  description:
    "Real stories from YouWin students now studying in the UK, Ireland, Canada, and Australia, from first consultation to visa approval and beyond.",
  alternates: { canonical: "/testimonials" },
};

function TestimonialCard({
  quote,
  name,
  role,
  country,
  tags,
  image,
}: (typeof caseStudies)[number]) {
  return (
    <figure className="flex h-full flex-col rounded-3xl border bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-brand/20 hover:shadow-[0_16px_40px_rgba(45,90,5,0.10)]">
      <div className="flex items-center justify-between">
        <Quote
          className="size-8 fill-brand-soft text-brand-soft"
          aria-hidden
        />
        <span className="flex gap-0.5 text-brand" aria-label="5 out of 5 stars">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="size-3.5 fill-current" aria-hidden />
          ))}
        </span>
      </div>
      <blockquote className="mt-5 flex-1 text-pretty leading-relaxed text-ink">
        “{quote}”
      </blockquote>
      <figcaption className="mt-6 border-t pt-5">
        <div className="flex items-center gap-4">
          {image && (
            <div className="relative size-14 shrink-0 overflow-hidden rounded-full ring-2 ring-brand-soft">
              <Image
                src={image}
                alt={`Portrait of ${name}`}
                fill
                sizes="56px"
                className="object-cover object-top"
              />
            </div>
          )}
          <div>
            <p className="font-semibold text-ink">{name}</p>
            <p className="mt-0.5 text-sm text-muted-foreground">
              {role} · {country}
            </p>
          </div>
        </div>
        <div className="mt-3.5 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
      </figcaption>
    </figure>
  );
}

export default function TestimonialsPage() {
  return (
    <>
      <PageHero
        breadcrumb="Testimonials"
        title="What Our Students Say"
        description="Real journeys, real approvals, from first consultation to arrival day."
      />

      <section className="container-site py-20 sm:py-24">
        <SectionHeading
          eyebrow="Case Overview"
          title="Student Case Studies"
          description="A closer look at how we guided these students from application to arrival."
        />
        <Stagger className="mt-14 grid gap-6 md:grid-cols-2">
          {caseStudies.map((t) => (
            <StaggerItem key={t.name} className="h-full">
              <TestimonialCard {...t} />
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className="bg-sand">
        <div className="container-site py-20 sm:py-24">
          <SectionHeading
            eyebrow="More Stories"
            title="Trusted by Students and Families"
          />
          <Stagger className="mt-14 grid gap-6 md:grid-cols-2">
            {homeTestimonials.map((t) => (
              <StaggerItem key={t.name} className="h-full">
                <TestimonialCard {...t} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
