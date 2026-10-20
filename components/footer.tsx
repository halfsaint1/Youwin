import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Mail, Phone } from "lucide-react";

import { nav, site } from "@/lib/site";
import { Button } from "@/components/ui/button";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  XIcon,
} from "@/components/social-icons";

const socials = [
  { label: "Facebook", href: site.social.facebook, icon: FacebookIcon },
  { label: "X (Twitter)", href: "#", icon: XIcon },
  { label: "LinkedIn", href: "#", icon: LinkedInIcon },
  { label: "Instagram", href: "#", icon: InstagramIcon },
];

function ColumnLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="flex items-center gap-2.5 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-brand">
      <span aria-hidden className="h-px w-5 bg-lime" />
      {children}
    </h2>
  );
}

export function Footer() {
  return (
    <footer className="relative border-t bg-cream">
      {/* Faint dot-grid texture, echoing the hero background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(27,29,35,0.04)_1px,transparent_1.5px)] [background-size:22px_22px] [mask-image:linear-gradient(255deg,black,transparent_55%)]"
      />

      {/* Main columns — equal widths, equal gaps, shared baseline */}
      <div className="container-site relative grid gap-10 py-14 sm:grid-cols-2 sm:py-16 lg:grid-cols-3">
        <div>
          <Image
            src="/images/youwin-logo.png"
            alt="YouWin Educational Consulting"
            width={182}
            height={48}
            className="h-12 w-auto"
          />
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
            {site.description}
          </p>
          <ul className="mt-6 flex gap-2.5">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  aria-label={s.label}
                  {...(s.href.startsWith("http")
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="flex size-10 items-center justify-center rounded-full border border-ink/10 bg-white text-muted-foreground shadow-[0_1px_2px_rgba(27,29,35,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:border-brand hover:bg-brand hover:text-white"
                >
                  <s.icon className="size-4" aria-hidden />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <ColumnLabel>Links</ColumnLabel>
          <ul className="mt-5 space-y-3">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="group inline-flex items-center gap-1 text-sm text-ink/80 transition-colors hover:text-brand"
                >
                  {item.label}
                  <ArrowUpRight
                    aria-hidden
                    className="size-3 -translate-x-0.5 translate-y-0.5 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <ColumnLabel>Get Started</ColumnLabel>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
            Get expert guidance tailored to your goals.
          </p>
          <ul className="mt-4 space-y-3 text-sm text-ink/80">
            {site.phones.map((phone) => (
              <li key={phone}>
                <a
                  href={`tel:${phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-2.5 transition-colors hover:text-brand"
                >
                  <Phone className="size-4 text-brand" aria-hidden /> {phone}
                </a>
              </li>
            ))}
            <li>
              <a
                href={`mailto:${site.email}`}
                className="flex items-center gap-2.5 transition-colors hover:text-brand"
              >
                <Mail className="size-4 text-brand" aria-hidden /> {site.email}
              </a>
            </li>
          </ul>
          <Button asChild className="mt-6">
            <Link href="/book-consultation">Book Free Consultation</Link>
          </Button>
        </div>
      </div>

      <div className="relative border-t">
        <div className="container-site py-5 text-center font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-muted-foreground">
          <p>
            Copyright © {new Date().getFullYear()} YouWin Education Consulting
          </p>
        </div>
      </div>
    </footer>
  );
}
