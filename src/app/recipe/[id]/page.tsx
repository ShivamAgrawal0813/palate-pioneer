import {api} from "~/trpc/server";
import Image from "next/image";
import Link from "next/link";

export default async function Recipe({
                                         params: {
                                             id
                                         }
                                     }: {
    params: {
        id: string
    }
}) {

    const recipe = await api.recipeDb.fetchRecipe.mutate({
        id: id
    });

    return (
        <div className={`flex pt-24 px-8`}>
            <div className={`w-full p-4 flex flex-col items-center justify-center`}>
                <h1
                    className={`text-3xl text-center font-bold mb-6`}
                >
                    {recipe.recipe_title}
                </h1>
                <div className={`text-center space-y-4`}>
                    <p>
                        Cook Time: <span className={`font-bold`}>{
                        recipe.cook_time
                    }</span> mins.
                    </p>
                    <p>
                        Preperation Time: <span className={`font-bold`}>{
                        recipe.prep_time
                    }</span> mins.
                    </p>
                    <p>
                        Serves: <span className={`font-bold`}>{
                        recipe.servings
                    }</span> people
                    </p>
                    <p>
                        Region: <span className={`font-bold`}>{
                        recipe.region
                    }</span>
                    </p>
                    <p>
                        Continent: <span className={`font-bold`}>{
                        recipe.continent
                    }</span>
                    </p>
                    <p>
                        Sub Region: <span className={`font-bold`}>{
                        recipe.sub_region
                    }</span>
                    </p>
                    <p>
                        Source: <span className={`font-bold`}>{
                        recipe.source
                    }</span> - <Link href={recipe.url} className={`link link-primary`}>
                        View Source
                    </Link>
                    </p>
                </div>
            </div>
            <div className={`w-full min-h-[80dvh] relative`}>
                <Image src={recipe.img_url} alt={recipe.recipe_title} layout={`fill`}
                       className={`object-contain rounded-xl`}/>
            </div>
        </div>
    )
}