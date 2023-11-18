import { getServerAuthSession } from "~/server/auth";
import Image from "next/image";
import AnimatedTextWord from "~/app/_components/animated-text-word";

export default async function Home() {
  const session = await getServerAuthSession();

  return (
    <main className="min-h-screen">
      <div className={`relative h-[80dvh] w-full`}>
        <Image
          src={`/main-bg.jpg`}
          alt={`Landing Page Background`}
          layout={`fill`}
          className={`object-cover`}
        />
        <div
          className={`absolute left-1/2 top-1/4 -translate-x-1/2 -translate-y-1/2 transform text-center text-white`}
        >
          <h1 className={`mb-2 text-7xl font-bold`}>Palate Pioneer</h1>
          <div className={`flex items-center justify-center`}>
            <AnimatedTextWord
              text={`A Journey into the Culinary Exploration`}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
