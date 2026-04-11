import { describe, expect, it } from "vitest";
import { tenants, userRole, users } from "../schema";

describe("Schema definitions", () => {
  it("tenants table has expected columns", () => {
    const columns = Object.keys(tenants);
    expect(columns).toContain("id");
    expect(columns).toContain("name");
    expect(columns).toContain("slug");
    expect(columns).toContain("createdAt");
    expect(columns).toContain("updatedAt");
  });

  it("users table has expected columns", () => {
    const columns = Object.keys(users);
    expect(columns).toContain("id");
    expect(columns).toContain("authId");
    expect(columns).toContain("email");
    expect(columns).toContain("name");
    expect(columns).toContain("role");
    expect(columns).toContain("tenantId");
    expect(columns).toContain("createdAt");
    expect(columns).toContain("updatedAt");
  });

  it("userRole enum has expected values", () => {
    expect(userRole.enumValues).toEqual(["owner", "admin", "member"]);
  });
});
