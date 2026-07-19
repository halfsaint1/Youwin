import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";

import { site } from "@/lib/site";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/motion";
import { ContactForm } from "@/components/contact-form";
import { Faq } from "@/components/sections/faq";
import { WhatsAppIcon } from "@/components/social-icons";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Let's build your future together. Get expert guidance, clear steps, and personalized support every step of the way. Call, email, or visit YouWin in Lagos.",
  alternates: { canonical: "/contact" },
};

const contactJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: `Contact ${site.name}`,
  url: `${site.url}/contact`,
  mainEntity: {
    "@type": "EducationalOrganization",
    name: site.name,
    telephone: site.phones[0],
    email: site.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      addressCountry: "NG",
    },
  },
};

const channels = [
  {
    icon: Phone,
    title: "Call Us",
    lines: site.phones,
    hrefs: site.phones.map((p) => `tel:${p.replace(/\s/g, "")}`),
  },
  {
    icon: WhatsAppIcon,
    title: "WhatsApp",
    lines: [site.whatsapp],
    hrefs: [site.whatsappHref],
    external: true,
  },
  {
    icon: Mail,
    title: "Email Us",
    lines: [site.email],
    hrefs: [`mailto:${site.email}`],
  },
  {
    icon: MapPin,
    title: "Visit Us",
    lines: [
      `${site.address.street}, ${site.address.locality}, ${site.address.region}, Nigeria`,
      site.addressUK.full,
    ],
    hrefs: [
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        `${site.address.street}, ${site.address.locality}, ${site.address.region}, Nigeria`
      )}`,
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        `${site.addressUK.street}, ${site.addressUK.locality}, ${site.addressUK.country}`
      )}`,
    ],
  },
];

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />
      <PageHero
        breadcrumb="Contact"
        title="Let’s Build Your Future Together"
        description="Get expert guidance, clear steps, and personalized support every step of the way."
      />

      <section className="container-site grid gap-12 py-20 sm:py-24 lg:grid-cols-[0.85fr_1.15fr]">
        <Reveal>
          <p className="eyebrow">Get In Touch</p>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-ink">
            Speak with our team
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Get in touch with our team for assistance — we’ll respond as
            quickly as we can.
          </p>

          <ul className="mt-9 space-y-6">
            {channels.map((channel) => (
              <li key={channel.title} className="flex gap-4">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-brand-soft text-brand">
                  <channel.icon className="size-5" aria-hidden />
                </span>
                <div>
                  <h3 className="font-semibold text-ink">{channel.title}</h3>
                  {channel.lines.map((line, i) => (
                    <a
                      key={line}
                      href={channel.hrefs[i]}
                      className="block text-sm text-muted-foreground transition-colors hover:text-brand"
                      {...(("external" in channel && channel.external) ||
                      channel.hrefs[i].startsWith("http")
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      {line}
                    </a>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <ContactForm />
        </Reveal>
      </section>

      <Faq />
    </>
  );
}
