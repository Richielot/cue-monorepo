import Link from "next/link";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-32">
      {/* Background gradient */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 right-0 h-[500px] w-[500px] rounded-full bg-blue-100 opacity-40 blur-3xl" />
        <div className="absolute top-20 -left-40 h-[400px] w-[400px] rounded-full bg-violet-100 opacity-30 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-6 text-center">
        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-700">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500" />
          </span>
          Early access — NIS2 deadline Oct 2024 is already active
        </div>

        {/* Headline */}
        <h1 className="mx-auto max-w-4xl text-5xl font-bold leading-[1.1] tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
          NIS2 compliance,{" "}
          <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
            without the consultants
          </span>
        </h1>

        {/* Subheadline */}
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-600 sm:text-xl">
          GUARDIS helps CEE SMEs in Slovakia, Czechia, and Poland run NIS2
          assessments, report incidents on time, and generate audit-ready
          reports — in your language, hosted in the EU.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="#waitlist"
            className="group relative inline-flex items-center justify-center rounded-full bg-gray-900 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-gray-900/20 transition-all hover:bg-gray-800 hover:shadow-xl hover:shadow-gray-900/30"
          >
            Join the waitlist
            <svg
              aria-hidden="true"
              className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
          <a
            href="#how-it-works"
            className="inline-flex items-center justify-center rounded-full border border-gray-200 bg-white px-8 py-3.5 text-sm font-semibold text-gray-700 shadow-sm transition-all hover:border-gray-300 hover:shadow-md"
          >
            See how it works
          </a>
        </div>

        {/* Hero visual */}
        <div className="relative mx-auto mt-16 max-w-5xl">
          <div className="rounded-xl border border-gray-200 bg-white p-2 shadow-2xl shadow-gray-900/10 ring-1 ring-gray-900/5">
            <div className="overflow-hidden rounded-lg bg-gray-50">
              {/* Mock dashboard */}
              <div className="flex h-[340px] sm:h-[420px] lg:h-[500px]">
                {/* Sidebar mock */}
                <div className="hidden w-52 border-r border-gray-200 bg-white p-4 sm:block">
                  <div className="mb-6 flex items-center gap-2">
                    <div className="h-7 w-7 rounded-lg bg-blue-600" />
                    <div className="h-4 w-16 rounded bg-gray-200" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-8 w-full rounded-lg bg-blue-50" />
                    <div className="h-8 w-full rounded-lg bg-transparent" />
                    <div className="h-8 w-full rounded-lg bg-transparent" />
                    <div className="h-8 w-full rounded-lg bg-transparent" />
                  </div>
                  <div className="mt-8 space-y-2">
                    <div className="h-3 w-20 rounded bg-gray-100" />
                    <div className="h-8 w-full rounded-lg bg-transparent" />
                    <div className="h-8 w-full rounded-lg bg-transparent" />
                  </div>
                </div>
                {/* Main content mock */}
                <div className="flex-1 p-6">
                  <div className="mb-6 flex items-center justify-between">
                    <div className="h-6 w-32 rounded bg-gray-200" />
                    <div className="flex gap-2">
                      <div className="h-8 w-8 rounded-lg bg-gray-100" />
                      <div className="h-8 w-8 rounded-lg bg-gray-100" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    {/* Stat cards */}
                    {[
                      { color: "bg-blue-500", label: "w-16", value: "w-10" },
                      { color: "bg-emerald-500", label: "w-20", value: "w-8" },
                      { color: "bg-violet-500", label: "w-14", value: "w-12" },
                    ].map((card, i) => (
                      <div
                        key={i}
                        className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm"
                      >
                        <div
                          className={`mb-3 h-2 ${card.label} rounded-full bg-gray-200`}
                        />
                        <div
                          className={`mb-1 h-7 ${card.value} rounded bg-gray-900`}
                        />
                        <div className="flex items-center gap-1 mt-2">
                          <div
                            className={`h-1.5 w-1.5 rounded-full ${card.color}`}
                          />
                          <div className="h-2 w-12 rounded bg-gray-100" />
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Chart mock */}
                  <div className="mt-6 rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
                    <div className="mb-4 h-4 w-24 rounded bg-gray-200" />
                    <div className="flex items-end gap-2 h-32">
                      {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map(
                        (h, i) => (
                          <div
                            key={i}
                            className="flex-1 rounded-t bg-gradient-to-t from-blue-500 to-blue-400 opacity-80"
                            style={{ height: `${h}%` }}
                          />
                        ),
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Glow under the visual */}
          <div className="pointer-events-none absolute -inset-x-20 -bottom-20 h-40 bg-gradient-to-t from-white via-white to-transparent" />
        </div>
      </div>
    </section>
  );
}
