import { notFound } from "next/navigation";
import { getOrderById } from "@/lib/actions/order.actions";
import { APP_NAME } from "@/lib/constants";
import PageTitle from "@/src/components/mdx/page-title";
import { auth } from "@designali/auth";
import Stripe from "stripe";

import OrderDetailsForm from "./order-details-form";

export const metadata = {
  title: `Order Details - ${APP_NAME}`,
};

const OrderDetailsPage = async ({
  params: { id },
}: {
  params: {
    id: string;
  };
}) => {
  const session = await auth();
  const order = await getOrderById(id);
  if (!order) notFound();

  let client_secret = null;
  if (order.paymentMethod === "Stripe" && !order.isPaid) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(Number(order.totalPrice) * 100),
      currency: "INR",
      metadata: { orderId: order.id },
    });
    client_secret = paymentIntent.client_secret;
  }

  return (
    <div className="mx-auto mt-20 max-w-7xl px-6">
      <PageTitle
        title="Orders"
        description={`Manage your account settings and set e-mail preferences.`}
      />
      <OrderDetailsForm
        order={order}
        paypalClientId={process.env.PAYPAL_CLIENT_ID || "sb"}
        isAdmin={session.user.role === "admin" || false}
        stripeClientSecret={client_secret}
      />
    </div>
  );
};

export default OrderDetailsPage;
