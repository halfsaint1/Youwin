import type { Metadata } from "next";
import Link from "next/link";
import { CalendarCheck, MessageCircle, Sparkles } from "lucide-react";

import { roadmap } from "@/lib/content";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/motion";
import { BookConsultationForm } from "@/components/book-consultation-form";

export const metadata: Metadata = {
  title: "Book a Free Consultation",
  description:
    "Book your free consultation with YouWin Educational Consulting. Tell us your ambitions and we'll identify the courses, universities, and destinations that suit you best.",
  alternates: { canonical: "/book-consultation" },
};

const highlights = [
  {
    icon: Sparkles,
    text: "Personalised advice for your study goals",
  },
  {
    icon: CalendarCheck,
    text: "We schedule at a time that suits you",
  },
  {
    icon: MessageCircle,
    text: "Phone, WhatsApp, or video — your choice",
  },
];

export default function BookConsultationPage() {
  return (
    <>
      <PageHero
        breadcrumb="Book Free Consultation"
        title="Book your free consultation"
        description="Share a few details and our team will reach out to schedule your session."
      />

      <section className="container-site py-12 sm:py-16">
        <Reveal>
          <ul className="mx-auto mb-10 flex max-w-5xl flex-wrap justify-center gap-x-8 gap-y-3">
            {highlights.map((item) => (
              <li
                key={item.text}
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <item.icon className="size-4 shrink-0 text-brand" aria-hidden />
                {item.text}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mx-auto w-full max-w-5xl">
            <BookConsultationForm />
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mx-auto mt-14 max-w-3xl">
            <p className="eyebrow text-center">What happens next</p>
            <ol className="mt-6 grid gap-5 sm:grid-cols-2">
              {roadmap.map((step, index) => (
                <li
                  key={step.title}
                  className="flex gap-4 rounded-2xl border bg-white p-5 shadow-[0_1px_2px_rgba(27,29,35,0.04)]"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-soft font-mono text-sm font-semibold text-brand">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-semibold text-ink">{step.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mx-auto mt-8 max-w-lg text-center text-sm text-muted-foreground">
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
      </section>
    </>
  );
}
