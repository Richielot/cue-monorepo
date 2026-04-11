"use client";

import Link from "next/link";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50/50">
      <div className="max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900">
          Something went wrong
        </h1>
        <p className="mt-3 text-sm text-gray-600">
          We encountered an error loading the dashboard. Please try again.
        </p>
        {process.env.NODE_ENV === "development" && error.message && (
          <pre className="mt-4 rounded-lg bg-gray-50 p-2 text-xs text-gray-700 overflow-auto">
            {error.message}
          </pre>
        )}
        <div className="mt-6 flex gap-3">
          <button
            onClick={reset}
            className="flex-1 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Try again
          </button>
          <Link
            href="/dashboard"
            className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-center text-sm font-semibold text-gray-700 hover:bg-gray-50"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
