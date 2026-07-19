"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChevronDown, Mail, Menu, Phone } from "lucide-react";

import { cn } from "@/lib/utils";
import { nav, site, studyAbroadNav } from "@/lib/site";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [studyMenuOpen, setStudyMenuOpen] = useState(false);
  const [mobileStudyMenuOpen, setMobileStudyMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setStudyMenuOpen(false);
    setMobileStudyMenuOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40">
      {/* Main navigation */}
      <div
        className={cn(
          "border-b border-transparent bg-white/95 backdrop-blur transition-all duration-300",
          scrolled && "border-border shadow-[0_1px_12px_rgba(27,29,35,0.06)]"
        )}
      >
        <div className="container-site flex h-18 items-center justify-between gap-6">
          <Link href="/" className="shrink-0" aria-label="YouWin — Home">
            <Image
              src="/images/youwin-logo.png"
              alt="YouWin Educational Consulting"
              width={182}
              height={48}
              priority
              className="h-12 w-auto"
            />
          </Link>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              <li
                className="relative"
                onMouseEnter={() => setStudyMenuOpen(true)}
                onMouseLeave={() => setStudyMenuOpen(false)}
                onBlur={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget)) {
                    setStudyMenuOpen(false);
                  }
                }}
              >
                <button
                  type="button"
                  className={cn(
                    "flex items-center gap-1.5 rounded-full px-4 py-2 text-base font-medium transition-colors hover:bg-secondary hover:text-brand",
                    pathname.startsWith("/destinations") && "text-brand"
                  )}
                  aria-expanded={studyMenuOpen}
                  aria-controls="study-abroad-menu"
                  onClick={() => setStudyMenuOpen(true)}
                  onKeyDown={(event) => {
                    if (event.key === "Escape") {
                      setStudyMenuOpen(false);
                      event.currentTarget.focus();
                    }
                  }}
                >
                  Study Abroad
                  <ChevronDown
                    className={cn(
                      "size-4 transition-transform duration-200",
                      studyMenuOpen && "rotate-180"
                    )}
                    aria-hidden
                  />
                </button>

                <div
                  id="study-abroad-menu"
                  className={cn(
                    "absolute left-1/2 top-full z-50 w-72 -translate-x-1/2 pt-3 transition duration-200",
                    studyMenuOpen
                      ? "visible translate-y-0 opacity-100"
                      : "invisible -translate-y-2 opacity-0"
                  )}
                >
                  <div className="rounded-2xl border bg-white p-2 shadow-[0_24px_64px_-24px_rgba(27,29,35,0.28)]">
                    <div className="px-3 pb-2 pt-2">
                      <p className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-brand">
                        Study destinations
                      </p>
                    </div>
                    {studyAbroadNav.map((destination) => (
                      <Link
                        key={destination.href}
                        href={destination.href}
                        className={cn(
                          "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-brand-soft hover:text-brand",
                          pathname === destination.href &&
                            "bg-brand-soft text-brand"
                        )}
                      >
                        <Image
                          src={destination.flag}
                          alt=""
                          width={28}
                          height={18}
                          className="h-[1.125rem] w-7 rounded-sm object-cover shadow-sm"
                        />
                        {destination.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </li>

              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "rounded-full px-4 py-2 text-base font-medium transition-colors hover:bg-secondary hover:text-brand",
                      pathname === item.href && "text-brand"
                    )}
                    aria-current={pathname === item.href ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <Button asChild className="hidden sm:inline-flex">
              <Link href="/book-consultation">Book Free Consultation</Link>
            </Button>

            {/* Mobile menu */}
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <button
                  className="rounded-full p-2.5 transition-colors hover:bg-secondary lg:hidden"
                  aria-label="Open menu"
                >
                  <Menu className="size-5" />
                </button>
              </SheetTrigger>
              <SheetContent className="p-6">
                <SheetTitle className="sr-only">Navigation menu</SheetTitle>
                <SheetDescription className="sr-only">
                  Links to all pages of the YouWin website
                </SheetDescription>
                <Image
                  src="/images/youwin-logo.png"
                  alt="YouWin Educational Consulting"
                  width={152}
                  height={40}
                  className="h-10 w-auto self-start"
                />
                <nav aria-label="Mobile" className="mt-8">
                  <ul className="flex flex-col gap-1">
                    <li>
                      <button
                        type="button"
                        className={cn(
                          "flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-base font-medium transition-colors hover:bg-secondary",
                          pathname.startsWith("/destinations") &&
                            "bg-brand-soft text-brand"
                        )}
                        aria-expanded={mobileStudyMenuOpen}
                        aria-controls="mobile-study-abroad-menu"
                        onClick={() =>
                          setMobileStudyMenuOpen((current) => !current)
                        }
                      >
                        Study Abroad
                        <ChevronDown
                          className={cn(
                            "size-4 transition-transform duration-200",
                            mobileStudyMenuOpen && "rotate-180"
                          )}
                          aria-hidden
                        />
                      </button>
                      <div
                        id="mobile-study-abroad-menu"
                        className={cn(
                          "grid transition-[grid-template-rows] duration-300",
                          mobileStudyMenuOpen
                            ? "grid-rows-[1fr]"
                            : "grid-rows-[0fr]"
                        )}
                      >
                        <ul className="min-h-0 overflow-hidden pl-3">
                          {studyAbroadNav.map((destination) => (
                            <li key={destination.href}>
                              <Link
                                href={destination.href}
                                className={cn(
                                  "flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors hover:bg-secondary",
                                  pathname === destination.href &&
                                    "text-brand"
                                )}
                              >
                                <Image
                                  src={destination.flag}
                                  alt=""
                                  width={24}
                                  height={16}
                                  className="h-4 w-6 rounded-sm object-cover shadow-sm"
                                />
                                {destination.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </li>

                    {nav.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className={cn(
                            "block rounded-xl px-4 py-3 text-base font-medium transition-colors hover:bg-secondary",
                            pathname === item.href && "bg-brand-soft text-brand"
                          )}
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
                <Button asChild size="lg" className="mt-8">
                  <Link href="/book-consultation">Book Free Consultation</Link>
                </Button>
                <div className="mt-auto space-y-2 pt-8 text-sm text-muted-foreground">
                  <a
                    href={`tel:${site.phones[0].replace(/\s/g, "")}`}
                    className="flex items-center gap-2 hover:text-brand"
                  >
                    <Phone className="size-4 text-brand" /> {site.phones[0]}
                  </a>
                  <a
                    href={`mailto:${site.email}`}
                    className="flex items-center gap-2 hover:text-brand"
                  >
                    <Mail className="size-4 text-brand" /> {site.email}
                  </a>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
