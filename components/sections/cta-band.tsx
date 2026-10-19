import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarCheck } from "lucide-react";

import { site } from "@/lib/site";
import { Reveal } from "@/components/motion";
import { WhatsAppIcon } from "@/components/social-icons";

/** Bold brand-colour conversion band that sits directly above the footer. */
export function CtaBand() {
  return (
    <section className="relative overflow-hidden bg-brand text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:44px_44px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_80%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 size-[28rem] rounded-full bg-lime/20 blur-[120px]"
      />

      <div className="container-site relative grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <Reveal>
          <p className="inline-flex rounded-full bg-white/15 px-3 py-1 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-white/90">
            Free consultation
          </p>
          <h2 className="mt-5 max-w-xl text-balance text-[clamp(2rem,4.5vw,3.25rem)] font-bold leading-[1.05] tracking-tight">
            Your study abroad plan starts with one conversation.
          </h2>
          <p className="mt-5 max-w-lg text-pretty leading-relaxed text-white/75 sm:text-lg">
            Tell us your results, budget and goals. We&apos;ll show you
            realistic universities, costs and visa steps, at no cost.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/book-consultation"
              className="inline-flex h-12 items-center gap-2 rounded-xl bg-white px-6 text-sm font-semibold text-brand shadow-[0_8px_24px_-8px_rgba(0,0,0,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-lime hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Book free consultation
              <ArrowRight className="size-4" aria-hidden />
            </Link>
            <Link
              href="/apply"
              className="inline-flex h-12 items-center gap-2 rounded-xl border border-white/30 px-6 text-sm font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Apply now
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="overflow-hidden rounded-2xl bg-white shadow-[0_30px_60px_-20px_rgba(0,0,0,0.5)] ring-1 ring-white/20">
            <div className="flex items-center gap-2 border-b border-ink/5 bg-cream px-4 py-2.5">
              <span className="size-2.5 rounded-full bg-[#ff5f57]" aria-hidden />
              <span className="size-2.5 rounded-full bg-[#febc2e]" aria-hidden />
              <span className="size-2.5 rounded-full bg-[#28c840]" aria-hidden />
              <span className="ml-2 truncate font-mono text-xs text-muted-foreground">
                your-study-plan
              </span>
              <span className="ml-auto rounded-full bg-brand-soft px-2 py-0.5 font-mono text-[0.625rem] font-medium uppercase tracking-wider text-brand">
                Free
              </span>
            </div>
            <div className="relative aspect-[16/10]">
              <Image
                src="/images/generated/about-youwin-consultation.jpg"
                alt="A YouWin consultant planning a student's study abroad options"
                fill
                sizes="(max-width: 1024px) 90vw, 40vw"
                className="object-cover object-[center_30%]"
              />
            </div>
          </div>

          <div className="absolute -bottom-5 left-4 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 text-ink shadow-[0_16px_40px_-12px_rgba(0,0,0,0.35)] sm:-left-6">
            <span className="flex size-9 items-center justify-center rounded-full bg-brand-soft text-brand">
              <CalendarCheck className="size-4" aria-hidden />
            </span>
            <span>
              <span className="block text-sm font-semibold">
                First consultation free
              </span>
              <span className="block text-xs text-muted-foreground">
                Book online or on WhatsApp
              </span>
            </span>
          </div>

          <a
            href={site.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute -right-2 -top-4 flex items-center gap-2 rounded-full bg-[#25d366] px-4 py-2 text-sm font-semibold text-white shadow-lg transition-transform hover:-translate-y-0.5 sm:-right-5"
          >
            <WhatsAppIcon className="size-4" aria-hidden />
            Chat now
          </a>
        </Reveal>
      </div>
    </section>
  );
}
