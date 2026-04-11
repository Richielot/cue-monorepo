-- =============================================================
-- Row-Level Security Policies for Multi-Tenant Isolation
-- Run this in Supabase SQL Editor after running migrations
-- =============================================================

-- Enable RLS on all tables
ALTER TABLE "tenants" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "users"   ENABLE ROW LEVEL SECURITY;

-- =============================================================
-- Helper: get current user's tenant_id from their auth.uid()
-- =============================================================
CREATE OR REPLACE FUNCTION get_user_tenant_id()
RETURNS uuid
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT tenant_id FROM users WHERE auth_id = auth.uid()::text LIMIT 1;
$$;

-- =============================================================
-- Helper: get current user's role
-- =============================================================
CREATE OR REPLACE FUNCTION get_user_role()
RETURNS user_role
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role FROM users WHERE auth_id = auth.uid()::text LIMIT 1;
$$;

-- =============================================================
-- TENANTS policies
-- =============================================================

-- Users can only read their own tenant
CREATE POLICY "tenants_select_own"
  ON "tenants" FOR SELECT
  USING (id = get_user_tenant_id());

-- Only owners can update their tenant
CREATE POLICY "tenants_update_owner"
  ON "tenants" FOR UPDATE
  USING (id = get_user_tenant_id() AND get_user_role() = 'owner')
  WITH CHECK (id = get_user_tenant_id());

-- Tenants can be inserted during onboarding (service role handles this)
-- No direct INSERT policy needed for authenticated users

-- =============================================================
-- USERS policies
-- =============================================================

-- Users can read all members in their tenant
CREATE POLICY "users_select_same_tenant"
  ON "users" FOR SELECT
  USING (tenant_id = get_user_tenant_id());

-- Users can update their own profile
CREATE POLICY "users_update_self"
  ON "users" FOR UPDATE
  USING (auth_id = auth.uid()::text)
  WITH CHECK (auth_id = auth.uid()::text);

-- Owners and admins can insert users (invite flow)
CREATE POLICY "users_insert_admin"
  ON "users" FOR INSERT
  WITH CHECK (
    tenant_id = get_user_tenant_id()
    AND get_user_role() IN ('owner', 'admin')
  );

-- Only owners can delete users
CREATE POLICY "users_delete_owner"
  ON "users" FOR DELETE
  USING (
    tenant_id = get_user_tenant_id()
    AND get_user_role() = 'owner'
  );

-- =============================================================
-- Service role bypass
-- The supabase service_role key bypasses RLS by default.
-- The onboarding API route uses service_role to create the
-- initial tenant + owner user row.
-- =============================================================
