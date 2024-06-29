import type { MiddlewareConfig } from "next/server";

export { auth as middleware } from "@designali/auth";

export const config: MiddlewareConfig = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: [
    "/((?!api|_next/static|_next/image|.*\\.png$).*)",
    "/dashboard/:path*",
    "/login",
  ],
};
