import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getOrderById } from "@/lib/actions/order.actions";
import { APP_NAME } from "@/lib/constants";
import { Button } from "@designali/ui/button";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const metadata: Metadata = {
  title: `Payment Success - ${APP_NAME}`,
};

export default async function SuccessPage({
  searchParams,
  params: { id },
}: {
  params: {
    id: string;
  };
  searchParams: { payment_intent: string };
}) {
  const order = await getOrderById(id);
  if (!order) notFound();

  const paymentIntent = await stripe.paymentIntents.retrieve(
    searchParams.payment_intent,
  );
  if (
    paymentIntent.metadata.orderId == null ||
    paymentIntent.metadata.orderId !== order.id.toString()
  )
    return notFound();

  const isSuccess = paymentIntent.status === "succeeded";
  if (!isSuccess) return redirect(`/order/${id}`);
  return (
    <div className="mx-auto w-full max-w-4xl space-y-8">
      <div className="flex flex-col items-center gap-6 ">
        <h1 className="h1-bold">Thanks for your purchase</h1>
        <div>We are now processing your order.</div>
        <Button asChild>
          <Link href={`/order/${id}`}>View order</Link>
        </Button>
      </div>
    </div>
  );
}
