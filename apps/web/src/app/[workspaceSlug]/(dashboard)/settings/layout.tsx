import type { Metadata } from "next";
import Image from "next/image";
import PageTitle from "@/src/components/mdx/page-title";
import { Separator } from "@designali/ui/separator";

import { SidebarNav } from "./components/sidebar-nav";

export const metadata: Metadata = {
  title: "Forms",
  description: "Advanced form example using react-hook-form and Zod.",
};

const sidebarNavItems = [
  {
    title: "Profile",
    href: "/dashboard/settings",
  },
  {
    title: "Account",
    href: "/dashboard/settings/account",
  },
  {
    title: "Appearance",
    href: "/dashboard/settings/appearance",
  },
  {
    title: "Notifications",
    href: "/dashboard/settings/notifications",
  },
  {
    title: "Display",
    href: "/dashboard/settings/display",
  },
];

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <div className="mx-auto mt-40 h-auto max-w-7xl rounded-2xl border">
      <div className="space-y-6 p-10 pb-16 md:block">
        <PageTitle
          title="Settings"
          description={`Manage your account settings and set e-mail preferences.`}
        />
        <Separator className="my-6" />
        <div className=" space-y-8 ">
          <SidebarNav items={sidebarNavItems} />
          <div className="">{children}</div>
        </div>
      </div>
    </div>
  );
}
