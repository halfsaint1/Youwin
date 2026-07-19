"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { site } from "@/lib/site";
import { destinations } from "@/lib/content";
import {
  consultationSchema,
  type ConsultationValues,
} from "@/lib/forms/consultation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SelectNative } from "@/components/ui/select-native";

const destinationOptions = [
  ...destinations.map((d) => d.name),
  "Other / Not sure yet",
];

const studyLevels = [
  "Undergraduate (Bachelor’s)",
  "Postgraduate (Master’s)",
  "Doctorate (PhD)",
  "Diploma / Foundation",
  "Not sure yet",
];

const consultationFocus = [
  "University & course selection",
  "Application support",
  "Student visa guidance",
  "Scholarships & funding",
  "General study abroad advice",
];

const contactMethods = ["Phone call", "WhatsApp", "Video call", "Email"];

const preferredTimes = [
  "Morning (9am – 12pm)",
  "Afternoon (12pm – 4pm)",
  "Evening (4pm – 7pm)",
  "Flexible",
];

function Field({
  label,
  htmlFor,
  optional = false,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  optional?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-2">
      <div className="flex items-baseline justify-between gap-3">
        <Label htmlFor={htmlFor} className="text-sm font-medium text-ink">
          {label}
        </Label>
        {optional && (
          <span className="shrink-0 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground/70">
            Optional
          </span>
        )}
      </div>
      {children}
      {error && (
        <p id={`${htmlFor}-error`} className="text-xs font-medium text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}

export function BookConsultationForm() {
  const [sent, setSent] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ConsultationValues>({
    resolver: zodResolver(consultationSchema),
    defaultValues: {
      destination: "",
      studyLevel: "",
      focus: "",
      contactMethod: "",
      preferredTime: "",
    },
  });

  if (sent) {
    return (
      <div className="flex flex-col items-center rounded-[2rem] border bg-white px-8 py-14 text-center shadow-soft sm:px-12">
        <span className="flex size-14 items-center justify-center rounded-full bg-brand-soft text-brand">
          <CheckCircle2 className="size-7" aria-hidden />
        </span>
        <h2 className="mt-5 text-xl font-semibold text-ink">
          Consultation request submitted
        </h2>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
          Your details have been sent to our team at {site.formsEmail}. We will
          contact you soon to schedule your free consultation.
        </p>
      </div>
    );
  }

  const onSubmit = async (data: ConsultationValues) => {
    setSubmitError(null);

    try {
      const response = await fetch("/api/consultation", {
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
            "We could not send your request right now. Please try again."
        );
      }

      setSent(true);
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "We could not send your request right now. Please try again."
      );
    }
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="overflow-hidden rounded-[2rem] border bg-white shadow-soft"
    >
      <div className="h-1 bg-gradient-to-r from-brand via-lime to-brand" />

      <div className="space-y-8 p-8 sm:p-10">
        <div className="border-b border-border/80 pb-8">
          <p className="font-mono text-sm font-bold uppercase tracking-[0.18em] text-brand">
            Consultation booking form
          </p>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Tell us a little about your study abroad plans. We will match you
            with the right advisor and schedule a free consultation at a time
            that works for you.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <Field label="Full name" htmlFor="booking-name" error={errors.name?.message}>
            <Input
              id="booking-name"
              autoComplete="name"
              placeholder="Your full name"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "booking-name-error" : undefined}
              {...register("name")}
            />
          </Field>
          <Field label="Email" htmlFor="booking-email" error={errors.email?.message}>
            <Input
              id="booking-email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "booking-email-error" : undefined}
              {...register("email")}
            />
          </Field>
          <Field
            label="Phone / WhatsApp"
            htmlFor="booking-phone"
            error={errors.phone?.message}
          >
            <Input
              id="booking-phone"
              type="tel"
              autoComplete="tel"
              placeholder="+234 800 000 0000"
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? "booking-phone-error" : undefined}
              {...register("phone")}
            />
          </Field>
          <Field
            label="Country of residence"
            htmlFor="booking-country"
            error={errors.countryOfResidence?.message}
          >
            <Input
              id="booking-country"
              autoComplete="country-name"
              placeholder="e.g. Nigeria"
              aria-invalid={!!errors.countryOfResidence}
              aria-describedby={
                errors.countryOfResidence ? "booking-country-error" : undefined
              }
              {...register("countryOfResidence")}
            />
          </Field>
          <Field
            label="Preferred destination"
            htmlFor="booking-destination"
            error={errors.destination?.message}
          >
            <SelectNative
              id="booking-destination"
              aria-invalid={!!errors.destination}
              aria-describedby={
                errors.destination ? "booking-destination-error" : undefined
              }
              {...register("destination")}
            >
              <option value="" disabled>
                Choose a destination
              </option>
              {destinationOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </SelectNative>
          </Field>
          <Field
            label="Study level"
            htmlFor="booking-level"
            error={errors.studyLevel?.message}
          >
            <SelectNative
              id="booking-level"
              aria-invalid={!!errors.studyLevel}
              aria-describedby={errors.studyLevel ? "booking-level-error" : undefined}
              {...register("studyLevel")}
            >
              <option value="" disabled>
                Choose a level
              </option>
              {studyLevels.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </SelectNative>
          </Field>
          <Field
            label="What do you need help with?"
            htmlFor="booking-focus"
            error={errors.focus?.message}
          >
            <SelectNative
              id="booking-focus"
              aria-invalid={!!errors.focus}
              aria-describedby={errors.focus ? "booking-focus-error" : undefined}
              {...register("focus")}
            >
              <option value="" disabled>
                Choose a focus area
              </option>
              {consultationFocus.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </SelectNative>
          </Field>
          <Field
            label="How should we contact you?"
            htmlFor="booking-contact-method"
            error={errors.contactMethod?.message}
          >
            <SelectNative
              id="booking-contact-method"
              aria-invalid={!!errors.contactMethod}
              aria-describedby={
                errors.contactMethod ? "booking-contact-method-error" : undefined
              }
              {...register("contactMethod")}
            >
              <option value="" disabled>
                Choose a contact method
              </option>
              {contactMethods.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </SelectNative>
          </Field>
          <Field
            label="Preferred consultation time"
            htmlFor="booking-time"
            error={errors.preferredTime?.message}
          >
            <SelectNative
              id="booking-time"
              aria-invalid={!!errors.preferredTime}
              aria-describedby={errors.preferredTime ? "booking-time-error" : undefined}
              {...register("preferredTime")}
            >
              <option value="" disabled>
                Choose a time slot
              </option>
              {preferredTimes.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </SelectNative>
          </Field>
          <div className="sm:col-span-2 lg:col-span-3">
            <Field
              label="Your goals or questions"
              htmlFor="booking-message"
              optional
              error={errors.message?.message}
            >
              <Textarea
                id="booking-message"
                className="min-h-24"
                placeholder="Tell us about your ambitions, timeline, or anything you would like to discuss…"
                {...register("message")}
              />
            </Field>
          </div>
        </div>

        {submitError && (
          <p className="text-sm font-medium text-destructive" role="alert">
            {submitError}
          </p>
        )}

        <div className="flex flex-col gap-4 border-t border-border/80 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-sm text-xs leading-relaxed text-muted-foreground">
            100% free. No obligation. Honest guidance tailored to your goals.
          </p>
          <Button type="submit" size="lg" disabled={isSubmitting} className="shrink-0">
            Book Free Consultation <ArrowRight className="size-4" aria-hidden />
          </Button>
        </div>
      </div>
    </form>
  );
}
