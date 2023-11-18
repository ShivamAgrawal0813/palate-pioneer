import {api} from "~/trpc/server";
import Link from "next/link";
import Image from "next/image";

function howLongAgo(date: Date) {
    const diff = Date.now() - date.getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(weeks / 4);
    const years = Math.floor(months / 12);

    if (years > 0) return `${years} year${years > 1 ? "s" : ""} ago`;

    if (months > 0) return `${months} month${months > 1 ? "s" : ""} ago`;

    if (weeks > 0) return `${weeks} week${weeks > 1 ? "s" : ""} ago`;

    if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;

    if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;

    if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;

    if (seconds > 0) return `${seconds} second${seconds > 1 ? "s" : ""} ago`;

    return "just now";
}

export default async function Recipe({id, addedAt}: { id: number, addedAt: Date }) {
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
                <p className={`mb-2`}>
                    Region: <span className={`underline`}>{recipe.region}</span> | Serves:{" "}
                    <span className={`underline`}>{recipe.servings}</span> people | Prep
                    Time: <span className={`underline`}>{recipe.prep_time}</span> mins. |
                    Cook Time: <span className={`underline`}>{recipe.cook_time}</span>{" "}
                    mins.
                </p>
                <p className={`text-sm`}>
                    {howLongAgo(addedAt)}
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
