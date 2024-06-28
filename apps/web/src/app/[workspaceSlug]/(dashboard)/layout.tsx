import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { api } from "@/trpc/server";

import { WorkspaceClientCookie } from "../worskpace-client-cookie";

// TODO: make the container min-h-screen and the footer below!
export default async function AppLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { workspaceSlug: string };
}) {
  return (
    <div className="container relative mx-auto flex min-h-screen w-full flex-col items-center justify-center gap-6 p-4">
      <main className="z-10 flex w-full flex-1 flex-col items-start justify-center">
        {children}
      </main>
    </div>
  );
}
