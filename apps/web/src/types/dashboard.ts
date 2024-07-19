import {
  cartItemSchema,
  paymentResultSchema,
} from "@/lib/validator";
import { carts, orderItems, orders, products, reviews } from "@designali/db";
import { InferSelectModel } from "drizzle-orm";
import { z } from "zod";

// PRODUCTS
export type Product = InferSelectModel<typeof products>;
export type Review = InferSelectModel<typeof reviews> & {
  user?: { name: string };
};

// CART
export type Cart = InferSelectModel<typeof carts>;
export type CartItem = z.infer<typeof cartItemSchema>;

export type PaymentResult = z.infer<typeof paymentResultSchema>;

// ORDERS

export type Order = InferSelectModel<typeof orders> & {
  orderItems: OrderItem[];
  user: { name: string | null; email: string };
};
export type OrderItem = InferSelectModel<typeof orderItems>;
