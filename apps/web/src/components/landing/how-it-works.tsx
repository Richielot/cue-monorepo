const steps = [
  {
    number: "01",
    title: "Create your workspace",
    description:
      "Sign up, name your organization, and pick a URL. Your isolated, secure workspace is ready in seconds.",
    visual: (
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="mb-3 h-4 w-28 rounded bg-gray-100" />
        <div className="space-y-3">
          <div className="h-10 rounded-lg border border-gray-200 bg-gray-50 px-3 flex items-center">
            <span className="text-sm text-gray-400">Acme Inc.</span>
          </div>
          <div className="flex rounded-lg border border-gray-200 bg-gray-50 overflow-hidden">
            <span className="bg-gray-100 px-3 py-2.5 text-sm text-gray-400 border-r border-gray-200">
              cue.com/
            </span>
            <span className="px-3 py-2.5 text-sm text-gray-400">acme</span>
          </div>
          <div className="h-10 rounded-lg bg-gray-900 flex items-center justify-center">
            <span className="text-sm font-medium text-white">
              Create workspace
            </span>
          </div>
        </div>
      </div>
    ),
  },
  {
    number: "02",
    title: "Invite your team",
    description:
      "Send email invites or share a link. Assign roles — owner, admin, or member — and control exactly who sees what.",
    visual: (
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <div className="h-4 w-20 rounded bg-gray-100" />
          <div className="h-7 w-16 rounded-full bg-blue-50 flex items-center justify-center">
            <span className="text-xs font-medium text-blue-600">+ Invite</span>
          </div>
        </div>
        <div className="space-y-3">
          {[
            { name: "You", role: "Owner", color: "bg-blue-500" },
            { name: "Sarah K.", role: "Admin", color: "bg-emerald-500" },
            { name: "Mike R.", role: "Member", color: "bg-violet-500" },
          ].map((user) => (
            <div key={user.name} className="flex items-center gap-3">
              <div
                className={`h-8 w-8 rounded-full ${user.color} flex items-center justify-center`}
              >
                <span className="text-xs font-medium text-white">
                  {user.name[0]}
                </span>
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-700">
                  {user.name}
                </div>
              </div>
              <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-500">
                {user.role}
              </span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    number: "03",
    title: "Ship with confidence",
    description:
      "Use the dashboard, analytics, and built-in tools to launch, track, and iterate — all from one place.",
    visual: (
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <div className="h-4 w-24 rounded bg-gray-100" />
          <div className="flex items-center gap-1">
            <div className="h-2 w-2 rounded-full bg-emerald-400" />
            <span className="text-xs font-medium text-emerald-600">Live</span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 mb-4">
          {[
            { value: "2.4k", label: "Users" },
            { value: "98.2%", label: "Uptime" },
            { value: "42ms", label: "Avg resp." },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-lg bg-gray-50 p-2.5 text-center"
            >
              <div className="text-sm font-bold text-gray-900">
                {stat.value}
              </div>
              <div className="text-xs text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
        <div className="flex items-end gap-1 h-16">
          {[30, 50, 40, 70, 55, 80, 65, 90, 75, 95, 85, 92].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-t bg-gradient-to-t from-emerald-500 to-emerald-400"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </div>
    ),
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-gray-50 py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            How it works
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Three steps to launch
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-gray-600">
            No complex onboarding. No waiting. Go live in minutes.
          </p>
        </div>

        {/* Steps */}
        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-8">
          {steps.map((step) => (
            <div key={step.number} className="relative">
              <span className="mb-4 block text-5xl font-black text-gray-100">
                {step.number}
              </span>
              <h3 className="text-xl font-semibold text-gray-900">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-500">
                {step.description}
              </p>
              <div className="mt-6">{step.visual}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
