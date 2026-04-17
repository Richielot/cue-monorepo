import { WaitlistForm } from "./waitlist-form";

type Props = {
  locale?: "sk" | "cs" | "pl" | "en";
};

export function WaitlistSection({ locale = "sk" }: Props) {
  return (
    <section
      id="waitlist"
      className="relative overflow-hidden bg-gray-900 py-24 lg:py-32"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-blue-600 opacity-10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-violet-600 opacity-10 blur-3xl" />
      </div>

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-400">
            Early access
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Get NIS2-ready before the audits land
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-gray-400">
            GUARDIS is the NIS2 compliance platform for CEE SMEs. Automated
            assessments, incident reporting, and audit-ready reports — in Slovak,
            Czech, and Polish.
          </p>
          <ul className="mt-8 space-y-3 text-sm text-gray-300">
            <li className="flex items-start gap-3">
              <CheckDot />
              NIS2 Annex I questionnaire with per-control risk scoring
            </li>
            <li className="flex items-start gap-3">
              <CheckDot />
              24h / 72h / 1-month incident notification workflow
            </li>
            <li className="flex items-start gap-3">
              <CheckDot />
              Audit-ready PDF exports & evidence vault
            </li>
            <li className="flex items-start gap-3">
              <CheckDot />
              EU-hosted (Frankfurt) with row-level multi-tenant isolation
            </li>
          </ul>
        </div>

        <div className="rounded-2xl border border-gray-800 bg-gray-900/80 p-6 shadow-2xl backdrop-blur sm:p-8">
          <h3 className="text-xl font-semibold text-white">Join the waitlist</h3>
          <p className="mt-2 text-sm text-gray-400">
            Be first to get a beta invite. We onboard in cohorts — your spot is
            reserved by signup order.
          </p>
          <div className="mt-6">
            <WaitlistForm source="landing" locale={locale} variant="dark" />
          </div>
        </div>
      </div>
    </section>
  );
}

function CheckDot() {
  return (
    <span
      aria-hidden="true"
      className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-600/20 text-blue-400"
    >
      <svg
        className="h-3 w-3"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={3}
          d="M5 13l4 4L19 7"
        />
      </svg>
    </span>
  );
}
