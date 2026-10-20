"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CalendarPlus,
  Check,
  CheckCircle2,
  Clock,
  Download,
  Globe,
  Phone,
  Sparkles,
  Video,
} from "lucide-react";

import { site } from "@/lib/site";
import { destinations } from "@/lib/content";
import {
  BOOKING_TIMEZONE_LABEL,
  SLOT_MINUTES,
  bookableDates,
  calendarStamp,
  formatDateLong,
  formatTime,
  slotInstant,
} from "@/lib/booking";
import {
  consultationSchema,
  meetingMethods,
  type ConsultationValues,
} from "@/lib/forms/consultation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SelectNative } from "@/components/ui/select-native";
import { WhatsAppIcon } from "@/components/social-icons";
import {
  DateTimePicker,
  localTimeFor,
} from "@/components/booking/date-time-picker";

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

const methodIcons = {
  "Phone call": Phone,
  "WhatsApp call": WhatsAppIcon,
  "Video call": Video,
} as const;

const steps = ["Date & time", "Your details"] as const;

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

function calendarLinks(date: string, time: string, method: string) {
  const start = slotInstant(date, time);
  if (!start) return null;
  const end = new Date(start.getTime() + SLOT_MINUTES * 60_000);
  const title = "YouWin free study abroad consultation";
  const details = `Requested ${method.toLowerCase()} with YouWin Educational Consulting. Our team will contact you to confirm. Questions: ${site.whatsapp} or ${site.email}.`;

  const google = `https://calendar.google.com/calendar/render?${new URLSearchParams({
    action: "TEMPLATE",
    text: title,
    dates: `${calendarStamp(start)}/${calendarStamp(end)}`,
    details,
  })}`;

  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//YouWin Educational Consulting//Consultation//EN",
    "BEGIN:VEVENT",
    `UID:${calendarStamp(start)}-${Math.random().toString(36).slice(2)}@youwinconsult.com`,
    `DTSTAMP:${calendarStamp(new Date())}`,
    `DTSTART:${calendarStamp(start)}`,
    `DTEND:${calendarStamp(end)}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${details.replace(/,/g, "\\,")}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  return {
    google,
    ics: `data:text/calendar;charset=utf-8,${encodeURIComponent(ics)}`,
  };
}

function SummaryPanel({
  date,
  time,
  method,
}: {
  date: string;
  time: string;
  method?: string;
}) {
  const local = date && time ? localTimeFor(date, time) : null;
  return (
    <aside className="relative overflow-hidden bg-ink p-7 text-white sm:p-9">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 -top-20 size-64 rounded-full bg-brand/70 blur-[90px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -left-10 size-56 rounded-full bg-lime/10 blur-[80px]"
      />
      <div className="relative">
        <p className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-lime">
          YouWin Educational Consulting
        </p>
        <h2 className="mt-3 text-2xl font-bold leading-tight tracking-tight">
          Free study abroad consultation
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-white/65">
          A one-to-one session with an adviser to map out your universities,
          costs and visa steps.
        </p>

        <ul className="mt-7 space-y-3.5 text-sm text-white/80">
          <li className="flex items-center gap-3">
            <Sparkles className="size-4 shrink-0 text-lime" aria-hidden />
            100% free, no obligation
          </li>
          <li className="flex items-center gap-3">
            <Video className="size-4 shrink-0 text-lime" aria-hidden />
            Phone, WhatsApp or video call
          </li>
          <li className="flex items-center gap-3">
            <Globe className="size-4 shrink-0 text-lime" aria-hidden />
            {BOOKING_TIMEZONE_LABEL}
          </li>
        </ul>

        <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur">
          <p className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-white/50">
            Your selection
          </p>
          {date ? (
            <div className="mt-3 space-y-2.5">
              <p className="flex items-start gap-3 font-semibold">
                <CalendarDays className="mt-0.5 size-4 shrink-0 text-lime" aria-hidden />
                {formatDateLong(date)}
              </p>
              <p className="flex items-start gap-3 font-semibold">
                <Clock className="mt-0.5 size-4 shrink-0 text-lime" aria-hidden />
                <span>
                  {time ? formatTime(time) : "Choose a time"}
                  {local && (
                    <span className="block text-xs font-normal text-white/55">
                      {local}
                    </span>
                  )}
                </span>
              </p>
              {method && (
                <p className="flex items-start gap-3 font-semibold">
                  <Phone className="mt-0.5 size-4 shrink-0 text-lime" aria-hidden />
                  {method}
                </p>
              )}
            </div>
          ) : (
            <p className="mt-3 text-sm text-white/60">
              Pick a date and time to see it here.
            </p>
          )}
        </div>
      </div>
    </aside>
  );
}

export function BookConsultationForm() {
  const [now, setNow] = useState<Date | null>(null);
  const [step, setStep] = useState<0 | 1>(0);
  const [booked, setBooked] = useState<ConsultationValues | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => setNow(new Date()), []);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<ConsultationValues>({
    resolver: zodResolver(consultationSchema),
    defaultValues: {
      destination: "",
      studyLevel: "",
      focus: "",
      consultationDate: "",
      consultationTime: "",
      countryOfResidence: "Nigeria",
    },
  });

  const date = watch("consultationDate");
  const time = watch("consultationTime");
  const method = watch("contactMethod");

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
      setBooked(data);
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "We could not send your request right now. Please try again."
      );
    }
  };

  const goToDetails = async () => {
    const ok = await trigger(["consultationDate", "consultationTime"]);
    if (ok) {
      setStep(1);
      document
        .getElementById("booking")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (booked) {
    const links = calendarLinks(
      booked.consultationDate,
      booked.consultationTime,
      booked.contactMethod
    );
    const local = localTimeFor(booked.consultationDate, booked.consultationTime);
    return (
      <div className="overflow-hidden rounded-[2rem] border bg-white shadow-soft">
        <div className="grid lg:grid-cols-[22rem_1fr]">
          <SummaryPanel
            date={booked.consultationDate}
            time={booked.consultationTime}
            method={booked.contactMethod}
          />
          <div className="flex flex-col items-center justify-center px-7 py-14 text-center sm:px-12">
            <span className="flex size-16 items-center justify-center rounded-full bg-brand-soft text-brand ring-8 ring-brand-soft/40">
              <CheckCircle2 className="size-8" aria-hidden />
            </span>
            <h2 className="mt-6 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              Request received, {booked.name.split(" ")[0]}!
            </h2>
            <p className="mt-3 max-w-md leading-relaxed text-muted-foreground">
              We&apos;ve received your request for{" "}
              <strong className="font-semibold text-ink">
                {formatDateLong(booked.consultationDate)} at{" "}
                {formatTime(booked.consultationTime)}
              </strong>{" "}
              ({BOOKING_TIMEZONE_LABEL}
              {local ? `, ${local}` : ""}). Our team will contact you on{" "}
              {booked.phone} to confirm your {booked.contactMethod.toLowerCase()}.
            </p>
            {links && (
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Button asChild>
                  <a href={links.google} target="_blank" rel="noopener noreferrer">
                    <CalendarPlus aria-hidden /> Add to Google Calendar
                  </a>
                </Button>
                <Button asChild variant="outline">
                  <a href={links.ics} download="youwin-consultation.ics">
                    <Download aria-hidden /> Download calendar file
                  </a>
                </Button>
              </div>
            )}
            <p className="mt-8 text-sm text-muted-foreground">
              Need to change something?{" "}
              <a
                href={site.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-brand underline-offset-4 hover:underline"
              >
                Message us on WhatsApp
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="overflow-hidden rounded-[2rem] border bg-white shadow-soft"
    >
      <input type="hidden" {...register("consultationDate")} />
      <input type="hidden" {...register("consultationTime")} />

      <div className="grid lg:grid-cols-[22rem_1fr]">
        <SummaryPanel date={date} time={time} method={method} />

        <div className="min-w-0 p-6 sm:p-9">
          <ol className="flex items-center gap-3" aria-label="Booking steps">
            {steps.map((label, i) => {
              const done = i < step;
              const active = i === step;
              return (
                <li key={label} className="flex items-center gap-3">
                  {i > 0 && <span aria-hidden className="h-px w-8 bg-border sm:w-12" />}
                  <span
                    aria-current={active ? "step" : undefined}
                    className={cn(
                      "flex items-center gap-2 text-sm font-medium",
                      active || done ? "text-ink" : "text-muted-foreground"
                    )}
                  >
                    <span
                      className={cn(
                        "flex size-7 items-center justify-center rounded-full font-mono text-xs font-semibold",
                        done
                          ? "bg-brand text-white"
                          : active
                            ? "bg-brand-soft text-brand ring-2 ring-brand"
                            : "bg-muted text-muted-foreground"
                      )}
                    >
                      {done ? <Check className="size-3.5" aria-hidden /> : i + 1}
                    </span>
                    {label}
                  </span>
                </li>
              );
            })}
          </ol>

          <div className="mt-8">
            {step === 0 ? (
              <>
                <h2 className="text-xl font-bold tracking-tight text-ink sm:text-2xl">
                  Choose a date and time
                </h2>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  Pick the slot that suits you best. We&apos;ll confirm it with
                  you directly.
                </p>
                <div className="mt-7">
                  {now ? (
                    <DateTimePicker
                      now={now}
                      availableDates={bookableDates(now)}
                      date={date}
                      time={time}
                      onDateChange={(next) => {
                        setValue("consultationDate", next, { shouldValidate: false });
                        setValue("consultationTime", "", { shouldValidate: false });
                      }}
                      onTimeChange={(next) =>
                        setValue("consultationTime", next, { shouldValidate: true })
                      }
                      timeError={
                        errors.consultationDate?.message ??
                        errors.consultationTime?.message
                      }
                    />
                  ) : (
                    <div className="h-80 animate-pulse rounded-2xl bg-muted" />
                  )}
                </div>
                <div className="mt-8 flex flex-col-reverse gap-4 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs text-muted-foreground">
                    Prefer to talk now?{" "}
                    <a
                      href={site.whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-brand underline-offset-4 hover:underline"
                    >
                      Chat with us on WhatsApp
                    </a>
                  </p>
                  <Button
                    type="button"
                    size="lg"
                    onClick={goToDetails}
                    disabled={!date || !time}
                  >
                    Continue <ArrowRight aria-hidden />
                  </Button>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-xl font-bold tracking-tight text-ink sm:text-2xl">
                  Tell us about yourself
                </h2>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  This helps us match you with the right adviser before your
                  call.
                </p>

                <fieldset className="mt-7">
                  <legend className="text-sm font-medium text-ink">
                    How would you like to meet?
                  </legend>
                  <div className="mt-2.5 grid gap-3 sm:grid-cols-3">
                    {meetingMethods.map((option) => {
                      const Icon = methodIcons[option];
                      const selected = method === option;
                      return (
                        <label
                          key={option}
                          className={cn(
                            "flex cursor-pointer items-center gap-3 rounded-2xl border p-4 text-sm font-semibold transition-all has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring",
                            selected
                              ? "border-brand bg-brand-soft text-brand"
                              : "border-border text-ink hover:border-brand/40"
                          )}
                        >
                          <input
                            type="radio"
                            value={option}
                            className="sr-only"
                            {...register("contactMethod")}
                          />
                          <span
                            className={cn(
                              "flex size-9 items-center justify-center rounded-full",
                              selected ? "bg-brand text-white" : "bg-muted text-ink"
                            )}
                          >
                            <Icon className="size-4" aria-hidden />
                          </span>
                          {option}
                        </label>
                      );
                    })}
                  </div>
                  {errors.contactMethod && (
                    <p className="mt-2 text-xs font-medium text-destructive">
                      {errors.contactMethod.message}
                    </p>
                  )}
                </fieldset>

                <div className="mt-7 grid gap-5 sm:grid-cols-2">
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
                  <div className="sm:col-span-2">
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
                  </div>
                  <div className="sm:col-span-2">
                    <Field
                      label="Your goals or questions"
                      htmlFor="booking-message"
                      optional
                      error={errors.message?.message}
                    >
                      <Textarea
                        id="booking-message"
                        className="min-h-24"
                        placeholder="Tell us about your results, budget, timeline, or anything you'd like to discuss…"
                        {...register("message")}
                      />
                    </Field>
                  </div>
                </div>

                {(submitError || errors.consultationTime) && (
                  <p
                    className="mt-6 rounded-xl bg-destructive/5 px-4 py-3 text-sm font-medium text-destructive"
                    role="alert"
                  >
                    {submitError ?? errors.consultationTime?.message}
                  </p>
                )}

                <div className="mt-8 flex flex-col-reverse gap-4 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">
                  <Button type="button" variant="ghost" onClick={() => setStep(0)}>
                    <ArrowLeft aria-hidden /> Change date &amp; time
                  </Button>
                  <Button type="submit" size="lg" disabled={isSubmitting}>
                    {isSubmitting ? "Booking…" : "Confirm booking"}
                    {!isSubmitting && <ArrowRight aria-hidden />}
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}
