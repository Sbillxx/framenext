import type { Metadata } from "next";
import "./globals.css";

// export const metadata: Metadata = {
//   icons: {
//     icon: "/favicon.ico",
//   },
//   title: "Frame ID - Twibbon Maker",
//   description: "Bikin twibbons kamu dengan Frame ID",
// };

export const metadata: Metadata = {
  title: "Frame ID - Twibbon Maker",
  description: "Bikin twibbons kamu dengan Frame ID",
  metadataBase: new URL("https://frame-id.idrisiyyah.com"),
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
