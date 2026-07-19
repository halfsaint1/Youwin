"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { site } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Deliberately lightweight (no RHF/Zod): this form ships in the footer on
// every page, so a single email field isn't worth 80 kB in the shared bundle.
export function NewsletterForm() {
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (subscribed) {
    return (
      <p className="flex items-center gap-2 rounded-full bg-brand-soft px-5 py-3 text-sm font-medium text-brand">
        <CheckCircle2 className="size-4" aria-hidden />
        Thank you — we&apos;ll keep you posted!
      </p>
    );
  }

  return (
    <form
      noValidate
      className="w-full max-w-md"
      onSubmit={(e) => {
        e.preventDefault();
        const input = e.currentTarget.elements.namedItem(
          "email"
        ) as HTMLInputElement;
        if (!input.checkValidity()) {
          setError("Please enter a valid email address.");
          input.focus();
          return;
        }
        // No backend yet — open a prefilled email to the YouWin inbox.
        window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
          "Newsletter subscription"
        )}&body=${encodeURIComponent(
          `Please subscribe ${input.value} to the YouWin newsletter.`
        )}`;
        setSubscribed(true);
      }}
    >
      <div className="flex gap-2">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <Input
          id="newsletter-email"
          name="email"
          type="email"
          required
          placeholder="Enter your email address"
          aria-invalid={!!error}
          aria-describedby={error ? "newsletter-email-error" : undefined}
          onChange={() => setError(null)}
          className="h-12 rounded-full bg-white px-5"
        />
        <Button type="submit" size="lg" className="h-12 shrink-0">
          Subscribe <ArrowRight className="size-4" aria-hidden />
        </Button>
      </div>
      {error && (
        <p
          id="newsletter-email-error"
          className="mt-2 pl-5 text-xs font-medium text-destructive"
        >
          {error}
        </p>
      )}
    </form>
  );
}
