import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { destinationComparisons } from "@/lib/destination-comparison";
import type { DestinationGuide } from "@/lib/destination-guides";
import { Button } from "@/components/ui/button";

export function DestinationComparison({
  destination,
}: {
  destination: DestinationGuide;
}) {
  const comparison = destinationComparisons[destination.slug];
  if (!comparison) return null;

  return (
    <>
      <section className="border-y bg-white">
        <div className="container-site grid gap-px bg-border sm:grid-cols-3">
          {(
            [
              ["International tuition", destination.costs.tuition],
              ["Living costs", destination.costs.living],
              ["Visa money", destination.costs.visa],
            ] as const
          ).map(([label, value]) => (
            <article key={label} className="bg-white px-6 py-8 sm:px-8">
              <p className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-brand">
                {label}
              </p>
              <p className="mt-2 text-pretty text-lg font-semibold leading-snug text-ink">
                {value}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="container-site py-16 sm:py-20">
        <div className="max-w-3xl">
          <p className="eyebrow">Compare courses</p>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Courses, fees, scholarships and intakes in {destination.studyInLabel}
          </h2>
          <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground">
            {comparison.feeNote}
          </p>
        </div>

        <ul className="mt-10 grid gap-4">
          {comparison.courses.map((course) => (
            <li
              key={`${course.university}-${course.course}`}
              className="rounded-3xl border bg-white p-5 sm:p-6"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <h3 className="text-lg font-semibold text-ink">{course.course}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {course.university}
                  </p>
                </div>
                <p className="shrink-0 text-base font-semibold text-brand sm:text-right">
                  {course.tuition}
                </p>
              </div>
              <dl className="mt-5 grid gap-4 border-t pt-5 sm:grid-cols-2 lg:grid-cols-4">
                {(
                  [
                    ["Length", course.duration],
                    ["Intakes", course.intakes],
                    ["Entry", course.requirements],
                    ["Scholarship", course.scholarship],
                  ] as const
                ).map(([label, value]) => (
                  <div key={label} className="min-w-0">
                    <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted-foreground">
                      {label}
                    </dt>
                    <dd className="mt-1 text-sm leading-relaxed text-ink">{value}</dd>
                  </div>
                ))}
              </dl>
            </li>
          ))}
        </ul>

        <div className="mt-8">
          <Button asChild>
            <Link href="/book-consultation">
              Check these against my results
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </Button>
        </div>
      </section>

      <section className="border-y bg-cream">
        <div className="container-site grid gap-12 py-16 sm:py-20 lg:grid-cols-3">
          <div>
            <p className="eyebrow">Intakes</p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-ink">
              When you can start
            </h2>
            <ul className="mt-6 space-y-5">
              {comparison.intakes.map((item) => (
                <li key={item.name}>
                  <p className="font-semibold text-ink">{item.name}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {item.detail}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow">Admission</p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-ink">
              What you need to qualify
            </h2>
            <ul className="mt-6 space-y-5">
              {comparison.requirements.map((item) => (
                <li key={item.label}>
                  <p className="font-semibold text-ink">{item.label}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {item.detail}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow">Scholarships</p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-ink">
              What can reduce the fee
            </h2>
            <ul className="mt-6 space-y-5">
              {comparison.scholarships.map((item) => (
                <li key={item.name}>
                  <p className="font-semibold text-ink">{item.name}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {item.detail}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
