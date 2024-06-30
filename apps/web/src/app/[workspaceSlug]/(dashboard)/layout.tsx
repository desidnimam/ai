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
      <main>{children}</main>
    </div>
  );
}
