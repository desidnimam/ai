"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";

export default function UserId() {
  const session = useSession();

  if (session.status !== "authenticated") {
    return;
  }

  return (
    <>
      <div className="grid items-center justify-center gap-3">
        <div className="flex items-center justify-center gap-3">
          <Image
            src={session.data.user.image}
            width={40}
            height={40}
            alt={""}
            className="rounded-full border"
          />
          <h1 className="truncate text-5xl font-semibold leading-none">
            {session.data.user.name}
          </h1>
        </div>
        <p className="text-md truncate leading-none text-muted-foreground">
          {session.data.user.email}
        </p>
      </div>
    </>
  );
}
