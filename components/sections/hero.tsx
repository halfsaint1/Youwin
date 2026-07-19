"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, BadgeCheck, Star } from "lucide-react";

import { Button } from "@/components/ui/button";

const easeOut = [0.21, 0.47, 0.32, 0.98] as const;

export function Hero() {
  const reduce = useReducedMotion();

  const rise = (delay = 0) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 26 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, ease: easeOut, delay },
        };

  const settle = (delay = 0) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 18, scale: 0.95 },
          animate: { opacity: 1, y: 0, scale: 1 },
          transition: { duration: 0.6, ease: easeOut, delay },
        };

  return (
    // overflow-x-clip: the entrance x-offset must never flash a horizontal
    // scrollbar, while the media's bottom overlap stays visible
    <section className="relative overflow-x-clip bg-cream">
      {/* Layer 1 — background: soft washes + faint dot texture */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-24 size-[34rem] rounded-full bg-brand-soft blur-[120px]" />
        <div className="absolute -right-32 bottom-0 size-[28rem] rounded-full bg-lime/20 blur-[130px]" />
        <div className="absolute inset-0 bg-[radial-gradient(rgba(27,29,35,0.055)_1px,transparent_1.5px)] [background-size:22px_22px] [mask-image:linear-gradient(105deg,black,transparent_55%)]" />
      </div>

      <div className="relative mx-auto max-w-[110rem]">
        {/* Copy — asymmetric column, sits above the image so the highlight can reach into it */}
        <div className="relative z-10 px-[clamp(1.25rem,4vw,5rem)] pb-10 pt-12 sm:pt-16 lg:w-[47%] lg:py-24">
          <motion.p className="eyebrow" {...rise()}>
            Want to study abroad?
          </motion.p>
          <motion.h1
            className="text-display mt-6 text-ink"
            {...rise(0.08)}
          >
            Unlock
            <br />
            Your Future
            <br />
            <span className="mt-[0.08em] inline-block whitespace-nowrap rounded-[0.3em] bg-lime/90 px-[0.18em] pb-[0.06em]">
              Beyond Borders
            </span>
          </motion.h1>
          <motion.p
            className="mt-8 max-w-md text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
            {...rise(0.16)}
          >
            You can count on us for expert advice, visa support, and a clear
            path to studying abroad. We’re here to help you reach your goal of
            studying overseas.
          </motion.p>
          <motion.div className="mt-10 flex flex-wrap gap-4" {...rise(0.24)}>
            <Button asChild size="lg">
              <Link href="/apply">
                Apply Now <ArrowRight className="size-4" aria-hidden />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="bg-white/70">
              <Link href="/services">Explore Our Services</Link>
            </Button>
          </motion.div>
        </div>

        {/* Layer 2 — clipped image anchor: upright photo, slanted container */}
        <div className="relative mt-2 lg:absolute lg:-bottom-14 lg:right-0 lg:top-0 lg:mt-0 lg:w-[57%]">
          <motion.div
            className="relative h-[19rem] [filter:drop-shadow(-20px_28px_44px_rgba(27,29,35,0.18))] sm:h-[24rem] lg:h-full"
            {...(reduce
              ? {}
              : {
                  initial: { opacity: 0, x: 32 },
                  animate: { opacity: 1, x: 0 },
                  transition: { duration: 0.9, ease: easeOut, delay: 0.1 },
                })}
          >
            {/* Full rectangle on mobile; left edge slants inward ~9° from lg up
                (the image itself stays perfectly upright) */}
            <div className="absolute inset-0 overflow-hidden lg:[clip-path:polygon(14%_0%,100%_0%,100%_100%,0%_100%)]">
              <Image
                src="/images/hero-student-campus.jpg"
                alt="Smiling student holding her books on a university campus, with fellow students behind her"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 57vw"
                className="object-cover"
              />
            </div>
          </motion.div>

          {/* Layer 3 — floating dashboard widgets, breaking the image boundary */}
          <motion.div
            className="absolute bottom-5 left-3 z-20 flex items-center gap-3 rounded-[1.375rem] border border-ink/5 bg-white/85 py-3 pl-3 pr-5 shadow-soft backdrop-blur-md sm:bottom-[16%] sm:-left-5 lg:left-[1%] lg:top-[16%] lg:bottom-auto"
            {...settle(0.45)}
          >
            <span className="flex size-10 items-center justify-center rounded-xl bg-brand-soft text-brand">
              <BadgeCheck className="size-5" aria-hidden />
            </span>
            <span>
              <span className="block font-mono text-lg font-semibold leading-none text-ink">
                750+
              </span>
              <span className="mt-1 block text-xs font-medium text-muted-foreground">
                Visas Approved
              </span>
            </span>
          </motion.div>

          <motion.div
            className="absolute -left-6 bottom-[22%] z-20 hidden items-center gap-3 rounded-[1.375rem] border border-ink/5 bg-white/85 py-3 pl-3 pr-5 shadow-soft backdrop-blur-md lg:flex"
            {...settle(0.55)}
          >
            <span className="flex size-10 items-center justify-center rounded-xl bg-lime/50 text-ink">
              <Star className="size-5 fill-current" aria-hidden />
            </span>
            <span>
              <span className="block font-mono text-lg font-semibold leading-none text-ink">
                99%
              </span>
              <span className="mt-1 block text-xs font-medium text-muted-foreground">
                Client Satisfaction
              </span>
            </span>
          </motion.div>

        </div>
      </div>

    </section>
  );
}
