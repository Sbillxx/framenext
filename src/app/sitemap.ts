import { MetadataRoute } from "next";
import { getAllTwibbon } from "@/lib/action";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://frameid.com";

  // Static pages dengan priority tinggi
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/jelajahi`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tentang-kami`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/pusat-bantuan`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  // Dynamic twibbon pages
  try {
    const twibbonsResult = await getAllTwibbon();

    if (twibbonsResult.success && twibbonsResult.data) {
      const twibbonRoutes: MetadataRoute.Sitemap = twibbonsResult.data.map((twibbon) => ({
        url: `${baseUrl}/twibbon/${twibbon.slug}`,
        lastModified: new Date(twibbon.created_at),
        changeFrequency: "weekly",
        priority: 0.8,
      }));

      return [...staticRoutes, ...twibbonRoutes];
    }
  } catch (error) {
    console.error("Error generating sitemap for twibbons:", error);
  }

  return staticRoutes;
}
