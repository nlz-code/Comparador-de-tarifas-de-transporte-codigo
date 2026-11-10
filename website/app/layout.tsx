import type { Metadata, Viewport } from "next";

import { pairFor } from "@/lib/fonts";
import { site } from "@/lib/site";

import "./globals.css";

export const metadata: Metadata = {
  title: { default: `${site.name}: ${site.tagline}`, template: `%s · ${site.name}` },
  description: site.description,
  openGraph: {
    title: `${site.name}: ${site.tagline}`,
    description: site.description,
    type: "website",
    locale: "es_ES",
    siteName: site.name,
  },
};

export const viewport: Viewport = { themeColor: "#2d8af1" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={pairFor("bold")} style={{ ["--brand" as string]: "212" }}>
      <body className="font-body">{children}</body>
    </html>
  );
}
