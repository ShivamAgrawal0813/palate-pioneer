import {createTRPCRouter, publicProcedure} from "~/server/api/trpc";
import {api} from "~/trpc/server";

export const recipeDbRouter = createTRPCRouter({
    fetchRecipeOfTheDay: publicProcedure.mutation(async ({input}) => {

        const token = await api.token.getAccessToken.mutate() as string;

        const response =  await fetch("https://cosylab.iiitd.edu.in/api/recipeDB/recipeoftheday", {
            'method': 'GET',
            'headers': {
                'Authorization': `Bearer ${token}`,
            }
        });
        const recipe = await response.json();
        return recipe;
    })
})