import type { SubscriptionStatusType } from "@/types";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ChangePlans } from "@/components/dashboard/billing/billing/plans/change-plans";
import { getUserSubscriptions } from "@/lib/actions/lemon";
import { isValidSubscription } from "@/lib/utils";
import { db, plans } from "@designali/db";
import { Button } from "@lemonsqueezy/wedges";
import { eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

export default async function ChangePlansPage({
  params,
}: {
  params: { id?: string };
}) {
  if (!params.id) {
    notFound();
  }
  const currentPlanId = parseInt(params.id);

  if (isNaN(currentPlanId)) {
    notFound();
  }

  // Get user subscriptions to check the current plan.
  const userSubscriptions = await getUserSubscriptions();

  if (!userSubscriptions.length) {
    notFound();
  }

  const isCurrentPlan = userSubscriptions.find(
    (s) =>
      s.planId === currentPlanId &&
      isValidSubscription(s.status as SubscriptionStatusType),
  );

  if (!isCurrentPlan) {
    redirect("/dashboard/billing");
  }

  const currentPlan = await db
    .select()
    .from(plans)
    .where(eq(plans.id, currentPlanId));

  if (!currentPlan.length) {
    notFound();
  }

  return (
    <div className="flex items-center gap-4">
      <Button asChild variant="tertiary">
        <Link href="/dashboard/billing">Back to Billing</Link>
      </Button>

      <ChangePlans currentPlan={currentPlan.at(0)} />
    </div>
  );
}
