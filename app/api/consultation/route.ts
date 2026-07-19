import { NextResponse } from "next/server";

import {
  consultationSchema,
  formatConsultationEmail,
} from "@/lib/forms/consultation";
import { sendFormEmail } from "@/lib/send-form-email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = consultationSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Please check the form and try again." },
        { status: 400 }
      );
    }

    const data = parsed.data;

    await sendFormEmail({
      subject: `Free consultation request: ${data.name}`,
      text: formatConsultationEmail(data),
      replyTo: data.email,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Consultation form submission failed:", error);
    return NextResponse.json(
      {
        error:
          "We could not send your request right now. Please try again or email form@youwinconsult.com directly.",
      },
      { status: 500 }
    );
  }
}
