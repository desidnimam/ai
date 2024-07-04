/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import type { DefaultSession, NextAuthConfig, User } from "next-auth";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { accounts, carts, db, sessions, users } from "@designali/db";
import { sendEmail, WelcomeEmail } from "@designali/emails";
import { compareSync } from "bcrypt-ts-edge";
import { eq } from "drizzle-orm";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Resend from "next-auth/providers/resend";

import { env } from "../env";
import { SENDER_EMAIL } from "./constants";

declare module "next-auth" {
  interface Session {
    user: {
      role: string;
    } & DefaultSession["user"];
  }
}

const adapter = DrizzleAdapter(db, {
  usersTable: users,
  accountsTable: accounts,
  sessionsTable: sessions,
});

export const isSecureContext = env.NODE_ENV !== "development";

export const authConfig = {
  pages: {
    signIn: "/login",
    error: "/sign-in",
  },
  adapter,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: env.AUTH_SECRET,
  providers: [
    Github,
    Google,
    Resend({
      name: "Email",
      from: `<${SENDER_EMAIL}>`,
      id: "email",
    }),
    CredentialsProvider({
      credentials: {
        email: {
          type: "email",
        },
        password: { type: "password" },
      },
      async authorize(credentials) {
        if (credentials == null) return null;

        const user = await db.query.users.findFirst({
          where: eq(users.email, credentials.email as string),
        });
        if (user?.password) {
          const isMatch = compareSync(
            credentials.password as string,
            user.password,
          );
          if (isMatch) {
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
            };
          }
        }
        return null;
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user, trigger, session }: any) => {
      if (user) {
        if (user.name === "NO_NAME") {
          token.name = user.email!.split("@")[0];
          await db
            .update(users)
            .set({
              name: token.name,
            })
            .where(eq(users.id, user.id));
        }

        token.role = user.role;
        if (trigger === "signIn" || trigger === "signUp") {
          const sessionCartId = cookies().get("sessionCartId")?.value;
          if (!sessionCartId) throw new Error("Session Cart Not Found");
          const sessionCartExists = await db.query.carts.findFirst({
            where: eq(carts.sessionCartId, sessionCartId),
          });
          if (sessionCartExists && !sessionCartExists.userId) {
            const userCartExists = await db.query.carts.findFirst({
              where: eq(carts.userId, user.id),
            });
            if (userCartExists) {
              cookies().set("beforeSigninSessionCartId", sessionCartId);
              cookies().set("sessionCartId", userCartExists.sessionCartId);
            } else {
              db.update(carts)
                .set({ userId: user.id })
                .where(eq(carts.id, sessionCartExists.id));
            }
          }
        }
      }

      if (session?.user.name && trigger === "update") {
        token.name = session.user.name;
      }

      return token;
    },
    session: async ({ session, user, trigger, token }: any) => {
      session.user.id = token.sub;
      session.user.role = token.role;
      if (trigger === "update") {
        session.user.name = user.name;
      }
      return session;
    },
    authorized({ request, auth }: any) {
      const protectedPaths = [
        /\/shipping-address/,
        /\/payment-method/,
        /\/place-order/,
        /\/profile/,
        /\/user\/(.*)/,
        /\/order\/(.*)/,
        /\/admin\/(.*)/,
      ];
      const { pathname } = request.nextUrl;
      if (!auth && protectedPaths.some((p) => p.test(pathname))) return false;
      if (!request.cookies.get("sessionCartId")) {
        const sessionCartId = crypto.randomUUID();
        const newRequestHeaders = new Headers(request.headers);
        const response = NextResponse.next({
          request: {
            headers: newRequestHeaders,
          },
        });
        response.cookies.set("sessionCartId", sessionCartId);
        return response;
      } else {
        return true;
      }
    },
  },
  events: {
    async createUser(params) {
      if (!params.user.id || !params.user.email) {
        throw new Error("User id & email is required");
      }

      await sendEmail({
        from: "Ali Imam - Designali <contact@aliimam.in>",
        subject: "Welcome to Designali.",
        to: [params.user.email],
        react: WelcomeEmail(),
      });
    },
  },
} satisfies NextAuthConfig;
