import Image from "next/image";
import Link from "next/link";
import SigninForm from "~/app/_components/signin-form";

export default function SignInPage() {
    return (
        <main className="flex min-h-screen">
            <div className={`relative hidden md:block w-full mt-16 mb-2`}>
                <Image src={`/food-bg.jpg`} alt={`Food Background`} className={`w-full object-cover rounded-xl ml-2`}
                       layout={`fill`}/>
            </div>
            <div className={`w-full flex flex-col p-8 items-center justify-center`}>
                <h1 className={`font-bold text-2xl mb-4`}>Sign In Page</h1>
                <p className={`text-center text-sm mb-8`}>
                    Welcome back! Sign in to your account to continue.
                </p>
                <SigninForm/>
                <p
                    className={`text-center text-sm mt-4`}
                >
                    {"Don't"} have an account? <Link href={`/auth/signup`}
                                                     className={`text-secondary link`}>Sign-Up</Link>
                </p>
            </div>
        </main>
    )
}