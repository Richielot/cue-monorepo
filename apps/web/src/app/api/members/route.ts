import { db, eq, users } from "@cue/db";
import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { inviteMemberSchema } from "@/lib/validations";

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const currentUser = await db.query.users.findFirst({
    where: eq(users.authId, user.id),
  });

  if (!currentUser || !["owner", "admin"].includes(currentUser.role)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // Validate input
  const body = await request.json();
  const parsed = inviteMemberSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0].message },
      { status: 400 },
    );
  }

  const { email } = parsed.data;

  // Check if user already exists in this tenant
  const existingMembers = await db.query.users.findMany({
    where: eq(users.tenantId, currentUser.tenantId),
  });

  if (existingMembers.some((m) => m.email === email)) {
    return NextResponse.json(
      { error: "User is already a member" },
      { status: 409 },
    );
  }

  // Use admin client (service role key) for invite operations
  const adminClient = createAdminClient();
  const { error } = await adminClient.auth.admin.inviteUserByEmail(email, {
    data: { tenantId: currentUser.tenantId },
    redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback?next=/dashboard`,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}
