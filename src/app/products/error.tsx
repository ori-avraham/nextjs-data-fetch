"use client";

import { useEffect } from "react";
import Link from "next/link";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ProductErrorPage({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Product page error:", error);
    // Optionally report to Sentry or another monitoring tool
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-6">
      <h1 className="text-3xl font-bold text-red-600 mb-4">
        Oops… Unable to load products.
      </h1>
      <p className="text-sm mb-6 text-gray-600">
        {process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong while fetching the product catalog."}
      </p>
      {error.digest && (
        <p className="text-xs mb-4 text-gray-400">
          Error ID: <code>{error.digest}</code>
        </p>
      )}
      <div className="flex gap-4">
        <button
          onClick={() => reset()}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
        >
          Retry
        </button>
        <Link href="/">
          <a className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">
            Go Home
          </a>
        </Link>
      </div>
    </div>
  );
}
