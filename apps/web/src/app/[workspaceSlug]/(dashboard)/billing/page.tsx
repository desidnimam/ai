import React from "react";
import ManageSubscription from "@/components/dashboard/billing/ManageSubscription";
import { auth, signIn } from "@designali/auth";
import { db, users } from "@designali/db";
import { eq } from "drizzle-orm";

const billing = async () => {
  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    signIn();
    return null;
  }

  const user = await db.query.users.findFirst({
    where: eq(users.id, session.user.id),
  });

  const plan = user.subscribed ? "premium" : "free";

  return (
    <main className="mt-40 h-screen">
      <ManageSubscription />
      <p className="text-center">You currently are on a {plan} plan</p>
    </main>
  );
};

export default billing;
