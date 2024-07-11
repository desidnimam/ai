import type { Metadata } from "next";
import Link from "next/link";
import { getMyOrders, userdeleteOrder } from "@/lib/actions/order.actions";
import { APP_NAME } from "@/lib/constants";
import { formatCurrency, formatDateTime } from "@/lib/dutils";
import DeleteDialog from "@/src/components/admin/delete-dialog";
import PageTitle from "@/src/components/mdx/page-title";
import { Button } from "@designali/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@designali/ui/table";

export const metadata: Metadata = {
  title: `My Orders - ${APP_NAME}`,
};
export default async function OrdersPage({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  const page = Number(searchParams.page) || 1;
  const orders = await getMyOrders({
    page,
    limit: 10,
  });
  return (
    <div className="mx-auto mt-40 max-w-7xl space-y-2">
      <PageTitle
        title="Orders"
        description={`Manage your orders and view your order details`}
      />
      <div className="overflow-x-auto rounded-3xl border p-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>DATE</TableHead>
              <TableHead>TOTAL</TableHead>
              <TableHead>PAID</TableHead>
              <TableHead>DELIVERED</TableHead>
              <TableHead>ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.data.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id.substring(20, 24)}</TableCell>
                <TableCell>
                  {formatDateTime(order.createdAt).dateTime}
                </TableCell>
                <TableCell>{formatCurrency(order.totalPrice)}</TableCell>
                <TableCell>
                  {order.isPaid && order.paidAt
                    ? formatDateTime(order.paidAt).dateTime
                    : "not paid"}
                </TableCell>
                <TableCell>
                  {order.isDelivered && order.deliveredAt
                    ? formatDateTime(order.deliveredAt).dateTime
                    : "not delivered"}
                </TableCell>
                <TableCell className="flex gap-2">
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/order/${order.id}`}>
                      <span className="px-2">Details</span>
                    </Link>
                  </Button>
                  <DeleteDialog id={order.id} action={userdeleteOrder} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
