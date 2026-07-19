import { ArrowRight } from "lucide-react";

import { roadmap } from "@/lib/content";
import { SectionHeading } from "@/components/section-heading";
import { Stagger, StaggerItem } from "@/components/motion";

export function Roadmap() {
  return (
    <section className="relative bg-white">
      {/* Faint dot-grid texture, echoing the hero background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(27,29,35,0.045)_1px,transparent_1.5px)] [background-size:22px_22px] [mask-image:linear-gradient(285deg,black,transparent_55%)]"
      />
      <div className="container-site relative py-24 sm:py-32">
        <SectionHeading
          eyebrow="Your Journey Roadmap"
          title="We’re With You Every Step"
          align="left"
        />

        <Stagger className="relative mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {/* Dashed connector behind the cards (desktop) */}
          <div
            aria-hidden
            className="absolute -top-5 left-[12%] right-[12%] hidden border-t-2 border-dashed border-brand/20 lg:block"
          />
          {roadmap.map((item, index) => (
            <StaggerItem key={item.title} className="relative h-full">
              {/* Connector node */}
              <div
                aria-hidden
                className="absolute -top-[26px] left-1/2 hidden size-3 -translate-x-1/2 rounded-full border-2 border-brand/30 bg-white lg:block"
              />
              <div className="group flex h-full flex-col rounded-3xl border bg-white p-7 shadow-[0_1px_2px_rgba(27,29,35,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-brand/20 hover:shadow-[0_20px_48px_rgba(45,90,5,0.12)]">
                <div className="flex items-center justify-between">
                  <span className="flex size-13 items-center justify-center rounded-2xl bg-lime font-mono text-lg font-semibold text-ink shadow-[0_0_0_8px_rgba(184,244,81,0.18)] transition-transform duration-300 group-hover:scale-105">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {index < roadmap.length - 1 && (
                    <ArrowRight
                      aria-hidden
                      className="size-4 text-brand/30 transition-all duration-300 group-hover:translate-x-1 group-hover:text-brand"
                    />
                  )}
                </div>
                <p className="mt-7 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-brand">
                  {item.step}
                </p>
                <h3 className="mt-2 text-lg font-semibold tracking-tight text-ink sm:text-xl">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
