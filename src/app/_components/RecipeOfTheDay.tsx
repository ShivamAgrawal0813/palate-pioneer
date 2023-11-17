import {api} from "~/trpc/server";
import Image from "next/image";

export default async function RecipeOfTheDay() {

    const recipeOfTheDay = await api.recipeDb.fetchRecipeOfTheDay.mutate();

    return (
        <div className={`px-8`}>
            <div className={`flex items-center justify-around h-[40dvh] mb-4`}>
                <div
                    className={`text-center w-full border h-full flex flex-col items-center justify-center rounded-xl border-primary mr-4`}>
                    <h1 className={`text-4xl font-bold mb-2`}>Recipe of the Day</h1>
                    <div className={`text-sm`}>
                        <p className={`mb-6`}>
                            {"Let's"} try something new today!
                        </p>
                        <p className={`mb-2`}>
                            Name: <span className={`font-bold`}>{recipeOfTheDay.recipe_title}</span>
                        </p>
                        <p>
                            From the country of <span className={`font-bold`}>{recipeOfTheDay.sub_region}</span>, in the
                            continent of <span className={`font-bold`}>{recipeOfTheDay.continent}</span>
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
                    <button className={`btn`}>
                        Add This Recipe to your Palate
                    </button>
                </div>
                <div
                    className={`text-center w-full border h-full flex flex-col items-center justify-center rounded-xl border-primary`}>
                    <h1 className={`text-2xl font-bold mb-8`}>More about this recipe</h1>
                    <div className={`text-sm flex justify-between items-center`}>
                        <div className={`mr-8 text-start`}>
                            <p>
                                Cook Time: <span className={`font-bold`}>{recipeOfTheDay.cook_time}</span>
                            </p>
                            <p>
                                Prep Time: <span className={`font-bold`}>{recipeOfTheDay.prep_time}</span>
                            </p>
                            <p>
                                Servings: <span className={`font-bold`}>{recipeOfTheDay.servings}</span>
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
                </div>
            </div>
        </div>
    )
}