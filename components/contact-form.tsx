"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Send } from "lucide-react";

import { site } from "@/lib/site";
import {
  contactSchema,
  contactSubjects,
  type ContactValues,
} from "@/lib/forms/contact";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SelectNative } from "@/components/ui/select-native";

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { subject: "" },
  });

  if (sent) {
    return (
      <div className="flex h-full flex-col items-center justify-center rounded-[2rem] border bg-white p-10 text-center">
        <span className="flex size-14 items-center justify-center rounded-full bg-brand-soft text-brand">
          <CheckCircle2 className="size-7" aria-hidden />
        </span>
        <h3 className="mt-5 text-xl font-semibold text-ink">
          Your message is on its way!
        </h3>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
          Your message has been sent to our team at {site.formsEmail}. We&apos;ll
          get back to you as soon as possible.
        </p>
      </div>
    );
  }

  const onSubmit = async (data: ContactValues) => {
    setSubmitError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as {
          error?: string;
        } | null;
        throw new Error(
          payload?.error ??
            "We could not send your message right now. Please try again."
        );
      }

      setSent(true);
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "We could not send your message right now. Please try again."
      );
    }
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-[2rem] border bg-white p-8 sm:p-12"
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="contact-name">Name</Label>
          <Input
            id="contact-name"
            autoComplete="name"
            placeholder="Your full name"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            {...register("name")}
          />
          {errors.name && (
            <p id="contact-name-error" className="text-xs font-medium text-destructive">
              {errors.name.message}
            </p>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="contact-email">Email</Label>
          <Input
            id="contact-email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            {...register("email")}
          />
          {errors.email && (
            <p id="contact-email-error" className="text-xs font-medium text-destructive">
              {errors.email.message}
            </p>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="contact-phone">Phone / WhatsApp</Label>
          <Input
            id="contact-phone"
            type="tel"
            autoComplete="tel"
            placeholder="+234 800 000 0000"
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "contact-phone-error" : undefined}
            {...register("phone")}
          />
          {errors.phone && (
            <p id="contact-phone-error" className="text-xs font-medium text-destructive">
              {errors.phone.message}
            </p>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="contact-subject">Subject</Label>
          <SelectNative
            id="contact-subject"
            aria-invalid={!!errors.subject}
            aria-describedby={
              errors.subject ? "contact-subject-error" : undefined
            }
            {...register("subject")}
          >
            <option value="" disabled>
              What is this about?
            </option>
            {contactSubjects.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </SelectNative>
          {errors.subject && (
            <p
              id="contact-subject-error"
              className="text-xs font-medium text-destructive"
            >
              {errors.subject.message}
            </p>
          )}
        </div>
      </div>
      <div className="mt-6 grid gap-2">
        <Label htmlFor="contact-message">Message</Label>
        <Textarea
          id="contact-message"
          placeholder="Tell us about your study abroad goals…"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          {...register("message")}
        />
        {errors.message && (
          <p id="contact-message-error" className="text-xs font-medium text-destructive">
            {errors.message.message}
          </p>
        )}
      </div>
      {submitError && (
        <p className="mt-6 text-sm font-medium text-destructive">{submitError}</p>
      )}
      <Button
        type="submit"
        size="lg"
        disabled={isSubmitting}
        className="mt-8 w-full sm:w-auto"
      >
        Send Message <Send className="size-4" aria-hidden />
      </Button>
      <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
        We&apos;ll respond as quickly as we can — usually within one business day.
      </p>
    </form>
  );
}
