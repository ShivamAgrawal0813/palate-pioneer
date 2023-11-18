"use client";

import { useEffect, useState } from "react";
import { api } from "~/trpc/react";
import Image from "next/image";
import Link from "next/link";
import AddToPalateButton from "~/app/_components/add-to-palate-button";

const convertToTitleCase = (str: string) => {
  return str.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

const randomSearchTerm = () => {
  const terms = [
    "Dal",
    "Chicken",
    "Paneer",
    "Pasta",
    "Bread",
    "Cake",
    "Pizza",
    "Burger",
    "Sandwich",
    "Salad",
  ];

  return terms[Math.floor(Math.random() * terms.length)]!;
};

export default function SearchRecipes() {
  const [searchBy, setSearchBy] = useState(`Recipe Name`);
  const [recipes, setRecipes] = useState<
    | null
    | [
        {
          _id: string;
          recipe_id: string;
          recipe_title: string;
          region: string;
          servings: number;
          prep_time: number;
          cook_time: number;
          img_url: string;
        },
      ]
  >(null);
  const [searchTerm, setSearchTerm] = useState(randomSearchTerm());

  const searchByName = api.recipeDb.searchRecipeByName.useMutation();
  const searchByIngredients =
    api.recipeDb.searchRecipeByIngredient.useMutation();
  const searchRecipeByRegion = api.recipeDb.searchRecipeByRegion.useMutation();
  const searchRecipeByCalories = api.recipeDb.searchRecipeByCalories.useMutation();

  const [placeHolder, setPlaceHolder] = useState<string>(`Search by Recipe Name`);

  const handleSearch = async () => {
    let result;
    if (searchBy === `Recipe Name`) {
      result = await searchByName.mutateAsync({
        name: convertToTitleCase(searchTerm),
      });
    } else if (searchBy === `Ingredients`) {
      result = await searchByIngredients.mutateAsync({
        ingredient: searchTerm,
      });
    } else if (searchBy === `Region`) {
      result = await searchRecipeByRegion.mutateAsync({
        region: convertToTitleCase(searchTerm),
      });
    }else if (searchBy === `Calories`) {
        result = await searchRecipeByCalories.mutateAsync({
            range: searchTerm,
        });
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    setRecipes(result);
  };

  useEffect(() => {
    void handleSearch();
  }, []);

  return (
    <div className={`px-8 pt-24`}>
      <div className={`relative flex w-full`}>
        <select
          className="select select-bordered w-full max-w-xs"
          onChange={(e) => {
            setSearchBy(e.target.value);
            if (e.target.value === `Recipe Name`) {
              setPlaceHolder(`Search by Recipe Name`);
            } else if (e.target.value === `Ingredients`) {
              setPlaceHolder(`Search by Ingredients`);
            } else if (e.target.value === `Region`) {
              setPlaceHolder(`Search by Region`);
            } else if (e.target.value === `Calories`) {
              setPlaceHolder(`Search by Calories in format: low:high`);
            }
          }}
        >
          <option>Recipe Name</option>
          <option>Ingredients</option>
          <option>Region</option>
          <option>Calories</option>
        </select>
        <input
          className={`input input-bordered w-full`}
          placeholder={placeHolder}
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
        <button
          className={`btn btn-sm absolute right-4  mt-2`}
          onClick={async () => {
            await handleSearch();
          }}
        >
          Search
        </button>
      </div>
      <div className={`mt-8 space-y-4`}>
        {recipes ? (
          recipes.length > 0 ? (
            recipes.map((recipe) => {
              return (
                <div
                  className={`flex items-center justify-between rounded-xl bg-base-200 transition-all duration-300 ease-in-out hover:bg-base-300`}
                  key={recipe._id}
                >
                  <div className={`p-4`}>
                    <p className={`font-bold`}>{recipe.recipe_title}</p>
                    <p>
                      Region:{" "}
                      <span className={`underline`}>{recipe.region}</span> |
                      Serves:{" "}
                      <span className={`underline`}>{recipe.servings}</span>{" "}
                      people | Prep Time:{" "}
                      <span className={`underline`}>{recipe.prep_time}</span>{" "}
                      mins. | Cook Time:{" "}
                      <span className={`underline`}>{recipe.cook_time}</span>{" "}
                      mins.
                    </p>
                    <div className={`mt-4`}>
                      <Link
                        href={`/recipe/${recipe.recipe_id}`}
                        className={`btn btn-secondary btn-sm mr-2`}
                      >
                        View Recipe
                      </Link>
                      <AddToPalateButton
                        size={`btn-sm`}
                        text={`Add to Palate`}
                        recipeId={Number(recipe.recipe_id)}
                      />
                    </div>
                  </div>
                  <Image
                    src={recipe.img_url}
                    width={300}
                    height={300}
                    alt={recipe.recipe_title}
                    className={`rounded-xl`}
                  />
                </div>
              );
            })
          ) : (
            <div className={`flex h-[70dvh]  items-center justify-center`}>
              No recipes found.
            </div>
          )
        ) : (
          <div
            className={`flex h-[70dvh] flex-col  items-center justify-center`}
          >
            <p className={``}>Loading...</p>
          </div>
        )}
      </div>
    </div>
  );
}
