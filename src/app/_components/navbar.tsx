import Link from "next/link";
import { getServerAuthSession } from "~/server/auth";

export default async function Navbar() {
  const session = await getServerAuthSession();

  return (
    <div className="navbar absolute z-20 p-4">
      <div
        className={`flex w-full items-center justify-between rounded-xl bg-base-200`}
      >
        <Link href={`/`} className="btn btn-ghost text-lg font-bold">
          Palate Pioneer
        </Link>
        <ul className={`mr-2 flex`}>
          {session && (
            <>
              <li>
                <Link
                  href={`/recipe-of-the-day`}
                  className="btn btn-ghost btn-sm"
                >
                  Recipe of the Day
                </Link>
              </li>
              <li>
                <Link href={`/search-recipes`} className="btn btn-ghost btn-sm">
                  Search Recipes
                </Link>
              </li>
              <li>
                <Link href={`/my-palate`} className="btn btn-ghost btn-sm">
                  My Palate
                </Link>
              </li>
            </>
          )}
          {session ? (
            <li className={`ml-2`}>
              <Link href={`/auth/signout`} className="btn btn-primary btn-sm">
                Sign Out
              </Link>
            </li>
          ) : (
            <li className={`ml-2`}>
              <Link href={`/auth/signup`} className="btn btn-primary btn-sm">
                Sign Up
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
