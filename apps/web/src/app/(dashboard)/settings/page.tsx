import { db, eq, tenants, users } from "@cue/db";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { MembersList } from "./members-list";
import { OrgForm } from "./org-form";
import { ProfileForm } from "./profile-form";

export default async function SettingsPage() {
  const supabase = await createClient();
  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();

  if (!authUser) redirect("/login");

  // Fetch current user + tenant
  const currentUser = await db.query.users.findFirst({
    where: eq(users.authId, authUser.id),
    with: { tenant: true },
  });

  if (!currentUser) redirect("/onboarding");

  const tenant = await db.query.tenants.findFirst({
    where: eq(tenants.id, currentUser.tenantId),
  });

  // Fetch all members in this tenant
  const members = await db.query.users.findMany({
    where: eq(users.tenantId, currentUser.tenantId),
    orderBy: (users, { asc }) => [asc(users.createdAt)],
  });

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-wider text-blue-600">
          Settings
        </p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          Manage your workspace
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Update your profile, organization, and team members
        </p>
      </div>

      {/* Profile */}
      <ProfileForm
        userId={currentUser.id}
        name={currentUser.name ?? ""}
        email={currentUser.email}
      />

      {/* Organization */}
      {tenant && (
        <OrgForm
          tenantId={tenant.id}
          name={tenant.name}
          slug={tenant.slug}
          isOwner={currentUser.role === "owner"}
        />
      )}

      {/* Members */}
      <MembersList
        members={members.map((m) => ({
          id: m.id,
          name: m.name,
          email: m.email,
          role: m.role,
        }))}
        currentUserId={currentUser.id}
        isAdmin={currentUser.role === "owner" || currentUser.role === "admin"}
      />
    </div>
  );
}
