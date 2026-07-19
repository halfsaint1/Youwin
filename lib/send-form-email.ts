import nodemailer from "nodemailer";

import { site } from "@/lib/site";

type SendFormEmailInput = {
  subject: string;
  text: string;
  replyTo: string;
};

export async function sendFormEmail({
  subject,
  text,
  replyTo,
}: SendFormEmailInput) {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const port = Number(process.env.SMTP_PORT ?? "587");
  const from = process.env.SMTP_FROM ?? site.formsEmail;

  if (!host || !user || !pass) {
    throw new Error(
      "Email delivery is not configured. Add SMTP settings to the server environment."
    );
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
    ...(port === 587 ? { requireTLS: true } : {}),
  });

  await transporter.sendMail({
    from: `"YouWin Website" <${from}>`,
    to: site.formsEmail,
    replyTo,
    subject,
    text,
  });
}
