"use client";

import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-white to-gray-50 px-4">
      <div className="max-w-sm text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          Something went wrong
        </h1>
        <p className="mt-4 text-gray-600">
          We encountered an unexpected error. Please try again or go back to the home page.
        </p>
        {process.env.NODE_ENV === "development" && error.message && (
          <pre className="mt-4 rounded-lg bg-gray-100 p-3 text-left text-xs text-gray-700 overflow-auto">
            {error.message}
          </pre>
        )}
        <div className="mt-6 flex gap-3 justify-center">
          <button
            onClick={reset}
            className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Try again
          </button>
          <Link
            href="/"
            className="rounded-lg border border-gray-300 px-6 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}
