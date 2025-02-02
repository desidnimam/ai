"use client";

import type { Order } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { formatCurrency } from "@/lib/dutils";
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

export default function OrderDetailsForm({ order }: { order: Order }) {
  const {
    orderItems,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = order;

  return (
    <div className="">
      <div className="grid gap-5 md:grid-cols-3">
        <div className="space-y-4 overflow-x-auto md:col-span-2">
          <Card>
            <CardContent className="gap-4 p-4">
              <h1 className="p-4 text-xl"> Order ID - {order.id}</h1>
            </CardContent>
          </Card>

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
                  {orderItems.map((item) => (
                    <TableRow key={item.slug}>
                      <TableCell>
                        <Link
                          href={`/products/${item.slug}`}
                          className="flex items-center"
                        >
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={200}
                            height={200}
                            className="rounded-md"
                          ></Image>
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
            </CardContent>
          </Card>
        </div>
        <div className="grid w-full gap-3">
          <Card>
            <CardContent className="gap-4 space-y-4 p-4">
              <h2 className="pb-4 text-xl">Order Summary</h2>
              <div className="flex justify-between">
                <div>Items</div>
                <div>{formatCurrency(itemsPrice)}</div>
              </div>
              <div className="flex justify-between">
                <div>Tax</div>
                <div>{formatCurrency(taxPrice)}</div>
              </div>
              <div className="flex justify-between">
                <div>Shipping</div>
                <div>{formatCurrency(shippingPrice)}</div>
              </div>
              <div className="flex justify-between">
                <div>Total</div>
                <div>{formatCurrency(totalPrice)}</div>
              </div>
            </CardContent>
          </Card>
          <div className="grid w-full gap-3 lg:flex">
            <Link href={"/dashboard/orders"} className="flex w-full">
              <Button variant="outline" size="lg" className="w-full ">
                View my order
              </Button>
            </Link>
            <Link href={"/dashboard/products"} className="flex w-full">
              <Button variant="default" size="lg" className="w-full ">
                View my product
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
