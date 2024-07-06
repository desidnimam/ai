import type { Metadata } from "next";
import { getUserById } from "@/lib/actions/user.actions";
import { APP_NAME } from "@/lib/constants";
import { auth } from "@designali/auth";

import SuccessPage from "./stripe";

export const metadata: Metadata = {
  title: `Payment Method - ${APP_NAME}`,
};

export default async function PaymentMethodPage() {
  const session = await auth();
  const user = await getUserById(session?.user.id);
  return (
    <SuccessPage
      params={{
        id: "",
      }}
      searchParams={{
        payment_intent: "",
      }}
    />
  );
}
