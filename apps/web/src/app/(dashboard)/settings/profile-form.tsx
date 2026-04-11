"use client";

import { useState } from "react";

const avatarColors = [
  "from-blue-500 to-blue-600",
  "from-emerald-500 to-emerald-600",
  "from-violet-500 to-violet-600",
  "from-amber-500 to-amber-600",
  "from-rose-500 to-rose-600",
];

function getAvatarColor(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return avatarColors[Math.abs(hash) % avatarColors.length];
}

export function ProfileForm({
  userId,
  name,
  email,
}: {
  userId: string;
  name: string;
  email: string;
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
    const res = await fetch("/api/settings/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, name: fd.get("name") }),
    });

    if (res.ok) {
      setMessage({ text: "Profile updated", type: "success" });
    } else {
      const data = await res.json();
      setMessage({
        text: data.error ?? "Failed to update",
        type: "error",
      });
    }
    setSaving(false);
  }

  const initial = (name?.[0] ?? email[0]).toUpperCase();

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-gray-200/80 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="flex items-start gap-4">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br text-lg font-semibold text-white ${getAvatarColor(email)}`}
        >
          {initial}
        </div>
        <div>
          <h2 className="text-base font-semibold text-gray-900">Profile</h2>
          <p className="mt-0.5 text-sm text-gray-500">
            Your personal information
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <div>
          <label
            htmlFor="profile-name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            id="profile-name"
            name="name"
            type="text"
            defaultValue={name}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="profile-email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <div className="relative mt-1">
            <input
              id="profile-email"
              type="email"
              value={email}
              disabled
              className="block w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 pr-9 text-sm text-gray-500"
            />
            <svg
              className="absolute right-3 top-2.5 h-4 w-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
              />
            </svg>
          </div>
          <p className="mt-1 text-xs text-gray-400">
            Email is tied to your auth account
          </p>
        </div>
      </div>

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
    </form>
  );
}
