import type { ReactNode } from "react";
import { AppHeader } from "@/components/layout/dashboard/app-header";

// TODO: make the container min-h-screen and the footer below!
export default async function AppLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { workspaceSlug: string };
}) {
  return (
    <div>
      <AppHeader />
      <main className="z-10 mt-20 flex w-full flex-1 flex-col items-start justify-center">
        {children}
      </main>
    </div>
  );
}
