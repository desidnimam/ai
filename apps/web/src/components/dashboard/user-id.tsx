"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";

import PageTitle from "../mdx/page-title";

export default function UserId() {
  const session = useSession();

  if (session.status !== "authenticated") {
    return;
  }

  return (
    <>
      <div className="grid items-center justify-center gap-3">
        <div className="flex justify-center">
          <Image
            src={session.data.user.image}
            width={60}
            height={60}
            alt={""}
            className="rounded-full border"
          />
        </div>
        <PageTitle
          title={session.data.user.name}
          description={session.data.user.email}
        />
      </div>
    </>
  );
}
