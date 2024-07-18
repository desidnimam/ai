"use client";

import type { Cart } from "@/types";
import { useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { addItemToCart, removeItemFromCart } from "@/lib/actions/cart.actions";
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
import { useToast } from "@designali/ui/use-toast";
import { ArrowRight, Loader, Minus, Plus } from "lucide-react";

export default function CartForm({ cart }: { cart?: Cart }) {
  const router = useRouter();

  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  return (
    <div className="mx-auto mt-40 max-w-7xl px-6">
      <PageTitle
        title="Your Cart"
        description={`Manage your account settings and set e-mail preferences.`}
      />

      {!cart || cart.items.length === 0 ? (
        <div>
          Cart is empty. <Link href="/">Go shopping</Link>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-3 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead className="">Quantity</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cart.items.map((item) => (
                  <TableRow key={item.slug}>
                    <TableCell>
                      <Link
                        href={`/product/${item.slug}`}
                        className="grid items-center md:flex"
                      >
                        <Image
                          className="w-[100px]  rounded-xl md:w-[250px]"
                          src={item.image}
                          alt={item.name}
                          width={250}
                          height={250}
                        ></Image>
                        <span className="mt-2 px-2 text-center text-sm md:text-xl">
                          {item.name}
                        </span>
                      </Link>
                    </TableCell>
                    <TableCell className="flex-center gap-2">
                      <Button
                        disabled={isPending}
                        variant="outline"
                        type="button"
                        className="h-8 w-8 rounded-full md:h-12 md:w-12"
                        size="icon"
                        onClick={() =>
                          startTransition(async () => {
                            const res = await removeItemFromCart(
                              item.productId,
                            );
                            if (!res.success) {
                              toast({
                                variant: "destructive",
                                description: res.message,
                              });
                            }
                          })
                        }
                      >
                        {isPending ? (
                          <Loader className="h-4 w-4  animate-spin" />
                        ) : (
                          <Minus className="h-4 w-4" />
                        )}
                      </Button>
                      <span className="px-6">{item.qty}</span>
                      <Button
                        disabled={isPending}
                        variant="outline"
                        className="h-8 w-8 rounded-full md:h-12 md:w-12"
                        size="icon"
                        type="button"
                        onClick={() =>
                          startTransition(async () => {
                            const res = await addItemToCart(item);
                            if (!res.success) {
                              toast({
                                variant: "destructive",
                                description: res.message,
                              });
                            }
                          })
                        }
                      >
                        {isPending ? (
                          <Loader className="h-4 w-4  animate-spin" />
                        ) : (
                          <Plus className="h-4 w-4" />
                        )}
                      </Button>
                    </TableCell>
                    <TableCell className="text-right md:text-2xl">
                      {formatCurrency(item.price)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
      <div className="mt-10">
        <Card>
          <CardContent className="gap-4 p-4">
            <div className="flex justify-between pb-3 text-xl">
              <div className="flex items-center gap-2">
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Subtotal{" "}
                </p>
                <p>({cart.items.reduce((a, c) => a + c.qty, 0)}):</p>
              </div>
              <p className="text-semibold">{formatCurrency(cart.itemsPrice)}</p>
            </div>
            <Button
              onClick={() => startTransition(() => router.push("/payment"))}
              className="w-full"
              disabled={isPending}
            >
              {isPending ? (
                <Loader className="h-4 w-4 animate-spin" />
              ) : (
                <ArrowRight className="h-4 w-4" />
              )}
              Proceed to Checkout
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
