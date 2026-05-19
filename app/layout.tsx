import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Sans, Noto_Sans_Arabic } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant-var",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const notoArabic = Noto_Sans_Arabic({
  variable: "--font-noto-arabic",
  subsets: ["arabic"],
  weight: ["400", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#1B4D3E",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://community.ariesdental.ae"),
  title: "Community Appreciation Initiative | AED 2.5 Million Health Credits",
  description:
    "Register for AED 1,000 in free health credits from Aries Dental & AM Health Hub. Dental, aesthetic, and wellness services for 2,500 community members.",
  keywords: [
    "health credits dubai",
    "free dental dubai",
    "community health initiative",
    "aries dental",
    "AM health hub",
    "AED 1000 health credits",
  ],
  openGraph: {
    title: "AED 2.5 Million Community Health Initiative",
    description:
      "Claim your AED 1,000 health credits — free dental, aesthetic & wellness services.",
    images: ["/images/og-image.jpg"],
    type: "website",
    locale: "en_AE",
  },
  twitter: {
    card: "summary_large_image",
    title: "AED 2.5 Million Community Health Initiative",
    description: "Claim your AED 1,000 health credits.",
    images: ["/images/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${dmSans.variable} ${notoArabic.variable}`}
    >
      <body className="min-h-screen bg-cream antialiased">{children}</body>
    </html>
  );
}
