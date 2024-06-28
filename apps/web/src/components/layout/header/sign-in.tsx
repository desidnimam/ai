"use client";

import Link from "next/link";
import { Button } from "@designali/ui/button";
import { useSession } from "next-auth/react";

export function LoginButton() {
  const session = useSession();

  return (
    <Button asChild variant={"outline"} size={"md"}>
      {session.status === "authenticated" ? (
        <Link href="/dashboard">Dashboard</Link>
      ) : (
        <Link href="/login">Sign In</Link>
      )}
    </Button>
  );
}
