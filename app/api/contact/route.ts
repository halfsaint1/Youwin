import { NextResponse } from "next/server";

import { contactSchema, formatContactEmail } from "@/lib/forms/contact";
import { sendFormEmail } from "@/lib/send-form-email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Please check the form and try again." },
        { status: 400 }
      );
    }

    const data = parsed.data;

    await sendFormEmail({
      subject: `Contact form: ${data.subject} — ${data.name}`,
      text: formatContactEmail(data),
      replyTo: data.email,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form submission failed:", error);
    return NextResponse.json(
      {
        error:
          "We could not send your message right now. Please try again or email form@youwinconsult.com directly.",
      },
      { status: 500 }
    );
  }
}
