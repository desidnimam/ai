import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { updateOrderToPaid } from "@/lib/actions/order.actions";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req: NextRequest) {
  const event = await stripe.webhooks.constructEvent(
    await req.text(),
    req.headers.get("stripe-signature"),
    process.env.STRIPE_WEBHOOK_SECRET,
  );
  if (event.type === "charge.succeeded") {
    const { object } = event.data;
    await updateOrderToPaid({
      orderId: object.metadata.orderId,
      paymentResult: {
        id: object.id,
        status: "COMPLETED",
        email_address: object.billing_details.email,
        pricePaid: (object.amount / 100).toFixed(),
      },
    });
    return NextResponse.json({
      message: "updateOrderToPaid was successful",
    });
  }
  return NextResponse.json({
    message: "event is not charge.succeeded",
  });
}
