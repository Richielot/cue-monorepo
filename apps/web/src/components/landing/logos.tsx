export function Logos() {
  const companies = [
    "Vercel",
    "Stripe",
    "Linear",
    "Notion",
    "Figma",
    "Raycast",
  ];

  return (
    <section className="border-y border-gray-100 bg-gray-50/50 py-12">
      <div className="mx-auto max-w-6xl px-6">
        <p className="mb-8 text-center text-sm font-medium text-gray-400 uppercase tracking-wider">
          Trusted by teams at
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {companies.map((name) => (
            <span
              key={name}
              className="text-lg font-semibold text-gray-300 transition-colors hover:text-gray-400"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
