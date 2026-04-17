import type { MetadataRoute } from "next";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://guardis.pro";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    {
      url: `${APP_URL}/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
      alternates: {
        languages: {
          sk: `${APP_URL}/sk`,
          cs: `${APP_URL}/cs`,
          pl: `${APP_URL}/pl`,
          en: `${APP_URL}/en`,
        },
      },
    },
  ];
}
