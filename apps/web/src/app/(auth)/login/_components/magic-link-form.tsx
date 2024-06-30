"use client";

import { LoadingAnimation } from "@/components/layout/loading-animation";
import { toast, toastAction } from "@/lib/toast";
import { Button } from "@designali/ui/button";
import { Input } from "@designali/ui/input";
import { Label } from "@designali/ui/label";
import { useFormStatus } from "react-dom";

import { signInWithResendAction } from "./actions";

/**
 * @deprecated - only to be used in development mode
 */
export default function MagicLinkForm() {
  const { pending } = useFormStatus();

  return (
    <form
      action={async (formData) => {
        try {
          await signInWithResendAction(formData);
          toast.success("Check your terminal for the magic link.");
        } catch (_e) {
          toastAction("error");
        }
      }}
      className="grid gap-2"
    >
      <div className="mt-2 grid gap-1.5">
        <Input
          id="email"
          name="email"
          placeholder="contact@aliimam.in"
          type="email"
          required
        />
      </div>
      <Button variant="secondary" size="lg" className="w-full">
        {pending ? <LoadingAnimation /> : "Console magic link"}
      </Button>
    </form>
  );
}
