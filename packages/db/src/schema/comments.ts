import { relations } from "drizzle-orm";
import {
  integer,
  pgTable,
  primaryKey,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

import { posts } from "./posts";
import { users } from "./schema";

export const comments = pgTable("comment", {
  id: text("id").notNull().primaryKey(),
  body: text("body"),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
  postId: text("post_id")
    .notNull()
    .references(() => posts.slug),
  parentId: text("parent_id"),
});

export const rates = pgTable(
  "rate",
  {
    userId: text("user_id")
      .notNull()
      .references(() => users.id),
    commentId: text("comment_id")
      .notNull()
      .references(() => comments.id, { onDelete: "cascade" }),
    like: integer("like").notNull(),
  },
  (rate) => ({
    compoundKey: primaryKey({
      columns: [rate.userId, rate.commentId],
    }),
  }),
);

export const commentsRelations = relations(comments, ({ one, many }) => ({
  user: one(users, {
    fields: [comments.userId],
    references: [users.id],
  }),
  post: one(posts, {
    fields: [comments.postId],
    references: [posts.slug],
  }),
  parent: one(comments, {
    fields: [comments.parentId],
    references: [comments.id],
    relationName: "comment_replies",
  }),
  replies: many(comments, {
    relationName: "comment_replies",
  }),
  rates: many(rates),
}));

export const ratesRelations = relations(rates, ({ one }) => ({
  user: one(users, {
    fields: [rates.userId],
    references: [users.id],
  }),
  comment: one(comments, {
    fields: [rates.commentId],
    references: [comments.id],
  }),
}));
