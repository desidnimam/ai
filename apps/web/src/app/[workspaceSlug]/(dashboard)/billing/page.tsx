import React from "react";
import Billing from "@/components/dashboard/billing";
import ManageSubscription from "@/components/dashboard/billing/ManageSubscription";

const billing = async () => {
  return (
    <main className="mt-40">
      <ManageSubscription />
      <Billing />
    </main>
  );
};

export default billing;
