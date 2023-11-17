import {getServerAuthSession} from "~/server/auth";
import {redirect} from "next/navigation";
import RecipeOfTheDay from "~/app/_components/RecipeOfTheDay";

export default async function Home() {

    const session = await getServerAuthSession();

    if(!session){
        redirect("/auth/signin")
    }

    return (
        <main className="min-h-screen pt-24">
            <RecipeOfTheDay />
        </main>
    )
}