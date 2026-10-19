import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion";
import { Button } from "@/components/ui/button";

/** Full-width conversion band — soft, light, and calm. */
export function CtaBand({
  spacious = false,
}: {
  spacious?: boolean;
}) {
  return (
    <section className="relative overflow-hidden bg-brand-soft">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-28 -top-32 size-[26rem] rounded-full bg-lime/40 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -left-24 size-[24rem] rounded-full bg-white/70 blur-[100px]"
      />
      <div
        className={cn(
          "container-site relative text-center",
          spacious ? "py-10 sm:py-12" : "py-8 sm:py-10"
        )}
      >
        <Reveal>
          <p className="eyebrow">Are You Ready?</p>
          <h2
            className={cn(
              "mx-auto whitespace-nowrap text-[clamp(1.5rem,4vw,2.5rem)] font-semibold leading-tight tracking-tight text-ink",
              spacious ? "mt-3" : "mt-2"
            )}
          >
            Start your journey today
          </h2>
          <p
            className={cn(
              "mx-auto whitespace-nowrap text-sm leading-snug text-muted-foreground sm:text-base",
              spacious ? "mt-3" : "mt-2"
            )}
          >
            We offer expert support, straightforward steps, and tailored solutions to guide you.
          </p>
          <div
            className={cn(
              "flex flex-wrap justify-center gap-3",
              spacious ? "mt-6" : "mt-5"
            )}
          >
            <Button asChild>
              <Link href="/apply">
                Apply Now <ArrowRight className="size-4" aria-hidden />
              </Link>
            </Button>
            <Button asChild variant="outline" className="bg-white/80">
              <Link href="/book-consultation">
                Book Consultation <ArrowRight className="size-4" aria-hidden />
              </Link>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
