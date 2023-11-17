import Image from "next/image";
import SignupForm from "~/app/_components/signup-form";
import Link from "next/link";

export default function SignUpPage() {
    return (
        <main className="flex min-h-screen">
            <div className={`relative hidden md:block w-full mt-16 mb-2`}>
                <Image src={`/food-bg.jpg`} alt={`Food Background`} className={`w-full object-cover rounded-xl ml-2`}
                       layout={`fill`}/>
            </div>
            <div className={`w-full flex flex-col p-8 items-center justify-center`}>
                <h1 className={`font-bold text-2xl mb-4`}>Sign Up Page</h1>
                <p className={`text-center text-sm mb-8`}>
                    Dive into the world of food and discover the best recipes from around the world.
                </p>
                <SignupForm/>
                <p
                className={`text-center text-sm mt-4`}
                >
                    Already have an account? <Link href={`/auth/signin`} className={`text-secondary link`}>Sign-In</Link>
                </p>
            </div>
        </main>
    )
}