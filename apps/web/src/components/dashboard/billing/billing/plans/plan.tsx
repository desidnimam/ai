import type { NewPlan } from "@designali/db";
import { cn, formatPrice } from "@/lib/utils";
import { Alert } from "@lemonsqueezy/wedges";
import { SearchXIcon } from "lucide-react";

import { SignupButton } from "./signup-button";

export function Plan({
  plan,
  currentPlan,
  isChangingPlans = false,
}: {
  plan: NewPlan;
  currentPlan?: NewPlan;
  isChangingPlans?: boolean;
}) {
  const { description, id, productName, interval, name, price } = plan;
  const isCurrent = id && currentPlan.id === id;

  return (
    <div>
      <header className="flex w-full items-center justify-between">
        {name ? (
          <h2 className="text-surface-900 text-lg">
            {productName} ({name})
          </h2>
        ) : null}
      </header>
      {description ? (
        <div
          dangerouslySetInnerHTML={{
            // Ideally sanitize the description first
            __html: description,
          }}
        />
      ) : null}

      <div className={cn(isCurrent && "opacity-60")}>
        <span className="text-surface-900 mr-0.5 text-xl">
          {formatPrice(price)}
        </span>
        {!plan.isUsageBased && interval ? ` per ${interval}` : null}
        {plan.isUsageBased && interval ? ` /unit per ${interval}` : null}
      </div>

      <SignupButton
        className="w-full"
        plan={plan}
        isChangingPlans={isChangingPlans}
        currentPlan={currentPlan}
      />
    </div>
  );
}

export function NoPlans() {
  return (
    <section className="prose mt-[10vw] flex flex-col items-center justify-center">
      <span className="bg-wg-red-50/70 flex size-24 items-center justify-center rounded-full">
        <SearchXIcon
          className="text-wg-red"
          aria-hidden="true"
          size={48}
          strokeWidth={0.75}
        />
      </span>

      <p className="max-w-prose text-balance text-center leading-6 text-gray-500">
        There are no plans available at the moment.
      </p>
    </section>
  );
}

export function InfoMessage() {
  return (
    <Alert className="not-prose mt-2">
      Follow{" "}
      <a
        href="https://docs.lemonsqueezy.com/guides/developer-guide/testing-going-live#testing-the-checkout"
        target="_blank"
        className="text-gray-900 underline hover:text-primary"
      >
        these instructions
      </a>{" "}
      on how to do test payments with Lemon Squeezy.
    </Alert>
  );
}
