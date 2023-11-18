"use client";
import bcrypt from "bcryptjs";
import { api } from "~/trpc/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const salt = bcrypt.genSaltSync(10);

export default function SignupForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const createUser = api.user.create.useMutation({
    onSuccess: () => {
      setIsLoading(false);
      router.push("/auth/signin");
    },
  });

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    const target = event.target as typeof event.target & {
      name: { value: string };
      email: { value: string };
      password: { value: string };
    };

    const name = target.name.value;
    const email = target.email.value;
    const password = target.password.value;
    const hashedPassword = bcrypt.hashSync(password, salt);

    try {
      await createUser.mutateAsync({ name, email, password: hashedPassword });
    } catch (error) {
      setIsLoading(false);
    }
  }

  return (
    <form
      className={`flex w-full flex-col items-center justify-center space-y-4`}
      onSubmit={onSubmit}
    >
      <input
        id={`name`}
        name={`name`}
        className={`input input-bordered w-full max-w-md`}
        placeholder={`Name`}
        type={`text`}
      />
      <input
        id={`email`}
        name={`email`}
        className={`input input-bordered w-full max-w-md`}
        placeholder={`Email`}
        type={`email`}
      />
      <input
        id={`password`}
        name={`password`}
        className={`input input-bordered w-full max-w-md`}
        placeholder={`Password`}
        type={`password`}
      />
      <input
        id={`confirm-password`}
        name={`confirm-password`}
        className={`input input-bordered w-full max-w-md`}
        placeholder={`Confirm Password`}
        type={`password`}
      />
      <button
        type={`submit`}
        className={`btn btn-primary w-full max-w-md`}
        disabled={isLoading}
      >
        Sign Up
      </button>
    </form>
  );
}
