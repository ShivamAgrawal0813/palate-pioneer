import {getServerAuthSession} from "~/server/auth";
import Image from "next/image";
import AnimatedTextWord from "~/app/_components/animated-text-word";

export default async function Home() {
    const session = await getServerAuthSession();

    return (
        <main className="min-h-screen">
            <div className={`w-full h-[80dvh] relative`}>
                <Image src={`/main-bg.jpg`} alt={`Landing Page Background`} layout={`fill`} className={`object-cover`} />
                <div
                    className={`absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white`}
                >
                    <h1 className={`text-7xl font-bold mb-2`}>Palate Pioneer</h1>
                    <div className={`flex items-center justify-center`}>
                        <AnimatedTextWord text={`A Journey into the Culinary Exploration`}  />
                    </div>
                </div>
            </div>
        </main>
    );
}
