import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { hashIp, waitlistSchema } from "@/lib/waitlist";

// Run on the edge-ish Node runtime; we need crypto.subtle + Supabase client
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Simple in-memory rate limit per instance.
 * For serious traffic, swap for Upstash Rate Limit once ADR-010 lands.
 */
const recentRequests = new Map<string, number[]>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;

function rateLimit(key: string): boolean {
  const now = Date.now();
  const windowStart = now - WINDOW_MS;
  const timestamps = (recentRequests.get(key) ?? []).filter(
    (t) => t > windowStart,
  );
  if (timestamps.length >= MAX_PER_WINDOW) return false;
  timestamps.push(now);
  recentRequests.set(key, timestamps);
  return true;
}

export async function POST(req: Request) {
  // Parse + validate
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = waitlistSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.issues },
      { status: 400 },
    );
  }

  // Honeypot check
  if (parsed.data.website && parsed.data.website.length > 0) {
    // Pretend we accepted it
    return NextResponse.json({ ok: true });
  }

  // Rate limit (per IP)
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";
  const ipHash = await hashIp(ip);

  if (!rateLimit(ipHash)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 },
    );
  }

  // Insert via service role (bypasses RLS)
  const supabase = createAdminClient();
  const userAgent = req.headers.get("user-agent")?.slice(0, 500) ?? null;

  const { error } = await supabase.from("waitlist").insert({
    email: parsed.data.email,
    company_name: parsed.data.companyName ?? null,
    locale: parsed.data.locale,
    source: parsed.data.source,
    ip_hash: ipHash,
    user_agent: userAgent,
  });

  if (error) {
    // Duplicate email: treat as success so we don't leak membership
    if (error.code === "23505") {
      return NextResponse.json({ ok: true, alreadyRegistered: true });
    }
    console.error("waitlist insert failed", error);
    return NextResponse.json(
      { error: "Failed to save. Please try again." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
