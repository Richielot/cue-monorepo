"use client";

import { useState } from "react";

interface Member {
  id: string;
  name: string | null;
  email: string;
  role: "owner" | "admin" | "member";
}

const roleBadgeColors: Record<string, string> = {
  owner: "bg-blue-50 text-blue-700",
  admin: "bg-violet-50 text-violet-700",
  member: "bg-gray-100 text-gray-600",
};

const avatarColors = [
  "from-blue-500 to-blue-600",
  "from-emerald-500 to-emerald-600",
  "from-violet-500 to-violet-600",
  "from-amber-500 to-amber-600",
  "from-rose-500 to-rose-600",
  "from-cyan-500 to-cyan-600",
];

function getColor(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return avatarColors[Math.abs(hash) % avatarColors.length];
}

export function MembersList({
  members,
  currentUserId,
  isAdmin,
}: {
  members: Member[];
  currentUserId: string;
  isAdmin: boolean;
}) {
  const [showInvite, setShowInvite] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviting, setInviting] = useState(false);
  const [inviteMessage, setInviteMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);

  async function handleInvite(e: React.FormEvent) {
    e.preventDefault();
    setInviting(true);
    setInviteMessage(null);

    const res = await fetch("/api/members", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: inviteEmail }),
    });

    if (res.ok) {
      setInviteMessage({ text: "Invite sent", type: "success" });
      setInviteEmail("");
      setShowInvite(false);
    } else {
      const data = await res.json();
      setInviteMessage({
        text: data.error ?? "Failed to invite",
        type: "error",
      });
    }
    setInviting(false);
  }

  return (
    <div className="rounded-xl border border-gray-200/80 bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-center justify-between p-6 pb-4">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50">
            <svg
              className="h-5 w-5 text-amber-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
              />
            </svg>
          </div>
          <div>
            <h2 className="text-base font-semibold text-gray-900">Members</h2>
            <p className="mt-0.5 text-sm text-gray-500">
              {members.length} member{members.length !== 1 ? "s" : ""} in this
              workspace
            </p>
          </div>
        </div>
        {isAdmin && (
          <button
            type="button"
            onClick={() => setShowInvite(!showInvite)}
            className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3.5 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Invite
          </button>
        )}
      </div>

      {/* Invite form */}
      {showInvite && (
        <div className="mx-6 mb-4 rounded-lg border border-blue-100 bg-blue-50/50 p-4">
          <form onSubmit={handleInvite} className="flex gap-2">
            <input
              type="email"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              placeholder="colleague@company.com"
              required
              className="flex-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <button
              type="submit"
              disabled={inviting}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700 disabled:opacity-50"
            >
              {inviting ? "Sending..." : "Send invite"}
            </button>
          </form>
          {inviteMessage && (
            <p
              className={`mt-2 text-sm ${
                inviteMessage.type === "success"
                  ? "text-emerald-700"
                  : "text-red-600"
              }`}
            >
              {inviteMessage.text}
            </p>
          )}
        </div>
      )}

      {/* Members list */}
      <div className="divide-y divide-gray-100">
        {members.map((member) => (
          <div
            key={member.id}
            className="flex items-center gap-3 px-6 py-4 transition-colors hover:bg-gray-50/50"
          >
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br text-sm font-semibold text-white ${getColor(member.email)}`}
            >
              {(member.name?.[0] ?? member.email[0]).toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-gray-900">
                {member.name ?? member.email}
                {member.id === currentUserId && (
                  <span className="ml-1.5 text-xs text-gray-400">(you)</span>
                )}
              </p>
              <p className="truncate text-xs text-gray-500">{member.email}</p>
            </div>
            <span
              className={`rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${roleBadgeColors[member.role]}`}
            >
              {member.role}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
