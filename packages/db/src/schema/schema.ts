import type { AdapterAccountType } from "next-auth/adapters";
import { relations } from "drizzle-orm";
import {
  boolean,
  integer,
  json,
  jsonb,
  numeric,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { primaryKey } from "drizzle-orm/pg-core/primary-keys";

import type { CartItem, PaymentResult, ShippingAddress } from "../types";

// USERS
export const users = pgTable(
  "user",
  {
    id: text("id").primaryKey().notNull(),
    name: text("name").notNull().default("NO_NAME"),
    email: text("email").notNull(),
    role: text("role").notNull().default("user"),
    password: text("password"),
    emailVerified: timestamp("emailVerified", { mode: "date" }),
    image: text("image"),
    address: json("address").$type<ShippingAddress>(),
    paymentMethod: text("paymentMethod"),
    createdAt: timestamp("createdAt").defaultNow(),
    stripeCustomerId: text("stripe_customer_id"),
    subscribed: boolean("subscribed"),
  },
  (table) => {
    return {
      userEmailIdx: uniqueIndex("user_email_idx").on(table.email),
    };
  },
);

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  }),
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").notNull().primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  }),
);

// PRODUCTS
export const products = pgTable(
  "product",
  {
    id: text("id").primaryKey().notNull(),
    name: text("name").notNull(),
    slug: text("slug").notNull(),
    category: text("category").notNull(),
    images: text("images").array().notNull(),
    brand: text("brand").notNull(),
    description: text("description").notNull(),
    stock: integer("stock").notNull(),
    price: numeric("price", { precision: 12, scale: 2 }).notNull().default("0"),
    rating: numeric("rating", { precision: 3, scale: 2 })
      .notNull()
      .default("0"),
    numReviews: integer("numReviews").notNull().default(0),
    isFeatured: boolean("isFeatured").default(false).notNull(),
    banner: text("banner"),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
  },
  (table) => {
    return {
      productSlugIdx: uniqueIndex("product_slug_idx").on(table.slug),
    };
  },
);

export const reviews = pgTable("reviews", {
  id: text("id").primaryKey().notNull(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  productId: text("productId")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
  rating: integer("rating").notNull(),
  title: text("title").notNull(),
  description: text("slug").notNull(),
  isVerifiedPurchase: boolean("isVerifiedPurchase").notNull().default(true),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
});
export const productRelations = relations(products, ({ many }) => ({
  reviews: many(reviews),
}));
export const reviewsRelations = relations(reviews, ({ one }) => ({
  user: one(users, { fields: [reviews.userId], references: [users.id] }),
  product: one(products, {
    fields: [reviews.productId],
    references: [products.id],
  }),
}));

// CARTS
export const carts = pgTable("cart", {
  id: text("id").notNull().primaryKey(),
  userId: text("userId").references(() => users.id, {
    onDelete: "cascade",
  }),
  sessionCartId: text("sessionCartId").notNull(),
  items: json("items").$type<CartItem[]>().notNull().default([]),
  itemsPrice: numeric("itemsPrice", { precision: 12, scale: 2 }).notNull(),
  shippingPrice: numeric("shippingPrice", {
    precision: 12,
    scale: 2,
  }).notNull(),
  taxPrice: numeric("taxPrice", { precision: 12, scale: 2 }).notNull(),
  totalPrice: numeric("totalPrice", { precision: 12, scale: 2 }).notNull(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
});

// ORDERS
export const orders = pgTable("order", {
  id: text("id").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  shippingAddress: json("shippingAddress").$type<ShippingAddress>().notNull(),
  paymentMethod: text("paymentMethod").notNull(),
  paymentResult: json("paymentResult").$type<PaymentResult>(),
  itemsPrice: numeric("itemsPrice", { precision: 12, scale: 2 }).notNull(),
  shippingPrice: numeric("shippingPrice", {
    precision: 12,
    scale: 2,
  }).notNull(),
  taxPrice: numeric("taxPrice", { precision: 12, scale: 2 }).notNull(),
  totalPrice: numeric("totalPrice", { precision: 12, scale: 2 }).notNull(),
  isPaid: boolean("isPaid").notNull().default(false),
  paidAt: timestamp("paidAt"),
  isDelivered: boolean("isDelivered").notNull().default(false),
  deliveredAt: timestamp("deliveredAt"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
});
export const ordersRelations = relations(orders, ({ one, many }) => ({
  orderItems: many(orderItems),
  user: one(users, { fields: [orders.userId], references: [users.id] }),
}));

export const orderItems = pgTable(
  "orderItems",
  {
    orderId: text("orderId")
      .notNull()
      .references(() => orders.id, { onDelete: "cascade" }),
    productId: text("productId")
      .notNull()
      .references(() => products.id, { onDelete: "cascade" }),
    qty: integer("qty").notNull(),
    price: numeric("price", { precision: 12, scale: 2 }).notNull(),
    name: text("name").notNull(),
    slug: text("slug").notNull(),
    image: text("image").notNull(),
  },
  (orderItem) => ({
    compoundKey: primaryKey({
      columns: [orderItem.orderId, orderItem.productId],
    }),
  }),
);

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, {
    fields: [orderItems.orderId],
    references: [orders.id],
  }),
}));

export const webhookEvents = pgTable("webhookEvent", {
  id: integer("id").primaryKey(),
  createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
  eventName: text("eventName").notNull(),
  processed: boolean("processed").default(false),
  body: jsonb("body").notNull(),
  processingError: text("processingError"),
});

export const plans = pgTable("plan", {
  id: serial("id").primaryKey(),
  productId: integer("productId").notNull(),
  productName: text("productName"),
  variantId: integer("variantId").notNull().unique(),
  name: text("name").notNull(),
  description: text("description"),
  price: text("price").notNull(),
  isUsageBased: boolean("isUsageBased").default(false),
  interval: text("interval"),
  intervalCount: integer("intervalCount"),
  trialInterval: text("trialInterval"),
  trialIntervalCount: integer("trialIntervalCount"),
  sort: integer("sort"),
});

export const subscriptions = pgTable("subscription", {
  id: serial("id").primaryKey(),
  lemonSqueezyId: text("lemonSqueezyId").unique().notNull(),
  orderId: integer("orderId").notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  status: text("status").notNull(),
  statusFormatted: text("statusFormatted").notNull(),
  renewsAt: text("renewsAt"),
  endsAt: text("endsAt"),
  trialEndsAt: text("trialEndsAt"),
  price: text("price").notNull(),
  isUsageBased: boolean("isUsageBased").default(false),
  isPaused: boolean("isPaused").default(false),
  subscriptionItemId: serial("subscriptionItemId"),
  userId: text("userId")
    .notNull()
    .references(() => users.id),
  planId: integer("planId")
    .notNull()
    .references(() => plans.id),
});

// Export types for the tables.
export type NewPlan = typeof plans.$inferInsert;
export type NewWebhookEvent = typeof webhookEvents.$inferInsert;
export type NewSubscription = typeof subscriptions.$inferInsert;
