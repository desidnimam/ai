import { authRouter } from "./router/auth";
import { viewsRouter } from "./router/views";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  views: viewsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
