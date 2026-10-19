import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";

import { nav, site, studyAbroadNav } from "@/lib/site";
import { FacebookIcon, WhatsAppIcon } from "@/components/social-icons";

const socials = [
  { label: "Facebook", href: site.social.facebook, icon: FacebookIcon },
  { label: "WhatsApp", href: site.whatsappHref, icon: WhatsAppIcon },
];

const linkClass =
  "text-[0.9375rem] text-white/90 transition-colors hover:text-lime focus-visible:text-lime focus-visible:outline-none";

function ColumnHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-white/45">
      {children}
    </h2>
  );
}

export function Footer() {
  return (
    <footer className="bg-forest text-white">
      <div className="container-site grid gap-12 pb-10 pt-16 sm:grid-cols-2 sm:pt-20 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:gap-10">
        <div className="sm:col-span-2 lg:col-span-1">
          <Link href="/" aria-label="YouWin — Home" className="inline-block">
            <Image
              src="/images/youwin-logo-white.png"
              alt="YouWin Educational Consulting"
              width={1024}
              height={355}
              className="h-12 w-auto"
            />
          </Link>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/60">
            Honest, step-by-step study abroad guidance for Nigerian students,
            from your first consultation to arrival day.
          </p>
          <ul className="mt-6 flex gap-1">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex size-10 items-center justify-center rounded-lg text-white/55 transition-colors hover:bg-white/5 hover:text-white"
                >
                  <s.icon className="size-[1.125rem]" aria-hidden />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-labelledby="footer-study-abroad">
          <ColumnHeading>
            <span id="footer-study-abroad">Study abroad</span>
          </ColumnHeading>
          <ul className="mt-5 space-y-3">
            {studyAbroadNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-labelledby="footer-company">
          <ColumnHeading>
            <span id="footer-company">Company</span>
          </ColumnHeading>
          <ul className="mt-5 space-y-3">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/apply" className={linkClass}>
                Apply Now
              </Link>
            </li>
          </ul>
        </nav>

        <div>
          <ColumnHeading>Get in touch</ColumnHeading>
          <ul className="mt-5 space-y-3.5 text-[0.9375rem] text-white/90">
            {site.phones.map((phone) => (
              <li key={phone}>
                <a
                  href={`tel:${phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-3 transition-colors hover:text-lime"
                >
                  <Phone className="size-4 shrink-0 text-white/40" aria-hidden />
                  {phone}
                </a>
              </li>
            ))}
            <li>
              <a
                href={`mailto:${site.email}`}
                className="flex items-center gap-3 break-all transition-colors hover:text-lime"
              >
                <Mail className="size-4 shrink-0 text-white/40" aria-hidden />
                {site.email}
              </a>
            </li>
            <li className="flex items-start gap-3 text-sm leading-relaxed text-white/60">
              <MapPin className="mt-0.5 size-4 shrink-0 text-white/40" aria-hidden />
              <span>
                {site.address.street}, {site.address.locality},{" "}
                {site.address.region}, Nigeria
              </span>
            </li>
            <li className="flex items-start gap-3 text-sm leading-relaxed text-white/60">
              <MapPin className="mt-0.5 size-4 shrink-0 text-white/40" aria-hidden />
              <span>{site.addressUK.full}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="container-site">
        <div className="flex flex-col gap-4 border-t border-white/10 py-7 text-xs leading-relaxed text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li>
              <Link href="/book-consultation" className="transition-colors hover:text-white">
                Book a consultation
              </Link>
            </li>
            <li>
              <Link href="/contact" className="transition-colors hover:text-white">
                Contact
              </Link>
            </li>
            <li>
              <a href="/sitemap.xml" className="transition-colors hover:text-white">
                Sitemap
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
