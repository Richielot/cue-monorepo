"use client";

import { useState } from "react";

type Props = {
  source?: "landing" | "pricing" | "hero" | "footer";
  locale?: "sk" | "cs" | "pl" | "en";
  variant?: "light" | "dark";
};

type Status = "idle" | "submitting" | "success" | "error";

export function WaitlistForm({
  source = "landing",
  locale = "sk",
  variant = "light",
}: Props) {
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setMessage(null);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          companyName,
          locale,
          source,
          website,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus("error");
        setMessage(data?.error ?? "Something went wrong");
        return;
      }
      setStatus("success");
      setMessage(
        data?.alreadyRegistered
          ? "You're already on the list — we'll be in touch."
          : "You're on the list. We'll email you when early access opens.",
      );
      setEmail("");
      setCompanyName("");
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  const isDark = variant === "dark";
  const inputClass = isDark
    ? "w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
    : "w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20";
  const labelClass = isDark
    ? "block text-sm font-medium text-gray-300 mb-1.5"
    : "block text-sm font-medium text-gray-700 mb-1.5";

  if (status === "success") {
    return (
      <div
        className={`rounded-xl p-6 text-center ${
          isDark
            ? "bg-emerald-900/30 border border-emerald-800"
            : "bg-emerald-50 border border-emerald-200"
        }`}
      >
        <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600 text-white">
          <svg
            aria-hidden="true"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <p
          className={`text-sm font-medium ${
            isDark ? "text-emerald-300" : "text-emerald-800"
          }`}
        >
          {message}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div>
        <label htmlFor="wl-email" className={labelClass}>
          Work email
        </label>
        <input
          id="wl-email"
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.eu"
          className={inputClass}
          disabled={status === "submitting"}
        />
      </div>

      <div>
        <label htmlFor="wl-company" className={labelClass}>
          Company <span className="text-gray-500">(optional)</span>
        </label>
        <input
          id="wl-company"
          type="text"
          autoComplete="organization"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder="Acme s.r.o."
          className={inputClass}
          disabled={status === "submitting"}
        />
      </div>

      {/* Honeypot — hidden from real users */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "-9999px",
          width: "1px",
          height: "1px",
          overflow: "hidden",
        }}
      >
        <label htmlFor="wl-website">Website</label>
        <input
          id="wl-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className={`inline-flex w-full items-center justify-center rounded-full py-3 text-sm font-semibold shadow-lg transition-all disabled:opacity-60 ${
          isDark
            ? "bg-white text-gray-900 hover:bg-gray-100"
            : "bg-blue-600 text-white shadow-blue-600/20 hover:bg-blue-700"
        }`}
      >
        {status === "submitting" ? "Adding you…" : "Join the waitlist"}
      </button>

      {status === "error" && message && (
        <p
          className={`text-sm ${
            isDark ? "text-red-400" : "text-red-600"
          }`}
          role="alert"
        >
          {message}
        </p>
      )}

      <p
        className={`text-xs ${isDark ? "text-gray-500" : "text-gray-500"}`}
      >
        We only use your email to send early-access updates. No marketing spam.
      </p>
    </form>
  );
}
