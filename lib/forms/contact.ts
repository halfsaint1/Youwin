import { z } from "zod";

export const contactSubjects = [
  "General enquiry",
  "Admissions & applications",
  "Student visa support",
  "Scholarships",
  "Partnerships",
] as const;

export const contactSchema = z.object({
  name: z.string().min(2, "Please enter your full name."),
  email: z.string().email("Please enter a valid email address."),
  phone: z
    .string()
    .min(7, "Please enter a valid phone or WhatsApp number.")
    .regex(
      /^[+\d][\d\s()-]{6,}$/,
      "Please enter a valid phone or WhatsApp number."
    ),
  subject: z.string().min(1, "Please choose a subject."),
  message: z
    .string()
    .min(10, "Tell us a little more — at least 10 characters."),
});

export type ContactValues = z.infer<typeof contactSchema>;

export function formatContactEmail(data: ContactValues) {
  return [
    "Contact Form Message",
    "",
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Phone / WhatsApp: ${data.phone}`,
    `Subject: ${data.subject}`,
    "",
    "Message:",
    data.message,
  ].join("\n");
}
