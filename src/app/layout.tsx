import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { seo } from "@/content/seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://prep.md"),
  title: {
    default: seo.home.title,
    template: "%s",
  },
  description: seo.home.description,
  applicationName: "PREP",
  openGraph: {
    title: seo.home.title,
    description: seo.home.description,
    url: "https://prep.md",
    siteName: "PREP",
    type: "website",
    images: [{ url: "/slides/slide-1.jpg", width: 1200, height: 675 }],
  },
  twitter: {
    card: "summary_large_image",
    title: seo.home.title,
    description: seo.home.description,
    images: ["/slides/slide-1.jpg"],
  },
  icons: {
    icon: [
      { url: "/logo.svg", type: "image/svg+xml" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  );
}
