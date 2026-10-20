"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Globe } from "lucide-react";

import {
  BOOKING_TIMEZONE_LABEL,
  formatDateLong,
  formatMonth,
  formatTime,
  lagosTodayKey,
  monthGrid,
  slotInstant,
  slotsForDate,
} from "@/lib/booking";
import { cn } from "@/lib/utils";

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const periods = [
  { label: "Morning", from: 0, to: 12 },
  { label: "Afternoon", from: 12, to: 16 },
  { label: "Evening", from: 16, to: 24 },
];

function visitorTimeZone() {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch {
    return undefined;
  }
}

/** The visitor's local time for a Lagos slot, or null when they are on Lagos time. */
export function localTimeFor(dateKey: string, time: string) {
  const zone = visitorTimeZone();
  const instant = slotInstant(dateKey, time);
  if (!zone || !instant) return null;
  const lagos = instant.toLocaleString("en-GB", { timeZone: "Africa/Lagos" });
  const local = instant.toLocaleString("en-GB", { timeZone: zone });
  if (lagos === local) return null;
  const label = instant.toLocaleString("en-GB", {
    timeZone: zone,
    weekday: "short",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  const city = zone.split("/").pop()?.replace(/_/g, " ");
  return `${label} ${city ? `in ${city}` : "your time"}`;
}

export function DateTimePicker({
  now,
  availableDates,
  date,
  time,
  onDateChange,
  onTimeChange,
  timeError,
}: {
  now: Date;
  availableDates: string[];
  date: string;
  time: string;
  onDateChange: (date: string) => void;
  onTimeChange: (time: string) => void;
  timeError?: string;
}) {
  const today = lagosTodayKey(now);
  const available = useMemo(() => new Set(availableDates), [availableDates]);
  const months = useMemo(
    () => [...new Set(availableDates.map((d) => d.slice(0, 7)))],
    [availableDates]
  );
  const [monthIndex, setMonthIndex] = useState(() =>
    Math.max(0, months.indexOf((date || availableDates[0] || today).slice(0, 7)))
  );
  const month = months[monthIndex] ?? today.slice(0, 7);
  const cells = monthGrid(month);

  const slots = date ? slotsForDate(date, now) : [];
  const grouped = periods
    .map((p) => ({
      ...p,
      slots: slots.filter((s) => {
        const h = Number(s.slice(0, 2));
        return h >= p.from && h < p.to;
      }),
    }))
    .filter((p) => p.slots.length > 0);

  return (
    <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_17rem] xl:gap-10">
      <div>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-ink" aria-live="polite">
            {formatMonth(month)}
          </h3>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setMonthIndex((i) => Math.max(0, i - 1))}
              disabled={monthIndex === 0}
              aria-label="Previous month"
              className="flex size-9 items-center justify-center rounded-full border text-ink transition-colors hover:border-brand hover:text-brand disabled:pointer-events-none disabled:opacity-30"
            >
              <ChevronLeft className="size-4" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() =>
                setMonthIndex((i) => Math.min(months.length - 1, i + 1))
              }
              disabled={monthIndex >= months.length - 1}
              aria-label="Next month"
              className="flex size-9 items-center justify-center rounded-full border text-ink transition-colors hover:border-brand hover:text-brand disabled:pointer-events-none disabled:opacity-30"
            >
              <ChevronRight className="size-4" aria-hidden />
            </button>
          </div>
        </div>

        <div
          role="grid"
          aria-label={`Choose a date in ${formatMonth(month)}`}
          className="mt-5"
        >
          <div role="row" className="grid grid-cols-7 gap-1.5">
            {WEEKDAYS.map((day) => (
              <div
                key={day}
                role="columnheader"
                className="pb-2 text-center font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-muted-foreground"
              >
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1.5">
            {cells.map((cell, i) => {
              if (!cell) return <div key={`blank-${i}`} role="gridcell" />;
              const isAvailable = available.has(cell);
              const isSelected = cell === date;
              const isToday = cell === today;
              return (
                <div key={cell} role="gridcell">
                  <button
                    type="button"
                    disabled={!isAvailable}
                    aria-pressed={isSelected}
                    aria-label={`${formatDateLong(cell)}${isAvailable ? "" : ", unavailable"}`}
                    onClick={() => onDateChange(cell)}
                    className={cn(
                      "relative flex aspect-square w-full items-center justify-center rounded-xl text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      isSelected
                        ? "bg-brand text-white shadow-[0_8px_20px_-8px_rgba(45,90,5,0.6)]"
                        : isAvailable
                          ? "bg-brand-soft/60 text-brand hover:bg-brand-soft"
                          : "cursor-not-allowed text-muted-foreground/35"
                    )}
                  >
                    {Number(cell.slice(8))}
                    {isToday && (
                      <span
                        aria-hidden
                        className={cn(
                          "absolute bottom-1.5 size-1 rounded-full",
                          isSelected ? "bg-lime" : "bg-brand"
                        )}
                      />
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <p className="mt-5 flex items-center gap-2 text-xs text-muted-foreground">
          <Globe className="size-3.5" aria-hidden />
          Times are shown in {BOOKING_TIMEZONE_LABEL}. Sundays are closed.
        </p>
      </div>

      <div className="xl:border-l xl:pl-10">
        {date ? (
          <>
            <p className="font-semibold text-ink">{formatDateLong(date)}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              {slots.length} {slots.length === 1 ? "time" : "times"} available
            </p>
            <div className="mt-5 max-h-[22rem] space-y-5 overflow-y-auto pr-1">
              {grouped.map((group) => (
                <fieldset key={group.label}>
                  <legend className="mb-2.5 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted-foreground">
                    {group.label}
                  </legend>
                  <div className="grid grid-cols-3 gap-2 xl:grid-cols-2">
                    {group.slots.map((slot) => {
                      const selected = slot === time;
                      return (
                        <button
                          key={slot}
                          type="button"
                          aria-pressed={selected}
                          onClick={() => onTimeChange(slot)}
                          className={cn(
                            "rounded-xl border py-2.5 text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                            selected
                              ? "border-brand bg-brand text-white"
                              : "border-border bg-white text-ink hover:border-brand hover:text-brand"
                          )}
                        >
                          {formatTime(slot)}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>
              ))}
            </div>
          </>
        ) : (
          <div className="flex h-full min-h-40 flex-col items-center justify-center rounded-2xl border border-dashed px-6 py-10 text-center">
            <p className="font-semibold text-ink">Pick a date</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Available times will appear here.
            </p>
          </div>
        )}
        {timeError && (
          <p
            id="booking-time-error"
            role="alert"
            className="mt-3 text-xs font-medium text-destructive"
          >
            {timeError}
          </p>
        )}
      </div>
    </div>
  );
}
