"use client";

import { startTransition, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function TaskErrorPage({ error, reset }: ErrorProps) {
  const router = useRouter();
  function handleReset() {
    startTransition(() => {
      // calling order does not matter
      reset();
      router.refresh();
    });
  }

  useEffect(() => {
    console.error("Tasks page error:", error);
    // Optionally report to a monitoring service (e.g. Sentry)
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-6">
      <h1 className="text-3xl font-bold text-red-600 mb-4">
        Uh‑oh — tasks couldn’t be loaded!
      </h1>
      <p className="text-sm mb-6 text-gray-600">
        {process.env.NODE_ENV === "development"
          ? error.message
          : "An unexpected error occurred while loading or updating your tasks."}
      </p>
      {error.digest && (
        <p className="text-xs mb-4 text-gray-400">
          Error ID: <code>{error.digest}</code>
        </p>
      )}
      <div className="flex items-center gap-4">
        <button
          onClick={() => {
            handleReset();
          }}
          className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
        >
          Try Again
        </button>
        <Link
          href="/"
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
