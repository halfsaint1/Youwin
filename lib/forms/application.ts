import { z } from "zod";

export const applicationSchema = z.object({
  fullName: z.string().min(2, "Please enter your full name."),
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
  highestQualification: z
    .string()
    .min(2, "Please enter your highest qualification."),
  fieldOfStudy: z.string().min(2, "Please enter your field of study."),
  destination: z.string().min(1, "Please choose a destination."),
  studyLevel: z.string().min(1, "Please choose a study level."),
  intake: z.string().min(1, "Please choose a start timeline."),
  message: z.string().optional(),
});

export type ApplicationValues = z.infer<typeof applicationSchema>;

export function formatApplicationEmail(data: ApplicationValues) {
  return [
    "Student Application",
    "",
    `Full name: ${data.fullName}`,
    `Email: ${data.email}`,
    `Phone / WhatsApp: ${data.phone}`,
    `Country of residence: ${data.countryOfResidence}`,
    `Highest qualification: ${data.highestQualification}`,
    `Field of study: ${data.fieldOfStudy}`,
    `Preferred destination: ${data.destination}`,
    `Study level: ${data.studyLevel}`,
    `Intended start: ${data.intake}`,
    data.message ? `\nAdditional notes:\n${data.message}` : null,
  ]
    .filter((line) => line !== null)
    .join("\n");
}
