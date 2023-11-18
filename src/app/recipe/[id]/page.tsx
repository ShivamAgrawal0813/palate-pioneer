import { api } from "~/trpc/server";
import Image from "next/image";
import Link from "next/link";

export default async function Recipe({
  params: { id },
}: {
  params: {
    id: string;
  };
}) {
  const recipe = await api.recipeDb.fetchRecipe.mutate({
    id: Number(id),
  });

  return (
    <div className={`flex px-8 pt-24`}>
      <div className={`flex w-full flex-col items-center justify-center p-4`}>
        <h1 className={`mb-6 text-center text-3xl font-bold`}>
          {recipe.recipe_title}
        </h1>
        <div className={`space-y-4 text-center`}>
          <p>
            Cook Time: <span className={`font-bold`}>{recipe.cook_time}</span>{" "}
            mins.
          </p>
          <p>
            Preperation Time:{" "}
            <span className={`font-bold`}>{recipe.prep_time}</span> mins.
          </p>
          <p>
            Serves: <span className={`font-bold`}>{recipe.servings}</span>{" "}
            people
          </p>
          <p>
            Region: <span className={`font-bold`}>{recipe.region}</span>
          </p>
          <p>
            Continent: <span className={`font-bold`}>{recipe.continent}</span>
          </p>
          <p>
            Sub Region: <span className={`font-bold`}>{recipe.sub_region}</span>
          </p>
          <p>
            Source: <span className={`font-bold`}>{recipe.source}</span> -{" "}
            <Link href={recipe.url} className={`link-primary link`}>
              View Source
            </Link>
          </p>
        </div>
      </div>
      <div className={`relative min-h-[80dvh] w-full`}>
        <Image
          src={recipe.img_url}
          alt={recipe.recipe_title}
          layout={`fill`}
          className={`rounded-xl object-contain`}
        />
      </div>
    </div>
  );
}
