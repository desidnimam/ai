import type { cartItemSchema, paymentResultSchema } from "@/lib/validator";
import type {
  carts,
  orderItems,
  orders,
  products,
  reviews,
} from "@designali/db";
import type { InferSelectModel } from "drizzle-orm";
import type { z } from "zod";

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
