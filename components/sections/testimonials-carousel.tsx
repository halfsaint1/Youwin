"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, BadgeCheck, Quote, Star } from "lucide-react";

import { carouselTestimonials } from "@/lib/content";
import { Badge } from "@/components/ui/badge";

export function TestimonialsCarousel() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const reduce = useReducedMotion();
  const testimonial = carouselTestimonials[index];

  const go = useCallback((dir: number) => {
    setDirection(dir);
    setIndex(
      (i) =>
        (i + dir + carouselTestimonials.length) % carouselTestimonials.length
    );
  }, []);

  useEffect(() => {
    if (reduce) return;
    const timer = setInterval(() => go(1), 8000);
    return () => clearInterval(timer);
  }, [go, index, reduce]);

  return (
    <section className="border-y bg-sand">
      <div className="container-site grid gap-12 py-24 sm:py-32 lg:grid-cols-[0.68fr_1.32fr] lg:gap-20">
        {/* Left rail */}
        <div className="flex flex-col justify-between gap-10">
          <div>
            <p className="eyebrow">Testimonials</p>
            <h2 className="text-heading mt-4 text-balance text-ink">
              What Our Students Say
            </h2>
            <p className="mt-5 max-w-sm text-pretty leading-relaxed text-muted-foreground">
              Real journeys, real approvals, in our students&apos; own words.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => go(-1)}
              aria-label="Previous testimonial"
              className="flex size-12 items-center justify-center rounded-full border bg-white text-ink transition-all hover:border-brand hover:bg-brand hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <ArrowLeft className="size-5" aria-hidden />
            </button>
            <button
              onClick={() => go(1)}
              aria-label="Next testimonial"
              className="flex size-12 items-center justify-center rounded-full border bg-white text-ink transition-all hover:border-brand hover:bg-brand hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <ArrowRight className="size-5" aria-hidden />
            </button>
            <p
              className="ml-2 font-mono text-xs tracking-[0.2em] text-muted-foreground"
              aria-live="polite"
            >
              {String(index + 1).padStart(2, "0")} /{" "}
              {String(carouselTestimonials.length).padStart(2, "0")}
            </p>
          </div>
        </div>

        {/* Featured story card */}
        <div className="relative overflow-hidden rounded-[2rem] border bg-white shadow-[0_1px_2px_rgba(27,29,35,0.04)]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.figure
              key={testimonial.name + index}
              initial={reduce ? false : { opacity: 0, x: 48 * direction }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduce ? undefined : { opacity: 0, x: -48 * direction }}
              transition={{ duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="grid sm:grid-cols-[0.4fr_0.6fr]"
            >
              {/* Portrait panel */}
              <div className="relative min-h-56 sm:min-h-0">
                {testimonial.image && (
                  <Image
                    src={testimonial.image}
                    alt={`Portrait of ${testimonial.name}`}
                    fill
                    sizes="(max-width: 640px) 100vw, 26vw"
                    className="object-cover"
                  />
                )}
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-transparent"
                />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-base font-semibold text-white">
                    {testimonial.name}
                  </p>
                  <p className="mt-0.5 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-white/80">
                    {testimonial.role} · {testimonial.country}
                  </p>
                </div>
              </div>

              {/* Quote panel */}
              <div className="relative flex flex-col p-7 sm:p-10">
                <Quote
                  aria-hidden
                  className="absolute right-7 top-7 size-12 fill-brand-soft text-brand-soft sm:size-16"
                />
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                  <div
                    className="flex gap-1 text-brand"
                    aria-label="5 out of 5 stars"
                  >
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className="size-4 fill-current"
                        aria-hidden
                      />
                    ))}
                  </div>
                  <p className="flex items-center gap-1.5 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-muted-foreground">
                    <BadgeCheck className="size-3.5 text-brand" aria-hidden />
                    Verified client story
                  </p>
                </div>
                <blockquote className="relative mt-5 max-w-xl text-pretty text-base leading-relaxed text-ink sm:text-xl sm:leading-normal">
                  “{testimonial.quote}”
                </blockquote>
                <figcaption className="mt-auto pt-7">
                  <div className="flex flex-wrap gap-2 border-t pt-5">
                    {testimonial.tags.map((tag) => (
                      <Badge key={tag}>{tag}</Badge>
                    ))}
                  </div>
                </figcaption>
              </div>
            </motion.figure>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
