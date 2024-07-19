"use client";

import { createOrder } from "@/lib/actions/order.actions";
import { Button } from "@designali/ui/button";
import { Check, Loader } from "lucide-react";
import { useFormState, useFormStatus } from "react-dom";

export default function PlaceOrderForm() {
  const [data, action] = useFormState(createOrder, {
    success: false,
    message: "Done",
  });

  const PlaceOrderButton = () => {
    const { pending } = useFormStatus();
    return (
      <Button disabled={pending} className="w-full">
        {pending ? (
          <Loader className="h-4 w-4 animate-spin" />
        ) : (
          <Check className="mx-2 h-4 w-4" />
        )}{" "}
        Place Order
      </Button>
    );
  };

  return (
    <form action={action} className="w-full">
      <PlaceOrderButton />
      {!data.success && <p className="py-4 text-destructive">{data.message}</p>}
    </form>
  );
}
