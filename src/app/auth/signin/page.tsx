import Image from "next/image";
import Link from "next/link";
import SigninForm from "~/app/_components/signin-form";

export default function SignInPage() {
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
        <h1 className={`mb-4 text-2xl font-bold`}>Sign In Page</h1>
        <p className={`mb-8 text-center text-sm`}>
          Welcome back! Sign in to your account to continue.
        </p>
        <SigninForm />
        <p className={`mt-4 text-center text-sm`}>
          {"Don't"} have an account?{" "}
          <Link href={`/auth/signup`} className={`link text-secondary`}>
            Sign-Up
          </Link>
        </p>
      </div>
    </main>
  );
}
