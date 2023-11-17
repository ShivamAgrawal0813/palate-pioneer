"use client";
import {signOut} from "next-auth/react";
import {useState} from "react";

export default function SignOutPage(){

    const [loading, setLoading] = useState(false);

    return(
        <div className={`flex font-semibold flex-col min-h-screen items-center justify-center`}>
            <p>
                Are you sure you want to sign out?
            </p>
            <button disabled={loading} className={`btn btn-primary w-full max-w-sm mt-4`} onClick={
                async () =>{
                    setLoading(true);
                    await signOut({
                        callbackUrl: "/"
                    });
                }
            }>
                Sign Out
            </button>
        </div>
    )
}