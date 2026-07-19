import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, Phone } from "lucide-react";
import { WhatsAppIcon } from "@/components/social-icons";

import { site } from "@/lib/site";
import { Reveal } from "@/components/motion";
import { Button } from "@/components/ui/button";

const highlights = [
  "Personalized Study Abroad Planning",
  "University & Course Selection Support",
  "Visa Assistance",
  "Post-arrival Support",
];

export function WhoWeAre() {
  return (
    <section className="container-site grid items-center gap-14 py-24 sm:py-32 lg:grid-cols-[0.95fr_1.05fr] lg:gap-24">
      <Reveal className="relative order-2 lg:order-1">
        <div className="grid grid-cols-[1fr_0.85fr] gap-5">
          <div className="relative aspect-[3/4] overflow-hidden rounded-[1.75rem]">
            <Image
              src="/images/about-panel-left.jpg"
              alt="Students researching universities together with a YouWin advisor at the office"
              fill
              sizes="(max-width: 1024px) 55vw, 26vw"
              className="object-cover transition-transform duration-700 hover:scale-[1.03]"
            />
          </div>
          <div className="relative mt-14 aspect-[3/4] overflow-hidden rounded-[1.75rem]">
            <Image
              src="/images/about-panel-right.jpg"
              alt="A YouWin consultant guiding a student through his study abroad options"
              fill
              sizes="(max-width: 1024px) 45vw, 22vw"
              className="object-cover transition-transform duration-700 hover:scale-[1.03]"
            />
          </div>
        </div>
        <div className="absolute -bottom-6 left-6 rounded-2xl border bg-white px-7 py-5 shadow-[0_20px_48px_-16px_rgba(27,29,35,0.18)]">
          <p className="font-mono text-3xl font-semibold text-brand">7+</p>
          <p className="mt-1 text-xs font-medium text-muted-foreground">
            Years of Experience
          </p>
        </div>
      </Reveal>

      <div className="order-1 lg:order-2">
        <Reveal>
          <p className="eyebrow">About YouWin</p>
          <h2 className="text-heading mt-4 text-balance text-ink">
            Who We Are
          </h2>
          <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            YouWin Educational Consulting is a global education consultancy
            with offices in the UK, Nigeria, and the UAE. We help students from
            all backgrounds achieve their goal of studying abroad. Thanks to
            our partnerships with accredited universities in the UK, USA,
            Canada, and Europe, we offer expert support at every step, from
            your first consultation to university placement and visa
            application.
          </p>
          <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
            We pay close attention to every detail to make sure your journey is
            smooth, well-organized, and stress-free from start to finish.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <ul className="mt-8 grid gap-x-8 gap-y-4 border-t pt-8 sm:grid-cols-2">
            {highlights.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-[0.9375rem] font-medium text-ink"
              >
                <CheckCircle2
                  className="mt-0.5 size-5 shrink-0 text-brand"
                  aria-hidden
                />
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap items-center gap-6 sm:gap-8">
            <Button asChild size="lg">
              <Link href="/about">More About Us</Link>
            </Button>
            <a
              href={`tel:${site.phones[0].replace(/\s/g, "")}`}
              className="group flex items-center gap-3.5"
            >
              <span className="flex size-12 items-center justify-center rounded-full bg-brand-soft text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-lime">
                <Phone className="size-5" aria-hidden />
              </span>
              <span>
                <span className="block font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted-foreground">
                  Let’s Talk!
                </span>
                <span className="mt-0.5 block text-sm font-semibold text-ink transition-colors group-hover:text-brand">
                  {site.phones[0]}
                </span>
              </span>
            </a>
            <a
              href={site.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3.5"
            >
              <span className="flex size-12 items-center justify-center rounded-full bg-brand-soft text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-lime">
                <WhatsAppIcon className="size-5" aria-hidden />
              </span>
              <span>
                <span className="block font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted-foreground">
                  WhatsApp
                </span>
                <span className="mt-0.5 block text-sm font-semibold text-ink transition-colors group-hover:text-brand">
                  {site.whatsapp}
                </span>
              </span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
