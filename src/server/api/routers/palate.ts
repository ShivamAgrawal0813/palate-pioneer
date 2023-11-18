import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { z } from "zod";

export const palateRouter = createTRPCRouter({
  insertPalate: protectedProcedure
    .input(
      z.object({
        recipeId: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // throw error if recipeId already exists
      const palate = await ctx.db.palate.findFirst({
        where: {
          recipeId: input.recipeId,
          userId: ctx.session.user.id,
        },
      });

      if (palate) {
        return;
      }

      return await ctx.db.palate.create({
        data: {
          recipeId: input.recipeId,
          userId: ctx.session.user.id,
        },
      });
    }),

  fetchPalates: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.palate.findMany({
      where: {
        userId: ctx.session.user.id,
      },
      orderBy: {
        addedAt: "desc",
      },
    });
  }),
});
