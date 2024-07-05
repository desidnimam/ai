import React from "react";
import { auth } from "@designali/auth";

import MainNav from "./main-nav";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (session.user.role !== "admin")
    throw new Error("admin permission required");
  return (
    <>
      <div className="mx-auto mt-20 flex max-w-7xl flex-col">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <MainNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4"></div>
          </div>
        </div>
        <div className="flex-1 space-y-4 p-8 pt-6">{children}</div>
      </div>
    </>
  );
}
