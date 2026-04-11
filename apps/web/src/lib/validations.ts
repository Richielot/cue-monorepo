import { z } from "zod";

export const onboardingSchema = z.object({
  orgName: z.string().min(1, "Organization name is required").max(100).trim(),
  slug: z
    .string()
    .min(2, "Slug must be at least 2 characters")
    .max(48, "Slug must be at most 48 characters")
    .regex(
      /^[a-z0-9][a-z0-9-]*[a-z0-9]$/,
      "Slug must contain only lowercase letters, numbers, and hyphens",
    ),
  userEmail: z.string().email().optional(),
});

export const updateProfileSchema = z.object({
  userId: z.string().uuid("Invalid user ID"),
  name: z.string().min(1, "Name is required").max(100).trim(),
});

export const updateOrgSchema = z.object({
  tenantId: z.string().uuid("Invalid tenant ID"),
  name: z.string().min(1, "Organization name is required").max(100).trim(),
});

export const inviteMemberSchema = z.object({
  email: z.string().email("Invalid email address"),
});
