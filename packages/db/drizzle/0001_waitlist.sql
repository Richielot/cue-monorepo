-- Migration: 0001_waitlist
-- Adds waitlist table for Path C soft-launch lead capture

-- Enums
DO $$ BEGIN
  CREATE TYPE "waitlist_locale" AS ENUM ('sk', 'cs', 'pl', 'en');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE TYPE "waitlist_source" AS ENUM ('landing', 'pricing', 'hero', 'footer', 'referral', 'other');
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- Waitlist table
CREATE TABLE IF NOT EXISTS "waitlist" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "email" text NOT NULL UNIQUE,
  "company_name" text,
  "locale" "waitlist_locale" NOT NULL DEFAULT 'sk',
  "source" "waitlist_source" NOT NULL DEFAULT 'landing',
  "ip_hash" text,
  "user_agent" text,
  "confirmed_at" timestamptz,
  "created_at" timestamptz NOT NULL DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS "waitlist_created_at_idx" ON "waitlist" ("created_at" DESC);
CREATE INDEX IF NOT EXISTS "waitlist_locale_idx" ON "waitlist" ("locale");

-- Row Level Security: no client can read/write directly.
-- Only the service role (used by the /api/waitlist route handler) can insert.
ALTER TABLE "waitlist" ENABLE ROW LEVEL SECURITY;

-- Block all access by default. service_role bypasses RLS.
CREATE POLICY "waitlist_no_public_access" ON "waitlist"
  FOR ALL
  TO anon, authenticated
  USING (false)
  WITH CHECK (false);
