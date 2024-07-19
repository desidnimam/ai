import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getMyCart } from "@/lib/actions/cart.actions";
import { APP_NAME } from "@/lib/constants";
import { formatCurrency } from "@/lib/dutils";
import PageTitle from "@/src/components/mdx/page-title";
import { Button } from "@designali/ui/button";
import { Card, CardContent } from "@designali/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@designali/ui/table";

import PlaceOrderForm from "./place-order-form";

export const metadata = {
  title: `Place Order - ${APP_NAME}`,
};

export default async function PlaceOrderPage() {
  const cart = await getMyCart();
  if (!cart || cart.items.length === 0) redirect("/cart");

  return (
    <div className="mx-auto mt-40 max-w-7xl px-6">
      <PageTitle
        title="Place Orders"
        description={`Manage your account settings and set e-mail preferences.`}
      />

      <div className="grid gap-5 md:grid-cols-3">
        <div className="space-y-4 overflow-x-auto md:col-span-2">
          <Card>
            <CardContent className="gap-4 p-4">
              <h2 className="pb-4 text-xl">Order Items</h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Price</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cart.items.map((item) => (
                    <TableRow key={item.slug}>
                      <TableCell>
                        <Link
                          href={`/product/${item.slug}`}
                          className="flex items-center"
                        >
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={250}
                            height={250}
                            className="rounded-md"
                          />
                          <span className="px-2">{item.name}</span>
                        </Link>
                      </TableCell>
                      <TableCell>
                        <span className="px-2">{item.qty}</span>
                      </TableCell>
                      <TableCell className="text-right">
                      ₹{item.price}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Link href="/cart">
                <Button variant="outline">Edit</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardContent className="gap-4 space-y-4 p-4">
              <div className="flex justify-between">
                <div>Items</div>
                <div>{formatCurrency(cart.itemsPrice)}</div>
              </div>
              <div className="flex justify-between">
                <div>Tax</div>
                <div>{formatCurrency(cart.taxPrice)}</div>
              </div>
              <div className="flex justify-between">
                <div>Shipping</div>
                <div>{formatCurrency(cart.shippingPrice)}</div>
              </div>
              <div className="flex justify-between">
                <div>Total</div>
                <div>{formatCurrency(cart.totalPrice)}</div>
              </div>
              <PlaceOrderForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
