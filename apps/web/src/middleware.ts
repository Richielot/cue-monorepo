import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

const protectedRoutes = ["/dashboard", "/settings", "/onboarding"];
const authRoutes = ["/login", "/signup"];
// Everything users can't reach while signups are closed.
const gatedRoutes = [...authRoutes, ...protectedRoutes];

/**
 * Path C gate: `NEXT_PUBLIC_SIGNUPS_OPEN` controls whether the product UI
 * is reachable. When false (default in prod during waitlist phase) we redirect
 * every product route to the landing waitlist anchor. Flip to "true" once the
 * NIS2 core is ready to onboard real customers.
 */
const SIGNUPS_OPEN =
  process.env.NEXT_PUBLIC_SIGNUPS_OPEN === "true";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Waitlist mode: redirect gated routes to the landing waitlist section.
  if (!SIGNUPS_OPEN && gatedRoutes.some((r) => pathname.startsWith(r))) {
    const redirect = new URL("/", request.url);
    redirect.hash = "waitlist";
    return NextResponse.redirect(redirect);
  }

  const response = await updateSession(request);

  // Heuristic check: cookie presence determines route-level redirects only.
  // Real auth validation happens in supabase.auth.getUser() within each
  // API route and Server Component — this is the standard Supabase SSR pattern.
  const hasSession = request.cookies
    .getAll()
    .some((c) => c.name.startsWith("sb-") && c.name.endsWith("-auth-token"));

  // Redirect authenticated users away from auth pages
  if (hasSession && authRoutes.some((r) => pathname.startsWith(r))) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Redirect unauthenticated users to login
  if (!hasSession && protectedRoutes.some((r) => pathname.startsWith(r))) {
    const redirectUrl = new URL("/login", request.url);
    redirectUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(redirectUrl);
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
