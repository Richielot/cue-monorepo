import { pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

/**
 * Waitlist — captures early interest during Path C soft-launch.
 *
 * Goals:
 *  - Collect qualified leads (SK/CZ/PL SMEs) before product is fully live
 *  - Respect GDPR: minimal PII, no password, hashed IP for abuse-prevention only
 *  - Allow de-duplication (unique email per locale)
 */
export const waitlistLocale = pgEnum("waitlist_locale", ["sk", "cs", "pl", "en"]);

export const waitlistSource = pgEnum("waitlist_source", [
  "landing",
  "pricing",
  "hero",
  "footer",
  "referral",
  "other",
]);

export const waitlist = pgTable("waitlist", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: text("email").notNull().unique(),
  companyName: text("company_name"),
  locale: waitlistLocale("locale").default("sk").notNull(),
  source: waitlistSource("source").default("landing").notNull(),
  // SHA-256(ip + daily-salt) — lets us rate-limit without storing raw IP
  ipHash: text("ip_hash"),
  userAgent: text("user_agent"),
  // When the user first confirms via double-opt-in email (null until confirmed)
  confirmedAt: timestamp("confirmed_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export type WaitlistEntry = typeof waitlist.$inferSelect;
export type NewWaitlistEntry = typeof waitlist.$inferInsert;
