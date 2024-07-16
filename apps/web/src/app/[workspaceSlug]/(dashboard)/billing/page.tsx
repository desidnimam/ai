import { Suspense } from "react";
import { Plans } from "@/components/dashboard/billing/billing/plans/plans";
import { Subscriptions } from "@/components/dashboard/billing/billing/subscription/subscriptions";

export const dynamic = "force-dynamic";

export default function BillingPage() {
  return (
    <div>
      <Subscriptions />
      <Plans />
    </div>
  );
}
