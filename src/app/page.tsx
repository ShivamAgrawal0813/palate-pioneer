import { getServerAuthSession } from "~/server/auth";
import Link from "next/link";

export default async function Home() {
  const session = await getServerAuthSession();

  return (
      <main className="flex flex-col min-h-screen items-center justify-center">
        <h1 className={`mb-2`}>
          Hello, {session?.user?.name ?? "world"}!{" "}
        </h1>
      </main>
  );
}
