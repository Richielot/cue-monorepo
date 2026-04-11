-- Migration: 0000_initial
-- Creates core multi-tenant schema

-- Custom enum
CREATE TYPE "user_role" AS ENUM ('owner', 'admin', 'member');

-- Tenants table
CREATE TABLE IF NOT EXISTS "tenants" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "name" text NOT NULL,
  "slug" text NOT NULL UNIQUE,
  "created_at" timestamptz NOT NULL DEFAULT now(),
  "updated_at" timestamptz NOT NULL DEFAULT now()
);

-- Users table
CREATE TABLE IF NOT EXISTS "users" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "auth_id" text NOT NULL UNIQUE,
  "email" text NOT NULL,
  "name" text,
  "role" "user_role" NOT NULL DEFAULT 'member',
  "tenant_id" uuid NOT NULL REFERENCES "tenants"("id") ON DELETE CASCADE,
  "created_at" timestamptz NOT NULL DEFAULT now(),
  "updated_at" timestamptz NOT NULL DEFAULT now()
);

-- Indexes
CREATE INDEX "users_tenant_id_idx" ON "users" ("tenant_id");
CREATE INDEX "users_auth_id_idx" ON "users" ("auth_id");
CREATE INDEX "tenants_slug_idx" ON "tenants" ("slug");

-- Updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tenants_updated_at
  BEFORE UPDATE ON "tenants"
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER users_updated_at
  BEFORE UPDATE ON "users"
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
