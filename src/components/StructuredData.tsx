import Script from "next/script";

interface StructuredDataProps {
  type: "website" | "organization" | "article" | "product" | "faq";
  data?: {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
    datePublished?: string;
    dateModified?: string;
    downloads?: number | string;
    name?: string;
  };
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://frameid.com";

  const getStructuredData = () => {
    const baseData = {
      "@context": "https://schema.org",
    };

    switch (type) {
      case "website":
        return {
          ...baseData,
          "@type": "WebSite",
          name: "Frame ID - Twibbon Maker",
          alternateName: ["FrameID", "Frame ID", "Twibbon Maker Indonesia"],
          url: baseUrl,
          description: "Platform terbaik untuk membuat twibbon gratis tanpa watermark di Indonesia",
          inLanguage: "id-ID",
          potentialAction: {
            "@type": "SearchAction",
            target: {
              "@type": "EntryPoint",
              urlTemplate: `${baseUrl}/jelajahi?search={search_term_string}`,
            },
            "query-input": "required name=search_term_string",
          },
          publisher: {
            "@type": "Organization",
            name: "Frame ID",
            logo: {
              "@type": "ImageObject",
              url: `${baseUrl}/images/frameidbiru.png`,
              width: 400,
              height: 400,
            },
          },
        };

      case "organization":
        return {
          ...baseData,
          "@type": "Organization",
          name: "Frame ID",
          alternateName: "FrameID",
          url: baseUrl,
          logo: `${baseUrl}/images/frameidbiru.png`,
          description: "Platform terbaik untuk membuat twibbon gratis tanpa watermark di Indonesia",
          foundingDate: "2024",
          founder: {
            "@type": "Person",
            name: "Frame ID Team",
          },
          areaServed: {
            "@type": "Country",
            name: "Indonesia",
          },
          serviceType: ["Twibbon Maker", "Frame Photo Generator", "Campaign Tools"],
          sameAs: ["https://instagram.com/frameid", "https://twitter.com/frameid", "https://facebook.com/frameid"],
          contactPoint: {
            "@type": "ContactPoint",
            contactType: "customer service",
            email: "support@frameid.com",
          },
        };

      case "article":
        return {
          ...baseData,
          "@type": "Article",
          headline: data?.title || "Download Twibbon Gratis",
          description: data?.description || "Download twibbon gratis tanpa watermark",
          image: {
            "@type": "ImageObject",
            url: data?.image || `${baseUrl}/images/frameidbiru.png`,
            width: 1200,
            height: 630,
          },
          author: {
            "@type": "Organization",
            name: "Frame ID",
            url: baseUrl,
          },
          publisher: {
            "@type": "Organization",
            name: "Frame ID",
            logo: {
              "@type": "ImageObject",
              url: `${baseUrl}/images/frameidbiru.png`,
              width: 400,
              height: 400,
            },
          },
          datePublished: data?.datePublished || new Date().toISOString(),
          dateModified: data?.dateModified || new Date().toISOString(),
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": data?.url || baseUrl,
          },
          inLanguage: "id-ID",
        };

      case "product":
        return {
          ...baseData,
          "@type": "SoftwareApplication",
          name: data?.name || "Frame ID Twibbon Maker",
          description: data?.description || "Platform untuk membuat twibbon gratis tanpa watermark",
          applicationCategory: "DesignApplication",
          operatingSystem: "Web Browser",
          image: data?.image || `${baseUrl}/images/frameidbiru.png`,
          brand: {
            "@type": "Brand",
            name: "Frame ID",
          },
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "IDR",
            availability: "https://schema.org/InStock",
            seller: {
              "@type": "Organization",
              name: "Frame ID",
            },
          },
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.8",
            ratingCount: data?.downloads || "1000",
            bestRating: "5",
            worstRating: "1",
          },
          downloadUrl: baseUrl,
          featureList: ["Gratis tanpa watermark", "Interface mudah digunakan", "Template beragam", "Responsive design", "Export berkualitas tinggi"],
        };

      case "faq":
        return {
          ...baseData,
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "Apa itu Frame ID?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Frame ID adalah platform online gratis untuk membuat twibbon (frame foto) untuk kampanye, event, atau dukungan online. Semua fitur dapat digunakan tanpa watermark.",
              },
            },
            {
              "@type": "Question",
              name: "Apakah Frame ID benar-benar gratis?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Ya! Frame ID 100% gratis untuk semua fitur. Anda dapat membuat, mengedit, dan mengunduh twibbon tanpa biaya dan tanpa watermark.",
              },
            },
            {
              "@type": "Question",
              name: "Bagaimana cara membuat twibbon?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "1. Klik 'Mulai Kampanye' di halaman utama, 2. Upload desain frame Anda (PNG, max 5MB), 3. Atur thumbnail dan preview, 4. Isi detail kampanye, 5. Klik 'Publikasikan'.",
              },
            },
          ],
        };

      default:
        return baseData;
    }
  };

  return (
    <Script
      id={`structured-data-${type}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(getStructuredData()),
      }}
    />
  );
}
