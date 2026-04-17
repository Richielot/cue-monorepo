import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  preload: true,
});

const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL ?? "https://guardis.pro";

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: "GUARDIS — NIS2 compliance for CEE SMEs",
    template: "%s · GUARDIS",
  },
  description:
    "Run NIS2 assessments, report incidents on time, and generate audit-ready reports. Built for SMEs in Slovakia, Czechia, and Poland. EU-hosted.",
  keywords: [
    "NIS2",
    "NIS2 compliance",
    "cybersecurity",
    "SME compliance",
    "incident reporting",
    "Slovakia",
    "Czech Republic",
    "Poland",
    "GDPR",
    "ISO 27001",
  ],
  applicationName: "GUARDIS",
  authors: [{ name: "GUARDIS" }],
  creator: "GUARDIS",
  publisher: "GUARDIS",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
    languages: {
      "sk-SK": "/sk",
      "cs-CZ": "/cs",
      "pl-PL": "/pl",
      en: "/en",
      "x-default": "/",
    },
  },
  openGraph: {
    type: "website",
    siteName: "GUARDIS",
    title: "GUARDIS — NIS2 compliance for CEE SMEs",
    description:
      "Automated NIS2 assessments, incident reporting, and audit-ready reports for SMEs in Slovakia, Czechia, and Poland.",
    url: APP_URL,
    locale: "en_US",
    alternateLocale: ["sk_SK", "cs_CZ", "pl_PL"],
  },
  twitter: {
    card: "summary_large_image",
    title: "GUARDIS — NIS2 compliance for CEE SMEs",
    description:
      "Automated NIS2 assessments, incident reporting, and audit-ready reports.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1020" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>{children}</body>
    </html>
  );
}
