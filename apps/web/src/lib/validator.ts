/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { orderItems, orders, products, reviews } from "@designali/db";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import * as z from "zod";

import { PAYMENT_METHODS } from "./constants";
import { formatNumberWithDecimal } from "./dutils";

// USER
export const signInFormSchema = z.object({
  email: z.string().email().min(3, "Email must be at least 3 characters"),
  password: z.string().min(3, "Password must be at least 3 characters"),
});

export const signUpFormSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    email: z.string().email().min(3, "Email must be at least 3 characters"),
    password: z.string().min(3, "Password must be at least 3 characters"),
    confirmPassword: z
      .string()
      .min(3, "Confirm password must be at least 3 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
export const updateProfileSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email().min(3, "Email must be at least 3 characters"),
});

export const updateUserSchema = updateProfileSchema.extend({
  id: z.string().min(1, "Id is required"),
  role: z.string().min(1, "Role is required"),
});
// PRODUCT
export const insertProductSchema = createSelectSchema(products, {
  images: z.array(z.string()).min(1, "Product must have at least one image"),
  stock: z.coerce.number().min(0, "Stock must be at least 0"),
}).omit({
  id: true,
  rating: true,
  numReviews: true,
  createdAt: true,
});
export const updateProductSchema = createSelectSchema(products, {
  images: z.array(z.string()).min(1, "Product must have at least one image"),
  stock: z.coerce.number().min(0, "Stock must be at least 0"),
}).omit({
  rating: true,
  numReviews: true,
  createdAt: true,
});

export const insertReviewSchema = createInsertSchema(reviews, {
  rating: z.coerce
    .number()
    .int()
    .min(1, "Rating must be at least 1")
    .max(5, "Rating must be at most 5"),
});

// CART
export const cartItemSchema = z.object({
  productId: z.string().min(1, "Product is required"),
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  qty: z.number().int().nonnegative("Quantity must be a non-negative number"),
  image: z.string().min(1, "Image is required"),
  price: z
    .number()
    .refine(
      (value) => /^\d+(\.\d{2})?$/.test(formatNumberWithDecimal(value)),
      "Price must have exactly two decimal places (e.g., 49.99)",
    ),
});



export const paymentResultSchema = z.object({
  id: z.string(),
  status: z.string(),
  email_address: z.string(),
  pricePaid: z.string(),
});

export const insertOrderSchema = createInsertSchema(orders, {
  paymentResult: z
    .object({
      id: z.string(),
      status: z.string(),
      email_address: z.string(),
      pricePaid: z.string(),
    })
    .optional(),
});

export const insertOrderItemSchema = createInsertSchema(orderItems, {
  price: z.number(),
});
