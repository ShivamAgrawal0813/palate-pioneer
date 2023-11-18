"use client";
import { signOut } from "next-auth/react";
import { useState } from "react";

export default function SignOutPage() {
  const [loading, setLoading] = useState(false);

  return (
    <div
      className={`flex min-h-screen flex-col items-center justify-center font-semibold`}
    >
      <p>Are you sure you want to sign out?</p>
      <button
        disabled={loading}
        className={`btn btn-primary mt-4 w-full max-w-sm`}
        onClick={async () => {
          setLoading(true);
          await signOut({
            callbackUrl: "/",
          });
        }}
      >
        Sign Out
      </button>
    </div>
  );
}
