import type * as React from "react";
import { env } from "@/env";
import { WelcomeEmail } from "@designali/emails";
import { useSession } from "next-auth/react";
import { Resend } from "resend";

const resend = new Resend(env.RESEND_API_KEY);

export async function POST() {
  try {
    const session = useSession();
    
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: [session.data.user.email],
      subject: "Hello world",
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
