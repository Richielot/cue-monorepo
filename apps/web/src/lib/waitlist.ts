import { z } from "zod";

/**
 * Validation for the public waitlist form.
 * Deliberately minimal to reduce friction. GDPR: we store only what we need.
 */
export const waitlistSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Invalid email address")
    .max(254, "Email is too long"),
  companyName: z
    .string()
    .trim()
    .max(120, "Company name is too long")
    .optional()
    .transform((v) => (v && v.length > 0 ? v : undefined)),
  locale: z.enum(["sk", "cs", "pl", "en"]).default("sk"),
  source: z
    .enum(["landing", "pricing", "hero", "footer", "referral", "other"])
    .default("landing"),
  // Honeypot — bots fill hidden fields; real users don't
  website: z.string().max(0).optional(),
});

export type WaitlistInput = z.infer<typeof waitlistSchema>;

/**
 * Stable per-day IP hash. We never store raw IPs.
 * Salt rotates daily so we can rate-limit but can't back-reference.
 */
export async function hashIp(ip: string): Promise<string> {
  const day = new Date().toISOString().slice(0, 10);
  const salt = process.env.WAITLIST_IP_SALT ?? "guardis-waitlist-v1";
  const encoder = new TextEncoder();
  const data = encoder.encode(`${day}|${salt}|${ip}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}
