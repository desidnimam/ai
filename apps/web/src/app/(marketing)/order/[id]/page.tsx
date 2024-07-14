import { notFound, redirect } from "next/navigation";
import { getOrderById } from "@/lib/actions/order.actions";
import { APP_NAME } from "@/lib/constants";
import PageTitle from "@/src/components/mdx/page-title";
import { auth } from "@designali/auth";

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
  if (!session) {
    return redirect("/login");
  }
  const order = await getOrderById(id);
  if (!order) notFound();

  return (
    <div className="mx-auto mt-20 max-w-7xl px-6">
      <PageTitle
        title="Orders"
        description={`Manage your account settings and set e-mail preferences.`}
      />
      <OrderDetailsForm order={order} />
    </div>
  );
};

export default OrderDetailsPage;
