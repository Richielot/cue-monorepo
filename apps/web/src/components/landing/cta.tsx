import Link from "next/link";

export function CTA() {
  return (
    <section className="relative overflow-hidden bg-gray-900 py-24 lg:py-32">
      {/* Background accents */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-blue-600 opacity-10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-violet-600 opacity-10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
          Ready to bring your team together?
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-gray-400">
          Join thousands of teams using Cue to ship faster, collaborate better,
          and stay in control.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/signup"
            className="group inline-flex items-center rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-gray-900 shadow-lg transition-all hover:bg-gray-100"
          >
            Get started for free
            <svg
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
            href="#"
            className="inline-flex items-center rounded-full border border-gray-700 px-8 py-3.5 text-sm font-semibold text-gray-300 transition-all hover:border-gray-600 hover:text-white"
          >
            Talk to sales
          </a>
        </div>
      </div>
    </section>
  );
}
