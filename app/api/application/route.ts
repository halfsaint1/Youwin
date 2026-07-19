import { NextResponse } from "next/server";

import {
  applicationSchema,
  formatApplicationEmail,
} from "@/lib/forms/application";
import { sendFormEmail } from "@/lib/send-form-email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = applicationSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Please check the form and try again." },
        { status: 400 }
      );
    }

    const data = parsed.data;

    await sendFormEmail({
      subject: `Student application: ${data.fullName}`,
      text: formatApplicationEmail(data),
      replyTo: data.email,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Application form submission failed:", error);
    return NextResponse.json(
      {
        error:
          "We could not send your application right now. Please try again or email form@youwinconsult.com directly.",
      },
      { status: 500 }
    );
  }
}
