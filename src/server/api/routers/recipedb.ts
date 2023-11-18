import {createTRPCRouter, protectedProcedure} from "~/server/api/trpc";
import {api} from "~/trpc/server";
import {z} from "zod";

export const recipeDbRouter = createTRPCRouter({
    fetchRecipeOfTheDay: protectedProcedure.mutation(async ({}) => {
        const token = (await api.token.getAccessToken.mutate()) as string;

        const response = await fetch(
            "https://cosylab.iiitd.edu.in/api/recipeDB/recipeoftheday",
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );

        try {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return await response.json();
        } catch (e) {
            console.log(e);
            return null;
        }

    }),

    fetchRecipe: protectedProcedure
        .input(
            z.object({
                id: z.number(),
            }),
        )
        .mutation(async ({input}) => {
            const token = (await api.token.getAccessToken.mutate()) as string;

            const response = await fetch(
                `https://cosylab.iiitd.edu.in/api/recipeDB/recipeInfo/${input.id}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            const recipe = await response.json();
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return recipe;
        }),

    searchRecipeByName: protectedProcedure
        .input(
            z.object({
                name: z.string(),
            }),
        )
        .mutation(async ({input}) => {
            const token = (await api.token.getAccessToken.mutate()) as string;

            const response = await fetch(
                `https://cosylab.iiitd.edu.in/rdbapi/recipeDB/searchRecipeBySubTitle/${input.name}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            const recipe = await response.json();
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return recipe;
        }),

    searchRecipeByIngredient: protectedProcedure
        .input(
            z.object({
                ingredient: z.string(),
            }),
        )
        .mutation(async ({input}) => {
            const token = (await api.token.getAccessToken.mutate()) as string;

            const response = await fetch(
                `https://cosylab.iiitd.edu.in/rdbapi/recipeDB/searchRecipeByIngUsed/${input.ingredient}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            const recipe = await response.json();
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return recipe;
        }),

    searchRecipeByRegion: protectedProcedure
        .input(
            z.object({
                region: z.string(),
            }),
        )
        .mutation(async ({input}) => {
            const token = (await api.token.getAccessToken.mutate()) as string;

            const response = await fetch(
                `https://cosylab.iiitd.edu.in/api/recipeDB/search_region/${input.region}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            const recipe = await response.json();
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return recipe;
        }),

    searchRecipeByCalories: protectedProcedure.input(z.object(
        {
            range: z.string(),
        }
    )).mutation(async ({input}) => {
        const token = (await api.token.getAccessToken.mutate()) as string;

        const response = await fetch(
            `https://cosylab.iiitd.edu.in/rdbapihttps://cosylab.iiitd.edu.in/rdbapi/recipeDB/searchRecipeByCalorie/${input.range}`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );
        const recipe = await response.json();
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return recipe;
    })
});
