import Image from "next/image";
import AnimatedTextWord from "~/app/_components/animated-text-word";

export default function Home() {
  return (
    <main className="min-h-screen mb-20">
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

      <div className={`mt-20 px-8`}>
        <h2
        className={`text-3xl font-bold text-center mb-8`}
        >
          About Us
        </h2>
        <p
        className={`text-center leading-8`}
        >
          Palate Pioneer is a culinary platform that offers a personalized experience, allowing users to explore new flavors, access curated recipes from RecipeDB, and embark on global gastronomic journeys. The platform includes a flavor personalization feature, a curated recipe database, a cultural culinary explorer, a personalized nutrition assistant, and dynamic culinary adventures. With a robust API, secure authentication, and scalability for seamless user experiences, Palate Pioneer aims to be a go-to destination for those seeking a uniquely tailored, global, and health-conscious culinary journey.
        </p>
      </div>

      <div className={`mt-20 px-8`}>
        <h3
        className={`text-3xl font-bold text-center mb-20`}
        >
          Get Curated Recipes, create your own Palate.
        </h3>
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 h-[50dvh]`}>
          <div className={`relative h-full group`}>
            <div className={`z-20 p-8 flex items-center flex-col justify-center h-full border rounded-xl`}>
              <h4 className={`font-bold mb-2 text-lg`}>
                Elevate your culinary skills
              </h4>
              <p>
                Explore a vast collection of
                curated recipes handpicked by
                {"RecipeDB's"} team of expert chefs
              </p>
            </div>
            <Image src={`/image-1.jpg`} alt={`Image 1`} layout={`fill`} className={`rounded-xl opacity-30 group-hover:opacity-10 transition-all ease-in-out duration-300`} />
          </div>
          <div className={`relative h-full group`}>
            <div className={`z-20 p-8 flex items-center flex-col justify-center h-full border rounded-xl`}>
              <h4 className={`font-bold mb-2 text-lg`}>
                Cook with Confidence
              </h4>
              <p>
                Follow step-by-step instructions
                and create mouthwatering dishes
                that will impress your friends and
                family
              </p>
            </div>
            <Image src={`/image-2.jpg`} alt={`Image 1`} layout={`fill`} className={`rounded-xl opacity-30 group-hover:opacity-10 transition-all ease-in-out duration-300`} />
          </div>
          <div className={`relative h-full group`}>
            <div className={`z-20 p-8 flex items-center flex-col justify-center h-full border rounded-xl`}>
              <h4 className={`font-bold mb-2 text-lg`}>
                Endless Recipe Inspiration
              </h4>
              <p>
                From quick weeknight meals to
                show-stopping desserts, RecipeDB
                has recipes to satisfy every
                craving and occasion
              </p>
            </div>
            <Image src={`/image-3.jpg`} alt={`Image 1`} layout={`fill`} className={`rounded-xl opacity-30 group-hover:opacity-10 transition-all ease-in-out duration-300`} />
          </div>
        </div>
      </div>
    </main>
  );
}
