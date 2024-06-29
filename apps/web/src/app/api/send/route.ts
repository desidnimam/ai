/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { env } from "@/env";
import { WelcomeEmail } from "@designali/emails";
import { Resend } from "resend";

const resend = new Resend(env.RESEND_API_KEY);

export async function POST() {
  try {
    const { data, error } = await resend.emails.send({
      from: "Designali - Ali Imam <contact@aliimam.in>",
      to: ["contact@aliimam.in"],
      subject: "Welcome to Designali.",
      react: WelcomeEmail(),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
