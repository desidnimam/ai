import { Suspense } from "react";
import Link from "next/link";

import { api } from "~/trpc/server";

export default function DashboardLayout(props: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen overflow-hidden rounded-[0.5rem]">
      <main className="min-h-[calc(100vh-14rem)] flex-1 space-y-4 p-8 pt-6">
        {props.children}
      </main>
    </div>
  );
}
