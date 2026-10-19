import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, ShieldCheck } from "lucide-react";

import { roadmap, stats } from "@/lib/content";
import { Reveal } from "@/components/motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BookConsultationForm } from "@/components/book-consultation-form";
import { BOOKING_TIMEZONE_LABEL } from "@/lib/booking";

export const metadata: Metadata = {
  title: "Book a Free Consultation",
  description:
    "Book your free consultation with YouWin Educational Consulting. Pick a date and time, and we'll identify the courses, universities, and destinations that suit you best.",
  alternates: { canonical: "/book-consultation" },
};

const trustStats = stats.slice(0, 2);

const faqs = [
  {
    question: "Is the consultation really free?",
    answer:
      "Yes. Your first consultation is completely free and there is no obligation to continue with our services afterwards.",
  },
  {
    question: "What should I prepare before the call?",
    answer:
      "Have your latest results (WAEC, NECO, degree or HND transcripts), your preferred courses or destinations, and a rough budget for tuition and living costs. If you don't have everything yet, that's fine; we'll help you work out what you need.",
  },
  {
    question: "Which time zone are the slots in?",
    answer: `All slots are shown in ${BOOKING_TIMEZONE_LABEL}. If you're booking from outside Nigeria, we also show the matching time where you are.`,
  },
  {
    question: "Can parents or guardians join?",
    answer:
      "Yes. Parents and guardians are welcome to join, and it's a good chance to ask about costs, safety and the visa process.",
  },
];

export default function BookConsultationPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b bg-cream">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-32 -top-20 size-96 rounded-full bg-brand-soft blur-[110px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 bottom-0 size-72 rounded-full bg-lime/25 blur-[100px]"
        />
        <div className="container-site relative grid items-center gap-12 pb-40 pt-10 sm:pt-14 lg:grid-cols-[1.1fr_0.9fr] lg:pb-48">
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
                  Book Free Consultation
                </li>
              </ol>
            </nav>
            <p className="mt-8 inline-flex items-center gap-2 rounded-full border border-brand/15 bg-white/70 px-3.5 py-1.5 text-xs font-medium text-brand backdrop-blur">
              <ShieldCheck className="size-3.5" aria-hidden />
              Free one-to-one session · No obligation
            </p>
            <h1 className="mt-5 max-w-xl text-balance text-[clamp(2.25rem,5vw,3.75rem)] font-bold leading-[1.04] tracking-tight text-ink">
              Book your free study abroad consultation
            </h1>
            <p className="mt-5 max-w-lg text-pretty text-lg leading-relaxed text-muted-foreground">
              Choose a date and time that suits you. An adviser will walk you
              through realistic universities, costs and visa steps for your
              profile.
            </p>
            <dl className="mt-9 flex flex-wrap gap-x-10 gap-y-5">
              {trustStats.map((stat) => (
                <div key={stat.label}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <span className="block font-mono text-3xl font-semibold text-brand">
                      {stat.value}
                      {stat.suffix}
                    </span>
                    <span className="mt-1 block text-sm text-muted-foreground">
                      {stat.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative hidden lg:block">
            <div className="relative aspect-[4/5] max-h-[30rem] overflow-hidden rounded-[2rem] shadow-[0_30px_60px_-25px_rgba(27,29,35,0.35)]">
              <Image
                src="/images/generated/about-youwin-consultation.jpg"
                alt="A YouWin consultant guiding a student through his study abroad plan"
                fill
                priority
                sizes="40vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="booking" className="container-site scroll-mt-24">
        <Reveal className="relative z-10 mx-auto -mt-28 max-w-6xl lg:-mt-36">
          <BookConsultationForm />
        </Reveal>
      </section>

      <section className="container-site py-20 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <p className="eyebrow">What happens next</p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              From your first call to arrival day
            </h2>
            <ol className="mt-8 space-y-6">
              {roadmap.map((step, index) => (
                <li key={step.title} className="flex gap-5">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-brand-soft font-mono text-sm font-semibold text-brand">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="pt-1">
                    <h3 className="font-semibold text-ink">{step.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal delay={0.05}>
            <p className="eyebrow">Good to know</p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              Before you book
            </h2>
            <Accordion
              type="single"
              collapsible
              className="mt-6 rounded-3xl border bg-white px-6 sm:px-8"
            >
              {faqs.map((item, i) => (
                <AccordionItem key={item.question} value={`faq-${i}`}>
                  <AccordionTrigger>{item.question}</AccordionTrigger>
                  <AccordionContent>{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            <p className="mt-6 text-sm text-muted-foreground">
              Ready to apply straight away?{" "}
              <Link
                href="/apply"
                className="font-medium text-brand underline-offset-4 hover:underline"
              >
                Complete the application form
              </Link>{" "}
              instead.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
