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
      {
        url:
          "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='8' fill='%231E5C43'/%3E%3Ctext x='32' y='45' font-family='Georgia,serif' font-size='34' font-weight='600' fill='%23F7F6F1' text-anchor='middle'%3EP%3C/text%3E%3C/svg%3E",
      },
    ],
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
