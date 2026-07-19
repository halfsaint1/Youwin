import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { services } from "@/lib/content";
import { site } from "@/lib/site";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/motion";
import { Roadmap } from "@/components/sections/roadmap";
import { CtaBand } from "@/components/sections/cta-band";
import { Faq } from "@/components/sections/faq";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Study Abroad Services — Admissions, Visas & Scholarships",
  description:
    "Get expert support at every stage: university & course selection, application support, student visa assistance, scholarship guidance, career guidance, and pre & post-arrival support.",
  alternates: { canonical: "/services" },
};

const servicesJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "YouWin Educational Consulting Services",
  itemListElement: services.map((service, i) => ({
    "@type": "Service",
    position: i + 1,
    name: service.title,
    description: service.description,
    provider: { "@type": "EducationalOrganization", name: site.name, url: site.url },
    url: `${site.url}/services#${service.slug}`,
  })),
};

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesJsonLd) }}
      />
      <PageHero
        breadcrumb="Services"
        title="Get Expert Support at Every Stage"
        description="From choosing the right course to settling into your new city — one dedicated team, end to end."
      />

      <section className="container-site py-20 sm:py-24">
        <div className="grid gap-6">
          {services.map((service, index) => (
            <Reveal key={service.slug}>
              <article
                id={service.slug}
                className="group grid scroll-mt-28 items-center gap-8 rounded-[2rem] border bg-white p-8 transition-all duration-300 hover:border-brand/20 hover:shadow-[0_16px_40px_rgba(45,90,5,0.08)] sm:p-10 lg:grid-cols-[auto_1fr_auto]"
              >
                <div className="flex items-center gap-6">
                  <span className="font-mono text-sm text-muted-foreground/60">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="flex size-16 items-center justify-center rounded-2xl bg-brand-soft text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-lime">
                    <service.icon className="size-7" aria-hidden />
                  </span>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-ink sm:text-2xl">
                    {service.title}
                  </h2>
                  <p className="mt-2.5 max-w-2xl leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>
                </div>
                <Button
                  asChild
                  variant="outline"
                  className="justify-self-start lg:justify-self-end"
                >
                  <Link href="/apply">
                    Apply Now <ArrowRight className="size-4" aria-hidden />
                  </Link>
                </Button>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <Roadmap />
      <Faq />
      <CtaBand />
    </>
  );
}
