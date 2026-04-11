import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { db, eq, users } from "@cue/db";
import Link from "next/link";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();

  if (!authUser) redirect("/login");

  const currentUser = await db.query.users.findFirst({
    where: eq(users.authId, authUser.id),
  });

  const firstName = currentUser?.name?.split(" ")[0] ?? "there";

  const stats = [
    {
      label: "Total Users",
      value: "—",
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-1.997M18 8.25a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM9.75 9.75a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
        </svg>
      ),
      color: "bg-blue-50 text-blue-600",
    },
    {
      label: "Active Sessions",
      value: "—",
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
        </svg>
      ),
      color: "bg-emerald-50 text-emerald-600",
    },
    {
      label: "Events Today",
      value: "—",
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
        </svg>
      ),
      color: "bg-violet-50 text-violet-600",
    },
  ];

  const quickActions = [
    {
      title: "Invite a team member",
      description: "Grow your workspace by adding collaborators",
      href: "/settings",
      color: "border-l-blue-500",
    },
    {
      title: "Update your profile",
      description: "Add your name and customize your account",
      href: "/settings",
      color: "border-l-emerald-500",
    },
    {
      title: "Explore settings",
      description: "Configure your workspace preferences",
      href: "/settings",
      color: "border-l-violet-500",
    },
  ];

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      {/* Welcome section */}
      <div className="relative overflow-hidden rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200/60">
        {/* Subtle background accents */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-100/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-violet-100/30 blur-3xl" />

        <div className="relative">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Welcome back,{" "}
            <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
              {firstName}
            </span>
          </h1>
          <p className="mt-2 text-gray-500">
            Here&apos;s what&apos;s happening with your workspace
          </p>
        </div>
      </div>

      {/* Stat cards */}
      <div>
        <p className="mb-4 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
          Overview
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="group rounded-xl border border-gray-200/80 bg-white p-6 shadow-sm transition-all duration-200 hover:border-gray-300 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.color}`}>
                  {stat.icon}
                </div>
              </div>
              <p className="mt-3 text-3xl font-bold text-gray-900">{stat.value}</p>
              <p className="mt-1 text-xs text-gray-400">No data yet</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick actions */}
      <div>
        <p className="mb-4 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
          Quick actions
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {quickActions.map((action) => (
            <Link
              key={action.title}
              href={action.href}
              className={`group rounded-xl border border-gray-200/80 border-l-[3px] ${action.color} bg-white p-5 shadow-sm transition-all duration-200 hover:border-gray-300 hover:shadow-md`}
            >
              <h3 className="text-sm font-semibold text-gray-900">{action.title}</h3>
              <p className="mt-1 text-xs text-gray-500">{action.description}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-blue-600">
                Get started
                <svg className="h-3 w-3 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Getting started */}
      <div>
        <p className="mb-4 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
          Getting started
        </p>
        <div className="rounded-xl border border-gray-200/80 bg-white shadow-sm">
          {[
            { step: 1, title: "Create your workspace", done: true },
            { step: 2, title: "Invite your team", done: false },
            { step: 3, title: "Ship with confidence", done: false },
          ].map((item, i) => (
            <div
              key={item.step}
              className={`flex items-center gap-4 px-6 py-4 ${i < 2 ? "border-b border-gray-100" : ""}`}
            >
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${
                  item.done
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-gray-100 text-gray-400"
                }`}
              >
                {item.done ? (
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  item.step
                )}
              </div>
              <span className={`text-sm font-medium ${item.done ? "text-gray-400 line-through" : "text-gray-700"}`}>
                {item.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
