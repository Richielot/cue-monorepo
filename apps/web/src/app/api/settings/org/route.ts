import { db, eq, tenants, users } from "@cue/db";
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { updateOrgSchema } from "@/lib/validations";

export async function PATCH(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Validate input
  const body = await request.json();
  const parsed = updateOrgSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0].message },
      { status: 400 },
    );
  }

  const { tenantId, name } = parsed.data;

  // Verify user is owner of this tenant
  const currentUser = await db.query.users.findFirst({
    where: eq(users.authId, user.id),
  });

  if (
    !currentUser ||
    currentUser.tenantId !== tenantId ||
    currentUser.role !== "owner"
  ) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  await db
    .update(tenants)
    .set({ name, updatedAt: new Date() })
    .where(eq(tenants.id, tenantId));

  return NextResponse.json({ success: true });
}
