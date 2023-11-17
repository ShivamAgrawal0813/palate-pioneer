import {api} from "~/trpc/server";
import Image from "next/image";
import Link from "next/link";

export default async function RecipeOfTheDay() {

    const recipeOfTheDay = await api.recipeDb.fetchRecipeOfTheDay.mutate();

    return (
        <div className={`px-8 pt-28`}>
            <div className={`flex items-center justify-around h-[40dvh] mb-4`}>
                <div
                    className={`text-center w-full border h-full flex flex-col items-center justify-center rounded-xl border-primary mr-4`}>
                    <h1 className={`text-4xl font-bold mb-4`}>Recipe of the Day</h1>
                    <div className={`text-sm`}>
                        <p className={`mb-6 text-lg underline`}>
                            <span className={`font-bold`}>{recipeOfTheDay.recipe_title}</span>
                        </p>
                        <p className={`mb-2`}>
                            Region: <span className={`font-bold`}>{recipeOfTheDay.region}</span>
                        </p>
                        <p className={`mb-2`}>
                            Sub Region: <span className={`font-bold`}>{recipeOfTheDay.sub_region}</span>
                        </p>
                        <p className={`mb-2`}>
                            Continent: <span className={`font-bold`}>{recipeOfTheDay.continent}</span>
                        </p>
                    </div>
                </div>
                <div className={`relative h-full w-full`}>
                    <Image src={recipeOfTheDay.img_url} alt={"Recipe of the Day"} layout={`fill`}
                           className={`object-cover rounded-xl`}/>
                </div>
            </div>

            <div className={`flex items-center justify-around h-[40dvh] `}>
                <div className={`flex items-center justify-center w-full`}>
                    <button className={`btn btn-primary`}>
                        Add This Recipe to your Palate
                    </button>
                </div>
                <div
                    className={`text-center w-full border h-full flex flex-col items-center justify-center rounded-xl border-primary`}>
                    <h1 className={`text-2xl font-bold mb-8`}>More about this recipe</h1>
                    <div className={`text-sm flex justify-between items-center`}>
                        <div className={`mr-8 text-start`}>
                            <p>
                                Cook Time: <span className={`font-bold`}>{recipeOfTheDay.cook_time}</span> mins.
                            </p>
                            <p>
                                Prep Time: <span className={`font-bold`}>{recipeOfTheDay.prep_time}</span> mins.
                            </p>
                            <p>
                                Serves <span className={`font-bold`}>{recipeOfTheDay.servings}</span> people
                            </p>
                        </div>
                        <div className={`text-end`}>
                            <p>
                                Utensils: <span className={`font-bold`}>{recipeOfTheDay.utensils}</span>
                            </p>
                            <p>
                                Processes: <span className={`font-bold`}>{recipeOfTheDay.processes}</span>
                            </p>
                            <p>
                                Calories: <span className={`font-bold`}>{recipeOfTheDay.calories}</span>
                            </p>
                        </div>
                    </div>

                    <Link href={`/recipe/${recipeOfTheDay.recipe_id}`} className={`btn btn-sm mt-8`}>
                        View Full Recipe
                    </Link>
                </div>
            </div>
        </div>
    )
}