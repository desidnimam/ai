"use client";

import type { ButtonProps } from "@designali/ui/button";
import Link from "next/link";
import { cn } from "@designali/ui";
import { Button } from "@designali/ui/button";
import { useSession } from "next-auth/react";

export function LoginButton({ className, ...props }: ButtonProps) {
  const session = useSession();

  return (
    <Button asChild size={"sm"} {...props}>
      {session.status === "authenticated" ? (
        <Link href="/dashboard">Dashboard</Link>
      ) : (
        <Link href="/login">Sign In</Link>
      )}
    </Button>
  );
}
