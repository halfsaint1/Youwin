import { z } from "zod";

import {
  BOOKING_TIMEZONE_LABEL,
  formatDateLong,
  formatTime,
  isBookableSlot,
} from "@/lib/booking";

export const meetingMethods = ["Phone call", "WhatsApp call", "Video call"] as const;

export const consultationSchema = z
  .object({
    name: z.string().min(2, "Please enter your full name."),
    email: z.string().email("Please enter a valid email address."),
    phone: z
      .string()
      .min(7, "Please enter a valid phone or WhatsApp number.")
      .regex(
        /^[+\d][\d\s()-]{6,}$/,
        "Please enter a valid phone or WhatsApp number."
      ),
    countryOfResidence: z
      .string()
      .min(2, "Please enter your country of residence."),
    destination: z.string().min(1, "Please choose a destination."),
    studyLevel: z.string().min(1, "Please choose a study level."),
    focus: z.string().min(1, "Please choose what you need help with."),
    contactMethod: z.enum(meetingMethods, {
      message: "Please choose how you'd like to meet.",
    }),
    consultationDate: z.string().min(1, "Please choose a date."),
    consultationTime: z.string().min(1, "Please choose a time."),
    message: z.string().optional(),
  })
  .refine(
    (data) =>
      isBookableSlot(data.consultationDate, data.consultationTime, new Date()),
    {
      message: "That time is no longer available. Please pick another slot.",
      path: ["consultationTime"],
    }
  );

export type ConsultationValues = z.infer<typeof consultationSchema>;

export function formatConsultationSlot(data: {
  consultationDate: string;
  consultationTime: string;
}) {
  return `${formatDateLong(data.consultationDate)}, ${formatTime(data.consultationTime)} ${BOOKING_TIMEZONE_LABEL}`;
}

export function formatConsultationEmail(data: ConsultationValues) {
  return [
    "Free Consultation Request",
    "",
    `Requested slot: ${formatConsultationSlot(data)}`,
    `Meeting method: ${data.contactMethod}`,
    "",
    `Full name: ${data.name}`,
    `Email: ${data.email}`,
    `Phone / WhatsApp: ${data.phone}`,
    `Country of residence: ${data.countryOfResidence}`,
    `Preferred destination: ${data.destination}`,
    `Study level: ${data.studyLevel}`,
    `Need help with: ${data.focus}`,
    data.message ? `\nGoals or questions:\n${data.message}` : null,
  ]
    .filter((line) => line !== null)
    .join("\n");
}
