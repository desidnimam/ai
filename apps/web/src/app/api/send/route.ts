import type * as React from "react";
import { env } from "@/env";
import { WelcomeEmail } from "@designali/emails";
import { Resend } from "resend";

const resend = new Resend(env.RESEND_API_KEY);

export async function POST() {
  try {
    const { data, error } = await resend.emails.send({
      from: "Designali <onboarding@resend.dev>",
      to: "contact@aliimam.in",
      subject: "Welcome to the Designali",
      react: WelcomeEmail() as React.ReactElement,
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json({ data });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
