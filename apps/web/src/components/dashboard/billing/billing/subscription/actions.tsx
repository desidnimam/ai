import type { NewSubscription } from "@designali/db";
import { getSubscriptionURLs } from "@/lib/actions/lemon";

import { SubscriptionActionsDropdown } from "./actions-dropdown";

export async function SubscriptionActions({
  subscription,
}: {
  subscription: NewSubscription;
}) {
  if (
    subscription.status === "expired" ||
    subscription.status === "cancelled" ||
    subscription.status === "unpaid"
  ) {
    return null;
  }

  const urls = await getSubscriptionURLs(subscription.lemonSqueezyId);

  return (
    <SubscriptionActionsDropdown subscription={subscription} urls={urls} />
  );
}
