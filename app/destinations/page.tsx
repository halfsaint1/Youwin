import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { destinationGuides } from "@/lib/destination-guides";
import { PageHero } from "@/components/page-hero";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Study Abroad Destinations for Nigerian Students",
  description:
    "Compare studying in the UK, Ireland, USA, Canada and Australia. Explore current entry requirements, costs, student visas, work rights and post-study options.",
  alternates: { canonical: "/destinations" },
};

export default function DestinationsPage() {
  return (
    <>
      <PageHero
        breadcrumb="Destinations"
        title="Choose a Destination That Fits Your Future"
        description="Compare the real requirements, costs and opportunities before deciding where to study."
        wrapTitle
      />

      <section className="container-site py-20 sm:py-24">
        <div className="grid gap-6 lg:grid-cols-2">
          {destinationGuides.map((destination, index) => (
            <article
              key={destination.slug}
              className={`group relative min-h-[30rem] overflow-hidden rounded-[2rem] ${
                index === 0 ? "lg:col-span-2 lg:min-h-[34rem]" : ""
              }`}
            >
              <Image
                src={destination.image}
                alt={destination.imageAlt}
                fill
                priority={index === 0}
                sizes={index === 0 ? "100vw" : "(max-width: 1024px) 100vw, 50vw"}
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/35 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-7 text-white sm:p-9">
                <div className="flex items-center gap-3">
                  <Image
                    src={destination.flag}
                    alt=""
                    width={42}
                    height={28}
                    className="h-7 w-auto rounded shadow-sm"
                  />
                  <Badge className="border-white/20 bg-white/10 text-white">
                    {destination.partners.length}+ partner institutions
                  </Badge>
                </div>
                <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
                  {destination.name}
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/75 sm:text-base">
                  {destination.summary}
                </p>
                <Link
                  href={`/destinations/${destination.slug}`}
                  className="mt-6 inline-flex items-center gap-2 font-semibold text-lime after:absolute after:inset-0"
                >
                  Explore {destination.shortName}
                  <ArrowUpRight className="size-4" aria-hidden />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-14 rounded-3xl border bg-cream p-8 text-center sm:p-12">
          <h2 className="text-2xl font-bold text-ink sm:text-3xl">
            Not sure which country fits your profile?
          </h2>
          <p className="mx-auto mt-3 max-w-2xl leading-relaxed text-muted-foreground">
            We compare your qualifications, total budget, preferred course and
            career direction before recommending a destination.
          </p>
          <Button asChild size="lg" className="mt-7">
            <Link href="/book-consultation">
              Compare My Options
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
