import type { Metadata } from "next";
import Link from "next/link";
import { BadgeCheck, Clock, ShieldCheck } from "lucide-react";

import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/motion";
import { ApplicationForm } from "@/components/application-form";

export const metadata: Metadata = {
  title: "Apply to Study Abroad",
  description:
    "Apply to study abroad with YouWin Educational Consulting. One simple form — share your details and our admissions team will match you with the right university, course, and visa pathway.",
  alternates: { canonical: "/apply" },
};

const assurances = [
  {
    icon: BadgeCheck,
    text: "Expert review by our admissions team",
  },
  {
    icon: Clock,
    text: "Fast response to keep you on schedule",
  },
  {
    icon: ShieldCheck,
    text: "Honest advice — no false promises",
  },
];

export default function ApplyPage() {
  return (
    <>
      <PageHero
        breadcrumb="Apply"
        title="Apply to study abroad"
        description="One form. All the details we need to guide your next step."
      />

      <section className="container-site py-12 sm:py-16">
        <Reveal>
          <ul className="mx-auto mb-10 flex max-w-5xl flex-wrap justify-center gap-x-8 gap-y-3">
            {assurances.map((item) => (
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
            <ApplicationForm />
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mx-auto mt-8 max-w-lg text-center text-sm text-muted-foreground">
            Prefer to talk first?{" "}
            <Link
              href="/book-consultation"
              className="font-medium text-brand underline-offset-4 hover:underline"
            >
              Book a free consultation
            </Link>{" "}
            instead.
          </p>
        </Reveal>
      </section>
    </>
  );
}
