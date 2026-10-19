import type { Metadata } from "next";
import Image from "next/image";
import {
  Handshake,
  Heart,
  ShieldCheck,
  Sprout,
  Target,
  Telescope,
  Users,
  UsersRound,
} from "lucide-react";

import { coreValues } from "@/lib/content";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { Stats } from "@/components/sections/stats";
import { CtaBand } from "@/components/sections/cta-band";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "YouWin Educational Consulting helps ambitious students study abroad with honest guidance and hands-on support at every step. Offices in the UK and Nigeria.",
  alternates: { canonical: "/about" },
};

const valueIcons = [Heart, UsersRound, Handshake, Sprout, ShieldCheck, Users];

export default function AboutPage() {
  return (
    <>
      <PageHero
        breadcrumb="About"
        title="We help ambitious students study abroad"
        description="With honest guidance and hands-on support at every step."
      />

      {/* Intro */}
      <section className="container-site grid items-center gap-14 py-20 sm:py-24 lg:grid-cols-2">
        <Reveal>
          <p className="eyebrow">How we work</p>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Getting accepted is only the start
          </h2>
          <p className="mt-5 text-pretty leading-relaxed text-muted-foreground">
            You still need the right course, a complete application, and a visa
            that stands up to review. We work with you from your first
            consultation through to arrival, so deadlines, documents, and next
            steps are handled properly.
          </p>
          <p className="mt-4 border-l-4 border-lime pl-4 text-pretty font-medium leading-relaxed text-ink">
            Studying overseas is a major move. Clear advice and steady support
            make it manageable.
          </p>
        </Reveal>
        <Reveal delay={0.1} className="relative">
          <div className="grid grid-cols-[1fr_0.85fr] gap-5">
            <div className="relative aspect-[3/4] overflow-hidden rounded-[1.75rem]">
              <Image
                src="/images/about-panel-left.jpg"
                alt="Students researching universities together with a YouWin advisor at the office"
                fill
                sizes="(max-width: 1024px) 55vw, 26vw"
                className="object-cover"
              />
            </div>
            <div className="relative mt-14 aspect-[3/4] overflow-hidden rounded-[1.75rem]">
              <Image
                src="/images/about-panel-right.jpg"
                alt="A YouWin consultant guiding a student through his study abroad options"
                fill
                sizes="(max-width: 1024px) 45vw, 22vw"
                className="object-cover"
              />
            </div>
          </div>
          <div className="absolute -bottom-6 -left-4 rounded-2xl border bg-white px-6 py-4 shadow-[0_20px_48px_-16px_rgba(27,29,35,0.18)] sm:-left-8">
            <p className="font-mono text-2xl font-semibold text-brand">2</p>
            <p className="text-xs font-medium text-muted-foreground">
              Offices in the UK &amp; Nigeria
            </p>
          </div>
        </Reveal>
      </section>

      <Stats withDescriptions />

      {/* Our story */}
      <section className="container-site grid items-center gap-14 py-20 sm:py-24 lg:grid-cols-2">
        <Reveal className="relative order-2 aspect-[4/3] overflow-hidden rounded-[2rem] lg:order-1">
          <Image
            src="/images/about-our-story.png"
            alt="A YouWin consultant helping a student plan their study abroad journey with university admissions and visa support"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-center"
          />
        </Reveal>
        <Reveal className="order-1 lg:order-2">
          <p className="eyebrow">Our Story</p>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Why we started YouWin
          </h2>
          <p className="mt-5 text-pretty leading-relaxed text-muted-foreground">
            Too many students were stuck with confusing processes, missed
            deadlines, and agents who disappeared when things got difficult. We
            knew students deserved clearer advice and steadier support, so we
            built YouWin to provide both.
          </p>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            Today we work from offices in the UK and Nigeria, helping
            students secure admissions, visas, and scholarships. We bring solid
            knowledge of international education systems, and we stay involved
            until the job is done.
          </p>
        </Reveal>
      </section>

      {/* Mission, Vision & Values */}
      <section className="bg-sand">
        <div className="container-site py-20 sm:py-24">
          <SectionHeading
            eyebrow="Our Mission, Vision & Values"
            title="What drives us every day"
          />

          <Stagger className="mt-14 grid gap-6 lg:grid-cols-2">
            <StaggerItem>
              <div className="flex h-full flex-col rounded-3xl border bg-white p-9 shadow-[0_1px_2px_rgba(27,29,35,0.04)]">
                <span className="flex size-13 items-center justify-center rounded-2xl bg-brand-soft text-brand">
                  <Target className="size-6" aria-hidden />
                </span>
                <p className="eyebrow mt-6">Our Mission</p>
                <h3 className="mt-2 text-xl font-semibold text-ink">
                  Our promise
                </h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  To give every student clear guidance, honest advice, and
                  practical support to study abroad, without the stress,
                  confusion, or hidden costs.
                </p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="flex h-full flex-col rounded-3xl bg-brand-soft p-9">
                <span className="flex size-13 items-center justify-center rounded-2xl bg-lime text-ink">
                  <Telescope className="size-6" aria-hidden />
                </span>
                <p className="eyebrow mt-6">Our Vision</p>
                <h3 className="mt-2 text-xl font-semibold text-ink">
                  Where we&apos;re headed
                </h3>
                <p className="mt-3 leading-relaxed text-ink/70">
                  To be the consultancy students trust first: known for putting
                  people ahead of paperwork and delivering results that hold up.
                </p>
              </div>
            </StaggerItem>
          </Stagger>

          <Reveal className="mt-16 text-center">
            <h3 className="text-2xl font-bold text-ink">Our Core Values</h3>
          </Reveal>
          <Stagger className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {coreValues.map((value, i) => {
              const Icon = valueIcons[i];
              return (
                <StaggerItem key={value.title} className="h-full">
                  <div className="h-full rounded-3xl border bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-brand/20 hover:shadow-[0_16px_40px_rgba(45,90,5,0.10)]">
                    <span className="flex size-12 items-center justify-center rounded-2xl bg-brand-soft text-brand">
                      <Icon className="size-5.5" aria-hidden />
                    </span>
                    <h4 className="mt-5 text-lg font-semibold text-ink">
                      {value.title}
                    </h4>
                    <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                      {value.description}
                    </p>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
