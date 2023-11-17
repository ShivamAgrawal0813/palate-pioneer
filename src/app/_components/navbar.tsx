import Link from "next/link";
import {getServerAuthSession} from "~/server/auth";

export default async function Navbar() {

    const session = await getServerAuthSession();

    return (
        <div className="navbar absolute z-20 p-4">
            <div className={`bg-base-200 w-full rounded-xl flex items-center justify-between`}>
                <Link href={`/`} className="btn btn-ghost font-bold text-lg">Palate Pioneer</Link>
                <ul className={`mr-2 flex`}>
                    {session && (
                        <>
                            <li>
                                <Link href={`/`} className="btn btn-ghost btn-sm">Home</Link>
                            </li>
                            <li>
                                <Link href={`/`} className="btn btn-ghost btn-sm">About</Link>
                            </li>
                            <li>
                                <Link href={`/`} className="btn btn-ghost btn-sm">Recipes</Link>
                            </li>
                            <li>
                                <Link href={`/`} className="btn btn-ghost btn-sm">Nutrition</Link>
                            </li>
                        </>)}
                    {session ? (
                        <li>
                            <Link href={`/auth/signout`} className="btn btn-primary btn-sm">Sign Out</Link>
                        </li>
                    ) : (
                        <li>
                            <Link href={`/auth/signup`} className="btn btn-primary btn-sm">Sign Up</Link>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    )
}