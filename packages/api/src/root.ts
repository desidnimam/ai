import { authRouter } from "./router/auth";
import { likesRouter } from "./router/likes";
import { viewsRouter } from "./router/views";
import { youtubeRouter } from "./router/youtube";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  views: viewsRouter,
  likes: likesRouter,
  youtube: youtubeRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
