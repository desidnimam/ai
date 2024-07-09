"use client";

import Link from "next/link";
import { Button } from "@designali/ui/button";
import { useSession } from "next-auth/react";

export function LoginButton() {
  const session = useSession();

  return (
    <div className="hidden md:block">
      <Button asChild variant={"outline"} size={"md"}>
        {session.status === "authenticated" ? (
          <Link href="/dashboard">Dashboard</Link>
        ) : (
          <Link href="/login">Sign In</Link>
        )}
      </Button>
    </div>
  );
}

export function PhoneLoginButton() {
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
