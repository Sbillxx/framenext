import type { Metadata } from "next";

interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: "website" | "article" | "product";
  publishedTime?: string;
  modifiedTime?: string;
  noIndex?: boolean;
}

export function generateSEO(config: SEOConfig): Metadata {
  const { title, description, keywords = [], image = "/images/frameidbiru.png", url = "/", type = "website", publishedTime, modifiedTime, noIndex = false } = config;

  return {
    title,
    description,
    keywords: [...keywords, "twibbon maker", "frame foto gratis", "generator twibbon", "Frame ID"],
    openGraph: {
      title,
      description,
      url,
      type: type === "product" ? "website" : type,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      siteName: "Frame ID - Twibbon Maker",
      locale: "id_ID",
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@frameid",
      site: "@frameid",
    },
    alternates: {
      canonical: url,
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : {
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
  };
}

// SEO constants untuk konsistensi
export const SEO_DEFAULTS = {
  siteName: "Frame ID - Twibbon Maker",
  baseDescription: "Platform terbaik untuk membuat twibbon gratis tanpa watermark di Indonesia",
  defaultImage: "/images/frameidbiru.png",
  twitterHandle: "@frameid",
  locale: "id_ID",
  keywords: {
    primary: ["twibbon maker", "buat twibbon", "frame foto gratis", "twibbon generator", "frame ID"],
    secondary: ["kampanye online", "twibbon gratis", "buat frame foto", "generator twibbon", "tools twibbon indonesia", "frame maker online", "twibbon tanpa watermark"],
  },
} as const;
