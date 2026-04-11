"use client";

import Link from "next/link";

export default function AuthError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-tight">Something went wrong</h1>
          <p className="mt-2 text-sm text-gray-600">
            We encountered an error during authentication.
          </p>
        </div>
        {process.env.NODE_ENV === "development" && error.message && (
          <div className="rounded-lg bg-red-50 p-3 text-xs text-red-700 overflow-auto">
            {error.message}
          </div>
        )}
        <div className="space-y-3">
          <button
            onClick={reset}
            className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Try again
          </button>
          <Link
            href="/"
            className="block rounded-lg border border-gray-300 px-4 py-2 text-center text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Go to home
          </Link>
        </div>
      </div>
    </div>
  );
}
