import type { ReactNode } from "react";
import { AppHeader } from "@/components/layout/dashboard/app-header";

// TODO: make the container min-h-screen and the footer below!
export default function AppLayout({
  children,
}: {
  children: ReactNode;
  params: { workspaceSlug: string };
}) {
  return (
    <div>
      <AppHeader />
      <main className="px-4">{children}</main>
    </div>
  );
}
