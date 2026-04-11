import { describe, expect, it } from "vitest";
import {
  inviteMemberSchema,
  onboardingSchema,
  updateOrgSchema,
  updateProfileSchema,
} from "../lib/validations";

describe("onboardingSchema", () => {
  it("accepts valid input", () => {
    const result = onboardingSchema.safeParse({
      orgName: "Acme Inc.",
      slug: "acme-inc",
    });
    expect(result.success).toBe(true);
  });

  it("rejects empty orgName", () => {
    const result = onboardingSchema.safeParse({ orgName: "", slug: "acme" });
    expect(result.success).toBe(false);
  });

  it("rejects slug with uppercase", () => {
    const result = onboardingSchema.safeParse({
      orgName: "Acme",
      slug: "Acme",
    });
    expect(result.success).toBe(false);
  });

  it("rejects slug with spaces", () => {
    const result = onboardingSchema.safeParse({
      orgName: "Acme",
      slug: "acme inc",
    });
    expect(result.success).toBe(false);
  });

  it("rejects slug shorter than 2 chars", () => {
    const result = onboardingSchema.safeParse({
      orgName: "Acme",
      slug: "a",
    });
    expect(result.success).toBe(false);
  });

  it("rejects slug longer than 48 chars", () => {
    const result = onboardingSchema.safeParse({
      orgName: "Acme",
      slug: "a".repeat(49),
    });
    expect(result.success).toBe(false);
  });

  it("trims orgName whitespace", () => {
    const result = onboardingSchema.safeParse({
      orgName: "  Acme Inc.  ",
      slug: "acme",
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.orgName).toBe("Acme Inc.");
    }
  });

  it("accepts optional userEmail", () => {
    const result = onboardingSchema.safeParse({
      orgName: "Acme",
      slug: "acme",
      userEmail: "test@example.com",
    });
    expect(result.success).toBe(true);
  });

  it("rejects invalid userEmail", () => {
    const result = onboardingSchema.safeParse({
      orgName: "Acme",
      slug: "acme",
      userEmail: "not-an-email",
    });
    expect(result.success).toBe(false);
  });
});

describe("updateProfileSchema", () => {
  it("accepts valid input", () => {
    const result = updateProfileSchema.safeParse({
      userId: "550e8400-e29b-41d4-a716-446655440000",
      name: "John Doe",
    });
    expect(result.success).toBe(true);
  });

  it("rejects non-UUID userId", () => {
    const result = updateProfileSchema.safeParse({
      userId: "not-a-uuid",
      name: "John",
    });
    expect(result.success).toBe(false);
  });

  it("rejects empty name", () => {
    const result = updateProfileSchema.safeParse({
      userId: "550e8400-e29b-41d4-a716-446655440000",
      name: "",
    });
    expect(result.success).toBe(false);
  });

  it("rejects name over 100 chars", () => {
    const result = updateProfileSchema.safeParse({
      userId: "550e8400-e29b-41d4-a716-446655440000",
      name: "x".repeat(101),
    });
    expect(result.success).toBe(false);
  });
});

describe("updateOrgSchema", () => {
  it("accepts valid input", () => {
    const result = updateOrgSchema.safeParse({
      tenantId: "550e8400-e29b-41d4-a716-446655440000",
      name: "New Name",
    });
    expect(result.success).toBe(true);
  });

  it("rejects non-UUID tenantId", () => {
    const result = updateOrgSchema.safeParse({
      tenantId: "bad-id",
      name: "Name",
    });
    expect(result.success).toBe(false);
  });
});

describe("inviteMemberSchema", () => {
  it("accepts valid email", () => {
    const result = inviteMemberSchema.safeParse({ email: "test@example.com" });
    expect(result.success).toBe(true);
  });

  it("rejects invalid email", () => {
    const result = inviteMemberSchema.safeParse({ email: "not-email" });
    expect(result.success).toBe(false);
  });

  it("rejects empty email", () => {
    const result = inviteMemberSchema.safeParse({ email: "" });
    expect(result.success).toBe(false);
  });
});
