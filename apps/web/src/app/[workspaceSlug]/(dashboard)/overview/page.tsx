import { notFound } from "next/navigation";
import Dashboard from "@/components/dashboard/overview/dash";
import UserId from "@/components/dashboard/user-id";
import { getOrderById } from "@/src/lib/actions/order.actions";

import OrderDetailsForm from "./order-details-form";

export default async function OrderDetailsPage() {
  return (
    <main className="mt-40 ">
      <div className="grid justify-center text-center">
        <h1 className="py-4">Welcome</h1>
        <UserId />
      </div>
      <Dashboard
        searchParams={{
          page: "1",
        }}
      />
    </main>
  );
}
