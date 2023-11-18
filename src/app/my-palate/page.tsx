import {getServerAuthSession} from "~/server/auth";
import {redirect} from "next/navigation";
import Image from "next/image";
import {api} from "~/trpc/server";
import Recipe from "~/app/_components/recipe";

export default async function MyPalate() {

    const session = await getServerAuthSession();

    if (!session) {
        redirect(`/`)
    }

    const palates = await api.palate.fetchPalates.query();

    return (
        <div className={`px-8 pt-28`}>
            <div className={`flex items-center justify-around w-full`}>
                <div className={`text-center space-y-4 w-full`}>
                    <h1 className={`text-3xl font-bold text-center`}>My Profile</h1>
                    <p>Welcome back, {session.user.name}</p>
                    <p>
                        Your email is: <span className={`font-bold`}>{session.user.email}</span>
                    </p>
                </div>
                <div className={`w-full flex items-center justify-center`}>
                    {
                        session.user.image ? (
                            <Image src={session.user.image} alt="Profile Image" width={300} height={300}
                                   className={`rounded-full mx-auto mt-4`}/>
                        ) : (
                            <Image src={`/default-user-img.jpg`} alt={`Profile Image`} width={300} height={300}
                                   className={`rounded-full mx-auto mt-4`}/>
                        )
                    }
                </div>
            </div>
            <hr className={`my-8`}/>

            <div className={`mb-12`}>
                <h2 className={`text-3xl font-bold text-center mb-8`}>My Palate</h2>
                {palates.length === 0 ? (
                    <div
                        className={`min-h-[40vh] flex items-center justify-center`}
                    >
                        <p>
                            No recipes added to your palate yet.
                        </p>
                    </div>) : (
                    <div className={`space-y-6`}>
                        {
                        palates.map((palate) => (
                        <Recipe id={palate.recipeId} key={palate.id}/>
                        ))
                        }
                    </div>
                )}
            </div>
        </div>
    )
}