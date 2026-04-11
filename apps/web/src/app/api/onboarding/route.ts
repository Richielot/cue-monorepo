import { db, eq, sql, tenants, users } from "@cue/db";
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { onboardingSchema } from "@/lib/validations";

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Validate input
  const body = await request.json();
  const parsed = onboardingSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0].message },
      { status: 400 },
    );
  }

  const { orgName, slug, userEmail } = parsed.data;

  // Check if user already belongs to a tenant
  const existingUser = await db.query.users.findFirst({
    where: eq(users.authId, user.id),
  });

  if (existingUser) {
    return NextResponse.json(
      { error: "You already belong to a workspace" },
      { status: 409 },
    );
  }

  // Atomic tenant + user creation in a transaction
  try {
    const result = await db.transaction(async (tx) => {
      const [tenant] = await tx
        .insert(tenants)
        .values({ name: orgName, slug })
        .returning();

      await tx.insert(users).values({
        authId: user.id,
        email: userEmail ?? user.email!,
        name: user.user_metadata?.name ?? null,
        role: "owner",
        tenantId: tenant.id,
      });

      return tenant;
    });

    return NextResponse.json({ success: true, tenantId: result.id });
  } catch (err: unknown) {
    // Handle unique constraint violation (concurrent slug creation)
    if (err instanceof Error && err.message.includes("unique constraint")) {
      return NextResponse.json(
        { error: "This workspace URL is already taken" },
        { status: 409 },
      );
    }
    throw err;
  }
}
