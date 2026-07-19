import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="container-site flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <span className="flex size-16 items-center justify-center rounded-3xl bg-brand-soft text-brand">
        <Compass className="size-8" aria-hidden />
      </span>
      <p className="eyebrow mt-8">404 — Page Not Found</p>
      <h1 className="mt-3 text-balance text-3xl font-bold tracking-tight text-ink sm:text-4xl">
        This page seems to have gone abroad
      </h1>
      <p className="mt-4 max-w-md text-muted-foreground">
        The page you’re looking for doesn’t exist or has moved. Let’s get you
        back on the right path.
      </p>
      <Button asChild size="lg" className="mt-8">
        <Link href="/">
          <ArrowLeft className="size-4" aria-hidden /> Back to Home
        </Link>
      </Button>
    </section>
  );
}
