import type { Metadata } from "next";
import Link from "next/link";
import Paginations from "@/components/ui/pagination";
import { deleteOrder, getAllOrders } from "@/lib/actions/order.actions";
import { APP_NAME } from "@/lib/constants";
import { formatCurrency, formatDateTime, formatId } from "@/lib/dutils";
import DeleteDialog from "@/src/components/admin/delete-dialog";
import { Icons } from "@/src/components/icons";
import PageTitle from "@/src/components/mdx/page-title";
import { Button } from "@designali/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@designali/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@designali/ui/table";

export const metadata: Metadata = {
  title: `Admin Orders - ${APP_NAME}`,
};

export default async function OrdersPage({
  searchParams: { page = "1" },
}: {
  searchParams: { page: string };
}) {
  const orders = await getAllOrders({
    page: Number(page),
  });

  return (
    <div className="space-y-2 px-6">
      <PageTitle
        title="Orders"
        description={`Manage your account settings and set e-mail preferences.`}
      />
      <div className="mt-20 rounded-3xl border p-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>DATE</TableHead>
              <TableHead>BUYER</TableHead>
              <TableHead>TOTAL</TableHead>
              <TableHead>PAID</TableHead>
              <TableHead>DELIVERED</TableHead>
              <TableHead>ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.data.map((order) => (
              <TableRow key={order.id}>
                <TableCell>
                  {formatId(order.id)}
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Icons.dot
                          strokeWidth={5}
                          className="h-5 w-5 text-ali"
                        />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">{order.id}</PopoverContent>
                  </Popover>
                </TableCell>
                <TableCell>
                  {formatDateTime(order.createdAt).dateTime}
                </TableCell>
                <TableCell>
                  {order.user ? order.user.name : "Deleted user"}
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
                <TableCell className="flex gap-1">
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/order/${order.id}`}>Details</Link>
                  </Button>
                  <DeleteDialog id={order.id} action={deleteOrder} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {orders.totalPages > 1 && (
          <Paginations page={page} totalPages={orders.totalPages} />
        )}
      </div>
    </div>
  );
}
