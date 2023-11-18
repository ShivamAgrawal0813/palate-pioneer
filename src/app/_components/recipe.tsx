import { api } from "~/trpc/server";
import Link from "next/link";
import AddToPalateButton from "~/app/_components/add-to-palate-button";
import Image from "next/image";

export default async function Recipe({ id }: { id: number }) {
  const recipe = await api.recipeDb.fetchRecipe.mutate({
    id,
  });

  return (
    <Link
      href={`/recipe/${recipe.recipe_id}`}
      className={`flex items-center justify-between rounded-xl bg-base-200 transition-all duration-300 ease-in-out hover:bg-base-300`}
      key={recipe._id}
    >
      <div className={`p-4`}>
        <p className={`font-bold`}>{recipe.recipe_title}</p>
        <p>
          Region: <span className={`underline`}>{recipe.region}</span> | Serves:{" "}
          <span className={`underline`}>{recipe.servings}</span> people | Prep
          Time: <span className={`underline`}>{recipe.prep_time}</span> mins. |
          Cook Time: <span className={`underline`}>{recipe.cook_time}</span>{" "}
          mins.
        </p>
      </div>
      <Image
        src={recipe.img_url}
        width={300}
        height={300}
        alt={recipe.recipe_title}
        className={`rounded-xl`}
      />
    </Link>
  );
}
