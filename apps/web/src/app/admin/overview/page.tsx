import type { Metadata } from "next";
import Link from "next/link";
import { getOrderSummary } from "@/lib/actions/order.actions";
import { APP_NAME } from "@/lib/constants";
import { formatCurrency, formatDateTime, formatNumber } from "@/lib/dutils";
import PageTitle from "@/src/components/mdx/page-title";
import { Button } from "@designali/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@designali/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@designali/ui/table";
import { BadgeDollarSign, Barcode, CreditCard, Users } from "lucide-react";

import Charts from "./charts";

export const metadata: Metadata = {
  title: `Admin - ${APP_NAME}`,
};

export default async function DashboardPage() {
  const summary = await getOrderSummary();

  return (
    <div className="space-y-4 px-6">
      <PageTitle
        title="Dashboard Overview"
        description={`Manage your account settings and set e-mail preferences.`}
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <BadgeDollarSign strokeWidth={1} />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold">
              {formatCurrency(summary.ordersPrice[0].sum)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sales</CardTitle>
            <CreditCard strokeWidth={1} />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold">
              {formatNumber(summary.ordersCount[0].count)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Customers</CardTitle>
            <Users strokeWidth={1} />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold">
              {summary.usersCount[0].count}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Products</CardTitle>
            <Barcode strokeWidth={1} />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold">
              {summary.productsCount[0].count}
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Sales Chart</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Charts
              data={{
                salesData: summary.salesData,
              }}
            />
          </CardContent>
          <CardFooter>
            Showing total sales for the last{" "}
            {formatNumber(summary.ordersCount[0].count)} and{" "}
            {formatCurrency(summary.ordersPrice[0].sum)}
          </CardFooter>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>BUYER</TableHead>
                  <TableHead>DATE</TableHead>
                  <TableHead>TOTAL</TableHead>
                  <TableHead>ACTIONS</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {summary.latestOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>
                      {order.user.name ? order.user.name : "Deleted user"}
                    </TableCell>

                    <TableCell>
                      {formatDateTime(order.createdAt).dateOnly}
                    </TableCell>
                    <TableCell>{formatCurrency(order.totalPrice)}</TableCell>

                    <TableCell>
                      <Button asChild variant="outline" size="sm">
                        <Link href={`/order/${order.id}`}>
                          <span className="px-2">Details</span>
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
