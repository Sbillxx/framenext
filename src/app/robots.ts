import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://frameid.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/jelajahi", "/twibbon/*", "/tentang-kami", "/pusat-bantuan"],
        disallow: ["/admin/*", "/adminlogin", "/api/*", "/blank-page", "/tes", "/contoh", "/_next/*", "/private/*"],
        crawlDelay: 1,
      },
      {
        userAgent: "Googlebot",
        allow: ["/", "/jelajahi", "/twibbon/*", "/tentang-kami", "/pusat-bantuan"],
        disallow: ["/admin/*", "/adminlogin", "/api/*", "/blank-page", "/tes", "/contoh"],
      },
      {
        userAgent: "Bingbot",
        allow: ["/", "/jelajahi", "/twibbon/*", "/tentang-kami", "/pusat-bantuan"],
        disallow: ["/admin/*", "/api/*", "/blank-page", "/tes"],
        crawlDelay: 2,
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
