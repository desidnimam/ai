import { Suspense } from "react";
import { Plans } from "@/components/dashboard/billing/billing/plans/plans";
import { Subscriptions } from "@/components/dashboard/billing/billing/subscription/subscriptions";
import { DashboardContent } from "@/src/components/dashboard/billing/content";
import { PageTitleAction } from "@/src/components/dashboard/billing/page-title-action";
import { SetupWebhookButton } from "@/src/components/dashboard/billing/setup-webhook-button";
import { hasWebhook } from "@/src/lib/actions/lemon";

export const dynamic = "force-dynamic";

export default async function Page() {
  const hasWh = Boolean(await hasWebhook());

  return (
    <DashboardContent
      className="mt-40"
      title="Dashboard"
      action={<PageTitleAction />}
    >
      <p>
        This page is protected by the <code>auth</code> middleware. Navigate to
        the Billing page to get started.
      </p>

      {!hasWh && (
        <>
          <h2>Webhook Setup</h2>

          <p>
            This app relies on webhooks to listen for changes made on Lemon
            Squeezy. Make sure that you have entered all the required
            environment variables (.env). This section is an example of how
            you'd use the Lemon Squeezy API to interact with webhooks.
          </p>

          <p className="mb-6">
            Configure the webhook on{" "}
            <a
              href="https://app.lemonsqueezy.com/settings/webhooks"
              target="_blank"
            >
              Lemon Squeezy
            </a>
            , or simply click the button below to do that automatically with the
            Lemon Squeezy SDK.
          </p>

          <SetupWebhookButton disabled={hasWh} />
        </>
      )}
    </DashboardContent>
  );
}
