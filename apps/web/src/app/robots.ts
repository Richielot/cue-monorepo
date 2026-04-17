import type { MetadataRoute } from "next";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://guardis.eu";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Gated product routes — not indexed during waitlist phase.
        disallow: ["/api/", "/dashboard", "/settings", "/onboarding", "/login", "/signup"],
      },
    ],
    sitemap: `${APP_URL}/sitemap.xml`,
    host: APP_URL,
  };
}
