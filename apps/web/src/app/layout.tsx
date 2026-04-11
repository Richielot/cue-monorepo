import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cue",
  description: "Your multi-tenant platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
