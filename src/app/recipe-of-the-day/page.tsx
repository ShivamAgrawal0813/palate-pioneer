import { api } from "~/trpc/server";
import Image from "next/image";
import Link from "next/link";
import AddToPalateButton from "~/app/_components/add-to-palate-button";
export const dynamic = 'force-dynamic';

export default async function RecipeOfTheDay() {
  const recipeOfTheDay = await api.recipeDb.fetchRecipeOfTheDay.mutate();

  return (
    <div className={`px-8 pt-28`}>
      <div className={`mb-4 flex h-[40dvh] items-center justify-around`}>
        <div
          className={`mr-4 flex h-full w-full flex-col items-center justify-center rounded-xl border border-primary text-center`}
        >
          <h1 className={`mb-4 text-4xl font-bold`}>Recipe of the Day</h1>
          <div className={`text-sm`}>
            <p className={`mb-6 text-lg underline`}>
              <span className={`font-bold`}>{recipeOfTheDay.recipe_title}</span>
            </p>
            <p className={`mb-2`}>
              Region:{" "}
              <span className={`font-bold`}>{recipeOfTheDay.region}</span>
            </p>
            <p className={`mb-2`}>
              Sub Region:{" "}
              <span className={`font-bold`}>{recipeOfTheDay.sub_region}</span>
            </p>
            <p className={`mb-2`}>
              Continent:{" "}
              <span className={`font-bold`}>{recipeOfTheDay.continent}</span>
            </p>
          </div>
        </div>
        <div className={`relative h-full w-full`}>
          <Image
            src={recipeOfTheDay.img_url}
            alt={"Recipe of the Day"}
            layout={`fill`}
            className={`rounded-xl object-cover`}
          />
        </div>
      </div>

      <div className={`flex h-[40dvh] items-center justify-around `}>
        <div className={`flex w-full items-center justify-center`}>
          <AddToPalateButton
            text={`Add this Recipe to your Palate`}
            recipeId={recipeOfTheDay.recipe_id}
          />
        </div>
        <div
          className={`flex h-full w-full flex-col items-center justify-center rounded-xl border border-primary text-center`}
        >
          <h1 className={`mb-8 text-2xl font-bold`}>More about this recipe</h1>
          <div className={`flex items-center justify-between text-sm`}>
            <div className={`mr-8 text-start`}>
              <p>
                Cook Time:{" "}
                <span className={`font-bold`}>{recipeOfTheDay.cook_time}</span>{" "}
                mins.
              </p>
              <p>
                Prep Time:{" "}
                <span className={`font-bold`}>{recipeOfTheDay.prep_time}</span>{" "}
                mins.
              </p>
              <p>
                Serves{" "}
                <span className={`font-bold`}>{recipeOfTheDay.servings}</span>{" "}
                people
              </p>
            </div>
            <div className={`text-end`}>
              <p>
                Utensils:{" "}
                <span className={`font-bold`}>{recipeOfTheDay.utensils}</span>
              </p>
              <p>
                Calories:{" "}
                <span className={`font-bold`}>{recipeOfTheDay.calories}</span>
              </p>
            </div>
          </div>

          <Link
            href={`/recipe/${recipeOfTheDay.recipe_id}`}
            className={`btn btn-sm mt-8`}
          >
            View Full Recipe
          </Link>
        </div>
      </div>
    </div>
  );
}
