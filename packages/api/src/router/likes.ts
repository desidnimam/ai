import { eq, likesSessions, posts, sql, sum } from "@designali/db";
import { TRPCError } from "@trpc/server";
import { sha512 } from "js-sha512";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

const getSessionId = (slug: string, headers: Headers): string => {
  const ipAddress = headers.get("x-forwarded-for") ?? "0.0.0.0";
  const currentUserId = sha512(ipAddress + process.env.IP_ADDRESS_SALT);

  return `${slug}___${currentUserId}`;
};

export const likesRouter = createTRPCRouter({
  getCount: publicProcedure.query(async ({ ctx }) => {
    const likes = await ctx.db
      .select({
        value: sum(likesSessions.likes),
      })
      .from(posts);

    return {
      likes: likes[0]?.value ? Number(likes[0].value) : 0,
    };
  }),
  get: publicProcedure
    .input(
      z.object({
        slug: z.string().min(1),
      }),
    )
    .query(async ({ ctx, input }) => {
      const [post, user] = await Promise.all([
        ctx.db
          .select({
            likes: posts.likes,
          })
          .from(posts)
          .where(eq(posts.slug, input.slug)),
        ctx.db
          .select({
            likes: likesSessions.likes,
          })
          .from(likesSessions),
      ]);

      return {
        likes: post[0]?.likes ?? 0,
        currentUserLikes: user[0]?.likes ?? 0,
      };
    }),
  patch: publicProcedure
    .input(
      z.object({
        slug: z.string().min(1),
        value: z.number().int().positive().min(1).max(3),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const session = await ctx.db
        .select({
          likes: likesSessions.likes,
        })
        .from(likesSessions);

      if (session[0] && session[0].likes + input.value > 3) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "You can only like a post 3 times",
        });
      }

      await ctx.db
        .insert(posts)
        .values({
          slug: input.slug,
          likes: input.value,
        })
        .onConflictDoUpdate({
          target: posts.slug,
          set: {
            likes: sql<number>`${posts.likes} + ${input.value}`,
          },
        });
    }),
});
