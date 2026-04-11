import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { OnboardingForm } from "./onboarding-form";

export default async function OnboardingPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold tracking-tight">
          Set up your workspace
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Create your organization to get started
        </p>
      </div>

      <OnboardingForm userEmail={user.email ?? ""} />
    </div>
  );
}
