import Link from "next/link";

const plans = [
  {
    name: "Starter",
    price: "0",
    description: "For small teams getting started",
    features: [
      "Up to 5 team members",
      "1 workspace",
      "Basic analytics",
      "Community support",
      "1 GB storage",
    ],
    cta: "Join waitlist",
    href: "#waitlist",
    featured: false,
  },
  {
    name: "Pro",
    price: "29",
    description: "For growing teams that need more",
    features: [
      "Unlimited team members",
      "5 workspaces",
      "Advanced analytics & events",
      "Priority support",
      "50 GB storage",
      "Custom branding",
      "API access",
    ],
    cta: "Join waitlist",
    href: "#waitlist",
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For organizations at scale",
    features: [
      "Unlimited everything",
      "SSO / SAML",
      "Audit logs",
      "Dedicated support",
      "SLA guarantee",
      "Custom integrations",
      "On-premise option",
    ],
    cta: "Contact sales",
    href: "mailto:sales@guardis.eu",
    featured: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Pricing
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-gray-600">
            Start free. Upgrade when you&apos;re ready. No surprises.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-2xl border p-8 ${
                plan.featured
                  ? "border-blue-600 bg-white shadow-xl shadow-blue-600/10 ring-1 ring-blue-600"
                  : "border-gray-200 bg-white shadow-sm"
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-blue-600 px-4 py-1 text-xs font-semibold text-white shadow-sm">
                    Most popular
                  </span>
                </div>
              )}

              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {plan.name}
                </h3>
                <p className="mt-1 text-sm text-gray-500">{plan.description}</p>
                <div className="mt-5 flex items-baseline">
                  {plan.price === "Custom" ? (
                    <span className="text-4xl font-bold text-gray-900">
                      Custom
                    </span>
                  ) : (
                    <>
                      <span className="text-4xl font-bold text-gray-900">
                        ${plan.price}
                      </span>
                      <span className="ml-1 text-sm text-gray-500">
                        /member/mo
                      </span>
                    </>
                  )}
                </div>
              </div>

              <ul className="mt-8 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <svg
                      className={`mt-0.5 h-4 w-4 flex-shrink-0 ${
                        plan.featured ? "text-blue-600" : "text-gray-400"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-sm text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={plan.href}
                className={`mt-8 block rounded-full py-3 text-center text-sm font-semibold transition-all ${
                  plan.featured
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700"
                    : "border border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:shadow-sm"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
