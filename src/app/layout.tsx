import type { Metadata } from "next";
import "./globals.css";
import StructuredData from "@/components/StructuredData";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://frameid.com"),
  title: {
    default: "Frame ID - Twibbon Maker Gratis Terbaik di Indonesia",
    template: "%s | Frame ID - Twibbon Maker",
  },
  description: "Buat twibbon gratis tanpa watermark! Frame ID adalah platform terbaik untuk membuat frame foto kampanye, twibbon event, dan dukungan online. Tools mudah, hasil professional, 100% gratis!",
  keywords: [
    "twibbon maker",
    "buat twibbon",
    "frame foto gratis",
    "twibbon generator",
    "frame ID",
    "kampanye online",
    "twibbon gratis",
    "buat frame foto",
    "generator twibbon",
    "tools twibbon indonesia",
    "frame maker online",
    "twibbon tanpa watermark",
  ],
  authors: [{ name: "Frame ID Team" }],
  creator: "Frame ID",
  publisher: "Frame ID",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "/",
    siteName: "Frame ID - Twibbon Maker",
    title: "Frame ID - Twibbon Maker Gratis Terbaik di Indonesia",
    description: "Buat twibbon gratis tanpa watermark! Platform terbaik untuk membuat frame foto kampanye dan twibbon event. Tools mudah, hasil professional!",
    images: [
      {
        url: "/images/frameidbiru.png",
        width: 1200,
        height: 630,
        alt: "Frame ID - Twibbon Maker Gratis",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Frame ID - Twibbon Maker Gratis Terbaik",
    description: "Buat twibbon gratis tanpa watermark! Tools mudah, hasil professional, 100% gratis!",
    images: ["/images/frameidbiru.png"],
    creator: "@frameid",
    site: "@frameid",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_VERIFICATION_CODE,
    yandex: process.env.YANDEX_VERIFICATION_CODE,
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        <StructuredData type="website" />
        <StructuredData type="organization" />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
