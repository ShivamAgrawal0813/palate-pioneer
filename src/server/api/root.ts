import { createTRPCRouter } from "~/server/api/trpc";
import { userRouter } from "~/server/api/routers/user";
import { recipeDbRouter } from "~/server/api/routers/recipedb";
import { tokenRouter } from "~/server/api/routers/token";
import { palateRouter } from "~/server/api/routers/palate";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  recipeDb: recipeDbRouter,
  token: tokenRouter,
  palate: palateRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
