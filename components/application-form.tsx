"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { site } from "@/lib/site";
import { destinations } from "@/lib/content";
import {
  applicationSchema,
  type ApplicationValues,
} from "@/lib/forms/application";
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
  "Other",
];

const intakes = [
  "As soon as possible",
  "Within 6 months",
  "Within 12 months",
  "Just exploring",
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

export function ApplicationForm() {
  const [sent, setSent] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ApplicationValues>({
    resolver: zodResolver(applicationSchema),
    defaultValues: { destination: "", studyLevel: "", intake: "" },
  });

  if (sent) {
    return (
      <div className="flex flex-col items-center rounded-[2rem] border bg-white px-8 py-14 text-center shadow-soft sm:px-12">
        <span className="flex size-14 items-center justify-center rounded-full bg-brand-soft text-brand">
          <CheckCircle2 className="size-7" aria-hidden />
        </span>
        <h2 className="mt-5 text-xl font-semibold text-ink">
          Application submitted
        </h2>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
          Your details have been sent to our admissions team at {site.formsEmail}.
          We will review your application and follow up with next steps.
        </p>
      </div>
    );
  }

  const onSubmit = async (data: ApplicationValues) => {
    setSubmitError(null);

    try {
      const response = await fetch("/api/application", {
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
            "We could not send your application right now. Please try again."
        );
      }

      setSent(true);
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "We could not send your application right now. Please try again."
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
            Application form
          </p>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Tell us about yourself and your study goals. Our team will review
            your details and guide you toward the right university, course, and
            visa pathway.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <Field label="Full name" htmlFor="app-name" error={errors.fullName?.message}>
            <Input
              id="app-name"
              autoComplete="name"
              placeholder="Your full name"
              aria-invalid={!!errors.fullName}
              aria-describedby={errors.fullName ? "app-name-error" : undefined}
              {...register("fullName")}
            />
          </Field>
          <Field label="Email" htmlFor="app-email" error={errors.email?.message}>
            <Input
              id="app-email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "app-email-error" : undefined}
              {...register("email")}
            />
          </Field>
          <Field
            label="Phone / WhatsApp"
            htmlFor="app-phone"
            error={errors.phone?.message}
          >
            <Input
              id="app-phone"
              type="tel"
              autoComplete="tel"
              placeholder="+234 800 000 0000"
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? "app-phone-error" : undefined}
              {...register("phone")}
            />
          </Field>
          <Field
            label="Country of residence"
            htmlFor="app-country"
            error={errors.countryOfResidence?.message}
          >
            <Input
              id="app-country"
              autoComplete="country-name"
              placeholder="e.g. Nigeria"
              aria-invalid={!!errors.countryOfResidence}
              aria-describedby={
                errors.countryOfResidence ? "app-country-error" : undefined
              }
              {...register("countryOfResidence")}
            />
          </Field>
          <Field
            label="Highest qualification"
            htmlFor="app-qualification"
            error={errors.highestQualification?.message}
          >
            <Input
              id="app-qualification"
              placeholder="e.g. B.Sc. Accounting"
              aria-invalid={!!errors.highestQualification}
              aria-describedby={
                errors.highestQualification ? "app-qualification-error" : undefined
              }
              {...register("highestQualification")}
            />
          </Field>
          <Field
            label="Field of study"
            htmlFor="app-field"
            error={errors.fieldOfStudy?.message}
          >
            <Input
              id="app-field"
              placeholder="e.g. Business, Nursing, Computer Science"
              aria-invalid={!!errors.fieldOfStudy}
              aria-describedby={errors.fieldOfStudy ? "app-field-error" : undefined}
              {...register("fieldOfStudy")}
            />
          </Field>
          <Field
            label="Preferred destination"
            htmlFor="app-destination"
            error={errors.destination?.message}
          >
            <SelectNative
              id="app-destination"
              aria-invalid={!!errors.destination}
              aria-describedby={
                errors.destination ? "app-destination-error" : undefined
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
            htmlFor="app-level"
            error={errors.studyLevel?.message}
          >
            <SelectNative
              id="app-level"
              aria-invalid={!!errors.studyLevel}
              aria-describedby={errors.studyLevel ? "app-level-error" : undefined}
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
            label="Intended start"
            htmlFor="app-intake"
            error={errors.intake?.message}
          >
            <SelectNative
              id="app-intake"
              aria-invalid={!!errors.intake}
              aria-describedby={errors.intake ? "app-intake-error" : undefined}
              {...register("intake")}
            >
              <option value="" disabled>
                Choose a timeline
              </option>
              {intakes.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </SelectNative>
          </Field>
          <div className="sm:col-span-2 lg:col-span-3">
            <Field
              label="Anything else we should know?"
              htmlFor="app-message"
              optional
              error={errors.message?.message}
            >
              <Textarea
                id="app-message"
                className="min-h-24"
                placeholder="Scholarships, questions, or special circumstances…"
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
            Free review. No hidden costs. We respond with honest next steps.
          </p>
          <Button type="submit" size="lg" disabled={isSubmitting} className="shrink-0">
            Submit Application <ArrowRight className="size-4" aria-hidden />
          </Button>
        </div>
      </div>
    </form>
  );
}
