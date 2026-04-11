"use client";

import { useState } from "react";

export function OrgForm({
  tenantId,
  name,
  slug,
  isOwner,
}: {
  tenantId: string;
  name: string;
  slug: string;
  isOwner: boolean;
}) {
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    const fd = new FormData(e.currentTarget);
    const res = await fetch("/api/settings/org", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tenantId, name: fd.get("orgName") }),
    });

    if (res.ok) {
      setMessage({ text: "Organization updated", type: "success" });
    } else {
      const data = await res.json();
      setMessage({
        text: data.error ?? "Failed to update",
        type: "error",
      });
    }
    setSaving(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-gray-200/80 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-50">
          <svg
            className="h-5 w-5 text-violet-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3H21m-3.75 3H21"
            />
          </svg>
        </div>
        <div>
          <h2 className="text-base font-semibold text-gray-900">
            Organization
          </h2>
          <p className="mt-0.5 text-sm text-gray-500">
            Workspace settings{!isOwner && " (view only)"}
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <div>
          <label
            htmlFor="org-name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            id="org-name"
            name="orgName"
            type="text"
            defaultValue={name}
            disabled={!isOwner}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
          />
        </div>

        <div>
          <label
            htmlFor="org-slug"
            className="block text-sm font-medium text-gray-700"
          >
            Workspace URL
          </label>
          <div className="mt-1 flex items-center gap-2">
            <span className="inline-flex items-center rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-400">
              cue.com/
            </span>
            <span className="inline-flex items-center rounded-lg bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700">
              {slug}
            </span>
          </div>
          <p className="mt-1.5 text-xs text-gray-400">
            Slug cannot be changed after creation
          </p>
        </div>
      </div>

      {isOwner && (
        <div className="mt-6 flex items-center gap-3">
          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save changes"}
          </button>
          {message && (
            <span
              className={`rounded-md px-2 py-1 text-sm ${
                message.type === "success"
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-red-50 text-red-700"
              }`}
            >
              {message.text}
            </span>
          )}
        </div>
      )}
    </form>
  );
}
