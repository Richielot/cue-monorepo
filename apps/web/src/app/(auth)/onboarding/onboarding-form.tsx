"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function OnboardingForm({ userEmail }: { userEmail: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const orgName = formData.get("orgName") as string;
    const slug = formData.get("slug") as string;

    try {
      const res = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orgName, slug, userEmail }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Something went wrong");
      }

      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  function slugify(value: string) {
    return value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <div>
        <label
          htmlFor="orgName"
          className="block text-sm font-medium text-gray-700"
        >
          Organization name
        </label>
        <input
          id="orgName"
          name="orgName"
          type="text"
          required
          className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Acme Inc."
          onChange={(e) => {
            const slugInput = document.getElementById(
              "slug",
            ) as HTMLInputElement;
            if (slugInput) {
              slugInput.value = slugify(e.target.value);
            }
          }}
        />
      </div>

      <div>
        <label
          htmlFor="slug"
          className="block text-sm font-medium text-gray-700"
        >
          Workspace URL
        </label>
        <div className="mt-1 flex rounded-lg border border-gray-300 shadow-sm focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
          <span className="inline-flex items-center rounded-l-lg bg-gray-50 px-3 text-sm text-gray-500 border-r border-gray-300">
            cue.com/
          </span>
          <input
            id="slug"
            name="slug"
            type="text"
            required
            pattern="[a-z0-9][a-z0-9\-]*[a-z0-9]"
            title="Only lowercase letters, numbers, and hyphens (e.g. my-company)"
            className="block w-full rounded-r-lg px-3 py-2 text-sm focus:outline-none"
            placeholder="acme"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
      >
        {loading ? "Creating..." : "Create workspace"}
      </button>
    </form>
  );
}
