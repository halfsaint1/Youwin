import { services } from "@/lib/content";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";

export function ServicesGrid() {
  return (
    <section className="relative border-y bg-sand">
      {/* Faint dot-grid texture, echoing the hero background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(27,29,35,0.05)_1px,transparent_1.5px)] [background-size:22px_22px] [mask-image:linear-gradient(75deg,black,transparent_60%)]"
      />
      <div className="container-site relative grid gap-12 py-24 sm:py-32 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <Reveal className="lg:sticky lg:top-36 lg:self-start">
          <p className="eyebrow">Our Services</p>
          <h2 className="text-heading mt-4 text-balance text-ink">
            Get Expert Support at Every Stage
          </h2>
          <p className="mt-5 max-w-md text-pretty leading-relaxed text-muted-foreground">
            From your first consultation to your first day on campus, our team
            handles the details that make the difference.
          </p>
        </Reveal>

        <Stagger className="grid gap-5 sm:grid-cols-2">
          {services.map((service) => (
            <StaggerItem key={service.slug} className="h-full">
              <div className="group flex h-full flex-col rounded-3xl border border-transparent bg-white p-8 shadow-[0_1px_2px_rgba(27,29,35,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-brand/20 hover:shadow-[0_20px_48px_rgba(45,90,5,0.12)]">
                <span className="flex size-13 items-center justify-center rounded-2xl bg-brand-soft text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-lime">
                  <service.icon className="size-6" aria-hidden />
                </span>
                <h3 className="mt-7 text-lg font-semibold text-ink">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
