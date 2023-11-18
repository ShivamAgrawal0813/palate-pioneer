"use client";

import { api } from "~/trpc/react";
import { useState } from "react";

export default function AddToPalateButton({
  text,
  recipeId,
  size,
}: {
  text: string;
  recipeId: number;
  size?: "btn-sm";
}) {
  const addToPalate = api.palate.insertPalate.useMutation();
  const [loadingText, setLoadingText] = useState(text);
  const [loading, setLoading] = useState(false);

  return (
    <button
      className={`btn btn-primary ${size}`}
      disabled={loading}
      onClick={async () => {
        setLoading(true);
        setLoadingText(`Adding to Palate...`);
        await addToPalate.mutateAsync({
          recipeId: recipeId,
        });

        setLoadingText(`Added to Palate!`);
        setTimeout(() => {
          setLoadingText(text);
        }, 2000);
        setLoading(false);
      }}
    >
      {loadingText}
    </button>
  );
}
