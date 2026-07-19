"use client";

import { useState } from "react";

import type { UniversityPartner } from "@/lib/destination-guides";
import { cn } from "@/lib/utils";

type UniversityPartnersMarqueeProps = {
  partners: UniversityPartner[];
};

function initialsFor(name: string) {
  return name
    .split(/\s+/)
    .filter(
      (word) =>
        /^[A-Za-z]/.test(word) &&
        !["of", "the", "and", "for", "university", "college", "institute"].includes(
          word.toLowerCase()
        )
    )
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

function PartnerLogo({ partner }: { partner: UniversityPartner }) {
  const [failed, setFailed] = useState(false);
  const initials = initialsFor(partner.name);

  return (
    <div
      className="group/logo relative flex h-[5.75rem] w-[14.5rem] shrink-0 items-center gap-3.5 rounded-2xl border border-black/[0.05] bg-white px-4 shadow-[0_1px_2px_rgba(16,24,40,0.04)] transition-[transform,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-black/[0.08] hover:shadow-[0_18px_36px_-24px_rgba(16,24,40,0.35)] sm:h-[6.25rem] sm:w-[16.5rem] sm:gap-4 sm:px-5"
      title={partner.name}
    >
      <div className="flex size-12 shrink-0 items-center justify-center sm:size-14">
        {!failed && partner.logo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={partner.logo}
            alt=""
            className="max-h-11 max-w-full object-contain opacity-[0.94] transition-[opacity,transform] duration-500 ease-out group-hover/logo:scale-[1.04] group-hover/logo:opacity-100 sm:max-h-12"
            loading="lazy"
            decoding="async"
            onError={() => setFailed(true)}
          />
        ) : (
          <span className="flex size-11 items-center justify-center rounded-full bg-brand-soft text-[0.7rem] font-bold tracking-wide text-brand sm:size-12">
            {initials}
          </span>
        )}
      </div>

      <span className="line-clamp-2 text-left text-[0.8rem] font-semibold leading-snug tracking-tight text-[#222] sm:text-[0.88rem]">
        {partner.name}
      </span>
    </div>
  );
}

function MarqueeRow({
  partners,
  reverse = false,
  duration,
  delay = "0s",
}: {
  partners: UniversityPartner[];
  reverse?: boolean;
  duration: string;
  delay?: string;
}) {
  // Duplicate once for a seamless -50% loop.
  const loop = [...partners, ...partners];

  return (
    <div
      className={cn(
        "flex w-max gap-3.5 will-change-transform sm:gap-4",
        reverse ? "animate-partner-marquee-reverse" : "animate-partner-marquee"
      )}
      style={{ animationDuration: duration, animationDelay: delay }}
    >
      {loop.map((partner, index) => (
        <PartnerLogo
          key={`${partner.domain}-${reverse ? "r" : "f"}-${index}`}
          partner={partner}
        />
      ))}
    </div>
  );
}

function buildRows(partners: UniversityPartner[], rowCount = 3) {
  const pool = [...partners];
  while (pool.length < rowCount * 7) {
    pool.push(...partners);
  }

  const perRow = Math.ceil(pool.length / rowCount);

  return Array.from({ length: rowCount }, (_, row) => {
    const slice = pool.slice(row * perRow, row * perRow + perRow);
    // Offset each row so logos never stack in columns.
    const offset = (row * 3) % Math.max(slice.length, 1);
    return [...slice.slice(offset), ...slice.slice(0, offset)];
  });
}

export function UniversityPartnersMarquee({
  partners,
}: UniversityPartnersMarqueeProps) {
  if (!partners.length) return null;

  const rows = buildRows(partners, 3);
  // Slow, uneven tempos read calmer and more premium.
  const durations = ["78s", "92s", "84s"];
  const delays = ["0s", "-18s", "-9s"];

  return (
    <section className="overflow-hidden border-y border-black/[0.04] bg-[linear-gradient(180deg,#fbfbfa_0%,#f7f6f3_100%)] py-16 sm:py-20">
      <div className="container-site">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-brand">
            Trusted network
          </p>
          <h2 className="mt-3 text-balance text-[1.75rem] font-bold tracking-tight text-ink sm:text-[2.125rem]">
            Our University Partners
          </h2>
        </div>
      </div>

      <div
        className={cn(
          "group/marquee relative mt-11 space-y-3.5 sm:mt-14 sm:space-y-4",
          "[mask-image:linear-gradient(to_right,transparent_0%,black_8%,black_92%,transparent_100%)]",
          "[-webkit-mask-image:linear-gradient(to_right,transparent_0%,black_8%,black_92%,transparent_100%)]"
        )}
      >
        {rows.map((rowPartners, index) => (
          <div key={`partner-row-${index}`} className="overflow-hidden py-0.5">
            <MarqueeRow
              partners={rowPartners}
              reverse={index % 2 === 1}
              duration={durations[index]}
              delay={delays[index]}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
