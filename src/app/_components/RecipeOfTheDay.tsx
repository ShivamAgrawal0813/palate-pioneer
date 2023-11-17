import {api} from "~/trpc/server";
import Image from "next/image";

export default async function RecipeOfTheDay(){

    const recipeOfTheDay = await api.recipeDb.fetchRecipeOfTheDay.mutate();

    return(
        <div className={`flex w-fit bg-base-200 p-4 rounded-xl`}>
            <Image src={recipeOfTheDay.img_url} alt={recipeOfTheDay.name} width={300} height={300} className={`rounded-xl mr-4`} />
            <div className={`flex flex-col justify-center max-w-md`}>
                <h2 className={`font-bold text-center`}>Recipe of the Day</h2>
                <div className={`text-sm text-center`}>
                    <p>
                        Want to try something new? Try this recipe of the day!
                    </p>
                    <p className={`mt-4`}>
                        Continent: {recipeOfTheDay.continent}
                    </p>
                    <p>
                        Region: {recipeOfTheDay.region}
                    </p>
                    <p>
                        Protein: {recipeOfTheDay.protein}
                    </p>
                    <p>
                        Servings: {recipeOfTheDay.servings}
                    </p>
                </div>
            </div>
        </div>
    )
}