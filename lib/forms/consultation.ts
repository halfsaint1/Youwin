import { z } from "zod";

export const consultationSchema = z.object({
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
  contactMethod: z.string().min(1, "Please choose how we should reach you."),
  preferredTime: z.string().min(1, "Please choose a preferred time."),
  message: z.string().optional(),
});

export type ConsultationValues = z.infer<typeof consultationSchema>;

export function formatConsultationEmail(data: ConsultationValues) {
  return [
    "Free Consultation Request",
    "",
    `Full name: ${data.name}`,
    `Email: ${data.email}`,
    `Phone / WhatsApp: ${data.phone}`,
    `Country of residence: ${data.countryOfResidence}`,
    `Preferred destination: ${data.destination}`,
    `Study level: ${data.studyLevel}`,
    `Need help with: ${data.focus}`,
    `Preferred contact method: ${data.contactMethod}`,
    `Preferred time: ${data.preferredTime}`,
    data.message ? `\nGoals or questions:\n${data.message}` : null,
  ]
    .filter((line) => line !== null)
    .join("\n");
}
