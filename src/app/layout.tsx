import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Frame ID - Twibbon Maker",
  description: "Create beautiful twibbons with Frame ID",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
