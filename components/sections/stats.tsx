import { stats } from "@/lib/content";
import { CountUp } from "@/components/count-up";
import { Stagger, StaggerItem } from "@/components/motion";

export function Stats({
  withDescriptions = false,
}: {
  withDescriptions?: boolean;
}) {
  return (
    <section aria-label="Our results" className="border-y bg-cream">
      <div className="container-site">
        <Stagger className="grid grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <StaggerItem
              key={stat.label}
              className={`border-border px-2 py-10 sm:px-8 sm:py-14 lg:py-16 ${
                i % 2 === 1 ? "border-l" : ""
              } ${i >= 2 ? "border-t lg:border-t-0" : ""} ${
                i === 2 ? "lg:border-l" : ""
              } ${i === 3 ? "lg:border-l" : ""}`}
            >
              <p className="font-mono text-[clamp(2.5rem,4.5vw,4.5rem)] font-semibold leading-none tracking-tight text-brand">
                <CountUp value={stat.value} suffix={stat.suffix} />
              </p>
              <h3 className="mt-4 text-sm font-semibold text-ink sm:text-base">
                {stat.label}
              </h3>
              {withDescriptions && (
                <p className="mt-2 max-w-60 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                  {stat.description}
                </p>
              )}
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
