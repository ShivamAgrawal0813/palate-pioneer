import Image from "next/image";
import SignupForm from "~/app/_components/signup-form";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <main className="flex min-h-screen">
      <div className={`relative mb-2 mt-20 hidden w-full md:block`}>
        <Image
          src={`/food-bg.jpg`}
          alt={`Food Background`}
          className={`ml-2 w-full rounded-xl object-cover`}
          layout={`fill`}
        />
      </div>
      <div className={`flex w-full flex-col items-center justify-center p-8`}>
        <h1 className={`mb-4 text-2xl font-bold`}>Sign Up Page</h1>
        <p className={`mb-8 text-center text-sm`}>
          Dive into the world of food and discover the best recipes from around
          the world.
        </p>
        <SignupForm />
        <p className={`mt-4 text-center text-sm`}>
          Already have an account?{" "}
          <Link href={`/auth/signin`} className={`link text-secondary`}>
            Sign-In
          </Link>
        </p>
      </div>
    </main>
  );
}
