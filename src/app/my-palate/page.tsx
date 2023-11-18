import { getServerAuthSession } from "~/server/auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import { api } from "~/trpc/server";
import Recipe from "~/app/_components/recipe";

export default async function MyPalate() {
  const session = await getServerAuthSession();

  if (!session) {
    redirect(`/`);
  }

  const palates = await api.palate.fetchPalates.query();

  return (
    <div className={`px-8 pt-28`}>
      <div className={`flex w-full items-center justify-around`}>
        <div className={`w-full space-y-4 text-center`}>
          <h1 className={`text-center text-3xl font-bold`}>My Profile</h1>
          <p>Welcome back, {session.user.name}</p>
          <p>
            Your email is:{" "}
            <span className={`font-bold`}>{session.user.email}</span>
          </p>
        </div>
        <div className={`flex w-full items-center justify-center`}>
          {session.user.image ? (
            <Image
              src={session.user.image}
              alt="Profile Image"
              width={300}
              height={300}
              className={`mx-auto mt-4 rounded-full`}
            />
          ) : (
            <Image
              src={`/default-user-img.jpg`}
              alt={`Profile Image`}
              width={300}
              height={300}
              className={`mx-auto mt-4 rounded-full`}
            />
          )}
        </div>
      </div>
      <hr className={`my-8`} />

      <div className={`mb-12`}>
        <h2 className={`mb-8 text-center text-3xl font-bold`}>My Palate</h2>
        {palates.length === 0 ? (
          <div className={`flex min-h-[40vh] items-center justify-center`}>
            <p>No recipes added to your palate yet.</p>
          </div>
        ) : (
          <div className={`space-y-6`}>
            {palates.map((palate) => (
              <Recipe id={palate.recipeId} key={palate.id} addedAt={palate.addedAt} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
