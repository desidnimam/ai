"use server";

import { signIn } from "@designali/auth";

export async function signInWithResendAction(formData: FormData) {
  try {
    await signIn("resend", formData);
  } catch (_e) {
    // console.error(e);
  }
}
