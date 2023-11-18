"use client";

import {useState} from "react";
import {api} from "~/trpc/react";
import Image from "next/image";
import Link from "next/link";
import AddToPalateButton from "~/app/_components/add-to-palate-button";

const convertToTitleCase = (str: string) => {
    return str.replace(
        /\w\S*/g,
        (txt) => {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}

export default function SearchRecipes() {

    const [searchBy, setSearchBy] = useState(`Recipe Name`);
    const [recipes, setRecipes] = useState(null);
    const [searchTerm, setSearchTerm] = useState(``);

    const searchByName = api.recipeDb.searchRecipeByName.useMutation();
    const searchByIngredients = api.recipeDb.searchRecipeByIngredient.useMutation();
    const searchRecipeByRegion = api.recipeDb.searchRecipeByRegion.useMutation();

    const handleSearch = async () => {
        let result;
        if (searchBy === `Recipe Name`) {
            result = await searchByName.mutateAsync({
                name: convertToTitleCase(searchTerm)
            });
        } else if (searchBy === `Ingredients`) {
            result = await searchByIngredients.mutateAsync({
                ingredient: searchTerm
            });
        } else if (searchBy === `Region`) {
            result = await searchRecipeByRegion.mutateAsync({
                region: convertToTitleCase(searchTerm)
            });
        }

        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        setRecipes(result);
    }

    return (
        <div className={`px-8 pt-24`}>
            <div className={`w-full relative flex`}>
                <select className="select select-bordered w-full max-w-xs" onChange={
                    (e) => {
                        setSearchBy(e.target.value);
                    }
                }>
                    <option>Recipe Name</option>
                    <option>Ingredients</option>
                    <option>Region</option>
                </select>
                <input className={`input input-bordered w-full`} placeholder={`Search Recipes`} onChange={
                    (e) => {
                        setSearchTerm(e.target.value);
                    }
                }
                />
                <button className={`btn absolute right-4 mt-2  btn-sm`} onClick={
                    async () => {
                        await handleSearch();
                    }
                }>
                    Search
                </button>
            </div>
            <div className={`space-y-4 mt-8`}>
                {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-expect-error
                    recipes ? (recipes.length > 0 ? recipes.map((recipe) => {
                            return (
                                <div
                                    className={`bg-base-200 rounded-xl flex items-center justify-between hover:bg-base-300 transition-all ease-in-out duration-300`}
                                    key={recipe._id}>
                                    <div className={`p-4`}>
                                        <p
                                            className={`font-bold`}
                                        >
                                            {recipe.recipe_title}
                                        </p>
                                        <p>
                                            Region: <span className={`underline`}>{recipe.region}</span> | Serves: <span
                                            className={`underline`}>{recipe.servings}</span> people | Prep Time: <span
                                            className={`underline`}>{recipe.prep_time}</span> mins. | Cook Time: <span
                                            className={`underline`}>{recipe.cook_time}</span> mins.
                                        </p>
                                        <div className={`mt-4`}>
                                            <Link href={`/recipe/${recipe.recipe_id}`}
                                                  className={`btn btn-sm btn-secondary mr-2`}>
                                                View Recipe
                                            </Link>
                                            <AddToPalateButton size={`btn-sm`} text={`Add to Palate`} recipeId={Number(recipe.recipe_id)}/>
                                        </div>
                                    </div>
                                    <Image src={recipe.img_url} width={300} height={300} alt={recipe.recipe_title}
                                           className={`rounded-xl`}/>
                                </div>
                            )
                        }
                    ) : (
                        <div className={`flex h-[70dvh]  items-center justify-center`}>
                            No recipes found.
                        </div>
                    )) : (
                        <div className={`flex flex-col h-[70dvh]  items-center justify-center`}>
                            <p className={``}>
                                Search for recipes by name, ingredients, or region.
                            </p>
                        </div>
                    )
                }
            </div>
        </div>
    )
}