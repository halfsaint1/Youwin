import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { destinations } from "@/lib/content";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";

/**
 * Destinations index — calm hairline rows on a soft surface,
 * with the flag and country name as the focal point of each row.
 */
export function Destinations() {
  return (
    <section className="border-y bg-cream">
      <div className="container-site py-20 sm:py-28">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">Countries</p>
            <h2 className="text-heading mt-3 text-balance text-ink">
              Popular Destinations
            </h2>
          </div>
          <p className="max-w-sm text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
            Explore our top study destinations and open doors to new
            opportunities for your future.
          </p>
        </Reveal>

        <Stagger className="mt-14" gap={0.06}>
          <ul>
            {destinations.map((destination, index) => (
              <li
                key={destination.name}
                className="border-t border-ink/10 last:border-b"
              >
                <StaggerItem>
                  <Link
                    href={`/destinations/${destination.slug}`}
                    className="group grid grid-cols-[auto_1fr_auto] items-center gap-x-5 rounded-2xl py-6 transition-colors duration-300 hover:bg-white focus-visible:bg-white focus-visible:outline-none sm:grid-cols-[6rem_auto_1fr_auto] sm:gap-x-8 sm:py-8"
                  >
                    <span
                      aria-hidden
                      className="pl-2 font-mono text-xs tracking-[0.2em] text-muted-foreground/60 transition-colors duration-300 group-hover:text-brand"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <Image
                      src={destination.flag}
                      alt=""
                      width={54}
                      height={36}
                      className="hidden h-8 w-auto rounded-md shadow-sm sm:block"
                    />
                    <span className="text-[clamp(1.5rem,3.4vw,3.25rem)] font-semibold leading-none tracking-tight text-ink transition-transform duration-300 group-hover:translate-x-2">
                      {destination.name}
                    </span>
                    <span className="mr-2 flex size-11 items-center justify-center justify-self-end rounded-full border border-ink/10 bg-white text-muted-foreground transition-all duration-300 group-hover:border-brand group-hover:bg-brand group-hover:text-white sm:size-13">
                      <ArrowUpRight className="size-5" aria-hidden />
                      <span className="sr-only">
                        Start your {destination.name} journey
                      </span>
                    </span>
                  </Link>
                </StaggerItem>
              </li>
            ))}
          </ul>
        </Stagger>
      </div>
    </section>
  );
}
