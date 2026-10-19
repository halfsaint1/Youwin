/**
 * Consultation scheduling rules. All slots are in Lagos time (WAT, UTC+1),
 * which does not observe daylight saving, so a fixed offset is safe.
 */

export const BOOKING_TIMEZONE = "Africa/Lagos";
export const BOOKING_TIMEZONE_LABEL = "Lagos time (WAT)";
const LAGOS_UTC_OFFSET_MINUTES = 60;

export const SLOT_MINUTES = 30;
/** Minimum notice before a slot can be booked. */
const LEAD_TIME_MINUTES = 120;
/** How many days ahead (including today) can be booked. */
export const BOOKING_WINDOW_DAYS = 21;

/** Opening hours per weekday (0 = Sunday), as [startHour, endHour) in Lagos time. */
const OPENING_HOURS: Record<number, [number, number] | null> = {
  0: null,
  1: [9, 19],
  2: [9, 19],
  3: [9, 19],
  4: [9, 19],
  5: [9, 19],
  6: [10, 14],
};

const DATE_KEY = /^(\d{4})-(\d{2})-(\d{2})$/;
const TIME_KEY = /^([01]\d|2[0-3]):([0-5]\d)$/;

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function parseDateKey(dateKey: string) {
  const match = DATE_KEY.exec(dateKey);
  if (!match) return null;
  const [, y, m, d] = match.map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  if (date.getUTCMonth() !== m - 1 || date.getUTCDate() !== d) return null;
  return { y, m, d, weekday: date.getUTCDay() };
}

function toDateKey(date: Date) {
  return `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(date.getUTCDate())}`;
}

/** Today's date in Lagos as YYYY-MM-DD. */
export function lagosTodayKey(now: Date) {
  return toDateKey(new Date(now.getTime() + LAGOS_UTC_OFFSET_MINUTES * 60_000));
}

export function addDays(dateKey: string, days: number) {
  const parsed = parseDateKey(dateKey);
  if (!parsed) return dateKey;
  return toDateKey(new Date(Date.UTC(parsed.y, parsed.m - 1, parsed.d + days)));
}

/** The real-world instant a Lagos date + time refers to. */
export function slotInstant(dateKey: string, time: string) {
  const date = parseDateKey(dateKey);
  const t = TIME_KEY.exec(time);
  if (!date || !t) return null;
  const minutes = Number(t[1]) * 60 + Number(t[2]) - LAGOS_UTC_OFFSET_MINUTES;
  return new Date(Date.UTC(date.y, date.m - 1, date.d, 0, minutes));
}

/** Bookable HH:mm slots for a Lagos date, excluding anything too soon. */
export function slotsForDate(dateKey: string, now: Date) {
  const date = parseDateKey(dateKey);
  if (!date) return [];

  const today = lagosTodayKey(now);
  const last = addDays(today, BOOKING_WINDOW_DAYS - 1);
  if (dateKey < today || dateKey > last) return [];

  const hours = OPENING_HOURS[date.weekday];
  if (!hours) return [];

  const earliest = now.getTime() + LEAD_TIME_MINUTES * 60_000;
  const slots: string[] = [];
  for (let m = hours[0] * 60; m < hours[1] * 60; m += SLOT_MINUTES) {
    const time = `${pad(Math.floor(m / 60))}:${pad(m % 60)}`;
    const instant = slotInstant(dateKey, time);
    if (instant && instant.getTime() >= earliest) slots.push(time);
  }
  return slots;
}

export function isBookableSlot(dateKey: string, time: string, now: Date) {
  return slotsForDate(dateKey, now).includes(time);
}

/** Every date in the booking window that still has at least one slot. */
export function bookableDates(now: Date) {
  const today = lagosTodayKey(now);
  return Array.from({ length: BOOKING_WINDOW_DAYS }, (_, i) =>
    addDays(today, i)
  ).filter((key) => slotsForDate(key, now).length > 0);
}

export function formatDateLong(dateKey: string) {
  const date = parseDateKey(dateKey);
  if (!date) return dateKey;
  return new Date(Date.UTC(date.y, date.m - 1, date.d)).toLocaleDateString(
    "en-GB",
    { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }
  );
}

export function formatTime(time: string) {
  const t = TIME_KEY.exec(time);
  if (!t) return time;
  const h = Number(t[1]);
  const suffix = h < 12 ? "am" : "pm";
  return `${h % 12 || 12}:${t[2]} ${suffix}`;
}

/** Calendar cells (Monday-first) for the month containing `monthKey` (YYYY-MM). */
export function monthGrid(monthKey: string) {
  const [y, m] = monthKey.split("-").map(Number);
  const first = new Date(Date.UTC(y, m - 1, 1));
  const daysInMonth = new Date(Date.UTC(y, m, 0)).getUTCDate();
  const leading = (first.getUTCDay() + 6) % 7;
  const cells: (string | null)[] = Array(leading).fill(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(`${y}-${pad(m)}-${pad(d)}`);
  while (cells.length % 7) cells.push(null);
  return cells;
}

export function formatMonth(monthKey: string) {
  const [y, m] = monthKey.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, 1)).toLocaleDateString("en-GB", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

/** UTC timestamp in the compact form calendar links expect, e.g. 20261021T093000Z. */
export function calendarStamp(date: Date) {
  return date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}
